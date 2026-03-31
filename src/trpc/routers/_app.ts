import { inngest } from "@/inngest/client";
import { baseProcedure, createTRPCRouter, protectedProcedure } from "../init";
import prisma from "@/lib/db";
// export const appRouter = createTRPCRouter({
//   // getUsers: baseProcedure.query(() => {
//   getUsers: protectedProcedure.query(({ ctx }) => {
//     return prisma.user.findMany({
//       where: {
//         id: ctx.auth?.user.id,
//       },
//     });
//   }),
// });
// export type definition of API

export const appRouter = createTRPCRouter({
  // getUsers: baseProcedure.query(() => {
  getWorkflows: protectedProcedure.query(({ ctx }) => {
    return prisma.workflow.findMany();
  }),
  createWorkflow: protectedProcedure.mutation(async () => {
    await inngest.send({
      name: "test/hello.world",
      data: {
        email: "chuks@gmail.com",
      },
    });

    return { success: true, message: "Job queued" };
  }),
});

export type AppRouter = typeof appRouter;
