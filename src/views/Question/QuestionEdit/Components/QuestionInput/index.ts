import { nanoid } from 'nanoid';
import QuestionInput from './QuestionInput';
import { QuestionInputDefaultProps } from './interface';
import i18n from '@/locales';
import InputPropsConfig from './InputPropsConfig';

export * from './interface';

export default {
  // 仅作为渲染页面给dom绑定的key使用
  _id: nanoid(),
  name: i18n.t('question.componentGroup.input'),
  type: 'QuestionInput',
  icon: 'radix-icons:font-roman',
  Component: QuestionInput,
  PropsConfComponent: InputPropsConfig,
  defaultProps: QuestionInputDefaultProps,
};
