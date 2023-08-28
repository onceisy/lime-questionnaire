import React, { FC, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import { ROUTE_MANAGE_LIST } from '@/router/path';
import { App, Button, Space, Tooltip, Typography } from 'antd';
import { QuestionCircleOutlined, EditOutlined, LoadingOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import ShortcutKeyTips from './ShortcutKeyTips';
import { useGetComponentsState } from '@/hooks/useGetComponentsState';
import { QUESTION_TITLE_MAX_LENGTH } from '@/constant';
import useEditQuestion from '@/hooks/useEditQuestion';
import { useDispatch } from 'react-redux';
import { setQuestionTitle } from '@/store/components';
import { useDebounceFn, useKeyPress } from 'ahooks';

const EditHeader: FC = () => {
  const { message } = App.useApp();
  const nav = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { _id, title, componentList } = useGetComponentsState();
  const { loading, runAsync: editQuestion } = useEditQuestion();

  /**
   * @description: 修改问卷title
   * @param {string} title
   * @return {*}
   */
  async function onTitleChange(title: string) {
    try {
      const res = await editQuestion(_id, { title });
      if (res.code === 200) {
        dispatch(setQuestionTitle(title));
      }
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * @description: 保存组件到服务端
   * @return {*}
   */
  const { run: handleSaveComponents } = useDebounceFn(
    () => {
      if (!componentList.length) {
        message.error(t('manage.atLeastOneComponent'));
        return;
      }
      editQuestion(_id, { componentList });
    },
    {
      wait: 500,
    }
  );

  useKeyPress(['ctrl.s', 'meta.s'], (e: KeyboardEvent) => {
    e.preventDefault();
    handleSaveComponents();
  });

  // 自动保存问卷
  let isEnableAutoSave = false;
  useEffect(() => {
    // 首次获取不自动保存
    if (!isEnableAutoSave) {
      isEnableAutoSave = !isEnableAutoSave;
      return;
    }
    isEnableAutoSave && handleSaveComponents();
  }, [componentList]);
  return (
    <div className="h-14 flex px-6">
      {/* 顶部左侧 */}
      <div className="flex-1 flex items-center">
        <div className="flex items-center">
          <Icon
            icon="solar:home-smile-angle-bold"
            fontSize="18px"
            className="cursor-pointer"
            onClick={() => nav(ROUTE_MANAGE_LIST)}
          ></Icon>
          <Typography.Text
            strong
            editable={
              loading
                ? false
                : {
                    icon: <EditOutlined />,
                    maxLength: QUESTION_TITLE_MAX_LENGTH,
                    enterIcon: null,
                    onChange: onTitleChange,
                  }
            }
            style={{ margin: 0, marginLeft: 12 }}
          >
            {title}
          </Typography.Text>
          {loading && <LoadingOutlined className="ml-1" />}
        </div>
      </div>
      {/* 顶部中间 */}
      <div className="flex-1 flex items-center justify-center">
        <div>middle</div>
      </div>
      {/* 顶部右侧 */}
      <div className="flex-1 flex items-center justify-end">
        <div>
          <Space>
            <Button type="primary" size="middle" ghost>
              {t('public.preview')}
            </Button>
            <Button type="primary" size="middle" disabled={loading} onClick={handleSaveComponents}>
              {t('public.save')}
            </Button>
            <Tooltip title={<ShortcutKeyTips></ShortcutKeyTips>}>
              <Button type="text" size="middle" icon={<QuestionCircleOutlined />}>
                {t('public.shortcutKeys')}
              </Button>
            </Tooltip>
          </Space>
        </div>
      </div>
    </div>
  );
};

export default EditHeader;
