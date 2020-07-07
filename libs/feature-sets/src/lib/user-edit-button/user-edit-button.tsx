/** @jsx jsx */
import { jsx } from '@emotion/core';

import styled from '@emotion/styled';

/* eslint-disable-next-line */
export interface UserEditButtonProps {
  action: any
}

const EditPencil = styled.button`
  color: white;
  position: absolute;
  top: 8%;
  right: 15%;
  width: 10px;
  height: 10px;
  border: none;
  background: none;
`;

const EditIcon = () => (
  <div className='close-icon'>
    <svg viewBox='0 0 40 40' width='40' height='40'>
      <g id="ID0.01207443606108427">
        <path id="ID0.8865596586838365" fill="#FFFFFF" stroke="none" d="M 91 99 L 132 99 L 132 140 L 91 140 L 91 99 Z " transform="matrix(0.8292682766914368, 0, 0, 0.8292682766914368, -75.45, -82.1)"/>
        <g id="ID0.7310718330554664">
          <g id="ID0.38590917782858014">
            <path id="ID0.3246160401031375" fill="#9C9C9C" stroke="none" d="M 28 195 L 58 195 L 58 203 L 28 203 L 28 195 Z " transform="matrix(0.35753950476646423, -0.4628666341304779, 0.6208510994911194, 0.47957393527030945, -122.2, -58.65)"/>
            <path id="ID0.7747227218933403" fill="#9C9C9C" stroke="none" stroke-linecap="round" d="M 265.250 79.200 L 270 80 L 266.750 87.800 L 265.250 79.200 Z " transform="matrix(1.0236241817474365, 0.7809885144233704, -0.4277697205543518, 0.5606682896614075, -229.35, -228.7)"/>
            <path id="ID0.3246160401031375" fill="#9C9C9C" stroke="none" d="M 28 195 L 58 195 L 58 203 L 28 203 L 28 195 Z " transform="matrix(0.10146887600421906, -0.13136045634746552, 0.6622411012649536, 0.5115455389022827, -111.7, -89.35)"/>
          </g>
        </g>
      </g>
    </svg>
  </div>
);
export const UserEditButton = ({ action }: UserEditButtonProps) => {
  return (
    <EditPencil onClick={action}>
      <EditIcon/>
    </EditPencil>
  );
};

export default UserEditButton;
