import React, { forwardRef } from 'react';
import Modal from './Modal';

type UserDetailsModalProps = {
  ref: any;
};

// eslint-disable-next-line react/display-name,@typescript-eslint/no-explicit-any
const UserDetailsModal = forwardRef((props: any, ref: any) => (
  <Modal ref={ref}>
    <h1>Modal Header</h1>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum volutpat odio et urna elementum cursus. Donec
      consectetur nisl metus. Nunc eu lectus sollicitudin eros rutrum lobortis vitae elementum sapien. Quisque sagittis
      magna gravida faucibus suscipit. Nam vitae velit nec elit placerat finibus ac vitae magna. Donec luctus nibh in
      bibendum elementum. Aenean id dui est. Nulla hendrerit nisl et est sollicitudin rutrum. Ut suscipit, sapien vitae
      feugiat sagittis, metus felis tincidunt ipsum, quis posuere dui erat pulvinar justo. Ut sed ultrices risus.
      Curabitur et lectus pharetra, sodales elit ac, sollicitudin lacus. Aenean neque leo, ultricies maximus mi vitae,
      ultrices ultricies lorem. Aenean blandit fringilla nunc in vestibulum. Mauris at massa tincidunt, ultricies nisi
      quis, pharetra est. Aenean convallis, nisi quis mattis vulputate, est erat dapibus tortor, rhoncus condimentum
      diam purus quis dui. Mauris semper, dolor ut fringilla tristique, ipsum sem pellentesque lectus, id varius diam
      orci sit amet neque. Vestibulum ut finibus nisi. Morbi eu mauris finibus, consectetur magna in, rutrum ipsum. In a
      libero diam. Curabitur vel placerat quam. Nam vitae dapibus dui. Suspendisse ac congue quam. Phasellus dolor
      metus, viverra ut est ac, consequat malesuada enim. Curabitur et quam in ipsum lacinia feugiat. Cras tempus dui
      vel mattis sodales. Donec imperdiet est non nisl vulputate accumsan. Pellentesque gravida fermentum est.
    </p>
  </Modal>
));

export default UserDetailsModal;
