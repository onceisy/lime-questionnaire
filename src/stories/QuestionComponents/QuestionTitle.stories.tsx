import type { Meta, StoryObj } from '@storybook/react';
import QuestionTitle from '../../views/Question/QuestionEdit/Components/QuestionTitle/QuestionTitle';

const meta = {
  title: 'Question/QuestionTitle',
  component: QuestionTitle,
  tags: ['autodocs'],
} satisfies Meta<typeof QuestionTitle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Title_Description: Story = {
  args: {
    text: '问卷标题',
    level: 3,
    description: '问卷描述',
    isCenter: false,
  },
};

export const Title: Story = {
  args: {
    text: '问卷标题',
    level: 3,
    description: '',
    isCenter: false,
  },
};

export const Description: Story = {
  args: {
    text: '',
    level: 3,
    description: '问卷描述',
    isCenter: false,
  },
};
