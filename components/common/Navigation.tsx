import Image from 'next/image';
import Link from 'next/link';

interface NavigationProps {
  post: {
    category?: string;
  };
}

export default function Navigation({ post }: NavigationProps) {
  return (
    <div className="flex gap-2 items-center text-body">
      <Link href={`/blog`}>전체 글 보기</Link>
      <span className="block items-center">
        <Image src={`/icons/iconArrowR.svg`} alt="오른쪽 화살표" width={20} height={20} />
      </span>
      <p className="text-text-point">{post?.category || '카테고리 없음'}</p>
    </div>
  );
}
