import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from '@/components/layout/layout';
import { buttonVariants } from '@/components/ui/button';
import { getAuthSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Lesson } from './Lesson';
import { LessonsNavigation } from './LessonsNavigation';
import { getLesson } from './lesson.query';
import { Suspense } from 'react';
import { LessonsNavigationSkeleton } from './LessonsNavigationSkeleton';
import { LessonSkeleton } from './LessonSkeleton';

export default async function LessonPage({
  params,
}: {
  params: {
    lessonId: string;
    courseId: string;
  };
}) {

  return (
    <div className="flex items-start gap-4 p-4">
      <Suspense fallback={<LessonsNavigationSkeleton />}>
        <LessonsNavigation courseId={params.courseId} />
      </Suspense>
      <Suspense fallback={<LessonSkeleton />}>
        <Lesson {...params} />
      </Suspense>
    </div>
  );
}