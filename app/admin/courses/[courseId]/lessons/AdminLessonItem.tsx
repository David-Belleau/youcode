import { Badge } from "@/components/ui/badge";
import { Typography } from "@/components/ui/typography";
import { AdminLessonItemType } from "./lessons.query";
import Link from "next/link";

export type AdminLessonItemProps = {
  lesson: AdminLessonItemType;
};

export const AdminLessonItem = ({ lesson }: AdminLessonItemProps) => {
  return (
    <Link href={`/admin/courses/${lesson.courseId}/lessons/${lesson.id}`}>
      <div className="flex items-center rounded border border-border bg-card px-4 py-2 transition-colors hover:bg-accent">
        <Typography variant="large">{lesson.name}</Typography>
        <Badge className="ml-auto">{lesson.state}</Badge>
      </div>
    </Link>
  );
};
