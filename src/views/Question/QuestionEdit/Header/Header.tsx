import React, { FC } from 'react';
import { Icon } from '@iconify/react';
import QuestionProps from '@/components/QuestionCard/QuestionProps';
import { useNavigate } from 'react-router-dom';
import { ROUTE_MANAGE_LIST } from '@/router/path';
import { Button, Space, Tooltip } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import ShortcutKeyTips from './ShortcutKeyTips';

const Header: FC<QuestionProps> = props => {
  const { title } = props;
  const nav = useNavigate();
  const { t } = useTranslation();
  return (
    <div className="h-14 flex px-6">
      {/* 顶部左侧 */}
      <div className="flex-1 flex items-center">
        <div className="flex items-center">
          <Icon
            icon="solar:home-smile-angle-bold"
            fontSize="18px"
            className="cursor-pointer"
            onClick={() => nav(ROUTE_MANAGE_LIST)}
          ></Icon>
          <span className="font-bold ml-3">{title}</span>
        </div>
      </div>
      {/* 顶部中间 */}
      <div className="flex-1 flex items-center justify-center">
        <div>middle</div>
      </div>
      {/* 顶部右侧 */}
      <div className="flex-1 flex items-center justify-end">
        <div>
          <Space>
            <Button type="primary" size="middle" ghost>
              预览
            </Button>
            <Button type="primary" size="middle">
              保存
            </Button>
            <Tooltip title={<ShortcutKeyTips></ShortcutKeyTips>}>
              <Button type="text" size="middle" icon={<QuestionCircleOutlined />}>
                {t('public.shortcutKeys')}
              </Button>
            </Tooltip>
          </Space>
        </div>
      </div>
    </div>
  );
};

export default Header;
