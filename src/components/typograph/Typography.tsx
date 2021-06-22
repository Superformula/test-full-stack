import React from 'react';
import classnames from 'classnames';
import './Typography.scss';

type VariantEnum = 'h1' | 'h2' | 'paragraph';
type ColorEnum = 'primary' | 'error';

interface CardProps {
  variant: VariantEnum
  color?: ColorEnum
  className?: string
}

const variantMapping = {
  h1: 'h1',
  h2: 'h2',
  paragraph: 'p',
};

export const Typography: React.FC<CardProps> = ({
  children, variant, className, color = 'primary',
}) => {
  const Component: any = variantMapping[variant];

  return (
    <Component className={classnames(className, 'typography', {
      [`typography--variant-${variant}`]: variant,
      [`typography--color-${color}`]: color,
    })}
    >
      {children}
    </Component>
  );
};
