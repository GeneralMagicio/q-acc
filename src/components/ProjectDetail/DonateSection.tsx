import React from 'react';
import ProjectDonateButton from './ProjectDonateButton';

export enum EDonationCardStates {
	beforeFirstRound = 'before',
	earlyAccess = 'early',
	betweenRounds = 'between',
	last = 'last',
}

const DonateSection = () => {
	let totalDonations = 10;
	let currentState = 'last';
	const renderContent = () => {
		const renderDonationInfo = () => {
			return totalDonations && totalDonations !== 0 ? (
				<div className='mb-20px flex flex-col gap-2'>
					<div className='inline-block w-fit text-sm text-gray-700 bg-gray-200 rounded-md px-1 py-1'>
						Total Amount Raised in this round
					</div>
					<h3 className='text-[41px] font-bold'>
						$ {totalDonations}
					</h3>
					<p className='text-gray-700'>
						Raised From <span className='font-bold'>{7}</span>{' '}
						Contributors
					</p>
				</div>
			) : (
				<div className='mb-4'>
					<h1 className='font-bold text-3xl text-gray-800  leading-normal'>
						Donate first!
					</h1>
				</div>
			);
		};

		const renderMintInfo = (state: string | null = null) => (
			<>
				<div className=' p-3'>
					{state === 'before' ? (
						<p className='text-[#A5ADBF]'>
							Early access window start in
						</p>
					) : state === 'last' ? (
						<p className='text-[#A5ADBF]'>Round ends in</p>
					) : (
						<p className='text-[#A5ADBF]'>
							This mint round closes in
						</p>
					)}

					<p className='font-bold'>7 days, 8 hours, 32 min</p>
				</div>
				<div className='flex justify-between mt-5'>
					<p className='text-[#A5ADBF]'>Mint rounds remaining</p>
					<span className='mx-6 justify-start font-bold'>5</span>
				</div>
			</>
		);

		switch (currentState) {
			case EDonationCardStates.beforeFirstRound:
				return (
					<>
						<h1 className='text-2xl font-bold text-[#A5ADBF] mb-5'>
							Early access window starts on{' '}
							<span className='text-black'>Aug 15</span>
						</h1>

						{renderMintInfo('before')}
					</>
				);

			case EDonationCardStates.earlyAccess:
				return (
					<>
						{renderDonationInfo()}
						<div className='mt-4 mb-5'>
							<span className='text-[#2EA096] p-1 rounded-lg bg-[#D2FFFB] text-xs'>
								You are on the early access list
							</span>
						</div>
						{renderMintInfo()}
					</>
				);

			case EDonationCardStates.betweenRounds:
				return (
					<>
						{renderDonationInfo()}
						{renderMintInfo()}
					</>
				);

			default:
				return (
					<>
						{renderDonationInfo()}
						{renderMintInfo('last')}
					</>
				);
		}
	};
	return (
		<div className=' lg:w-[312px]  bg-white lg:h-[450px] rounded-2xl p-6'>
			<div className='flex flex-col  h-full justify-between'>
				<div className=''>{renderContent()}</div>
				<div className=' md:relative fixed bottom-0 w-full bg-white left-0 p-5 md:p-0'>
					<ProjectDonateButton />
				</div>
			</div>
		</div>
	);
};

export default DonateSection;
