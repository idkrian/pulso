import { demoService } from "../../src/modules/demo/demo.service.js";

export async function seedDemo() {
  if (!demoService.isEnabled()) {
    console.log("Demo account is not configured, skipping demo seed.");
    return;
  }

  try {
    const result = await demoService.reset();

    if (result.skipped) {
      return;
    }

    console.log(
      `Seeded demo account with ${result.sessionCount} workout sessions.`,
    );
  } catch (error) {
    console.error("Demo seed failed, starting without it:", error);
  }
}
