import { nanoid } from 'nanoid';
import QuestionTitle from './QuestionTitle';
import { QuestionTitleDefaultProps } from './interface';
import i18n from '@/locales';
import TitlePropsConfig from './TitlePropsConfig';

export * from './interface';

export default {
  // 仅作为渲染页面给dom绑定的key使用
  _id: nanoid(),
  name: i18n.t('public.title'),
  type: 'QuestionTitle',
  // 组件库渲染时前面的图标
  icon: 'radix-icons:heading',
  // 组件显示
  Component: QuestionTitle,
  // 组件配置组件
  PropsConfComponent: TitlePropsConfig,
  defaultProps: QuestionTitleDefaultProps,
};
