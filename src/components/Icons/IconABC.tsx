import { FC } from 'react';
import { IIcon } from './type';

export const IconABC: FC<IIcon> = ({ size = 24, color = 'currentColor' }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
    >
      <path
        d='M24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12Z'
        fill='black'
      />
      <path
        d='M22.5 12C22.5 17.799 17.799 22.5 12 22.5C6.20101 22.5 1.5 17.799 1.5 12C1.5 6.20101 6.20101 1.5 12 1.5C17.799 1.5 22.5 6.20101 22.5 12Z'
        fill='white'
      />
      <path
        d='M8.38081 14.25H7.44987V12.4477H4.68094V14.25H3.75V10.6453H4.68094V11.5523H7.44987V10.6453H4.68094V9.75H7.44987V10.6453H8.38081V14.25Z'
        fill='black'
      />
      <path
        d='M10.2405 12.4477V13.3547H13.0095V12.4477H10.2405ZM10.2405 10.6453V11.5523H13.0095V10.6453H10.2405ZM9.3096 14.25V9.75H13.0095V10.6453H13.9404V11.5523H13.0095V12.4477H13.9404V13.3547H13.0095V14.25H9.3096Z'
        fill='black'
      />
      <path
        d='M18.5691 14.25H15.8001V13.3547H14.8692V10.6453H15.8001V9.75H18.5691V10.6453H19.5V11.5523H18.5691V10.6453H15.8001V13.3547H18.5691V12.4477H19.5V13.3547H18.5691V14.25Z'
        fill='black'
      />
    </svg>
  );
};
