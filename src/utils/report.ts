import { ComponentInfoType } from '@/store/questionInfoSlice';
import { OptionType } from '@/views/Config/OptionsConfig/OptionEdit';
import i18next from 'i18next';
import { isArray } from 'lodash';

interface ReportBasicDataType {
  // 组件id
  componentId: string;
  value: string | Array<string>;
  text: string;
}

export async function formatReportDataSource(
  data: ReportBasicDataType[],
  componentList: ComponentInfoType[],
  getDicOptionsById: (id: string) => Promise<OptionType[]>
) {
  const obj: {
    [key: string]: string;
  } = {};
  for (const item of data) {
    const { componentId, value, text } = item;
    const componentInfo = componentList.find(c => c.componentId === componentId);
    if (!componentInfo) {
      debugger;
      return {};
    }
    const { type, props } = componentInfo;
    switch (type) {
      case 'QuestionCheckbox':
        if (props) {
          const { isUseDic, options, dicId = '' } = props;
          const ops = isUseDic ? await getDicOptionsById(dicId) : options;
          let str = '';
          if (isArray(value)) {
            value.forEach(v => {
              const option = ops?.find((i: OptionType) => i.key === v);
              if (option) {
                str += option.label;
              }
            });
          }
          obj[componentId] = str === text ? text : `${text}(${i18next.t('public.deleted')})`;
        }
        break;
      case 'QuestionRadio':
        break;
      default:
        obj[componentId] = text;
        break;
    }
  }
  return obj;
}
