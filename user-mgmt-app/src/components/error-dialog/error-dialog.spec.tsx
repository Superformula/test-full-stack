import React from 'react';
import { ErrorDialog } from 'components/error-dialog';
import { render } from '@testing-library/react';
import { fireEvent } from '@testing-library/dom';

describe('ErrorDialog', () => {
  it('should render successfully', () => {
    const onClickHandler = jest.fn();
    const { baseElement, container, findByText } = render(
      <ErrorDialog errorMessage={'Boom!'} onDismiss={onClickHandler} />
    );
    expect(baseElement).toBeTruthy();
    const text = findByText('Boom!');
    expect(text).toBeTruthy();

    const button = container.querySelector('button');
    fireEvent.click(button, {
      button: 1,
    });
    expect(onClickHandler).toHaveBeenCalled();
  });
});
