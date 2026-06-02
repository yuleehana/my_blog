import CategoryList from '@/components/layout/CategoryList';
import InnerLayout from '@/components/layout/InnerLayout';
import ProfileCard from '@/components/ProfileCard';
import RecentPost from '@/components/RecentPosts';
import ViewMoreBtn from '@/components/button/ViewMore';
import RecentLog from '@/components/RecentLog';
import VisitorChart from '@/components/VisitorChart';
import { getRecentVisitorData } from '@/lib/visitor';
import Link from 'next/link';

export default async function Home() {
  const visitorData = await getRecentVisitorData();

  return (
    <InnerLayout>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-16 py-10">
        <div className="md:col-span-3">
          {/* 이너 왼쪽 */}
          <aside className="sticky left-0 overflow-hidden rounded-main">
            <ProfileCard>
              <CategoryList />
            </ProfileCard>
          </aside>
        </div>

        <div className="md:col-span-9 space-y-8">
          {/* 이너 오른쪽 */}
          <section className="">
            <div className="grid grid-cols-2 gap-4 h-40">
              <Link href={'https://yuhana-portfolio.vercel.app/'}>
                <div className="bg-bg-component h-full text-title flex items-center justify-center p-10 rounded-main text-text-primary">
                  PORTFOLIO
                </div>
              </Link>
              <Link href={'https://github.com/yuleehana'}>
                <div className="bg-linear-to-b h-full from-[#CBC4D3] to-[#CED2E2] dark:bg-linear-to-b dark:from-[#4C5471] dark:to-[#6D627C] text-title flex items-center justify-center p-10 rounded-main">
                  GITHUB
                </div>
              </Link>
            </div>
          </section>

          <div className="grid grid-cols-2 md:grid-cols-8 gap-8">
            <div className="md:col-span-4">
              <div className="h-full w-full flex flex-col">
                <div className="flex justify-between items-center px-4">
                  <h2 className="text-20-bold">최근 게시물</h2>
                  <ViewMoreBtn />
                </div>
                <div>
                  <RecentPost />
                </div>
              </div>
            </div>

            <div className="md:col-span-4 space-y-8">
              <RecentLog />
              <VisitorChart chartData={visitorData} />
            </div>
          </div>
        </div>
      </div>
    </InnerLayout>
  );
}
