import React, { FC, useEffect, useState } from 'react';
import { Input } from 'antd';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { QUESTION_LIST_SEARCH_PARAM } from '@/constant';

const { Search } = Input;

const QuestionListSearch: FC = () => {
  const { t } = useTranslation();

  const [keyword, setKeyword] = useState<string>('');

  const nav = useNavigate();
  const location = useLocation();
  function handleSearch() {
    nav({
      pathname: location.pathname,
      search: `${QUESTION_LIST_SEARCH_PARAM}=${keyword}`,
    });
  }

  // 页面刷新搜索框回显
  const [searchParams] = useSearchParams();
  const path = searchParams.get(QUESTION_LIST_SEARCH_PARAM) || '';
  useEffect(() => {
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

export default QuestionListSearch;
