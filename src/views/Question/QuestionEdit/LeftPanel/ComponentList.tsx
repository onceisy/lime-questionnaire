import React, { FC } from 'react';
import { useGetComponentsState } from '@/hooks/useGetComponentsState';
import {
  ComponentInfoType,
  setSelectedId,
  sortComponent,
  updateComponentPropsById,
} from '@/store/questionInfoSlice';
import { Typography } from 'antd';
import { useDispatch } from 'react-redux';
import ListSortable from '@/components/ListSortable/ListSortable';
import SortableItem from '@/components/ListSortable/SortableItem';
import { EditOutlined } from '@ant-design/icons';

// import { useTranslation } from 'react-i18next';

const ComponentList: FC = () => {
  // const { message } = App.useApp();
  // const { t } = useTranslation();
  const dispatch = useDispatch();

  const { componentList, selectedId } = useGetComponentsState();

  function onTitleChange(item: ComponentInfoType, str: string) {
    // if (!str) {
    //   message.error(t('question.noEmptyContent'));
    //   return;
    // }
    const { componentId = '', props: componentProps = { label: '', text: '' } } = item;
    const data: { label?: string; text?: string } = {};
    if (Object.prototype.hasOwnProperty.call(componentProps, 'label')) {
      data.label = str;
    }
    if (Object.prototype.hasOwnProperty.call(componentProps, 'text')) {
      data.text = str;
    }
    dispatch(updateComponentPropsById({ id: componentId, props: data }));
  }

  // const [sortableList, setSortableList] = useState<SortableListType[]>([]);
  // useEffect(() => {
  //   setSortableList(
  //     componentList.map(item => {
  //       return {
  //         ...item,
  //         id: item._id,
  //       };
  //     })
  //   );
  // }, [componentList]);
  const sortableList = componentList.map(item => {
    return {
      ...item,
      id: item.componentId,
    };
  });
  function onSortableEnd(oldIndex: number, newIndex: number) {
    dispatch(sortComponent({ oldIndex, newIndex }));
  }
  return (
    <ListSortable items={sortableList} onSortableEnd={onSortableEnd}>
      {sortableList.map(item => {
        return (
          <SortableItem key={item.componentId} id={item.componentId}>
            <div
              className={`w-full px-2 py-2 my-1 rounded-md cursor-pointer flex items-center ${
                selectedId === item.componentId ? 'bg-slate-100 dark:bg-slate-900' : ''
              }`}
              onClick={() => dispatch(setSelectedId(item.componentId))}
            >
              <Typography.Text
                className={item.componentId}
                editable={{
                  icon: <EditOutlined className="text-slate-600 dark:text-gray-200" />,
                  onChange: text => onTitleChange(item, text),
                }}
                ellipsis
                style={{
                  margin: 0,
                  padding: 0,
                  insetInlineStart: 0,
                  lineHeight: '32px',
                  width: '100%',
                }}
              >
                {item.props?.label || item.props?.text}
              </Typography.Text>
            </div>
          </SortableItem>
        );
      })}
    </ListSortable>
  );
};

export default ComponentList;
