import Navigation from '@/components/common/Navigation';
import { getComments, getPostBySlug } from '@/lib/posts';
// import InteractionSideBar from '@/components/common/InteractionSideBar';
import { extractToc } from '@/lib/utils';
import TableOfContents from '@/components/TableOfContents';
import PostContent from '@/components/PostContent';
import CommentSection from '@/components/CommentSection';
import CommentItem from '@/components/CommentList';
import LikedBtn from '@/components/button/LikedBtn';
import { CommentType } from '@/types';

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  const comments = await getComments(slug);

  if (!post) return <div className="py-20 text-center">포스트를 찾을 수 없습니다.</div>;

  const toc = extractToc(post.content);

  return (
    <div className="max-w-420 pb-22 m-auto relative">
      {/* 왼쪽 사이드바 */}
      {/* <aside className="max-w-16 absolute left-20 top-30">
        <InteractionSideBar />
      </aside> */}

      <div className="max-w-285 m-auto flex">
        <main className="w-full flex flex-col gap-16">
          <nav>
            <Navigation post={post} />
          </nav>

          <div className="flex flex-col gap-28">
            <div className="flex flex-col gap-4">
              <div className="flex text-content-title items-center gap-2.5">
                <span className="text-text-point">{post.category}</span>
                <span>-</span>
                <h1>{post.title}</h1>
              </div>
              <div className="flex items-center gap-5 text-24 mb-10">
                <span>{post.author}</span>
                <span>/</span>
                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="w-full bg-bg-component p-8 text-24">
                {post.intro || '이 포스트의 인트로 내용이 들어가는 자리입니다.'}
              </div>
            </div>
            <PostContent content={post.content} />
          </div>

          <div className="w-full flex justify-center items-center mb-14">
            <LikedBtn slug={slug} />
          </div>

          <div className="flex flex-col gap-16">
            <CommentSection slug={slug} />

            <div className="flex flex-col gap-4">
              <div className="flex items-center">
                <p className="text-content-title text-text-primary mr-4">댓글</p>
                <span className="text-20 text-text-2">{comments.length}</span>
                <span className="text-20 text-text-2">개</span>
              </div>
              {comments.length === 0 ? (
                <div className="py-20 text-center">
                  <p className="text-20 text-text-2">
                    아직 댓글이 없습니다. 첫 댓글을 남겨보세요! 💬
                  </p>
                </div>
              ) : (
                comments.map((comment) => (
                  <CommentItem
                    key={comment._id.toString()}
                    comment={comment as CommentType}
                    slug={slug}
                  />
                ))
              )}
            </div>
          </div>
        </main>
      </div>

      {/* 오른쪽 목차 */}
      <TableOfContents toc={toc} />
    </div>
  );
}
