import React, { FC } from 'react';
import { Layout, Row, Col, Image, Dropdown, Space, MenuProps, Button } from 'antd';
import logoImage from '@/assets/images/logo.png';
import { DownOutlined } from '@ant-design/icons';

const { Header } = Layout;

const PageHeader: FC = () => {
  const items: MenuProps['items'] = [
    {
      key: 'zh-cn',
      label: '简体中文',
    },
    {
      key: 'en',
      label: 'English',
    },
  ];

  return (
    <Header className="bg-transparent">
      <Row justify="space-around">
        <Col span={8} className="flex items-center justify-start">
          <div className="flex justify-start items-center">
            <Image width={40} preview={false} src={logoImage} />
            <h2 className="text-3xl font-bold ml-3 primary-text-gradient my-0">SurveyMe</h2>
          </div>
        </Col>
        <Col span={8}>
          <div className="flex justify-end items-center">
            <Image width={40} preview={false} src="//file.lizhi334.cn/image/default_avatar.png" />
            <h3 className="ml-3 mr-3 mt-0 mb-0">超级管理员</h3>
            <Dropdown menu={{ items }}>
              <Button>
                <Space>
                  语言
                  <DownOutlined />
                </Space>
              </Button>
            </Dropdown>
          </div>
        </Col>
      </Row>
    </Header>
  );
};

export default PageHeader;
