import React, { FC } from 'react';
import { Layout } from 'antd';
import { Outlet, useLocation } from 'react-router-dom';
import styles from './MainLayout.module.scss';
import PageHeader from '@/components/PageHeader/PageHeader';
import { useAppSelector } from '@/store/hooks';
import { selectTheme } from '@/store/themeSlice';
import useNavPage from '@/hooks/useNavPage';

const { Footer, Content } = Layout;

const MainLayout: FC = () => {
  const theme = useAppSelector(selectTheme);
  const location = useLocation();
  useNavPage();
  return (
    <div
      className={
        styles['main-container'] +
        ` ${styles[theme]}` +
        ` ${location.pathname === '/' ? styles.home : ''}`
      }
    >
      <Layout className="bg-white dark:bg-black">
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
