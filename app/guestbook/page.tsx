import GuestbookForm from '@/components/GuestbookForm';
import GuestbookItem from '@/components/GuestbookItem';
import { getGuestbookMessages } from '@/lib/guestbook';
import { getVisitorStats, recordVisit } from '@/lib/visitor';

export default async function GuestBookPage() {
  const myVisitCount = await recordVisit();
  const stats = await getVisitorStats();
  const messages = await getGuestbookMessages();

  return (
    <div className="min-h-[90vh] max-w-200 mx-auto flex flex-col items-center relative">
      <div className="flex flex-col gap-10">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-display text-text-primary text-title text-center">GUESTBOOK</h1>
          <div className="flex flex-col justify-center items-center">
            <p className="flex items-center gap-0.5">
              <span className="text-text-2 text-24">오늘의</span>
              <span className="text-text-point text-24-bold">{myVisitCount}</span>
              <span className="text-text-2 text-24">번째 방문 감사합니다.</span>
            </p>
            <p className="text-text-2 text-24">의견과 질문이 있다면 자유롭게 남겨주세요</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-8 mb-16 ">
          {/* Yesterday */}
          <div className="aspect-square max-w-30 max-h-30 p-2 bg-bg-component border border-text-point/40 rounded-main shadow-default flex items-center justify-center transition-transform duration-300 ease-in-out hover:border-text-point/80 transform hover:scale-105">
            <div className="flex flex-col items-center gap-6">
              <span className="text-text-2 text-body-bold uppercase tracking-widest">
                Yesterday
              </span>
              <span className="text-20-bold text-text-primary">{stats.yesterday}</span>
            </div>
          </div>

          {/* Today (강조 색상) */}
          <div className="aspect-square max-w-30 max-h-30 p-2 bg-bg-component border border-text-point/40 rounded-main shadow-default flex items-center justify-center transition-transform duration-300 ease-in-out hover:border-text-point/80 transform hover:scale-105">
            <div className="flex flex-col items-center gap-6">
              <span className="text-text-2 text-body-bold uppercase tracking-widest">today</span>
              <span className="text-20-bold text-text-primary">{stats.today}</span>
            </div>
          </div>

          {/* Total */}
          <div className="aspect-square max-w-30 max-h-30 p-2 bg-bg-component border border-text-point/40 rounded-main shadow-default flex items-center justify-center transition-transform duration-300 ease-in-out hover:border-text-point/80 transform hover:scale-105">
            <div className="flex flex-col items-center gap-6">
              <span className="text-text-2 text-body-bold uppercase tracking-widest">total</span>
              <span className="text-20-bold text-text-primary">{stats.total}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 방명록 댓글  */}
      <div className="max-w-200 overflow-y-auto h-120 mx-auto flex flex-col gap-4">
        {messages.length === 0 ? (
          <p className="text-center py-10 text-text-2">방명록이 비어있습니다.</p>
        ) : (
          messages.map((msg) => <GuestbookItem key={msg._id} msg={msg} />)
        )}
      </div>

      {/* 방명록 폼 */}
      <div className="w-200 mx-auto fixed bottom-0">
        <GuestbookForm />
      </div>
    </div>
  );
}
