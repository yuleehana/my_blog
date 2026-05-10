import { Post } from '@/app/models/Post';
import { connectDB } from '@/lib/db';

export async function POST(req: Request) {
  await connectDB();

  const body = await req.json();

  const newPost = await Post.create({
    title: body.title,
    content: body.content,
    slug: body.slug,
  });

  return Response.json(newPost);
}

export async function GET() {
  await connectDB();

  const posts = await Post.find().sort({ createdAt: -1 });

  return Response.json(posts);
}
