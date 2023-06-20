import React, { FC, useEffect, useState } from 'react';
import QuestionCard from '@/components/QuestionCard/QuestionCard';
import type Question from '@/components/QuestionCard/Question';
import { Space, Empty } from 'antd';
import Loading from '@/components/Loading/Loading';
import { produce } from 'immer';
import QuestionListProps from './QuestionListProps';
import QuestionListSearch from '../QuestionListSearch/QuestionListSearch';

const QuestionList: FC<QuestionListProps> = (props: QuestionListProps) => {
  const { title } = props;

  const [listLoading, setLoading] = useState(true);
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
      setLoading(false);
    }, 500);
  }, []);

  function setStar(question: Question) {
    setQuestionList(pre => {
      return produce(pre, draft => {
        for (const q of draft) {
          if (q._id === question._id) {
            q.isStar = !q.isStar;
          }
        }
      });
    });
  }

  function copyQuestion(question: Question) {
    setQuestionList(
      produce(draft => {
        draft.push({
          ...question,
          _id: Math.random().toString(),
        });
      })
    );
  }

  function deleteQuestion(question: Question) {
    setQuestionList(
      produce(draft => {
        const index = draft.findIndex(i => i._id === question._id);
        draft.splice(index, 1);
      })
    );
  }
  return (
    <>
      <div className="flex items-center justify-between mb-3">
        <h3 title={title} className="my-0">
          {title}
        </h3>
        <QuestionListSearch />
      </div>
      {listLoading ? (
        <Loading className="mt-16"></Loading>
      ) : questionList.length ? (
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
          {questionList.map(q => {
            return (
              <QuestionCard
                key={q._id}
                {...q}
                setStar={() => setStar(q)}
                onCopy={() => copyQuestion(q)}
                onDelete={() => deleteQuestion(q)}
              ></QuestionCard>
            );
          })}
        </Space>
      ) : (
        <Empty />
      )}
    </>
  );
};

export default QuestionList;
