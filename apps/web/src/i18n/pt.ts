import type { LocaleDictionary } from "./types";

export const pt: LocaleDictionary = {
  common: {
    error: {
      generic: "Algo deu errado. Tente novamente.",
    },
    restDay: "Descanso",
    today: "Hoje",
    edit: "Editar",
    delete: "Excluir",
    cancel: "Cancelar",
    optional: "opcional",
    close: "Fechar",
  },

  exerciseEditPanel: {
    title: "Editar Exercício",
    sets: "Séries",
    reps: "Reps",
    muscleGroup: "Grupo Muscular",
    selectMuscleGroup: "Selecione o grupo muscular",
    muscle: "Músculo",
    selectMuscle: "Selecione o músculo",
    exercise: "Exercício",
    selectExercise: "Selecione o exercício",
    empty: "vazio",
    remove: "Remover",
    done: "Concluir",
  },

  exerciseModal: {
    editTitle: "Editar Exercício",
    newTitle: "Novo Exercício",
    muscleGroup: "Grupo Muscular",
    targetMuscle: "Músculo Alvo",
    selectMuscle: "Selecione o músculo",
    titleLabel: "Título",
    titlePlaceholder: "ex.: Supino Inclinado com Halteres",
    descriptionLabel: "Descrição",
    descriptionPlaceholder: "Anotações, dicas ou detalhes de execução...",
    createdSuccess: "Exercício criado com sucesso.",
    updatedSuccess: "Exercício atualizado com sucesso.",
    createError: "Ocorreu um erro ao criar o exercício.",
    updateError: "Ocorreu um erro ao atualizar o exercício.",
    saving: "Salvando...",
    creating: "Criando...",
    saveChanges: "Salvar Alterações",
    createExercise: "Criar Exercício",
  },

  stats: {
    workouts: "Treinos",
    hours: "Horas",
    allTime: "Desde o início",
    thisWeek: "Esta semana",
    thisMonth: "Este mês",
  },

  periods: {
    week: "Semana",
    month: "Mês",
    trimester: "3 meses",
    semester: "6 meses",
  },

  charts: {
    bodyWeight: "Peso Corporal",
    bodyWeightSeries: "Peso corporal",
    bodyWeightDescription: "Evolução ao longo do tempo ({unit})",
    bodyWeightEmpty:
      "Nenhum registro ainda — registre seu peso para começar a acompanhar.",

    estimatedOneRepMax: "1RM est.",
    topSet: "Melhor série",
    progressionEmpty:
      "Registre este exercício ao menos duas vezes para ver a progressão.",

    workoutFrequency: "Frequência de Treinos",
    workoutFrequencyDescription: "Treinos por semana (últimas 12 semanas)",
    workoutFrequencyEmpty: "Nenhum histórico de treino ainda",
    workoutsSeries: "Treinos",

    muscleBalance: "Equilíbrio Muscular",
    muscleBalanceDescription: "Séries por grupo muscular",
    setsSeries: "Séries",

    muscleActivity: "Atividade Muscular",
    muscleActivityEmpty: "Sem dados de treino neste período",
    undertrained: "Pouco treinado",
    optimal: "Ideal",
    overtrained: "Sobrecarregado",
  },

  feedbackModal: {
    success: "Sucesso!",
    error: "Erro!",
    ok: "Ok",
  },

  trainingSplits: {
    emptyTitle: "Nenhum treino ainda",
    emptyDescription:
      "Crie seu primeiro treino para planejar sua semana e começar a acompanhar suas sessões.",
    create: "Criar treino",
    deleteTitle: "Excluir treino?",
    deleteDescription: '"{title}" será removido permanentemente.',

    muscleGroupCount: "{count} grupo muscular",
    muscleGroupCountPlural: "{count} grupos musculares",
    exercises: "exercícios",
    sets: "séries",
    duration: "duração",
    moreExercises: "+{count} a mais",
    startWorkout: "Iniciar Treino",
    editSplit: "Editar treino",
    deleteSplit: "Excluir treino",

    summaryExercises: "{count} exercícios",
    summarySets: "{count} séries",
    summaryMinutes: "~{count}min",
    start: "Iniciar",
    save: "Salvar",
    createAction: "Criar",
    addExercise: "Adicionar exercício",

    buildTitle: "Monte seu treino",
    buildDescription:
      "Adicione exercícios um a um, defina séries e repetições, e organize na ordem em que vai treinar.",
    addFirstExercise: "Adicione seu primeiro exercício",
    defaultTitle: "Novo Treino",

    createdSuccess: "Treino criado com sucesso.",
    createError: "Ocorreu um erro ao criar o treino.",
    updatedSuccess: "Treino atualizado com sucesso.",
    updateError: "Ocorreu um erro ao atualizar o treino.",
  },

  calendar: {
    weekRange: "{start} – {end} de {month}",
    weekRangeCrossMonth: "{start} – {end}",
    prevWeek: "Semana anterior",
    nextWeek: "Próxima semana",

    todaysWorkout: "Treino de Hoje",
    workoutDone: "Treino Concluído!",
    sessionCompleted: "{title} concluído",
    fallbackSessionTitle: "Ótima sessão",
    restDayHint: "Nenhum treino agendado — bom descanso.",
    startWorkout: "Iniciar Treino",

    thisWeek: "Esta Semana",
    sessions: "sessões",
    volume: "volume",
    streak: "sequência",
    exercisesShort: "ex",
    sets: "séries",

    done: "Feito",
    missed: "Perdido",
    assignSplit: "Atribuir treino",
    start: "Iniciar",
    editWorkout: "Editar treino",
    noWorkoutLogged: "Nenhum treino registrado",
    setsLogged: "{count} séries registradas",
  },

  workout: {
    finish: "Finalizar Treino",
    newPR: "Novo recorde em {exercise}: {weight}",

    time: "Tempo",
    workoutTime: "Tempo de treino",
    pause: "Pausar",
    resume: "Retomar",
    resetTime: "Zerar tempo",
    progress: "Progresso",
    exercisesDone: "{done} / {total} exercícios",
    setsDone: "{done} de {total} séries feitas",
    volume: "Volume",

    exerciseCounter: "Exercício {current} de {total}",
    target: "Meta: {sets} × {reps} reps",
    lastTimeMax: "Máx. da última vez:",
    personalRecord: "Recorde:",
    colSet: "Série",
    colWeight: "Carga ({unit})",
    colReps: "Reps",
    colRpe: "RPE",
    addSet: "Adicionar série",
    notesPlaceholder: "Anotações — como foi este exercício?",
    setsLogged: "{done} / {total} séries registradas",

    restTimer: "Timer de Descanso",
    upNext: "A Seguir",
  },

  workoutSummary: {
    title: "Treino Concluído",
    time: "Tempo",
    volume: "Volume",
    sets: "Séries",
    keepGoing: "Continuar treinando",
    save: "SALVAR",
  },

  swapSplitModal: {
    pickSplit: "Escolha um treino",
    loading: "Carregando treinos…",
    noSplits: "Nenhum treino disponível. Crie um primeiro.",
    exerciseCount: "{count} exercícios",
    markAsRest: "Marcar como descanso",
    clearDay: "Limpar dia",
  },

  sessionDetailModal: {
    fallbackTitle: "Treino",
    duration: "duração",
    sets: "séries",
    volume: "volume",
    exercises: "Exercícios",
  },

  exerciseDrawer: {
    title: "Detalhes do Exercício",
    custom: "Personalizado",
    catalog: "Catálogo",
    primaryMuscle: "Músculo Principal",
    description: "Descrição",
    personalBest: "Recorde Pessoal",
    estimatedOneRepMax: "{weight} 1RM est.",
    heaviestEver: "Maior carga já feita: {weight}",
    noPersonalBest: "Sem dados ainda — registre um treino para ver seus PRs.",
    progression: "Progressão",
    noProgression: "As tendências de volume e carga aparecerão aqui.",
    lastPerformed: "Último Treino",
    notPerformed: "Ainda não executado.",
    history: "Histórico",
    volume: "Vol {weight}",
    setNumber: "Série {number}:",
    setDetail: "{reps} reps × {weight}",
    rpe: "@ RPE {rpe}",
    catalogLocked:
      "Exercícios do catálogo não podem ser editados. Crie o seu para personalizar.",
  },

  muscleGroups: {
    CHEST: "Peito",
    BACK: "Costas",
    SHOULDERS: "Ombros",
    ARMS: "Braços",
    LEGS: "Pernas",
    GLUTES: "Glúteos",
    CORE: "Core",
  },

  muscles: {
    CHEST_GENERAL: "Peito (Geral)",
    UPPER_CHEST: "Peito Superior",
    MIDDLE_CHEST: "Peito Médio",
    LOWER_CHEST: "Peito Inferior",

    BACK_GENERAL: "Costas (Geral)",
    LATS: "Dorsais",
    TRAPS: "Trapézio",
    LOWER_BACK: "Lombar",
    RHOMBOIDS: "Romboides",

    SHOULDERS_GENERAL: "Ombros (Geral)",
    FRONT_DELTOID: "Deltoide Anterior",
    SIDE_DELTOID: "Deltoide Lateral",
    REAR_DELTOID: "Deltoide Posterior",

    ARMS_GENERAL: "Braços (Geral)",
    BICEPS_LONG_HEAD: "Bíceps (Cabeça Longa)",
    BICEPS_SHORT_HEAD: "Bíceps (Cabeça Curta)",
    TRICEPS_LONG_HEAD: "Tríceps (Cabeça Longa)",
    TRICEPS_LATERAL_HEAD: "Tríceps (Cabeça Lateral)",
    TRICEPS_MEDIAL_HEAD: "Tríceps (Cabeça Medial)",

    FOREARMS_GENERAL: "Antebraços (Geral)",
    BRACHIORADIALIS: "Braquiorradial",
    PRONATOR_TERES: "Pronador Redondo",
    FLEXORS: "Flexores",
    EXTENSORS: "Extensores",

    LEGS_GENERAL: "Pernas (Geral)",
    QUADRICEPS: "Quadríceps",
    HAMSTRINGS: "Posteriores de coxa",
    CALVES: "Panturrilhas",

    GLUTES_GENERAL: "Glúteos (Geral)",
    GLUTEUS_MAXIMUS: "Glúteo Máximo",
    GLUTEUS_MEDIUS: "Glúteo Médio",
    GLUTEUS_MINIMUS: "Glúteo Mínimo",

    CORE_GENERAL: "Core (Geral)",
    ABS: "Abdômen",
    OBLIQUES: "Oblíquos",
  },

  exercises: {
    custom: "Personalizado",
    filterByMuscle: "Filtrar por músculo",
    allExercises: "Todos os Exercícios",
    emptyTitle: "Nenhum exercício ainda",
    emptyAll: "Comece sua biblioteca adicionando seu primeiro exercício.",
    emptyFiltered:
      "Nenhum exercício de {group} ainda. Adicione um para começar.",
    newExercise: "Novo Exercício",
    newShort: "Novo",
    searchPlaceholder: "Buscar exercícios...",
    deleteTitle: "Excluir exercício?",
    moveUp: "Mover para cima",
    moveDown: "Mover para baixo",
    deleteExercise: "Excluir exercício",
  },

  nav: {
    dashboard: "Início",
    exercises: "Exercícios",
    splits: "Treinos",
    calendar: "Calendário",
    profile: "Perfil",
  },

  navbar: {
    start: "Iniciar",
    logout: "Sair",
    logoutAs: "Sair ({name})",
    dayToday: "{status} · Hoje",
    day: {
      rest: "Descanso",
      scheduled: "Agendado",
      missed: "Perdido",
      trained: "Treinado",
    },
  },

  dashboard: {
    todaysTraining: "Treino de Hoje",
    startWorkout: "Iniciar Treino",
    editWorkout: "Editar treino",
    restDayHint: "Nenhum treino agendado para hoje. Bom descanso!",
  },

  profile: {
    currentWeight: "Peso atual",
    sinceLastEntry: "Desde o último registro",
    logBodyWeight: "Registrar peso",
    weighHint:
      "Pese-se sempre no mesmo horário do dia para uma tendência consistente.",
    logWeight: "Registrar Peso",
    saving: "Salvando...",
  },

  login: {
    tagline: "Sinta cada batida do seu progresso.",
    subtitle: "Seus treinos, seu progresso — tudo em um só lugar.",

    signupHeading: "Crie sua conta",
    loginHeading: "Bem-vindo de volta",
    signupSubheading: "Preencha seus dados para começar.",
    loginSubheading: "Entre com suas credenciais para continuar.",

    nameLabel: "Nome",
    namePlaceholder: "Seu nome",
    emailLabel: "E-mail",
    emailPlaceholder: "voce@email.com",
    passwordLabel: "Senha",

    signupSubmit: "Criar conta",
    loginSubmit: "Entrar",

    hasAccount: "Já tem uma conta?",
    noAccount: "Ainda não tem uma conta?",
    switchToLogin: "Entrar",
    switchToSignup: "Cadastre-se",

    error: {
      emailTaken: "Este e-mail já está cadastrado.",
      badCredentials: "E-mail ou senha incorretos.",
      signupFailed: "Não foi possível criar sua conta. Tente novamente.",
      loginFailed: "Não foi possível entrar. Tente novamente.",
    },
  },
};
