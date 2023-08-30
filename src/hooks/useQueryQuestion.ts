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
      dispatch(
        resetComponents({
          _id: res.data._id,
          componentList,
          selectedId: '',
          copiedComponent: undefined,
          title: res.data.title,
          isAutoSave: res.data.isAutoSave,
        })
      );
    },
  });

  return {
    loading,
    data,
  };
}

export default useQueryQuestion;
