import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Typography } from '@/components/ui/typography';
import Link from 'next/link';
import { CoursesCard } from './course.query';

export type CourseCardProps = {
  course: CoursesCard;
};

export const CourseCard = ({course}: CourseCardProps) => {
  return (
    <Link href={`/courses/${course.id}`}>
      <Card className="hover:bg-accent">
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
      </Card>
    </Link>
  );
};