export const en = {
  common: {
    error: {
      generic: "Something went wrong. Please try again.",
    },
    restDay: "Rest Day",
    today: "Today",
    edit: "Edit",
    delete: "Delete",
    cancel: "Cancel",
    optional: "optional",
    close: "Close",
  },

  exerciseEditPanel: {
    title: "Edit Exercise",
    sets: "Sets",
    reps: "Reps",
    muscleGroup: "Muscle Group",
    selectMuscleGroup: "Select muscle group",
    muscle: "Muscle",
    selectMuscle: "Select muscle",
    exercise: "Exercise",
    selectExercise: "Select exercise",
    remove: "Remove",
    done: "Done",
  },

  exerciseModal: {
    editTitle: "Edit Exercise",
    newTitle: "New Exercise",
    muscleGroup: "Muscle Group",
    targetMuscle: "Target Muscle",
    selectMuscle: "Select muscle",
    titleLabel: "Title",
    titlePlaceholder: "e.g. Incline Dumbbell Press",
    descriptionLabel: "Description",
    descriptionPlaceholder: "Notes, cues, or setup details...",
    createdSuccess: "Exercise created successfully.",
    updatedSuccess: "Exercise updated successfully.",
    createError: "There was an error creating the exercise.",
    updateError: "There was an error updating the exercise.",
    saving: "Saving...",
    creating: "Creating...",
    saveChanges: "Save Changes",
    createExercise: "Create Exercise",
  },

  exercisePicker: {
    searchPlaceholder: "Search exercises...",
    all: "All",
    loading: "Loading exercises…",
    empty: "No exercises found.",
    current: "Current",
    inWorkout: "In workout",
  },

  stats: {
    workouts: "Workouts",
    hours: "Hours",
    allTime: "All time",
    thisWeek: "This week",
    thisMonth: "This month",
  },

  periods: {
    week: "Week",
    month: "Month",
    trimester: "3 Months",
    semester: "6 Months",
  },

  charts: {
    bodyWeight: "Body Weight",
    bodyWeightSeries: "Body weight",
    bodyWeightDescription: "Progress over time ({unit})",
    bodyWeightEmpty: "No entries yet — log your weight to start tracking.",

    estimatedOneRepMax: "Est. 1RM",
    topSet: "Top set",
    progressionEmpty:
      "Log this exercise at least twice to see a progression trend.",

    workoutFrequency: "Workout Frequency",
    workoutFrequencyDescription: "Workouts per week (last 12 weeks)",
    workoutFrequencyEmpty: "No workout history yet",
    workoutsSeries: "Workouts",

    muscleBalance: "Muscle Balance",
    muscleBalanceDescription: "Sets per muscle group",
    setsSeries: "Sets",

    muscleActivity: "Muscle Activity",
    muscleActivityEmpty: "No workout data for this period",
    undertrained: "Undertrained",
    optimal: "Optimal",
    overtrained: "Overtrained",
  },

  feedbackModal: {
    success: "Success!",
    error: "Error!",
    ok: "Ok",
  },

  trainingSplits: {
    emptyTitle: "No training splits yet",
    emptyDescription:
      "Create your first split to plan your weekly workouts and start tracking your sessions.",
    create: "Create training split",
    deleteTitle: "Delete training split?",
    deleteDescription: '"{title}" will be permanently removed.',

    muscleGroupCount: "{count} muscle group",
    muscleGroupCountPlural: "{count} muscle groups",
    exercises: "exercises",
    sets: "sets",
    duration: "duration",
    moreExercises: "+{count} more",
    startWorkout: "Start Workout",
    editSplit: "Edit split",
    deleteSplit: "Delete split",

    summaryExercises: "{count} exercises",
    summarySets: "{count} sets",
    summaryMinutes: "~{count}min",
    start: "Start",
    save: "Save",
    createAction: "Create",
    addExercise: "Add exercise",

    buildTitle: "Build your training split",
    buildDescription:
      "Add exercises one by one, set your reps and sets, and arrange them in the order you'll train.",
    addFirstExercise: "Add your first exercise",
    defaultTitle: "New Training Split",

    createdSuccess: "Training split created successfully.",
    createError: "There was an error creating the training split.",
    updatedSuccess: "Training split updated successfully.",
    updateError: "There was an error updating the training split.",
  },

  calendar: {
    weekRange: "{month} {start} – {end}",
    weekRangeCrossMonth: "{start} – {end}",
    prevWeek: "Previous week",
    nextWeek: "Next week",

    todaysWorkout: "Today's Workout",
    workoutDone: "Workout Done!",
    sessionCompleted: "{title} completed",
    fallbackSessionTitle: "Great session",
    restDayHint: "No training scheduled — recover well.",
    startWorkout: "Start Workout",

    thisWeek: "This Week",
    sessions: "sessions",
    volume: "volume",
    streak: "streak",
    exercisesShort: "ex",
    sets: "sets",

    done: "Done",
    missed: "Missed",
    assignSplit: "Assign split",
    start: "Start",
    editWorkout: "Edit workout",
    noWorkoutLogged: "No workout logged",
    setsLogged: "{count} sets logged",
  },

  workout: {
    finish: "Finish Workout",
    newPR: "New PR on {exercise}: {weight}",

    time: "Time",
    workoutTime: "Workout time",
    pause: "Pause",
    resume: "Resume",
    resetTime: "Reset time",
    progress: "Progress",
    exercisesDone: "{done} / {total} exercises",
    setsDone: "{done} of {total} sets done",
    volume: "Volume",

    exerciseCounter: "Exercise {current} of {total}",
    target: "Target: {sets} × {reps} reps",
    lastTimeMax: "Last time max:",
    personalRecord: "PR:",
    colSet: "Set",
    colWeight: "Weight ({unit})",
    colReps: "Reps",
    colRpe: "RPE",
    addSet: "Add set",
    removeSet: "Remove set",
    logSet: "Log set",
    editSet: "Edit set",
    notesPlaceholder: "Notes — how did this exercise feel?",
    setsLogged: "{done} / {total} sets logged",

    swapExercise: "Swap exercise",
    swapPickerTitle: "Swap exercise",
    addExercise: "Add exercise",
    addPickerTitle: "Add exercise",
    moveUp: "Move up",
    moveDown: "Move down",
    removeExercise: "Remove exercise",
    swapConfirmTitle: "Swap this exercise?",
    swapConfirmDescription:
      "The {count} set(s) you logged on {exercise} will be discarded.",
    swapConfirm: "Swap",
    removeConfirmTitle: "Remove this exercise?",
    removeConfirmDescription:
      "The {count} set(s) you logged on {exercise} will be discarded.",
    removeConfirm: "Remove",

    leaveConfirmTitle: "Leave this workout?",
    leaveConfirmDescription:
      "Your progress stays saved and you can pick it up where you left off.",
    leaveConfirm: "Leave",
    leaveCancel: "Keep training",

    restTimer: "Rest Timer",
    upNext: "Up Next",
  },

  workoutSummary: {
    title: "Workout Complete",
    time: "Time",
    volume: "Volume",
    sets: "Sets",
    keepGoing: "Keep going",
    noSetsLogged: "Log at least one set to save this workout.",
    saveFailed:
      "Could not save the workout. Check your connection and try again.",
    save: "SAVE",
  },

  swapSplitModal: {
    pickSplit: "Pick a training split",
    loading: "Loading splits…",
    noSplits: "No splits available. Create one first.",
    exerciseCount: "{count} exercises",
    markAsRest: "Mark as rest",
    clearDay: "Clear day",
  },

  sessionDetailModal: {
    fallbackTitle: "Workout",
    duration: "duration",
    sets: "sets",
    volume: "volume",
    exercises: "Exercises",
  },

  exerciseDrawer: {
    title: "Exercise Details",
    custom: "Custom",
    catalog: "Catalog",
    primaryMuscle: "Primary Muscle",
    description: "Description",
    personalBest: "Personal Best",
    estimatedOneRepMax: "{weight} est. 1RM",
    heaviestEver: "Heaviest ever: {weight}",
    noPersonalBest: "No data yet — log a workout to see your PRs.",
    progression: "Progression",
    noProgression: "Volume and weight trends will appear here.",
    lastPerformed: "Last Performed",
    notPerformed: "Not performed yet.",
    history: "History",
    volume: "Vol {weight}",
    setNumber: "Set {number}:",
    setDetail: "{reps} reps × {weight}",
    rpe: "@ RPE {rpe}",
    catalogLocked:
      "Catalog exercises can't be edited. Create your own to customize it.",
  },

  muscleGroups: {
    CHEST: "Chest",
    BACK: "Back",
    SHOULDERS: "Shoulders",
    ARMS: "Arms",
    LEGS: "Legs",
    GLUTES: "Glutes",
    CORE: "Core",
  },

  muscles: {
    CHEST_GENERAL: "Chest General",
    UPPER_CHEST: "Upper Chest",
    MIDDLE_CHEST: "Middle Chest",
    LOWER_CHEST: "Lower Chest",

    BACK_GENERAL: "Back General",
    LATS: "Lats",
    TRAPS: "Traps",
    LOWER_BACK: "Lower Back",
    RHOMBOIDS: "Rhomboids",

    SHOULDERS_GENERAL: "Shoulders General",
    FRONT_DELTOID: "Front Deltoid",
    SIDE_DELTOID: "Side Deltoid",
    REAR_DELTOID: "Rear Deltoid",

    ARMS_GENERAL: "Arms General",
    BICEPS: "Biceps",
    TRICEPS: "Triceps",
    FOREARMS: "Forearms",

    LEGS_GENERAL: "Legs General",
    QUADRICEPS: "Quadriceps",
    HAMSTRINGS: "Hamstrings",
    ADDUCTORS: "Adductors",
    CALVES: "Calves",

    GLUTES_GENERAL: "Glutes",

    CORE_GENERAL: "Core General",
    ABS: "Abs",
    OBLIQUES: "Obliques",
  },

  exercises: {
    custom: "Custom",
    filterByMuscle: "Filter by muscle",
    allExercises: "All Exercises",
    emptyTitle: "No exercises yet",
    emptyAll: "Start building your library by adding your first exercise.",
    emptyFiltered: "No {group} exercises yet. Add one to get started.",
    newExercise: "New Exercise",
    newShort: "New",
    searchPlaceholder: "Search exercises...",
    deleteTitle: "Delete exercise?",
    moveUp: "Move up",
    moveDown: "Move down",
    deleteExercise: "Delete exercise",
  },

  nav: {
    dashboard: "Dashboard",
    exercises: "Exercises",
    splits: "Splits",
    calendar: "Calendar",
    profile: "Profile",
  },

  navbar: {
    start: "Start",
    logout: "Log out",
    logoutAs: "Log out ({name})",
    dayToday: "{status} · Today",
    day: {
      rest: "Rest",
      scheduled: "Scheduled",
      missed: "Missed",
      trained: "Trained",
    },
  },

  dashboard: {
    todaysTraining: "Today's Training",
    startWorkout: "Start Workout",
    editWorkout: "Edit workout",
    restDayHint: "No training scheduled for today. Recover well!",
  },

  profile: {
    currentWeight: "Current weight",
    sinceLastEntry: "Since last entry",
    logBodyWeight: "Log body weight",
    weighHint: "Weigh yourself at the same time of day for a consistent trend.",
    logWeight: "Log Weight",
    saving: "Saving...",
  },

  login: {
    tagline: "Feel every beat of your progress.",
    subtitle: "Your workouts, your progress — all in one place.",

    signupHeading: "Create your account",
    loginHeading: "Welcome back",
    signupSubheading: "Fill in your details to get started.",
    loginSubheading: "Enter your credentials to continue.",

    nameLabel: "Name",
    namePlaceholder: "Your name",
    emailLabel: "Email",
    emailPlaceholder: "you@email.com",
    passwordLabel: "Password",
    confirmPasswordLabel: "Confirm password",

    signupSubmit: "Create account",
    loginSubmit: "Sign in",

    hasAccount: "Already have an account?",
    noAccount: "Don't have an account?",
    switchToLogin: "Sign in",
    switchToSignup: "Sign up",

    demoDivider: "or",
    demoButton: "Explore the demo account",
    demoHint: "No sign-up needed — a full account with 12 weeks of history.",

    verifyHeading: "Check your email",
    verifySubheading: "We sent a 6-digit code to {email}. Enter it below to finish creating your account.",
    codeLabel: "Verification code",
    verifySubmit: "Confirm code",
    resend: "Resend code",
    resendIn: "Resend code in {seconds}s",
    backToSignup: "Use a different email",

    passwordStrength: {
      weak: "Weak password",
      fair: "Fair password",
      good: "Good password",
      strong: "Strong password",
    },

    error: {
      emailTaken: "This email is already registered.",
      passwordMismatch: "The passwords do not match.",
      passwordTooShort: "Your password must be at least 8 characters long.",
      badCredentials: "Incorrect email or password.",
      signupFailed: "Couldn't create your account. Please try again.",
      loginFailed: "Couldn't sign you in. Please try again.",
      invalidCode: "Invalid or expired code. Request a new one.",
      tooManyAttempts: "Too many attempts. Request a new code.",
      tooManyRequests: "Too many attempts. Please wait a moment and try again.",
      emailSendFailed: "We couldn't send the email. Please try again.",
      verifyFailed: "Couldn't confirm the code. Please try again.",
      demoUnavailable: "The demo account is unavailable right now. Try again in a moment.",
    },
  },

  pwa: {
    banner: {
      title: "Install Pulso",
      description: "Opens full screen from your home screen, even offline.",
      install: "Install",
      later: "Not now",
      dismiss: "Dismiss",
    },

    card: {
      title: "App",
      description: "Install Pulso to open it from your home screen.",
      install: "Install app",
      installed: "App installed",
    },

    howTo: {
      title: "How to install",
      ios: {
        intro: "On iPhone and iPad, install from the Safari share menu:",
        step1: "Tap the Share button in the browser bar.",
        step2: 'Choose "Add to Home Screen".',
        step3: 'Confirm on "Add".',
      },
      done: "Got it",
    },

    update: {
      message: "New version available",
      action: "Update",
    },
  },
};
