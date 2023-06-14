import React, { FC } from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import styles from './MainLayout.module.scss';
import PageHeader from '@/components/PageHeader/PageHeader';

const { Footer, Content } = Layout;

const MainLayout: FC = () => {
  return (
    <div className={styles['main-container']}>
      <Layout>
        <PageHeader></PageHeader>
        <Content>
          <Outlet />
        </Content>
        <Footer className="bg-transparent text-center">Copyright © surveyme.com</Footer>
      </Layout>
    </div>
  );
};

export default MainLayout;
