import { FC } from 'react';
import { IIcon } from './type';

export const IconPendingSpinner: FC<IIcon> = ({
  size = 30,
  color = 'currentColor',
}) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 100 100'
      preserveAspectRatio='xMidYMid'
      width='30'
      height='30'
    >
      <g>
        <circle
          stroke-dasharray='103.67255756846316 36.55751918948772'
          r='22'
          strokeWidth='10'
          stroke='#0a91fe'
          fill='none'
          cy='50'
          cx='50'
        >
          <animateTransform
            keyTimes='0;1'
            values='0 50 50;360 50 50'
            dur='1s'
            repeatCount='indefinite'
            type='rotate'
            attributeName='transform'
          ></animateTransform>
        </circle>
        <g></g>
      </g>
    </svg>
  );
};
