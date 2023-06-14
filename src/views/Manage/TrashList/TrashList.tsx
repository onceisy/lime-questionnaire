import React, { FC, useEffect, useState } from 'react';
import type Question from '@/components/QuestionCard/Question';
import { Empty, Input, Table, Tag, Button, Space, App } from 'antd';
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  DeleteOutlined,
  RedoOutlined,
} from '@ant-design/icons';
import Loading from '@/components/Loading/Loading';
import { cloneDeep } from 'lodash';

const { Search } = Input;

const columns = [
  {
    title: '标题',
    dataIndex: 'title',
    render: (text: string) => <a>{text}</a>,
  },
  {
    title: '答卷数量',
    dataIndex: 'answerCount',
  },
  {
    title: '是否发布',
    dataIndex: 'isPublished',
    render: (isPublished: boolean) => {
      return isPublished ? (
        <Tag icon={<CheckCircleOutlined />} color="success">
          已发布
        </Tag>
      ) : (
        <Tag icon={<ClockCircleOutlined />} color="default">
          未发布
        </Tag>
      );
    },
  },
  {
    title: '是否标星',
    dataIndex: 'isStar',
    render: (isStar: boolean) => (isStar ? '是' : '否'),
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
  },
];

const TrashList: FC = () => {
  const [listLoading, setLoading] = useState(true);
  const [questionList, setQuestionList] = useState<Question[]>([]);
  useEffect(() => {
    setTimeout(() => {
      setQuestionList([
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
      ]);
      setLoading(false);
      console.log(listLoading);
    }, 1000);
  }, []);

  const [dataColumns] = useState(columns);

  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const { modal } = App.useApp();

  /**
   * @description: 删除已选中的问卷
   * @return {void}
   */
  function deleteQuestions() {
    console.log(selectedKeys);
    modal.confirm({
      title: '是否彻底删除？',
      content: '警告：彻底删除后将无法恢复！',
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
  return (
    <>
      <div className="flex items-center justify-between mb-3">
        <h3 title="我的问卷" className="my-0">
          标星问卷
        </h3>
        {questionList.length && selectedKeys.length ? (
          <Space>
            <Button type="primary" shape="round" icon={<RedoOutlined />} size="middle">
              恢复
            </Button>
            <Button
              danger
              shape="round"
              icon={<DeleteOutlined />}
              size="middle"
              onClick={deleteQuestions}
            >
              彻底删除
            </Button>
          </Space>
        ) : (
          <Search placeholder="请输入关键字" className="w-52" enterButton />
        )}
      </div>
      {listLoading ? (
        <Loading className="mt-16"></Loading>
      ) : questionList.length ? (
        <Table
          rowSelection={{
            type: 'checkbox',
            onChange: keys => {
              console.log(keys);
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
