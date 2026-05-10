// TODO 댓글 스키마
import mongoose, { model, models } from 'mongoose';

const CommentSchema = new mongoose.Schema({
  postSlug: { type: String, required: true },
  author: { type: String, default: '익명' },
  password: { type: String },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Comment = models.Comment || model('Comment', CommentSchema);
