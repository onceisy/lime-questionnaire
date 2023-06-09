import React, { FC } from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import styled from './ManageLayout.module.scss';

const { Sider, Content } = Layout;

const ManageLayout: FC = () => {
  return (
    <div className={styled.container}>
      <Layout>
        <Sider theme="light"></Sider>
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <Outlet />
        </Content>
      </Layout>
    </div>
  );
};

export default ManageLayout;
