import { message } from 'antd';
import axios, { AxiosResponse } from 'axios';
import { t } from 'i18next';

export interface ResponseType extends AxiosResponse {
  code: number;
  success: boolean;
  message: string;
}
const ajax = axios.create({
  timeout: 30 * 1000,
});
// 添加请求拦截器
ajax.interceptors.request.use(
  config => {
    config.url = `/api${config.url}`;
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 响应拦截器
ajax.interceptors.response.use(
  response => {
    // 2xx 范围内的状态码都会触发该函数。
    const data: ResponseType = response.data;
    if (data.code !== 200) {
      message.error(t(`message.${data.message}`));
      return Promise.reject(data as ResponseType);
    }
    return Promise.resolve(data as ResponseType);
  },
  error => {
    // 超出 2xx 范围的状态码都会触发该函数。
    const errText = error.response.data.message;
    message.error(t(`message.${errText || 'requestError'}`));
    return Promise.reject(error.response.data as ResponseType);
  }
);

export default ajax;
