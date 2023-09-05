import i18n from '@/locales';

interface QuestionTitlePropsType {
  text?: string;
  level?: 1 | 2 | 3 | 4 | 5;
  isCenter?: boolean;
  description?: string;

  onChange?: (params: QuestionTitlePropsType) => void;
}
export default QuestionTitlePropsType;

export const QuestionTitleDefaultProps: QuestionTitlePropsType = {
  text: i18n.t('manage.questionTitle'),
  level: 3,
  isCenter: false,
  description: i18n.t('question.defaultDescription'),
};
