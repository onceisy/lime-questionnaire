import React, { FC } from 'react';
import QuestionCard from '@/components/QuestionCard/QuestionCard';
import type Question from '@/components/QuestionCard/Question';
import { Space, Empty } from 'antd';
import Loading from '@/components/Loading/Loading';
import QuestionListProps from './QuestionListProps';
import QuestionListSearch from '../QuestionListSearch/QuestionListSearch';
import useQueryQuestionList from '@/hooks/useQueryQuestionList';
import QuestionListPagination from '../QuestionListSearch/QuestionListPagination';

const QuestionList: FC<QuestionListProps> = (props: QuestionListProps) => {
  const { title } = props;

  const { loading, data, refresh } = useQueryQuestionList(props);
  const { list: questionList, count } = data?.data || { count: 0 };

  return (
    <>
      <div className="flex items-center justify-between mb-3">
        <h3 title={title} className="my-0 px-5">
          {title}
        </h3>
        <QuestionListSearch />
      </div>
      {loading ? (
        <Loading className="mt-16"></Loading>
      ) : questionList && questionList.length ? (
        <div className="max-h-content-list overflow-y-scroll pr-1 pl-4">
          <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
            {questionList.map((q: Question) => {
              return <QuestionCard key={q._id} {...q} refresh={refresh}></QuestionCard>;
            })}
          </Space>
        </div>
      ) : (
        <Empty />
      )}
      <QuestionListPagination total={count} position="right" />
    </>
  );
};

export default QuestionList;
