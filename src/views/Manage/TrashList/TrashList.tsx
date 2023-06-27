import React, { FC, useState } from 'react';
import { Empty, Table, Tag, Button, Space, App } from 'antd';
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  DeleteOutlined,
  RedoOutlined,
} from '@ant-design/icons';
import Loading from '@/components/Loading/Loading';
import { useTranslation } from 'react-i18next';
import QuestionListSearch from '@/components/QuestionListSearch/QuestionListSearch';
import useQueryQuestionList from '@/hooks/useQueryQuestionList';
import { useRequest } from 'ahooks';
import { deleteQuestionBatch, editQuestionBatch } from '@/service/question';
import QuestionListPagination from '@/components/QuestionListSearch/QuestionListPagination';

const TrashList: FC = () => {
  const { t } = useTranslation();
  const { modal, message } = App.useApp();

  // 查询问卷列表
  const { loading, data, refresh } = useQueryQuestionList({ isDeleted: true, pageSize: 10 });
  const { list: questionList, count } = data?.data || { list: [], count: 0 };

  // 表格列配置
  const columns = [
    {
      title: () => t('public.title'),
      dataIndex: 'title',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: () => t('public.answerCount'),
      dataIndex: 'answerCount',
    },
    {
      title: () => t('manage.isPublished'),
      dataIndex: 'isPublished',
      render: (isPublished: boolean) => {
        return isPublished ? (
          <Tag icon={<CheckCircleOutlined />} color="success">
            {t('manage.published')}
          </Tag>
        ) : (
          <Tag icon={<ClockCircleOutlined />} color="default">
            {t('manage.unpublished')}
          </Tag>
        );
      },
    },
    {
      title: () => t('manage.isStar'),
      dataIndex: 'isStar',
      render: (isStar: boolean) => (isStar ? t('public.yes') : t('public.no')),
    },
    {
      title: () => t('public.createdTime'),
      dataIndex: 'createdAt',
    },
  ];

  const [dataColumns] = useState(columns);

  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  /**
   * @description: 彻底删除问卷请求
   * @return {*}
   */
  const { loading: deleteLoading, run: handleDelete } = useRequest(deleteQuestionBatch, {
    manual: true,
    onSuccess: result => {
      message.success(t('manage.deleteCountSuccess', { total: result.data.modifiedCount }));
      setSelectedKeys([]);
      refresh();
    },
  });

  /**
   * @description: 删除已选中的问卷
   * @return {void}
   */
  function deleteQuestions() {
    modal.confirm({
      title: t('manage.isDeleteAll', { total: selectedKeys.length }),
      content: t('manage.deleteCompletelyWarn'),
      onOk: () => handleDelete({ ids: selectedKeys }),
    });
  }

  /**
   * @description: 恢复问卷请求
   * @return {*}
   */
  const { loading: restoreLoading, run: handleRestore } = useRequest(editQuestionBatch, {
    manual: true,
    onSuccess: result => {
      message.success(t('manage.restoreSuccess', { total: result.data.modifiedCount }));
      setSelectedKeys([]);
      refresh();
    },
  });

  /**
   * @description: 恢复问卷
   * @return {*}
   */
  function restoreQuestions() {
    modal.confirm({
      title: t('manage.isRestoreAll', { total: selectedKeys.length }),
      onOk: () => {
        handleRestore({
          ids: selectedKeys,
          isDeleted: false,
        });
      },
    });
  }

  return (
    <>
      <div className="flex items-center justify-between mb-3">
        <h3 title={t('public.trash') as string} className="my-0">
          {t('public.trash')}
        </h3>
        {questionList.length && selectedKeys.length ? (
          <Space>
            <Button
              type="primary"
              shape="round"
              icon={<RedoOutlined />}
              size="middle"
              disabled={restoreLoading}
              onClick={restoreQuestions}
            >
              {t('public.restore')}
            </Button>
            <Button
              danger
              shape="round"
              icon={<DeleteOutlined />}
              size="middle"
              disabled={deleteLoading}
              onClick={deleteQuestions}
            >
              {t('public.deleteCompletely')}
            </Button>
          </Space>
        ) : (
          <QuestionListSearch />
        )}
      </div>
      {loading ? (
        <Loading className="mt-16"></Loading>
      ) : questionList.length ? (
        <Table
          rowSelection={{
            type: 'checkbox',
            onChange: keys => {
              setSelectedKeys(keys as string[]);
            },
          }}
          dataSource={questionList}
          columns={dataColumns}
          rowKey="_id"
          pagination={false}
          // header高度 footer高度 搜索框高度 分页器高度 表头高度
          scroll={{ y: 'calc(100vh - 64px - 70px - 100px - 55px)' }}
        ></Table>
      ) : (
        <Empty />
      )}
      <QuestionListPagination position="right" total={count} pageSize={10} />
    </>
  );
};

export default TrashList;
