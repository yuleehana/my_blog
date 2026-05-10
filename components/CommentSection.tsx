'use client';

import { useState } from 'react';
import { postComment } from '@/app/actions';
import { useCommentStore } from '@/store/useCommentStore';
import Image from 'next/image';
import { useThemeStore } from '@/store/useThemeStore';

export default function CommentSection({ slug }: { slug: string }) {
  const { userInfo, setUserInfo } = useCommentStore();
  const [text, setText] = useState('');

  const isDark = useThemeStore((state) => state.isDark);

  const handleSubmit = async () => {
    if (!text) return alert('내용을 입력해주세요!');

    try {
      await postComment({
        slug: slug,
        author: userInfo.nickname,
        password: userInfo.password,
        text: text,
      });

      setText('');
      alert('댓글이 등록되었습니다!');
    } catch (error) {
      console.error('댓글 등록 실패:', error);
      alert('등록 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="flex flex-col gap-16">
      <div className="border border-text-3/60 w-full h-px"></div>

      <div className="flex flex-col gap-4">
        <div className="flex gap-8">
          <input
            name="nickname"
            placeholder="이름"
            value={userInfo.nickname}
            onChange={(e) => setUserInfo({ ...userInfo, nickname: e.target.value })}
            className="px-5 py-2.5 
      w-full md:w-50
      bg-point
      rounded-lg 
      text-text-2 
      placeholder:text-text-3
      outline-none
      transition-all
      focus:ring-1 
      focus:ring-text-point/50 
      focus:text-text-primary 
      focus:bg-point"
          />
          <input
            name="password"
            type="password"
            placeholder="비밀번호"
            value={userInfo.password}
            onChange={(e) => setUserInfo({ ...userInfo, password: e.target.value })}
            className="px-5 py-2.5 w-full md:w-50
      bg-point
      rounded-lg 
      text-text-2 
      placeholder:text-text-3
      outline-none
      transition-all
      focus:ring-1 
      focus:ring-text-point/50 
      focus:text-text-primary 
      focus:bg-point"
          />
        </div>

        <div className="flex flex-col gap-4 relative">
          <textarea
            name="text"
            placeholder="댓글을 남겨보세요"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full px-5 py-4 h-40 bg-point rounded-lg focus:outline-none focus:ring-1 focus:ring-text-point/50 focus:text-text-primary  focus:bg-point"
          />

          <button
            onClick={handleSubmit}
            className="absolute right-4 bottom-4 flex items-center justify-center gap-2 max-w-28 rounded-lg bg-text-point/50 px-2.5 py-1.5 text-text-2 text-body-bold">
            <Image
              src={isDark ? '/icons/bkIconPencil.svg' : '/icons/whIconPencil.svg'}
              alt="연필 아이콘"
              width={24}
              height={24}
            />
            <span>댓글 등록</span>
          </button>
        </div>
      </div>
    </div>
  );
}
