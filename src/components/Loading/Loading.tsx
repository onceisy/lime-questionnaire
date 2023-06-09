import React, { FC } from 'react';
import type LoadingProps from './LoadingProps';
import { Spin } from 'antd';
import styles from './Loading.module.scss';

const Loading: FC<LoadingProps> = (props: LoadingProps) => {
  return (
    <div className={styles.loading}>
      <Spin></Spin>
    </div>
  );
};
export default Loading;
