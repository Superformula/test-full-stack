import React from 'react';
import classnames from 'classnames';
import './Typography.scss';

type VariantEnum = 'h1' | 'h2' | 'paragraph';
type ColorEnum = 'primary' | 'error';

interface CardProps {
  variant?: VariantEnum
  color?: ColorEnum
}

// eslint-disable-next-line import/prefer-default-export
export const Typography: React.FC<CardProps> = ({ children, variant, color = 'primary' }) => (
  <div className={classnames({
    [`typography--variant-${variant}`]: variant,
    [`typography--color-${color}`]: color,
  })}
  >
    {children}
  </div>
);
