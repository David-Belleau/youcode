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
import { getAuthSession } from "@/lib/auth";
import Link from "next/link";

export default async function MyAccount() {
  const session = await getAuthSession();
  const user = session?.user;

  if (!user) {
    throw new Error("No user found !");
  }

  return (
    <Card className="m-auto mt-4 max-w-lg">
      <CardHeader className="flex flex-row gap-4 space-y-0">
        <Avatar>
          <AvatarFallback>{user?.email?.[0]}</AvatarFallback>
          {user?.image && <AvatarImage src={user?.image} alt="user image" />}
        </Avatar>
        <div className="flex flex-col gap-1">
          <CardTitle>{user?.email}</CardTitle>
          <CardDescription>{user?.name}</CardDescription>
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
