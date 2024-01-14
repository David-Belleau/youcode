import { getRequiredAuthSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { NewUserCharts } from './NewUserCharts';

export const NewUsersStats = async () => {
  const session = await getRequiredAuthSession();

  // users registered in the last 30 days by the course creator
  const newUsers = await prisma.courseOnUser.findMany({
    where: {
      course: {
        creatorId: session.user.id,
      },

      createdAt: {
        // greater than or equal to thirtieth of the last thirty days
        // previous 30 days
        gte: new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000),
      },
    },
    select: {
      createdAt: true,
      canceledAt: true,
      id: true,
    },
  });

  const data = Array.from({ length: 30 }, (_, i) => {
    // get the previous day at midnight
    const date = new Date(new Date().setDate(new Date().getDate() - i));
    date.setHours(0, 0, 0, 0);

    // number of users registered on a specific date during the last 30 days
    const newUsersCount = newUsers.filter((user) => {
      const userDateWithoutTime = new Date(user.createdAt.setHours(0, 0, 0, 0));
      return userDateWithoutTime.getTime() === date.getTime();
    }).length;

    // number of users canceled on a specific date during the last 30 days
    const canceledUsersCount = newUsers.filter((user) => {
      if (!user.canceledAt) {
        return false;
      }
      const userDateWithoutTime = new Date(user.canceledAt.setHours(0, 0, 0, 0));
      return userDateWithoutTime.getTime() === date.getTime();
    }).length;

    return {
      date: date.toDateString(),
      newUsersCount,
      canceledUsersCount,
    };
  }).reverse();

  return <NewUserCharts data={data} />;
};