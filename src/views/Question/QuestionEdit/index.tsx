import React, { FC } from 'react';
import Loading from '@/components/Loading/Loading';
import useQueryQuestion from '@/hooks/useQueryQuestion';
import Header from './Header/Header';
import LeftPanel from './LeftPanel';
import MiddleView from './MiddleView';
import RightPanel from './RightPanel';

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
            <div className="w-72">
              <LeftPanel></LeftPanel>
            </div>
            <div className="bg-slate-50 flex-auto px-5">
              <MiddleView></MiddleView>
            </div>
            <div className="w-72">
              <RightPanel></RightPanel>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default QuestionEdit;
