-- Adiciona ADDUCTORS ao enum Muscle, sob o grupo LEGS.
--
-- "Adutor" e vocabulario de academia (cadeira adutora esta em praticamente toda
-- academia), entao entra no mesmo degrau de Quadriceps, Posteriores e Panturrilhas.
--
-- Operacao aditiva e nao destrutiva: nenhuma linha existente muda, nenhum valor e
-- removido, nada precisa ser remapeado ou fundido. AFTER 'HAMSTRINGS' mantem a
-- ordem do enum alinhada com a ordem exibida na interface.
--
-- ALTER TYPE ... ADD VALUE roda dentro da transacao da migracao no PostgreSQL 12+
-- desde que o valor novo nao seja usado na mesma transacao. Aqui ele so e usado
-- depois, pela seed.

ALTER TYPE "Muscle" ADD VALUE 'ADDUCTORS' AFTER 'HAMSTRINGS';
