import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './index';
import type { Locale } from 'antd/es/locale';
import antdEnUS from 'antd/locale/en_US';
import antdZhCN from 'antd/locale/zh_CN';
import i18next from 'i18next';

export type LocaleType = 'enUS' | 'zhCN';
export interface LocaleState {
  language: LocaleType;
  locale: Locale;
}

const locales = {
  enUS: {
    ...antdEnUS,
  },
  zhCN: {
    ...antdZhCN,
  },
};

let language: LocaleType = 'enUS';
const localLanguage = localStorage.getItem('language') || '';
if (['enUS', 'zhCN'].includes(localLanguage)) {
  language = localLanguage as LocaleType;
}

const initialState: LocaleState = {
  language: language,
  locale: locales[language],
};

export const localeSlice = createSlice({
  name: 'locale',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setLocale: (state, action: PayloadAction<LocaleType>) => {
      state.language = action.payload;
      state.locale = locales[action.payload];
      i18next.changeLanguage(action.payload);
      localStorage.setItem('language', action.payload);
    },
  },
});

export const { setLocale } = localeSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectLocale = (state: RootState) => state.locale.locale;
export const selectLanguage = (state: RootState) => state.locale.language;

export default localeSlice.reducer;
