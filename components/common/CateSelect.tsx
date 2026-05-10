'use client';

import { DEFAULT_CATEGORIES } from '@/constants/categories';
import { useThemeStore } from '@/store/useThemeStore';
import Image from 'next/image';
import { useState } from 'react';

export default function CateSelect() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [customCategory, setCustomCategory] = useState('');
  const isDark = useThemeStore((state) => state.isDark);

  const handleSelect = (value: string) => {
    setSelectedCategory(value);
    setIsOpen(false);
  };

  return (
    <div className="relative transition-all duration-300 bg-bg-component rounded-main border border-text-2/30 shadow-default max-w-48">
      <input type="hidden" name="categorySelect" value={selectedCategory} required />

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-4 py-3 text-20 text-text-primary">
        <span className='mr-1'>{selectedCategory || '카테고리 선택'}</span>
        <Image
          src={isDark ? '/icons/bkIconArrowD.svg' : '/icons/whIconArrowD.svg'}
          alt="화살표"
          width={20}
          height={20}
          className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
        />
      </button>

      {isOpen && (
        <div
          className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
          <ul className="overflow-hidden min-h-0">
            {DEFAULT_CATEGORIES.map((cate) => (
              <li
                key={cate}
                onClick={() => handleSelect(cate)}
                className={`flex items-center justify-start px-4 py-3 cursor-pointer text-20 transition-colors
                ${selectedCategory === cate ? 'text-text-point text-20-bold' : 'hover:bg-text-hover hover:text-text-primary'}`}>
                {cate}
              </li>
            ))}
            <li
              onClick={() => handleSelect('custom')}
              className="px-4 py-3 hover:bg-text-hover cursor-pointer border-t border-text-3/40 text-20">
              직접 입력하기
            </li>
          </ul>
          {selectedCategory === 'custom' && (
            <div className="w-full">
              <input
                type="text"
                name="customCategory"
                placeholder="새 카테고리 입력하기"
                className="px-4 py-3 rounded-b-main w-full bg-bg-primary text-20 text-text-point"
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value)}
                required
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
