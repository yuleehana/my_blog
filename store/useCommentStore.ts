import { create } from 'zustand';

interface CommentUser {
  nickname: string;
  password: string;
}

interface CommentUserState {
  userInfo: CommentUser;
  setUserInfo: (newInfo: CommentUser) => void;
  resetUserInfo: () => void;
}

export const useCommentStore = create<CommentUserState>((set) => ({
  userInfo: { nickname: '', password: '' },
  setUserInfo: (newInfo) => set({ userInfo: newInfo }),
  resetUserInfo: () => set({ userInfo: { nickname: '', password: '' } }),
}));
