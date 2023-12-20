import { Lesson } from "@prisma/client";
import { Session } from "next-auth";

export type LoggedInButtonProps = {
  user: Session["user"];
};

export type LessonItemProps = {
  lesson: Lesson;
};
