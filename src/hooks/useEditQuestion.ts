import { editQuestion } from '@/service/question';
import { useRequest } from 'ahooks';
import { App } from 'antd';
import { useTranslation } from 'react-i18next';

function useEditQuestion(refresh?: () => void) {
  const { message } = App.useApp();
  const { t } = useTranslation();

  const { loading, run } = useRequest(editQuestion, {
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
  };
}

export default useEditQuestion;
