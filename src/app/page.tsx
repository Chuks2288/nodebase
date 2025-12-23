import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";

const Page = () => {
  const something = true;

  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center">
      <Button variant="destructive">Click me</Button>
    </div>
  );
};

export default Page;
