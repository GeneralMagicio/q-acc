import React, { FC } from 'react';

interface InfoSectionProps {
  title: string;
  children: React.ReactNode;
}

const InfoSection: FC<InfoSectionProps> = ({ title, children }) => {
  return (
    <div className='relative  flex flex-col items-center gap-20  self-stretch bg-[#FFF] font-redHatText'>
      <div className='container  flex flex-col gap-6  items-start p-[80px_40px] '>
        <h1 className=' relative  mx-auto font-bold text-2xl '>
          {title}
          <svg
            className=' absolute left-[40%] top-[-70%]'
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 31 32'
            fill='none'
          >
            <path
              d='M31 31.8955C31 14.8025 17.0934 0.895508 0 0.895508V31.8955H31Z'
              fill='#FFCD7A'
            />
          </svg>
        </h1>
        <div className='text-lg leading-9 mx-auto text-[#4F576A] font-redHatText flex flex-col gap-10'>
          {children}
        </div>
      </div>
      <div className=' absolute bottom-0 left-0 bg-[#FBBA80] h-[26px] w-full'></div>
    </div>
  );
};

export default InfoSection;
