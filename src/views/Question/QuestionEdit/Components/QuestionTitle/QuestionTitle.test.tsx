import React from 'react';
import { render, screen } from '@testing-library/react';
import QuestionTitle from './QuestionTitle';
import i18n from '../../../../../locales/index';
import { I18nextProvider } from 'react-i18next';
import QuestionTitlePropsType, { getQuestionTitleDefaultProps } from './interface';

test('Default Props', () => {
  const defaultProps = getQuestionTitleDefaultProps(i18n.t);
  render(
    <I18nextProvider i18n={i18n}>
      <QuestionTitle {...defaultProps} />
    </I18nextProvider>
  );

  const desc = screen.getByText(i18n.t('question.defaultDescription'));
  expect(desc).toBeInTheDocument();

  const title = screen.getByText(i18n.t('manage.questionTitle'));
  expect(title).toBeInTheDocument();

  expect(title.matches(`h${defaultProps.level}`)).toBeTruthy();

  const style = title.style;
  expect(style.textAlign).toBe('left');
});

test('Customer Props', () => {
  const props: QuestionTitlePropsType = {
    text: '测试标题',
    level: 2,
    isCenter: true,
    description: '测试描述',
  };
  render(
    <I18nextProvider i18n={i18n}>
      <QuestionTitle {...props} />
    </I18nextProvider>
  );

  const desc = screen.getByText('测试描述');
  expect(desc).toBeInTheDocument();

  const title = screen.getByText('测试标题');
  expect(title).toBeInTheDocument();

  expect(title.matches(`h${props.level}`)).toBeTruthy();

  const style = title.style;
  expect(style.textAlign).toBe('center');
});
