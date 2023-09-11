import { queryOptionsById, queryOptionsByIds, queryOptionsList } from '@/service/config';
import { useAppSelector } from '@/store/hooks';
import { resetOption, selectOptions, updateDicOptions } from '@/store/optionSlice';
import { OptionDicType } from '@/views/Config/OptionsConfig/OptionEdit';
import { useRequest } from 'ahooks';
import { useDispatch } from 'react-redux';

export function useGetOptions() {
  const dispatch = useDispatch();
  const options = useAppSelector(selectOptions);
  /**
   * @description: 查询所有字典,设置到state(不包含options),导致所有字典options丢失,只在系统初始化调用！
   * @return {*}
   */
  const { run: updateDicFromService } = useRequest(queryOptionsList, {
    manual: true,
    onSuccess: res => {
      if (res.code === 200 && res.data.list?.length) {
        dispatch(resetOption(res.data.list));
      }
    },
  });

  /**
   * @description: 根据_id，查询单个字典的options信息，并更新到state
   * @param: _id 字典的_id
   * @return {*}
   */
  const { runAsync: updateDicOptionsById } = useRequest(queryOptionsById, {
    manual: true,
    onSuccess: async res => {
      if (res.code === 200) {
        await dispatch(updateDicOptions(res.data));
      }
    },
  });

  /**
   * @description: 根据_id数组，批量查询字典的options信息，并更新到state
   * @param: _id 字典的_id
   * @return {*}
   */
  const { runAsync: updateDicOptionsByIds } = useRequest(queryOptionsByIds, {
    manual: true,
    onSuccess: res => {
      const { code, data = [] } = res;
      if (code === 200) {
        data.forEach((o: OptionDicType) => {
          dispatch(updateDicOptions(o));
        });
      }
    },
  });

  /**
   * @description: 根据字典id获取选项
   * @param {string} id
   * @return {*}
   */
  async function getDicOptionsById(id: string) {
    const dic = options.find(o => o._id === id);
    if (!dic || !dic._id) return [];
    if (!dic.options) {
      try {
        const res = await updateDicOptionsById(dic._id);
        if (res.code == 200) {
          return res.data.options;
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      return dic.options;
    }
  }
  /**
   * @description: 获取批量配置
   * @param {string} id
   * @return {*}
   */
  async function getDicOptionsByIds(ids: string[]) {
    // 走批量查询接口
    return await updateDicOptionsByIds(ids);
  }

  return {
    updateDicFromService,
    updateDicOptionsById,
    options,
    getDicOptionsById,
    getDicOptionsByIds,
  };
}
