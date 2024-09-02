import { FC } from 'react';
import { IIcon } from './type';

export const IconReddit: FC<IIcon> = ({ size = 16, color = '#1D1E1F' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 18 18'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g id='Social Icons' clipPath='url(#clip0_750_8700)'>
        <path
          id='Vector'
          d='M18 8.62506C17.998 8.15151 17.8466 7.69067 17.5673 7.30819C17.2881 6.9257 16.8954 6.64106 16.4449 6.4948C15.9945 6.34854 15.5095 6.34812 15.0588 6.49361C14.6082 6.63909 14.2149 6.92306 13.935 7.30506C12.6102 6.51605 11.1105 6.06768 9.57002 6.00006C9.61502 5.20506 9.84752 3.82506 10.605 3.39006C11.0775 3.12006 11.7675 3.24756 12.6375 3.73506C12.6825 4.17647 12.8831 4.58746 13.2035 4.89439C13.5239 5.20133 13.9431 5.38416 14.3861 5.41014C14.829 5.43612 15.2667 5.30355 15.6208 5.03617C15.9749 4.7688 16.2222 4.38409 16.3184 3.95096C16.4147 3.51783 16.3536 3.06459 16.1461 2.67241C15.9385 2.28024 15.5982 1.97476 15.1859 1.8107C14.7737 1.64664 14.3165 1.63472 13.8963 1.77707C13.476 1.91942 13.1202 2.20674 12.8925 2.58756C12.4715 2.31837 11.9887 2.16122 11.4899 2.13103C10.9911 2.10084 10.4929 2.19861 10.0425 2.41506C8.71502 3.16506 8.47502 5.15256 8.43752 6.00006C6.89452 6.06676 5.39216 6.51515 4.06502 7.30506C3.78515 6.92306 3.39188 6.63909 2.94122 6.49361C2.49057 6.34812 2.00549 6.34854 1.55509 6.4948C1.10468 6.64106 0.711904 6.9257 0.432691 7.30819C0.153478 7.69067 0.00206592 8.15151 1.67277e-05 8.62506C-0.00178267 9.09183 0.14163 9.5476 0.410387 9.92924C0.679144 10.3109 1.05994 10.5995 1.50002 10.7551C1.48911 10.9199 1.48911 11.0852 1.50002 11.2501C1.50002 14.1451 4.86752 16.5001 9.00002 16.5001C13.1325 16.5001 16.5 14.1451 16.5 11.2501C16.5109 11.0852 16.5109 10.9199 16.5 10.7551C16.9401 10.5995 17.3209 10.3109 17.5896 9.92924C17.8584 9.5476 18.0018 9.09183 18 8.62506ZM4.87502 10.1251C4.87502 9.90256 4.941 9.68505 5.06461 9.50005C5.18823 9.31504 5.36393 9.17085 5.5695 9.0857C5.77506 9.00055 6.00126 8.97827 6.21949 9.02168C6.43772 9.06509 6.63818 9.17223 6.79551 9.32957C6.95285 9.4869 7.05999 9.68736 7.1034 9.90559C7.14681 10.1238 7.12453 10.35 7.03938 10.5556C6.95423 10.7611 6.81004 10.9368 6.62503 11.0605C6.44003 11.1841 6.22252 11.2501 6.00002 11.2501C5.70165 11.2501 5.4155 11.1315 5.20452 10.9206C4.99354 10.7096 4.87502 10.4234 4.87502 10.1251ZM11.9325 13.8751C11.0352 14.3716 10.0255 14.6298 9.00002 14.6251C7.96916 14.6344 6.95354 14.376 6.05252 13.8751C5.92322 13.8005 5.82886 13.6776 5.79018 13.5334C5.7515 13.3892 5.77167 13.2356 5.84627 13.1063C5.92086 12.977 6.04376 12.8827 6.18793 12.844C6.33209 12.8053 6.48572 12.8255 6.61502 12.9001C7.35169 13.2742 8.16627 13.4693 8.99252 13.4693C9.81876 13.4693 10.6333 13.2742 11.37 12.9001C11.4993 12.8255 11.6529 12.8053 11.7971 12.844C11.9413 12.8827 12.0642 12.977 12.1388 13.1063C12.2134 13.2356 12.2335 13.3892 12.1949 13.5334C12.1562 13.6776 12.0618 13.8005 11.9325 13.8751ZM12 11.2501C11.7775 11.2501 11.56 11.1841 11.375 11.0605C11.19 10.9368 11.0458 10.7611 10.9607 10.5556C10.8755 10.35 10.8532 10.1238 10.8966 9.90559C10.94 9.68736 11.0472 9.4869 11.2045 9.32957C11.3619 9.17223 11.5623 9.06509 11.7805 9.02168C11.9988 8.97827 12.225 9.00055 12.4305 9.0857C12.6361 9.17085 12.8118 9.31504 12.9354 9.50005C13.059 9.68505 13.125 9.90256 13.125 10.1251C13.125 10.4234 13.0065 10.7096 12.7955 10.9206C12.5845 11.1315 12.2984 11.2501 12 11.2501Z'
          fill={color}
        />
      </g>
      <defs>
        <clipPath id='clip0_750_8700'>
          <rect width='18' height='18' fill='white' />
        </clipPath>
      </defs>
    </svg>
  );
};