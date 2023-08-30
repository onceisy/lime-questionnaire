import { useKeyPress } from 'ahooks';
import { useGetComponentsState } from './useGetComponentsState';
import { useDispatch } from 'react-redux';
import {
  copyComponentById,
  deleteComponentById,
  pasteComponentByIndex,
  selectNextComponent,
  selectPreviousComponent,
} from '@/store/components';
import { Options } from 'ahooks/lib/useKeyPress';
import { App } from 'antd';
import { useTranslation } from 'react-i18next';

function isValidElement() {
  return (
    document.activeElement !== document.body &&
    document.activeElement?.matches('div[aria-roledescription=sortable]')
  );
}

/**
 * @description: 问卷组件的快捷操作按键监听
 * @return {*}
 */
export function useBindComponentListEvents() {
  const { selectedId, componentList } = useGetComponentsState();
  const dispatch = useDispatch();
  const { modal, message } = App.useApp();
  const { t } = useTranslation();

  const option: Options = {
    exactMatch: true,
    useCapture: true,
    // events: ['keyup'],
  };

  // 复制
  useKeyPress(
    ['ctrl.c', 'meta.c'],
    () => {
      if (!isValidElement()) {
        return;
      }
      dispatch(copyComponentById(selectedId));
    },
    option
  );

  // 粘贴
  useKeyPress(
    ['ctrl.v', 'meta.v'],
    () => {
      if (!isValidElement()) {
        return;
      }
      const index = componentList.findIndex(c => c._id === selectedId);
      dispatch(pasteComponentByIndex(index >= 0 ? index + 1 : componentList.length - 1));
    },
    option
  );

  // 选择上一个组件
  useKeyPress(
    'uparrow',
    (e: KeyboardEvent) => {
      e.preventDefault();
      if (!isValidElement()) {
        return;
      }
      dispatch(selectPreviousComponent());
    },
    option
  );

  // 选择下一个组件
  useKeyPress(
    ['downarrow'],
    (e: KeyboardEvent) => {
      e.preventDefault();
      if (!isValidElement()) {
        return;
      }
      dispatch(selectNextComponent());
    },
    option
  );

  // 删除组件
  let isDeleting = false;
  useKeyPress(['backspace', 'delete'], () => {
    if (!isValidElement() || !selectedId || isDeleting) {
      return;
    }
    if (componentList.length === 1) {
      message.error(t('manage.atLeastOneComponent'));
      return;
    }
    isDeleting = true;
    modal.confirm({
      title: t('manage.deleteConfirm'),
      okButtonProps: { danger: true },
      onOk: () => {
        dispatch(deleteComponentById(selectedId));
        isDeleting = false;
      },
      onCancel: () => {
        isDeleting = false;
      },
    });
  });
}
