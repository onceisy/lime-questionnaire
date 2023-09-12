import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import Loading from '@/components/Loading/Loading';
import { queryQuestionReportData } from '@/service/report';
import { ComponentInfoType, QuestionInfoType } from '@/store/questionInfoSlice';
import { useRequest } from 'ahooks';
import { Checkbox, Divider, Empty, Typography } from 'antd';
import { useParams } from 'react-router-dom';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';
import { useTranslation } from 'react-i18next';
import { getComponentConfByType } from '../../QuestionEdit/Components';

export interface ReportDataType {
  componentId: string;
  componentType?: string;
  name: string;
  data: {
    label: string;
    count: number;
  }[];
}

interface QuestionReportPropsType {
  setQuestionInfo: Dispatch<SetStateAction<QuestionInfoType>>;
}

const QuestionReport: FC<QuestionReportPropsType> = ({ setQuestionInfo }) => {
  const { t } = useTranslation();
  const [componentList, setComponentList] = useState<ComponentInfoType[]>([]);
  const [reportList, setReportList] = useState<ReportDataType[]>([]);

  const { id = '' } = useParams();
  const { loading, data } = useRequest(async () => await queryQuestionReportData(id), {
    loadingDelay: 300,
  });

  useEffect(() => {
    if (data) {
      const { question, report = [] } = data?.data || {};
      setQuestionInfo(question);
      setReportList(report);
      setComponentList(question.componentList);
      setCheckedList(question.componentList.map((c: ComponentInfoType) => c.componentId));
    }
  }, [data]);

  const [checkedList, setCheckedList] = useState<CheckboxValueType[]>([]);

  const checkAll = componentList.length === checkedList.length;
  const indeterminate = checkedList.length > 0 && checkedList.length < componentList.length;

  const onChange = (list: CheckboxValueType[]) => {
    const checkedIds: string[] = [];
    componentList.forEach(c => {
      if (list.includes(c.componentId)) {
        checkedIds.push(c.componentId);
      }
    });
    setCheckedList(checkedIds);
  };

  const onCheckAllChange = (e: CheckboxChangeEvent) => {
    setCheckedList(e.target.checked ? componentList.map(c => c.componentId) : []);
  };

  const ReportEmpty: FC<ReportDataType> = (props: ReportDataType) => {
    const { name, componentType = '' } = props;
    return (
      <div>
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
          {getComponentConfByType(componentType)?.name} / {t('statistic.answerCount')}: -
        </div>
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={t('statistic.noStatistic')} />
      </div>
    );
  };

  /**
   * @description: 生成报表统计组件
   * @param {string} componentId
   * @return {*}
   */
  function genReportComponent(componentId: string) {
    const data = reportList.find(r => r.componentId === componentId) || {
      componentId: '',
      name: '',
      data: [],
    };
    if (!componentId) return <ReportEmpty {...data} />;
    const { type } = componentList.find(c => c.componentId === componentId) || {};
    if (!type) return <ReportEmpty {...data} />;
    const { ReportComponent } = getComponentConfByType(type) || {};
    if (!ReportComponent) return <ReportEmpty {...data} />;
    return <ReportComponent {...data} />;
  }

  return (
    <>
      {loading ? (
        <Loading top={60}></Loading>
      ) : (
        <div className="flex border-t border-solid border-gray-100 border-x-0 border-b-0">
          <div className="w-72 px-3 border-0 border-r border-gray-100 border-solid">
            <Typography.Title level={4} className="py-4" style={{ margin: 0 }}>
              报表目录
            </Typography.Title>
            <Divider className="py-0 my-0" />
            <div
              className="overflow-y-scroll"
              style={{
                maxHeight: 'calc(100vh - 56px - 60px)',
              }}
            >
              <div className="py-2">
                <Checkbox
                  indeterminate={indeterminate}
                  onChange={onCheckAllChange}
                  checked={checkAll}
                >
                  {t('public.all')}
                </Checkbox>
              </div>
              <Checkbox.Group value={checkedList} onChange={onChange} style={{ display: 'block' }}>
                {componentList.map(c => {
                  const { name, props, componentId } = c;
                  const { label, text } = props || {};
                  return (
                    <div className="py-2" key={componentId}>
                      <Checkbox value={componentId}>{name || text || label || ''}</Checkbox>
                    </div>
                  );
                })}
              </Checkbox.Group>
            </div>
          </div>
          <div
            className="flex-1 overflow-scroll"
            style={{
              maxHeight: 'calc(100vh - 56px)',
            }}
          >
            {checkedList.map(i => {
              return (
                <div
                  key={i as string}
                  className="border border-gray-100 border-solid rounded-lg m-4 p-3"
                >
                  {genReportComponent(i as string)}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default QuestionReport;
