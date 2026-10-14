import { notFound } from "next/navigation";
import CourseDetails, { CourseType } from "./ClientCoursePage";
import { courseData } from "@/Data/course";
import { courseMetaDescriptions } from "@/Data/MetaData";

import type { Metadata } from "next";
const siteURL = "https://www.gandharvaschoolofmusic.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ course: string; id: string }>;
}): Promise<Metadata> {
  const { course, id } = await params;
  // @ts-expect-error improve
  const courseInfo: CourseType = courseData[id];
  // @ts-expect-error improve
  const metaDes = courseMetaDescriptions[id];

  if (!course || !id || !courseInfo) {
    return {
      title: "Course Not Found",
      description: "The course you're looking for does not exist.",
    };
  }

  return {
    title: `${courseInfo.title} | Gandharva School Of Music`,
    description:
      metaDes ||
      `Learn ${courseInfo.title} online with Gandharva through live 1:1 classes for all ages. Get certified in ${courseInfo.type} level.`,
    alternates: {
      canonical: `${siteURL}/courses/${course}/${id}`,
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ course: string; id: string }>;
}) {
  const { course, id } = await params;
  // @ts-expect-error improve
  const courseInfo: CourseType = courseData[id];

  if (!course || !id || !courseInfo) {
    return notFound();
  }

  return <CourseDetails params={{ courseData: courseInfo }} />;
}

// export async function generateMetadata({
//   params,
// }: {
//   params: Promise<{ id: string }>;
// }) {
//   const course = (await params).id;
//   // @ts-expect-error improve
//   const courseInfo: CourseType = courseData[course];
//   // @ts-expect-error improve
//   const metaDes = courseMetaDescriptions[course];
//   // console.log(metaDes, "metaDes");
//   if (!course || !courseInfo) {
//     return {
//       title: "Course Not Found",
//       description: "The course you're looking for does not exist.",
//     };
//   }

//   return {
//     title: `${courseInfo.title} | Gandharva School Of Music`,
//     // description: `Learn${courseInfo.title} online with Gandharva through live 1:1 classes for all ages. Get certified in ${courseInfo.type} level.`,
//     description:
//       metaDes ||
//       `Learn ${courseInfo.title} online with Gandharva through live 1:1 classes for all ages. Get certified in ${courseInfo.type} level.`,
//   };
// }

// export default async function Page({
//   params,
// }: {
//   params: Promise<{ id: string }>;
// }) {
//   const course = (await params).id;
//   // @ts-expect-error improve
//   const courseInfo: CourseType = courseData[course];

//   if (!course || !courseInfo) {
//     return notFound();
//   }

//   return <CourseDatails params={{ courseData: courseInfo }} />;
// }
