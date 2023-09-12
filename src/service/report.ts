import ajax, { ResponseType } from './ajax';

export interface ListParamsType {
  pageSize: number;
  pageNumber: number;
}

/**
 * @description: 获取报表原始数据
 * @param {string} id
 * @return {*}
 */
export function queryBasicDataReport(id: string, params: ListParamsType): Promise<ResponseType> {
  return ajax.get(`/report/basicData/${id}`, { params }) as Promise<ResponseType>;
}

/**
 * @description: 获取题目报表数据
 * @param {string} id
 * @return {*}
 */
export function queryQuestionReportData(id: string): Promise<ResponseType> {
  return ajax.get(`/report/question/${id}`) as Promise<ResponseType>;
}
