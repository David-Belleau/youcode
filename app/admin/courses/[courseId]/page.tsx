import {
    Layout,
    LayoutContent,
    LayoutHeader,
    LayoutTitle,
  } from '@/components/layout/layout';
  import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
  import { Card, CardContent } from '@/components/ui/card';
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from '@/components/ui/table';
  import { Typography } from '@/components/ui/typography';
  import { getRequiredAuthSession } from '@/lib/auth';
  import { prisma } from '@/lib/prisma';
  import Link from 'next/link';
  
  export default async function CourseId() {
  
    return (
      <p>course id</p>
    );
  }