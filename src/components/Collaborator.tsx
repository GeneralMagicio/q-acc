import React from 'react';
import Image from 'next/image';

const Collaborator = () => {
  return (
    <div className='py-10 w-full bg-white'>
      <div className='container flex flex-col items-center space-y-8'>
        <div className='flex flex-col md:flex-row items-center justify-center gap-14'>
          <div className='flex items-center gap-10'>
            <p className='text-[#A5ADBF] font-bold text-lg leading-normal tracking-tight'>
              Incubated by
            </p>
            <Image
              src='/images/colaborators/Giveth.png'
              alt='Giveth'
              width={120}
              height={40}
            />
          </div>
          <div className='flex items-center gap-10'>
            <p className='text-[#A5ADBF] font-bold text-lg leading-normal tracking-tight '>
              Powered by
            </p>
            <Image
              src='/images/colaborators/Polygon.png'
              alt='Polygon'
              width={120}
              height={40}
            />
          </div>
        </div>

        <div className='w-full border-t border-gray-300' />

        <div className='flex flex-col md:flex-row items-center justify-center md:gap-20 gap-10'>
          <p className='text-[#A5ADBF] font-bold text-lg leading-normal tracking-tight'>
            In collaboration with
          </p>

          <div className='flex flex-wrap gap-10 items-center justify-center'>
            <Image
              src='/images/colaborators/commonStack.png'
              alt='Commons Stack'
              width={120}
              height={40}
            />
            <Image
              src='/images/colaborators/GM.png'
              alt='General Magic'
              width={120}
              height={40}
            />
            <Image
              src='/images/colaborators/Inverter.png'
              alt='Inverter'
              width={120}
              height={40}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collaborator;
