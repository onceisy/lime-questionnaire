import type { TFunction } from 'i18next';

interface QuestionTitlePropsType {
  /**
   * 标题文本
   */
  text?: string;
  /**
   * 标题大小
   */
  level?: 1 | 2 | 3 | 4 | 5;
  /**
   * 标题是否居中
   */
  isCenter?: boolean;
  /**
   * 描述文本
   */
  description?: string;
  /**
   * 事件
   */
  onChange?: (params: QuestionTitlePropsType) => void;
}
export default QuestionTitlePropsType;

export const getQuestionTitleDefaultProps = (t: TFunction): QuestionTitlePropsType => {
  return {
    text: t('manage.questionTitle'),
    level: 3,
    isCenter: false,
    description: t('question.defaultDescription'),
  };
};
