import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './index';

export type ThemeType = 'light' | 'dark';
export interface ThemeState {
  theme: ThemeType;
}

let theme: ThemeType = 'light';
const localLanguage = localStorage.getItem('theme') || '';
if (['light', 'dark'].includes(localLanguage)) {
  theme = localLanguage as ThemeType;
  if (theme === 'light') {
    document.documentElement.classList.remove('dark');
  } else {
    document.documentElement.classList.add('dark');
  }
}

const initialState: ThemeState = {
  theme: theme,
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setTheme: (state: ThemeState, action: PayloadAction<ThemeType>) => {
      const { payload } = action;
      state.theme = payload;
      localStorage.setItem('theme', payload);
      if (payload === 'light') {
        document.documentElement.classList.remove('dark');
      } else {
        document.documentElement.classList.add('dark');
      }
    },
  },
});

export const { setTheme } = themeSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectTheme = (state: RootState) => state.theme.theme;

export default themeSlice.reducer;
