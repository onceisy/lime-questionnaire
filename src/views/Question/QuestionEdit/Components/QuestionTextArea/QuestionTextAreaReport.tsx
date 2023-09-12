import React, { FC, useEffect, useState } from 'react';
import { ReportDataType } from '@/views/Question/QuestionStatistic/Components/QuestionReport';
import { Table, Typography } from 'antd';
import { getComponentConfByType } from '..';
import { useTranslation } from 'react-i18next';
import { REPORT_COMPONENT_HEIGHT } from '@/constant';
import { nanoid } from 'nanoid';

interface DataSourceType {
  label: string;
  count: number;
  index: number;
  key: string;
}

const QuestionTextAreaReport: FC<ReportDataType> = (props: ReportDataType) => {
  const { t } = useTranslation();

  const { name, componentType = '', data = [] } = props;
  const [count, setCount] = useState<number>(0);
  useEffect(() => {
    if (data.length) {
      let num = 0;
      data.forEach(d => (num += d.count));
      setCount(num);
      setDataSource(
        data.map((item, index) => {
          return {
            ...item,
            key: nanoid(),
            index: index + 1,
          };
        })
      );
    }
  }, data);

  const columns = [
    {
      title: t('public.index'),
      dataIndex: 'index',
      key: 'index',
      width: 100,
    },
    {
      title: t('statistic.contentDetail'),
      dataIndex: 'label',
      key: 'label',
      ellipsis: true,
    },
    {
      title: t('statistic.fillingTimes'),
      dataIndex: 'count',
      key: 'count',
      width: 120,
    },
  ];
  const [dataSource, setDataSource] = useState<DataSourceType[]>([]);
  return (
    <>
      <Typography.Title
        level={5}
        style={{
          fontSize: '16px',
          margin: 0,
          fontWeight: 500,
        }}
      >
        {name}
      </Typography.Title>
      <div className="mt-2 text-xs">
        {getComponentConfByType(componentType)?.name} / 回答人数: {count}
      </div>
      <div>
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={{
            position: ['topRight'],
          }}
          scroll={{ y: REPORT_COMPONENT_HEIGHT }}
          size="small"
          bordered
        />
      </div>
    </>
  );
};

export default QuestionTextAreaReport;
