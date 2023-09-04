import React, { FC, useState } from 'react';
import StatisticHeader from './Components/Header';
import BasicData from './Components/BasicData';
import QuestionReport from './Components/QuestionReport';

const QuestionStatistic: FC = () => {
  const [tab, setTab] = useState<string>('basicData');

  return (
    <>
      <StatisticHeader value={tab} onChange={val => setTab(val as string)} />
      <div className="px-5">
        {tab === 'basicData' && <BasicData />}
        {tab === 'questionReport' && <QuestionReport />}
      </div>
    </>
  );
};

export default QuestionStatistic;
