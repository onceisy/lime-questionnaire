import React, { FC } from 'react';
import { Card, Button, Space, Popconfirm, App, message } from 'antd';
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
import useEditQuestion from '@/hooks/useEditQuestion';
import { useRequest } from 'ahooks';
import { copyQuestion } from '@/service/question';

const QuestionCard: FC<QuestionProps> = (props: QuestionProps) => {
  const { t } = useTranslation();
  const { modal } = App.useApp();

  const { _id, title, isPublished, isStar, refresh } = props;

  /**
   * @description: 标星/取消标星问卷
   * @return {*}
   */
  const { loading: starLoading, run: setStar } = useEditQuestion(refresh);

  /**
   * @description: 复制问卷
   * @return {*}
   */
  const { run: handleCopyQuestion } = useRequest(copyQuestion, {
    manual: true,
    onSuccess: () => {
      message.success(t('manage.copySuccess'));
      refresh();
    },
  });

  /**
   * @description: 删除问卷
   * @return {*}
   */
  const { loading: deleteLoading, run: setDelete } = useEditQuestion(refresh);
  function handleDeleteQuestion() {
    modal.confirm({
      title: t('manage.deleteConfirm'),
      onOk: () => setDelete(_id, { isDeleted: true }),
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
              <Button
                shape="round"
                icon={<StarOutlined />}
                size="middle"
                disabled={starLoading}
                onClick={() => setStar(_id, { isStar: !isStar })}
              >
                {isStar ? t('manage.unStar') : t('manage.star')}
              </Button>
              <Popconfirm
                title={t('public.copy')}
                description={t('manage.copyConfirm')}
                onConfirm={() => handleCopyQuestion(_id)}
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
                disabled={deleteLoading}
                onClick={handleDeleteQuestion}
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
