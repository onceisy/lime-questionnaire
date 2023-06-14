import React, { FC } from 'react';
import { Image, Button } from 'antd';
import IntroduceImage from '@/assets/images/introduce-right.png';
import styles from './Home.module.scss';
import { useNavigate } from 'react-router-dom';
import { ROUTE_SIGN_IN, ROUTE_SIGN_UP } from '@/router/path';

const Home: FC = () => {
  const nav = useNavigate();

  function goLogin() {
    nav(ROUTE_SIGN_IN);
  }
  function goSignUp() {
    nav(ROUTE_SIGN_UP);
  }

  return (
    <div className={styles.home}>
      <div className={styles['home-left']}>
        <h1 className={`${styles.title} font-bold`}>
          Generate Surveys and Online Forms in
          <span className={styles.gradient}> Minutes</span>
        </h1>
        <p className={styles.content}>
          Create forms and surveys that people want to answer, get more responses and clearer
          insights
        </p>
        <div className={styles.buttons}>
          <Button
            size="middle"
            className={`${styles['login-btn']} transition ease-in-out duration-150 hover:scale-110`}
            onClick={goLogin}
          >
            登陆
          </Button>
          <Button
            type="primary"
            size="middle"
            className={`${styles['signup-btn']} transition ease-in-out duration-150 hover:scale-110`}
            onClick={goSignUp}
          >
            免费体验
          </Button>
        </div>
      </div>
      <div className={styles['home-right']}>
        <Image width={600} preview={false} src={IntroduceImage} className="animate-bounce-5" />
      </div>
    </div>
  );
};

export default Home;
