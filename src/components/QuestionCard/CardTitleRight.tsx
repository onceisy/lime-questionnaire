import React, { FC } from 'react';
import { Space, Tag } from 'antd';
import { CheckCircleOutlined, ClockCircleOutlined, StarFilled } from '@ant-design/icons';
import type Question from './Question';
import { useTranslation } from 'react-i18next';

const CardTitleRight: FC<Question> = (props: Question) => {
  const { isPublished, isStar, answerCount, createdAt } = props;
  const { t } = useTranslation();

  return (
    <div>
      <Space align="center">
        {isStar && (
          <StarFilled style={{ color: '#FB9A57', fontSize: '18px', verticalAlign: 'center' }} />
        )}
        {isPublished ? (
          <Tag icon={<CheckCircleOutlined />} color="success">
            {t('manage.published')}
          </Tag>
        ) : (
          <Tag icon={<ClockCircleOutlined />} color="default">
            {t('manage.unpublished')}
          </Tag>
        )}
        <span>
          {t('manage.answerCount')}: {answerCount}
        </span>
        <span>
          {t('public.createdTime')}: {createdAt}
        </span>
      </Space>
    </div>
  );
};

export default CardTitleRight;
