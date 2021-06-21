// eslint-disable-next-line import/no-extraneous-dependencies
import { render, screen } from '@testing-library/react';
import React from 'react';

import { Modal } from '../Modal';

describe('<Modal />', () => {
  beforeEach(() => {
    let portalRoot = document.getElementById('modal-root');
    if (!portalRoot) {
      portalRoot = document.createElement('div');
      portalRoot.setAttribute('id', 'modal-root');
      document.body.appendChild(portalRoot);
    }
  });

  it('Should render correctly', () => {
    render(
      <Modal isOpen title="Modal Title" />,
    );

    expect(screen.getByText('Modal Title')).toBeInTheDocument();
  });

  it('Should have footer when props is present', () => {
    render(
      <Modal isOpen title="Modal Title" footer={<span>footer</span>} />,
    );

    expect(screen.getByText('footer')).toBeInTheDocument();
  });
});
