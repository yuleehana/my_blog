import SortFilter from '@/components/common/SortFilter';
import CategoryList from '@/components/layout/CategoryList';
import PostCard from '@/components/PostCard';
import ProfileCard from '@/components/ProfileCard';
import { getCategoryStats, getAllPosts } from '@/lib/posts';
import Image from 'next/image';
import Link from 'next/link';
// TODO 게시물 리스트 뿌리기

export default async function BlogListPage({
  searchParams,
}: {
  searchParams: Promise<{ sort?: string }>;
}) {
  const { sort } = await searchParams;

  const posts = await getAllPosts(sort || 'latest');
  const categories = await getCategoryStats();

  return (
    <div className="max-w-420 mx-auto p-10 grid grid-cols-12 gap-8">
      {/* 왼쪽 사이드바 */}
      <div className="col-span-3">
        <ProfileCard>
          <CategoryList />
        </ProfileCard>
      </div>

      {/* 중앙 메인 리스트 */}
      <div className="col-span-9 space-y-8 p-10">
        <div className="relative flex justify-between items-center border-b pb-6">
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
            <h1 className="text-content-title">전체 글 보기 ({posts.length})</h1>
          </div>

          <div className="absolute right-0 top-0">
            <SortFilter />
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => {
            const catPath = `/blog/category/${encodeURIComponent(cat.name)}`;

            return (
              <Link
                href={catPath}
                key={cat.name}
                className="bg-bg-component px-4 py-1 rounded-full border border-text-primary/30 text-20 text-text-2
                hover:border-text-primary/50 hover:text-20-bold">
                # {cat.name}
              </Link>
            );
          })}
        </div>

        <div>
          <ul className="grid grid-cols-4 gap-6">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
