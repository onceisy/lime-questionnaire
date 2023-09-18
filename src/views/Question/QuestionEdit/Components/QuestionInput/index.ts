import { nanoid } from 'nanoid';
import QuestionInput from './QuestionInput';
import { getQuestionInputDefaultProps } from './interface';
import InputPropsConfig from './InputPropsConfig';
import { ComponentConfType } from '..';
import QuestionInputReport from './QuestionInputReport';

export * from './interface';

const QuestionInputConf: ComponentConfType = {
  // 仅作为渲染页面给dom绑定的key使用
  componentId: nanoid(),
  name: 'question.componentType.input',
  type: 'QuestionInput',
  // 组件库渲染时前面的图标
  icon: 'radix-icons:font-roman',
  Component: QuestionInput,
  PropsConfComponent: InputPropsConfig,
  defaultProps: getQuestionInputDefaultProps,
  ReportComponent: QuestionInputReport,
};

export default QuestionInputConf;
