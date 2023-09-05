import { nanoid } from 'nanoid';
import { ComponentConfType } from '..';
import i18n from '@/locales';
import QuestionTextArea from './QuestionTextArea';
import { QuestionTextDefaultProps } from './interface';
import TextAreaPropsConfig from './TextAreaPropsConfig';

const QuestionTextAreaConf: ComponentConfType = {
  componentId: nanoid(),
  name: i18n.t('question.componentType.textarea'),
  type: 'QuestionTextArea',
  // 组件库渲染时前面的图标
  icon: 'radix-icons:text-align-justify',
  // 组件显示
  Component: QuestionTextArea,
  // 组件配置组件
  PropsConfComponent: TextAreaPropsConfig,
  defaultProps: QuestionTextDefaultProps,
};

export default QuestionTextAreaConf;
