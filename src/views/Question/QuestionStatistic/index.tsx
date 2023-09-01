import React, { FC } from 'react';
import StatisticHeader from './Components/Header';
import useQueryQuestion from '@/hooks/useQueryQuestion';

const QuestionStatistic: FC = () => {
  const { loading } = useQueryQuestion();
  return (
    <div>
      <StatisticHeader />
    </div>
  );
};

export default QuestionStatistic;
