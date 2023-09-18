import { nanoid } from 'nanoid';
import QuestionTitle from './QuestionTitle';
import { getQuestionTitleDefaultProps } from './interface';
import TitlePropsConfig from './TitlePropsConfig';
import { ComponentConfType } from '..';

export * from './interface';

const QuestionTitleConf: ComponentConfType = {
  // 仅作为渲染页面给dom绑定的key使用
  componentId: nanoid(),
  name: 'public.title',
  type: 'QuestionTitle',
  // 组件库渲染时前面的图标
  icon: 'radix-icons:heading',
  // 组件显示
  Component: QuestionTitle,
  // 组件配置组件
  PropsConfComponent: TitlePropsConfig,
  defaultProps: getQuestionTitleDefaultProps,
};

export default QuestionTitleConf;
