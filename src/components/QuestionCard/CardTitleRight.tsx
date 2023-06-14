import React, { FC } from 'react';
import { Space, Tag } from 'antd';
import { CheckCircleOutlined, ClockCircleOutlined, StarFilled } from '@ant-design/icons';
import type Question from './Question';

const CardTitleRight: FC<Question> = (props: Question) => {
  const { isPublished, isStar, answerCount, createdAt } = props;
  return (
    <div>
      <Space align="center">
        {isStar && (
          <StarFilled style={{ color: '#FB9A57', fontSize: '18px', verticalAlign: 'center' }} />
        )}
        {isPublished ? (
          <Tag icon={<CheckCircleOutlined />} color="success">
            已发布
          </Tag>
        ) : (
          <Tag icon={<ClockCircleOutlined />} color="default">
            待发布
          </Tag>
        )}
        <span>答卷: {answerCount}</span>
        <span>创建时间: {createdAt}</span>
      </Space>
    </div>
  );
};

export default CardTitleRight;
