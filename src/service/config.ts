import ajax, { ResponseType } from './ajax';
import { OptionDicType } from '@/views/Config/OptionsConfig/OptionEdit';
import { AxiosRequestConfig } from 'axios';

export interface ListParamsType {
  pageSize: number;
  pageNumber: number;
  name?: string;
}

/**
 * @description: 创建字典
 * @param {ListParamsType} params
 * @return {*}
 */
export function createOptions(params: OptionDicType): Promise<ResponseType> {
  return ajax.post('/config/options', params);
}

/**
 * @description: 获取字典列表
 * @param {ListParamsType} params
 * @return {*}
 */
export function queryOptionsList(
  params?: AxiosRequestConfig<ListParamsType>
): Promise<ResponseType> {
  return ajax.get('/config/options/list', { params: params || {} });
}

/**
 * @description: 根据字典id获取单个字典详情
 * @param {string} id
 * @return {*}
 */
export function queryOptionsById(id: string): Promise<ResponseType> {
  return ajax.get(`/config/options/${id}`) as Promise<ResponseType>;
}

/**
 * @description: 根据字典id批量获取字典详情
 * @param {string} id
 * @return {*}
 */
export function queryOptionsByIds(optionIds: string[]): Promise<ResponseType> {
  return ajax.post('/config/options/query', { optionIds }) as Promise<ResponseType>;
}

/**
 * @description: 更新字典
 * @param {string} id 字典_id
 * @param {OptionDicType} params
 * @return {*}
 */
export function updateOptionsById(id: string, params: OptionDicType): Promise<ResponseType> {
  return ajax.patch(`/config/options/${id}`, params) as Promise<ResponseType>;
}
