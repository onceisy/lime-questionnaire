import React, { FC } from 'react';
import { Icon } from '@iconify/react';
import { FundProjectionScreenOutlined, BarChartOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { ROUTE_MANAGE_LIST } from '@/router/path';
import { Segmented, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import type { SegmentedValue } from 'antd/es/segmented';

interface StatisticHeaderPropsType {
  value: string;
  title: string;
  onChange: (tab: SegmentedValue) => void;
}

const StatisticHeader: FC<StatisticHeaderPropsType> = (props: StatisticHeaderPropsType) => {
  const nav = useNavigate();
  const { t } = useTranslation();

  const { value, onChange, title } = props;
  const options = [
    {
      label: t('statistic.basicData'),
      value: 'basicData',
      icon: <BarChartOutlined />,
    },
    {
      label: t('statistic.questionReport'),
      value: 'questionReport',
      icon: <FundProjectionScreenOutlined />,
    },
  ];
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
        <Segmented options={options} value={value} onChange={onChange} />
      </div>
      {/* 顶部右侧 */}
      <div className="flex-1 flex items-center justify-end"></div>
    </div>
  );
};

export default StatisticHeader;
