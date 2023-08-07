import { FC } from 'react';
import QuestionInputPropsType from './QuestionInput/interface';
import QuestionTitlePropsType from './QuestionTitle/interface';
import QuestionParagraphPropsType from './QuestionParagraph/interface';
import QuestionTitleConf from './QuestionTitle';
import QuestionInputConf from './QuestionInput';
import QuestionParagraphConf from './QuestionParagraph';
import { nanoid } from 'nanoid';
import i18n from '@/locales';

export type ComponentPropsType = QuestionTitlePropsType &
  QuestionInputPropsType &
  QuestionParagraphPropsType;

// 统一组件的配置 type
export type ComponentConfType = {
  name: string;
  type: string;
  icon?: string;
  Component: FC<ComponentPropsType>;
  PropsConfComponent: FC<ComponentPropsType>;
  defaultProps: ComponentPropsType;
};

// 全部的组件配置的列表
const componentConfList: ComponentConfType[] = [
  QuestionTitleConf,
  QuestionInputConf,
  QuestionParagraphConf,
];

// 分组后的组件列表
export const componentConfGroupList = [
  {
    _id: nanoid(),
    label: i18n.t('public.title'),
    type: 'title',
    components: [QuestionTitleConf, QuestionParagraphConf],
  },
  {
    _id: nanoid(),
    label: i18n.t('question.componentGroup.input'),
    type: 'input',
    components: [QuestionInputConf],
  },
];

export function getComponentConfByType(type: string) {
  return componentConfList.find(c => c.type === type);
}
