-- Colapsa 13 valores do enum Muscle em 4 (BICEPS, TRICEPS, FOREARMS, GLUTES_GENERAL)
-- e troca a unique de exercises de (muscleGroup, muscle, title, userId) para
-- (muscleGroup, title, userId).
--
-- Nenhuma linha de historico e perdida: exercicios que colidem sob a nova chave
-- sao MESCLADOS -- workout_exercise_logs, training_split_exercises e traducoes
-- sao reapontados para o sobrevivente antes de os perdedores serem removidos.
--
-- Todo o arquivo roda numa unica transacao do Prisma. NAO adicionar BEGIN/COMMIT:
-- um COMMIT no meio quebraria a atomicidade entre a troca do enum e o dedupe,
-- deixando a tabela sem indice unico caso o dedupe falhe.

-- ---------------------------------------------------------------------------
-- 1. DropIndex
--    Obrigatorio ANTES do ALTER COLUMN: o Postgres reconstroi os indices da
--    coluna durante a troca de tipo, e o remap pode gerar duplicatas.
-- ---------------------------------------------------------------------------
DROP INDEX "public"."exercises_muscleGroup_muscle_title_userId_key";

-- ---------------------------------------------------------------------------
-- 2. AlterEnum
--    O Postgres nao remove valores de um enum, entao criamos um tipo novo e
--    trocamos a coluna, remapeando os valores colapsados dentro do USING.
--    "Muscle" e usado em uma unica coluna: exercises.muscle.
-- ---------------------------------------------------------------------------
CREATE TYPE "Muscle_new" AS ENUM (
    'CHEST_GENERAL',
    'UPPER_CHEST',
    'MIDDLE_CHEST',
    'LOWER_CHEST',
    'BACK_GENERAL',
    'LATS',
    'TRAPS',
    'LOWER_BACK',
    'RHOMBOIDS',
    'SHOULDERS_GENERAL',
    'FRONT_DELTOID',
    'SIDE_DELTOID',
    'REAR_DELTOID',
    'ARMS_GENERAL',
    'BICEPS',
    'TRICEPS',
    'FOREARMS',
    'LEGS_GENERAL',
    'QUADRICEPS',
    'HAMSTRINGS',
    'CALVES',
    'GLUTES_GENERAL',
    'CORE_GENERAL',
    'ABS',
    'OBLIQUES'
);

ALTER TABLE "exercises"
    ALTER COLUMN "muscle" TYPE "Muscle_new"
    USING (
        CASE "muscle"::text
            WHEN 'BICEPS_LONG_HEAD'     THEN 'BICEPS'
            WHEN 'BICEPS_SHORT_HEAD'    THEN 'BICEPS'
            WHEN 'TRICEPS_LONG_HEAD'    THEN 'TRICEPS'
            WHEN 'TRICEPS_LATERAL_HEAD' THEN 'TRICEPS'
            WHEN 'TRICEPS_MEDIAL_HEAD'  THEN 'TRICEPS'
            WHEN 'FOREARMS_GENERAL'     THEN 'FOREARMS'
            WHEN 'BRACHIORADIALIS'      THEN 'FOREARMS'
            WHEN 'PRONATOR_TERES'       THEN 'FOREARMS'
            WHEN 'FLEXORS'              THEN 'FOREARMS'
            WHEN 'EXTENSORS'            THEN 'FOREARMS'
            WHEN 'GLUTEUS_MAXIMUS'      THEN 'GLUTES_GENERAL'
            WHEN 'GLUTEUS_MEDIUS'       THEN 'GLUTES_GENERAL'
            WHEN 'GLUTEUS_MINIMUS'      THEN 'GLUTES_GENERAL'
            ELSE "muscle"::text
        END
    )::"Muscle_new";

ALTER TYPE "Muscle" RENAME TO "Muscle_old";
ALTER TYPE "Muscle_new" RENAME TO "Muscle";
DROP TYPE "Muscle_old";

-- ---------------------------------------------------------------------------
-- 3. Trilha de auditoria + mapa de merge.
--    A chave de agrupamento e a NOVA unique: (muscleGroup, title, userId).
--    Ela cobre os dois motivos de colisao de uma vez -- o colapso do enum e a
--    saida de "muscle" da chave -- porque nenhum dos dois altera muscleGroup,
--    title ou userId. GROUP BY/PARTITION BY tratam NULL como um unico grupo,
--    entao exercicios globais (userId IS NULL) tambem sao agrupados.
--    Sobrevivente = menor id (o mais antigo), preservando createdAt,
--    description e o muscle ja remapeado da linha original.
--
--    A tabela de auditoria e permanente de proposito: workout_exercise_logs nao
--    guarda o exerciseId antigo, entao ela e o unico rastro de qual exercicio
--    foi fundido em qual.
-- ---------------------------------------------------------------------------
CREATE TABLE "exercises_merged_20260901" (
    loser_id      INTEGER NOT NULL PRIMARY KEY,
    survivor_id   INTEGER NOT NULL,
    "muscleGroup" TEXT    NOT NULL,
    title         TEXT    NOT NULL,
    "userId"      INTEGER,
    merged_at     TIMESTAMPTZ(3) NOT NULL DEFAULT NOW()
);

