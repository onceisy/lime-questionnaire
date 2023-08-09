import { nanoid } from 'nanoid';
import i18n from '@/locales';
import QuestionParagraph from './QuestionParagraph';
import ParagraphPropsConfig from './ParagraphPropsConfig';
import { QuestionParagraphDefaultProps } from './interface';
import { ComponentConfType } from '..';

const QuestionParagraphConf: ComponentConfType = {
  _id: nanoid(),
  name: i18n.t('question.componentGroup.paragraph'),
  type: 'QuestionParagraph',
  // 组件库渲染时前面的图标
  icon: 'radix-icons:file-text',
  // 组件显示
  Component: QuestionParagraph,
  // 组件配置组件
  PropsConfComponent: ParagraphPropsConfig,
  defaultProps: QuestionParagraphDefaultProps,
};

export default QuestionParagraphConf;
