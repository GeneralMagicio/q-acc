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
import { IconFarcaster } from '../Icons/IconFarcaster';
import { IconLens } from '../Icons/IconLens';

export const socialMediaIconMap: { [key: string]: React.ReactNode } = {
  facebook: <IconFacebook color='#4267B2' size={16} />,
  x: <IconXSocial color={'#26A7DE'} size={16} />,
  instagram: <IconInstagram color={'#8668FC'} size={16} />,
  youtube: <IconYoutube color={'#C4302B'} size={16} />,
  linkedin: <IconLinkedin color={'#165FFA'} size={16} />,
  reddit: <IconReddit color={'#FF5700'} size={16} />,
  discord: <IconDiscord color={'#7289DA'} size={16} />,
  website: <IconWebsite color={'#2EA096'} size={16} />,
  telegram: <IconTelegram color={'#229ED9'} size={16} />,
  github: <IconGithub color={'#1D1E1F'} size={16} />,
  farcaster: <IconFarcaster color={'#1B1657'} size={16} />,
  lens: <IconLens color={'#FF2D55'} size={16} />,
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
  farcaster: '#1B1657',
  lens: '#FF2D55',
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
