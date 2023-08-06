import React, { FC } from 'react';
import { Tabs } from 'antd';
import ComponentLibrary from './ComponentLibrary';
import { useTranslation } from 'react-i18next';

const LeftPanel: FC = () => {
  const { t } = useTranslation();
  const items = [
    {
      label: t('question.componentLibrary'),
      key: 'componentLibrary',
      children: <ComponentLibrary></ComponentLibrary>,
    },
    {
      label: '大纲',
      key: 'componentList',
      children: '2222',
    },
  ];
  return (
    <div className="px-5">
      <Tabs defaultActiveKey="componentLibrary" items={items} />
    </div>
  );
};

export default LeftPanel;
