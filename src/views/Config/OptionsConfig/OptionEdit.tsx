import React, { FC, useEffect, useState } from 'react';
import { Button, Modal, Form, Input, Radio, Space, App } from 'antd';
import { useTranslation } from 'react-i18next';
import { nanoid } from 'nanoid';
import { produce } from 'immer';
import { calculateLevel, getTreeNodeByLevel } from '@/utils/tree';
import { useRequest } from 'ahooks';
import { createOptions, queryOptionsById, updateOptionsById } from '@/service/config';
import { cloneDeep } from 'lodash';
import Loading from '@/components/Loading/Loading';

interface OptionEditPropsType {
  _id?: string;
  visible: boolean;
  setVisible: (data: boolean) => void;
  refreshList: () => void;
}

// 字典整体类型
export interface OptionDicType {
  name: string;
  level: number;
  options: OptionType[];
  _id?: string;
}

// 选项及子集类型
export interface OptionType {
  label: string;
  key: string;
  isSelected?: boolean;
  children?: OptionType[];
}

const initialOptions: OptionType = {
  label: '',
  key: '',
  // 这里开始才是服务端储存的真实数据，相当于level要 -1
  children: [
    {
      label: '',
      key: nanoid(),
      children: [],
    },
  ],
};

const AddOptions: FC<OptionEditPropsType> = (props: OptionEditPropsType) => {
  const { message } = App.useApp();
  const { t } = useTranslation();

  const { visible, setVisible, _id = '', refreshList } = props;

  const { loading: initLoading, run: handleQueryOption } = useRequest(queryOptionsById, {
    manual: true,
    onSuccess: res => {
      const data = cloneDeep(initialOptions);
      data.children = res.data.options;
      setCascades(data);
      form.setFieldsValue({ level: res.data.level, name: res.data.name });
    },
  });

  useEffect(() => {
    if (_id) {
      handleQueryOption(_id);
    } else {
      setCascades(initialOptions);
      form.resetFields();
    }
  }, [_id]);

  const { loading: createLoading, run: handleCreateOptions } = useRequest(createOptions, {
    manual: true,
    onSuccess: () => {
      message.success(t('config.createDicSuccess'));
      form.resetFields();
      setCascades(initialOptions);
      setVisible(false);
      refreshList();
    },
  });
  const { loading: updateLoading, run: handleUpdateOptions } = useRequest(updateOptionsById, {
    manual: true,
    onSuccess: () => {
      message.success(t('config.updateDicSuccess'));
      // form.resetFields();
      // setCascades(initialOptions);
      setVisible(false);
      refreshList();
    },
  });

  function handleCancel() {
    setVisible(false);
  }

  const levels: number[] = [1, 2, 3, 4, 5];
  const [form] = Form.useForm();
  const formLevel = Form.useWatch('level', form);

  const [cascades, setCascades] = useState<OptionType>(initialOptions);

  /**
   * @description: 添加层级子项
   * @param {string} id
   * @return {*}
   */
  function handleAddCascade(id: string) {
    const newOption: OptionType = {
      label: '',
      key: nanoid(),
      isSelected: false,
      children: [],
    };
    function addOptionsToTree(list: OptionType[]) {
      for (const item of list) {
        if (item.key === id) {
          item.children?.push(newOption);
          break;
        }
        if (item.children?.length) {
          addOptionsToTree(item.children);
        }
      }
    }
    if (!id) {
      setCascades(
        produce(draft => {
          draft.children?.push(newOption);
        })
      );
    } else {
      setCascades(
        produce(draft => {
          if (draft.children) {
            addOptionsToTree(draft.children);
          }
        })
      );
    }
  }

  function handleDeleteCascade(id: string) {
    function deleteOption(list: OptionType[]) {
      for (const item of list) {
        if (item.key === id) {
          const index = list.findIndex(i => i.key === id);
          list.splice(index, 1);
          break;
        }
        if (item.children?.length) {
          deleteOption(item.children);
        }
      }
    }
    setCascades(
      produce(draft => {
        if (draft.children) {
          deleteOption(draft.children);
        }
      })
    );
  }

  /**
   * @description: 级联的输入框值改变，同步修改cascades
   * @param {React} e
   * @param {string} id
   * @return {*}
   */
  function onInputChange(e: React.ChangeEvent<HTMLInputElement>, id: string) {
    function setOptionLabel(list: OptionType[], label: string) {
      for (const item of list) {
        if (item.key === id) {
          item.label = label;
          break;
        }
        if (item.children?.length) {
          setOptionLabel(item.children, label);
        }
      }
    }
    setCascades(
      produce(draft => {
        if (draft.children) {
          setOptionLabel(draft.children, e.target.value);
        }
      })
    );
  }

  /**
   * @description: 级联的输入框聚焦，添加选中的样式
   * @param {React} e
   * @param {string} id
   * @return {*}
   */
  function onInputFocus(e: React.ChangeEvent<HTMLInputElement>, id: string) {
    function setOptionSelected(list: OptionType[]) {
      for (const item of list) {
        if (item.key === id) {
          list.forEach(i => (i.isSelected = false));
          item.isSelected = true;
          break;
        }
        if (item.children?.length) {
          setOptionSelected(item.children);
        }
      }
    }
    setCascades(
      produce(draft => {
        if (draft.children) {
          setOptionSelected(draft.children);
        }
      })
    );
  }

  async function onFinish(values: object) {
    // 检查字典内容是否填写完整
    let count = 0;
    function validateLabel(list: OptionType[]) {
      for (const item of list) {
        if (!item.label) {
          count++;
        }
        if (item.children) {
          validateLabel(item.children);
        }
      }
    }
    const options = getTreeNodeByLevel(cascades, formLevel);
    options.children && validateLabel(options.children);
    if (count > 0) {
      message.error(t('config.requiredCount', { count }));
      return;
    }
    const params = {
      ...values,
      options: options.children || [],
    };
    if (!_id) {
      handleCreateOptions(params as OptionDicType);
    } else {
      await handleUpdateOptions(_id, params as OptionDicType);
      const data = cloneDeep(initialOptions);
      data.children = params.options;
      setCascades(data);
    }
  }

  const renderView: FC<OptionType> = (option: OptionType) => {
    const selectedOption: OptionType | undefined = option.children?.find(i => i.isSelected);

    return (
      <>
        <div className="border border-solid border-gray-100 dark:border-gray-800">
          <ul className="w-60 h-80 overflow-y-scroll m-0">
            {initLoading ? (
              <Loading top={80}></Loading>
            ) : (
              option.children?.map(item => {
                return (
                  <li
                    key={item.key}
                    className={`px-1 flex items-center ${
                      item.isSelected ? 'bg-slate-200 dark:bg-black' : ''
                    }`}
                  >
                    <Space>
                      <Input
                        placeholder={t('question.placeholder.input')}
                        bordered={false}
                        value={item.label}
                        onChange={e => onInputChange(e, item.key)}
                        onFocus={e => onInputFocus(e, item.key)}
                      ></Input>
                      <Button
                        type="text"
                        danger
                        size="middle"
                        onClick={() => handleDeleteCascade(item.key)}
                      >
                        {t('public.delete')}
                      </Button>
                    </Space>
                  </li>
                );
              })
            )}
          </ul>
          <div className="text-center py-3">
            <Button type="primary" onClick={() => handleAddCascade(option.key)}>
              添加
            </Button>
          </div>
        </div>
        {selectedOption &&
          selectedOption.children &&
          calculateLevel(cascades, selectedOption.key) < formLevel &&
          renderView(selectedOption)}
      </>
    );
  };

  return (
    <>
      <Modal
        open={visible}
        title={t('config.addDic')}
        maskClosable={false}
        width={1200}
        footer={null}
        closeIcon={null}
        keyboard={false}
      >
        <div>
          <Form layout="vertical" form={form} initialValues={{ level: 1 }} onFinish={onFinish}>
            <Form.Item
              name="name"
              label={t('config.dicName')}
              rules={[
                { required: true, message: t('config.dicNameRequired') },
                { type: 'string', min: 1, max: 12, message: t('user.usernameLengthTips') || '' },
              ]}
            >
              <Input placeholder={t('config.dicNameRequired')} />
            </Form.Item>
            {/* 层级 */}
            <Form.Item name="level" label={t('config.maxLevel')}>
              <Radio.Group buttonStyle="solid">
                {levels.map(level => {
                  return (
                    <Radio.Button key={level} value={level}>
                      {t('config.setLevel', { level })}
                    </Radio.Button>
                  );
                })}
              </Radio.Group>
            </Form.Item>
            {/* 字典配置 */}
            <div>
              <Space>{renderView(cascades)}</Space>
              {/* <OptionEditView
                option={cascades}
                maxLevel={form.getFieldValue('level')}
              ></OptionEditView> */}
            </div>
            <div className="text-center mt-5">
              <Space>
                <Button onClick={handleCancel}>{t('public.cancel')}</Button>
                <Button
                  htmlType="submit"
                  type="primary"
                  loading={_id ? updateLoading : createLoading}
                >
                  {t('public.save')}
                </Button>
              </Space>
            </div>
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default AddOptions;
