import type { TFunction } from 'i18next';

interface QuestionInputPropsType {
  /**
   * 表单label
   */
  label?: string;
  /**
   * 是否必填
   */
  required?: boolean;
  /**
   * 输入提示
   */
  placeholder?: string;
  /**
   * 事件
   */
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
