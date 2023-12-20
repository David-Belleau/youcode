import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

// create 10 users, each with 1 course and 100 relationships between courses and users as students.
const main = async () => {
  const users: any[] = [];

  for (let i = 0; i < 10; i++) {
    users.push(
      await prisma.user.create({
        data: {
          email: faker.internet.email(),
          createdAt: faker.date.past(),
          createdCourses: {
            create: {
              name: faker.lorem.words(3),
              createdAt: faker.date.past(),
              presentation: faker.lorem.paragraph(),
              image: faker.image.url(),
              lessons: {
                createMany: {
                  data: [
                    {
                      name: faker.lorem.words(3),
                      content: faker.lorem.paragraph(),
                      rank: "aaaaaa",
                    },
                    {
                      name: faker.lorem.words(3),
                      content: faker.lorem.paragraph(),
                      rank: "aaaaab",
                    },
                  ],
                },
              },
            },
          },
        },
      })
    );
  }

  const courses = await prisma.course.findMany();

  for (const course of courses) {
    // randomly select three users for each course
    const random3Users = faker.helpers.arrayElements(users, 3);

    // create entries in the "courseOnUser" table to associate users with a course
    for (const user of random3Users) {
      await prisma.courseOnUser.create({
        data: {
          userId: user.id,
          courseId: course.id,
        },
      });
    }
  }
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async () => {    
    // close database connections
    await prisma.$disconnect();

    // output code 1 indicates a generated error
    process.exit(1);
  });
