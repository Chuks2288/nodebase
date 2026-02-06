import { auth } from "@/lib/auth";
import { initTRPC, TRPCError } from "@trpc/server";
import { headers } from "next/headers";
import { cache } from "react";
export const createTRPCContext = cache(async () => {
  /**
   * @see: https://trpc.io/docs/server/context
   */
  return { userId: "user_123" };
});
// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = initTRPC.create({
  /**
   * @see https://trpc.io/docs/server/data-transformers
   */
  // transformer: superjson,
});
// Base router and procedure helpers
export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure;

// TAKE NOTE: THE BASE PROCEDURE WAS EXTENDED BECAUSE OF THE SECURITY LAYER, TO ENSURE STRONGER SECURITY MEASURES IN THE API. ALL PROCEDURES THAT REQUIRE AUTHENTICATION SHOULD USE THE PROTECTED PROCEDURE INSTEAD OF THE BASE PROCEDURE. SO, EVEN WHEN THE FRONTEND PROTECTED PAGES BREAK, THE API ENDPOINTS WILL STILL BE PROTECTED AND SECURE.

export const protectedProcedure = baseProcedure.use(async ({ ctx, next }) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Unauthorized",
    });
  }

  return next({ ctx: { ...ctx, auth: session } });
});
