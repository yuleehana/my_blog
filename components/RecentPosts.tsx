import { getRecentPosts } from '@/lib/posts';
import PostCard from './PostCard';

export default async function RecentPost() {
  const posts = await getRecentPosts(4);

  if (posts.length === 0) {
    return <span>아직 작성된 게시물이 없습니다</span>;
  }

  return (
    <ul className="grid grid-cols-2 gap-x-11 gap-y-10 p-4">
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </ul>
  );
}
