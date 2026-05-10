import { Guestbook as GuestbookModel } from '../app/models/Guestbook';
import { connectDB } from './db';
import { GuestbookType } from '@/types';

interface RawGuestbook {
  _id: import('mongoose').Types.ObjectId; // 몽고디비 고유 객체 타입
  author: string;
  text: string;
  createdAt: Date;
  password?: string;
  __v?: number;
}

export async function getGuestbookMessages(): Promise<GuestbookType[]> {
  await connectDB();

  const messages = await GuestbookModel.find({}).sort({ createdAt: -1 }).lean<RawGuestbook[]>();

  return messages.map((msg) => ({
    _id: msg._id.toString(),
    author: msg.author,
    text: msg.text,
    createdAt: msg.createdAt.toISOString(),
    password: msg.password,
  }));
}
