import React, { FC } from 'react';
import { Image, Button } from 'antd';
import IntroduceImage from '@/assets/images/introduce-right.png';
import styles from './Home.module.scss';
import { useNavigate } from 'react-router-dom';
import { ROUTE_SIGN_IN, ROUTE_SIGN_UP } from '@/router/path';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '@/store/hooks';
import { isUserLogin } from '@/store/userSlice';

const Home: FC = () => {
  const nav = useNavigate();
  const { t } = useTranslation();

  const isLogin = useAppSelector(isUserLogin);

  return (
    <div className={styles.home}>
      <div className={styles['home-left']}>
        <h1 className={`${styles.title} font-bold`}>
          {t('home.titlePre')}
          <span className={styles.gradient}> {t('home.titleEnd')}</span>
        </h1>
        <p className={styles.content}>{t('home.description')}</p>
        {!isLogin && (
          <div className={styles.buttons}>
            <Button
              size="middle"
              className={`${styles['login-btn']} transition ease-in-out duration-150 hover:scale-110`}
              onClick={() => nav(ROUTE_SIGN_IN)}
            >
              {t('public.signIn')}
            </Button>
            <Button
              type="primary"
              size="middle"
              className={`${styles['signup-btn']} transition ease-in-out duration-150 hover:scale-110`}
              onClick={() => nav(ROUTE_SIGN_UP)}
            >
              {t('public.signUpFree')}
            </Button>
          </div>
        )}
      </div>
      <div className={styles['home-right']}>
        <Image width={600} preview={false} src={IntroduceImage} className="animate-bounce-5" />
      </div>
    </div>
  );
};

export default Home;
