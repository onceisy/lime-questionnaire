import { nanoid } from 'nanoid';
import QuestionParagraph from './QuestionParagraph';
import ParagraphPropsConfig from './ParagraphPropsConfig';
import { getQuestionParagraphDefaultProps } from './interface';
import { ComponentConfType } from '..';

const QuestionParagraphConf: ComponentConfType = {
  componentId: nanoid(),
  name: 'question.componentGroup.paragraph',
  type: 'QuestionParagraph',
  // 组件库渲染时前面的图标
  icon: 'radix-icons:file-text',
  // 组件显示
  Component: QuestionParagraph,
  // 组件配置组件
  PropsConfComponent: ParagraphPropsConfig,
  defaultProps: getQuestionParagraphDefaultProps,
};

export default QuestionParagraphConf;
