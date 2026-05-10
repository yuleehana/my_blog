import { getCategoryStats } from '@/lib/posts';
import CategoryNav from './CategoryNav';

export default async function CategoryList() {
  const categories = await getCategoryStats();
  const totalPosts = categories.reduce((acc, cur) => acc + cur.count, 0);

  return <CategoryNav categories={categories} totalPosts={totalPosts} />;
}
