'use client';

import { useThemeStore } from '@/store/useThemeStore';
import Image from 'next/image';
import Link from 'next/link';

export default function ViewMoreBtn() {
  const { isDark } = useThemeStore();

  return (
    <Link href={'/blog'}>
      <button className="transition-all transition-0.2 flex items-center gap-1 hover:gap-1.5">
        <span className=" text-20 text-text-3 hover:text-20-bold hover:text-text-2">더보기</span>
        <Image
          src={isDark ? '/icons/bkIconArrowR.svg' : '/icons/whIconArrowR.svg'}
          alt="더보기 화살표"
          width={18}
          height={18}
        />
      </button>
    </Link>
  );
}
