import { Card, CardHeader, CardTitle } from "@/components/ui/card";

export const NotAuthenticatedCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>You need to be logged in to view this page</CardTitle>
      </CardHeader>
    </Card>
  );
};
