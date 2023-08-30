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
  Divider,
} from 'antd';
import logoImage from '@/assets/images/logo.png';
import { DownOutlined, GithubOutlined } from '@ant-design/icons';
import type { LocaleType } from '@/store/localeSlice';
import { selectLanguage, setLocale } from '@/store/localeSlice';
import { useAppSelector } from '@/store/hooks';
import { Icon } from '@iconify/react';
import { selectTheme, setTheme } from '@/store/themeSlice';
import { Link, useLocation } from 'react-router-dom';
import { ROUTE_HOME, ROUTE_MANAGE_LIST } from '@/router/path';
import { clearUser, isUserLogin, selectUserInfo } from '@/store/userSlice';
import { useTranslation } from 'react-i18next';
import { persistor } from '@/store';
import { useDispatch } from 'react-redux';

const { Text } = Typography;
const { Header } = Layout;

const PageHeader: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isLogin = useAppSelector(isUserLogin);
  const { nickname, avatar } = useAppSelector(selectUserInfo);
  const { pathname } = useLocation();
  const language = useAppSelector(selectLanguage);
  const theme = useAppSelector(selectTheme);

  const localeItems: MenuProps['items'] = [
    {
      key: 'zhCN',
      label: '简体中文',
    },
    {
      key: 'enUS',
      label: 'English',
    },
  ];

  const userItems: MenuProps['items'] = [
    {
      key: 'logout',
      label: t('public.logout'),
      danger: true,
    },
  ];

  async function handleUserCLick(key: string) {
    switch (key) {
      case 'logout':
        await persistor.purge();
        dispatch(clearUser());
        break;
      default:
        break;
    }
  }

  function goGithub() {
    window.open('https://github.com/onceisy/lime-questionnaire');
  }

  return (
    <Header className="bg-transparent">
      <Row justify="space-around" style={{ height: '63px' }}>
        <Col span={8} className="flex items-center justify-start">
          <Link
            to={!isLogin || (isLogin && pathname !== ROUTE_HOME) ? ROUTE_HOME : ROUTE_MANAGE_LIST}
          >
            <div className="flex justify-start items-center">
              <Image width={36} preview={false} src={logoImage} />
              <h2 className="text-3xl font-bold ml-2 primary-text-gradient my-0">SurveyMe</h2>
            </div>
          </Link>
        </Col>
        <Col span={8}>
          <div className="flex justify-end items-center">
            <Space size={['middle', 'middle']}>
              <Dropdown
                disabled={!isLogin}
                menu={{
                  items: isLogin ? userItems : [],
                  onClick: e => handleUserCLick(e.key),
                }}
              >
                <div className="flex items-center cursor-pointer">
                  <Image
                    width={36}
                    height={36}
                    preview={false}
                    src={avatar}
                    rootClassName="rounded-full flex overflow-hidden"
                  />
                  <Text strong className="ml-3 mt-0 mb-0">
                    {isLogin ? nickname : t('public.notLogin')}
                  </Text>
                </div>
              </Dropdown>
              <Dropdown
                menu={{
                  items: localeItems,
                  onClick: e => dispatch(setLocale(e.key as LocaleType)),
                }}
              >
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
              <GithubOutlined className="text-xl cursor-pointer align-middle" onClick={goGithub} />
            </Space>
          </div>
        </Col>
      </Row>
      <Divider className="my-0" />
    </Header>
  );
};

export default PageHeader;
