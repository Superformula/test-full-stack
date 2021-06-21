import React from 'react';
import classnames from 'classnames';
import './Typography.scss';

type VariantEnum = 'h1' | 'h2' | 'paragraph';
type ColorEnum = 'primary' | 'error';

interface CardProps {
  variant?: VariantEnum
  color?: ColorEnum
  className?: string
}

export const Typography: React.FC<CardProps> = ({
  children, variant, className, color = 'primary',
}) => (
  <div className={classnames(className, {
    [`typography--variant-${variant}`]: variant,
    [`typography--color-${color}`]: color,
  })}
  >
    {children}
  </div>
);
