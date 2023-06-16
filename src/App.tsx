import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { App, ConfigProvider, theme } from 'antd';
import router from './router';
import { useAppSelector } from './store/hooks';
import { selectLocale } from './store/useLocale';
import { selectTheme } from './store/useTheme';

const { defaultAlgorithm, darkAlgorithm } = theme;

function MyApp() {
  const locale = useAppSelector(selectLocale);
  const localTheme = useAppSelector(selectTheme);
  return (
    <ConfigProvider
      theme={{
        algorithm: localTheme === 'light' ? defaultAlgorithm : darkAlgorithm,
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
