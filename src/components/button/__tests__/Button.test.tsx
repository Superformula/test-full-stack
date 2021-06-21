// eslint-disable-next-line import/no-extraneous-dependencies
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { act } from 'react-dom/test-utils';
import { Button } from '../Button';

const buttonText = 'OK';

describe('<Button />', () => {
  it('Should render correctly', () => {
    render(
      <Button text={buttonText} color="primary" />,
    );

    expect(screen.getByText(buttonText)).toBeInTheDocument();
  });

  it('Should have action to click', () => {
    const onClick = jest.fn();

    render(
      <Button text={buttonText} color="primary" onClick={onClick} />,
    );

    act(() => {
      fireEvent.click(screen.getByText(buttonText));
    });

    expect(onClick).toBeCalled();
  });
});
