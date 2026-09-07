import bcrypt from "bcrypt";
import { prisma } from "../../../database/prisma/prisma.js";
import type { Prisma } from "../../../database/prisma/generated/prisma/client.js";
import { env } from "../../shared/config/env.js";

type DemoExercise = {
  title: string;
  sets: number;
  reps: string;
  baseWeight: number;
  step: number;
};

type DemoSplit = {
  title: string;
  exercises: DemoExercise[];
};

const HISTORY_WEEKS = 12;
const RNG_SEED = 4071;
const BCRYPT_ROUNDS = 10;
const SKIP_CHANCE = 0.08;
const SESSION_START_HOUR = 18;
const BODY_WEIGHT_FROM = 78.4;
const BODY_WEIGHT_TO = 82;

const SPLITS: DemoSplit[] = [
  {
    title: "Push A · Chest",
    exercises: [
      { title: "Barbell Bench Press", sets: 4, reps: "6-8", baseWeight: 70, step: 2.5 },
      { title: "Incline Dumbbell Press", sets: 3, reps: "8-10", baseWeight: 26, step: 2 },
      { title: "Pec Deck Machine", sets: 3, reps: "12-15", baseWeight: 45, step: 2.5 },
      { title: "Seated Dumbbell Shoulder Press", sets: 3, reps: "8-10", baseWeight: 20, step: 2 },
      { title: "Lateral Raise", sets: 3, reps: "12-15", baseWeight: 10, step: 1 },
      { title: "Rope Pushdown", sets: 3, reps: "10-12", baseWeight: 25, step: 2 },
      { title: "Overhead Triceps Extension", sets: 3, reps: "10-12", baseWeight: 27.5, step: 1.5 },
    ],
  },
  {
    title: "Pull A · Width",
    exercises: [
      { title: "Pull-Up", sets: 4, reps: "6-10", baseWeight: 5, step: 2 },
      { title: "Bent-Over Barbell Row", sets: 3, reps: "8-10", baseWeight: 60, step: 2.5 },
      { title: "Chest-Supported Dumbbell Row", sets: 3, reps: "10-12", baseWeight: 24, step: 2 },
      { title: "Face Pull", sets: 3, reps: "15-20", baseWeight: 20, step: 1.5 },
      { title: "Wide-Grip Seated Row", sets: 3, reps: "10-12", baseWeight: 50, step: 2.5 },
      { title: "Barbell Curl", sets: 3, reps: "8-10", baseWeight: 30, step: 1.5 },
      { title: "Hammer Curl", sets: 3, reps: "10-12", baseWeight: 14, step: 1 },
    ],
  },
  {
    title: "Legs A · Quads",
    exercises: [
      { title: "Barbell Back Squat", sets: 4, reps: "5-8", baseWeight: 90, step: 4 },
      { title: "Romanian Deadlift", sets: 4, reps: "8-10", baseWeight: 80, step: 4 },
      { title: "Leg Press", sets: 3, reps: "10-12", baseWeight: 140, step: 10 },
      { title: "Lying Leg Curl", sets: 3, reps: "10-12", baseWeight: 40, step: 2.5 },
      { title: "Standing Calf Raise", sets: 4, reps: "12-15", baseWeight: 60, step: 5 },
      { title: "Hanging Leg Raise", sets: 4, reps: "10-15", baseWeight: 5, step: 1 },
      { title: "Back Extension", sets: 3, reps: "12-15", baseWeight: 10, step: 2 },
    ],
  },
  {
    title: "Push B · Shoulders",
    exercises: [
      { title: "Overhead Press", sets: 4, reps: "5-7", baseWeight: 45, step: 2 },
      { title: "Incline Barbell Bench Press", sets: 3, reps: "8-10", baseWeight: 55, step: 2.5 },
      { title: "Cable Crossover", sets: 3, reps: "12-15", baseWeight: 18, step: 1.5 },
      { title: "Machine Lateral Raise", sets: 3, reps: "12-15", baseWeight: 30, step: 2.5 },
      { title: "Close-Grip Bench Press", sets: 3, reps: "8-10", baseWeight: 55, step: 2.5 },
      { title: "Triceps Pushdown", sets: 3, reps: "10-12", baseWeight: 30, step: 2.5 },
      { title: "Cable Crunch", sets: 3, reps: "12-15", baseWeight: 35, step: 2.5 },
    ],
  },
  {
    title: "Pull B · Thickness",
    exercises: [
      { title: "Lat Pulldown", sets: 4, reps: "8-10", baseWeight: 60, step: 2.5 },
      { title: "T-Bar Row", sets: 3, reps: "8-10", baseWeight: 50, step: 2.5 },
      { title: "Straight-Arm Pulldown", sets: 3, reps: "12-15", baseWeight: 25, step: 2 },
      { title: "Reverse Pec Deck", sets: 3, reps: "15-20", baseWeight: 25, step: 2 },
      { title: "Barbell Shrug", sets: 4, reps: "10-12", baseWeight: 80, step: 5 },
      { title: "Preacher Curl", sets: 3, reps: "10-12", baseWeight: 25, step: 1.5 },
      { title: "Incline Dumbbell Curl", sets: 3, reps: "10-12", baseWeight: 12, step: 1 },
    ],
  },
  {
    title: "Legs B · Glutes",
    exercises: [
      { title: "Hip Thrust", sets: 4, reps: "8-10", baseWeight: 100, step: 5 },
      { title: "Bulgarian Split Squat", sets: 3, reps: "8-10", baseWeight: 20, step: 2 },
      { title: "Seated Leg Curl", sets: 3, reps: "10-12", baseWeight: 45, step: 2.5 },
      { title: "Glute Kickback Machine", sets: 3, reps: "12-15", baseWeight: 30, step: 2.5 },
      { title: "Hip Abduction Machine", sets: 3, reps: "15-20", baseWeight: 50, step: 2.5 },
      { title: "Leg Extension", sets: 3, reps: "12-15", baseWeight: 50, step: 2.5 },
      { title: "Seated Calf Raise", sets: 4, reps: "12-15", baseWeight: 40, step: 2.5 },
      { title: "Ab Wheel Rollout", sets: 3, reps: "10-12", baseWeight: 5, step: 1 },
    ],
  },
];

