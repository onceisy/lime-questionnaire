import React, { FC } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

const QuestionEdit: FC = () => {
  // 获取动态路由参数
  const { id } = useParams();
  // 获取url查询参数
  const [searchParams] = useSearchParams();
  const key = searchParams.get('key');
  return (
    <div>
      <h1>QuestionEdit</h1>
      <p>id: {id}</p>
      <p>key: {key}</p>
    </div>
  );
};

export default QuestionEdit;
