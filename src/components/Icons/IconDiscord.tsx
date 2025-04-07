import { FC } from 'react';
import { IIcon } from './type';

export const IconDiscord: FC<IIcon> = ({
  size = 30,
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
      <g id='Icon=Discord, Size=24'>
        <path
          id='Vector'
          d='M19.6239 4.4921C18.2217 3.80147 16.7181 3.29265 15.1459 3.00122C15.1173 2.9956 15.0887 3.00965 15.0739 3.03777C14.8805 3.40697 14.6663 3.88862 14.5163 4.26719C12.8254 3.99545 11.1431 3.99545 9.48679 4.26719C9.33676 3.8802 9.11478 3.40697 8.92053 3.03777C8.90578 3.01059 8.87718 2.99654 8.84855 3.00122C7.27725 3.29172 5.7736 3.80054 4.37052 4.4921C4.35838 4.49772 4.34797 4.5071 4.34106 4.51928C1.48894 9.09311 0.707629 13.5545 1.09092 17.9606C1.09265 17.9822 1.10392 18.0028 1.11953 18.0159C3.00127 19.4993 4.82407 20.3998 6.61301 20.9967C6.64164 21.0061 6.67197 20.9949 6.69019 20.9695C7.11337 20.3492 7.49059 19.6952 7.81402 19.0073C7.83311 18.967 7.81489 18.9192 7.77588 18.9033C7.17754 18.6597 6.6078 18.3626 6.05975 18.0253C6.0164 17.9981 6.01293 17.9316 6.05281 17.8997C6.16814 17.8069 6.2835 17.7104 6.39363 17.613C6.41355 17.5952 6.44131 17.5914 6.46474 17.6026C10.0652 19.3672 13.9631 19.3672 17.521 17.6026C17.5445 17.5905 17.5722 17.5942 17.593 17.612C17.7032 17.7095 17.8185 17.8069 17.9347 17.8997C17.9746 17.9316 17.972 17.9981 17.9286 18.0253C17.3806 18.3692 16.8108 18.6597 16.2116 18.9024C16.1726 18.9183 16.1553 18.967 16.1744 19.0073C16.5047 19.6942 16.882 20.3483 17.2973 20.9686C17.3147 20.9949 17.3459 21.0061 17.3745 20.9967C19.1721 20.3998 20.9949 19.4993 22.8766 18.0159C22.8931 18.0028 22.9035 17.9831 22.9053 17.9616C23.364 12.8676 22.137 8.4428 19.6525 4.52021C19.6465 4.5071 19.6361 4.49772 19.6239 4.4921ZM8.35169 15.2778C7.26771 15.2778 6.37454 14.2095 6.37454 12.8976C6.37454 11.5857 7.25039 10.5175 8.35169 10.5175C9.46163 10.5175 10.3462 11.5951 10.3288 12.8976C10.3288 14.2095 9.45296 15.2778 8.35169 15.2778ZM15.6619 15.2778C14.5779 15.2778 13.6847 14.2095 13.6847 12.8976C13.6847 11.5857 14.5606 10.5175 15.6619 10.5175C16.7718 10.5175 17.6563 11.5951 17.639 12.8976C17.639 14.2095 16.7718 15.2778 15.6619 15.2778Z'
          fill={color}
        />
      </g>
    </svg>
  );
};
