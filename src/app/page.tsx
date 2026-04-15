"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { requireAuth } from "@/lib/auth-utils";
import { useTRPC } from "@/trpc/client";
import { caller } from "@/trpc/server";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const Page = () => {
  // await requireAuth();

  // const data = await caller.getUsers();
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const { data } = useQuery(trpc.getWorkflows.queryOptions());
  const testAi = useMutation(trpc.testAi.mutationOptions());

  const create = useMutation(
    trpc.createWorkflow.mutationOptions({
      onSuccess: () => {
        toast.success("Job queued");
      },
    }),
  );

  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center">
      <div className="flex flex-col space-y-4 items-center justify-center">
        protected page
        {JSON.stringify(data, null, 2)}
        <Button
          disabled={testAi.isPending}
          onClick={() => testAi.mutate()}
          className="mt-4"
        >
          Test AI
        </Button>
        <Button
          disabled={create.isPending}
          onClick={() => create.mutate()}
          className=""
        >
          Create Workflow
        </Button>
        <Button onClick={() => authClient.signOut()} className="">
          Sign Out
        </Button>
      </div>
    </div>
  );
};

export default Page;
