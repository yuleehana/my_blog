'use client';

import { useThemeStore } from '@/store/useThemeStore';
import Image from 'next/image';

export default function InteractionSideBar() {
  const { isDark } = useThemeStore();

  return (
    <div className="flex flex-col gap-4">
      <button className="flex items-center justify-center aspect-square rounded-full bg-bg-component">
        <Image
          src={isDark ? '/icons/bkIconHeart.svg' : '/icons/whIconHeart.svg'}
          alt="하트 아이콘"
          width={36}
          height={36}
          className='block'
        />
      </button>
      <button className="flex items-center aspect-square rounded-full bg-bg-component">
        Share Btn
      </button>
    </div>
  );
}
