import { getRecentLogs } from '@/lib/logs';
import Link from 'next/link';
import LogBtn from './button/LogBtn';

export default async function RecentLog() {
  const logs = await getRecentLogs();

  return (
    <div className="bg-point rounded-main border border-text-3/30 px-5 py-4 shadow-default h-80">
      <div className="flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <h2 className="text-20-bold">RECENT LOG</h2>
          <LogBtn />
        </div>

        <div className="flex flex-col text-12">
          {logs.map((log) => (
            <Link
              href={log.link}
              key={log._id}
              className="flex justify-between items-center hover:bg-text-hover rounded-sm px-2 py-2">
              <div>
                <p className="text-body">{log.title}</p>
              </div>
              <div className="flex justify-between w-[30%]">
                <span>{new Date(log.date).toLocaleDateString()}</span>
                <span>{log.author}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
