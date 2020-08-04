import { AvatarDiv } from 'components/avatar/styles';
import React from 'react';

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
