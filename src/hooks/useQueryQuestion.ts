import { queryQuestion } from '@/service/question';
import { useRequest } from 'ahooks';
import { useParams } from 'react-router-dom';

function useQueryQuestion() {
  const { id = '' } = useParams();
  const { loading, data } = useRequest(() => queryQuestion(id));

  return {
    loading,
    data,
  };
}

export default useQueryQuestion;
