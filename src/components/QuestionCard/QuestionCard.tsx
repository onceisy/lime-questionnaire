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
import { useTranslation } from 'react-i18next';

const QuestionCard: FC<QuestionProps> = (props: QuestionProps) => {
  const { title, isPublished, isStar, setStar, onCopy, onDelete } = props;

  const { modal } = App.useApp();

  function deleteQuestion() {
    modal.confirm({
      title: t('manage.deleteConfirm'),
      onOk: onDelete,
    });
  }
  const { t } = useTranslation();
  return (
    <div className={styles['question-card']}>
      <Card type="inner" hoverable title={title} extra={<CardTitleRight {...props} />}>
        <div className={styles['card-content']}>
          <div>
            <Space>
              {isPublished && (
                <>
                  <Button type="primary" shape="round" icon={<ShareAltOutlined />} size="middle">
                    {t('manage.shareQuestionnaire')}
                  </Button>
                  <Button type="primary" shape="round" icon={<LineChartOutlined />} size="middle">
                    {t('manage.questionnaireStatistics')}
                  </Button>
                </>
              )}
              {!isPublished && (
                <>
                  <Button type="primary" shape="round" icon={<FormOutlined />} size="middle">
                    {t('public.edit')}
                  </Button>
                  <Button type="primary" shape="round" icon={<SendOutlined />} size="middle">
                    {t('manage.publish')}
                  </Button>
                </>
              )}
            </Space>
          </div>
          <div>
            <Space>
              <Button shape="round" icon={<StarOutlined />} size="middle" onClick={setStar}>
                {isStar ? t('manage.unStar') : t('manage.star')}
              </Button>
              <Popconfirm
                title={t('public.copy')}
                description={t('manage.copyConfirm')}
                onConfirm={onCopy}
              >
                <Button shape="round" icon={<CopyOutlined />} size="middle">
                  {t('public.copy')}
                </Button>
              </Popconfirm>
              <Button
                danger
                shape="round"
                icon={<DeleteOutlined />}
                size="middle"
                onClick={deleteQuestion}
              >
                {t('public.delete')}
              </Button>
            </Space>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default QuestionCard;
