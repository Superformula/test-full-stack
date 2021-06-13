import { memo } from 'react';
import { ChildrenProps } from '../General';
import classnames from 'classnames';
import classes from './Card.module.scss';

interface CardProps extends ChildrenProps {
  className?: string;
}

function CardComponent(props: CardProps) {
  return (
    <div className={classnames(classes.element, props.className)}>
      {props.children}
    </div>
  );
}

export const Card = memo(CardComponent);
