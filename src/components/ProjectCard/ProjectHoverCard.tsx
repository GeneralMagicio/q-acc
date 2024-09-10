import Image from 'next/image';
import React, { FC, useState } from 'react';
import { useRouter } from 'next/navigation';
import { IProject } from '@/types/project.type';
import ProjectCardImage from './ProjectCardImage';
import { IconABC } from '../Icons/IconABC';

import { Button, ButtonColor } from '../Button';

interface ProjectCardProps extends React.HTMLAttributes<HTMLDivElement> {
  project: IProject;
}

export const ProjectHoverCard: FC<ProjectCardProps> = ({
  className,
  project,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/project/${project.slug}`);
  };
  return (
    <div className={`${className} relative cursor-pointer`}>
      <div
        onClick={handleCardClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`relative  w-full  h-[430px] rounded-xl bg-white overflow-hidden shadow-tabShadow shadow-gray-200 `}
        {...props}
      >
        <div className='relative h-[350px] font-redHatText '>
          <ProjectCardImage
            src={project.image}
            alt='Project Card'
            layout='fill'
            fallbackSrc='/images/project-card/card-image.jpeg'
          />
        </div>

        <div
          className={`w-full bg-white absolute h-fit   ${isHovered ? 'bottom-0' : 'bottom-[-80px] '}  rounded-xl p-6  transition-bottom duration-500 ease-in-out`}
        >
          <div className='absolute bg-white left-0 -top-11 w-16 h-16 p-3 rounded-tr-xl rounded-bl-xl '>
            <Image
              src={project.icon || '/images/project-card/logo.svg'}
              alt=''
              width={50}
              height={50}
            />
            <svg
              className=' absolute bottom-5 right-[-18px]'
              xmlns='http://www.w3.org/2000/svg'
              width='18'
              height='18'
              viewBox='0 0 18 18'
              fill='none'
            >
              <path
                d='M0 18V0C0 0 0.153782 10.1538 4 14C7.84622 17.8462 18 18 18 18H0Z'
                fill='white'
              />
            </svg>
          </div>

          <div className='flex flex-col gap-4'>
            <div className='flex flex-col'>
              <p className='text-pink-500'>{project.abc?.tokenName}</p>
              <h2 className='text-lg font-bold'>{project.title}</h2>
            </div>
            <div className='min-h-[100px] text-ellipsis border-b pb-3  '>
              <p className='text-gray-500  overflow-hidden    font-redHatText  line-clamp-4 leading-6'>
                {project.descriptionSummary}
                {/* {project.teaser ? project.teaser : '\u00A0'} */}
              </p>
            </div>

            <div>
              <div className='flex gap-2 items-center'>
                {/* {project.abc?.icon} */}
                <IconABC />
                <p className='text-gray-800'>ABC current value</p>
              </div>
              <div className='mt-1 flex justify-between'>
                <div className='flex gap-1 items-center  p-2 bg-[#F7F7F9] rounded-md w-2/3'>
                  <p className='font-bold text-gray-800'>1.70</p>
                  <p className='text-xs text-gray-400'> POL</p>
                </div>
                <div className='flex gap-1 items-center'>
                  <p className='text-base text-[#4F576A] font-medium'>
                    ~ $1.47
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Button
            color={ButtonColor.Pink}
            className='w-full justify-center mt-4 opacity-80 hover:opacity-100'
            onClick={e => {
              e.stopPropagation();
              router.push(`/donate/${project.slug}`);
            }}
          >
            Support This Project
          </Button>
        </div>
      </div>
    </div>
  );
};
