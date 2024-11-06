import React from 'react';
import { LogoInverter } from './Logos/LogoInverter';
import { LogoGiveth } from './Logos/LogoGiveth';
import { LogoPolygon } from './Logos/LogoPolygon';
import { LogoCommonStack } from './Logos/LogoCommonStack';
import { LogoGM } from './Logos/LogoGM';

const lines = [
  [
    { label: 'Incubated by', Logos: [<LogoGiveth key='giveth' />] },
    { label: 'Built on', Logos: [<LogoPolygon key='polygon' />] },
  ],
  [
    {
      label: 'Powered by',
      Logos: [
        <LogoCommonStack key='commons-stack' />,
        <LogoGM key='general-magic' />,
        <LogoInverter key='inverter' />,
      ],
    },
  ],
];

const Collaborator = () => {
  return (
    <div className='py-10 w-full bg-white'>
      <div className='container flex flex-col items-center space-y-8'>
        <div className='flex flex-col md:flex-row items-center justify-center gap-14'>
          <div className='flex items-center gap-10'>
            <p className='text-[#A5ADBF] font-bold text-lg leading-normal tracking-tight'>
              Incubated by
            </p>
            <LogoGiveth />
          </div>
          <div className='flex items-center gap-10'>
            <p className='text-[#A5ADBF] font-bold text-lg leading-normal tracking-tight '>
              Powered by
            </p>
            <LogoPolygon />
          </div>
        </div>

        <div className='w-full border-t border-gray-300' />

        <div className='flex flex-col md:flex-row items-center justify-center md:gap-20 gap-10'>
          <p className='text-[#A5ADBF] font-bold text-lg leading-normal tracking-tight'>
            In collaboration with
          </p>

          <div className='flex flex-wrap gap-10 items-center justify-center'>
            <LogoCommonStack />
            <LogoGM />
            <LogoInverter />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collaborator;
