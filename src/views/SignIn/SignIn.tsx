import React, { FC, useEffect } from 'react';
import { Carousel, Form, Input, Button, Checkbox, App } from 'antd';
import { ROUTE_SIGN_UP } from '@/router/path';
import { useTranslation } from 'react-i18next';
import bg1 from '@/assets/images/login-banner.png';
import { LockOutlined, UserOutlined } from '@ant-design/icons';

interface AccountProp {
  username: string;
  password: string;
  time?: number;
}

const SignIn: FC = () => {
  const { message } = App.useApp();

  const [form] = Form.useForm();

  // eslint-disable-next-line
  function onFinish(values: any) {
    console.log(values);
    console.log('sign up');
    const { username, password, remember } = values;
    // 正式环境，接口调用成功再保存
    setUserToLocal(username, password, remember);
  }

  /**
   * @description: 记住账号到本地
   * @param {string} username 用户名
   * @param {string} password 密码
   * @param {boolean} remember 是否记住密码
   * @return {*}
   */
  function setUserToLocal(username: string, password: string, remember: boolean) {
    const accountsStr = localStorage.getItem('accounts') || '[]';
    let accounts: Array<AccountProp> = [];
    try {
      const arr = JSON.parse(accountsStr);
      if (Array.isArray(arr)) {
        accounts = arr;
      }
    } catch (error) {
      console.error(error);
    }
    const index = accounts.findIndex(item => item.username === username);
    if (index > -1) {
      accounts.splice(index, 1);
    }
    if (remember) {
      accounts.push({ username, password, time: new Date().getTime() });
    }
    localStorage.setItem('accounts', JSON.stringify(accounts));
  }

  /**
   * @description: 获取本地存储最新的账户
   * @return {Array<AccountProp>}
   */
  function getUserFromLocal() {
    const accountsStr = localStorage.getItem('accounts') || '[]';
    let accounts: Array<AccountProp> = [];
    try {
      const arr = JSON.parse(accountsStr);
      if (Array.isArray(arr)) {
        accounts = arr;
      }
    } catch (error) {
      console.error(error);
    }
    return accounts;
  }

  /**
   * @description: 自动填充已经记住的密码
   * @param {any} changed
   * @return {*}
   */
  // eslint-disable-next-line
  function onFieldsChange(changed: any) {
    if (changed.length && changed[0].name[0] === 'username') {
      console.log(changed);
      const accounts = getUserFromLocal();
      if (accounts.length) {
        const account = accounts.find(i => i.username === changed[0].value);
        if (account) {
          form.setFieldsValue({ password: account.password });
        }
      }
    }
  }
  useEffect(() => {
    const accounts = getUserFromLocal();
    if (accounts.length) {
      form.setFieldsValue(accounts[accounts.length - 1]);
    }
  }, []);
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
        <div className="h-2/5 bg-white dark:bg-neutral-950 w-2/3 p-10 rounded-lg flex items-center">
          <div className="w-full">
            <h3 className="text-center my-5">{t('public.signIn')}</h3>
            <Form
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              onFieldsChange={onFieldsChange}
              autoComplete="off"
              form={form}
              initialValues={{ remember: true }}
            >
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
              <Form.Item required={false} name="remember" valuePropName="checked">
                <Checkbox>{t('user.rememberPWD')}</Checkbox>
              </Form.Item>

              <Form.Item noStyle>
                <div className="flex justify-between px-1">
                  <Button type="primary" htmlType="submit">
                    {t('public.signIn')}
                  </Button>
                  <Button
                    type="link"
                    href={'#'}
                    onClick={e => {
                      e.preventDefault();
                      message.warning(t('public.developing'));
                    }}
                  >
                    {t('user.forgetPWD')}
                  </Button>
                </div>
              </Form.Item>
            </Form>
            <div className="my-4">
              <Button type="link" href={ROUTE_SIGN_UP}>
                {t('user.accountToSignUp')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
