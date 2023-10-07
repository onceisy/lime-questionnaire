import type { TFunction } from 'i18next';

export default interface QuestionParagraphPropsType {
  /**
   * 段落描述的文本
   */
  text?: string;
  /**
   * 居中显示
   */
  isCenter?: boolean;
  /**
   * 文本加粗
   */
  isStrong?: boolean;
  /**
   * 显示斜体
   */
  isItalic?: boolean;
  /**
   * 显示为代码
   */
  isCode?: boolean;
  /**
   * 字体大小
   */
  fontSize?: number;
  /**
   * 字体颜色
   */
  textColor?: string;
  /**
   * 事件
   */
  onChange?: (params: QuestionParagraphPropsType) => void;
}

export const getQuestionParagraphDefaultProps = (t: TFunction): QuestionParagraphPropsType => {
  return {
    text: t('question.questionParagraph'),
    isCenter: false,
    isStrong: false,
    isItalic: false,
    isCode: false,
    fontSize: 14,
    textColor: 'rgba(0, 0, 0, 0.88)',
  };
};
