import React from 'react';
import classnames from 'classnames';
import './Card.scss';

interface CardProps {
  className?: string
}

// eslint-disable-next-line import/prefer-default-export
export const Card: React.FC<CardProps> = ({ children, className }) => (
  <div className={classnames('card', className)}>{children}</div>
);
