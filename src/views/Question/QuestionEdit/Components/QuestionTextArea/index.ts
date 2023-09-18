import { nanoid } from 'nanoid';
import { ComponentConfType } from '..';
import QuestionTextArea from './QuestionTextArea';
import { getQuestionTextDefaultProps } from './interface';
import TextAreaPropsConfig from './TextAreaPropsConfig';
import QuestionTextAreaReport from './QuestionTextAreaReport';

const QuestionTextAreaConf: ComponentConfType = {
  componentId: nanoid(),
  name: 'question.componentType.textarea',
  type: 'QuestionTextArea',
  // 组件库渲染时前面的图标
  icon: 'radix-icons:text-align-justify',
  // 组件显示
  Component: QuestionTextArea,
  // 组件配置组件
  PropsConfComponent: TextAreaPropsConfig,
  defaultProps: getQuestionTextDefaultProps,
  ReportComponent: QuestionTextAreaReport,
};

export default QuestionTextAreaConf;
