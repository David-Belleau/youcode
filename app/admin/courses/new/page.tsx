import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/layout";
import { Card, CardContent } from "@/components/ui/card";
import { getRequiredAuthSession } from "@/lib/auth";
import { CourseForm } from "../[courseId]/edit/CourseForm";
import { NotAuthenticatedCard } from "@/features/error/NotAuthenticatedCard";

export default async function CoursePage() {
  const session = await getRequiredAuthSession();
  
  if (!session?.user.id) {
    return <NotAuthenticatedCard />;
  }
  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Create course</LayoutTitle>
      </LayoutHeader>
      <LayoutContent>
        <Card className="flex-[2]">
          <CardContent className="mt-6">
            <CourseForm />
          </CardContent>
        </Card>
      </LayoutContent>
    </Layout>
  );
}
