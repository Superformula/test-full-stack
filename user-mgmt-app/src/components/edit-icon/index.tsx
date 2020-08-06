import React from 'react';

const editIconSvg = (
  <svg width="22" height="22" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* eslint-disable-next-line max-len */}
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.595 12.758a.99.99 0 00-.39.455l-2.121 4.95c-.356.83.483 1.668 1.313 1.313l4.95-2.122a.99.99 0 00.455-.39c.074-.05.145-.11.212-.175l7.778-7.779 1.414-1.414 1.768-1.768a2 2 0 000-2.828l-1.415-1.414a2 2 0 00-2.828 0l-10.96 10.96a1.5 1.5 0 00-.176.212zm1.944.849l1.414 1.414 7.424-7.425-1.414-1.414-7.424 7.425zm12.02-9.193l-1.767 1.768-1.415-1.414L17.145 3l1.414 1.414zM5.462 15.358l-.555 1.294 1.294-.554-.74-.74z"
      fill="#000"
      fillOpacity=".4"
    />
  </svg>
);

export interface EditIconProps {
  onClick?: () => void;
}

export const EditIcon: React.FC<EditIconProps> = ({ onClick }) => {
  return <div onClick={onClick}>{editIconSvg}</div>;
};
