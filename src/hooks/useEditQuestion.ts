import { editQuestion } from '@/service/question';
import { useRequest } from 'ahooks';
import { App } from 'antd';
import { useTranslation } from 'react-i18next';

/**
 * @description: 修改组件接口调用
 * @param {function} refresh 请求成功回调函数
 * @return {loading} loading状态
 * @return {run} 参数1为_id: 问卷的_id, 参数2为任意问卷的属性，如: { isStar: true }
 */
function useEditQuestion(refresh?: () => void) {
  const { message } = App.useApp();
  const { t } = useTranslation();

  const { loading, run, runAsync } = useRequest(editQuestion, {
    manual: true,
    onSuccess: (result, params) => {
      const data = params[1];
      const keys = Object.keys(data);
      let type = 'edit';
      if (keys.length === 1) {
        if (keys[0] === 'isStar' && !data.isStar) {
          // 取消标星
          type = 'unStar';
        } else {
          // 标星、删除、编辑
          type = keys[0];
        }
      }
      message.success(t(`manage.${type}Success`));
      refresh && refresh();
    },
  });

  return {
    loading,
    run,
    runAsync,
  };
}

export default useEditQuestion;
