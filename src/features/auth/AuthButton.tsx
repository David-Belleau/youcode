import { getAuthSession } from "@/lib/auth";
import { LoggedInButton } from "./LoggedInButton";
import { LogInButton } from "./LogInButton";

export const AuthButton = async () => {
  const session = await getAuthSession();

  const user = session?.user;

  if (!user) {
    return <LogInButton />;
  }

  return <LoggedInButton user={user} />;
};
