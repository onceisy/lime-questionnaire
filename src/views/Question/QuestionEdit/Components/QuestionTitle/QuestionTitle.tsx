import React, { FC } from 'react';
import { Typography } from 'antd';
import QuestionTitlePropsType from './interface';
import { useTranslation } from 'react-i18next';

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
    <div>
      {text && (
        <Title
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
      )}
      {description && <Text className="whitespace-pre-line">{description}</Text>}
    </div>
  );
};
export default QuestionTitle;
