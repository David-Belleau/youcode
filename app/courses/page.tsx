import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/layout";
import { NotAuthenticatedCard } from "@/features/error/NotAuthenticatedCard";
import { getRequiredAuthSession } from "@/lib/auth";
import { CourseCard } from "../courses/CourseCard";
import { getCourses } from "../courses/course.query";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import { CoursePaginationButton } from "@/features/pagination/CoursePaginationButton";

export default async function CoursesPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const session = await getRequiredAuthSession();

  if (!session?.user.id) {
    return <NotAuthenticatedCard />;
  }

  const page = Number(searchParams.page ?? 0) ?? 0;
  const { courses, totalCourses } = await getCourses({
    userId: session.user.id,
    page,
  });

  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>My courses</LayoutTitle>
      </LayoutHeader>
      <LayoutContent className="flex flex-col gap-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-3">
          {courses.map((course) => (
            <CourseCard course={course} key={course.id} />
          ))}
        </div>
        {courses.length === 0 ? (
          <Alert>
            <AlertTriangle />
            <AlertTitle>You are not enrolled in any courses yet.</AlertTitle>
            <AlertDescription>
              Please go to the explorer page to find a course.
            </AlertDescription>
          </Alert>
        ) : (
          <CoursePaginationButton
            baseUrl={`/courses`}
            page={page}
            totalPage={totalCourses}
          />
        )}
      </LayoutContent>
    </Layout>
  );
}
