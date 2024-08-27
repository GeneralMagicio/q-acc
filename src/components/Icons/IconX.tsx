import { FC } from 'react';
import { IIcon } from './type';

export const IconX: FC<IIcon> = ({ size = 16, color = 'currentColor' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 16 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        id='Vector'
        d='M1.48488 0.928955L15.627 15.0711M0.777771 15.0711L14.9199 0.928963'
        stroke='currentColor'
        strokeWidth='2'
      />
    </svg>
  );
};
