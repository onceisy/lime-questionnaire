import React, { FC, useEffect, useState } from 'react';
import { DEFAULT_PAGE_SIZE, PAGINATION_SIZES, SEARCH_PAGE, SEARCH_PAGE_SIZE } from '@/constant';
import { Pagination } from 'antd';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

export interface PaginationProps {
  total: number;
  pageSize?: number;
  position?: 'left' | 'right';
}

const SearchPagination: FC<PaginationProps> = (props: PaginationProps) => {
  const { total, position = 'left', pageSize: pageSizeProp } = props;

  const location = useLocation();
  const [searchParams] = useSearchParams();
  const nav = useNavigate();
  function onChange(page: number, size: number) {
    setCurrentPage(page);
    setPageSize(size);
    searchParams.set(SEARCH_PAGE, page.toString());
    searchParams.set(SEARCH_PAGE_SIZE, size.toString());
    nav({
      pathname: location.pathname,
      search: searchParams.toString(),
    });
  }
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(pageSizeProp || DEFAULT_PAGE_SIZE);
  useEffect(() => {
    const page = searchParams.get(SEARCH_PAGE) || '1';
    setCurrentPage(parseInt(page));
    const pageSize = searchParams.get(SEARCH_PAGE_SIZE) || pageSizeProp || DEFAULT_PAGE_SIZE;
    setPageSize(Number(pageSize));
  }, [searchParams]);
  return (
    <div className={`${position === 'right' ? 'text-right' : ''}`}>
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={total}
        showSizeChanger
        pageSizeOptions={PAGINATION_SIZES}
        onChange={onChange}
      />
    </div>
  );
};

export default SearchPagination;
