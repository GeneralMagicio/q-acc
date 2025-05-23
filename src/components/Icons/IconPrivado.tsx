import { FC } from 'react';
import { IIcon } from './type';

export const IconPrivado: FC<IIcon> = ({
  size = 24,
  color = 'currentColor',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M0.975098 4.748V19.252C0.975098 21.8742 3.10085 24 5.72312 24H20.2271C22.8494 24 24.9751 21.8742 24.9751 19.252V4.748C24.9751 2.12575 22.8494 0 20.2271 0H5.72312C3.10085 0 0.975098 2.12575 0.975098 4.748Z'
        fill='black'
      />
      <path
        d='M13.6987 19.6324C15.707 19.6324 17.6329 18.8346 19.053 17.4146C20.473 15.9946 21.2708 14.0686 21.2708 12.0603C21.2708 10.0521 20.473 8.12614 19.053 6.70607C17.6329 5.28605 15.707 4.48828 13.6987 4.48828V19.6324Z'
        fill='white'
      />
      <path
        d='M10.3533 10.4448H7.35205V19.6324H10.3533V10.4448Z'
        fill='white'
      />
      <path
        d='M8.83797 8.40739C9.92022 8.40739 10.7976 7.53008 10.7976 6.44783C10.7976 5.36559 9.92022 4.48828 8.83797 4.48828C7.75573 4.48828 6.87842 5.36559 6.87842 6.44783C6.87842 7.53008 7.75573 8.40739 8.83797 8.40739Z'
        fill='white'
      />
    </svg>
  );
};
