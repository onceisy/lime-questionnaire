import i18n from '@/locales';

export default interface QuestionParagraphPropsType {
  text?: string;
  isCenter?: boolean;
  // 加粗
  isStrong?: boolean;
  // 斜体
  isItalic?: boolean;
  isCode?: boolean;
  fontSize?: number;
  textColor?: string;

  onChange?: (params: QuestionParagraphPropsType) => void;
}

export const QuestionParagraphDefaultProps: QuestionParagraphPropsType = {
  text: i18n.t('question.questionParagraph'),
  isCenter: false,
  isStrong: false,
  isItalic: false,
  isCode: false,
  fontSize: 14,
  textColor: 'rgba(0, 0, 0, 0.88)',
};
