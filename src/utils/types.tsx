import { Lesson } from "@prisma/client";
import { Session } from "next-auth";
import { CoursesCard } from "../../app/courses/course.query";

export type LoggedInButtonProps = {
  user: Session["user"];
};

export type LessonItemProps = {
  lesson: Lesson;
};

export type CourseCardProps = {
  course: CoursesCard;
};