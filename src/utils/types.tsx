import { Session } from "next-auth";

export type LoggedInButtonProps = {
  user: Session["user"];
};
