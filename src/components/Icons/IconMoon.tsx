import { FC } from 'react';
import { IIcon } from './type';

export const IconMoon: FC<IIcon> = ({ size = 32, color = 'currentColor' }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
      viewBox='0 0 32 32'
      fill='none'
    >
      <path
        d='M14.9799 3C14.9212 3.00019 14.8626 3.00554 14.8049 3.016C11.6215 3.58252 8.76025 5.30669 6.77199 7.85653C4.78373 10.4064 3.80906 13.6016 4.03563 16.8271C4.26219 20.0525 5.67398 23.0801 7.99918 25.327C10.3244 27.5738 13.3986 28.8811 16.6299 28.997C16.7939 29.003 16.9579 28.997 17.1199 28.997C19.2189 28.9985 21.2873 28.4945 23.1503 27.5276C25.0133 26.5607 26.616 25.1593 27.8229 23.442C27.9207 23.294 27.9778 23.1229 27.9884 22.9458C27.999 22.7687 27.9628 22.592 27.8835 22.4333C27.8041 22.2747 27.6843 22.1397 27.5363 22.0421C27.3882 21.9444 27.217 21.8875 27.0399 21.877C25.0422 21.7017 23.1115 21.0693 21.3971 20.0288C19.6827 18.9884 18.2305 17.5676 17.1528 15.8764C16.0751 14.1852 15.4006 12.2688 15.1817 10.2754C14.9627 8.28193 15.205 6.26484 15.8899 4.38C15.9482 4.22913 15.9695 4.06652 15.9522 3.90572C15.9349 3.74492 15.8794 3.59059 15.7904 3.45557C15.7014 3.32055 15.5814 3.20877 15.4404 3.12952C15.2994 3.05028 15.1415 3.00587 14.9799 3Z'
        fill='#4F576A'
      />
    </svg>
  );
};