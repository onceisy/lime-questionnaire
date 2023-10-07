import type { Meta, StoryObj } from '@storybook/react';
import QuestionParagraph from '../../views/Question/QuestionEdit/Components/QuestionParagraph/QuestionParagraph';

const meta = {
  title: 'Question/QuestionParagraph',
  component: QuestionParagraph,
  tags: ['autodocs'],
} satisfies Meta<typeof QuestionParagraph>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Paragraph: Story = {
  args: {
    text: '问卷段落描述组件',
    isCenter: false,
    isStrong: false,
    isItalic: false,
    isCode: false,
    fontSize: 14,
    textColor: '#33333',
  },
};
