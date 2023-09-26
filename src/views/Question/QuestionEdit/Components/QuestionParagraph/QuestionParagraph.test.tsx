import React from 'react';
import QuestionParagraph from './QuestionParagraph';
import { render, screen } from '@testing-library/react';
import i18n from '../../../../../locales/index';
import { I18nextProvider } from 'react-i18next';
import QuestionParagraphPropsType, { getQuestionParagraphDefaultProps } from './interface';

test('Default Props', () => {
  const props = getQuestionParagraphDefaultProps(i18n.t);
  render(
    <I18nextProvider i18n={i18n}>
      <QuestionParagraph {...props} />
    </I18nextProvider>
  );
  const div = screen.getByText(i18n.t('question.questionParagraph'));
  expect(div).toBeInTheDocument();

  const isCenter = div.className.includes('text-center');
  expect(isCenter).toBeFalsy();

  const strong = div.querySelector('strong');
  expect(strong).toBeNull();

  const i = div.querySelector('i');
  expect(i).toBeNull();

  const code = div.querySelector('code');
  expect(code).toBeNull();

  const style = div.style;
  expect(style.color).toBe('rgba(0, 0, 0, 0.88)');
  expect(style.fontSize).toBe('14px');
});

test('Customer Props', () => {
  const props: QuestionParagraphPropsType = {
    text: '测试问卷段落',
    isCenter: true,
    isStrong: true,
    isItalic: true,
    isCode: true,
    fontSize: 16,
    textColor: 'rgb(102, 102, 102)',
  };
  const { container } = render(<QuestionParagraph {...props} />);
  const text = screen.getByText('测试问卷段落');
  expect(text).toBeInTheDocument();

  const div: HTMLDivElement =
    container.querySelector('.ant-typography') || document.createElement('div');

  const isCenter = div.className.includes('text-center');
  expect(isCenter).toBeTruthy();

  const strong = div.querySelector('strong');
  expect(strong).not.toBeNull();

  const i = div.querySelector('i');
  expect(i).not.toBeNull();

  const code = div.querySelector('code');
  expect(code).not.toBeNull();

  const style = div.style;
  expect(style.color).toBe('rgb(102, 102, 102)');
  expect(style.fontSize).toBe('16px');
});
