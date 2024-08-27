import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Dropzone } from '@/components/DropZone';
import Input from '@/components/Input';
import { SocialMediaInput } from '@/components/SocialMediaInput';
import { validators } from '@/components/SocialMediaInput/vaildators';

interface TeamFormProps {
	index: number;
}

const socialMediaLinks = [
	{
		name: 'twitter',
		label: 'Twitter',
		iconName: 'twitter.svg',
		rules: validators.twitter,
	},
	{
		name: 'linkedin',
		label: 'LinkedIn',
		iconName: 'linkedin.svg',
		rules: validators.linkedin,
	},
	{
		name: 'farcaster',
		label: 'Farcaster',
		iconName: 'farcaster.svg',
		rules: validators.farcaster,
	},
];

export const TeamForm: React.FC<TeamFormProps> = ({ index }) => {
	const { setValue } = useFormContext(); // Access setValue from form context

	const handleDrop = (name: string, file: File, ipfsHash: string) => {
		if (file) {
			setValue(name, { file, ipfsHash });
		}
	};

	return (
		<section className='bg-white p-8 flex flex-col gap-8 rounded-2xl mt-6'>
			<h1 className='text-2xl mb-8'>Add Your Team</h1>
			<Input
				name={`team[${index}].fullName`} // Use dynamic name based on index
				label='Full Name'
				placeholder='James Smith'
				rules={{ required: 'Full Name is required' }}
			/>
			<div>
				<h2 className='text-2xl'>Social Media Links</h2>
				<p className='text-sm mt-2'>
					<span className='text-gray-900'>
						Add your project’s social media links (optional)
					</span>
				</p>
			</div>
			<div className='flex flex-col gap-6'>
				{socialMediaLinks.map(socialMedia => (
					<SocialMediaInput
						key={socialMedia.name}
						{...socialMedia}
						name={`team[${index}].${socialMedia.name}`}
					/>
				))}
			</div>
			<div className='flex flex-col gap-6 w-full mx-auto'>
				<label className='text-4xl font-bold text-gray-800'>
					Upload an Avatar
				</label>
				<p>Displayed in the header of the project page.</p>
				<Dropzone name={`team[${index}].avatar`} onDrop={handleDrop} />
			</div>
		</section>
	);
};
