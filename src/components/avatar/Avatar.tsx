import React from 'react';
import './Avatar.scss';

export interface AvatarProps {
  url: string
  alt: string
}

export const Avatar: React.FC<AvatarProps> = ({ url, alt }) => (
  <img className="avatar" src={url} alt={alt} />
);
