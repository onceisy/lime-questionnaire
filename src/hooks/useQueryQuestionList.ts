import {
  DEFAULT_PAGE_SIZE,
  QUESTION_LIST_SEARCH_KEY,
  SEARCH_PAGE,
  SEARCH_PAGE_SIZE,
} from '@/constant';
import { ListParams, queryQuestionList } from '@/service/question';
import { useRequest } from 'ahooks';
import { useSearchParams } from 'react-router-dom';

/**
 * @description: 查询问卷列表
 * @param {Partial} query
 * @return {*}
 */
function useQueryQuestionList(query: Partial<ListParams>) {
  const [searchParams] = useSearchParams();

  const page = searchParams.get(SEARCH_PAGE) || '1';
  const pageSize = searchParams.get(SEARCH_PAGE_SIZE) || query.pageSize || DEFAULT_PAGE_SIZE;

  const params: Partial<ListParams> = {
    ...query,
    [QUESTION_LIST_SEARCH_KEY]: searchParams.get(QUESTION_LIST_SEARCH_KEY) || '',
    [SEARCH_PAGE]: Number(page),
    [SEARCH_PAGE_SIZE]: Number(pageSize),
  };

  const { loading, data, refresh } = useRequest(() => queryQuestionList(params), {
    refreshDeps: [searchParams],
  });

  return {
    loading,
    data,
    refresh,
  };
}

export default useQueryQuestionList;
