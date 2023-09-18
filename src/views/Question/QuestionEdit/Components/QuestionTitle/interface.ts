import type { TFunction } from 'i18next';

interface QuestionTitlePropsType {
  text?: string;
  level?: 1 | 2 | 3 | 4 | 5;
  isCenter?: boolean;
  description?: string;

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
