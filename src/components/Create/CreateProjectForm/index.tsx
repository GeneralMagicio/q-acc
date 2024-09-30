'use client';

import { useForm, FormProvider } from 'react-hook-form';
import { isAddress } from 'viem';
import { type FC } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAccount } from 'wagmi';
import Input from '@/components/Input';
import Checkbox from '@/components/Checkbox';
import { Dropzone } from '@/components/DropZone';
import Textarea from '../../TextArea';
import { SocialMediaInput } from '../../SocialMediaInput';
import { validators } from '../../SocialMediaInput/vaildators';
import { RichTextEditor } from '@/components/RichTextEditor';
import { IconAlertCircleOutline } from '@/components/Icons/IconAlertCircleOutline';
import { useCreateContext } from '../CreateContext';
import CreateNavbar from '../CreateNavbar';
import { EProjectSocialMediaType } from '@/types/project.type';
import { useFetchUser } from '@/hooks/useFetchUser';
import { useCreateProject } from '@/hooks/useCreateProject';
import { useIsUserWhiteListed } from '@/hooks/useIsUserWhiteListed';
import { TeamMember } from '../CreateTeamForm';
import { HoldModal } from '@/components/Modals/HoldModal';
import { ConnectModal } from '@/components/ConnectModal';
import { IconExternalLink } from '@/components/Icons/IconExternalLink';
import Routes from '@/lib/constants/Routes';

export interface ProjectFormData {
  projectName: string;
  projectTeaser: string;
  projectDescription: string;
  website: string;
  facebook: string;
  twitter: string;
  linkedin: string;
  discord: string;
  telegram: string;
  instagram: string;
  reddit: string;
  youtube: string;
  farcaster: string;
  lens: string;
  github: string;
  projectAddress: string;
  addressConfirmed: boolean;
  logo: string | null;
  banner: string | null;
  team: TeamMember[];
}

const socialMediaLinks = [
  {
    name: EProjectSocialMediaType.WEBSITE,
    label: 'Website',
    iconName: 'web.svg',
    rules: validators.website,
  },
  {
    name: EProjectSocialMediaType.FACEBOOK,
    label: 'Facebook',
    iconName: 'facebook.svg',
    rules: validators.facebook,
  },
  {
    name: EProjectSocialMediaType.X,
    label: 'Twitter',
    iconName: 'twitter.svg',
    rules: validators.twitter,
  },
  {
    name: EProjectSocialMediaType.LINKEDIN,
    label: 'LinkedIn',
    iconName: 'linkedin.svg',
    rules: validators.linkedin,
  },
  {
    name: EProjectSocialMediaType.DISCORD,
    label: 'Discord',
    iconName: 'discord.svg',
    rules: validators.discord,
  },
  {
    name: EProjectSocialMediaType.TELEGRAM,
    label: 'Telegram',
    iconName: 'telegram.svg',
    rules: validators.telegram,
  },
  {
    name: EProjectSocialMediaType.INSTAGRAM,
    label: 'Instagram',
    iconName: 'instagram.svg',
    rules: validators.instagram,
  },
  {
    name: EProjectSocialMediaType.REDDIT,
    label: 'Reddit',
    iconName: 'reddit.svg',
    rules: validators.reddit,
  },
  {
    name: EProjectSocialMediaType.YOUTUBE,
    label: 'YouTube',
    iconName: 'youtube.svg',
    rules: validators.youtube,
  },
  {
    name: EProjectSocialMediaType.FARCASTER,
    label: 'Farcaster',
    iconName: 'farcaster.svg',
    rules: validators.farcaster,
  },
  {
    name: EProjectSocialMediaType.LENS,
    label: 'Lens',
    iconName: 'lens.svg',
    rules: validators.lens,
  },
  {
    name: EProjectSocialMediaType.GITHUB,
    label: 'GitHub',
    iconName: 'github.svg',
    rules: validators.github,
  },
];

