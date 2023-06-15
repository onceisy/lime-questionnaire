import QuestionList from '@/components/QuestionList/QuestionList';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

const StarList: FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <QuestionList title={t('manage.starQuestionnaire')}></QuestionList>
    </>
  );
};

export default StarList;
