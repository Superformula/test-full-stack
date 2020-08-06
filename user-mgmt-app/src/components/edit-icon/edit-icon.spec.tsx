import React from 'react';
import { EditIcon } from 'components/edit-icon';
import { render } from '@testing-library/react';
import { fireEvent } from '@testing-library/dom';

describe('EditIcon', () => {
  it('should render successfully', () => {
    const onClickHandler = jest.fn();
    const { baseElement, container } = render(
      <EditIcon onClick={onClickHandler} />
    );
    expect(baseElement).toBeTruthy();
    const div = container.querySelector('div');
    fireEvent.click(div, {
      button: 1,
    });
    expect(onClickHandler).toHaveBeenCalled();
  });
});
