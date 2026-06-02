'use client';

import { postGuestbook } from '@/app/actions';
import { useState } from 'react';
import Image from 'next/image';
import { useThemeStore } from '@/store/useThemeStore';

export default function GuestbookForm() {
  const [author, setAuthor] = useState('');
  const [password, setPassword] = useState('');
  const [text, setText] = useState('');
  const { isDark } = useThemeStore();

  const handleSubmit = async () => {
    if (!text) return alert('내용을 입력해주세요!');
    await postGuestbook({ author, password, text });
    setText('');
    alert('방명록이 등록되었습니다!');
  };

  return (
    <div className="w-full bg-point px-9 pb-8 rounded-t-main flex flex-col gap-6">
      <div className="flex w-full items-center justify-between gap-4">
        <div className="flex gap-4 items-center flex-1">
          {/* 이름 인풋 박스 */}
          <div className="flex items-center gap-2.5 rounded-lg bg-bg-component px-5 py-2.5 flex-1 max-w-40">
            <label htmlFor="name" className="text-body text-text-2 whitespace-nowrap shrink-0">
              이름
            </label>
            <input
              id="name"
              placeholder="익명"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="outline-none text-text-3 focus:text-text-primary bg-transparent w-full min-w-0"
            />
          </div>

          {/* 비밀번호 인풋 박스 */}
          <div className="flex items-center gap-2.5 rounded-lg bg-bg-component px-5 py-2.5 flex-1 max-w-40">
            <label htmlFor="password" className="text-body text-text-2 whitespace-nowrap shrink-0">
              비밀번호
            </label>
            <input
              id="password"
              type="password"
              placeholder="****"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="outline-none text-text-3 focus:text-text-primary bg-transparent w-full min-w-0"
            />
          </div>
        </div>

        {/* 등록 버튼 */}
        <button
          onClick={handleSubmit}
          className="flex items-center gap-2 px-3 py-2 bg-bg-component border border-text-point/40 rounded-lg transition-transform duration-500 ease-in-out hover:border-text-point/80 transform hover:scale-104 shrink-0">
          <Image
            src={isDark ? '/icons/bkIconPencil.svg' : '/icons/whIconPencil.svg'}
            alt="등록"
            width={24}
            height={24}
          />
          <span className="text-body-bold text-text-primary">댓글 등록</span>
        </button>
      </div>

      {/* 텍스트 입력 영역 */}
      <textarea
        placeholder="따뜻한 한마디를 남겨주세요."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full h-32 px-8 py-6 bg-bg-primary rounded-main outline-none focus:ring-1 focus:ring-text-point/30 resize-none text-body"
      />
    </div>
  );
}
