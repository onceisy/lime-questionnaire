import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { App, ConfigProvider } from 'antd';
import router from './router';
import { useAppSelector } from './store/hooks';
import { selectLocale } from './store/useLocale';

function MyApp() {
  const locale = useAppSelector(selectLocale);
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#00b96b',
        },
      }}
      locale={locale}
    >
      <App>
        <div className="App" id="App">
          <RouterProvider router={router} />
        </div>
      </App>
    </ConfigProvider>
  );
}

export default MyApp;
