'use client';

import { useThemeStore } from '@/store/useThemeStore';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

const SORT_OPTIONS = [
  { label: '최신순', value: 'latest' },
  { label: '인기순', value: 'likes' },
  { label: '조회순', value: 'hits' },
];

export default function SortFilter() {
  const isDark = useThemeStore((state) => state.isDark);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentSort = searchParams.get('sort') || 'latest';
  const currentLabel = SORT_OPTIONS.find((opt) => opt.value === currentSort)?.label;

  const handleSort = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', value);
    router.push(`${pathname}?${params.toString()}`);
    setIsOpen(false);
  };

  return (
    <div className="relative bg-bg-component flex flex-col rounded-sub overflow-hidden transition-all duration-300 ease-in-out border border-text-primary/30 shadow-default">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center w-full gap-1.5 px-6 py-3">
        <span className="text-body text-text-primary">{currentLabel}</span>
        <Image
          src={isDark ? '/icons/bkIconArrowD.svg' : '/icons/whIconArrowD.svg'}
          alt="화살표"
          width={20}
          height={20}
          className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
        />
      </button>
      {/* 드롭다운 메뉴 */}
      {isOpen && (
        <div
          className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
          <ul className="overflow-hidden min-h-0">
            {SORT_OPTIONS.map((opt) => (
              <li
                key={opt.value}
                onClick={() => handleSort(opt.value)}
                className={`flex items-center justify-center px-6 py-3 cursor-pointer text-body transition-colors
                ${currentSort === opt.value ? 'text-text-point text-body-bold' : 'hover:bg-text-hover hover:text-text-primary'}
              `}>
                {opt.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
