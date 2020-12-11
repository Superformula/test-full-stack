import React from 'react';
import { render } from '@testing-library/react';
import moment from 'moment';
import Card from './Card';
import styles from './Card.module.scss';

test('should render the Card', () => {
  const user = {
    id: '1',
    name: 'Test',
  };
  const { container } = render(<Card user={user} />);
  const wrapperElement = container.querySelector(`.${styles.wrapper}`);
  expect(wrapperElement).toBeInTheDocument();
});

test('should render showing the updatedAt', () => {
  const user = {
    id: '1',
    name: 'Test',
    updatedAt: '2020-12-10T12:43:29.888Z',
  };
  const { container } = render(<Card user={user} />);
  const dateValueElement = container.querySelector(`.${styles.dateValue}`);
  expect(dateValueElement).toBeInTheDocument();
  expect(dateValueElement?.textContent).toBe(
    moment(user.updatedAt).format('DD MMM YYYY'),
  );
});
