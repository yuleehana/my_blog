export type MdPost = {
  slug: string;
  title: string;
  content: string;
};

export type DbPost = {
  _id: string;
  title: string;
  content: string;
};

export interface PostType {
  _id: string;
  title: string;
  intro: string;
  content: string;
  author: string;
  slug: string;
  category?: string;
  createdAt: string;
  likes: number;
}
