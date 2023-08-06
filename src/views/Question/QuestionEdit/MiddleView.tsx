import React, { FC } from 'react';
import { Empty, Form } from 'antd';
import { useDispatch } from 'react-redux';
import { COMPONENT_COMMON_CLASS } from '@/constant/TailwindClassNames';
import { ComponentInfoType, setSelectedId } from '@/store/components';
import { getComponentConfByType } from './Components';
import { useGetComponentsState } from '@/hooks/useGetComponentsState';
import ComponentRightEdit from './Components/ComponentRightEdit';
import { useBindComponentListEvents } from '@/hooks/useBindComponentListEvents';
import { useTranslation } from 'react-i18next';

const MiddleView: FC = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { componentList, selectedId } = useGetComponentsState();
  useBindComponentListEvents();
  /**
   * @description: 获取显示的组件
   * @param {ComponentInfoType} componentInfo
   * @return {*}
   */
  function genComponent(componentInfo: ComponentInfoType) {
    const { type, props } = componentInfo; // 每个组件的信息，是从 redux store 获取的（服务端获取）

    const componentConf = getComponentConfByType(type);
    if (componentConf == null) return null;

    const { Component } = componentConf;
    return <Component {...props} />;
  }

  /**
   * @description: 选中组件
   * @param {string} id
   * @return {*}
   */
  function handleSetSelectedId(id: string) {
    dispatch(setSelectedId(id));
  }
  return componentList.length ? (
    <Form layout="vertical">
      {componentList.map(item => {
        return (
          <div
            className={`${COMPONENT_COMMON_CLASS} my-5 relative group ${
              selectedId === item._id ? 'border-teal-400' : 'border-transparent'
            }`}
            key={item._id}
            onClick={() => handleSetSelectedId(item._id)}
          >
            <ComponentRightEdit
              className="hidden group-hover:block"
              _id={item._id}
            ></ComponentRightEdit>
            {genComponent(item)}
          </div>
        );
      })}
    </Form>
  ) : (
    <div className="h-full flex items-center justify-center">
      <Empty description={t('manage.noComponent')}></Empty>
    </div>
  );
};

export default MiddleView;
