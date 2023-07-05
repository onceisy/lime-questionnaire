import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import localeReducer from './localeSlice';
import themeReducer from './themeSlice';
import userSlice from './userSlice';

export const store = configureStore({
  reducer: {
    locale: localeReducer,
    theme: themeReducer,
    user: userSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
