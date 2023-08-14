import { OptionType } from '@/views/Config/OptionsConfig/OptionEdit';
import { nanoid } from 'nanoid';
import i18n from '@/locales';

export interface QuestionCheckboxPropsType {
  _id?: string;
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

  onChange?: (params: QuestionCheckboxPropsType) => void;
}

export const QuestionCheckboxDefaultProps: QuestionCheckboxPropsType = {
  _id: nanoid(),
  label: i18n.t('question.componentType.checkbox'),
  required: false,
  options: [
    { label: i18n.t('public.optionIndex', { i: 1 }), key: nanoid() },
    { label: i18n.t('public.optionIndex', { i: 2 }), key: nanoid() },
    { label: i18n.t('public.optionIndex', { i: 3 }), key: nanoid() },
  ],
  isUseDic: false,
  dicId: '',
  default: '',
  rowCount: 1,
  defaultValue: [],
};
