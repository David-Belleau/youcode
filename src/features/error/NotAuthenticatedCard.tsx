import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { LogInButton } from "../auth/LogInButton";

export const NotAuthenticatedCard = () => {
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
};
