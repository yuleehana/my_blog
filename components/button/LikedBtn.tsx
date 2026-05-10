'use client';

import { toggleLike } from '@/app/actions';
import { useThemeStore } from '@/store/useThemeStore';
import Image from 'next/image';
import { useState } from 'react';

export interface LikedBtnProps {
  slug: string;
}

export default function LikedBtn({ slug }: LikedBtnProps) {
  const { isDark } = useThemeStore();

  const [hasLiked, setHasLiked] = useState(() => {
    if (typeof window !== 'undefined') {
      const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '[]');
      return likedPosts.includes(slug);
    }
    return false;
  });

  const handleLike = async () => {
    const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '[]');

    if (hasLiked) {
      const newLikedPosts = likedPosts.filter((s: string) => s !== slug);
      localStorage.setItem('likedPosts', JSON.stringify(newLikedPosts));
      setHasLiked(false);
    } else {
      likedPosts.push(slug);
      localStorage.setItem('likedPosts', JSON.stringify(likedPosts));
      setHasLiked(true);
      await toggleLike(slug);
    }
  };

  return (
    <button
      onClick={handleLike}
      className={`flex items-center gap-5 px-16 py-7 rounded-full transition-all duration-300
        ${hasLiked ? 'bg-bg-component text-text-primary' : 'bg-point/30 hover:bg-point/60 text-text-2'}`}>
      <span className={`text-sub-title`}>Liked</span>
      <Image
        src={
          hasLiked
            ? '/icons/iconHeartFill.svg'
            : isDark
              ? '/icons/bkIconHeart.svg'
              : '/icons/whIconHeart.svg'
        }
        alt="좋아요 버튼"
        width={36}
        height={36}
        className={`object-contain transition-transform duration-300 ${hasLiked ? 'scale-110' : 'scale-100'}`}
      />
    </button>
  );
}
