import React, { FC, useEffect, useState } from 'react';
import { Input } from 'antd';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { DEFAULT_LIST_SEARCH_KEY, DEFAULT_PAGE_SIZE, SEARCH_PAGE_SIZE } from '@/constant';

export interface InputSearchPropsType {
  searchKeyName?: string;
}
const { Search } = Input;

const InputSearch: FC<InputSearchPropsType> = (props: InputSearchPropsType) => {
  const { searchKeyName = DEFAULT_LIST_SEARCH_KEY } = props;
  const { t } = useTranslation();

  const [keyword, setKeyword] = useState<string>('');

  const [searchParams] = useSearchParams();
  const nav = useNavigate();
  const location = useLocation();
  function handleSearch() {
    const pageSize = searchParams.get(SEARCH_PAGE_SIZE) || DEFAULT_PAGE_SIZE;
    nav({
      pathname: location.pathname,
      search: `${searchKeyName}=${keyword}&${SEARCH_PAGE_SIZE}=${pageSize}`,
    });
  }

  // 页面刷新搜索框回显
  useEffect(() => {
    const path = searchParams.get(searchKeyName) || '';
    setKeyword(path);
  }, []);
  return (
    <>
      <Search
        placeholder={t('manage.searchPlaceholder') as string}
        className="w-52"
        enterButton
        allowClear
        value={keyword}
        onChange={e => setKeyword(e.target.value)}
        onSearch={handleSearch}
      />
    </>
  );
};

export default InputSearch;
