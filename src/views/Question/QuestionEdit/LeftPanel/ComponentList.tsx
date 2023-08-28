import React, { FC } from 'react';
import { useGetComponentsState } from '@/hooks/useGetComponentsState';
import { ComponentInfoType, setSelectedId, updateComponentPropsById } from '@/store/components';
import { List, Typography } from 'antd';
import { useDispatch } from 'react-redux';
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
    const { _id = '', props: componentProps = { label: '', text: '' } } = item;
    const data: { label?: string; text?: string } = {};
    if (Object.prototype.hasOwnProperty.call(componentProps, 'label')) {
      data.label = str;
    }
    if (Object.prototype.hasOwnProperty.call(componentProps, 'text')) {
      data.text = str;
    }
    dispatch(updateComponentPropsById({ id: _id, props: data }));
  }
  return (
    <div>
      <List
        dataSource={componentList}
        renderItem={item => (
          <List.Item style={{ padding: 0 }}>
            <div
              className={`w-full px-2 py-2 my-1 rounded-md cursor-pointer flex items-center ${
                selectedId === item._id ? 'bg-slate-100' : ''
              }`}
              onClick={() => dispatch(setSelectedId(item._id))}
            >
              <Typography.Text
                className={item._id}
                editable={{
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
          </List.Item>
        )}
      />
    </div>
  );
};

export default ComponentList;
