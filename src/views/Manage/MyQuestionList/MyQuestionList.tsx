import React, { FC } from 'react';
import QuestionList from '@/components/QuestionList/QuestionList';
import { useTranslation } from 'react-i18next';

const MyQuestionList: FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <QuestionList title={t('manage.myQuestionnaire')} isDeleted={false}></QuestionList>
    </>
  );
};

export default MyQuestionList;
