import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import localeReducer from './useLocale';
import themeReducer from './useTheme';

export const store = configureStore({
  reducer: {
    locale: localeReducer,
    theme: themeReducer,
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
