import React, { FC } from 'react';
import Loading from '@/components/Loading/Loading';
import useQueryQuestion from '@/hooks/useQueryQuestion';
import Header from './Header/Header';
import QuestionTitle from './Components/QuestionTitle/QuestionTitle';
import QuestionInput from './Components/QuestionInput/QuestionInput';
import { Form } from 'antd';

const QuestionEdit: FC = () => {
  const { loading, data } = useQueryQuestion();
  const question = data?.data || {};
  return (
    <>
      {loading ? (
        <Loading top={60}></Loading>
      ) : (
        <div className="h-full flex flex-col">
          <Header {...question}></Header>
          <div className="flex-auto flex">
            <div className="w-72 bg-amber-50">1</div>
            <div className="bg-slate-50 flex-auto px-5">
              <QuestionTitle text={question.title}></QuestionTitle>
              <Form layout="vertical">
                <QuestionInput _id="test" label="输入框标题" required></QuestionInput>
              </Form>
            </div>
            <div className="bg-lime-50 w-72">3</div>
          </div>
        </div>
      )}
    </>
  );
};

export default QuestionEdit;
