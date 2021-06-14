import classnames from 'classnames';
import { memo } from 'react';

import classes from './Avatar.module.scss';

interface AvatarProps {
  src: string;
  title: string;
  className?: string;
}

function AvatarComponent(props: AvatarProps) {
  const imageUrl = props.src ? props.src : 'assets/profile.jpg';
  return (
    <div
      className={classnames(classes.avatar, props.className)}
      style={{
        backgroundImage: `url("${imageUrl}")`,
      }}
    />
  );
}

export const Avatar = memo(AvatarComponent);
