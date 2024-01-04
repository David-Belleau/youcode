import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const getCourses = async (userId?: string) => {
  return await prisma.course.findMany({
    // get at least one course from the course creator
    where: userId
      ? {
          users: {
            some: {
              userId,
              canceledAt: null,
            },
          },
        }
      : undefined,
    select: {
      name: true,
      image: true,
      presentation: true,
      id: true,
      creator: {
        select: {
          image: true,
          name: true,
        },
      },
    },
  });
};

// get course model types from prisma
export type CoursesCard = Prisma.PromiseReturnType<typeof getCourses>[number];
