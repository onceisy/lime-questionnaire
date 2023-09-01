import React, { FC, useState } from 'react';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import { ROUTE_MANAGE_LIST } from '@/router/path';
import { App, Button, Divider, Space, Tooltip, Typography } from 'antd';
import { QuestionCircleOutlined, EditOutlined, LoadingOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import ShortcutKeyTips from './ShortcutKeyTips';
import { useGetComponentsState } from '@/hooks/useGetComponentsState';
import { QUESTION_TITLE_MAX_LENGTH } from '@/constant';
import useEditQuestion from '@/hooks/useEditQuestion';
import { useDispatch } from 'react-redux';
import { setQuestionTitle, updateAutoSaveStatus } from '@/store/questionInfoSlice';
import { useDebounceEffect, useDebounceFn, useKeyPress } from 'ahooks';

const EditHeader: FC = () => {
  const { message } = App.useApp();
  const nav = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { _id, title, componentList, isAutoSave } = useGetComponentsState();
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
    async () => {
      if (!componentList.length) {
        message.error(t('manage.atLeastOneComponent'));
        return;
      }
      await editQuestion(_id, { componentList });
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
  const [autoSaveLoading, setAutoSaveLoading] = useState(false);
  useDebounceEffect(() => {
    // 首次获取不自动保存
    if (!isAutoSave) {
      return;
    }
    async function save() {
      setAutoSaveLoading(true);
      if (!componentList.length) {
        message.error(t('manage.atLeastOneComponent'));
        return;
      }
      await editQuestion(_id, { componentList, saveType: 'autoSave' });
      setTimeout(() => {
        setAutoSaveLoading(false);
      }, 500);
    }
    save();
  }, [componentList]);

  const { run: setAutoSaveStatus } = useDebounceFn(
    async () => {
      try {
        const res = await editQuestion(_id, { isAutoSave: !isAutoSave });
        if (res.code === 200) {
          dispatch(updateAutoSaveStatus(!isAutoSave));
        }
      } catch (error) {
        console.error(error);
      }
    },
    {
      wait: 1000,
    }
  );
  return (
    <div className="h-14 flex px-6">
      {/* 顶部左侧 */}
      <div className="flex-1 flex items-center">
        {/* title */}
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
                    icon: <EditOutlined className="text-slate-600 dark:text-gray-200" />,
                    maxLength: QUESTION_TITLE_MAX_LENGTH,
                    enterIcon: null,
                    onChange: onTitleChange,
                  }
            }
            style={{ margin: 0, marginLeft: 12 }}
          >
            {title}
          </Typography.Text>
        </div>
        <Divider type="vertical" />
        {/* auto save */}
        <div className="flex items-center">
          <div className="flex items-center p-2 cursor-pointer" onClick={setAutoSaveStatus}>
            {isAutoSave ? (
              <Icon className="text-primary" icon="ion:save"></Icon>
            ) : (
              <Icon className="text-gray-600 dark:text-gray-200" icon="ion:save-outline"></Icon>
            )}
          </div>
          {autoSaveLoading ? (
            <div className="flex items-center text-gray-600 dark:text-gray-200 text-xs">
              <LoadingOutlined />
              <p className="ml-2">{t('manage.inSaving')}</p>
            </div>
          ) : (
            <p className="text-xs text-gray-600 dark:text-gray-200">
              {isAutoSave ? t('manage.isAutoSaveEnable') : t('manage.isAutoSaveDisabled')}
            </p>
          )}
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
