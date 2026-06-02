import { connectDB } from './db';
import { Post } from '@/app/models/Post';
import { PostType } from '@/types/post';
import { DEFAULT_CATEGORIES } from '@/constants/categories';
import { Comment as CommentModel } from '@/app/models/Comment';
import { CommentType } from '@/types/index';

// 게시물 다 가져오기 sort 매개변수 추가, 기본값은 latest
export async function getAllPosts(sort: string = 'latest'): Promise<PostType[]> {
  await connectDB();

  // 정렬 기준 설정
  let sortOption: Record<string, 1 | -1> = { createdAt: -1 };

  if (sort === 'likes') {
    sortOption = { likes: -1 };
  } else if (sort === 'hits') {
    sortOption = { views: -1 };
  }

  // 설정한 정렬 기준 적용
  const posts = await Post.find({}).sort(sortOption).lean();

  return posts.map((post: PostType) => ({
    _id: post._id.toString(),
    title: post.title,
    intro: post.intro,
    content: post.content,
    author: post.author,
    slug: post.slug,
    category: post.category || '카테고리 없음',
    createdAt: new Date(post.createdAt).toISOString(),
    likes: post.likes,
  }));
}

// 글 상세 페이지 각각 뿌리기 위한 slug로 분류
export async function getPostBySlug(slug: string) {
  await connectDB();
  const post = await Post.findOne({ slug }).lean();

  if (!post) return null;

  return {
    ...post,
    _id: post._id.toString(),
  };
}

// 카테고리 가져오기
export async function getCategoryStats() {
  await connectDB();

  const posts = await Post.find({}, 'category').lean();

  const stats: Record<string, number> = {};
  DEFAULT_CATEGORIES.forEach((cat) => {
    stats[cat] = 0;
  });

  posts.forEach((post) => {
    const cat = post.category || 'etc';
    stats[cat] = (stats[cat] || 0) + 1;
  });

  return Object.entries(stats).map(([name, count]) => ({
    name,
    count,
  }));
}

// 가져온 게시글 카테고리별 필터링
export async function getPostByCategory(categoryName: string) {
  await connectDB();

  const posts = await Post.find({ category: categoryName }).sort({ createdAt: -1 }).lean();

  return posts.map((post) => ({
    ...post,
    _id: post._id.toString(),
    createdAt: post.createdAt.toISOString(),
  }));
}

// 최근 게시물 4개만 가져오기 -> 메인 페이지에 뿌릴 거
export async function getRecentPosts(limit: number = 4) {
  await connectDB();

  const posts = await Post.find({}).sort({ createdAt: -1 }).limit(limit).lean();

  return posts.map((post) => ({
    ...post,
    _id: post._id.toString(),
    createdAt: post.createdAt.toISOString(),
  }));
}

// 댓글 가져오기
export async function getComments(slug: string) {
  await connectDB();

  const comments = await CommentModel.find({ postSlug: slug }).sort({ createdAt: -1 }).lean();

  return comments.map((comment: CommentType) => ({
    ...comment,
    _id: comment._id.toString(),
    createdAt: (comment.createdAt as Date).toISOString(),
  }));
}
