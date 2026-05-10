import { headers } from 'next/headers';
import { connectDB } from './db';
import { Visitor, VisitorLog } from '@/app/models/Visitor';

export async function recordVisit() {
  await connectDB();

  const today = new Date().toISOString().split('T')[0];
  const headerList = await headers();
  const ip = headerList.get('x-forwarded-for')?.split(',')[0] || '127.0.0.1';

  let visitorLog = await VisitorLog.findOne({ ip, date: today });

  if (!visitorLog) {
    // 오늘 처음 방문했을 때 -> 숫자 올리기
    visitorLog = await VisitorLog.create({
      ip,
      date: today,
      hitCount: 1,
    });

    await Visitor.findOneAndUpdate(
      { date: today },
      { $inc: { todayCount: 1, totalCount: 1 } },
      { upsert: true },
    );
  } else {
    // 이미 방문했다면 -> 숫자 유지
  }

  return visitorLog.hitCount;
}

export async function getVisitorStats() {
  await connectDB();

  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

  const todayData = await Visitor.findOne({ date: today });
  const yesterdayData = await Visitor.findOne({ date: yesterday });

  const allData = await Visitor.find({});
  const total = allData.reduce((acc, cur) => acc + cur.todayCount, 0);

  return {
    today: todayData?.todayCount || 0,
    yesterday: yesterdayData?.todayCount || 0,
    total: total,
  };
}

// 차트에 보여줄 최근 5일간의 방문자 뽑기
export async function getRecentVisitorData() {
  await connectDB();

  const data = await Visitor.find().sort({ date: -1 }).limit(5).lean();

  return data.reverse().map((d) => ({
    date: d.date.substring(5),
    count: d.todayCount,
  }));
}
