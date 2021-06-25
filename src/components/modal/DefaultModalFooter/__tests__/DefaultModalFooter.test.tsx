// eslint-disable-next-line import/no-extraneous-dependencies
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { act } from 'react-dom/test-utils';
import { DefaultModalFooter } from '../DefaultModalFooter';

const onOkText = 'SAVE';
const onCancelText = 'CANCEL';

describe('<DefaultModalFooter />', () => {
  it('Should have action to cancel click', () => {
    const onCancelClick = jest.fn();

    render(
      <DefaultModalFooter
        onCancelClick={onCancelClick}
        onCancelText={onCancelText}
        onOkClick={() => {}}
      />,
    );

    act(() => {
      fireEvent.click(screen.getByText(onCancelText));
    });

    expect(onCancelClick).toBeCalled();
  });

  it('Should have action to save click', () => {
    const onSaveClick = jest.fn();

    render(
      <DefaultModalFooter onCancelClick={() => {}} onOkClick={onSaveClick} onOkText={onOkText} />,
    );

    act(() => {
      fireEvent.click(screen.getByText(onOkText));
    });

    expect(onSaveClick).toBeCalled();
  });

  it('Should not trigger buttons actions when disabled props is present', () => {
    const onCancelClick = jest.fn();
    const onSaveClick = jest.fn();

    render(
      <DefaultModalFooter
        onCancelClick={onCancelClick}
        onOkClick={onSaveClick}
        onOkText={onOkText}
        buttonsDisabled
      />,
    );

    act(() => {
      fireEvent.click(screen.getByText(onCancelText));
    });

    act(() => {
      fireEvent.click(screen.getByText(onOkText));
    });

    expect(onCancelClick).not.toBeCalled();
    expect(onSaveClick).not.toBeCalled();
  });
});
