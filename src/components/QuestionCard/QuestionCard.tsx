import React, { FC } from 'react';
import { Card, Button, Space } from 'antd';
import CardTitleRight from './CardTitleRight';
import type Question from './Question';
import { ShareAltOutlined, FormOutlined, SendOutlined, DeleteOutlined } from '@ant-design/icons';
import styles from './QuestionCard.module.scss';

const QuestionCard: FC<Question> = (props: Question) => {
  const { title } = props;
  return (
    <div className={styles['question-card']}>
      <Card type="inner" hoverable title={title} extra={<CardTitleRight {...props} />}>
        <div className={styles['card-content']}>
          <div>
            <Space>
              <Button type="primary" shape="round" icon={<ShareAltOutlined />} size="middle">
                分享问卷
              </Button>
              <Button type="primary" shape="round" icon={<FormOutlined />} size="middle">
                编辑
              </Button>
            </Space>
          </div>
          <div>
            <Space>
              <Button shape="round" icon={<SendOutlined />} size="middle">
                发布
              </Button>
              <Button danger shape="round" icon={<DeleteOutlined />} size="middle">
                删除
              </Button>
            </Space>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default QuestionCard;
