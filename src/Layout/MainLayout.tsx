import React, { FC } from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';

const { Header, Footer, Content } = Layout;

const MainLayout: FC = () => {
  return (
    <>
      <Layout>
        <Header>Header</Header>
        <Content>
          <Outlet />
        </Content>
        <Footer>Footer</Footer>
      </Layout>
    </>
  );
};

export default MainLayout;
