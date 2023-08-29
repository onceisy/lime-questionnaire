import React, { FC, useEffect } from 'react';
import { App, ColorPicker, Form, Input, Select, Switch } from 'antd';
import { useTranslation } from 'react-i18next';
import QuestionParagraphPropsType from './interface';

const ParagraphPropsConfig: FC<QuestionParagraphPropsType> = (
  props: QuestionParagraphPropsType
) => {
  const { t } = useTranslation();
  const { message } = App.useApp();
  const { text, isStrong, isItalic, isCode, fontSize, textColor, isCenter, onChange } = props;
  const [form] = Form.useForm();

  const levels: number[] = [12, 14, 16, 18, 20, 22];

  let lastContent = text;

  useEffect(() => {
    form.setFieldsValue({
      text,
      isCode,
      isItalic,
      isStrong,
      fontSize,
      textColor,
      isCenter,
    });
  }, [props]);

  function handleValuesChange() {
    const text = form.getFieldValue('text');
    if (!text) {
      message.error(t('question.noEmptyContent'));
      form.setFieldValue('text', lastContent);
      return;
    }
    lastContent = text;
    const textColor = form.getFieldValue('textColor');
    const values = {
      ...form.getFieldsValue(),
      textColor: textColor.toHexString ? textColor.toHexString() : textColor,
    };
    onChange && onChange(values);
  }
  return (
    <div>
      <Form
        layout="vertical"
        form={form}
        onValuesChange={handleValuesChange}
        initialValues={{
          text,
          isCode,
          isItalic,
          isStrong,
          fontSize,
          textColor,
          isCenter,
        }}
      >
        {/* 段落内容 */}
        <Form.Item label={t('question.paragraphContent')} name="text" required>
          <Input.TextArea placeholder={t('question.paragraphContent')} rows={4} />
        </Form.Item>
        {/* 字体大小 */}
        <Form.Item label={t('public.fontSize')} name="fontSize">
          <Select placeholder={t('public.fontSize')}>
            {levels.map(i => {
              return (
                <Select.Option key={i} value={i}>
                  {t('public.pixel', { level: i })}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
        {/* 是否居中 */}
        <Form.Item>
          <div className="flex items-center justify-between">
            <span className="mr-4">{t('question.isCenter')}</span>
            {/* 自定义valuePropName，必须嵌套Form.Item，不然触发不了表单change事件 */}
            <Form.Item name="isCenter" valuePropName="checked" style={{ margin: 0 }}>
              <Switch />
            </Form.Item>
          </div>
        </Form.Item>
        {/* 是否加粗 */}
        <Form.Item>
          <div className="flex items-center justify-between">
            <span className="mr-4">{t('question.isStrong')}</span>
            {/* 自定义valuePropName，必须嵌套Form.Item，不然触发不了表单change事件 */}
            <Form.Item name="isStrong" valuePropName="checked" style={{ margin: 0 }}>
              <Switch />
            </Form.Item>
          </div>
        </Form.Item>
        {/* 是否斜体 */}
        <Form.Item>
          <div className="flex items-center justify-between">
            <span className="mr-4">{t('question.isItalic')}</span>
            {/* 自定义valuePropName，必须嵌套Form.Item，不然触发不了表单change事件 */}
            <Form.Item name="isItalic" valuePropName="checked" style={{ margin: 0 }}>
              <Switch />
            </Form.Item>
          </div>
        </Form.Item>
        {/* 是否可复制 */}
        {/* <Form.Item>
          <div className="flex items-center justify-between">
            <span className="mr-4">{t('question.copyable')}</span>
            <Form.Item name="copyable" valuePropName="checked" style={{ margin: 0 }}>
              <Switch />
            </Form.Item>
          </div>
        </Form.Item> */}
        {/* 是否显示为代码*/}
        <Form.Item>
          <div className="flex items-center justify-between">
            <span className="mr-4">{t('question.isCode')}</span>
            {/* 自定义valuePropName，必须嵌套Form.Item，不然触发不了表单change事件 */}
            <Form.Item name="isCode" valuePropName="checked" style={{ margin: 0 }}>
              <Switch />
            </Form.Item>
          </div>
        </Form.Item>
        {/* 字体颜色*/}
        <Form.Item>
          <div className="flex items-center">
            <span className="mr-4">{t('public.textColor')}</span>
            {/* 自定义valuePropName，必须嵌套Form.Item，不然触发不了表单change事件 */}
            <Form.Item name="textColor" style={{ margin: 0 }}>
              <ColorPicker showText />
            </Form.Item>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ParagraphPropsConfig;
