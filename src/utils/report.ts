import { store } from '@/store';
import { ComponentInfoType } from '@/store/questionInfoSlice';
import i18next from 'i18next';

interface ReportBasicDataType {
  // 组件id
  componentId: string;
  value: string | Array<string>;
  label: string;
}

/**
 * @description: 格式化报表数据，主要是把多选、单选的key转化为label显示
 * @return {*}
 */
export async function formatReportDataSource(
  data: ReportBasicDataType[],
  componentList: ComponentInfoType[]
) {
  const obj: {
    [key: string]: string;
  } = {};
  // 储存在store中的字典
  const { options: storeOptions = [] } = store.getState();

  for (const item of data) {
    const { componentId = '', value = '', label = '' } = item;
    const componentInfo = componentList.find(c => c.componentId === componentId);
    const { props } = componentInfo || {};
    const { isUseDic, dicId, options } = props || {};

    let componentOptions = options;
    if (isUseDic) {
      componentOptions = storeOptions.find(o => o._id === dicId)?.options;
    }
    if (componentOptions) {
      if (Array.isArray(value)) {
        // 多选
        const textArr: string[] = [];
        value.map(v => {
          const text = componentOptions?.find(o => o.key === v)?.label;
          text && textArr.push(text);
          if (Array.isArray(label)) {
            const newLabel = label.map(l => {
              if (!textArr.includes(l)) {
                return `${l}(${i18next.t('public.deleted')})`;
              }
              return l;
            });
            obj[componentId] = newLabel.join('，');
          }
        });
      } else {
        // 单选
        const text = componentOptions?.find(o => o.key === value)?.label;
        obj[componentId] = text === label ? label : `${label}(${i18next.t('public.deleted')})`;
      }
    } else {
      obj[componentId] = value as string;
    }
  }
  return obj;
}
