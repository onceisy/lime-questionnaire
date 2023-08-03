import { queryQuestion } from '@/service/question';
import { resetComponents } from '@/store/components';
import { useAppDispatch } from '@/store/hooks';
import { useRequest } from 'ahooks';
import { useParams } from 'react-router-dom';

function useQueryQuestion() {
  const dispatch = useAppDispatch();

  const { id = '' } = useParams();
  const { loading, data } = useRequest(() => queryQuestion(id), {
    onSuccess: res => {
      const componentList = res.data.componentList || [];
      dispatch(resetComponents({ componentList, selectedId: '' }));
    },
  });

  return {
    loading,
    data,
  };
}

export default useQueryQuestion;
