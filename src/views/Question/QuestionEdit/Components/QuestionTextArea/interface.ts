import { nanoid } from 'nanoid';
import i18n from '@/locales';

export interface QuestionTextAreaPropsType {
  _id?: string;
  label?: string;
  required?: boolean;
  placeholder?: string;
  maxLength?: number;
  showCount?: boolean;
  rows?: number;

  onChange?: (params: QuestionTextAreaPropsType) => void;
}

export const QuestionTextDefaultProps: QuestionTextAreaPropsType = {
  _id: nanoid(),
  label: i18n.t('question.componentType.textarea'),
  required: false,
  placeholder: i18n.t('question.placeholder.input'),
  maxLength: 120,
  showCount: true,
  rows: 4,
};
