'use server';

import { authenticatedAction } from '@/lib/action';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { LessonDetailSchema } from './lesson.schema';

const LessonActionEditDetailsSchema = z.object({
  lessonId: z.string(),
  data: LessonDetailSchema,
});

export const lessonActionEditDetails = authenticatedAction(
  LessonActionEditDetailsSchema,
  async (props, { userId }) => {
    const lesson = await prisma.lesson.update({
      where: {
        id: props.lessonId,
        course: {
          creatorId: userId,
        },
      },
      data: props.data,
    });

    return {
      message: 'Lesson updated successfully',
      lesson,
    };
  }
);