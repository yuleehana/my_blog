import { createPost } from '../actions';

export default function WritePage() {
  return (
    <form action={createPost}>
      <input name="title" placeholder="제목을 입력하세요" className="border p-2" required />
      <textarea
        name="content"
        placeholder="내용을 입력하세요"
        className="border p-2 h-40"
        required
      />
      <button type="submit" className="bg-blue-500 text-white p-2">
        글 올리기
      </button>
    </form>
  );
}
