import React, { FC } from 'react';
import { Carousel, Form, Input, Button } from 'antd';
import { ROUTE_SIGN_IN } from '@/router/path';
import { useTranslation } from 'react-i18next';
import bg1 from '@/assets/images/login-banner.png';
import { LockOutlined, UserOutlined } from '@ant-design/icons';

const SignUp: FC = () => {
  // eslint-disable-next-line
  function onFinish(values: any) {
    console.log(values);
    console.log('sign up');
  }
  function onFinishFailed() {
    console.log('fail');
  }
  const { t } = useTranslation();
  return (
    <div className={'mx-auto flex'}>
      <div className="w-2/3">
        <Carousel>
          <div>
            <div
              style={{ backgroundImage: `url(${bg1})`, backgroundSize: '50%' }}
              className="bg-center bg-no-repeat h-full min-h-content"
            ></div>
          </div>
        </Carousel>
      </div>
      <div className="w-1/3 flex items-center">
        <div className="text-center h-2/5 bg-white dark:bg-neutral-950 w-2/3 p-10 rounded-lg flex items-center">
          <div className="w-full">
            <h3 className="text-center my-5">{t('public.signUp')}</h3>
            <Form onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
              <Form.Item
                required={false}
                label={t('user.usernameSpace')}
                name="username"
                rules={[
                  { required: true, message: t('user.usernameRequired') || '' },
                  { type: 'string', min: 5, max: 16, message: t('user.usernameLengthTips') || '' },
                  {
                    pattern: /^[a-zA-Z][a-zA-Z0-9_]{4,15}$/,
                    message: t('user.usernameFormatTips') || '',
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder={t('user.usernameRequired') || ''}
                />
              </Form.Item>
              <Form.Item
                required={false}
                label={t('user.setPWD')}
                name="password"
                rules={[
                  { required: true, message: t('user.pwdRequired') || '' },
                  { type: 'string', min: 6, max: 18, message: t('user.passwordLengthTips') || '' },
                  { pattern: /^[a-zA-Z]\w{5,17}$/, message: t('user.usernameFormatTips') || '' },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  placeholder={t('user.pwdRequired') || ''}
                />
              </Form.Item>
              <Form.Item
                required={false}
                label={t('user.confirmPWD')}
                name="rePassword"
                dependencies={['password']}
                rules={[
                  { required: true, message: t('user.pwdRequired2') || '' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error(t('user.passwordNotMatch') || ''));
                    },
                  }),
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  placeholder={t('user.pwdRequired') || ''}
                />
              </Form.Item>

              <Form.Item noStyle>
                <div className="flex justify-between px-1">
                  <Button type="primary" htmlType="submit" className="w-full">
                    {t('public.signUp')}
                  </Button>
                </div>
              </Form.Item>
            </Form>
            <div className="my-4">
              <Button type="link" href={ROUTE_SIGN_IN}>
                {t('user.accountToSignIn')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
