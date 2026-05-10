'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function ScrollToTopBtn() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > window.innerHeight);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    // fixed bottom-10 right-10 z-50

    <div className="w-15 h-15 aspect-square">
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="w-15 h-15 flex items-center justify-center p-4 bg-bg-component rounded-full shadow-2xl transition-all"
          aria-label="최상단 이동">
          <Image
            src="/icons/whIconArrowU.svg"
            alt="위로가기"
            width={24}
            height={24}
            className="dark:hidden"
          />
          <Image
            src="/icons/bkIconArrowU.svg"
            alt="위로가기"
            width={24}
            height={24}
            className="hidden dark:block"
          />
        </button>
      )}
    </div>
  );
}
