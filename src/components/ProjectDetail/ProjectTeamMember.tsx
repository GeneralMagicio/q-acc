import React from 'react';
import { IconFacebook } from '../Icons/IconFacebook';
import { IconXSocial } from '../Icons/IconXSocial';
import { IconFarcaster } from '../Icons/IconFarcaster';
import { IconLinkedin } from '../Icons/IconLinkedin';

const iconMap: { [key: string]: React.ReactNode } = {
  facebook: <IconFacebook color='#4267B2' size={24} />,
  twitter: <IconXSocial color={'#26A7DE'} size={24} />,
  farcaster: <IconFarcaster size={24} />,
  linkedin: <IconLinkedin size={24} />,
};

interface TeamMember {
  name: string;
  image: string;
  twitter?: string;
  linkedin?: string;
  farcaster?: string;
}

interface ProjectTeamMembersProps {
  teamMembers: TeamMember[];
}
const ProjectTeamMembers: React.FC<ProjectTeamMembersProps> = ({
  teamMembers,
}) => {
  return (
    <div>
      <div className='flex flex-wrap gap-10 justify-center my-10'>
        {teamMembers?.map((member: any, index: any) => (
          <div
            key={index}
            className='flex flex-col p-6 border rounded-xl items-center min-w-[240px] gap-6 shadow-xl bg-white'
          >
            <div
              className='w-[128px] h-[128px] bg-cover rounded-xl'
              style={{
                backgroundImage: `url(${
                  member?.image
                    ? member.image
                    : '/images/placeholders/PFPQACC.png'
                })`,
              }}
            >
              {/* <img
                className='rounded-lg'
                src={
                  member.image
                    ? member.image
                    : '/images/placeholders/PFPQACC.png'
                }
                alt={`${member.name}'s profile`}
              /> */}
            </div>
            <div className='flex flex-col gap-4 items-center mt-2'>
              <h1 className='text-[#1D1E1F] font-bold text-lg'>
                {member.name}
              </h1>
              <div className='flex flex-wrap gap-6'>
                {/* Dynamically render social media icons if they exist */}
                {member.twitter && (
                  <a
                    href={`https://twitter.com/${member.twitter.replace('@', '')}`}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <div className='flex gap-2'>{iconMap.twitter}</div>
                  </a>
                )}
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <div className='flex gap-2'>{iconMap.linkedin}</div>
                  </a>
                )}
                {member.farcaster && (
                  <a
                    href={`https://farcaster.xyz/${member.farcaster.replace('@', '')}`}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <div className='flex gap-2'>{iconMap.farcaster}</div>
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectTeamMembers;
