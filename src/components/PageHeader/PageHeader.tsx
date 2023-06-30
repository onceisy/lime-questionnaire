import React, { FC } from 'react';
import {
  Layout,
  Row,
  Col,
  Image,
  Dropdown,
  Space,
  MenuProps,
  Button,
  Switch,
  Typography,
} from 'antd';
import logoImage from '@/assets/images/logo.png';
import { DownOutlined, GithubOutlined } from '@ant-design/icons';
import type { LocaleType } from '@/store/localeSlice';
import { selectLanguage, setLocale } from '@/store/localeSlice';
import { useAppDispatch } from '@/store/hooks';
import { useAppSelector } from '@/store/hooks';
import { t } from 'i18next';
import { Icon } from '@iconify/react';
import { selectTheme, setTheme } from '@/store/themeSlice';
import { Link } from 'react-router-dom';
import { ROUTE_HOME } from '@/router/path';

const { Text } = Typography;
const { Header } = Layout;

const PageHeader: FC = () => {
  const dispatch = useAppDispatch();

  const items: MenuProps['items'] = [
    {
      key: 'zhCN',
      label: '简体中文',
    },
    {
      key: 'enUS',
      label: 'English',
    },
  ];
  const language = useAppSelector(selectLanguage);

  const theme = useAppSelector(selectTheme);

  function goGithub() {
    window.open('https://github.com/onceisy/lime-questionnaire');
  }

  return (
    <Header className="bg-transparent">
      <Row justify="space-around">
        <Col span={8} className="flex items-center justify-start">
          <Link to={ROUTE_HOME}>
            <div className="flex justify-start items-center">
              <Image width={40} preview={false} src={logoImage} />
              <h2 className="text-3xl font-bold ml-2 primary-text-gradient my-0">SurveyMe</h2>
            </div>
          </Link>
        </Col>
        <Col span={8}>
          <div className="flex justify-end items-center">
            <Space size={['middle', 'middle']}>
              <div className="flex items-center">
                <Image
                  width={40}
                  preview={false}
                  src="//file.lizhi334.cn/image/default_avatar.png"
                />
                <Text strong className="ml-3 mt-0 mb-0">
                  超级管理员
                </Text>
              </div>
              <Dropdown menu={{ items, onClick: e => dispatch(setLocale(e.key as LocaleType)) }}>
                <Button>
                  <Space>
                    {t(`public.${language}`)}
                    <DownOutlined />
                  </Space>
                </Button>
              </Dropdown>
              <Switch
                checkedChildren={
                  <span className="anticon anticon-check">
                    <Icon icon="material-symbols:light-mode-outline" />
                  </span>
                }
                unCheckedChildren={
                  <span className="anticon anticon-check">
                    <Icon icon="material-symbols:dark-mode-outline" />
                  </span>
                }
                defaultChecked={theme === 'light'}
                onChange={checked => dispatch(setTheme(checked ? 'light' : 'dark'))}
              />
              <GithubOutlined className="text-xl cursor-pointer" onClick={goGithub} />
            </Space>
          </div>
        </Col>
      </Row>
    </Header>
  );
};

export default PageHeader;
