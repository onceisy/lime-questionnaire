import React, { FC, useState } from 'react';
import StatisticHeader from './Components/Header';
import BasicData from './Components/BasicData';
import QuestionReport from './Components/QuestionReport';
import { QuestionInfoType, initialState } from '@/store/questionInfoSlice';

const QuestionStatistic: FC = () => {
  const [tab, setTab] = useState<string>('basicData');
  const [questionInfo, setQuestionInfo] = useState<QuestionInfoType>(initialState);

  return (
    <>
      <StatisticHeader
        value={tab}
        title={questionInfo.title || ''}
        onChange={val => setTab(val as string)}
      />
      <div className="px-5">
        {tab === 'basicData' && <BasicData setQuestionInfo={setQuestionInfo} />}
        {tab === 'questionReport' && <QuestionReport setQuestionInfo={setQuestionInfo} />}
      </div>
    </>
  );
};

export default QuestionStatistic;
