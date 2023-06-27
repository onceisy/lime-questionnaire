import { AccountProp } from '@/views/SignIn/SignIn';
import ajax from './ajax';

/**
 * @description: 登录
 * @param {AccountProp} params
 * @return {*}
 */
export function register(params: AccountProp) {
  return ajax.post('/user/register', params);
}

/**
 * @description: 登录
 * @param {AccountProp} params
 * @return {*}
 */
export function login(params: AccountProp) {
  return ajax.post('/user/login', params);
}
