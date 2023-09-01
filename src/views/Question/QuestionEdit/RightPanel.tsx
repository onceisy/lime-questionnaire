import React, { FC } from 'react';
import { Empty, Tabs } from 'antd';
import { useTranslation } from 'react-i18next';
import { useGetComponentsState } from '@/hooks/useGetComponentsState';
import { ComponentPropsType, getComponentConfByType } from './Components';
import { useDispatch } from 'react-redux';
import { updateComponentPropsById } from '@/store/questionInfoSlice';

const RightPanel: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { selectedComponent, selectedId } = useGetComponentsState();

  /**
   * @description: 更新组件的props
   * @param {ComponentPropsType} params
   * @return {*}
   */
  function changeComponentProps(params: ComponentPropsType) {
    if (selectedId) {
      dispatch(updateComponentPropsById({ id: selectedId, props: params }));
    }
  }

  /**
   * @description: 获取属性配置的组件
   * @return {FC}
   */
  function getPropsConfComponent() {
    const empty = (
      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={t('question.selectComponent')} />
    );
    if (!selectedId || !selectedComponent) return empty;
    const conf = getComponentConfByType(selectedComponent.type);
    if (!conf) return empty;
    const { PropsConfComponent } = conf;
    return (
      <PropsConfComponent
        {...selectedComponent.props}
        onChange={changeComponentProps}
      ></PropsConfComponent>
    );
  }

  const items = [
    {
      label: t('question.props'),
      key: 'componentProps',
      children: getPropsConfComponent(),
    },
    {
      label: '页面设置',
      key: 'pageSetting',
      children: '2222',
    },
  ];
  return (
    <div className="px-5">
      <Tabs defaultActiveKey="2" items={items} />
    </div>
  );
};

export default RightPanel;
