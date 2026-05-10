'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Header() {
  const pathname = usePathname();

  const activeClass = 'bg-main text-24-bold text-text-primary';
  const inactiveClass = 'text-24 text-text-2 hover:bg-main/20 hover:text-text-3';

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed left-1/2 -translate-x-1/2 w-full rounded-b-sub max-w-427.5 z-50 transition-all duration-300
      ${isScrolled ? 'shadow-lg' : 'shadow-none'}`}>
      <div className="bg-bg-primary rounded-b-sub py-4 px-3.75">
        <div className="max-w-420 mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative w-14 h-13.25">
              <Image src="/icons/logo.svg" alt="Yuhn Blog Logo" fill className="object-contain" />
            </div>
            <span className="text-title text-text-primary">Yuhn Blog</span>
          </Link>

          {/* 우측 네비게이션 버튼 */}
          <nav className="flex gap-4">
            <Link href="/">
              <button
                className={`px-7 py-3.5 rounded-main transition-all
                ${pathname === '/' || pathname.startsWith('/blog') ? activeClass : inactiveClass}`}>
                블로그
              </button>
            </Link>
            <Link href="/guestbook">
              <button
                className={`px-7 py-3.5 rounded-main transition-all
                ${pathname === '/guestbook' ? activeClass : inactiveClass}`}>
                방명록
              </button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
