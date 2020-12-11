import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Input from './Input';

test('should render a input', () => {
  const { container } = render(<Input id="test" />);
  const inputElement = container.querySelector('input') as HTMLInputElement;
  fireEvent.change(inputElement, { target: { value: 'Hello' } });
  expect(inputElement).toBeInTheDocument();
});

test('should render the label', () => {
  const labelText = 'Label Text';
  const { container } = render(<Input id="test" label={labelText} />);
  const labelElement = container.querySelector('label');
  expect(labelElement).toBeInTheDocument();
  expect(labelElement?.textContent).toBe(labelText);
});

test('should trigger the onChange handler', () => {
  const onChangeMock = jest.fn();
  const { container } = render(<Input id="test" onChange={onChangeMock} />);
  const inputElement = container.querySelector('input') as HTMLInputElement;
  fireEvent.change(inputElement, { target: { value: 'Hello' } });
  expect(onChangeMock).toHaveBeenCalledTimes(1);
});
