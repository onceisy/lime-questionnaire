import Question from '@/components/QuestionCard/Question';
import ajax, { ResponseType } from './ajax';

export interface ListParams extends Question {
  pageSize: number;
  pageNumber: number;
}
export interface PatchListParams extends Question {
  ids: string[];
}

/**
 * @description: 创建问卷
 * @param {Question} params
 * @return {*}
 */
export function createQuestion(params: Question | object) {
  return ajax.post('/question', params) as Promise<ResponseType>;
}

/**
 * @description: 获取问卷详情
 * @param {string} id
 * @return {*}
 */
export function queryQuestion(id: string) {
  return ajax.get(`/question/detail/${id}`) as Promise<ResponseType>;
}

/**
 * @description: 编辑问卷（标星、发布、删除、title）
 * @param {Question} params
 * @return {*}
 */
export function editQuestion(id: string, params: Partial<Question>) {
  return ajax.patch(`/question/${id}`, params) as Promise<ResponseType>;
}

/**
 * @description: 批量编辑问卷（标星、发布、删除）
 * @param {Question} params
 * @return {*}
 */
export function editQuestionBatch(params: Partial<PatchListParams>) {
  return ajax.patch(`/question/list`, params) as Promise<ResponseType>;
}

/**
 * @description: 批量彻底删除问卷
 * @param {Question} params
 * @return {*}
 */
export function deleteQuestionBatch(params: Partial<PatchListParams>) {
  return ajax.delete(`/question/list`, { data: params }) as Promise<ResponseType>;
}

/**
 * @description: 复制问卷
 * @param {Question} params
 * @return {*}
 */
export function copyQuestion(id: string) {
  return ajax.post(`/question/copy`, { id }) as Promise<ResponseType>;
}

/**
 * @description: 查询问卷列表
 * @param {ListParams} params
 * @return {*}
 */
export function queryQuestionList(params: Partial<ListParams>) {
  return ajax.post('/question/list', params) as Promise<ResponseType>;
}
