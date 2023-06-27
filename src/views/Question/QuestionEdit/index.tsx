import React, { FC } from 'react';
import Loading from '@/components/Loading/Loading';
import useQueryQuestion from '@/hooks/useQueryQuestion';

const QuestionEdit: FC = () => {
  const { loading, data } = useQueryQuestion();
  return (
    <div>
      <h1>QuestionEdit</h1>
      {loading ? (
        <Loading />
      ) : (
        <>
          <p>id: {data?.data._id}</p>
          <p>{JSON.stringify(data?.data)}</p>
        </>
      )}
    </div>
  );
};

export default QuestionEdit;
