import React, { FC, useEffect, useState } from 'react';
import { ReportDataType } from '@/views/Question/QuestionStatistic/Components/QuestionReport';
import { Table, Typography } from 'antd';
import { getComponentConfByType } from '..';
import { useTranslation } from 'react-i18next';
import { CHART_COLORS1, REPORT_COMPONENT_HEIGHT } from '@/constant';
import { nanoid } from 'nanoid';
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { round } from 'lodash';

interface DataSourceType {
  label: string;
  key: string;
  count: number;
  index: number;
}

const QuestionRadioReport: FC<ReportDataType> = (props: ReportDataType) => {
  const { t } = useTranslation();

  const { name, componentType = '', data = [] } = props;
  const [count, setCount] = useState<number>(0);
  const [dataSource, setDataSource] = useState<DataSourceType[]>([]);

  useEffect(() => {
    if (data.length) {
      let num = 0;
      data.forEach(d => (num += d.count));
      setCount(num);
      setDataSource(
        data.map((item, index) => {
          return {
            ...item,
            index: index + 1,
            key: nanoid(),
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
      title: t('statistic.selectTimes'),
      dataIndex: 'count',
      key: 'count',
      width: 120,
    },
  ];
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
        {getComponentConfByType(componentType)?.name} / {t('statistic.answerCount')}: {count}
      </div>
      <div className="flex">
        <div className="flex-1" style={{ height: data.length ? REPORT_COMPONENT_HEIGHT : 'auto' }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                dataKey="count"
                nameKey="label"
                isAnimationActive={false}
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={80}
                label={({ name, value }) => {
                  return `${name}: ${round((value / count) * 100, 2)}% (${value})`;
                }}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={CHART_COLORS1[index % CHART_COLORS1.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend></Legend>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex-1">
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
      </div>
    </>
  );
};

export default QuestionRadioReport;
