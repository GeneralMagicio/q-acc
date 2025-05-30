import { FC } from 'react';
import { IIcon } from './type';

export const IconTransactionProgress: FC<IIcon> = ({
  size = 24,
  color = '#0083E0',
}) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
    >
      <path
        d='M21 12C20.9999 13.9005 20.3981 15.7523 19.2809 17.2899C18.1637 18.8274 16.5885 19.9719 14.7809 20.5591C12.9733 21.1464 11.0262 21.1463 9.21864 20.559C7.41109 19.9716 5.83588 18.8271 4.71876 17.2895C3.60165 15.7518 2.99999 13.9 3 11.9994C3.00001 10.0989 3.60171 8.24706 4.71884 6.70945C5.83598 5.17184 7.4112 4.02736 9.21877 3.44003C11.0263 2.8527 12.9734 2.85267 14.781 3.43995'
        stroke={color}
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M9 12L11 14L15 10'
        stroke={color}
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};
