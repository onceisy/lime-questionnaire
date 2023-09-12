import { nanoid } from 'nanoid';
import { ComponentConfType } from '..';
import i18n from '@/locales';
import QuestionCheckbox from './QuestionCheckbox';
import { QuestionCheckboxDefaultProps } from './interface';
import QuestionCheckboxPropsConfig from './QuestionCheckboxPropsConfig';
import QuestionCheckboxReport from './QuestionCheckboxReport';

const QuestionCheckboxConf: ComponentConfType = {
  componentId: nanoid(),
  name: i18n.t('question.componentType.checkbox'),
  type: 'QuestionCheckbox',
  // 组件库渲染时前面的图标
  icon: 'radix-icons:checkbox',
  // 组件显示
  Component: QuestionCheckbox,
  // 组件配置组件
  PropsConfComponent: QuestionCheckboxPropsConfig,
  defaultProps: QuestionCheckboxDefaultProps,
  ReportComponent: QuestionCheckboxReport,
};

export default QuestionCheckboxConf;