const CreateProjectForm: FC = () => {
  const { address, isConnected } = useAccount();
  const { data: user } = useFetchUser();
  const { mutateAsync: createProject, isPending } = useCreateProject();
  const { formData, setFormData } = useCreateContext();
  const methods = useForm<ProjectFormData>({
    defaultValues: formData.project,
    mode: 'onChange',
  });
  const { data: isWhiteListed, isFetching } = useIsUserWhiteListed();
  const router = useRouter();

  const { handleSubmit, getValues } = methods;

  const handleDrop = (name: string, file: File, ipfsHash: string) => {};

  const onSubmit = async (data: ProjectFormData) => {
    if (!user?.id || !address) return;
    setFormData({ project: data });
    router.push('/create/team');
  };

  const handlePreview = () => {
    const formData = getValues();
    console.log(formData);
    sessionStorage.setItem('previewData', JSON.stringify(formData));
    window.open(Routes.Preview, '_blank');
  };

  return isFetching ? (
    <div>Loading...</div>
  ) : isWhiteListed ? (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CreateNavbar
          title='Create your project'
          nextLabel='Add your team'
          submitLabel='Save & continue'
          loading={isPending}
        />
        <div className='bg-white flex flex-col gap-16 pt-20 w-full mt-10 rounded-2xl p-8'>
          <h1 className='text-2xl font-bold text-gray-800 mb-7'>
            Create Your Project
          </h1>
          <Input
            name='projectName'
            label='Project Name'
            placeholder='My First Project'
            rules={{ required: 'Project Name is required' }}
            showCounter
            maxLength={55}
          />

          <Textarea
            name='projectTeaser'
            label='Project Teaser'
            placeholder='Enter project teaser'
            rules={{ required: 'Project Teaser is required' }}
            showCounter
            maxLength={100}
          />

          <section className='flex flex-col gap-6'>
            <div>
              <h2 className='text-2xl'>Tell us about your project...</h2>
              <p className='text-sm mt-2'>
                <span className='text-gray-900'>Aim for 200-500 words.</span>
                {/* <span className='text-pink-500'>
                  How to write a good project description.{' '}
                </span> */}
              </p>
            </div>
            <RichTextEditor
              name='projectDescription'
              rules={{
                required: 'Project description is required',
                minLength: {
                  value: 200,
                  message:
                    'Project description must be at least 200 characters',
                },
              }}
              defaultValue={formData.project.projectDescription}
              maxLength={500}
            />
            {/* <Editor /> */}
          </section>

          <section className='flex flex-col gap-6'>
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
                <SocialMediaInput key={socialMedia.name} {...socialMedia} />
              ))}
            </div>
          </section>

          <section className='flex flex-col gap-4 w-full mx-auto'>
            <h1 className='text-4xl font-bold text-gray-800'>
              Your Multisig Address
            </h1>
            <div className='rounded-lg border border-link-700 bg-link-100 text-link-700 flex gap-4 p-4 items-center'>
              <IconAlertCircleOutline />
              <p>
                Make sure you provide the same address you provided on your ABC
                launcher flow.
              </p>
            </div>
            <div className='flex flex-col p-6 gap-6'>
              <div className='flex gap-2 border-b pb-2'>
                <Image
                  src='/images/chains/polygon.svg'
                  alt='polygon'
                  width={24}
                  height={24}
                />
                <span className='text-gray-900'>Polygon address</span>
              </div>
              <Input
                name='projectAddress'
                label='Project Address'
                description='This is the address to which ABC tributes and arbitrage results will be sent.'
                placeholder='0x...'
                rules={{
                  required: 'Project Address is required',
                  validate: value => {
                    return isAddress(value) ? true : 'Address in not valid'; // Add your validation logic here
                  },
                }}
              />
              <div className='border-t pt-2'>
                <Checkbox
                  name='addressConfirmed'
                  label='I confirm I have access to this address.'
                  rules={{
                    required:
                      'You must confirm you have access to this address.',
                  }}
                />
              </div>
            </div>
          </section>

          <section className='flex flex-col gap-6 w-full mx-auto'>
            <label className='text-4xl font-bold text-gray-800'>
              Upload Logo
            </label>
            <p>Displayed in the header of the project page.</p>
            <Dropzone name='logo' onDrop={handleDrop} />
          </section>

          <section className='flex flex-col gap-6 w-full mx-auto'>
            <label className='text-4xl font-bold text-gray-800'>
              Add an image to your project
            </label>
            <p>Displayed in the header of the project page.</p>
            <Dropzone name='banner' onDrop={handleDrop} />
          </section>
        </div>
        <div className='bg-white flex flex-row flex-wrap justify-between items-center gap-16 w-full mt-10 mb-10 rounded-2xl p-8'>
          <h3 className='text-lg line leading-7 text-[#1D1E1F] font-bold font-redHatText'>
            Preview your project
          </h3>
          <button
            onClick={handlePreview}
            type='button'
            className='px-6 py-4 font-bold items-center justify-center flex gap-2 text-pink-500 bg-white border-pink-400 border-2 p-4 rounded-full text-xs md:text-md min-w-[150px]'
          >
            PREVIEW
            <IconExternalLink color='#FD67AC' />
          </button>
        </div>
      </form>
    </FormProvider>
  ) : isConnected ? (
    <HoldModal isOpen onClose={() => router.push('/')} />
  ) : (
    <ConnectModal
      isOpen={true}
      onClose={function (): void {
        throw new Error('Function not implemented.');
      }}
    />
  );
};

export default CreateProjectForm;
