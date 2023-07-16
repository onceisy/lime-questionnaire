import React, { FC, useEffect, useState } from 'react';
import { Layout, Menu, MenuProps } from 'antd';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  ROUTE_CONFIG,
  ROUTE_MANAGE_LIST,
  ROUTE_MANAGE_STAR,
  ROUTE_MANAGE_TRASH,
} from '@/router/path';
import {
  UnorderedListOutlined,
  DeleteOutlined,
  StarOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import CreateQuestion from '@/components/CreateQuestion/CreateQuestion';

const { Sider, Content } = Layout;

const ManageLayout: FC = () => {
  const { t } = useTranslation();
  const nav = useNavigate();

  const items: MenuProps['items'] = [
    {
      label: t('manage.myQuestionnaire'),
      key: ROUTE_MANAGE_LIST,
      icon: <UnorderedListOutlined />,
    },
    {
      label: t('manage.starQuestionnaire'),
      key: ROUTE_MANAGE_STAR,
      icon: <StarOutlined />,
    },
    {
      label: t('public.trash'),
      key: ROUTE_MANAGE_TRASH,
      icon: <DeleteOutlined />,
    },
    {
      label: t('public.systemConfig'),
      key: ROUTE_CONFIG,
      icon: <SettingOutlined />,
    },
  ];

  const clickMenu: MenuProps['onClick'] = e => {
    if (e.key !== selectedKeys[0]) {
      nav(e.key);
    }
  };

  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  useEffect(() => {
    // 如果是在设置页面，不需要重新选中
    if (location.pathname.includes(ROUTE_CONFIG) && location.pathname !== ROUTE_CONFIG) {
      setSelectedKeys([ROUTE_CONFIG]);
      return;
    }
    setSelectedKeys([location.pathname]);
  }, [location]);
  return (
    <div className="px-6 mx-auto w-1200">
      <Layout className="rounded-lg">
        <Sider theme="light" className="rounded-l-lg">
          <div className="h-full px-3 py-10 text-center">
            <CreateQuestion />
            <Menu
              style={{ border: 'none' }}
              items={items}
              onClick={clickMenu}
              selectedKeys={selectedKeys}
            />
          </div>
        </Sider>
        <Content style={{ overflow: 'initial' }} className="rounded-lg">
          <Outlet />
        </Content>
      </Layout>
    </div>
  );
};

export default ManageLayout;
