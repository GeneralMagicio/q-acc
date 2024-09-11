import React from 'react';
import { IconInverter } from './Icons/IconInverter';
import { IconGiveth } from './Icons/IconGiveth';
import { IconPolygon } from './Icons/IconPolygon';
import { IconCommonStack } from './Icons/IconCommonStack';
import { IconGM } from './Icons/IconGM';

const Collaborator = () => {
  return (
    <div className='py-10 w-full bg-white'>
      <div className='container flex flex-col items-center space-y-8'>
        <div className='flex flex-col md:flex-row items-center justify-center gap-14'>
          <div className='flex items-center gap-10'>
            <p className='text-[#A5ADBF] font-bold text-lg leading-normal tracking-tight'>
              Incubated by
            </p>
            <IconGiveth />
          </div>
          <div className='flex items-center gap-10'>
            <p className='text-[#A5ADBF] font-bold text-lg leading-normal tracking-tight '>
              Powered by
            </p>
            <IconPolygon />
          </div>
        </div>

        <div className='w-full border-t border-gray-300' />

        <div className='flex flex-col md:flex-row items-center justify-center md:gap-20 gap-10'>
          <p className='text-[#A5ADBF] font-bold text-lg leading-normal tracking-tight'>
            In collaboration with
          </p>

          <div className='flex flex-wrap gap-10 items-center justify-center'>
            <IconCommonStack />
            <IconGM />
            <IconInverter />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collaborator;
