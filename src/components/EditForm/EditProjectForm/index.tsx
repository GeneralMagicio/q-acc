'use client';

import { useForm, FormProvider } from 'react-hook-form';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAccount } from 'wagmi';
import Input from '@/components/Input';
import { Dropzone } from '@/components/DropZone';
import Textarea from '../../TextArea';
import { SocialMediaInput } from '../../SocialMediaInput';
import { validators } from '../../SocialMediaInput/vaildators';
import { RichTextEditor } from '@/components/RichTextEditor';
import { IconAlertCircleOutline } from '@/components/Icons/IconAlertCircleOutline';
import { EProjectSocialMediaType } from '@/types/project.type';
import { useFetchUser } from '@/hooks/useFetchUser';
import { useCreateProject } from '@/hooks/useCreateProject';
import { TeamMember } from '@/components/Create/CreateTeamForm';
import { useCreateContext } from '@/components/Create/CreateContext';
import CreateNavbar from '@/components/Create/CreateNavbar';
import { fetchProjectById } from '@/services/project.service';

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

const EditProjectForm = ({ projectId }: { projectId: number }) => {
  const { address, isConnected } = useAccount();
  const { data: user } = useFetchUser();
  const { mutateAsync: createProject, isPending } = useCreateProject();

  const { formData, setFormData } = useCreateContext();
  const [adminId, setAdminId] = useState(0);
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState({
    projectName: '',
    projectTeaser: '',
    projectDescription: '',
    WEBSITE: '',
    FACEBOOK: '',
    TWITTER: '',
    LINKEDIN: '',
    DISCORD: '',
    TELEGRAM: '',
    INSTAGRAM: '',
    REDDIT: '',
    YOUTUBE: '',
    FARCASTER: '',
    LENS: '',
    GITHUB: '',
    projectAddress: '',
    addressConfirmed: false,
    logo: null,
    banner: null,
    team: [],
  });

  const router = useRouter();
  const methods = useForm<ProjectFormData>({
    defaultValues: project,
    mode: 'onChange', // This enables validation on change
  });
  const { handleSubmit, reset } = methods;

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchProjectById(projectId);
        console.log('admin', data);
        setAdminId(data?.adminUserId);

        setProject({
          projectName: data?.title || '',
          projectTeaser: data?.teaser || '',
          projectDescription: data?.description || '',
          WEBSITE:
            data?.socialMedia?.find((sm: any) => sm.type === 'WEBSITE')?.link ||
            '',
          FACEBOOK:
            data?.socialMedia?.find((sm: any) => sm.type === 'FACEBOOK')
              ?.link || '',
          TWITTER:
            data?.socialMedia?.find((sm: any) => sm.type === 'TWITTER')?.link ||
            '',
          LINKEDIN:
            data?.socialMedia?.find((sm: any) => sm.type === 'LINKEDIN')
              ?.link || '',
          DISCORD:
            data?.socialMedia?.find((sm: any) => sm.type === 'DISCORD')?.link ||
            '',
          TELEGRAM:
            data?.socialMedia?.find((sm: any) => sm.type === 'TELEGRAM')
              ?.link || '',
          INSTAGRAM:
            data?.socialMedia?.find((sm: any) => sm.type === 'INSTAGRAM')
              ?.link || '',
          REDDIT:
            data?.socialMedia?.find((sm: any) => sm.type === 'REDDIT')?.link ||
            '',
          YOUTUBE:
            data?.socialMedia?.find((sm: any) => sm.type === 'YOUTUBE')?.link ||
            '',
          FARCASTER:
            data?.socialMedia?.find((sm: any) => sm.type === 'FARCASTER')
              ?.link || '',
          LENS:
            data?.socialMedia?.find((sm: any) => sm.type === 'LENS')?.link ||
            '',
          GITHUB:
            data?.socialMedia?.find((sm: any) => sm.type === 'GITHUB')?.link ||
            '',
          projectAddress: data?.addresses[0]?.address || '',
          addressConfirmed: true,
          logo: data?.icon || null,
          banner: data?.image || null,
          team:
            data?.teamMembers?.map((member: any) => ({
              name: member.name,
              image: member.image || null,
              twitter: member.twitter || '',
              linkedin: member.linkedin || '',
              farcaster: member.farcaster || '',
            })) || [],
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching project:', error);
        setLoading(false);
      }
    };

    getData();
  }, [reset]);

  useEffect(() => {
    reset(project);
  }, [project]);

  const handleDrop = (name: string, file: File, ipfsHash: string) => {};

  const onSubmit = async (data: ProjectFormData) => {
    if (!user?.id || !address) return;
    console.log('SUB', data);
    setFormData({ project: data });
    router.push(`/edit/${projectId}/team`);
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }
  if (parseInt(user?.id!) !== adminId) {
    return <h1> You are not the owner of this project </h1>;
  }
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className='container'>
        <CreateNavbar
          title='Edit your project'
          nextLabel='Edit your team'
          submitLabel='Save & continue'
          loading={isPending}
        />
        <div className='bg-white flex flex-col gap-16 pt-20 w-full mt-10 rounded-2xl p-8'>
          <h1 className='text-2xl font-bold text-gray-800 mb-7'>
            Edit Your Project
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
              defaultValue={project?.projectDescription}
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
            <div className='flex flex-col p-6 gap-6 cursor-not-allowed opacity-60'>
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
                disabled={true}
              />
              <div className='border-t pt-2'>
                <input
                  type='checkbox'
                  checked={true}
                  disabled={true}
                  className='form-checkbox'
                />
                <span className='ml-2'>
                  I confirm I have access to this address.
                </span>
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
      </form>
    </FormProvider>
  );
};

export default EditProjectForm;
