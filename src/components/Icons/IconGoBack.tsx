import { FC } from 'react';
import { IIcon } from './type';

export const IconGoBack: FC<IIcon> = ({
  size = 32,
  color = 'currentColor',
}) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
      viewBox='0 0 32 32'
      fill='none'
    >
      <path
        d='M7 10L3 14L7 18M4 14H22.375C26.0475 14 29 17.0831 29 20.75V22'
        stroke='#1D1E1F'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};
