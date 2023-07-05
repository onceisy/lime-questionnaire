export const ROUTE_HOME = '/';
export const ROUTE_SIGN_IN = '/signIn';
export const ROUTE_SIGN_UP = '/signUp';
export const ROUTE_MANAGE_LIST = '/manage/list';
export const ROUTE_MANAGE_STAR = '/manage/star';
export const ROUTE_MANAGE_TRASH = '/manage/trash';
export const ROUTE_QUESTION_EDIT = '/question/edit';

// 登陆后不能访问的页面
export const NO_NEED_LOGIN_PAGE = [ROUTE_SIGN_IN, ROUTE_SIGN_UP];
// 未登录和登陆都直接放行的页面
export const NO_PERMISSION_PAGE = [ROUTE_HOME];
