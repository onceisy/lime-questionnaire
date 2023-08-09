import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { App, ConfigProvider, theme } from 'antd';
import router from './router';
import { useAppSelector } from './store/hooks';
import { selectLocale } from './store/localeSlice';
import { selectTheme } from './store/themeSlice';
import { useQueryAllOptions } from './hooks/useQueryAllOptions';

const { defaultAlgorithm, darkAlgorithm } = theme;

function MyApp() {
  const locale = useAppSelector(selectLocale);
  const localTheme = useAppSelector(selectTheme);
  useQueryAllOptions();

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
