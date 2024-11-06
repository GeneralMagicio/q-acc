import React from 'react';
import Image from 'next/image';
import { LogoInverter } from './Logos/LogoInverter';
import { LogoGiveth } from './Logos/LogoGiveth';
import { LogoPolygon } from './Logos/LogoPolygon';
import { LogoCommonStack } from './Logos/LogoCommonStack';
import { LogoGM } from './Logos/LogoGM';
import { LogoPrivado } from './Logos/LogoPrivado';
import { LogoMidao } from './Logos/LogoMidao';

const lines = [
  [
    { label: 'Incubated by', logos: [<LogoGiveth key='giveth' />] },
    { label: 'Built on', logos: [<LogoPolygon key='polygon' />] },
  ],
  [
    {
      label: 'Powered by',
      logos: [
        <LogoCommonStack key='commons-stack' />,
        <LogoGM key='general-magic' />,
        <LogoInverter key='inverter' />,
        <LogoPrivado key='privado' />,
      ],
    },
  ],
  [
    {
      label: 'Acceleration partners',
      logos: [
        <LogoMidao key='midao' />,
        <Image
          src='/images/logos/counity.png'
          alt='counity'
          key='counity'
          height={41}
          width={151}
        />,
        <Image
          src='/images/logos/serious-people.png'
          alt='Serious People'
          key='serious-people'
          height={41}
          width={151}
        />,
        <Image
          src='/images/logos/innerly.png'
          alt='innerly'
          key='innerly'
          height={41}
          width={151}
        />,
      ],
    },
  ],
];

const Collaborator = () => {
  return (
    <div className='py-10 w-full bg-white'>
      <div className='container flex flex-col items-center space-y-8'>
        {lines.map((line, i) => (
          <div
            key={i}
            className='flex flex-col md:flex-row items-center justify-center gap-14'
          >
            {line.map(({ label, logos }) => (
              <div key={label} className='flex items-center gap-10'>
                <p className='text-[#A5ADBF] font-bold text-lg leading-normal tracking-tight'>
                  {label}
                </p>
                {logos}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Collaborator;
