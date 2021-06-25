import React from 'react';
import { Meta } from '@storybook/react';

import { Modal } from './Modal';
import useToggle from '../../hooks/useToggle';
import { DefaultModalFooter } from './DefaultModalFooter/DefaultModalFooter';

export default {
  title: 'Modal',
  component: Modal,
} as Meta;

export const ModalDefault = () => {
  const [isOpen, open, close] = useToggle(false);
  return (
    <>
      <button type="button" onClick={open}>open</button>
      <Modal
        isOpen={isOpen}
        title="Modal title"
        footer={<DefaultModalFooter onOkClick={close} onCancelClick={close} />}
      >
        Content will be here
      </Modal>
    </>
  );
};
