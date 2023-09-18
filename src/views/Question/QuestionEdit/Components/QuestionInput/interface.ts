import type { TFunction } from 'i18next';

interface QuestionInputPropsType {
  label?: string;
  required?: boolean;
  placeholder?: string;

  onChange?: (params: QuestionInputPropsType) => void;
}

export default QuestionInputPropsType;

export const getQuestionInputDefaultProps = (t: TFunction): QuestionInputPropsType => {
  return {
    label: t('question.componentType.input'),
    required: false,
    placeholder: t('question.placeholder.input'),
  };
};
