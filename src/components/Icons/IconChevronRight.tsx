import { FC } from 'react';
import { IIcon } from './type';

export const IconChevronRight: FC<IIcon> = ({
  size = 16,
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
        d='M11.5361 8.20582L18.8332 15.5029L11.5361 22.8'
        stroke={color}
        strokeWidth='1.82428'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};
