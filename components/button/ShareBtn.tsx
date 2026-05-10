import { useThemeStore } from '@/store/useThemeStore';
import Image from 'next/image';

export default function ShareBtn() {
  const { isDark } = useThemeStore();

  return (
    <button>
      <Image
        src={isDark ? '/icons/bkIconShare.svg' : '/icons/whIconShare.svg'}
        alt="공유하기 버튼"
        width={22}
        height={22}
      />
    </button>
  );
}