const createRng = (seed: number) => {
  let state = seed >>> 0;

  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

const startOfDay = (date: Date): Date => {
  const copy = new Date(date);
  copy.setHours(0, 0, 0, 0);
  return copy;
};

const addDays = (date: Date, days: number): Date => {
  const copy = new Date(date);
  copy.setDate(copy.getDate() + days);
  return copy;
};

const parseRepRange = (reps: string): [number, number] => {
  const parts = reps.split("-").map(Number);
  const min = parts[0] ?? 1;
  return [min, parts[1] ?? min];
};

const roundToHalf = (value: number): number => Math.round(value * 2) / 2;

const buildSchedule = (today: Date) => {
  const restDayOfWeek = (today.getDay() + 1) % 7;
  const trainingDays = [0, 1, 2, 3, 4, 5, 6].filter(
    (day) => day !== restDayOfWeek,
  );

  const assignments = SPLITS.flatMap((split, index) => {
    const dayOfWeek = trainingDays[index];
    return dayOfWeek === undefined ? [] : [{ dayOfWeek, split }];
  });

  return { restDayOfWeek, assignments };
};

export type DemoSetPlan = {
  setNumber: number;
  reps: number;
  weight: number;
  rpe: number;
};

export type DemoExercisePlan = {
  title: string;
  sets: DemoSetPlan[];
};

export type DemoSessionPlan = {
  createdAt: Date;
  splitTitle: string;
  durationSeconds: number;
  exercises: DemoExercisePlan[];
};

export type DemoPlan = {
  restDayOfWeek: number;
  assignments: { dayOfWeek: number; split: DemoSplit }[];
  sessions: DemoSessionPlan[];
  bodyWeights: { createdAt: Date; weight: number }[];
};

export const planDemoData = (now: Date): DemoPlan => {
  const todayStart = startOfDay(now);
  const currentWeekStart = addDays(todayStart, -todayStart.getDay());
  const { restDayOfWeek, assignments } = buildSchedule(todayStart);
  const rng = createRng(RNG_SEED);
  const sessions: DemoSessionPlan[] = [];

  for (let weekIndex = 0; weekIndex < HISTORY_WEEKS; weekIndex += 1) {
    const weeksAgo = HISTORY_WEEKS - 1 - weekIndex;
    const weekStart = addDays(currentWeekStart, -weeksAgo * 7);
    const progression = Math.floor(weekIndex / 2);

    for (const { dayOfWeek, split } of assignments) {
      const createdAt = addDays(weekStart, dayOfWeek);
      const skipped = rng() < SKIP_CHANCE;
      const minutesOffset = Math.floor(rng() * 90);
      const durationSeconds = 2700 + Math.floor(rng() * 900);
      const repDraws = split.exercises.flatMap((exercise) =>
        Array.from({ length: exercise.sets }, () => rng()),
      );

      if (createdAt >= todayStart || skipped) {
        continue;
      }

      createdAt.setHours(SESSION_START_HOUR, minutesOffset, 0, 0);

      let draw = 0;

      sessions.push({
        createdAt,
        splitTitle: split.title,
        durationSeconds,
        exercises: split.exercises.map((exercise) => {
          const [minReps, maxReps] = parseRepRange(exercise.reps);
          const weight = roundToHalf(
            exercise.baseWeight + progression * exercise.step,
          );

          return {
            title: exercise.title,
            sets: Array.from({ length: exercise.sets }, (_, setIndex) => {
              const fatigue = (repDraws[draw] ?? 0) < 0.35 ? 1 : 0;
              draw += 1;

              return {
                setNumber: setIndex + 1,
                reps: Math.max(minReps, maxReps - setIndex - fatigue),
                weight,
                rpe: Math.min(9.5, 7 + setIndex * 0.5),
              };
            }),
          };
        }),
      });
    }
  }

  const bodyWeights: DemoPlan["bodyWeights"] = [];
  const bodyWeightEntries = HISTORY_WEEKS + 1;

  for (let index = 0; index < bodyWeightEntries; index += 1) {
    const progress = index / (bodyWeightEntries - 1);
    const noise = (rng() - 0.5) * 0.6;
    const trend =
      BODY_WEIGHT_FROM + (BODY_WEIGHT_TO - BODY_WEIGHT_FROM) * progress;
    const createdAt = addDays(
      currentWeekStart,
      -(bodyWeightEntries - 1 - index) * 7,
    );

    if (createdAt > now) {
      continue;
    }

    createdAt.setHours(7, 30, 0, 0);

    bodyWeights.push({
      createdAt,
      weight: Math.round((trend + noise) * 10) / 10,
    });
  }

  return { restDayOfWeek, assignments, sessions, bodyWeights };
};

const clearDemoData = async (tx: Prisma.TransactionClient, userId: number) => {
  await tx.workout_sets.deleteMany({
    where: { workoutExerciseLog: { workoutSession: { userId } } },
  });
  await tx.workout_exercise_logs.deleteMany({
    where: { workoutSession: { userId } },
  });
  await tx.workout_sessions.deleteMany({ where: { userId } });
  await tx.training_split_exercises.deleteMany({
    where: { trainingSplit: { userId } },
  });
  await tx.training_split_days.deleteMany({
    where: { trainingSplit: { userId } },
  });
  await tx.training_splits.deleteMany({ where: { userId } });
  await tx.body_weights.deleteMany({ where: { userId } });
  await tx.exercises.deleteMany({ where: { userId } });
};

export const demoService = {
  isEnabled(): boolean {
    return Boolean(env.DEMO_EMAIL && env.DEMO_PASSWORD);
  },

  async reset() {
    const email = env.DEMO_EMAIL;
    const password = env.DEMO_PASSWORD;

    if (!email || !password) {
      return { skipped: true as const };
    }

    const passwordHash = await bcrypt.hash(password, BCRYPT_ROUNDS);

    const catalog = await prisma.exercises.findMany({
      where: { userId: null },
      select: { id: true, title: true },
    });
    const exerciseIdByTitle = new Map(
      catalog.map((exercise) => [exercise.title, exercise.id]),
    );

    const missing = SPLITS.flatMap((split) =>
      split.exercises
        .map((exercise) => exercise.title)
        .filter((title) => !exerciseIdByTitle.has(title)),
    );

    if (missing.length > 0) {
      throw new Error(
        `Demo seed requires catalog exercises that are missing: ${missing.join(", ")}`,
      );
    }

    const exerciseId = (title: string): number => {
      const id = exerciseIdByTitle.get(title);

      if (id === undefined) {
        throw new Error(`Unknown catalog exercise: ${title}`);
      }

      return id;
    };

    const plan = planDemoData(new Date());

    return await prisma.$transaction(
      async (tx) => {
        const profile = {
          name: "Demo User",
          unitPreference: "KG" as const,
          languagePreference: "en",
        };

        const user = await tx.users.upsert({
          where: { email },
          create: { email, password: passwordHash, ...profile },
          update: { password: passwordHash, ...profile },
        });

        await clearDemoData(tx, user.id);

        const splitIdByTitle = new Map<string, number>();

        for (const { dayOfWeek, split } of plan.assignments) {
          const created = await tx.training_splits.create({
            data: {
              userId: user.id,
              title: split.title,
              days: { create: { dayOfWeek, restDay: false } },
              exercises: {
                create: split.exercises.map((exercise, index) => ({
                  exerciseId: exerciseId(exercise.title),
                  order: index,
                  sets: exercise.sets,
                  reps: exercise.reps,
                })),
              },
            },
          });

          splitIdByTitle.set(split.title, created.id);
        }

        const restHostSplitId = splitIdByTitle.values().next().value;

        if (restHostSplitId !== undefined) {
          await tx.training_split_days.create({
            data: {
              trainingSplitId: restHostSplitId,
              dayOfWeek: plan.restDayOfWeek,
              restDay: true,
            },
          });
        }

        for (const session of plan.sessions) {
          await tx.workout_sessions.create({
            data: {
              userId: user.id,
              trainingSplitId: splitIdByTitle.get(session.splitTitle) ?? null,
              durationSeconds: session.durationSeconds,
              createdAt: session.createdAt,
              workoutExerciseLogs: {
                create: session.exercises.map((exercise) => ({
                  exerciseId: exerciseId(exercise.title),
                  workoutSets: { create: exercise.sets },
                })),
              },
            },
          });
        }

        for (const entry of plan.bodyWeights) {
          await tx.body_weights.create({
            data: {
              userId: user.id,
              weight: entry.weight,
              createdAt: entry.createdAt,
            },
          });
        }

        return {
          skipped: false as const,
          userId: user.id,
          sessionCount: plan.sessions.length,
        };
      },
      { timeout: 120_000, maxWait: 20_000 },
    );
  },
};
