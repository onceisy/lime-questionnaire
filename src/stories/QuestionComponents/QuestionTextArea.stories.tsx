import React, { FC } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import QuestionTextArea from '../../views/Question/QuestionEdit/Components/QuestionTextArea/QuestionTextArea';
import { Form } from 'antd';
import { QuestionTextAreaPropsType } from '../../views/Question/QuestionEdit/Components/QuestionTextArea/interface';

const ComponentForm: FC<QuestionTextAreaPropsType> = (props: QuestionTextAreaPropsType) => {
  return (
    <>
      <Form layout="vertical">
        <QuestionTextArea {...props} />
      </Form>
    </>
  );
};

const meta = {
  title: 'Question/QuestionTextArea',
  component: ComponentForm,
  tags: ['autodocs'],
} satisfies Meta<typeof ComponentForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Input: Story = {
  args: {
    label: '单行文本输入框',
    required: true,
    placeholder: '请输入...',
    maxLength: 120,
    showCount: true,
    rows: 5,
  },
};
