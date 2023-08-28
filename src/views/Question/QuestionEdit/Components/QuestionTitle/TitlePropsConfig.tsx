import React, { FC, useEffect } from 'react';
import { Form, Input, Select, Switch } from 'antd';
import { useTranslation } from 'react-i18next';
import QuestionTitlePropsType from './interface';

const TitlePropsConfig: FC = (props: QuestionTitlePropsType) => {
  // const { message } = App.useApp();
  const { t } = useTranslation();

  const { text, level, isCenter, description, onChange } = props;
  const levels = [1, 2, 3, 4, 5];
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({ text, level, isCenter, description });
  }, [props]);

  // let lastTitle = text;

  function handleValuesChange() {
    // const title = form.getFieldValue('text');
    // if (!title) {
    //   message.error(t('question.noEmptyContent'));
    //   form.setFieldValue('text', lastTitle);
    //   return;
    // }
    // lastTitle = title;
    onChange && onChange(form.getFieldsValue());
  }
  return (
    <div>
      <Form
        layout="vertical"
        form={form}
        initialValues={{ text, level, isCenter, description }}
        onValuesChange={handleValuesChange}
      >
        {/* 问卷标题 */}
        <Form.Item label={t('question.questionTitle')} name="text">
          <Input placeholder={t('question.questionTitle')} />
        </Form.Item>
        {/* 标题大小 */}
        <Form.Item label={t('question.titleLevel')} name="level">
          <Select placeholder={t('question.titleLevel')}>
            {levels.map(i => {
              return (
                <Select.Option key={i} value={i}>
                  {t('config.setLevel', { level: i })}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
        {/* 是否居中 */}
        <Form.Item>
          <div className="flex items-center">
            <span className="mr-4">{t('question.isTitleCenter')}</span>
            <Form.Item name="isCenter" valuePropName="checked" style={{ margin: 0 }}>
              <Switch />
            </Form.Item>
          </div>
        </Form.Item>
        {/* 问卷描述 */}
        <Form.Item label={t('question.questionDesc')} name="description">
          <Input.TextArea rows={3} placeholder={t('question.questionDesc')} />
        </Form.Item>
      </Form>
    </div>
  );
};

export default TitlePropsConfig;
