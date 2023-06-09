import React, { FC, useEffect, useState } from 'react';
import QuestionCard from '../../../components/QuestionCard/QuestionCard';
import type Question from '@/components/QuestionCard/Question';
import { Space, Empty } from 'antd';
import Loading from '../../../components/Loading/Loading';
import { useBoolean } from 'ahooks';

const MyQuestionList: FC = () => {
  const [listLoading, { toggle, set, setTrue, setFalse }] = useBoolean(true);
  const [questionList, setQuestionList] = useState<Question[]>([]);
  useEffect(() => {
    setTimeout(() => {
      setQuestionList([
        {
          _id: '1111111',
          title: '大学生消费情况调查问卷',
          isPublished: false,
          isStar: true,
          answerCount: 20,
          createdAt: '2023-06-07 22:00',
        },
        {
          _id: '2222222',
          title: '大学生恋爱观调查问卷',
          isPublished: true,
          isStar: false,
          answerCount: 24,
          createdAt: '2023-06-07 22:10',
        },
        {
          _id: '33333333',
          title: '大学生就业情况调查问卷',
          isPublished: false,
          isStar: false,
          answerCount: 24,
          createdAt: '2023-06-07 22:11',
        },
      ]);
      setFalse();
      console.log(listLoading);
    }, 1500);
  }, []);
  return (
    <div>
      {listLoading ? (
        <Loading></Loading>
      ) : questionList.length ? (
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
          {questionList.map(q => {
            return <QuestionCard key={q._id} {...q}></QuestionCard>;
          })}
        </Space>
      ) : (
        <Empty />
      )}
    </div>
  );
};

export default MyQuestionList;
