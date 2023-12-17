"use client";

import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { LogInButton } from "@/features/auth/LogInButton";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Card className="m-auto mt-4 max-w-lg">
      <CardHeader>
        <CardTitle>You need to be logged in to view this page</CardTitle>
      </CardHeader>
      <CardFooter>
        <LogInButton />
      </CardFooter>
    </Card>
  );
}
