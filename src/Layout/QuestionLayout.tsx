import useNavPage from '@/hooks/useNavPage';
import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';

const QuestionLayout: FC = () => {
  useNavPage();
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default QuestionLayout;
