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
    muscleGroup: "ARMS",
    muscle: "BICEPS_SHORT_HEAD",
    title: "Barbell Curl",
    description:
      "Stand holding a barbell with an underhand shoulder-width grip. Curl it up toward your chest keeping your elbows pinned to your sides, then lower slowly.",
    pt: {
      title: "Rosca Direta",
      description:
        "Em pé com a barra em pegada supinada na largura dos ombros, flexione em direção ao peito mantendo os cotovelos junto ao corpo e desça devagar.",
    },
  },
  {
    muscleGroup: "ARMS",
    muscle: "BICEPS_LONG_HEAD",
    title: "Dumbbell Curl",
    description:
      "Hold a dumbbell in each hand. Curl one arm up while rotating your palm upward, lower it, then repeat with the other arm.",
    pt: {
      title: "Rosca Alternada",
      description:
        "Com um halter em cada mão, flexione um braço girando a palma para cima, desça e repita com o outro braço.",
    },
  },
  {
    muscleGroup: "ARMS",
    muscle: "BICEPS_LONG_HEAD",
    title: "Incline Dumbbell Curl",
    description:
      "Sit back on an incline bench with your arms hanging down. Curl the dumbbells up without moving your elbows forward, then lower fully.",
    pt: {
      title: "Rosca Inclinada",
      description:
        "Recline no banco inclinado com os braços pendendo. Flexione os halteres sem levar os cotovelos à frente e desça completamente.",
    },
  },
  {
    muscleGroup: "ARMS",
    muscle: "BICEPS_SHORT_HEAD",
    title: "Preacher Curl",
    description:
      "Rest the back of your upper arms on the preacher pad. Curl the bar up toward your shoulders, then lower until your arms are almost straight.",
    pt: {
      title: "Rosca Scott",
      description:
        "Apoie a parte de trás dos braços no banco Scott. Flexione a barra em direção aos ombros e desça até quase estender os braços.",
    },
  },
  {
    muscleGroup: "ARMS",
    muscle: "BICEPS_SHORT_HEAD",
    title: "Concentration Curl",
    description:
      "Sit and brace your elbow against your inner thigh. Curl the dumbbell up to your shoulder, then lower slowly.",
    pt: {
      title: "Rosca Concentrada",
      description:
        "Sentado, apoie o cotovelo na parte interna da coxa. Flexione o halter até o ombro e desça devagar.",
    },
  },
  {
    muscleGroup: "ARMS",
    muscle: "BRACHIORADIALIS",
    title: "Hammer Curl",
    description:
      "Hold dumbbells with your palms facing each other. Curl them up keeping that neutral grip, then lower under control.",
    pt: {
      title: "Rosca Martelo",
      description:
        "Com os halteres e as palmas voltadas uma para a outra, flexione mantendo a pegada neutra e desça controlando.",
    },
  },
  {
    muscleGroup: "ARMS",
    muscle: "TRICEPS_LATERAL_HEAD",
    title: "Triceps Pushdown",
    description:
      "Face a high pulley and grip the bar with your elbows at your sides. Push it down until your arms are straight, then let it rise back.",
    pt: {
      title: "Tríceps na Polia",
      description:
        "De frente para a polia alta, segure a barra com os cotovelos junto ao corpo. Empurre até estender os braços e deixe voltar.",
    },
  },
  {
    muscleGroup: "ARMS",
    muscle: "TRICEPS_LATERAL_HEAD",
    title: "Rope Pushdown",
    description:
      "Grip a rope on a high pulley. Push down and spread the ends apart at the bottom until your arms are straight, then return slowly.",
    pt: {
      title: "Tríceps Corda",
      description:
        "Segure a corda na polia alta. Empurre para baixo afastando as pontas no final até estender os braços e volte devagar.",
    },
  },
  {
    muscleGroup: "ARMS",
    muscle: "TRICEPS_LONG_HEAD",
    title: "Overhead Triceps Extension",
    description:
      "Hold a weight overhead with both hands. Lower it behind your head by bending only your elbows, then extend back up.",
    pt: {
      title: "Tríceps Francês",
      description:
        "Segure o peso acima da cabeça com as duas mãos. Desça atrás da cabeça flexionando só os cotovelos e estenda de volta.",
    },
  },
  {
    muscleGroup: "ARMS",
    muscle: "TRICEPS_LONG_HEAD",
    title: "Skull Crusher",
    description:
      "Lie on a bench holding an EZ-bar over your chest. Lower it toward your forehead by bending only your elbows, then extend back up.",
    pt: {
      title: "Tríceps Testa",
      description:
        "Deite no banco com a barra W sobre o peito. Desça em direção à testa flexionando só os cotovelos e estenda de volta.",
    },
  },
  {
    muscleGroup: "ARMS",
    muscle: "TRICEPS_LATERAL_HEAD",
    title: "Close-Grip Bench Press",
    description:
      "Lie on a flat bench and grip the bar about shoulder-width. Lower it to your lower chest with your elbows tucked, then press up.",
    pt: {
      title: "Supino Fechado",
      description:
        "Deite no banco reto e segure a barra na largura dos ombros. Desça até a parte baixa do peito com os cotovelos junto ao corpo e empurre.",
    },
  },
  {
    muscleGroup: "ARMS",
    muscle: "TRICEPS_LATERAL_HEAD",
    title: "Triceps Dip",
    description:
      "On parallel bars keep your torso upright. Lower yourself until your elbows reach about 90°, then press back up.",
    pt: {
      title: "Mergulho para Tríceps",
      description:
        "Nas paralelas mantenha o tronco ereto. Desça até os cotovelos formarem cerca de 90° e empurre para subir.",
    },
  },
  {
    muscleGroup: "ARMS",
    muscle: "FLEXORS",
    title: "Wrist Curl",
    description:
      "Rest your forearms on your thighs with a barbell in your hands. Let it roll down to your fingers, then curl your wrists up.",
    pt: {
      title: "Rosca de Punho",
      description:
        "Apoie os antebraços nas coxas com a barra nas mãos. Deixe rolar até os dedos e flexione os punhos para cima.",
    },
  },
  {
    muscleGroup: "ARMS",
    muscle: "BRACHIORADIALIS",
    title: "Reverse Barbell Curl",
    description:
      "Hold a barbell with an overhand grip. Curl it up toward your chest keeping your elbows still, then lower slowly.",
    pt: {
      title: "Rosca Inversa",
      description:
        "Segure a barra com pegada pronada. Flexione em direção ao peito mantendo os cotovelos parados e desça devagar.",
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
    muscle: "TRICEPS_MEDIAL_HEAD",
    title: "Reverse-Grip Triceps Pushdown",
    description:
      "Face a high pulley and grip the bar with your palms facing up and elbows at your sides. Push down until your arms are straight, then return under control.",
    pt: {
      title: "Tríceps Pulley Supinado",
      description:
        "De frente para a polia alta, segure a barra com as palmas para cima e os cotovelos junto ao corpo. Empurre até estender os braços e volte controlando.",
    },
  },
  {
    muscleGroup: "ARMS",
    muscle: "FOREARMS_GENERAL",
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
    muscle: "PRONATOR_TERES",
    title: "Dumbbell Pronation",
    description:
      "Rest your forearm on a bench holding a dumbbell by one end with your palm up. Rotate your wrist until the palm faces down, then return slowly.",
    pt: {
      title: "Pronação com Halter",
      description:
        "Apoie o antebraço no banco segurando o halter por uma ponta com a palma para cima. Gire o punho até a palma ficar para baixo e volte devagar.",
    },
  },
  {
    muscleGroup: "ARMS",
    muscle: "EXTENSORS",
    title: "Reverse Wrist Curl",
    description:
      "Rest your forearms on your thighs holding a barbell with an overhand grip. Lift the backs of your hands toward you by extending your wrists, then lower.",
    pt: {
      title: "Rosca Inversa de Punho",
      description:
        "Apoie os antebraços nas coxas segurando a barra com pegada pronada. Levante o dorso das mãos estendendo os punhos e desça.",
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
    muscleGroup: "GLUTES",
    muscle: "GLUTEUS_MAXIMUS",
    title: "Hip Thrust",
    description:
      "Rest your upper back on a bench with a barbell over your hips. Drive your hips up until your body is level, squeeze, then lower.",
    pt: {
      title: "Elevação Pélvica",
      description:
        "Apoie a parte de cima das costas no banco com a barra sobre o quadril. Eleve o quadril até alinhar o corpo, contraia e desça.",
    },
  },
  {
    muscleGroup: "GLUTES",
    muscle: "GLUTEUS_MAXIMUS",
    title: "Glute Bridge",
    description:
      "Lie on your back with knees bent and feet flat. Raise your hips until your body is straight, squeeze, then lower.",
    pt: {
      title: "Ponte de Glúteo",
      description:
        "Deite de costas com os joelhos flexionados e os pés no chão. Eleve o quadril até alinhar o corpo, contraia e desça.",
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
    muscle: "GLUTEUS_MAXIMUS",
    title: "Cable Glute Kickback",
    description:
      "Attach a strap to your ankle and hold on for balance. Push your leg straight back, squeeze the glute, then return under control.",
    pt: {
      title: "Coice na Polia",
      description:
        "Prenda a caneleira no tornozelo e segure para se equilibrar. Empurre a perna para trás, contraia o glúteo e volte controlando.",
    },
  },
  {
    muscleGroup: "GLUTES",
    muscle: "GLUTEUS_MEDIUS",
    title: "Hip Abduction Machine",
    description:
      "Sit with the pads against your outer knees. Push your legs apart as far as possible, then return under control.",
    pt: {
      title: "Cadeira Abdutora",
      description:
        "Sente com os apoios na parte externa dos joelhos. Afaste as pernas o máximo possível e volte controlando.",
    },
  },

  {
    muscleGroup: "GLUTES",
    muscle: "GLUTEUS_MINIMUS",
    title: "Side-Lying Hip Abduction",
    description:
      "Lie on your side with your legs stacked and straight. Raise the top leg as high as you can without rotating your hips, then lower it slowly.",
    pt: {
      title: "Abdução de Quadril Deitado",
      description:
        "Deite de lado com as pernas alinhadas e estendidas. Eleve a perna de cima o máximo possível sem girar o quadril e desça devagar.",
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
];

export async function seedExercises() {
  for (const item of CATALOG) {
    const existing = await prisma.exercises.findFirst({
      where: {
        userId: null,
        muscleGroup: item.muscleGroup,
        muscle: item.muscle,
        title: item.title,
      },
      select: { id: true },
    });

    const exercise = existing
      ? await prisma.exercises.update({
          where: { id: existing.id },
          data: { description: item.description },
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
