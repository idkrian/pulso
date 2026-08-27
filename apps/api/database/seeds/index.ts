import "dotenv/config";
import { prisma } from "../prisma/prisma.js";
import { seedExercises } from "./exercises.js";

async function main() {
  await seedExercises();
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
