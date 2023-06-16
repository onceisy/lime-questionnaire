import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './index';

export type themeType = 'light' | 'dark';
export interface themeState {
  theme: themeType;
}

let theme: themeType = 'light';
const localLanguage = localStorage.getItem('theme') || '';
if (['light', 'dark'].includes(localLanguage)) {
  theme = localLanguage as themeType;
}

const initialState: themeState = {
  theme: theme,
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setTheme: (state, action: PayloadAction<themeType>) => {
      state.theme = action.payload;
      localStorage.setItem('theme', action.payload);
    },
  },
});

export const { setTheme } = themeSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectTheme = (state: RootState) => state.theme.theme;

export default themeSlice.reducer;
