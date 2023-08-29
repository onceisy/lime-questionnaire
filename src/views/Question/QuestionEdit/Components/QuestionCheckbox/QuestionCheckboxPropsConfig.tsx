import React, { FC, useEffect, useState } from 'react';
import { QuestionCheckboxPropsType } from './interface';
import { useTranslation } from 'react-i18next';
import { Button, Form, Input, Radio, Select, Switch } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { nanoid } from 'nanoid';
import { DEFAULT_INPUT_MAX_LENGTH } from '@/constant';
import { useGetOptions } from '@/hooks/useGetOptions';
import { OptionType } from '@/views/Config/OptionsConfig/OptionEdit';

const QuestionCheckboxPropsConfig: FC<QuestionCheckboxPropsType> = (
  props: QuestionCheckboxPropsType
) => {
  const { t } = useTranslation();
  const {
    label,
    required,
    rowCount,
    options = [],
    isUseDic,
    dicId = '',
    defaultValue = [],
    onChange,
  } = props;
  const [form] = Form.useForm();
  // 字典
  const { options: stateDic, getDicOptionsById } = useGetOptions();

  // 布局选项
  const rowCountOptions = [
    {
      label: t('public.row', { i: 1 }),
      value: 1,
    },
    {
      label: t('public.row', { i: 2 }),
      value: 2,
      disabled: options?.length < 2,
    },
    {
      label: t('public.row', { i: 3 }),
      value: 3,
      disabled: options?.length < 3,
    },
  ];

  useEffect(() => {
    form.setFieldsValue({ label, required, rowCount, options, isUseDic, dicId, defaultValue });
  }, [props]);

  function handleValuesChange() {
    onChange && onChange(form.getFieldsValue());
  }

  // 显示自定义选项配置的删除键
  const [isShowRemove, setRemoveShow] = useState<boolean>(false);
  useEffect(() => {
    setRemoveShow(options.length > 1);
  }, [options]);

  const [radioOptions, setRadioOptions] = useState<OptionType[]>([]);
  useEffect(() => {
    async function setDicOptions() {
      const dicOptions = await getDicOptionsById(dicId);
      setRadioOptions(dicOptions);
    }
    if (isUseDic) {
      setDicOptions();
    } else {
      setRadioOptions(options);
    }
  }, [options, dicId, isUseDic]);

  useEffect(() => {
    const newDefault: string[] = [];
    radioOptions.forEach(o => {
      if (defaultValue.includes(o.key)) {
        newDefault.push(o.key);
      }
    });
    form.setFieldValue('defaultValue', newDefault);
  }, [radioOptions]);
  return (
    <div>
      <Form
        layout="vertical"
        form={form}
        initialValues={{ label, required, rowCount, options, isUseDic, dicId, defaultValue }}
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
        {/* 选项布局 */}
        <Form.Item label={t('question.rowCount')} name="rowCount">
          <Radio.Group options={rowCountOptions} optionType="button" />
        </Form.Item>
        {/* 是否使用字典 */}
        <Form.Item>
          <div className="flex items-center justify-between">
            <span className="mr-4">{t('question.isUseDic')}</span>
            <Form.Item name="isUseDic" valuePropName="checked" style={{ margin: 0 }}>
              <Switch />
            </Form.Item>
          </div>
        </Form.Item>
        {/* 自定义选项配置 */}
        {!isUseDic && (
          <Form.Item label={t('question.optionConfig')}>
            <Form.List name="options">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name }) => {
                    return (
                      <div key={key} className="flex items-center mb-5">
                        <Form.Item
                          name={[name, 'label']}
                          required
                          style={{ width: '100%', margin: 0 }}
                        >
                          <Input
                            required
                            style={{ width: '100%' }}
                            maxLength={DEFAULT_INPUT_MAX_LENGTH}
                            placeholder={t('question.placeholder.input')}
                          />
                        </Form.Item>
                        {isShowRemove && (
                          <MinusCircleOutlined
                            className="cursor-pointer ml-2"
                            onClick={() => remove(name)}
                          />
                        )}
                      </div>
                    );
                  })}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() =>
                        add({
                          label: t('public.optionIndex', { i: options.length + 1 }),
                          key: nanoid(),
                        })
                      }
                      block
                      icon={<PlusOutlined />}
                    >
                      {t('question.addOption')}
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </Form.Item>
        )}
        {/* 字典配置 */}
        {isUseDic && (
          <Form.Item label={t('question.selectDic')} name="dicId">
            <Select
              showSearch
              placeholder={t('question.selectDic')}
              fieldNames={{
                label: 'name',
                value: '_id',
              }}
              options={stateDic.map(i => ({ name: i.name, _id: i._id }))}
              filterOption={(input, option) => {
                return (option?.name ?? '').toLowerCase().includes(input.toLowerCase());
              }}
            />
          </Form.Item>
        )}
        {/* 默认选中 */}
        <Form.Item label={t('question.defaultSelect')} name="defaultValue">
          <Select
            allowClear
            showSearch
            mode="multiple"
            placeholder={t('question.defaultSelect')}
            options={radioOptions.map(i => ({ label: i.label, value: i.key }))}
            filterOption={(input, option) => {
              return (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
            }}
          />
        </Form.Item>
      </Form>
    </div>
  );
};

export default QuestionCheckboxPropsConfig;
