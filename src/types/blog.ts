export interface BlogCard {
  category: string;
  thumbnail: string;
  author: string;
  date: string;
  title: string;
  shortDescription: string;
  slug: string;
}

export interface BlogSection {
  headline: string;
  content: string; // HTML string
}
export interface Outro {
  headline: string;
  content: string; // HTML string
}

export interface BlogEntry {
  title: string;
  author: string;
  date: string;
  thumbnail: string;
  description: string;
  BlogContent: BlogSection[];
  outro?: Outro; // HTML string
}

export interface BlogDetails {
  [slug: string]: BlogEntry;
}
