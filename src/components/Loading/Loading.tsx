import React, { FC } from 'react';
import type LoadingProps from './LoadingProps';
import { Spin } from 'antd';

const Loading: FC<LoadingProps> = (props: LoadingProps) => {
  const { isFullScreen, top, className } = props;

  return (
    <div
      style={{ marginTop: `${typeof top === 'string' ? top : top + 'px'}` }}
      className={`text-center ${className} ${
        isFullScreen ? 'h-full flex items-center justify-center' : ''
      }`}
    >
      <Spin></Spin>
    </div>
  );
};
export default Loading;
