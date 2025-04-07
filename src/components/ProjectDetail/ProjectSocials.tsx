import React from 'react';
import Link from 'next/link';
import { IconFacebook } from '../Icons/IconFacebook';
import { IconLinkedin } from '../Icons/IconLinkedin';
import { IconXSocial } from '../Icons/IconXSocial';

import { IconDiscord } from '../Icons/IconDiscord';
import { IconInstagram } from '../Icons/IconInstagram';
import { IconYoutube } from '../Icons/IconYoutube';
import { IconReddit } from '../Icons/IconReddit';
import { IconWebsite } from '../Icons/IconWebsite';
import { IconTelegram } from '../Icons/IconTelegram';
import { IconGithub } from '../Icons/IconGithub';
import { useProjectContext } from '@/context/project.context';

export const socialMediaIconMap: { [key: string]: React.ReactNode } = {
  facebook: <IconFacebook size={16} />,
  x: <IconXSocial size={16} />,
  instagram: <IconInstagram size={16} />,
  youtube: <IconYoutube size={16} />,
  linkedin: <IconLinkedin size={16} />,
  reddit: <IconReddit size={16} />,
  discord: <IconDiscord size={16} />,
  website: <IconWebsite size={16} />,
  telegram: <IconTelegram size={16} />,
  github: <IconGithub size={16} />,
};
export const socialMediaColor: { [key: string]: string } = {
  facebook: '#4267B2',
  x: '#26A7DE',
  instagram: '#8668FC',
  youtube: '#C4302B',
  linkedin: '#165FFA',
  reddit: '#FF5700',
  discord: '#7289DA',
  website: '#2EA096',
  telegram: '#229ED9',
  github: '#1D1E1F',
};

export const removeHttpsAndWwwFromUrl = (socialMediaUrl: string) => {
  return socialMediaUrl.replace('https://', '').replace('www.', '');
};

const ProjectSocials = () => {
  const { projectData } = useProjectContext();

  return (
    <div className='container  max-w-[800px] '>
      <h1 className='text-2xl font-redHatText text-[#82899A]'>
        Find us on our social media
      </h1>
      <br />
      <div className='flex flex-wrap gap-2'>
        {projectData?.socialMedia?.map((social: any) => {
          const color = socialMediaColor[social.type.toLowerCase()];
          const icon = socialMediaIconMap[social.type.toLowerCase()];
          return (
            <div
              key={social.link}
              className={`flex px-6 py-4 items-center gap-2 rounded-full  bg-white shadow-tabShadow  font-redHatText font-medium `}
              style={{ color: color }}
            >
              {icon}
              <Link href={social.link} target='_blank'>
                {removeHttpsAndWwwFromUrl(social.link)}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectSocials;
