import React, { FC } from 'react';
import { ComponentConfType, componentConfGroupList, getComponentConfByType } from '../Components';
import { Form, Popover, Space } from 'antd';
import { Icon } from '@iconify/react';
import {
  ComponentInfoType,
  ComponentTypesType,
  addComponentToList,
} from '@/store/questionInfoSlice';
import { nanoid } from 'nanoid';
import { useAppDispatch } from '@/store/hooks';
import { useTranslation } from 'react-i18next';
const ComponentLibrary: FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  function genComponent(componentInfo: ComponentInfoType) {
    const { type } = componentInfo; // 每个组件的信息，是从 redux store 获取的（服务端获取）

    const componentConf = getComponentConfByType(type);
    if (componentConf == null) return null;

    const { Component, defaultProps } = componentConf;
    return <Component {...defaultProps(t)} />;
  }

  function handleAddComponent(params: ComponentConfType) {
    const newComp: ComponentInfoType = {
      componentId: nanoid(),
      type: params.type as ComponentTypesType,
      name: '',
      props: params.defaultProps(t),
    };
    dispatch(addComponentToList(newComp));
  }
  return (
    <div className="mt-3">
      {componentConfGroupList.map(component => {
        const { _id, label, components } = component;
        return (
          <div key={_id} className="mt-4 first:mt-0">
            <h4 className="mt-0">{t(label)}</h4>
            <Space>
              {components.map(item => {
                return (
                  <Popover
                    key={item.type}
                    placement="rightTop"
                    title={t(item.name)}
                    content={
                      <Form layout="vertical" className="pointer-events-none">
                        {genComponent(item as ComponentInfoType)}
                      </Form>
                    }
                  >
                    <div
                      className="cursor-pointer flex items-center bg-gray-100 dark:bg-slate-900 px-3 py-1 rounded hover:bg-gray-200"
                      onClick={() => handleAddComponent(item)}
                    >
                      <div className="flex justify-center items-center mr-1">
                        <Icon icon={item.icon} />
                      </div>
                      <span>{t(item.name)}</span>
                    </div>
                  </Popover>
                );
              })}
            </Space>
          </div>
        );
      })}
    </div>
  );
};

export default ComponentLibrary;
