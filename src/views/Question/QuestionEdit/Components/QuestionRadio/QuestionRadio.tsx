import React, { FC, useEffect, useState } from 'react';
import { QuestionRadioPropsType } from './interface';
import { Col, Form, Radio, Row } from 'antd';
import { chunk } from 'lodash';
import { OptionType } from '@/views/Config/OptionsConfig/OptionEdit';
import { useGetOptions } from '@/hooks/useGetOptions';

const QuestionRadio: FC<QuestionRadioPropsType> = (props: QuestionRadioPropsType) => {
  const {
    label,
    // _id = '',
    options = [],
    required,
    rowCount = 1,
    isUseDic,
    dicId = '',
    defaultValue,
  } = props;
  const { getDicOptionsById } = useGetOptions();
  // 分割数组，展示布局
  const [chunkOptions, setChunkOptions] = useState<OptionType[][]>([]);
  useEffect(() => {
    async function setDicOptions() {
      const dicOptions = await getDicOptionsById(dicId);
      setChunkOptions(chunk(dicOptions, rowCount));
    }
    if (isUseDic) {
      setDicOptions();
    } else {
      setChunkOptions(chunk(options, rowCount));
    }
  }, [rowCount, options, dicId, isUseDic]);

  return (
    <div>
      <div className="pointer-events-none">
        <Form.Item
          label={label}
          // name={_id}
          required={required}
          className="mb-0"
        >
          <Radio.Group value={defaultValue} style={{ width: '100%' }}>
            {chunkOptions.map((arr, i) => {
              return (
                <Row key={i} gutter={16} className="mb-5 last:mb-0">
                  {arr.map(o => {
                    const { label, key } = o;
                    return (
                      <Col key={key} span={24 / rowCount}>
                        <Radio value={key}>{label}</Radio>
                      </Col>
                    );
                  })}
                </Row>
              );
            })}
          </Radio.Group>
        </Form.Item>
      </div>
    </div>
  );
};

export default QuestionRadio;
