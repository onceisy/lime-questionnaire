import React, { FC, useEffect, useState } from 'react';
import { Layout, Menu, MenuProps } from 'antd';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { ROUTE_MANAGE_LIST, ROUTE_MANAGE_STAR, ROUTE_MANAGE_TRASH } from '@/router/path';
import { UnorderedListOutlined, DeleteOutlined, StarOutlined } from '@ant-design/icons';
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
  ];

  const clickMenu: MenuProps['onClick'] = e => {
    nav(e.key);
  };

  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  useEffect(() => {
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
        <Content
          style={{ padding: '16px 16px 0 16px', overflow: 'initial' }}
          className="rounded-lg"
        >
          <Outlet />
        </Content>
      </Layout>
    </div>
  );
};

export default ManageLayout;
