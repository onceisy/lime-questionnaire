import React, { FC } from 'react';
import { Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import { QuestionTextAreaPropsType } from './interface';

const QuestionTextArea: FC<QuestionTextAreaPropsType> = (props: QuestionTextAreaPropsType) => {
  const { t } = useTranslation();
  const {
    _id,
    label = t('question.placeholder.input'),
    required = false,
    placeholder = t('question.placeholder.input'),
    maxLength,
    showCount,
    rows,
  } = props;
  return (
    <div>
      <div className="pointer-events-none">
        <Form.Item
          label={label}
          name={_id}
          rules={[{ required: required, message: placeholder }]}
          required={required}
        >
          <Input.TextArea
            placeholder={placeholder}
            maxLength={maxLength}
            showCount={showCount}
            rows={rows}
          />
        </Form.Item>
      </div>
    </div>
  );
};

export default QuestionTextArea;
