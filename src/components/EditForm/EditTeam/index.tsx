'use client';

import { useForm, FormProvider } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Routes from '@/lib/constants/Routes';
import { useCreateProject } from '@/hooks/useCreateProject';
import {
  EProjectSocialMediaType,
  IProjectCreation,
} from '@/types/project.type';
import { useFetchUser } from '@/hooks/useFetchUser';
import { useCreateContext } from '@/components/Create/CreateContext';
import CreateNavbar from '@/components/Create/CreateNavbar';
import { Button, ButtonColor } from '@/components/Button';
import { TeamForm } from '@/components/Create/CreateTeamForm/TeamForm';
import { updateProjectById } from '@/services/project.service';

export interface TeamMember {
  name: string;
  image?: { file: File; ipfsHash: string } | null;
  twitter?: string;
  linkedin?: string;
  farcaster?: string;
}

export interface TeamFormData {
  team: TeamMember[];
}

const EditTeamForm = ({ projectId }: { projectId: number }) => {
  const { data: user } = useFetchUser();
  const { formData, setFormData } = useCreateContext();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const methods = useForm<TeamFormData>({
    defaultValues: {
      team: formData.project.team.length
        ? formData.project.team
        : [{ name: '', image: null }],
    },
    mode: 'onChange',
  });
  const router = useRouter();

  const { handleSubmit, setValue, watch, reset } = methods;

  const teamMembers = watch('team');

  const { mutateAsync: createProject, isPending, error } = useCreateProject();

  useEffect(() => {
    if (formData.project.team.length === 0) {
      // Ensure at least one empty team member is present
      reset({ team: [{ name: '', image: null }] });
    } else {
      reset({ team: formData.project.team });
    }
  }, [formData.project.team, reset]);

  const addTeamMember = () => {
    setValue('team', [...teamMembers, { name: '', image: null }]); // Add a new team member
  };

  const removeTeamMember = (index: number) => {
    setValue(
      'team',
      teamMembers.filter((_, i) => i !== index),
    );
  };

  const onSubmit = async (data: TeamFormData) => {
    const teamMembers = data.team;
    setFormData({
      project: {
        ...formData.project,
        team: teamMembers, // Update the team array within the project
      },
    });

    const projectData = {
      ...formData.project,
      team: teamMembers,
    };

    const socialMediaKeys = Object.values(EProjectSocialMediaType);

    const socialMedia = Object.entries(projectData)
      .filter(
        ([key, value]) =>
          value &&
          socialMediaKeys.includes(
            key.toUpperCase() as EProjectSocialMediaType,
          ),
      )
      .map(([key, value]) => ({
        type: key.toUpperCase() as EProjectSocialMediaType,
        link: typeof value === 'string' ? value : '',
      }));

    if (!user?.id) return;

    const project: IProjectCreation = {
      title: projectData.projectName,
      description: projectData.projectDescription,
      teaser: projectData.projectTeaser,
      adminUserId: Number(user.id),
      organisationId: 1,
      address: projectData.projectAddress,
      image: projectData.banner || undefined,
      icon: projectData.logo || undefined,
      socialMedia: socialMedia.length ? socialMedia : undefined,
      teamMembers: teamMembers,
    };
    console.log('Submitting project data:', project);

    try {
      const res = await updateProjectById(projectId, project);
      console.log(res);
      router.push(Routes.DashBoard);
    } catch (err: any) {
      setErrorMessage(
        err.message || 'Failed to create project. Please try again.',
      );
      console.log(err);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className='container mt-6'>
        <CreateNavbar
          title='Edit your team'
          onBack={() => router.push(`/edit/${projectId}/project`)}
          submitLabel='Save'
          disabled={isPending}
        />
        {errorMessage && (
          <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4'>
            <strong>Error:</strong> {errorMessage}
          </div>
        )}

        {teamMembers?.map((_, index) => (
          <div key={index} className='mb-4'>
            <TeamForm
              index={index}
              removeMember={() => removeTeamMember(index)}
            />
          </div>
        ))}
        <div className='bg-white p-6 rounded-xl flex justify-between mt-6 items-center'>
          <b>More team members?</b>
          <Button color={ButtonColor.Giv} onClick={addTeamMember}>
            Add a new team member
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default EditTeamForm;
