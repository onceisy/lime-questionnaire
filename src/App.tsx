import React, { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import { App, ConfigProvider, theme } from 'antd';
import router from './router';
import { useAppSelector } from './store/hooks';
import { selectLocale } from './store/localeSlice';
import { selectTheme } from './store/themeSlice';
import { useGetOptions } from './hooks/useGetOptions';
import { useMount } from 'ahooks';
import Loading from './components/Loading/Loading';

const { defaultAlgorithm, darkAlgorithm } = theme;

function MyApp() {
  const locale = useAppSelector(selectLocale);
  const localTheme = useAppSelector(selectTheme);
  const { updateDicFromService } = useGetOptions();

  useMount(() => {
    updateDicFromService();
  });
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
        <Suspense fallback={<Loading></Loading>}>
          <div className="App" id="App">
            <RouterProvider router={router} />
          </div>
        </Suspense>
      </App>
    </ConfigProvider>
  );
}

export default MyApp;
