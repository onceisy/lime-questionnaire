import { App, Button, Space, Tooltip } from 'antd';
import React, { FC, MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { DeleteOutlined, CopyOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import {
  copyComponentById,
  deleteComponentById,
  pasteComponentByIndex,
} from '@/store/questionInfoSlice';
import { useGetComponentsState } from '@/hooks/useGetComponentsState';

interface ComponentRightEditPropsType {
  className?: string;
  _id: string;
}

const ComponentRightEdit: FC<ComponentRightEditPropsType> = (
  props: ComponentRightEditPropsType
) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { className = '', _id } = props;
  const { modal, message } = App.useApp();
  const { componentList } = useGetComponentsState();

  /**
   * @description: 删除组件
   * @param {MouseEvent} e
   * @return {*}
   */
  function handleDelete(e: MouseEvent) {
    e.stopPropagation();
    modal.confirm({
      title: t('manage.deleteConfirm'),
      okButtonProps: { danger: true },
      onOk: () => {
        if (componentList.length === 1) {
          message.error(t('manage.atLeastOneComponent'));
          return;
        }
        dispatch(deleteComponentById(_id));
      },
    });
  }

  /**
   * @description: 复制组件
   * @param {MouseEvent} e
   * @return {*}
   */
  function handleCopy(e: MouseEvent) {
    e.stopPropagation();
    modal.confirm({
      title: t('manage.copyConfirm'),
      onOk: () => {
        dispatch(copyComponentById(_id));
        const index = componentList.findIndex(c => c._id === _id);
        if (index >= 0) {
          dispatch(pasteComponentByIndex(index + 1));
        }
      },
    });
  }

  return (
    <div className={`${className} absolute right-1 top-0`}>
      <Space>
        <Tooltip title={t('public.delete')}>
          <Button
            style={{ border: 'none', boxShadow: 'none' }}
            icon={<DeleteOutlined />}
            onClick={e => handleDelete(e)}
          />
        </Tooltip>
        <Tooltip title={t('public.copy')}>
          <Button
            style={{ border: 'none', boxShadow: 'none' }}
            icon={<CopyOutlined />}
            onClick={e => handleCopy(e)}
          />
        </Tooltip>
      </Space>
    </div>
  );
};

export default ComponentRightEdit;
