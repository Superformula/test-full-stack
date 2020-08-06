import React from 'react';
import { ButtonProps, PrimaryButton } from 'components/button';
import { render } from '@testing-library/react';
import { fireEvent } from '@testing-library/dom';

describe('PrimaryButton', () => {
  it('should render successfully', () => {
    const onClickHandler = jest.fn();
    const props: ButtonProps = { onClick: onClickHandler, disabled: false };
    const { baseElement, getByText } = render(
      <PrimaryButton {...props}>Hallo</PrimaryButton>
    );
    expect(baseElement).toBeTruthy();
    const buttonTxt = getByText(/Hallo/i);
    expect(buttonTxt).toBeInTheDocument();
    fireEvent.click(buttonTxt, { button: 1 });
    expect(onClickHandler).toHaveBeenCalled();
  });

  it('should not be clickable', () => {
    const onClickHandler = jest.fn();
    const props: ButtonProps = { onClick: onClickHandler, disabled: true };
    const { baseElement } = render(
      <PrimaryButton {...props}>Hallo</PrimaryButton>
    );
    fireEvent.click(baseElement);
    expect(onClickHandler).not.toHaveBeenCalled();
  });
});
