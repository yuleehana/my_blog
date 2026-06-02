'use client';

import { useState } from 'react';
import GuestbookForm from './GuestbookForm';

export default function FloatingGuestbook() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      onClick={() => !isOpen && setIsOpen(true)} // 닫혀있을 때 클릭하면 열림
      className={`fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-200 bg-point border border-text-point/40 rounded-t-main shadow-[0_-10px_30px_rgba(0,0,0,0.1)] transition-all duration-500 ease-in-out z-50
        ${
          isOpen
            ? 'translate-y-0'
            : 'translate-y-[calc(100%-60px)] hover:translate-y-[calc(100%-80px)] cursor-pointer'
        }
      `}>
      <div className="flex flex-col items-center py-4 rounded-t-main">
        <div className="w-12 h-1 bg-text-3 rounded-full mb-2" />
        {!isOpen && (
          <span className="text-12 text-text-2 select-none animate-pulse">
            클릭하여 방명록 작성하기
          </span>
        )}
        {isOpen && (
          <button
            onClick={(e) => {
              e.stopPropagation(); // 부모 div의 클릭 이벤트 전파 차단
              setIsOpen(false);
            }}
            className="text-12 text-text-point hover:underline">
            접기
          </button>
        )}
      </div>

      {/* 내부 실제 폼 컴포넌트 */}
      <div>
        <GuestbookForm />
      </div>
    </div>
  );
}
