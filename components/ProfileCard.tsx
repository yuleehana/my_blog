'use client';

import { useThemeStore } from '@/store/useThemeStore';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import RefreshBtn from './button/RefreshBtn';

export default function ProfileCard({ children }: { children: React.ReactNode }) {
  const { isDark, setIsDark } = useThemeStore();

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains('dark');
    setIsDark(isDarkMode);
  }, [setIsDark]);
  //  top-38.75

  return (
    <div className="flex flex-col max-h-220 bg-bg-component rounded-sub relative overflow-hidden">
      {/* profile Background 영역 */}
      <div className="flex flex-col sticky">
        <div className="w-full h-71.5 overflow-hidden -z-20">
          <div className="w-full h-full overflow-hidden rounded-t-sub relative">
            <Image
              src={`/whiteProfileBg.png`}
              alt="프로필 배경 이미지"
              fill
              className="object-cover absolute"
              sizes="(max-width: 768px) 100vw, 400px"
              loading="eager"
            />
          </div>
        </div>
      </div>
      <div className="sticky">
        <div
          className="relative flex flex-col
          items-center pt-10 pb-8 before:content-['']
          before:absolute
          before:-top-8
          before:left-0 
          before:w-full 
          before:h-25 
          before:bg-bg-component
          before:opacity-100 
          before:rounded-t-sub">
          <div className="absolute -top-28 w-48 h-48 rounded-full bg-bg-primary overflow-hidden mb-4">
            {/* <Image src="/my-avatar.png" alt="avatar" fill className="object-cover" /> */}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-5 items-center sticky p-6.5">
        <div className="flex flex-col gap-2 items-center">
          <p className="text-24">Yu Hana</p>
          <p className="text-body">Web Developer</p>
        </div>
        <div className="bg-text-hover rounded-main flex w-full h-15 justify-center items-center">
          <div className="flex w-full justify-evenly">
            <Link className="block items-center" href={`/`}>
              {/* wh는 라이트(isDark=false), bk는 다크(isDark=true)일 때 보이도록 */}
              <Image
                src={isDark ? '/icons/bkiconSearch.svg' : '/icons/whIconSearch.svg'}
                alt="검색 아이콘"
                width={22}
                height={22}
              />
            </Link>
            <Link href={`/admin/write`} className="block items-center">
              <Image
                className="fill-current hover:text-primary"
                src={isDark ? '/icons/bkIconWrite.svg' : '/icons/whIconWrite.svg'}
                alt="글쓰기 아이콘"
                width={22}
                height={22}
              />
            </Link>
            <RefreshBtn />
            <Link href={`/`}>
              <Image
                src={isDark ? '/icons/bkIconShare.svg' : '/icons/whIconShare.svg'}
                alt="공유하기 버튼"
                width={22}
                height={22}
              />
            </Link>
          </div>
        </div>
      </div>
      <div className="h-90 overflow-y-auto">{children}</div>
    </div>
  );
}
