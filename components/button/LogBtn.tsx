'use client';

import { useThemeStore } from '@/store/useThemeStore';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';

export default function LogBtn() {
  const router = useRouter();
  const { isDark } = useThemeStore();
  const [isPending, startTransition] = useTransition();
  const [isRotating, setIsRotating] = useState(false);

  const handleRefresh = () => {
    router.refresh();
    setIsRotating(true);

    startTransition(() => {
      router.refresh();

      setTimeout(() => {
        setIsRotating(false);
      }, 300);
    });
  };

  return (
    <button
      onClick={handleRefresh}
      disabled={isPending}
      className="relative flex items-center justify-center">
      {isPending && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 border-2 border-text-point border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      <Image
        src={isDark ? '/icons/bkIconRefresh.svg' : '/icons/whIconRefresh.svg'}
        alt="로그 새로고침"
        width={20}
        height={20}
        className={`transition-transform duration-300 ease-in-out 
          ${isRotating ? 'rotate-180' : 'rotate-0'} 
          ${isPending ? 'opacity-0' : 'opacity-100'} // 로딩 중엔 아이콘 숨김
        `}
      />
    </button>
  );
}
