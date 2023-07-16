import { Typography } from 'antd';
import React, { FC } from 'react';
import QuestionTitlePropsType from './QuestionTitlePropsType';
import { useTranslation } from 'react-i18next';
import { COMPONENT_COMMON_CLASS } from '@/constant/TailwindClassNames';

const { Title, Text } = Typography;

const QuestionTitle: FC<QuestionTitlePropsType> = (props: QuestionTitlePropsType) => {
  const { t } = useTranslation();
  const {
    text = '',
    level = 3,
    isCenter = false,
    description = t('question.defaultDescription'),
  } = props;

  function getFontSizeByLevel(level: number) {
    return `${34 - level * 4}px`;
  }
  return (
    <div className={`${COMPONENT_COMMON_CLASS}`}>
      <Title
        editable
        title={text}
        level={level}
        style={{
          textAlign: isCenter ? 'center' : 'left',
          fontSize: getFontSizeByLevel(level),
          margin: '0',
          padding: '20px 0',
        }}
      >
        {text}
      </Title>
      <Text editable>{description}</Text>
    </div>
  );
};
export default QuestionTitle;
