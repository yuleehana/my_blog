// TODO 방명록 스키마
import { Schema, model, models } from 'mongoose';

const GuestbookSchema = new Schema({
  author: { type: String, default: '익명' },
  text: { type: String, required: true },
  password: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export const Guestbook = models.Guestbook || model('Guestbook', GuestbookSchema);
