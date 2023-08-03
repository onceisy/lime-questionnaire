import React, { FC } from 'react';
import { Form, Input } from 'antd';
import QuestionInputPropsType from './interface';
import { useTranslation } from 'react-i18next';

const QuestionInput: FC<QuestionInputPropsType> = (props: QuestionInputPropsType) => {
  const { t } = useTranslation();
  const {
    _id,
    label = t('question.placeholder.input'),
    required = false,
    placeholder = t('question.placeholder.input'),
  } = props;
  return (
    <div>
      <div className="pointer-events-none">
        <Form.Item label={label} name={_id} rules={[{ required: required, message: placeholder }]}>
          <Input placeholder={placeholder} />
        </Form.Item>
      </div>
    </div>
  );
};

export default QuestionInput;
