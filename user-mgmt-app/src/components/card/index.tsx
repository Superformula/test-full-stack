import React from 'react';

export interface CardProps {}

const CardComponent: React.FC<CardProps> = () => {
  return <div>Hallo</div>;
};

export const Card = CardComponent;
