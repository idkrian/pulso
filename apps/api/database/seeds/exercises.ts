import type {
  Muscle,
  MuscleGroup,
} from "../prisma/generated/prisma/client.js";
import { prisma } from "../prisma/prisma.js";

type SeedExercise = {
  muscleGroup: MuscleGroup;
  muscle: Muscle;
  title: string;
  description: string;
  pt: { title: string; description: string };
};

const CATALOG: SeedExercise[] = [
  {
    muscleGroup: "CHEST",
    muscle: "MIDDLE_CHEST",
    title: "Barbell Bench Press",
    description:
      "Lie on a flat bench and grip the bar slightly wider than shoulder-width. Unrack it, lower it under control to your mid-chest, then press straight up until your arms lock out.",
    pt: {
      title: "Supino Reto",
      description:
        "Deite no banco reto e segure a barra um pouco mais aberto que os ombros. Desça controlando até o meio do peito e empurre para cima até estender os braços.",
    },
  },
  {
    muscleGroup: "CHEST",
    muscle: "UPPER_CHEST",
    title: "Incline Barbell Bench Press",
    description:
      "Set the bench to 30–45°. Grip the bar wider than your shoulders, lower it to your upper chest, then press up until your arms are straight.",
    pt: {
      title: "Supino Inclinado com Barra",
      description:
        "Ajuste o banco entre 30–45°. Segure a barra mais aberto que os ombros, desça até a parte alta do peito e empurre até estender os braços.",
    },
  },
  {
    muscleGroup: "CHEST",
    muscle: "LOWER_CHEST",
    title: "Decline Barbell Bench Press",
    description:
      "On a declined bench with your legs secured, lower the bar to your lower chest, then press it up until your arms lock out.",
    pt: {
      title: "Supino Declinado com Barra",
      description:
        "No banco declinado com as pernas presas, desça a barra até a parte baixa do peito e empurre até estender os braços.",
    },
  },
  {
    muscleGroup: "CHEST",
    muscle: "MIDDLE_CHEST",
    title: "Dumbbell Bench Press",
    description:
      "Lie on a flat bench holding a dumbbell in each hand at chest level. Press them up until they nearly touch overhead, then lower under control.",
    pt: {
      title: "Supino Reto com Halteres",
      description:
        "Deite no banco reto com um halter em cada mão na altura do peito. Empurre para cima até quase se tocarem e desça controlando.",
    },
  },
  {
    muscleGroup: "CHEST",
    muscle: "UPPER_CHEST",
    title: "Incline Dumbbell Press",
    description:
      "On a bench set to 30–45°, start with the dumbbells at your upper chest. Press them up until they nearly meet, then lower them slowly.",
    pt: {
      title: "Supino Inclinado com Halteres",
      description:
        "No banco a 30–45°, comece com os halteres na parte alta do peito. Empurre para cima até quase se encontrarem e desça devagar.",
    },
  },
  {
    muscleGroup: "CHEST",
    muscle: "MIDDLE_CHEST",
    title: "Dumbbell Fly",
    description:
      "Lie on a flat bench holding dumbbells above your chest with a slight elbow bend. Open your arms out to the sides until you feel a stretch, then bring them back together.",
    pt: {
      title: "Crucifixo com Halteres",
      description:
        "Deite no banco reto com os halteres acima do peito e os cotovelos levemente flexionados. Abra os braços para os lados até sentir alongamento e junte-os de volta.",
    },
  },
  {
    muscleGroup: "CHEST",
    muscle: "MIDDLE_CHEST",
    title: "Cable Crossover",
    description:
      "Set the pulleys high and take a handle in each hand. Step forward with a slight forward lean and bring your hands together in front of you, then return slowly.",
    pt: {
      title: "Crossover na Polia",
      description:
        "Deixe as polias altas e pegue uma manopla em cada mão. Dê um passo à frente levemente inclinado, junte as mãos à frente do corpo e volte devagar.",
    },
  },
  {
    muscleGroup: "CHEST",
    muscle: "MIDDLE_CHEST",
    title: "Pec Deck Machine",
    description:
      "Sit with your back flat against the pad and grab the handles with your elbows at chest height. Squeeze your arms together in front of you, then return under control.",
    pt: {
      title: "Voador (Peck Deck)",
      description:
        "Sente com as costas apoiadas e segure as manoplas com os cotovelos na altura do peito. Junte os braços à frente e volte controlado.",
    },
  },
  {
    muscleGroup: "CHEST",
    muscle: "LOWER_CHEST",
    title: "Chest Dip",
    description:
      "On parallel bars, lean your torso forward and lower your body until your shoulders drop just below your elbows, then press back up.",
    pt: {
      title: "Mergulho nas Paralelas",
      description:
        "Nas barras paralelas, incline o tronco à frente e desça até os ombros ficarem logo abaixo dos cotovelos, depois empurre para subir.",
    },
  },
  {
    muscleGroup: "CHEST",
    muscle: "CHEST_GENERAL",
    title: "Push-Up",
    description:
      "Start in a plank with your hands under your shoulders. Lower your chest to just above the floor, then push back up keeping your body in a straight line.",
    pt: {
      title: "Flexão de Braço",
      description:
        "Comece na prancha com as mãos sob os ombros. Desça o peito até quase o chão e empurre para cima mantendo o corpo reto.",
    },
  },
  {
    muscleGroup: "CHEST",
    muscle: "MIDDLE_CHEST",
    title: "Machine Chest Press",
    description:
      "Sit with your back against the pad and grip the handles at chest level. Push forward until your arms are straight, then return slowly.",
    pt: {
      title: "Supino na Máquina",
      description:
        "Sente com as costas no apoio e segure as manoplas na altura do peito. Empurre até estender os braços e volte devagar.",
    },
  },
  {
    muscleGroup: "CHEST",
    muscle: "UPPER_CHEST",
    title: "Incline Chest Press Machine",
    description:
      "Sit in the machine with the seat set so the handles line up with your upper chest. Push forward and up until your arms are straight, then return under control.",
    pt: {
      title: "Supino Articulado Inclinado",
      description:
        "Sente na máquina com o banco ajustado para as manoplas ficarem na altura da parte alta do peito. Empurre para frente e para cima até estender os braços e volte controlando.",
    },
  },
  {
    muscleGroup: "CHEST",
    muscle: "MIDDLE_CHEST",
    title: "Smith Machine Bench Press",
    description:
      "Lie on a flat bench under the Smith bar. Unhook it, lower it to your mid-chest, then press up until your arms lock out. The fixed bar path lets you push without balancing the weight.",
    pt: {
      title: "Supino no Smith",
      description:
        "Deite no banco reto sob a barra do Smith. Destrave, desça até o meio do peito e empurre até estender os braços. A barra guiada permite empurrar sem precisar equilibrar o peso.",
    },
  },
  {
    muscleGroup: "CHEST",
    muscle: "UPPER_CHEST",
    title: "Incline Smith Machine Press",
    description:
      "Set an incline bench under the Smith bar at 30–45°. Lower the bar to your upper chest, then press up until your arms are straight.",
    pt: {
      title: "Supino Inclinado no Smith",
      description:
        "Coloque o banco inclinado a 30–45° sob a barra do Smith. Desça até a parte alta do peito e empurre até estender os braços.",
    },
  },
  {
    muscleGroup: "CHEST",
    muscle: "UPPER_CHEST",
    title: "Incline Dumbbell Fly",
    description:
      "On a bench set to 30–45°, hold the dumbbells above your chest with a slight elbow bend. Open your arms out to the sides until you feel a stretch, then bring them back together.",
    pt: {
      title: "Crucifixo Inclinado com Halteres",
      description:
        "No banco a 30–45°, segure os halteres acima do peito com os cotovelos levemente flexionados. Abra os braços para os lados até sentir alongamento e junte de volta.",
    },
  },
  {
    muscleGroup: "CHEST",
    muscle: "MIDDLE_CHEST",
    title: "Mid Cable Crossover",
    description:
      "Set both pulleys at chest height and take a handle in each hand. Bring your hands together straight in front of your chest, then open back out under control.",
    pt: {
      title: "Crossover na Polia Média",
      description:
        "Deixe as duas polias na altura do peito e pegue uma manopla em cada mão. Junte as mãos à frente do peito e abra de volta controlando.",
    },
  },
  {
    muscleGroup: "CHEST",
    muscle: "UPPER_CHEST",
    title: "Low Cable Crossover",
    description:
      "Set both pulleys at the bottom and take a handle in each hand. Bring your hands up and together in front of your shoulders, then lower under control. The upward path emphasizes the upper chest.",
    pt: {
      title: "Crossover na Polia Baixa",
      description:
        "Deixe as duas polias na posição mais baixa e pegue uma manopla em cada mão. Suba juntando as mãos à frente dos ombros e desça controlando. O movimento de baixo para cima enfatiza a parte alta do peito.",
    },
  },

  {
    muscleGroup: "BACK",
    muscle: "BACK_GENERAL",
    title: "Deadlift",
    description:
      "Stand with feet hip-width and grip the bar just outside your legs. Keep your back flat and stand up by driving through your heels until upright, then lower the bar under control.",
    pt: {
      title: "Levantamento Terra",
      description:
        "Pés na largura do quadril, pegue a barra por fora das pernas. Mantenha a coluna reta e suba empurrando o chão com os calcanhares até ficar ereto, depois desça controlando.",
    },
  },
  {
    muscleGroup: "BACK",
    muscle: "LATS",
    title: "Pull-Up",
    description:
      "Hang from a bar with an overhand grip wider than your shoulders. Pull yourself up until your chin passes the bar, then lower under control.",
    pt: {
      title: "Barra Fixa (Pronada)",
      description:
        "Pendure na barra com pegada pronada mais aberta que os ombros. Puxe até o queixo passar da barra e desça controlando.",
    },
  },
  {
    muscleGroup: "BACK",
    muscle: "LATS",
    title: "Chin-Up",
    description:
      "Hang from a bar with an underhand shoulder-width grip. Pull up until your chin clears the bar, then lower slowly.",
    pt: {
      title: "Barra Fixa (Supinada)",
      description:
        "Pendure na barra com pegada supinada na largura dos ombros. Puxe até o queixo passar da barra e desça devagar.",
    },
  },
  {
    muscleGroup: "BACK",
    muscle: "LATS",
    title: "Lat Pulldown",
    description:
      "Sit and grip the bar wider than your shoulders. Pull it down to your upper chest while keeping your chest up, then let it rise under control.",
    pt: {
      title: "Puxada Alta",
      description:
        "Sentado, segure a barra mais aberto que os ombros. Puxe até a parte alta do peito com o peito aberto e solte controlando.",
    },
  },
  {
    muscleGroup: "BACK",
    muscle: "LATS",
    title: "Bent-Over Barbell Row",
    description:
      "Hold a barbell and hinge forward until your torso is near parallel to the floor with a flat back. Pull the bar to your lower ribs, then lower it.",
    pt: {
      title: "Remada Curvada",
      description:
        "Segure a barra e incline o tronco quase paralelo ao chão com a coluna reta. Puxe a barra até as costelas baixas e desça.",
    },
  },
  {
    muscleGroup: "BACK",
    muscle: "LATS",
    title: "Seated Cable Row",
    description:
      "Sit with your feet braced and grab the handle. Pull it to your belly while keeping your back straight, then extend your arms forward slowly.",
    pt: {
      title: "Remada Sentada na Polia",
      description:
        "Sentado com os pés apoiados, pegue o triângulo. Puxe até a barriga mantendo a coluna reta e estenda os braços à frente devagar.",
    },
  },
  {
    muscleGroup: "BACK",
    muscle: "LATS",
    title: "T-Bar Row",
    description:
      "Straddle the bar and hinge forward with a flat back. Pull the handle up to your chest, then lower under control.",
    pt: {
      title: "Remada Cavalinho",
      description:
        "Fique sobre a barra e incline o tronco com a coluna reta. Puxe a pegada até o peito e desça controlando.",
    },
  },
  {
    muscleGroup: "BACK",
    muscle: "LATS",
    title: "Single-Arm Dumbbell Row",
    description:
      "Put one knee and one hand on a bench and hold a dumbbell in the other hand. Pull it up to your hip, then lower it fully.",
    pt: {
      title: "Remada Unilateral (Serrote)",
      description:
        "Apoie um joelho e uma mão no banco e segure o halter na outra mão. Puxe até o quadril e desça completamente.",
    },
  },
  {
    muscleGroup: "BACK",
    muscle: "TRAPS",
    title: "Barbell Shrug",
    description:
      "Hold a barbell with your arms straight. Lift your shoulders straight up toward your ears, pause, then lower.",
    pt: {
      title: "Encolhimento com Barra",
      description:
        "Segure a barra com os braços estendidos. Eleve os ombros na vertical em direção às orelhas, segure e desça.",
    },
  },
  {
    muscleGroup: "BACK",
    muscle: "LATS",
    title: "Straight-Arm Pulldown",
    description:
      "Stand facing a high pulley and hold the bar with straight arms. Pull it down to your thighs in an arc without bending your elbows, then return.",
    pt: {
      title: "Pullover na Polia",
      description:
        "Em pé de frente para a polia alta, segure a barra com os braços estendidos. Puxe em arco até as coxas sem dobrar os cotovelos e volte.",
    },
  },
  {
    muscleGroup: "BACK",
    muscle: "LOWER_BACK",
    title: "Back Extension",
    description:
      "Position your hips on the pad with your feet anchored. Lower your torso toward the floor, then raise it until your body is straight.",
    pt: {
      title: "Hiperextensão Lombar",
      description:
        "Apoie o quadril no banco com os pés presos. Desça o tronco em direção ao chão e suba até alinhar o corpo.",
    },
  },
  {
    muscleGroup: "BACK",
    muscle: "RHOMBOIDS",
    title: "Band Pull-Apart",
    description:
      "Hold a resistance band in front of you at chest height with straight arms. Pull the band apart by squeezing your shoulder blades together, then return slowly.",
    pt: {
      title: "Abertura com Elástico",
      description:
        "Segure um elástico à frente do corpo na altura do peito com os braços estendidos. Abra os braços juntando as escápulas e volte devagar.",
    },
  },
  {
    muscleGroup: "BACK",
    muscle: "RHOMBOIDS",
    title: "Wide-Grip Seated Row",
    description:
      "Sit at the cable row with a wide bar. Pull it to your upper abdomen leading with your elbows out to the sides and squeezing your shoulder blades, then extend forward.",
    pt: {
      title: "Remada Sentada Pegada Aberta",
      description:
        "Sente na remada baixa com a barra larga. Puxe até a parte alta do abdômen com os cotovelos abertos, juntando as escápulas, e estenda à frente.",
    },
  },
  {
    muscleGroup: "BACK",
    muscle: "LATS",
    title: "Assisted Pull-Up",
    description:
      "Kneel or stand on the machine's pad and grip the bar overhead. The counterweight offsets part of your body weight, so pull up until your chin passes the bar, then lower under control.",
    pt: {
      title: "Barra Fixa Assistida (Graviton)",
      description:
        "Ajoelhe ou fique no apoio da máquina e segure a barra acima. O contrapeso alivia parte do seu peso: puxe até o queixo passar da barra e desça controlando.",
    },
  },
  {
    muscleGroup: "BACK",
    muscle: "LATS",
    title: "Reverse-Grip Lat Pulldown",
    description:
      "Sit at the pulldown station and grip the bar underhand at shoulder width. Pull it down to your upper chest keeping your chest up, then let it rise under control.",
    pt: {
      title: "Puxada Supinada",
      description:
        "Sentado na polia alta, segure a barra em pegada supinada na largura dos ombros. Puxe até a parte alta do peito com o peito aberto e solte controlando.",
    },
  },
  {
    muscleGroup: "BACK",
    muscle: "LATS",
    title: "Close-Grip Lat Pulldown",
    description:
      "Attach a triangle handle to the high pulley and grip it with your palms facing each other. Pull it down to your chest, then let it rise under control.",
    pt: {
      title: "Puxada com Triângulo",
      description:
        "Prenda o triângulo na polia alta e segure com as palmas voltadas uma para a outra. Puxe até o peito e solte controlando.",
    },
  },
  {
    muscleGroup: "BACK",
    muscle: "LATS",
    title: "Machine Lat Pulldown",
    description:
      "Sit in the machine with the pads over your thighs and grip the handles overhead. Pull them down to shoulder level, then return under control.",
    pt: {
      title: "Puxada Articulada",
      description:
        "Sente na máquina com os apoios sobre as coxas e segure as manoplas acima. Puxe até a altura dos ombros e volte controlando.",
    },
  },
  {
    muscleGroup: "BACK",
    muscle: "LATS",
    title: "Chest-Supported Dumbbell Row",
    description:
      "Lie face down on an incline bench holding a dumbbell in each hand. Row them up toward your hips, squeeze your shoulder blades, then lower under control.",
    pt: {
      title: "Remada com Halteres no Banco Inclinado",
      description:
        "Deite de bruços no banco inclinado com um halter em cada mão. Puxe em direção ao quadril, junte as escápulas e desça controlando.",
    },
  },
  {
    muscleGroup: "BACK",
    muscle: "LATS",
    title: "Machine Row",
    description:
      "Sit with your chest against the pad and grip the handles. Pull them toward your torso squeezing your shoulder blades together, then return under control.",
    pt: {
      title: "Remada Articulada",
      description:
        "Sente com o peito no apoio e segure as manoplas. Puxe em direção ao tronco juntando as escápulas e volte controlando.",
    },
  },
  {
    muscleGroup: "BACK",
    muscle: "LATS",
    title: "Chest-Supported T-Bar Row",
    description:
      "Lie chest-down on the angled pad and grip the handles. Pull the weight up toward your chest, then lower it under control. The pad takes the lower back out of the movement.",
    pt: {
      title: "Remada Cavalo com Apoio no Peito",
      description:
        "Apoie o peito no suporte inclinado e segure as manoplas. Puxe o peso em direção ao peito e desça controlando. O apoio tira a lombar do movimento.",
    },
  },
  {
    muscleGroup: "BACK",
    muscle: "TRAPS",
    title: "Dumbbell Shrug",
    description:
      "Stand holding a dumbbell in each hand at your sides. Lift your shoulders straight up toward your ears, hold for a moment, then lower.",
    pt: {
      title: "Encolhimento com Halteres",
      description:
        "Em pé com um halter em cada mão ao lado do corpo, eleve os ombros em direção às orelhas, segure um instante e desça.",
    },
  },

  {
    muscleGroup: "SHOULDERS",
    muscle: "SHOULDERS_GENERAL",
    title: "Overhead Press",
    description:
      "Stand holding a barbell at shoulder height. Press it straight overhead until your arms lock out, then lower it back to your shoulders.",
    pt: {
      title: "Desenvolvimento Militar",
      description:
        "Em pé com a barra na altura dos ombros, empurre para cima até estender os braços e desça de volta aos ombros.",
    },
  },
  {
    muscleGroup: "SHOULDERS",
    muscle: "SHOULDERS_GENERAL",
    title: "Seated Dumbbell Shoulder Press",
    description:
      "Sit upright with dumbbells at shoulder height. Press them overhead until your arms straighten, then lower under control.",
    pt: {
      title: "Desenvolvimento com Halteres",
      description:
        "Sentado ereto com os halteres na altura dos ombros, empurre para cima até estender os braços e desça controlando.",
    },
  },
  {
    muscleGroup: "SHOULDERS",
    muscle: "SIDE_DELTOID",
    title: "Lateral Raise",
    description:
      "Hold a dumbbell in each hand at your sides. Raise your arms out to shoulder height with a slight elbow bend, then lower slowly.",
    pt: {
      title: "Elevação Lateral",
      description:
        "Com um halter em cada mão ao lado do corpo, eleve os braços até a altura dos ombros com leve flexão de cotovelo e desça devagar.",
    },
  },
  {
    muscleGroup: "SHOULDERS",
    muscle: "FRONT_DELTOID",
    title: "Front Raise",
    description:
      "Hold a weight in front of your thighs. Raise it forward to shoulder height with straight arms, then lower under control.",
    pt: {
      title: "Elevação Frontal",
      description:
        "Segure o peso à frente das coxas. Eleve para frente até a altura dos ombros com os braços estendidos e desça controlando.",
    },
  },
  {
    muscleGroup: "SHOULDERS",
    muscle: "REAR_DELTOID",
    title: "Reverse Fly",
    description:
      "Hinge forward holding dumbbells with a slight elbow bend. Open your arms out to the sides until they're level with your shoulders, then lower.",
    pt: {
      title: "Crucifixo Invertido",
      description:
        "Incline o tronco com halteres e leve flexão de cotovelo. Abra os braços para os lados até a altura dos ombros e desça.",
    },
  },
  {
    muscleGroup: "SHOULDERS",
    muscle: "REAR_DELTOID",
    title: "Face Pull",
    description:
      "Set a rope at head height. Pull it toward your face with your elbows high and your hands finishing beside your ears, then return.",
    pt: {
      title: "Face Pull",
      description:
        "Deixe a corda na altura da cabeça. Puxe em direção ao rosto com os cotovelos altos e as mãos terminando ao lado das orelhas, depois volte.",
    },
  },
  {
    muscleGroup: "SHOULDERS",
    muscle: "SIDE_DELTOID",
    title: "Upright Row",
    description:
      "Hold a barbell in front of your thighs. Pull it straight up to chest height leading with your elbows, then lower.",
    pt: {
      title: "Remada Alta",
      description:
        "Segure a barra à frente das coxas. Puxe para cima até a altura do peito conduzindo com os cotovelos e desça.",
    },
  },
  {
    muscleGroup: "SHOULDERS",
    muscle: "SHOULDERS_GENERAL",
    title: "Arnold Press",
    description:
      "Start with dumbbells in front of your shoulders, palms facing you. Rotate your wrists outward as you press overhead, then reverse the path down.",
    pt: {
      title: "Desenvolvimento Arnold",
      description:
        "Comece com os halteres à frente dos ombros com as palmas voltadas para você. Gire os punhos para fora enquanto empurra para cima e faça o caminho inverso na descida.",
    },
  },
  {
    muscleGroup: "SHOULDERS",
    muscle: "SHOULDERS_GENERAL",
    title: "Shoulder Press Machine",
    description:
      "Sit with your back against the pad and grip the handles at shoulder height. Press up until your arms are straight, then lower under control.",
    pt: {
      title: "Desenvolvimento Articulado",
      description:
        "Sente com as costas no apoio e segure as manoplas na altura dos ombros. Empurre até estender os braços e desça controlando.",
    },
  },
  {
    muscleGroup: "SHOULDERS",
    muscle: "SIDE_DELTOID",
    title: "Cable Lateral Raise",
    description:
      "Stand side-on to a low pulley and take the handle in your outside hand. Raise your arm out to the side up to shoulder height, then lower slowly. The cable keeps tension through the whole range.",
    pt: {
      title: "Elevação Lateral na Polia",
      description:
        "Fique de lado para a polia baixa e pegue a manopla com a mão de fora. Eleve o braço para o lado até a altura do ombro e desça devagar. A polia mantém tensão no movimento inteiro.",
    },
  },
  {
    muscleGroup: "SHOULDERS",
    muscle: "SIDE_DELTOID",
    title: "Machine Lateral Raise",
    description:
      "Sit with the pads against your outer arms. Push your arms out and up to shoulder height, then return under control.",
    pt: {
      title: "Elevação Lateral na Máquina",
      description:
        "Sente com os apoios na parte externa dos braços. Empurre os braços para fora e para cima até a altura dos ombros e volte controlando.",
    },
  },
  {
    muscleGroup: "SHOULDERS",
    muscle: "REAR_DELTOID",
    title: "Reverse Pec Deck",
    description:
      "Sit facing the pec deck pad and grip the handles in front of you. Open your arms out to the sides squeezing your shoulder blades, then return under control.",
    pt: {
      title: "Voador Invertido (Peck Deck)",
      description:
        "Sente de frente para o apoio do voador e segure as manoplas à sua frente. Abra os braços para os lados juntando as escápulas e volte controlando.",
    },
  },

  {
    muscleGroup: "ARMS",
    muscle: "BICEPS",
    title: "Barbell Curl",
    description:
      "Stand holding a barbell with an underhand shoulder-width grip. Curl it up toward your chest keeping your elbows pinned to your sides, then lower slowly. Emphasizes the short head of the biceps.",
    pt: {
      title: "Rosca Direta",
      description:
        "Em pé com a barra em pegada supinada na largura dos ombros, flexione em direção ao peito mantendo os cotovelos junto ao corpo e desça devagar. Enfatiza a cabeça curta do bíceps.",
    },
  },
  {
    muscleGroup: "ARMS",
    muscle: "BICEPS",
    title: "Dumbbell Curl",
    description:
      "Hold a dumbbell in each hand. Curl one arm up while rotating your palm upward, lower it, then repeat with the other arm. Emphasizes the long head of the biceps.",
    pt: {
      title: "Rosca Alternada",
      description:
        "Com um halter em cada mão, flexione um braço girando a palma para cima, desça e repita com o outro braço. Enfatiza a cabeça longa do bíceps.",
    },
  },
  {
    muscleGroup: "ARMS",
    muscle: "BICEPS",
    title: "Incline Dumbbell Curl",
    description:
      "Sit back on an incline bench with your arms hanging down. Curl the dumbbells up without moving your elbows forward, then lower fully. Starting with the arms behind the torso emphasizes the long head of the biceps.",
    pt: {
      title: "Rosca Inclinada",
      description:
        "Recline no banco inclinado com os braços pendendo. Flexione os halteres sem levar os cotovelos à frente e desça completamente. Começar com os braços atrás do tronco enfatiza a cabeça longa do bíceps.",
    },
  },
  {
    muscleGroup: "ARMS",
    muscle: "BICEPS",
    title: "Preacher Curl",
    description:
      "Rest the back of your upper arms on the preacher pad. Curl the bar up toward your shoulders, then lower until your arms are almost straight. Emphasizes the short head of the biceps.",
    pt: {
      title: "Rosca Scott",
      description:
        "Apoie a parte de trás dos braços no banco Scott. Flexione a barra em direção aos ombros e desça até quase estender os braços. Enfatiza a cabeça curta do bíceps.",
    },
  },
  {
    muscleGroup: "ARMS",
    muscle: "BICEPS",
    title: "Concentration Curl",
    description:
      "Sit and brace your elbow against your inner thigh. Curl the dumbbell up to your shoulder, then lower slowly. Emphasizes the short head of the biceps.",
    pt: {
      title: "Rosca Concentrada",
      description:
        "Sentado, apoie o cotovelo na parte interna da coxa. Flexione o halter até o ombro e desça devagar. Enfatiza a cabeça curta do bíceps.",
    },
  },
  {
    muscleGroup: "ARMS",
    muscle: "BICEPS",
    title: "Hammer Curl",
    description:
      "Hold dumbbells with your palms facing each other. Curl them up keeping that neutral grip, then lower under control. The neutral grip emphasizes the brachioradialis in the forearm.",
    pt: {
      title: "Rosca Martelo",
      description:
        "Com os halteres e as palmas voltadas uma para a outra, flexione mantendo a pegada neutra e desça controlando. A pegada neutra enfatiza o braquiorradial do antebraço.",
    },
  },
  {
    muscleGroup: "ARMS",
    muscle: "TRICEPS",
    title: "Triceps Pushdown",
    description:
      "Face a high pulley and grip the bar with your elbows at your sides. Push it down until your arms are straight, then let it rise back. Emphasizes the lateral head of the triceps.",
    pt: {
      title: "Tríceps na Polia",
      description:
        "De frente para a polia alta, segure a barra com os cotovelos junto ao corpo. Empurre até estender os braços e deixe voltar. Enfatiza a cabeça lateral do tríceps.",
    },
  },
  {
    muscleGroup: "ARMS",
    muscle: "TRICEPS",
    title: "Rope Pushdown",
    description:
      "Grip a rope on a high pulley. Push down and spread the ends apart at the bottom until your arms are straight, then return slowly. Emphasizes the lateral head of the triceps.",
    pt: {
      title: "Tríceps Corda",
      description:
        "Segure a corda na polia alta. Empurre para baixo afastando as pontas no final até estender os braços e volte devagar. Enfatiza a cabeça lateral do tríceps.",
    },
  },
  {
    muscleGroup: "ARMS",
    muscle: "TRICEPS",
    title: "Overhead Triceps Extension",
    description:
      "Hold a weight overhead with both hands. Lower it behind your head by bending only your elbows, then extend back up. With the arms overhead it emphasizes the long head of the triceps.",
    pt: {
      title: "Tríceps Francês",
      description:
        "Segure o peso acima da cabeça com as duas mãos. Desça atrás da cabeça flexionando só os cotovelos e estenda de volta. Com os braços acima da cabeça, enfatiza a cabeça longa do tríceps.",
    },
  },
  {
    muscleGroup: "ARMS",
    muscle: "TRICEPS",
    title: "Skull Crusher",
    description:
      "Lie on a bench holding an EZ-bar over your chest. Lower it toward your forehead by bending only your elbows, then extend back up. Emphasizes the long head of the triceps.",
    pt: {
      title: "Tríceps Testa",
      description:
        "Deite no banco com a barra W sobre o peito. Desça em direção à testa flexionando só os cotovelos e estenda de volta. Enfatiza a cabeça longa do tríceps.",
    },
  },
  {
    muscleGroup: "ARMS",
    muscle: "TRICEPS",
    title: "Close-Grip Bench Press",
    description:
      "Lie on a flat bench and grip the bar about shoulder-width. Lower it to your lower chest with your elbows tucked, then press up. Emphasizes the lateral head of the triceps.",
    pt: {
      title: "Supino Fechado",
      description:
        "Deite no banco reto e segure a barra na largura dos ombros. Desça até a parte baixa do peito com os cotovelos junto ao corpo e empurre. Enfatiza a cabeça lateral do tríceps.",
    },
  },
  {
    muscleGroup: "ARMS",
    muscle: "TRICEPS",
    title: "Triceps Dip",
    description:
      "On parallel bars keep your torso upright. Lower yourself until your elbows reach about 90°, then press back up. Emphasizes the lateral head of the triceps.",
    pt: {
      title: "Mergulho para Tríceps",
      description:
        "Nas paralelas mantenha o tronco ereto. Desça até os cotovelos formarem cerca de 90° e empurre para subir. Enfatiza a cabeça lateral do tríceps.",
    },
  },
  {
    muscleGroup: "ARMS",
    muscle: "FOREARMS",
    title: "Wrist Curl",
    description:
      "Rest your forearms on your thighs with a barbell in your hands. Let it roll down to your fingers, then curl your wrists up. Works the wrist flexors, on the inner side of the forearm.",
    pt: {
      title: "Rosca de Punho",
      description:
        "Apoie os antebraços nas coxas com a barra nas mãos. Deixe rolar até os dedos e flexione os punhos para cima. Trabalha os flexores do punho, na parte interna do antebraço.",
    },
  },
  {
    muscleGroup: "ARMS",
    muscle: "FOREARMS",
    title: "Reverse Barbell Curl",
    description:
      "Hold a barbell with an overhand grip. Curl it up toward your chest keeping your elbows still, then lower slowly. The overhand grip emphasizes the brachioradialis in the forearm.",
    pt: {
      title: "Rosca Inversa",
      description:
        "Segure a barra com pegada pronada. Flexione em direção ao peito mantendo os cotovelos parados e desça devagar. A pegada pronada enfatiza o braquiorradial do antebraço.",
    },
  },
  {
    muscleGroup: "ARMS",
    muscle: "ARMS_GENERAL",
    title: "Zottman Curl",
    description:
      "Curl dumbbells up with your palms facing up, rotate your wrists so your palms face down at the top, then lower slowly in that reversed grip.",
    pt: {
      title: "Rosca Zottman",
      description:
        "Flexione os halteres com as palmas para cima, gire os punhos para baixo no topo e desça devagar nessa pegada invertida.",
    },
  },
  {
    muscleGroup: "ARMS",
    muscle: "TRICEPS",
    title: "Reverse-Grip Triceps Pushdown",
    description:
      "Face a high pulley and grip the bar with your palms facing up and elbows at your sides. Push down until your arms are straight, then return under control. The underhand grip emphasizes the medial head of the triceps.",
    pt: {
      title: "Tríceps Pulley Supinado",
      description:
        "De frente para a polia alta, segure a barra com as palmas para cima e os cotovelos junto ao corpo. Empurre até estender os braços e volte controlando. A pegada supinada enfatiza a cabeça medial do tríceps.",
    },
  },
  {
    muscleGroup: "ARMS",
    muscle: "FOREARMS",
    title: "Farmer's Walk",
    description:
      "Hold a heavy dumbbell in each hand at your sides. Stand tall and walk in a straight line for the set distance without letting your grip slip.",
    pt: {
      title: "Caminhada do Fazendeiro",
      description:
        "Segure um halter pesado em cada mão ao lado do corpo. Fique ereto e caminhe em linha reta pela distância combinada sem soltar a pegada.",
    },
  },
  {
    muscleGroup: "ARMS",
    muscle: "FOREARMS",
    title: "Dumbbell Pronation",
    description:
      "Rest your forearm on a bench holding a dumbbell by one end with your palm up. Rotate your wrist until the palm faces down, then return slowly. Works the pronator teres, the muscle that rotates the forearm.",
    pt: {
      title: "Pronação com Halter",
      description:
        "Apoie o antebraço no banco segurando o halter por uma ponta com a palma para cima. Gire o punho até a palma ficar para baixo e volte devagar. Trabalha o pronador redondo, o músculo que gira o antebraço.",
    },
  },
  {
    muscleGroup: "ARMS",
    muscle: "FOREARMS",
    title: "Reverse Wrist Curl",
    description:
      "Rest your forearms on your thighs holding a barbell with an overhand grip. Lift the backs of your hands toward you by extending your wrists, then lower. Works the wrist extensors, on the outer side of the forearm.",
    pt: {
      title: "Rosca Inversa de Punho",
      description:
        "Apoie os antebraços nas coxas segurando a barra com pegada pronada. Levante o dorso das mãos estendendo os punhos e desça. Trabalha os extensores do punho, na parte externa do antebraço.",
    },
  },
  {
    muscleGroup: "ARMS",
    muscle: "BICEPS",
    title: "EZ-Bar Curl",
    description:
      "Stand holding an EZ-bar on the angled part of the grip. Curl it up toward your chest with your elbows at your sides, then lower slowly. The angled grip is easier on the wrists than a straight bar.",
    pt: {
      title: "Rosca Direta com Barra W",
      description:
        "Em pé segurando a barra W na parte angulada. Flexione em direção ao peito com os cotovelos junto ao corpo e desça devagar. A pegada angulada pesa menos nos punhos que a barra reta.",
    },
  },
  {
    muscleGroup: "ARMS",
    muscle: "BICEPS",
    title: "Dumbbell Biceps Curl",
    description:
      "Hold a dumbbell in each hand with your palms facing forward. Curl both arms up at the same time keeping your elbows still, then lower slowly.",
    pt: {
      title: "Rosca Simultânea com Halteres",
      description:
        "Com um halter em cada mão e as palmas para frente, flexione os dois braços ao mesmo tempo mantendo os cotovelos parados e desça devagar.",
    },
  },
  {
    muscleGroup: "ARMS",
    muscle: "BICEPS",
    title: "Machine Preacher Curl",
    description:
      "Sit with the back of your upper arms flat on the pad and grip the handles. Curl up toward your shoulders, then lower until your arms are almost straight.",
    pt: {
      title: "Rosca Scott na Máquina",
      description:
        "Sente com a parte de trás dos braços apoiada e segure as manoplas. Flexione em direção aos ombros e desça até quase estender os braços.",
    },
  },
  {
    muscleGroup: "ARMS",
    muscle: "BICEPS",
    title: "Cable Curl",
    description:
      "Attach a bar to a low pulley and grip it underhand. Curl it up toward your chest with your elbows at your sides, then lower under control. The cable keeps tension at the bottom, where a barbell loses it.",
    pt: {
      title: "Rosca na Polia Baixa",
      description:
        "Prenda uma barra na polia baixa e segure em pegada supinada. Flexione em direção ao peito com os cotovelos junto ao corpo e desça controlando. A polia mantém tensão embaixo, onde a barra perde.",
    },
  },
  {
    muscleGroup: "ARMS",
    muscle: "TRICEPS",
    title: "Dumbbell Skull Crusher",
    description:
      "Lie on a bench holding a dumbbell in each hand above your chest. Lower them toward your forehead by bending only your elbows, then extend back up.",
    pt: {
      title: "Tríceps Testa com Halteres",
      description:
        "Deite no banco com um halter em cada mão acima do peito. Desça em direção à testa flexionando só os cotovelos e estenda de volta.",
    },
  },
  {
    muscleGroup: "ARMS",
    muscle: "TRICEPS",
    title: "Overhead Cable Extension",
    description:
      "Face away from a low pulley holding a rope overhead. Extend your arms straight up, then let your elbows bend to lower it behind your head. Emphasizes the long head of the triceps.",
    pt: {
      title: "Tríceps Francês na Polia",
      description:
        "De costas para a polia baixa segurando a corda acima da cabeça, estenda os braços para cima e deixe os cotovelos flexionarem para descer atrás da cabeça. Enfatiza a cabeça longa do tríceps.",
    },
  },
  {
    muscleGroup: "ARMS",
    muscle: "TRICEPS",
    title: "Bench Dip",
    description:
      "Sit on the edge of a bench with your hands beside your hips and your feet out in front. Slide off and lower yourself until your elbows reach about 90°, then press back up.",
    pt: {
      title: "Tríceps no Banco",
      description:
        "Sente na beirada do banco com as mãos ao lado do quadril e os pés à frente. Saia do banco e desça até os cotovelos formarem cerca de 90°, depois empurre para subir.",
    },
  },
  {
    muscleGroup: "ARMS",
    muscle: "TRICEPS",
    title: "Triceps Extension Machine",
    description:
      "Sit with your upper arms on the pad and grip the handles. Extend your arms until they are straight, then return under control.",
    pt: {
      title: "Tríceps na Máquina",
      description:
        "Sente com os braços apoiados e segure as manoplas. Estenda os braços até ficarem retos e volte controlando.",
    },
  },

  {
    muscleGroup: "LEGS",
    muscle: "QUADRICEPS",
    title: "Barbell Back Squat",
    description:
      "Set the bar on your upper back with feet shoulder-width. Bend your hips and knees to squat down until your thighs are at least parallel, then drive back up.",
    pt: {
      title: "Agachamento Livre",
      description:
        "Apoie a barra nas costas com os pés na largura dos ombros. Flexione quadril e joelhos até as coxas ficarem ao menos paralelas e suba empurrando o chão.",
    },
  },
  {
    muscleGroup: "LEGS",
    muscle: "QUADRICEPS",
    title: "Front Squat",
    description:
      "Rest the bar across the front of your shoulders. Squat down keeping your torso upright and elbows high, then stand back up.",
    pt: {
      title: "Agachamento Frontal",
      description:
        "Apoie a barra na frente dos ombros. Agache mantendo o tronco ereto e os cotovelos altos, depois suba.",
    },
  },
  {
    muscleGroup: "LEGS",
    muscle: "QUADRICEPS",
    title: "Leg Press",
    description:
      "Sit in the machine with your feet on the platform. Lower it by bending your knees toward your chest, then press back until your legs are nearly straight.",
    pt: {
      title: "Leg Press",
      description:
        "Sente na máquina com os pés na plataforma. Desça flexionando os joelhos em direção ao peito e empurre até quase estender as pernas.",
    },
  },
  {
    muscleGroup: "LEGS",
    muscle: "QUADRICEPS",
    title: "Hack Squat",
    description:
      "Stand on the hack machine with your shoulders under the pads. Lower into a squat, then push through your feet to stand back up.",
    pt: {
      title: "Agachamento Hack",
      description:
        "Fique na máquina hack com os ombros sob os apoios. Desça agachando e empurre com os pés para subir.",
    },
  },
  {
    muscleGroup: "LEGS",
    muscle: "QUADRICEPS",
    title: "Leg Extension",
    description:
      "Sit with the pad against your lower shins. Extend your knees until your legs are straight, then lower under control.",
    pt: {
      title: "Cadeira Extensora",
      description:
        "Sente com o apoio nas canelas. Estenda os joelhos até esticar as pernas e desça controlando.",
    },
  },
  {
    muscleGroup: "LEGS",
    muscle: "HAMSTRINGS",
    title: "Romanian Deadlift",
    description:
      "Hold a barbell and push your hips back with a slight knee bend. Lower the bar along your legs until you feel a stretch in the back of your thighs, then stand up.",
    pt: {
      title: "Levantamento Terra Romeno",
      description:
        "Segure a barra e jogue o quadril para trás com leve flexão de joelho. Desça a barra rente às pernas até sentir alongar a parte de trás das coxas e suba.",
    },
  },
  {
    muscleGroup: "LEGS",
    muscle: "HAMSTRINGS",
    title: "Lying Leg Curl",
    description:
      "Lie face down with the pad on the back of your ankles. Curl your heels toward your glutes, then lower slowly.",
    pt: {
      title: "Mesa Flexora",
      description:
        "Deite de bruços com o apoio atrás dos tornozelos. Flexione os calcanhares em direção aos glúteos e desça devagar.",
    },
  },
  {
    muscleGroup: "LEGS",
    muscle: "HAMSTRINGS",
    title: "Seated Leg Curl",
    description:
      "Sit with the pad on your lower legs. Bend your knees to pull your heels under the seat, then return under control.",
    pt: {
      title: "Cadeira Flexora",
      description:
        "Sente com o apoio sobre as pernas. Flexione os joelhos puxando os calcanhares para baixo e volte controlando.",
    },
  },
  {
    muscleGroup: "LEGS",
    muscle: "QUADRICEPS",
    title: "Bulgarian Split Squat",
    description:
      "Place your rear foot on a bench behind you. Lower into a lunge on the front leg until your thigh is parallel, then push back up.",
    pt: {
      title: "Agachamento Búlgaro",
      description:
        "Apoie o pé de trás em um banco atrás de você. Desça em afundo na perna da frente até a coxa ficar paralela e suba.",
    },
  },
  {
    muscleGroup: "LEGS",
    muscle: "QUADRICEPS",
    title: "Walking Lunge",
    description:
      "Step forward into a lunge until both knees reach about 90°. Push off the front foot and step through into the next lunge.",
    pt: {
      title: "Afundo (Avanço)",
      description:
        "Dê um passo à frente em afundo até os dois joelhos formarem cerca de 90°. Empurre com o pé da frente e avance para o próximo passo.",
    },
  },
  {
    muscleGroup: "LEGS",
    muscle: "CALVES",
    title: "Standing Calf Raise",
    description:
      "With the balls of your feet on a step, rise as high as you can onto your toes, then lower your heels below the step for a stretch.",
    pt: {
      title: "Panturrilha em Pé",
      description:
        "Com a ponta dos pés em um degrau, suba o máximo na ponta dos pés e desça os calcanhares abaixo do degrau para alongar.",
    },
  },
  {
    muscleGroup: "LEGS",
    muscle: "CALVES",
    title: "Seated Calf Raise",
    description:
      "Sit with the pad on your knees and the balls of your feet on the platform. Raise your heels as high as possible, then lower them fully.",
    pt: {
      title: "Panturrilha Sentado",
      description:
        "Sente com o apoio sobre os joelhos e a ponta dos pés na plataforma. Eleve os calcanhares o máximo e desça completamente.",
    },
  },
  {
    muscleGroup: "LEGS",
    muscle: "LEGS_GENERAL",
    title: "Goblet Squat",
    description:
      "Hold a dumbbell or kettlebell against your chest with both hands. Squat down keeping your torso upright and elbows inside your knees, then stand back up.",
    pt: {
      title: "Agachamento Goblet",
      description:
        "Segure um halter ou kettlebell junto ao peito com as duas mãos. Agache mantendo o tronco ereto e os cotovelos por dentro dos joelhos, depois suba.",
    },
  },
  {
    muscleGroup: "LEGS",
    muscle: "LEGS_GENERAL",
    title: "Box Step-Up",
    description:
      "Place one foot on a box or bench at knee height. Drive through that leg to stand up on top, then lower yourself back down under control.",
    pt: {
      title: "Subida no Banco",
      description:
        "Apoie um pé em um banco na altura do joelho. Empurre com essa perna para subir e desça controlando.",
    },
  },
  {
    muscleGroup: "LEGS",
    muscle: "QUADRICEPS",
    title: "Smith Machine Squat",
    description:
      "Stand under the Smith bar with it resting on your upper back and your feet slightly forward. Squat down until your thighs are about parallel, then drive back up.",
    pt: {
      title: "Agachamento no Smith",
      description:
        "Fique sob a barra do Smith com ela apoiada na parte alta das costas e os pés um pouco à frente. Agache até as coxas ficarem quase paralelas e suba empurrando o chão.",
    },
  },
  {
    muscleGroup: "LEGS",
    muscle: "QUADRICEPS",
    title: "Bodyweight Squat",
    description:
      "Stand with your feet shoulder-width apart. Squat down until your thighs are about parallel to the floor keeping your chest up, then stand back up.",
    pt: {
      title: "Agachamento Livre sem Carga",
      description:
        "Em pé com os pés na largura dos ombros, agache até as coxas ficarem quase paralelas ao chão mantendo o peito aberto e volte a subir.",
    },
  },
  {
    muscleGroup: "LEGS",
    muscle: "QUADRICEPS",
    title: "Horizontal Leg Press",
    description:
      "Sit in the machine with your feet on the platform shoulder-width apart. Push it away until your legs are nearly straight, then let it come back until your knees are at about 90°.",
    pt: {
      title: "Leg Press Horizontal",
      description:
        "Sente na máquina com os pés na plataforma na largura dos ombros. Empurre até quase estender as pernas e deixe voltar até os joelhos formarem cerca de 90°.",
    },
  },
  {
    muscleGroup: "LEGS",
    muscle: "QUADRICEPS",
    title: "Dumbbell Lunge",
    description:
      "Stand holding a dumbbell in each hand. Step forward and lower until both knees are at about 90°, then push back to the start. Repeat on the other leg.",
    pt: {
      title: "Afundo com Halteres",
      description:
        "Em pé com um halter em cada mão, dê um passo à frente e desça até os dois joelhos formarem cerca de 90°, depois empurre para voltar. Repita com a outra perna.",
    },
  },
  {
    muscleGroup: "LEGS",
    muscle: "HAMSTRINGS",
    title: "Stiff-Leg Deadlift",
    description:
      "Stand holding a barbell in front of your thighs with your legs almost straight. Push your hips back and lower the bar along your legs until you feel a stretch, then stand back up.",
    pt: {
      title: "Stiff com Barra",
      description:
        "Em pé com a barra à frente das coxas e as pernas quase estendidas, jogue o quadril para trás e desça a barra rente às pernas até sentir alongamento, depois volte a subir.",
    },
  },
  {
    muscleGroup: "LEGS",
    muscle: "HAMSTRINGS",
    title: "Dumbbell Stiff-Leg Deadlift",
    description:
      "Hold a dumbbell in each hand in front of your thighs with your legs almost straight. Push your hips back and lower them along your legs, then stand back up.",
    pt: {
      title: "Stiff com Halteres",
      description:
        "Com um halter em cada mão à frente das coxas e as pernas quase estendidas, jogue o quadril para trás e desça rente às pernas, depois volte a subir.",
    },
  },
  {
    muscleGroup: "LEGS",
    muscle: "ADDUCTORS",
    title: "Hip Adduction Machine",
    description:
      "Sit with the pads against your inner thighs and your legs apart. Squeeze your legs together, then return under control.",
    pt: {
      title: "Cadeira Adutora",
      description:
        "Sente com os apoios na parte interna das coxas e as pernas afastadas. Junte as pernas e volte controlando.",
    },
  },
  {
    muscleGroup: "LEGS",
    muscle: "CALVES",
    title: "Leg Press Calf Raise",
    description:
      "Sit in the leg press with only the balls of your feet on the bottom edge of the platform. Push the platform away by extending your ankles, then let your heels drop for a stretch.",
    pt: {
      title: "Panturrilha no Leg Press",
      description:
        "Sente no leg press com só a ponta dos pés na borda de baixo da plataforma. Empurre estendendo os tornozelos e deixe os calcanhares descerem para alongar.",
    },
  },

  {
    muscleGroup: "GLUTES",
    muscle: "GLUTES_GENERAL",
    title: "Hip Thrust",
    description:
      "Rest your upper back on a bench with a barbell over your hips. Drive your hips up until your body is level, squeeze, then lower. Emphasizes the gluteus maximus.",
    pt: {
      title: "Elevação Pélvica",
      description:
        "Apoie a parte de cima das costas no banco com a barra sobre o quadril. Eleve o quadril até alinhar o corpo, contraia e desça. Enfatiza o glúteo máximo.",
    },
  },
  {
    muscleGroup: "GLUTES",
    muscle: "GLUTES_GENERAL",
    title: "Glute Bridge",
    description:
      "Lie on your back with knees bent and feet flat. Raise your hips until your body is straight, squeeze, then lower. Emphasizes the gluteus maximus.",
    pt: {
      title: "Ponte de Glúteo",
      description:
        "Deite de costas com os joelhos flexionados e os pés no chão. Eleve o quadril até alinhar o corpo, contraia e desça. Enfatiza o glúteo máximo.",
    },
  },
  {
    muscleGroup: "GLUTES",
    muscle: "GLUTES_GENERAL",
    title: "Sumo Deadlift",
    description:
      "Take a wide stance with your toes pointed out and grip the bar inside your legs. Stand up keeping your chest up and back flat, then lower.",
    pt: {
      title: "Levantamento Terra Sumô",
      description:
        "Pernas bem afastadas com as pontas dos pés para fora e pegue a barra por dentro das pernas. Suba com o peito aberto e a coluna reta, depois desça.",
    },
  },
  {
    muscleGroup: "GLUTES",
    muscle: "GLUTES_GENERAL",
    title: "Cable Glute Kickback",
    description:
      "Attach a strap to your ankle and hold on for balance. Push your leg straight back, squeeze the glute, then return under control. Emphasizes the gluteus maximus.",
    pt: {
      title: "Coice na Polia",
      description:
        "Prenda a caneleira no tornozelo e segure para se equilibrar. Empurre a perna para trás, contraia o glúteo e volte controlando. Enfatiza o glúteo máximo.",
    },
  },
  {
    muscleGroup: "GLUTES",
    muscle: "GLUTES_GENERAL",
    title: "Hip Abduction Machine",
    description:
      "Sit with the pads against your outer knees. Push your legs apart as far as possible, then return under control. Emphasizes the gluteus medius, on the side of the hip.",
    pt: {
      title: "Cadeira Abdutora",
      description:
        "Sente com os apoios na parte externa dos joelhos. Afaste as pernas o máximo possível e volte controlando. Enfatiza o glúteo médio, na lateral do quadril.",
    },
  },
  {
    muscleGroup: "GLUTES",
    muscle: "GLUTES_GENERAL",
    title: "Side-Lying Hip Abduction",
    description:
      "Lie on your side with your legs stacked and straight. Raise the top leg as high as you can without rotating your hips, then lower it slowly. Emphasizes the gluteus medius and minimus, on the side of the hip.",
    pt: {
      title: "Abdução de Quadril Deitado",
      description:
        "Deite de lado com as pernas alinhadas e estendidas. Eleve a perna de cima o máximo possível sem girar o quadril e desça devagar. Enfatiza o glúteo médio e o mínimo, na lateral do quadril.",
    },
  },
  {
    muscleGroup: "GLUTES",
    muscle: "GLUTES_GENERAL",
    title: "Hip Thrust Machine",
    description:
      "Sit in the machine with the pad across your hips and your back against the support. Drive your hips up until your body is level, squeeze, then lower.",
    pt: {
      title: "Elevação Pélvica na Máquina",
      description:
        "Sente na máquina com o apoio sobre o quadril e as costas no encosto. Eleve o quadril até alinhar o corpo, contraia e desça.",
    },
  },
  {
    muscleGroup: "GLUTES",
    muscle: "GLUTES_GENERAL",
    title: "Glute Kickback Machine",
    description:
      "Stand in the machine with one foot on the pad and hold the supports. Push your leg back until your hip is extended, squeeze the glute, then return under control.",
    pt: {
      title: "Glúteo na Máquina",
      description:
        "Fique na máquina com um pé no apoio e segure nas barras. Empurre a perna para trás até estender o quadril, contraia o glúteo e volte controlando.",
    },
  },

  {
    muscleGroup: "CORE",
    muscle: "CORE_GENERAL",
    title: "Plank",
    description:
      "Rest on your forearms and toes with your body in a straight line. Brace your core and hold the position without letting your hips sag.",
    pt: {
      title: "Prancha",
      description:
        "Apoie os antebraços e as pontas dos pés com o corpo em linha reta. Contraia o abdômen e segure a posição sem deixar o quadril cair.",
    },
  },
  {
    muscleGroup: "CORE",
    muscle: "ABS",
    title: "Crunch",
    description:
      "Lie on your back with knees bent. Curl your shoulders off the floor toward your knees, then lower slowly.",
    pt: {
      title: "Abdominal (Crunch)",
      description:
        "Deite de costas com os joelhos flexionados. Eleve os ombros do chão em direção aos joelhos e desça devagar.",
    },
  },
  {
    muscleGroup: "CORE",
    muscle: "ABS",
    title: "Hanging Leg Raise",
    description:
      "Hang from a bar and raise your legs until they're at least parallel to the floor, then lower them under control without swinging.",
    pt: {
      title: "Elevação de Pernas Suspenso",
      description:
        "Pendure na barra e eleve as pernas até ficarem ao menos paralelas ao chão, depois desça controlando sem balançar.",
    },
  },
  {
    muscleGroup: "CORE",
    muscle: "ABS",
    title: "Cable Crunch",
    description:
      "Kneel facing a high pulley and hold the rope beside your head. Crunch down by rounding your spine, then return under control.",
    pt: {
      title: "Abdominal na Polia",
      description:
        "Ajoelhe de frente para a polia alta e segure a corda ao lado da cabeça. Contraia para baixo arredondando a coluna e volte controlando.",
    },
  },
  {
    muscleGroup: "CORE",
    muscle: "OBLIQUES",
    title: "Russian Twist",
    description:
      "Sit with your torso leaned back and feet off the floor. Rotate your torso to touch the floor on each side, alternating.",
    pt: {
      title: "Rotação Russa (Russian Twist)",
      description:
        "Sente com o tronco inclinado para trás e os pés no ar. Gire o tronco para tocar o chão de cada lado, alternando.",
    },
  },
  {
    muscleGroup: "CORE",
    muscle: "OBLIQUES",
    title: "Side Plank",
    description:
      "Lie on your side propped on one forearm. Lift your hips until your body forms a straight line and hold.",
    pt: {
      title: "Prancha Lateral",
      description:
        "Deite de lado apoiado em um antebraço. Eleve o quadril até o corpo formar uma linha reta e segure.",
    },
  },
  {
    muscleGroup: "CORE",
    muscle: "CORE_GENERAL",
    title: "Ab Wheel Rollout",
    description:
      "Kneel holding the wheel under your shoulders. Roll it forward as far as you can control with a tight core, then pull yourself back.",
    pt: {
      title: "Roda Abdominal",
      description:
        "Ajoelhe segurando a roda sob os ombros. Role para frente o máximo que conseguir controlar com o abdômen firme e puxe de volta.",
    },
  },
  {
    muscleGroup: "CORE",
    muscle: "ABS",
    title: "Ab Crunch Machine",
    description:
      "Sit with your chest against the pad and grip the handles. Curl your torso down toward your hips, then return under control.",
    pt: {
      title: "Abdominal na Máquina",
      description:
        "Sente com o peito no apoio e segure as manoplas. Encolha o tronco em direção ao quadril e volte controlando.",
    },
  },
  {
    muscleGroup: "CORE",
    muscle: "ABS",
    title: "Lying Leg Raise",
    description:
      "Lie on your back with your legs straight and your hands under your hips. Raise your legs until they are vertical, then lower them slowly without letting your lower back arch.",
    pt: {
      title: "Abdominal Infra (Elevação de Pernas)",
      description:
        "Deite de costas com as pernas estendidas e as mãos sob o quadril. Eleve as pernas até ficarem na vertical e desça devagar sem deixar a lombar arquear.",
    },
  },
  {
    muscleGroup: "CORE",
    muscle: "ABS",
    title: "Captain's Chair Knee Raise",
    description:
      "Support yourself on the parallel pads with your back against the rest. Raise your knees toward your chest, then lower them slowly.",
    pt: {
      title: "Elevação de Joelhos na Paralela",
      description:
        "Apoie-se nas paralelas com as costas no encosto. Eleve os joelhos em direção ao peito e desça devagar.",
    },
  },
  {
    muscleGroup: "CORE",
    muscle: "CORE_GENERAL",
    title: "Mountain Climber",
    description:
      "Start in a push-up position with your body in a straight line. Drive one knee toward your chest, then switch legs, alternating quickly while keeping your hips level.",
    pt: {
      title: "Escalador",
      description:
        "Comece na posição de flexão com o corpo alinhado. Leve um joelho em direção ao peito e troque de perna, alternando rápido e mantendo o quadril estável.",
    },
  },
];

export async function seedExercises() {
  for (const item of CATALOG) {
    const existing = await prisma.exercises.findFirst({
      where: {
        userId: null,
        muscleGroup: item.muscleGroup,
        title: item.title,
      },
      select: { id: true },
    });

    const exercise = existing
      ? await prisma.exercises.update({
          where: { id: existing.id },
          data: { muscle: item.muscle, description: item.description },
        })
      : await prisma.exercises.create({
          data: {
            userId: null,
            muscleGroup: item.muscleGroup,
            muscle: item.muscle,
            title: item.title,
            description: item.description,
          },
        });

    const translation = await prisma.exercise_translations.findFirst({
      where: { exerciseId: exercise.id, locale: "pt" },
      select: { id: true },
    });

    if (translation) {
      await prisma.exercise_translations.update({
        where: { id: translation.id },
        data: { title: item.pt.title, description: item.pt.description },
      });
    } else {
      await prisma.exercise_translations.create({
        data: {
          exerciseId: exercise.id,
          locale: "pt",
          title: item.pt.title,
          description: item.pt.description,
        },
      });
    }
  }

  console.log(`Seeded ${CATALOG.length} catalog exercises (en + pt).`);
}
