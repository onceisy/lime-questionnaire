import {
  NO_NEED_LOGIN_PAGE,
  NO_PERMISSION_PAGE,
  ROUTE_MANAGE_LIST,
  ROUTE_SIGN_IN,
} from '@/router/path';
import { useAppSelector } from '@/store/hooks';
import { isUserLogin } from '@/store/userSlice';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// 路由守卫
const useNavPage = () => {
  const { pathname } = useLocation();
  const nav = useNavigate();
  const isLogin = useAppSelector(isUserLogin);

  useEffect(() => {
    console.log(pathname);
    if (NO_PERMISSION_PAGE.includes(pathname)) return;

    const shouldRedirectTo = isLogin ? ROUTE_MANAGE_LIST : ROUTE_SIGN_IN;
    const shouldRedirect = isLogin
      ? NO_NEED_LOGIN_PAGE.includes(pathname)
      : !NO_NEED_LOGIN_PAGE.includes(pathname);
    if (shouldRedirect) {
      nav(shouldRedirectTo);
    }
  }, [pathname]);
};

export default useNavPage;
