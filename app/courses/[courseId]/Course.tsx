import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import { CourseType } from "./course.query";
import { LessonItem } from "./lessons/[lessonId]/LessonItem";
import { MarkdownProse } from "@/features/mdx/MarkdownProse";
import { getRequiredAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { SubmitButton } from "@/components/form/SubmitButton";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export type CourseProps = {
  course: CourseType;
  userId?: string;
};

export const Course = ({ course, userId }: CourseProps) => {
  const isLogin = Boolean(userId);

  return (
    <div className="flex flex-col items-start gap-4">
      <div className="flex w-full flex-col items-start gap-4 lg:flex-row">
        <Card className="flex-[2] hover:bg-accent">
          <CardHeader className="flex flex-row gap-3 space-y-0">
            <Avatar className="h-14 w-14 rounded">
              <AvatarFallback>{course.name[0]}</AvatarFallback>
              {course.image ? <AvatarImage src={course.image} /> : null}
            </Avatar>
            <div className="flex flex-col gap-3">
              <CardTitle>{course.name}</CardTitle>
              <div className="flex flex-row gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>{course.name[0]}</AvatarFallback>
                  {course.creator.image ? (
                    <AvatarImage src={course.creator.image} />
                  ) : null}
                </Avatar>
                <Typography variant="large" className=" text-muted-foreground">
                  {course.creator.name}
                </Typography>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <MarkdownProse markdown={course.presentation} />
          </CardContent>
        </Card>
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Lessons</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            {course.lessons.map((lesson) => (
              <LessonItem lesson={lesson} key={lesson.id} />
            ))}
          </CardContent>
        </Card>
      </div>
      {!course.isCanceled && !course.isEnrolled && isLogin ? (
        <form>
          <SubmitButton
            formAction={async () => {
              "use server";

              const session = await getRequiredAuthSession();

              const courseOnUser = await prisma.courseOnUser.create({
                data: {
                  userId: session.user.id,
                  courseId: course.id,
                },
                select: {
                  course: {
                    select: {
                      id: true,
                      lessons: {
                        orderBy: {
                          rank: "asc",
                        },
                        take: 1,
                        select: {
                          id: true,
                        },
                      },
                    },
                  },
                },
              });

              const lesson = courseOnUser.course.lessons[0];

              revalidatePath(`/courses/${course.id}`);

              if (!lesson) {
                return;
              }

              redirect(`/courses/${course.id}/lessons/${lesson.id}`);
            }}
          >
            Join
          </SubmitButton>
        </form>
      ) : null}
    </div>
  );
};
