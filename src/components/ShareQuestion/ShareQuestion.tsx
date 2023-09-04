import React, { FC, useRef } from 'react';
import Question from '../QuestionCard/Question';
import { App, Button, QRCode, Space, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import copy from 'copy-to-clipboard';
import { CLIENT_URL_PREFIX } from '@/constant';
import { useAppSelector } from '@/store/hooks';
import { selectTheme } from '@/store/themeSlice';

const ShareQuestion: FC<Question> = (props: Question) => {
  const { t } = useTranslation();
  const { message } = App.useApp();
  const { _id } = props;
  const theme = useAppSelector(selectTheme);
  const url = `${CLIENT_URL_PREFIX}${_id}`;

  function copyUrl() {
    copy(url);
    message.success(t('manage.copySuccess'));
  }

  function openUrl() {
    window.open(url);
  }

  const QRCodeRef = useRef<HTMLDivElement>(null);
  function downloadQRCode() {
    const canvas = QRCodeRef.current?.querySelector('canvas');
    if (canvas) {
      const url = canvas.toDataURL();
      const a = document.createElement('a');
      a.download = 'QRCode.png';
      a.href = url;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      message.success(t('public.downloadSuccess'));
    }
  }
  return (
    <div>
      <Typography.Title level={5}>{t('public.url')}</Typography.Title>
      <p className="my-5 p-4 rounded-lg bg-gray-100 dark:bg-black">{url}</p>
      <div>
        <Space>
          <Button type="primary" onClick={copyUrl}>
            {t('public.copyUrl')}
          </Button>
          <Button type="primary" ghost onClick={openUrl}>
            {t('manage.openUrl')}
          </Button>
        </Space>
      </div>
      <Typography.Title level={5}>{t('public.qrCode')}</Typography.Title>
      <div ref={QRCodeRef}>
        <QRCode value={url} bgColor={theme === 'light' ? '#fff' : '#000'} />
      </div>
      <div className="mt-4">
        <Button type="primary" onClick={downloadQRCode}>
          {t('manage.saveQRCode')}
        </Button>
      </div>
    </div>
  );
};

export default ShareQuestion;
