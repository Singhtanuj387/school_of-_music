import { notFound } from "next/navigation";
import { blogDetails } from "@/Data/blog";
import { BlogEntry } from "@/types/blog";
import BlogDetailPage from "./Client";
import { blogMetaDescriptions } from "@/Data/MetaData";

import type { Metadata } from "next";
const siteURL = "https://www.gandharvaschoolofmusic.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const blogInfo: BlogEntry | undefined = blogDetails[slug];

  if (!slug || !blogInfo) {
    return {
      title: "Blog Not Found",
      description: "The blog you're looking for does not exist.",
    };
  }

  // @ts-expect-error: indexing dynamic key
  const description: string = blogMetaDescriptions[slug]?.description || "";

  return {
    title: blogInfo.title,
    description,
    alternates: {
      canonical: `${siteURL}/${slug}/`,
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blogInfo: BlogEntry | undefined = blogDetails[slug];

  if (!slug || !blogInfo) {
    return notFound();
  }

  return <BlogDetailPage params={{ blogData: blogInfo, slug }} />;
}

// export async function generateMetadata({
//   params,
// }: {
//   params: Promise<{ slug: string }>;
// }) {
//   const blog = (await params).slug;
//   const blogInfo: BlogEntry = blogDetails[blog];

//   if (!blog || !blogInfo) {
//     return {
//       title: "Blog Not Found",
//       description: "The blog you're looking for does not exist.",
//     };
//   }

//   // @ts-expect-error Implicit any
//   const { description } = blogMetaDescriptions[blog];

//   return {
//     title: `${blogInfo.title}`,
//     description: description,
//   };
// }

// export default async function Page({
//   params,
// }: {
//   params: Promise<{ slug: string }>;
// }) {
//   const blog = (await params).slug;
//   const blogInfo: BlogEntry = blogDetails[blog];

//   if (!blog || !blogInfo) {
//     return notFound();
//   }

//   return (
//     <BlogDetailPage
//       params={{ blogData: blogInfo, slug: (await params).slug }}
//     />
//   );
// }
