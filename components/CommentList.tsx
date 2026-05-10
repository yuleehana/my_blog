'use client';

import { deleteComment } from '@/app/actions';
import { CommentType } from '@/types';

export interface CommentItemProps {
  comment: CommentType;
  slug: string;
}

export default function CommentItem({ comment, slug }: CommentItemProps) {
  const handleDelete = async () => {
    const pwd = prompt('패스워드를 입력해주세요');
    if (!pwd) return;

    const result = await deleteComment(comment._id, pwd, slug);

    if (result.success) {
      alert('댓글이 삭제되었습니다.');
    } else {
      alert(result.message);
    }
  };

  return (
    <div className="bg-bg-component rounded-lg px-10 py-8 flex">
      <div className="flex flex-col justify-between gap-10 w-full">
        <div className="flex justify-between w-full">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-text-point rounded-full" />
            <div className="flex flex-col gap-1">
              <p className="text-20 text-text-primary">{comment.author}</p>
              <p className="text-body text-text-2">
                {new Date(comment.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* 비밀번호가 있을 때만 수정/삭제 노출 */}
          {comment.password && (
            <div className="flex gap-5 text-body text-text-2">
              {/* <button className="hover:text-text-primary">수정</button> */}
              <button onClick={handleDelete} className="hover:text-[#BE4164]">
                삭제
              </button>
            </div>
          )}
        </div>

        <p className="text-body text-text-secondary leading-relaxed">{comment.text}</p>
      </div>
    </div>
  );
}
