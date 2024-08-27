import React, { FC } from 'react';
import { IIcon } from './type';

export const IconPointerRight: FC<IIcon> = ({
	size = 16,
	color = 'currentColor',
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
				d='M0.75 12.6855H23.25M23.25 12.6855L19.5 16.4355M23.25 12.6855L19.5 8.93549'
				stroke='#1D1E1F'
				strokeWidth='1.5'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	);
};
