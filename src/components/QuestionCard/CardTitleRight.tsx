import React, { FC } from 'react';
import styles from './CardTitleRight.module.scss';
import { Space, Tag } from 'antd';
import { CheckCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';
import type Question from './Question';

const CardTitleRight: FC<Question> = (props: Question) => {
  const { _id, isPublished, isStar, answerCount, createdAt } = props;
  return (
    <div className={styles['card-title-right']}>
      <Space>
        <span>id: {_id}</span>
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