INSERT INTO "exercises_merged_20260901" (loser_id, survivor_id, "muscleGroup", title, "userId")
SELECT loser_id, survivor_id, "muscleGroup", title, "userId"
FROM (
    SELECT
        e.id AS loser_id,
        first_value(e.id) OVER (
            PARTITION BY e."muscleGroup", e."title", e."userId"
            ORDER BY e.id
        ) AS survivor_id,
        e."muscleGroup"::text AS "muscleGroup",
        e.title,
        e."userId"
    FROM "exercises" e
) m
WHERE loser_id <> survivor_id;

CREATE INDEX ON "exercises_merged_20260901" (survivor_id);

-- ---------------------------------------------------------------------------
-- 4a. exercise_translations: resolve a unique (exerciseId, locale).
--     Para cada (sobrevivente, locale) uma unica traducao vence. A do proprio
--     sobrevivente tem prioridade -- por isso o ORDER BY comeca com
--     (survivor_id IS NOT NULL), que poe as linhas nao-perdedoras primeiro.
--     As traducoes perdedoras restantes seguem apontando para o perdedor e
--     somem no ON DELETE CASCADE do passo 5.
-- ---------------------------------------------------------------------------
WITH ranked AS (
    SELECT
        t.id,
        COALESCE(m.survivor_id, t."exerciseId") AS target_id,
        row_number() OVER (
            PARTITION BY COALESCE(m.survivor_id, t."exerciseId"), t.locale
            ORDER BY (m.survivor_id IS NOT NULL), t.id
        ) AS rn
    FROM "exercise_translations" t
    LEFT JOIN "exercises_merged_20260901" m ON m.loser_id = t."exerciseId"
)
UPDATE "exercise_translations" t
SET "exerciseId" = r.target_id,
    "updatedAt"  = NOW()
FROM ranked r
WHERE t.id = r.id
  AND r.rn = 1
  AND t."exerciseId" <> r.target_id;

-- ---------------------------------------------------------------------------
-- 4b. training_split_exercises: resolve a unique (trainingSplitId, exerciseId).
--     Se um treino continha o sobrevivente E um perdedor (ou dois perdedores),
--     sobra uma linha so. A linha do sobrevivente vence, preservando order,
--     sets e reps. rn > 1 so pode existir por causa do merge -- duplicatas
--     pre-existentes sao impossiveis, ja que a unique atual as impede.
-- ---------------------------------------------------------------------------
DELETE FROM "training_split_exercises" tse
USING (
    SELECT
        t.id,
        row_number() OVER (
            PARTITION BY t."trainingSplitId", COALESCE(m.survivor_id, t."exerciseId")
            ORDER BY (m.survivor_id IS NOT NULL), t.id
        ) AS rn
    FROM "training_split_exercises" t
    LEFT JOIN "exercises_merged_20260901" m ON m.loser_id = t."exerciseId"
) d
WHERE tse.id = d.id
  AND d.rn > 1;

UPDATE "training_split_exercises" tse
SET "exerciseId" = m.survivor_id,
    "updatedAt"  = NOW()
FROM "exercises_merged_20260901" m
WHERE tse."exerciseId" = m.loser_id;

-- ---------------------------------------------------------------------------
-- 4c. workout_exercise_logs: sem unique, reaponta direto. Historico real do
--     usuario -- nada e deletado aqui.
-- ---------------------------------------------------------------------------
UPDATE "workout_exercise_logs" l
SET "exerciseId" = m.survivor_id
FROM "exercises_merged_20260901" m
WHERE l."exerciseId" = m.loser_id;

-- ---------------------------------------------------------------------------
-- 5. Remove os perdedores. A essa altura nenhum log nem item de treino aponta
--    para eles; as traducoes remanescentes caem por CASCADE.
--    As FKs sao ON DELETE RESTRICT, entao se algo ainda apontar a transacao
--    aborta -- que e exatamente o comportamento desejado.
-- ---------------------------------------------------------------------------
DELETE FROM "exercises" e
USING "exercises_merged_20260901" m
WHERE e.id = m.loser_id;

-- ---------------------------------------------------------------------------
-- 6. CreateIndex: a nova unique, sem "muscle". E tambem a assercao de que o
--    dedupe funcionou -- se sobrou grupo duplicado, levanta 23505 e tudo rola
--    para tras.
-- ---------------------------------------------------------------------------
CREATE UNIQUE INDEX "exercises_muscleGroup_title_userId_key"
    ON "exercises"("muscleGroup", "title", "userId");
