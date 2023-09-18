import { nanoid } from 'nanoid';
import { ComponentConfType } from '..';
import QuestionRadio from './QuestionRadio';
import { getQuestionRadioDefaultProps } from './interface';
import QuestionRadioPropsConfig from './QuestionRadioPropsConfig';
import QuestionRadioReport from './QuestionRadioReport';

const QuestionRadioConf: ComponentConfType = {
  componentId: nanoid(),
  name: 'question.componentType.radio',
  type: 'QuestionRadio',
  // 组件库渲染时前面的图标
  icon: 'radix-icons:radiobutton',
  // 组件显示
  Component: QuestionRadio,
  // 组件配置组件
  PropsConfComponent: QuestionRadioPropsConfig,
  defaultProps: getQuestionRadioDefaultProps,
  ReportComponent: QuestionRadioReport,
};

export default QuestionRadioConf;
