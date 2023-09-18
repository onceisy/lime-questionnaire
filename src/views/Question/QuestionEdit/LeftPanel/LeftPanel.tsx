import React, { FC } from 'react';
import { Tabs } from 'antd';
import ComponentLibrary from './ComponentLibrary';
import { useTranslation } from 'react-i18next';
import ComponentList from './ComponentList';

const LeftPanel: FC = () => {
  const { t } = useTranslation();
  const items = [
    {
      label: t('question.componentLibrary'),
      key: 'componentLibrary',
      children: <ComponentLibrary></ComponentLibrary>,
    },
    {
      label: t('question.outline'),
      key: 'componentList',
      children: <ComponentList></ComponentList>,
    },
  ];
  return (
    <div className="px-5">
      <Tabs tabBarStyle={{ marginBottom: 0 }} defaultActiveKey="componentLibrary" items={items} />
    </div>
  );
};

export default LeftPanel;
