// TODO 게시글 스키마
import { Schema, model, models } from 'mongoose';

const PostSchema = new Schema({
  title: { type: String, required: true },
  intro: { type: String },
  content: { type: String, required: true },
  category: { type: String, required: true },
  author: { type: String, default: 'Yuhn' },
  slug: { type: String, unique: true, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  likes: { type: Number, default: 0 },
});

export const Post = models.Post || model('Post', PostSchema);
