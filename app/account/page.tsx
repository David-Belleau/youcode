import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LogOutButton } from "@/features/auth/LogOutButton";
import { NotAuthenticatedCard } from "@/features/error/NotAuthenticatedCard";
import { getRequiredAuthSession } from "@/lib/auth";
import Link from "next/link";

export default async function MyAccount() {
  const session = await getRequiredAuthSession();

  if (!session) {
    return <NotAuthenticatedCard />;
  }

  return (
    <Card className="m-auto mt-4 max-w-lg">
      <CardHeader className="flex flex-row gap-4 space-y-0">
        <Avatar>
          <AvatarFallback>{session.user?.email?.[0]}</AvatarFallback>
          {session.user?.image && (
            <AvatarImage src={session.user?.image} alt="user image" />
          )}
        </Avatar>
        <div className="flex flex-col gap-1">
          <CardTitle>{session.user?.email}</CardTitle>
          <CardDescription>{session.user?.name}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <Link
          className={buttonVariants({ variant: "outline", size: "lg" })}
          href="/account/settings"
        >
          Settings
        </Link>
        <Link
          className={buttonVariants({ variant: "outline", size: "lg" })}
          href="/admin"
        >
          Admin
        </Link>
      </CardContent>
      <CardFooter className="flex flex-row-reverse">
        <LogOutButton />
      </CardFooter>
    </Card>
  );
}
