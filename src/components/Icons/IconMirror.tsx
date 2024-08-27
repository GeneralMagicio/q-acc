import { FC } from 'react';
import { IIcon } from './type';

export const IconMirror: FC<IIcon> = ({
	size = 24,
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
			<g clipPath='url(#clip0_1054_184)'>
				<circle cx='12' cy='12' r='12' fill='#1D1E1F' />
				<path
					d='M6.75 10.0161C6.75 6.96966 9.1005 4.5 12 4.5C14.8995 4.5 17.25 6.96966 17.25 10.0161V17.9118C17.25 18.3747 16.8928 18.75 16.4522 18.75H7.5478C7.10719 18.75 6.75 18.3747 6.75 17.9118V10.0161Z'
					fill='white'
				/>
			</g>
			<defs>
				<clipPath id='clip0_1054_184'>
					<rect width='24' height='24' fill='white' />
				</clipPath>
			</defs>
		</svg>
	);
};
