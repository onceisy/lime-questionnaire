import React, { FC, useEffect, useState } from 'react';
import Loading from '@/components/Loading/Loading';
import { DEFAULT_PAGE_SIZE10, SEARCH_PAGE, SEARCH_PAGE_SIZE } from '@/constant';
import { useGetOptions } from '@/hooks/useGetOptions';
import { queryBasicDataReport } from '@/service/report';
import { ComponentInfoType } from '@/store/questionInfoSlice';
import { formatReportDataSource } from '@/utils/report';
import { useRequest } from 'ahooks';
import { Table, TableColumnsType, Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

const BasicData: FC = () => {
  const { id } = useParams();
  const { getDicOptionsByIds } = useGetOptions();
  const { t } = useTranslation();
  const [page, setPage] = useState({
    [SEARCH_PAGE]: 1,
    [SEARCH_PAGE_SIZE]: DEFAULT_PAGE_SIZE10,
    // [SEARCH_PAGE_SIZE]: 2,
  });

  const [total, setTotal] = useState(0);

  const [columns, setColumns] = useState<object[]>([]);

  const { loading, data } = useRequest(
    async () => {
      const res = await queryBasicDataReport(id || '', page);
      return res.data;
    },
    {
      refreshDeps: [page],
    }
  );

  const [dataSource, setDataSource] = useState<object[]>([]);

  const NoInputRequired = ['QuestionTitle', 'QuestionParagraph'];

  function columnRender(text: string) {
    return (
      <Tooltip placement="topLeft" title={text}>
        {text}
      </Tooltip>
    );
  }

  useEffect(() => {
    const { list = [], question = {}, total: count } = data || {};
    // 设置表头
    const { componentList = [] } = question;
    if (componentList.length) {
      const arr: TableColumnsType = [
        {
          title: t('public.name'),
          dataIndex: 'creator',
          ellipsis: true,
          render: columnRender,
        },
        {
          title: 'ip',
          dataIndex: 'ip',
          ellipsis: true,
          render: columnRender,
        },
        {
          title: 'os',
          dataIndex: 'os',
          ellipsis: true,
          render: columnRender,
        },
      ];
      componentList.forEach((item: ComponentInfoType) => {
        if (!NoInputRequired.includes(item.type)) {
          arr.push({
            title: item.name || item.props?.label || '',
            dataIndex: item.componentId,
            ellipsis: true,
            render: columnRender,
          });
        }
      });
      setColumns(arr);
    }
    // 数据
    const dealData = async () => {
      if (componentList.length) {
        // 更新所有组件字典信息到store
        const dicIds: string[] = [];
        componentList.forEach((c: ComponentInfoType) => {
          const { props } = c;
          const { isUseDic = false, dicId = '' } = props || {};
          if (isUseDic) {
            dicIds.push(dicId);
          }
        });
        if (dicIds.length) {
          try {
            await getDicOptionsByIds(dicIds);
          } catch (error) {
            console.error(error);
          }
        }
      }

      if (list.length) {
        const sourceData = [];
        for (const item of list) {
          const { _id, creator = '', data = [], ip, os } = item;
          const formatted = await formatReportDataSource(data, question.componentList);
          sourceData.push({
            _id,
            creator,
            ...formatted,
            ip,
            os,
          });
        }
        setDataSource(sourceData);
      }
    };
    dealData();
    // total
    setTotal(count);
  }, [data]);

  function updatePage(data: object) {
    setPage({
      ...page,
      ...data,
    });
  }
  return (
    <>
      {loading ? (
        <Loading top={60}></Loading>
      ) : (
        <div>
          {/* <Typography.Title level={3}>{data.question.title}</Typography.Title> */}
          <Table
            loading={loading}
            dataSource={dataSource}
            columns={columns}
            rowKey="_id"
            pagination={{
              pageSize: page[SEARCH_PAGE_SIZE],
              total,
              current: page[SEARCH_PAGE],
              onChange: current => updatePage({ [SEARCH_PAGE]: current }),
              position: ['topRight'],
              showTotal: total => `${t('public.total')}: ${total}`,
            }}
          />
        </div>
      )}
    </>
  );
};

export default BasicData;
