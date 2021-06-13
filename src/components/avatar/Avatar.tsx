import { memo } from 'react';
import classnames from 'classnames';

import classes from './Avatar.module.scss';

interface AvatarProps {
  src: string;
  title: string;
  className?: string;
}

function AvatarComponent(props: AvatarProps) {
  return (
    <div
      className={classnames(classes.element, props.className)}
      style={{
        backgroundImage: `url("${props.src}"), url("assets/profile.jpg")`,
      }}
    />
  );
}

export const Avatar = memo(AvatarComponent);
