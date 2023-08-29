import { t } from 'i18next';
import { nanoid } from 'nanoid';

interface QuestionInputPropsType {
  _id?: string;
  label?: string;
  required?: boolean;
  placeholder?: string;

  onChange?: (params: QuestionInputPropsType) => void;
}

export default QuestionInputPropsType;

export const QuestionInputDefaultProps: QuestionInputPropsType = {
  _id: nanoid(),
  label: t('question.componentType.input'),
  required: false,
  placeholder: t('question.placeholder.input'),
};
