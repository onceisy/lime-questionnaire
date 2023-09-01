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
  CloseOutlined,
} from '@ant-design/icons';
import styles from './QuestionCard.module.scss';
import { useTranslation } from 'react-i18next';
import useEditQuestion from '@/hooks/useEditQuestion';
import { useRequest } from 'ahooks';
import { copyQuestion } from '@/service/question';
import { useNavigate } from 'react-router-dom';
import { ROUTE_QUESTION_EDIT, ROUTE_STATISTIC } from '@/router/path';
import ShareQuestion from '../ShareQuestion/ShareQuestion';

const QuestionCard: FC<QuestionProps> = (props: QuestionProps) => {
  const { t } = useTranslation();
  const nav = useNavigate();
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

  /**
   * @description: 发布问卷
   * @return {*}
   */
  const { runAsync: publishQuestion } = useEditQuestion(refresh);
  function handlePublishQuestion() {
    modal.confirm({
      title: t('manage.publishConfirm'),
      onOk: async () => {
        try {
          await publishQuestion(_id, { isPublished: true });
          handleShareQuestion();
        } catch (error) {
          console.error(error);
        }
      },
    });
  }

  /**
   * @description: 分享问卷
   * @return {*}
   */
  function handleShareQuestion() {
    modal.confirm({
      title: t('manage.shareQuestionnaire'),
      footer: null,
      icon: null,
      closeIcon: <CloseOutlined />,
      content: <ShareQuestion {...props} />,
      maskClosable: true,
      width: 600,
    });
  }
  return (
    <div className={`${styles['question-card']} px-3`}>
      <Card type="inner" hoverable title={title} extra={<CardTitleRight {...props} />}>
        <div className={styles['card-content']}>
          <div>
            <Space>
              {isPublished && (
                <>
                  <Button
                    type="primary"
                    shape="round"
                    icon={<ShareAltOutlined />}
                    size="middle"
                    onClick={handleShareQuestion}
                  >
                    {t('manage.shareQuestionnaire')}
                  </Button>
                  <Button
                    type="primary"
                    ghost
                    shape="round"
                    icon={<LineChartOutlined />}
                    size="middle"
                    onClick={() => nav(`${ROUTE_STATISTIC}/${_id}`)}
                  >
                    {t('manage.questionnaireStatistics')}
                  </Button>
                </>
              )}
              {!isPublished && (
                <>
                  <Button
                    type="primary"
                    shape="round"
                    icon={<FormOutlined />}
                    size="middle"
                    onClick={() => nav(`${ROUTE_QUESTION_EDIT}/${_id}`)}
                  >
                    {t('public.edit')}
                  </Button>
                  <Button
                    type="primary"
                    shape="round"
                    icon={<SendOutlined />}
                    size="middle"
                    onClick={handlePublishQuestion}
                  >
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
