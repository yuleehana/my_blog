import { Comment as CommentModel } from '@/app/models/Comment';
import { connectDB } from './db';
import { Guestbook as GuestbookModel } from '@/app/models/Guestbook';
import { RecentLogType } from '@/types';

interface RawData {
  _id: import('mongoose').Types.ObjectId;
  author: string;
  text: string;
  createdAt: Date;
  postSlug?: string;
}

export async function getRecentLogs(): Promise<RecentLogType[]> {
  await connectDB();

  const comments = await CommentModel.find().sort({ createdAt: -1 }).limit(5).lean<RawData[]>();
  const guestbooks = await GuestbookModel.find().sort({ createdAt: -1 }).limit(5).lean<RawData[]>();

  const logs: RecentLogType[] = [
    ...comments.map((c) => ({
      _id: c._id.toString(),
      type: 'comment' as const,
      title: `'${c.postSlug?.substring(0, 10)}...' 게시물에 댓글이 달렸습니다.`,
      date: c.createdAt.toISOString(),
      author: c.author,
      link: `/blog/${c.postSlug}`,
    })),

    ...guestbooks.map((g) => ({
      _id: g._id.toString(),
      type: 'guestbook' as const,
      title: `방명록에 글이 달렸습니다.`,
      date: g.createdAt.toISOString(),
      author: g.author,
      link: `/guestbook`,
    })),
  ];

  return logs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 8);
}
