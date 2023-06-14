import React, { FC, useEffect, useState } from 'react';
import { Layout, Menu, MenuProps, Button } from 'antd';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { ROUTE_MANAGE_LIST, ROUTE_MANAGE_STAR, ROUTE_MANAGE_TRASH } from '@/router/path';
import {
  UnorderedListOutlined,
  DeleteOutlined,
  PlusOutlined,
  StarOutlined,
} from '@ant-design/icons';

const { Sider, Content } = Layout;

const ManageLayout: FC = () => {
  const items: MenuProps['items'] = [
    {
      label: '我的问卷',
      key: ROUTE_MANAGE_LIST,
      icon: <UnorderedListOutlined />,
    },
    {
      label: '星标问卷',
      key: ROUTE_MANAGE_STAR,
      icon: <StarOutlined />,
    },
    {
      label: '回 收 站',
      key: ROUTE_MANAGE_TRASH,
      icon: <DeleteOutlined />,
    },
  ];

  const nav = useNavigate();
  const clickMenu: MenuProps['onClick'] = e => {
    nav(e.key);
  };

  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  useEffect(() => {
    console.log(location);
    setSelectedKeys([location.pathname]);
  }, [location]);
  return (
    <div className="w-8/12 px-6 mx-auto">
      <Layout className="rounded-lg">
        <Sider theme="light" className="rounded-l-lg">
          <div className="h-full px-3 py-10 text-center">
            <Button type="primary" icon={<PlusOutlined />} className="mb-10">
              创建问卷
            </Button>
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
