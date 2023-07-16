import React, { FC } from 'react';
import { Form, Input } from 'antd';
import QuestionInputPropsType from './QuestionInputPropsType';
import { useTranslation } from 'react-i18next';
import { COMPONENT_COMMON_CLASS } from '@/constant/TailwindClassNames';

const QuestionInput: FC<QuestionInputPropsType> = (props: QuestionInputPropsType) => {
  const { t } = useTranslation();
  const {
    _id,
    label = '',
    required = false,
    placeholder = t('question.placeholder.input'),
  } = props;
  return (
    <div className={`${COMPONENT_COMMON_CLASS}`}>
      <div className="pointer-events-none">
        <Form.Item label={label} name={_id} rules={[{ required: required, message: placeholder }]}>
          <Input placeholder={placeholder} />
        </Form.Item>
      </div>
    </div>
  );
};

export default QuestionInput;
