import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import enUS from './enUS';
import zhCN from './zhCN';
import { LocaleType } from '@/store/localeSlice';

export const resources = {
  enUS: {
    translation: enUS,
  },
  zhCN: {
    translation: zhCN,
  },
};

let language: LocaleType = 'enUS';
const localLanguage = localStorage.getItem('language') || '';
if (['enUS', 'zhCN'].includes(localLanguage)) {
  language = localLanguage as LocaleType;
}

i18next.use(initReactI18next).init({
  //默认语言，选择内容为上述配置中的key，即enUS/zhCN
  lng: language,
  debug: true,
  resources,
});

export default i18next;
