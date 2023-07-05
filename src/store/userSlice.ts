import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '.';
import DEFAULT_AVATAR from '@/assets/images/default-avatar.jpg';
import router from '@/router';
import { ROUTE_HOME } from '@/router/path';

export interface UserType {
  username: string;
  nickname: string;
  avatar: string;
  _id: string;
}

const initialState: UserType = {
  username: '',
  nickname: '',
  avatar: DEFAULT_AVATAR,
  _id: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state: UserType, action: PayloadAction<UserType>) {
      return action.payload;
    },
    clearUser() {
      router.navigate(ROUTE_HOME);
      return initialState;
    },
  },
});

// 用户是否登录
export const isUserLogin = (state: RootState) => (state.user._id ? true : false);
export const selectUserInfo = (state: RootState) => state.user;

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
