import React, { FC } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import QuestionInput from '../../views/Question/QuestionEdit/Components/QuestionInput/QuestionInput';
import QuestionInputPropsType from '@/views/Question/QuestionEdit/Components/QuestionInput/interface';
import { Form } from 'antd';

const QuestionInputForm: FC<QuestionInputPropsType> = (props: QuestionInputPropsType) => {
  return (
    <>
      <Form layout="vertical">
        <QuestionInput {...props} />
      </Form>
    </>
  );
};

const meta = {
  title: 'Question/QuestionInput',
  component: QuestionInputForm,
  tags: ['autodocs'],
} satisfies Meta<typeof QuestionInputForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Input: Story = {
  args: {
    label: '单行文本输入框',
    required: true,
    placeholder: '请输入...',
  },
};
