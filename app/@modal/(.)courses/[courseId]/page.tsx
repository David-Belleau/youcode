import { getAuthSession } from "@/lib/auth";
import { notFound } from "next/navigation";
import { Course } from "../../../courses/[courseId]/Course";
import { getCourse } from "../../../courses/[courseId]/course.query";
import { CourseDialog } from "./CourseDialog";
import { Suspense } from "react";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CoursePlaceholder } from "../../../courses/[courseId]/CoursePlaceholder";

export default async function CoursePage({
  params,
}: {
  params: {
    courseId: string;
  };
}) {
  if (!params.courseId) {
    notFound();
  }

  return (
    <CourseDialog>
      <Suspense
        fallback={
          <>
            <DialogHeader>
              <DialogTitle>Loading...</DialogTitle>
            </DialogHeader>
            <CoursePlaceholder />
          </>
        }
      >
        <CourseWithData courseId={params.courseId} />
      </Suspense>
    </CourseDialog>
  );
}

const CourseWithData = async ({ courseId }: { courseId: string }) => {
  const session = await getAuthSession();
  const course = await getCourse({
    courseId: courseId,
    userId: session?.user.id,
  });

  if (!course) {
    notFound();
  }

  return (
    <>
      {session ? (
        <>
          <DialogHeader>
            <DialogTitle>{course.name}</DialogTitle>
          </DialogHeader>
          <Course course={course} userId={session?.user.id} />
        </>
      ) : (
        <p>You need to be logged in to view this page</p>
      )}
    </>
  );
};
