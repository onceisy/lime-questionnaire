import React, { FC } from 'react';
import { Tabs } from 'antd';
import ComponentLibrary from './ComponentLibrary';
import { useTranslation } from 'react-i18next';

const LeftPanel: FC = () => {
  const { t } = useTranslation();
  const items = [
    {
      label: '',
      key: t('question.componentLibrary'),
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
      <Tabs defaultActiveKey="2" items={items} />
    </div>
  );
};

export default LeftPanel;
