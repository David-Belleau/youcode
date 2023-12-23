import { getRequiredAuthSession } from "@/lib/auth";
import { LoggedInButton } from "./LoggedInButton";
import { LogInButton } from "./LogInButton";

export const AuthButton = async () => {
  const session = await getRequiredAuthSession();

  if (!session?.user) {
    return <LogInButton />;
  }

  return <LoggedInButton user={session.user} />;
};
