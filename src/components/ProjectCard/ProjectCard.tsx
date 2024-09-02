import Image from 'next/image';
import React, { FC } from 'react';
import { IProject } from '@/types/project.type';
import ProjectCardImage from './ProjectCardImage';

interface ProjectCardProps extends React.HTMLAttributes<HTMLDivElement> {
  project: IProject;
}

export const ProjectCard: FC<ProjectCardProps> = ({
  className,
  project,
  ...props
}) => {
  return (
    <div
      className={`relative w-full rounded-xl bg-white overflow-hidden shadow-md shadow-gray-200 ${className}`}
      {...props}
    >
      <div className='relative h-48'>
        <ProjectCardImage
          src={project.image}
          alt='Project Card'
          layout='fill'
          fallbackSrc='/images/project-card/card-image.jpeg'
        />
      </div>
      <div className='relative p-6 text-start flex flex-col gap-4'>
        <div className='absolute bg-white -top-12 left-0 w-16 h-16 p-3 rounded-tr-xl'>
          <Image
            src='/images/project-card/logo.svg'
            alt=''
            width={40}
            height={40}
          />
        </div>
        <div>
          <p className='text-pink-500'>{project.title}</p>
          <h2 className='text-lg font-bold'>
            {project.teaser ? project.teaser : '\u00A0'}
          </h2>
        </div>
        <p className='text-gray-500 h-36 overflow-hidden text-ellipsis line-clamp-3'>
          {project.descriptionSummary}
        </p>
        <div className='border-t-[1px]'></div>
        <div>
          <div className='flex gap-1'>
            <Image
              src={'/images/project-card/token-logo.svg'}
              alt='token-logo'
              width={24}
              height={24}
            />
            <p className='text-gray-800'>DEGEN Price</p>
          </div>
          <div className='mt-1 grid grid-cols-2'>
            <div className='flex gap-1 items-center'>
              <p className='font-semibold text-gray-800'>1.709</p>
              <p className='text-xs text-gray-400'>in USD</p>
            </div>
            <div className='flex gap-1 items-center'>
              <p className='font-semibold text-gray-800'>1.47221</p>
              <p className='text-xs text-gray-400'>in MATIC</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
