import { ROUTE_CONFIG_OPTIONS, ROUTE_CONFIG_USER } from '@/router/path';
import { Icon } from '@iconify/react';
import { Menu, MenuProps } from 'antd';
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

const ConfigIndex: FC = () => {
  const nav = useNavigate();
  const { t } = useTranslation();
  const location = useLocation();
  const items: MenuProps['items'] = [
    {
      label: t('config.options'),
      key: ROUTE_CONFIG_OPTIONS,
      icon: <Icon icon="solar:case-round-minimalistic-bold"></Icon>,
    },
    {
      label: t('config.userInfo'),
      key: ROUTE_CONFIG_USER,
      icon: <Icon icon="carbon:user-avatar-filled"></Icon>,
    },
  ];
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  const clickMenu: MenuProps['onClick'] = e => {
    if (e.key !== selectedKeys[0]) {
      nav(e.key);
    }
  };
  useEffect(() => {
    setSelectedKeys([location.pathname]);
  }, [location]);
  return (
    <div className="pl-5">
      <Menu
        mode="horizontal"
        style={{ border: 'none' }}
        items={items}
        onClick={clickMenu}
        selectedKeys={selectedKeys}
      />
      <Outlet></Outlet>
    </div>
  );
};
export default ConfigIndex;
