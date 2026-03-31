import prisma from "@/lib/db";
import { inngest } from "./client";

export const helloWorld = inngest.createFunction(
  { id: "hello-world", triggers: [{ event: "test/hello.world" }] },
  async ({ event, step }) => {
    // Fetching the video
    await step.sleep("fetching", "5s");

    // Transcribing the video
    await step.sleep("transcribing", "5s");

    // Sending transcription to AI
    await step.sleep("sending-to-ai", "5s");

    await step.run("create-workfow", () => {
      return prisma.workflow.create({
        data: {
          name: "workfow-from-inngest",
        },
      });
    });
    return { message: `Hello ${event.data.email}!` };
  },
);
