import {
    Layout,
    LayoutContent,
    LayoutHeader,
    LayoutTitle,
  } from '@/components/layout/layout';
  import { CoursePlaceholder } from './CoursePlaceholder';
  
  export default async function CoursePage() {
    return (
      <Layout>
        <LayoutHeader>
          <LayoutTitle>My courses</LayoutTitle>
        </LayoutHeader>
        <LayoutContent>
          <CoursePlaceholder />
        </LayoutContent>
      </Layout>
    );
  }