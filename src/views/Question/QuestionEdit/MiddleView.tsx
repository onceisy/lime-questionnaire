import React, { FC } from 'react';
import { Form } from 'antd';
import { useDispatch } from 'react-redux';
import { COMPONENT_COMMON_CLASS } from '@/constant/TailwindClassNames';
import { ComponentInfoType, setSelectedId } from '@/store/components';
import { getComponentConfByType } from './Components';
import { useGetComponentsState } from '@/hooks/useGetComponentsState';

const MiddleView: FC = () => {
  const dispatch = useDispatch();

  const { componentList, selectedId } = useGetComponentsState();

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
  return (
    <Form layout="vertical">
      {componentList.map(item => {
        return (
          <div
            className={`${COMPONENT_COMMON_CLASS} my-5 ${
              selectedId === item._id ? 'border-teal-400' : 'border-transparent'
            }`}
            key={item._id}
            onClick={() => handleSetSelectedId(item._id)}
          >
            {genComponent(item)}
          </div>
        );
      })}
    </Form>
  );
};

export default MiddleView;
