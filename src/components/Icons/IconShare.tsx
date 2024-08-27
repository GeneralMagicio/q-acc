import { FC } from 'react';
import { IIcon } from './type';

export const IconShare: FC<IIcon> = ({ size = 16, color = 'currentColor' }) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width={size}
			height={size}
			viewBox='0 0 17 16'
			fill='none'
		>
			<path
				d='M12.5 10.5C12.2306 10.4999 11.964 10.5544 11.7163 10.6602C11.4686 10.766 11.2449 10.9209 11.0587 11.1156L6.43372 8.5134C6.5233 8.17697 6.5233 7.82296 6.43372 7.48653L11.0587 4.88434C11.3955 5.23351 11.848 5.4479 12.3316 5.48736C12.8151 5.52682 13.2964 5.38864 13.6853 5.09869C14.0743 4.80875 14.3442 4.38694 14.4444 3.91229C14.5447 3.43765 14.4685 2.94273 14.23 2.52025C13.9916 2.09777 13.6073 1.77673 13.1491 1.61726C12.6909 1.4578 12.1903 1.47085 11.7411 1.65398C11.2919 1.8371 10.9248 2.17774 10.7087 2.61207C10.4926 3.0464 10.4423 3.54462 10.5672 4.0134L5.94215 6.61559C5.66589 6.32754 5.30976 6.12873 4.91957 6.04474C4.52939 5.96076 4.123 5.99544 3.75269 6.14431C3.38237 6.29319 3.06507 6.54946 2.8416 6.88016C2.61813 7.21085 2.49872 7.60084 2.49872 7.99996C2.49872 8.39908 2.61813 8.78908 2.8416 9.11977C3.06507 9.45046 3.38237 9.70673 3.75269 9.85561C4.123 10.0045 4.52939 10.0392 4.91957 9.95518C5.30976 9.8712 5.66589 9.67239 5.94215 9.38434L10.5672 11.9865C10.4599 12.3902 10.4818 12.8174 10.6297 13.208C10.7776 13.5987 11.044 13.9332 11.3917 14.1647C11.7394 14.3962 12.1509 14.513 12.5683 14.4988C12.9858 14.4846 13.3883 14.34 13.7194 14.0853C14.0505 13.8306 14.2936 13.4787 14.4145 13.0789C14.5354 12.679 14.5281 12.2514 14.3936 11.8559C14.2591 11.4605 14.0041 11.1171 13.6645 10.8739C13.3249 10.6307 12.9177 10.4999 12.5 10.5Z'
				fill='#E1458D'
			/>
		</svg>
	);
};
