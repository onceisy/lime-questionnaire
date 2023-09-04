import { AccountProp } from '@/views/SignIn/SignIn';
import ajax, { ResponseType } from './ajax';

/**
 * @description: 注册
 * @param {AccountProp} params
 * @return {*}
 */
export function register(params: AccountProp): Promise<ResponseType> {
  return ajax.post('/user/register', params);
}

/**
 * @description: 登录
 * @param {AccountProp} params
 * @return {*}
 */
export function login(params: AccountProp): Promise<ResponseType> {
  return ajax.post('/user/login', params);
}
