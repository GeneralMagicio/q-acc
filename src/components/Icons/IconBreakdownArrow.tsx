import { FC } from 'react';
import { IIcon } from './type';

export const IconBreakdownArrow: FC<IIcon> = ({
  size = 16,
  color = 'currentColor',
}) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
      viewBox='0 0 16 16'
      fill='none'
    >
      <path
        d='M3.00065 7.66667H12.334M12.334 7.66667L7.66732 12.3333M12.334 7.66667L7.66732 3'
        stroke='#5326EC'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};
