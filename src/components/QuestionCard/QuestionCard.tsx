import React, { FC } from 'react';
import { Card, Button, Space, Popconfirm, App } from 'antd';
import CardTitleRight from './CardTitleRight';
import type QuestionProps from './QuestionProps';
import {
  ShareAltOutlined,
  FormOutlined,
  SendOutlined,
  DeleteOutlined,
  LineChartOutlined,
  CopyOutlined,
  StarOutlined,
} from '@ant-design/icons';
import styles from './QuestionCard.module.scss';

const QuestionCard: FC<QuestionProps> = (props: QuestionProps) => {
  const { title, isPublished, isStar, setStar, onCopy, onDelete } = props;

  const { modal } = App.useApp();

  function deleteQuestion() {
    modal.confirm({
      title: '是否删除问卷？',
      onOk: onDelete,
    });
  }
  return (
    <div className={styles['question-card']}>
      <Card type="inner" hoverable title={title} extra={<CardTitleRight {...props} />}>
        <div className={styles['card-content']}>
          <div>
            <Space>
              {isPublished && (
                <>
                  <Button type="primary" shape="round" icon={<ShareAltOutlined />} size="middle">
                    分享问卷
                  </Button>
                  <Button type="primary" shape="round" icon={<LineChartOutlined />} size="middle">
                    问卷统计
                  </Button>
                </>
              )}
              {!isPublished && (
                <>
                  <Button type="primary" shape="round" icon={<FormOutlined />} size="middle">
                    编辑
                  </Button>
                  <Button type="primary" shape="round" icon={<SendOutlined />} size="middle">
                    发布
                  </Button>
                </>
              )}
            </Space>
          </div>
          <div>
            <Space>
              <Button shape="round" icon={<StarOutlined />} size="middle" onClick={setStar}>
                {isStar ? '取消标星' : '标星'}
              </Button>
              <Popconfirm title="复制问卷" description="是否确认复制问卷？" onConfirm={onCopy}>
                <Button shape="round" icon={<CopyOutlined />} size="middle">
                  复制
                </Button>
              </Popconfirm>
              <Button
                danger
                shape="round"
                icon={<DeleteOutlined />}
                size="middle"
                onClick={deleteQuestion}
              >
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
