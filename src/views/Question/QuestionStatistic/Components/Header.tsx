import React, { FC } from 'react';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import { ROUTE_MANAGE_LIST } from '@/router/path';
import { App, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { useGetComponentsState } from '@/hooks/useGetComponentsState';
import { useDispatch } from 'react-redux';

const StatisticHeader: FC = () => {
  const { message } = App.useApp();
  const nav = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { _id, title, componentList } = useGetComponentsState();

  return (
    <div className="h-14 flex px-6">
      {/* 顶部左侧 */}
      <div className="flex-1 flex items-center">
        {/* title */}
        <div className="flex items-center">
          <Icon
            icon="solar:home-smile-angle-bold"
            fontSize="18px"
            className="cursor-pointer"
            onClick={() => nav(ROUTE_MANAGE_LIST)}
          ></Icon>
          <Typography.Text strong style={{ margin: 0, marginLeft: 12 }}>
            {title}
          </Typography.Text>
        </div>
      </div>
      {/* 顶部中间 */}
      <div className="flex-1 flex items-center justify-center">
        <div>middle</div>
      </div>
      {/* 顶部右侧 */}
      <div className="flex-1 flex items-center justify-end"></div>
    </div>
  );
};

export default StatisticHeader;
