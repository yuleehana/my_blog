'use server';

import { connectDB } from '@/lib/db';
import { Post } from './models/Post';
import { Comment as CommentModel } from './models/Comment';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { Guestbook as GuestbookModel } from './models/Guestbook';

export async function createPost(formData: FormData) {
  const password = formData.get('adminPassword');
  if (password !== process.env.ADMIN_PASSWORD) {
    redirect('/admin/write?error=invalid_password');
  }

  await connectDB();

  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  const selectCate = formData.get('categorySelect') as string;
  const customCate = formData.get('customCategory') as string;
  const intro = formData.get('intro') as string;

  const finalCate = selectCate === 'custom' ? customCate : selectCate;

  const slug = title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s\uAC00-\uD7A3-]/g, '')
    .replace(/\s+/g, '-');

  const entries = Array.from(formData.entries());
  const sections: { subTitle: string; content: string }[] = [];
  let i = 0;
  while (formData.has(`subTitle_${i}`)) {
    sections.push({
      subTitle: formData.get(`subTitle_${i}`) as string,
      content: formData.get(`content_${i}`) as string,
    });
    i++;
  }

  const introSection = intro ? `> ${intro}\n\n---\n\n` : '';
  const bodyContent = sections.map((s) => `## ${s.subTitle}\n\n${s.content}`).join('\n\n');
  const fullContent = introSection + bodyContent;

  await Post.create({
    title,
    content: fullContent,
    category: finalCate,
    slug: slug,
    intro: intro,
  });
  revalidatePath('/blog');
  redirect(`/blog/${slug}`);
}

export async function postComment(formData: {
  slug: string;
  author: string;
  password: string;
  text: string;
}) {
  await connectDB();

  await CommentModel.create({
    postSlug: formData.slug,
    author: formData.author.trim() || '익명',
    password: formData.password,
    text: formData.text,
  });

  revalidatePath(`/blog/${formData.slug}`);
}

export async function deleteComment(id: string, password: string, slug: string) {
  await connectDB();

  const comment = await CommentModel.findById(id);
  if (!comment) {
    return { success: false, message: '댓글을 찾을 수 없습니다.' };
  }

  if (comment.password !== password) {
    return { success: false, message: '비밀번호가 틀렸습니다.' };
  }

  await CommentModel.findByIdAndDelete(id);

  revalidatePath(`/blog/${slug}`);
  return { success: true };
}

export async function toggleLike(slug: string) {
  await connectDB();

  await Post.findOneAndUpdate({ slug }, { $inc: { likes: 1 } });

  revalidatePath(`/blog/${slug}`);
  revalidatePath('/blog');
}

export async function postGuestbook(formData: { author: string; password: string; text: string }) {
  await connectDB();

  await GuestbookModel.create({
    author: formData.author.trim() || '익명',
    password: formData.password,
    text: formData.text,
    createdAt: new Date(),
  });

  revalidatePath('/guestbook');
}

export async function deleteGuestbook(password: string, _id: string) {
  await connectDB();

  const guestComment = await GuestbookModel.findById(_id);
  if (!guestComment) {
    return { success: false, message: '글을 찾을 수 없습니다.' };
  }

  if (guestComment.password !== password) {
    return { success: false, message: '비밀번호가 틀렸습니다.' };
  }

  await GuestbookModel.findByIdAndDelete(_id);

  revalidatePath(`/guestbook`);
  return { success: true };
}
