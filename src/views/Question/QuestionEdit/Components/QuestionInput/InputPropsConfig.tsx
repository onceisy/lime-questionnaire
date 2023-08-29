import React, { FC, useEffect } from 'react';
import { Form, Input, Switch } from 'antd';
import { useTranslation } from 'react-i18next';
import QuestionInputPropsType from './interface';

const InputPropsConfig: FC = (props: QuestionInputPropsType) => {
  const { t } = useTranslation();
  const { label, required, placeholder, onChange } = props;
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({ label, required, placeholder });
  }, [props]);

  function handleValuesChange() {
    onChange && onChange(form.getFieldsValue());
  }
  return (
    <div>
      <Form
        layout="vertical"
        form={form}
        initialValues={{ label, required, placeholder }}
        onValuesChange={handleValuesChange}
      >
        {/* 标题 */}
        <Form.Item label={t('public.title')} name="label">
          <Input maxLength={25} placeholder={t('public.title')} />
        </Form.Item>
        {/* 是否必填 */}
        <Form.Item>
          <div className="flex items-center justify-between">
            <span className="mr-4">{t('question.isRequired')}</span>
            <Form.Item name="required" valuePropName="checked" style={{ margin: 0 }}>
              <Switch />
            </Form.Item>
          </div>
        </Form.Item>
        {/* 输入提示 */}
        <Form.Item label={t('question.placeholder.placeholder')} name="placeholder">
          <Input maxLength={25} placeholder={t('question.placeholder.input')} />
        </Form.Item>
      </Form>
    </div>
  );
};

export default InputPropsConfig;
