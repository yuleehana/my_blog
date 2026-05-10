'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface CategoryNavProps {
  categories: { name: string; count: number }[];
  totalPosts: number;
}

export default function CategoryNav({ categories, totalPosts }: CategoryNavProps) {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  const activeBar = 'bg-[#F8D6E0] w-2';
  const inactiveBar = 'bg-transparent w-1 group-hover:bg-[#F8D6E0]';

  return (
    <nav className="flex flex-col gap-2 w-full px-3 h-full">
      {/* 전체 글 보기 */}
      <Link href="/blog" className="group">
        <div
          className={`flex items-center justify-between p-4 rounded-main transition-all ${isActive('/blog') ? 'bg-text-hover' : 'hover:bg-text-hover'}`}>
          <div className="flex items-center gap-3">
            <div
              className={`h-6 rounded-main transition-all ${isActive('/blog') ? activeBar : inactiveBar}`}
            />
            <span
              className={`text-body font-medium ${isActive('/blog') ? 'text-text-primary' : 'text-text-2'}`}>
              전체 글 보기
            </span>
          </div>
          <span className="text-small text-gray-400">{totalPosts}</span>
        </div>
      </Link>

      {/* 카테고리 */}
      {categories.map((cat) => {
        const catPath = `/blog/category/${encodeURIComponent(cat.name)}`;
        const active = isActive(catPath);

        return (
          <Link href={catPath} key={cat.name} className="group">
            <div
              className={`flex items-center justify-between p-4 rounded-main transition-all ${active ? 'bg-text-hover' : 'hover:bg-text-hover'}`}>
              <div className="flex items-center gap-3">
                <div
                  className={`h-6 rounded-full transition-all ${active ? activeBar : inactiveBar}`}
                />
                <span
                  className={`text-body font-medium ${active ? 'text-text-primary text-body-bold' : 'text-text-2 text-body'}`}>
                  {cat.name}
                </span>
              </div>
              <span className="text-small text-gray-400">{cat.count}</span>
            </div>
          </Link>
        );
      })}
    </nav>
  );
}
