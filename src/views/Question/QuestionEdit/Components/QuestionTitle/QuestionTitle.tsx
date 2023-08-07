import { Typography } from 'antd';
import React, { FC, useEffect, useState } from 'react';
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
  const [textArr, setTextArr] = useState<string[]>([]);
  useEffect(() => {
    setTextArr(description?.split('\n') || []);
  }, [description]);
  return (
    <div>
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
      <Text>
        {textArr.map(text => {
          return (
            <span key={text}>
              {text}
              {textArr.length > 1 ? <br /> : ''}
            </span>
          );
        })}
      </Text>
    </div>
  );
};
export default QuestionTitle;
