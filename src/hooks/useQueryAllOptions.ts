import { queryOptionsList } from '@/service/config';
import { resetOption } from '@/store/optionSlice';
import { useRequest } from 'ahooks';
import { useDispatch } from 'react-redux';

export function useQueryAllOptions() {
  const dispatch = useDispatch();

  useRequest(queryOptionsList, {
    onSuccess: res => {
      if (res.code === 200 && res.data.list?.length) {
        dispatch(resetOption(res.data.list));
      }
    },
  });
}
