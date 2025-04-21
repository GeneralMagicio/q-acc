import Image from 'next/image';
import React from 'react';
import links from '@/lib/constants/links';

export const HelpSection = () => {
  return (
    <div className='container relative'>
      <div className='py-10 px-9 flex flex-col gap-6 text-center text-2xl font-light'>
        <h1 className='text-2xl text-giv-500 font-bold '>Need help?</h1>
        <p className='text-lg'>
          Stuck or have questions? Our team is on standby to assist you.
          <br />
          Send us an email at{' '}
          <a className='text-pink-500' href='mailto:info@qacc.xyz '>
            info@qacc.xyz
          </a>
          , or drop us a message at{' '}
          <a
            href={links.DISCORD_SUPPORT}
            target='_blank'
            rel='noopener noreferrer'
            className='text-pink-500'
          >
            Giveth’s Discord #general channel
          </a>
          .
        </p>
        <p className='text-gray-400 text-lg'>
          The q/acc program is proudly incubated under Giveth,
          <br />
          one of the pioneers in blockchain-based philanthropy and fundraising. 
        </p>
      </div>
      <Image
        src='/images/particles/trazado-v-g.svg'
        alt='trazado'
        width={32}
        height={157}
        className='absolute top-1/4 left-0'
      />
      <Image
        src='/images/particles/caminho-p.svg'
        alt='caminho'
        width={31}
        height={31}
        className='absolute top-2 right-0'
      />
      <Image
        src='/images/particles/caminho-g.svg'
        alt='caminho'
        width={31}
        height={31}
        className='absolute -bottom-3 left-1/3'
      />
    </div>
  );
};
