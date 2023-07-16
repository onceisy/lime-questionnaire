import { DEFAULT_PAGE_SIZE, SEARCH_PAGE, SEARCH_PAGE_SIZE } from '@/constant';
import { ResponseType } from '@/service/ajax';
import { ListParamsType } from '@/service/config';
import { useRequest } from 'ahooks';
import { AxiosRequestConfig } from 'axios';
import { useSearchParams } from 'react-router-dom';

interface QueryListPropsType {
  // 除了名称、pageSize、pageNumber的额外查询参数
  query?: Partial<ListParamsType>;
  // 从地址栏获取的查询名称例如title、name等
  searchKeyName: string;
  // 查询列表的ajax方法
  queryFunction: (params: AxiosRequestConfig<ListParamsType>) => Promise<ResponseType>;
}

/**
 * @description: 通用查询列表的hook
 * @param {Partial} props
 * @return {*}
 */
function useQueryList(props: QueryListPropsType) {
  const { query, searchKeyName, queryFunction } = props;
  const [searchParams] = useSearchParams();

  const page = searchParams.get(SEARCH_PAGE) || '1';
  const pageSize = searchParams.get(SEARCH_PAGE_SIZE) || query?.pageSize || DEFAULT_PAGE_SIZE;

  const params: AxiosRequestConfig<ListParamsType> = {
    ...query,
    [searchKeyName]: searchParams.get(searchKeyName) || '',
    [SEARCH_PAGE]: Number(page),
    [SEARCH_PAGE_SIZE]: Number(pageSize),
  } as AxiosRequestConfig<ListParamsType>;

  const { loading, data, refresh } = useRequest(() => queryFunction(params), {
    refreshDeps: [searchParams],
  });

  return {
    loading,
    data,
    refresh,
  };
}

export default useQueryList;
