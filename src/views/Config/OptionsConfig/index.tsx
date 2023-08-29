import React, { FC, useState } from 'react';
import { Button, Table } from 'antd';
import { useTranslation } from 'react-i18next';
import OptionEdit, { OptionDicType } from './OptionEdit';
import InputSearch from '@/components/Search/SearchInput';
import SearchPagination from '@/components/Search/SearchPagination';
import { queryOptionsList } from '@/service/config';
import useQueryList from '@/hooks/useQueryList';
import Loading from '@/components/Loading/Loading';
import { DEFAULT_PAGE_SIZE10 } from '@/constant';
import dayjs from 'dayjs';

const OptionsConfig: FC = () => {
  const { t } = useTranslation();

  const dataColumns = [
    {
      title: () => t('config.dicName'),
      dataIndex: 'name',
    },
    {
      title: () => t('config.dicLevel'),
      dataIndex: 'level',
      width: 150,
    },
    {
      title: () => t('public.updatedTime'),
      dataIndex: 'updatedAt',
      width: 200,
      render: (time: number) => <span>{dayjs(time).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: () => t('public.operate'),
      dataIndex: '',
      render: (data: OptionDicType) => {
        return (
          <Button type="primary" onClick={() => handleEditOptions(data._id as string)}>
            修改
          </Button>
        );
      },
      width: 200,
    },
  ];
  const [visible, setVisible] = useState<boolean>(false);
  const { loading, data, refresh } = useQueryList({
    query: {
      pageSize: DEFAULT_PAGE_SIZE10,
    },
    searchKeyName: 'name',
    queryFunction: queryOptionsList,
  });
  const { list: optionList, count } = data?.data || { count: 0 };

  const [currentOptionId, setCurrentOptionId] = useState<string>('');

  function handleEditOptions(id: string) {
    setCurrentOptionId(id);
    setVisible(true);
  }
  return (
    <div className="bg-white">
      <div className="flex justify-between p-5">
        <div>
          <Button type="primary" onClick={() => handleEditOptions('')}>
            {t('config.addDic')}
          </Button>
        </div>
        <div>
          <InputSearch></InputSearch>
        </div>
      </div>
      {loading ? (
        <Loading></Loading>
      ) : (
        <Table
          dataSource={optionList}
          columns={dataColumns}
          rowKey="_id"
          pagination={false}
          // header高度 nav菜单 搜索框高度 表头高度 分页器高度 footer高度
          // scroll={{ y: 'calc(100vh - 64px - 45px - 70px - 100px - 55px)' }}
          scroll={{ y: 'calc(100vh - 64px - 45px - 72px - 55px - 56px - 70px)' }}
        ></Table>
      )}
      <div className="py-3">
        <SearchPagination
          total={count}
          position="right"
          pageSize={DEFAULT_PAGE_SIZE10}
        ></SearchPagination>
      </div>
      <OptionEdit
        visible={visible}
        setVisible={setVisible}
        refreshList={refresh}
        _id={currentOptionId}
      ></OptionEdit>
    </div>
  );
};

export default OptionsConfig;
