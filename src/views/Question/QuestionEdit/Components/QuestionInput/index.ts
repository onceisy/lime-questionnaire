import { nanoid } from 'nanoid';
import QuestionInput from './QuestionInput';
import { QuestionInputDefaultProps } from './interface';
import i18n from '@/locales';
import InputPropsConfig from './InputPropsConfig';
import { ComponentConfType } from '..';

export * from './interface';

const QuestionInputConf: ComponentConfType = {
  // 仅作为渲染页面给dom绑定的key使用
  componentId: nanoid(),
  name: i18n.t('question.componentType.input'),
  type: 'QuestionInput',
  // 组件库渲染时前面的图标
  icon: 'radix-icons:font-roman',
  Component: QuestionInput,
  PropsConfComponent: InputPropsConfig,
  defaultProps: QuestionInputDefaultProps,
};

export default QuestionInputConf;
