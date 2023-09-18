import type { TFunction } from 'i18next';

export interface QuestionTextAreaPropsType {
  label?: string;
  required?: boolean;
  placeholder?: string;
  maxLength?: number;
  showCount?: boolean;
  rows?: number;

  onChange?: (params: QuestionTextAreaPropsType) => void;
}

export const getQuestionTextDefaultProps = (t: TFunction): QuestionTextAreaPropsType => {
  return {
    label: t('question.componentType.textarea'),
    required: false,
    placeholder: t('question.placeholder.input'),
    maxLength: 120,
    showCount: true,
    rows: 4,
  };
};
