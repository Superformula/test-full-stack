import React from 'react';
import classnames from 'classnames';
import './Card.scss';

interface CardProps {
  className?: string
}

export const Card: React.FC<CardProps> = ({ children, className }) => (
  <div className={classnames('card', className)}>{children}</div>
);
