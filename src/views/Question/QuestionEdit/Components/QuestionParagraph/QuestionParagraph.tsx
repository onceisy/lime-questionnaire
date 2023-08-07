import React, { FC, useEffect, useState } from 'react';
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
  });
  const [textArr, setTextArr] = useState<string[]>([]);
  useEffect(() => {
    setTextArr(text?.split('\n') || []);
  }, [text]);
  return (
    <div>
      <Typography.Paragraph
        code={isCode}
        italic={isItalic}
        strong={isStrong}
        style={style}
        className={className}
      >
        {textArr.map(text => {
          return (
            <span key={text}>
              {text}
              {textArr.length > 1 ? <br /> : ''}
            </span>
          );
        })}
      </Typography.Paragraph>
    </div>
  );
};

export default QuestionParagraph;
