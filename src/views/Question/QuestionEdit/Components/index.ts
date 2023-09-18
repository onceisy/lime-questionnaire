import { FC } from 'react';
import QuestionInputPropsType from './QuestionInput/interface';
import QuestionTitlePropsType from './QuestionTitle/interface';
import QuestionParagraphPropsType from './QuestionParagraph/interface';
import QuestionTitleConf from './QuestionTitle';
import QuestionInputConf from './QuestionInput';
import QuestionParagraphConf from './QuestionParagraph';
import { nanoid } from 'nanoid';
import QuestionTextAreaConf from './QuestionTextArea';
import { QuestionRadioPropsType } from './QuestionRadio/interface';
import QuestionRadioConf from './QuestionRadio';
import { QuestionCheckboxPropsType } from './QuestionCheckbox/interface';
import QuestionCheckboxConf from './QuestionCheckbox';
import { ReportDataType } from '../../QuestionStatistic/Components/QuestionReport';
import type { TFunction } from 'i18next';

export type ComponentPropsType = QuestionTitlePropsType &
  QuestionInputPropsType &
  QuestionParagraphPropsType &
  QuestionRadioPropsType &
  QuestionCheckboxPropsType;

// 统一组件的配置 type
export type ComponentConfType = {
  componentId?: string;
  name: string;
  type: string;
  icon: string;
  Component: FC<ComponentPropsType>;
  PropsConfComponent: FC<ComponentPropsType>;
  defaultProps: (t: TFunction) => ComponentPropsType;
  ReportComponent?: FC<ReportDataType>;
};

// 全部的组件配置的列表
const componentConfList: ComponentConfType[] = [
  QuestionTitleConf,
  QuestionInputConf,
  QuestionParagraphConf,
  QuestionTextAreaConf,
  QuestionRadioConf,
  QuestionCheckboxConf,
];

// 分组后的组件列表 label字段填i18n的key值，直接使用i18n.t无法实时翻译
export const componentConfGroupList = [
  {
    _id: nanoid(),
    label: 'public.title',
    type: 'title',
    components: [QuestionTitleConf, QuestionParagraphConf],
  },
  {
    _id: nanoid(),
    label: 'question.componentGroup.input',
    type: 'input',
    components: [QuestionInputConf, QuestionTextAreaConf],
  },
  {
    _id: nanoid(),
    label: 'public.select',
    components: [QuestionRadioConf, QuestionCheckboxConf],
  },
];

/**
 * @description: 根据组件类型获取组件配置
 * @param {string} type
 * @return {*}
 */
export function getComponentConfByType(type: string) {
  return componentConfList.find(c => c.type === type);
}
