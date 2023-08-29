import React, { FC } from 'react';
import QuestionParagraphPropsType from './interface';
import { Typography } from 'antd';
import classNames from 'classnames';

const QuestionParagraph: FC<QuestionParagraphPropsType> = (props: QuestionParagraphPropsType) => {
  const { text, isCenter, isCode, isItalic, isStrong, textColor, fontSize } = props;
  const style = {
    marginBottom: 0,
    color: textColor,
    fontSize,
  };
  const className = classNames({
    ['mt-0']: true,
    ['text-center']: isCenter,
    ['whitespace-pre']: true,
  });
  return (
    <div>
      <Typography.Paragraph
        code={isCode}
        italic={isItalic}
        strong={isStrong}
        style={style}
        className={className}
      >
        {text}
      </Typography.Paragraph>
    </div>
  );
};

export default QuestionParagraph;
