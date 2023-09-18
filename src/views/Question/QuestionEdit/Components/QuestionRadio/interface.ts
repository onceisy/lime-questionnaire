import { OptionType } from '@/views/Config/OptionsConfig/OptionEdit';
import { nanoid } from 'nanoid';
import type { TFunction } from 'i18next';

export interface QuestionRadioPropsType {
  label?: string;
  required?: boolean;
  // 自定义的选项内容
  options?: OptionType[];
  // 是否使用字典
  isUseDic?: boolean;
  // 使用字典 字典的_id
  dicId?: string;
  // 默认中
  default?: string;
  // 每行选项个数
  rowCount?: 1 | 2 | 3;
  // 默认选中
  defaultValue?: string | string[];

  onChange?: (params: QuestionRadioPropsType) => void;
}

export const getQuestionRadioDefaultProps = (t: TFunction): QuestionRadioPropsType => {
  return {
    label: t('question.componentType.radio'),
    required: false,
    options: [
      { label: t('public.optionIndex', { i: 1 }), key: nanoid() },
      { label: t('public.optionIndex', { i: 2 }), key: nanoid() },
      { label: t('public.optionIndex', { i: 3 }), key: nanoid() },
    ],
    isUseDic: false,
    dicId: '',
    default: '',
    rowCount: 1,
    defaultValue: '',
  };
};
