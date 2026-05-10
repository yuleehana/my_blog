'use client';

import { deleteGuestbook } from '@/app/actions';
import { GuestbookType } from '@/types';

export default function GuestbookItem({ msg }: { msg: GuestbookType }) {
  const handleDelete = async () => {
    const pwd = prompt('비밀번호를 입력해주세요');
    if (!pwd) return;

    const result = await deleteGuestbook(pwd, msg._id);

    if (result.success) {
      alert('댓글이 삭제되었습니다.');
    } else {
      alert(result.message);
    }
  };

  return (
    <div className="flex flex-col w-full gap-5 px-6 py-5 bg-bg-component rounded-main border border-text-point/40">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-1">
          <span className="font-body text-text-primary">{msg.author}</span>
          <span className="text-text-2 text-12">
            {new Date(msg.createdAt).toLocaleDateString()}
          </span>
        </div>

        {msg.password && (
          <div className="flex items-center gap-3 text-12 text-text-2">
            <button onClick={handleDelete} className="hover:text-[#BE4164]">
              삭제
            </button>
          </div>
        )}
      </div>
      <p className="text-body text-text-primary leading-relaxed">{msg.text}</p>
    </div>
  );
}
