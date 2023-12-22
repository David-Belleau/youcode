import { prisma } from '@/lib/prisma';

export const getCourseLessons = async ({
  courseId,
  userId,
}: {
  courseId: string;
  userId: string;
}) => {
  // returns the first record in a list that matches the specified criteria
  return await prisma.course.findFirst({
    where: {
      id: courseId,
      creatorId: userId,
    },
    select: {
      id: true,
      name: true,
      lessons: true,
    },
  });
};