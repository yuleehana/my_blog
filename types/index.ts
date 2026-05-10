export interface CommentType {
  _id: string;
  author: string;
  text: string;
  postSlug: string;
  createdAt: string;
  password?: string;
}

export interface GuestbookType {
  _id: string;
  author: string;
  text: string;
  createdAt: string;
  password?: string;
}

// Recent Log에서 사용할 공통 로그 타입
export interface RecentLogType {
  _id: string;
  type: 'comment' | 'guestbook';
  title: string;
  date: string;
  author: string;
  link: string;
}
