import React from 'react';
import { AvatarDiv } from 'components/avatar/styles';

export interface AvatarProps {
  imageUrl: string;
  className?: string;
}

const AvatarComponent: React.FC<AvatarProps> = ({ imageUrl, className }) => {
  return (
    <>
      <AvatarDiv imageUrl={imageUrl} className={className} />
    </>
  );
};

export const Avatar = AvatarComponent;
