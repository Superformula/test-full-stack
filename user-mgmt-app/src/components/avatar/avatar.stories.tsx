import { Avatar as AvatarComponent } from 'components/avatar';
import React from 'react';

export default {
  title: 'Avatar',
  component: AvatarComponent,
};

export const Avatar = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <AvatarComponent imageUrl="https://source.unsplash.com/random/168x168/?headshot&idx=1" />
    </div>
  );
};
