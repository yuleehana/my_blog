'use client';

import { useThemeStore } from '@/store/useThemeStore';
import Image from 'next/image';
import { useEffect } from 'react';

export default function ThemeToggle() {
  const { isDark, setIsDark } = useThemeStore();

  useEffect(() => {
    const isDarkTheme = document.documentElement.classList.contains('dark');
    setIsDark(isDarkTheme);
  }, [setIsDark]);

  const toggleTheme = () => {
    const newTheme = !isDark ? 'dark' : 'light';
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', newTheme);
  };

  return (
    <div>
      <button
        onClick={toggleTheme}
        className="relative w-15 h-15 cursor-pointer group"
        aria-label="Toggle Theme">
        <div className="absolute inset-0 bg-main rounded-full shadow-[0_4px_10px_rgba(0,0,0,0.1)] flex items-center justify-center">
          <div
            className={`w-12.5 h-12.5 rounded-full flex items-center justify-center transition-all duration-300
      ${
        isDark
          ? 'bg-linear-to-b from-[#4C5471] to-[#6D627C] shadow-inner'
          : 'bg-linear-to-b from-[#2D2F36] to-[#82889C] shadow-md'
      }`}>
            <Image
              src={isDark ? '/icons/iconSun.svg' : '/icons/iconMoon.svg'}
              alt="모드 토글 버튼"
              width={28}
              height={28}
              className="transition-transform duration-500 group-hover:scale-110"
            />
          </div>
        </div>
      </button>
    </div>
  );
}
