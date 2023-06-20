import React, { FC, useEffect, useState } from 'react';
import type Question from '@/components/QuestionCard/Question';
import { Empty, Table, Tag, Button, Space, App } from 'antd';
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  DeleteOutlined,
  RedoOutlined,
} from '@ant-design/icons';
import Loading from '@/components/Loading/Loading';
import { cloneDeep } from 'lodash';
import { useTranslation } from 'react-i18next';
import QuestionListSearch from '@/components/QuestionListSearch/QuestionListSearch';
import { useSearchParams } from 'react-router-dom';
import { QUESTION_LIST_SEARCH_PARAM } from '@/constant';

const initList: Question[] = [
  {
    _id: '1111111',
    title: '大学生消费情况调查问卷',
    isPublished: false,
    isStar: true,
    answerCount: 20,
    createdAt: '2023-06-07 22:00',
  },
  {
    _id: '2222222',
    title: '大学生恋爱观调查问卷',
    isPublished: true,
    isStar: true,
    answerCount: 24,
    createdAt: '2023-06-07 22:10',
  },
  {
    _id: '33333333',
    title: '大学生就业情况调查问卷',
    isPublished: true,
    isStar: true,
    answerCount: 25,
    createdAt: '2023-06-07 22:11',
  },
];

const TrashList: FC = () => {
  const { t } = useTranslation();

  const [listLoading, setLoading] = useState(true);
  const [questionList, setQuestionList] = useState<Question[]>([]);
  useEffect(() => {
    setTimeout(() => {
      setQuestionList(initList);
      setLoading(false);
    }, 1000);
  }, []);

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
  const { modal } = App.useApp();

  /**
   * @description: 删除已选中的问卷
   * @return {void}
   */
  function deleteQuestions() {
    modal.confirm({
      title: t('manage.isDeleteCompletely'),
      content: t('manage.deleteCompletelyWarn'),
      onOk: () => {
        const list = cloneDeep(questionList);
        selectedKeys.forEach(key => {
          const index = list.findIndex(i => i._id === key);
          list.splice(index, 1);
        });
        setQuestionList(list);
      },
    });
  }

  /**
   * @description: 搜索
   * @return {*}
   */
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get(QUESTION_LIST_SEARCH_PARAM) || '';
  useEffect(() => {
    setQuestionList(initList.filter(i => i.title.includes(keyword)));
  }, [keyword]);
  return (
    <>
      <div className="flex items-center justify-between mb-3">
        <h3 title={t('public.trash') as string} className="my-0">
          {t('public.trash')}
        </h3>
        {questionList.length && selectedKeys.length ? (
          <Space>
            <Button type="primary" shape="round" icon={<RedoOutlined />} size="middle">
              {t('public.restore')}
            </Button>
            <Button
              danger
              shape="round"
              icon={<DeleteOutlined />}
              size="middle"
              onClick={deleteQuestions}
            >
              {t('public.deleteCompletely')}
            </Button>
          </Space>
        ) : (
          <QuestionListSearch />
        )}
      </div>
      {listLoading ? (
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
        ></Table>
      ) : (
        <Empty />
      )}
    </>
  );
};

export default TrashList;
