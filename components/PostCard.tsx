import Image from 'next/image';
import Link from 'next/link';

const CATEGORY_IMAGE_MAP: Record<string, string> = {
  'html,css': 'html.svg',
  react: 'react.svg',
  github: 'git.png',
  javascript: 'javascript.svg',
  typescript: 'typescript.svg',
  figma: 'figma.svg',
  'next.js': 'next.svg',
  'node.js': 'node.svg',
  mongodb: 'mongodb.svg',
};

interface PostCardProps {
  post: {
    _id: string;
    title: string;
    category?: string;
    slug: string;
    createdAt: string;
    content: string;
    author: string;
  };
}

export default function PostCard({ post }: PostCardProps) {
  const currentCategory = post.category || 'default';
  const cleanCategory = currentCategory.toLowerCase().replace(/\s+/g, '');

  const defaultThumbImg = '/whiteProfileBg.png';

  const imageFileName = CATEGORY_IMAGE_MAP[cleanCategory] || CATEGORY_IMAGE_MAP[currentCategory];

  const thumbnailImg = imageFileName ? `/thumbnails/${imageFileName}` : defaultThumbImg;

  return (
    <li className="max-w-62.5 max-h-75 aspect-5/6 bg-bg-component rounded-main border border-text-3/30 overflow-hidden shadow-default hover:shadow-hover transition-all">
      <Link href={`/blog/${post.slug}`} className="flex flex-col h-full">
        {/* 썸네일 이미지 영역 */}
        <div className="w-full bg-bg-component shadow-[inset_8px_8px_60px_26px_rgba(203,196,211,0.6)] dark:shadow-[inset_8px_8px_60px_26px_rgba(20,22,28,0.6)] block min-h-40 relative">
          <Image
            src={thumbnailImg}
            alt={`${post.category} 카테고리 썸네일`}
            fill
            className="absolute w-1/2 scale-75"></Image>
        </div>

        <div className="flex flex-col h-full justify-between p-3">
          <div className="flex flex-col">
            <span className="text-12 text-text-point mb-1 block">{post.category}</span>
            <h2 className="text-body-bold line-clamp-2">{post.title}</h2>
          </div>
          <div className="flex justify-between">
            <p className="text-body text-text-2">{post.author}</p>
            <div className="text-body text-text-3">
              {new Date(post.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
}
