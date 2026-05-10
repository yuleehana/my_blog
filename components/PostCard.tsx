import Link from 'next/link';

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
  return (
    <li className="max-w-62.5 max-h-75 aspect-5/6 bg-bg-component rounded-main overflow-hidden shadow-default hover:shadow-hover transition-all">
      <Link href={`/blog/${post.slug}`} className="flex flex-col h-full">
        <div className="bg-text-point w-full block min-h-40"></div>
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
