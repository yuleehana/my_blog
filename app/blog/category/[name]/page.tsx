import SortFilter from '@/components/common/SortFilter';
import CategoryList from '@/components/layout/CategoryList';
import PostCard from '@/components/PostCard';
import ProfileCard from '@/components/ProfileCard';
import { getPostByCategory } from '@/lib/posts';
import Image from 'next/image';
import Link from 'next/link';

export default async function CategoryPage({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  const decodeName = decodeURIComponent(name);
  const posts = await getPostByCategory(decodeName);

  return (
    <div className="max-w-420 mx-auto p-10 grid grid-cols-12 gap-8">
      <aside className="md:col-span-3">
        <ProfileCard>
          <CategoryList />
        </ProfileCard>
      </aside>

      <div className="col-span-9 space-y-8 p-10">
        <div className="flex justify-between items-center border-b pb-6">
          <div className="flex items-center gap-3">
            <Image
              src="/icons/whIconTag.svg"
              alt="태그"
              width={30}
              height={30}
              className="dark:hidden"
            />
            <Image
              src="/icons/bkIconTag.svg"
              alt="태그"
              width={30}
              height={30}
              className="hidden dark:block"
            />
            <div className="flex gap-2 items-center">
              <Link href={`/blog`} className="text-content-title">
                전체 글 보기
              </Link>
              <span className="block items-center">
                <Image
                  src="/icons/whIconArrowR.svg"
                  alt="화살표"
                  width={32}
                  height={32}
                  className="dark:hidden"
                />
                <Image
                  src="/icons/bkIconArrowR.svg"
                  alt="화살표"
                  width={32}
                  height={32}
                  className="hidden dark:block"
                />
              </span>
              <p className="text-text-point text-24-bold">{decodeURIComponent(name)}</p>
            </div>
          </div>
          <div>
            <SortFilter />
          </div>
        </div>

        <div className="grid gird-cols-3 gap-6">
          {posts.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-content-sub text-text-primary">
                📭 해당 카테고리에는 아직 글이 없습니다.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-6">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
