import React, { FC, useEffect, useState } from 'react';
import { QuestionCheckboxPropsType } from './interface';
import { Col, Form, Checkbox, Row } from 'antd';
import { chunk } from 'lodash';
import { OptionType } from '@/views/Config/OptionsConfig/OptionEdit';
import { useGetOptions } from '@/hooks/useGetOptions';

const QuestionCheckbox: FC<QuestionCheckboxPropsType> = (props: QuestionCheckboxPropsType) => {
  const {
    label,
    // _id = '',
    options = [],
    required,
    rowCount = 1,
    isUseDic,
    dicId = '',
    defaultValue = [],
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
          <Checkbox.Group
            value={defaultValue as string[]}
            style={{ width: '100%', display: 'block' }}
          >
            {chunkOptions.map((arr, i) => {
              return (
                <Row key={i} gutter={16} className="mb-5 last:mb-0">
                  {arr.map(o => {
                    const { label, key } = o;
                    return (
                      <Col key={key} span={24 / rowCount}>
                        <Checkbox value={key}>{label}</Checkbox>
                      </Col>
                    );
                  })}
                </Row>
              );
            })}
          </Checkbox.Group>
        </Form.Item>
      </div>
    </div>
  );
};

export default QuestionCheckbox;
