import { FC } from 'react';
import { IIcon } from './type';

export const IconArrowRight: FC<IIcon> = ({
	size = 16,
	color = 'currentColor',
}) => {
	return (
		<svg
			width={size}
			height={size}
			viewBox='0 0 32 32'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<g id='arrow-forward-sharp (1) 1'>
				<path
					id='Vector'
					d='M17.25 7L26.25 16L17.25 25M25 16H6.75'
					stroke={color}
					strokeWidth='2'
					strokeMiterlimit='10'
					strokeLinecap='square'
				/>
			</g>
		</svg>
	);
};
