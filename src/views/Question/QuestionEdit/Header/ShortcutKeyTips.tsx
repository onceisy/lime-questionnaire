import React, { FC } from 'react';
import { Descriptions } from 'antd';
import { nanoid } from 'nanoid';

const ShortcutKeyTips: FC = () => {
  const items = [
    {
      key: nanoid(),
      label: 'ctrl + c',
      content: '复制',
    },
    {
      key: nanoid(),
      label: 'ctrl + v',
      content: '粘贴',
    },
    {
      key: nanoid(),
      label: 'backspace/delete',
      content: '删除',
    },
    {
      key: nanoid(),
      label: '↑',
      content: '光标向上移动',
    },
    {
      key: nanoid(),
      label: '↓',
      content: '光标向下移动',
    },
  ];
  return (
    <ul>
      {items.map(item => {
        return (
          <li key={item.key}>
            <span>{item.label}: </span>
            <span>{item.content}</span>
          </li>
        );
      })}
    </ul>
  );
};

export default ShortcutKeyTips;
