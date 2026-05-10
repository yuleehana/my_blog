// TODO 방문자 통계 스키마
import { Schema, model, models } from 'mongoose';

// 전체 통계
const VisitorSchema = new Schema({
  date: { type: String, unique: true },
  todayCount: { type: Number, default: 0 },
  yesterdayCount: { type: Number, default: 0 },
  totalCount: { type: Number, default: 0 },
});

const VisitorLogSchema = new Schema({
  ip: { type: String, required: true },
  // 동일한 날짜에 같은 IP로 방문시 카운트 안하도록
  date: { type: String, required: true },
  hitCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now, expires: '24h' },
});

export const Visitor = models.Visitor || model('Visitor', VisitorSchema);
export const VisitorLog = models.VisitorLog || model('VisitorLog', VisitorLogSchema);
