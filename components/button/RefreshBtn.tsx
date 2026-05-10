'use client';

import { useThemeStore } from '@/store/useThemeStore';
import Image from 'next/image';

export default function RefreshBtn() {
  const { isDark } = useThemeStore();

  const handleRefresh = () => {
    window.location.reload();
    console.log('refresh');
  };

  return (
    <button onClick={handleRefresh}>
      <Image
        src={isDark ? '/icons/bkIconRefresh.svg' : '/icons/whIconRefresh.svg'}
        alt="새로고침"
        width={22}
        height={22}
      />
    </button>
  );
}
