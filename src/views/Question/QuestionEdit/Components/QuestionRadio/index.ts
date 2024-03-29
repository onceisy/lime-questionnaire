import { nanoid } from 'nanoid';
import { ComponentConfType } from '..';
import i18n from '@/locales';
import QuestionRadio from './QuestionRadio';
import { QuestionRadioDefaultProps } from './interface';
import QuestionRadioPropsConfig from './QuestionRadioPropsConfig';

const QuestionRadioConf: ComponentConfType = {
  _id: nanoid(),
  name: i18n.t('question.componentType.radio'),
  type: 'QuestionRadio',
  // 组件库渲染时前面的图标
  icon: 'radix-icons:radiobutton',
  // 组件显示
  Component: QuestionRadio,
  // 组件配置组件
  PropsConfComponent: QuestionRadioPropsConfig,
  defaultProps: QuestionRadioDefaultProps,
};

export default QuestionRadioConf;
