import React, { FC } from 'react';
import { nanoid } from 'nanoid';
import { useTranslation } from 'react-i18next';

const ShortcutKeyTips: FC = () => {
  const { t } = useTranslation();
  const items = [
    {
      key: nanoid(),
      label: 'ctrl + c',
      content: t('public.copy'),
    },
    {
      key: nanoid(),
      label: 'ctrl + v',
      content: t('public.paste'),
    },
    {
      key: nanoid(),
      label: 'backspace/delete',
      content: t('public.delete'),
    },
    {
      key: nanoid(),
      label: '↑',
      content: t('manage.cursorMoveUp'),
    },
    {
      key: nanoid(),
      label: '↓',
      content: t('manage.cursorMoveDown'),
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
