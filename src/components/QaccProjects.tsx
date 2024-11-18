import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Routes from '@/lib/constants/Routes';

const projects = [
  {
    name: 'Akarun',
    description:
      'Akarun is a mobile game where players race custom runners tied to live market assets. The fastest runner linked to the top-performing asset wins.',
    image: (
      <Image
        src='/Icons/akarun1x.png'
        width={48}
        height={48}
        alt='Akarun'
        quality={100}
      />
    ),
    slug: 'akarun',
  },
  {
    name: 'Ancient Beast',
    description:
      'Ancient Beast is an open-source, match-based (1v1 or 2v2) eSports strategy game played against other people or AI. It has no chance-based elements and is designed to be easy to learn, fun to play, and hard to master.',
    image: (
      <Image
        src='/Icons/beast.png'
        width={60}
        height={60}
        alt='Ancient Beast'
        quality={100}
      />
    ),
    slug: 'ancient-beast',
  },
  {
    name: 'Citizen Wallet',
    description:
      'Citizen Wallet empowers communities and events with Web3 tools to easily launch, use, and manage community tokens via a mobile app and NFC wallets.',
    image: (
      <Image
        src='/Icons/citizen1x.png'
        width={50}
        height={60}
        alt='Citizen Wallet'
        quality={100}
      />
    ),
    slug: 'citizen-wallet',
  },
  {
    name: 'The Grand Timeline',
    description:
      'The Grand Timeline is a historical research and data visualization project about the entire history of blockchains and Web3. It will be the first interactive and collectible story of its kind.',
    image: (
      <Image
        src='/Icons/grand.png'
        width={60}
        height={60}
        alt='The Grand Timeline'
        quality={100}
      />
    ),
    slug: 'the-grand-timeline',
  },
  {
    name: 'Melodex',
    description:
      'Melodex is a decentralized exchange focused on listing asset-backed music tokens that represent shares in song royalty rights. These tokens enable passive income from music monetization.',
    image: (
      <Image
        src='/Icons/melodex1x.png'
        width={180}
        height={60}
        alt='Melodex'
        quality={100}
      />
    ),
    slug: 'melodex',
  },
  {
    name: 'Prismo Technology',
    description:
      'Prismo Technology is a layer-2 hybrid public-private blockchain platform designed to enable secure and scalable solutions for enterprises and government organizations, facilitating the transition of traditional technologies to blockchain.',
    image: (
      <Image
        src='/Icons/prismo1x.png'
        width={62}
        height={60}
        alt='Prismo Technology'
        quality={100}
      />
    ),
    slug: 'prismo-technology',
  },
  {
    name: 'x23.ai',
    description:
      'x23 is automating the future of decentralized organizations by integrating AI tools to streamline the operation and governance of DAOs, making them more efficient and autonomous.',
    image: (
      <Image
        src='/Icons/x231x.png'
        width={71}
        height={60}
        alt='x23.ai'
        quality={100}
      />
    ),
    slug: 'x23ai',
  },
  {
    name: 'Xade Finance',
    description:
      'Xade Finance is building the AI-powered Robinhood of DeFi. It is a decentralized platform driven by AI insights and tools that offers a seamless experience for trading and managing digital assets.',
    image: (
      <Image
        src='/Icons/xade1x.png'
        width={86}
        height={60}
        alt='Xade Finance'
        quality={100}
      />
    ),
    slug: 'xade-finance',
  },
];

export const QaccProjects = () => {
  return (
    <div className='bg-white relative pb-24'>
      <div className='absolute right-0 top-10'>
        <Image
          src={'/images/particles/trazado3.svg'}
          width={150}
          height={100}
          alt='Trazado'
        />
      </div>
      <div className='flex flex-col gap-12 container p-7'>
        <h1 className='text-5xl text-gray-900 font-bold'>Who can I support?</h1>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-9 justify-center'>
          {projects.map((project, index) => (
            <div
              key={index}
              className='flex flex-col gap-3 text-[24px] sm:text-left'
            >
              <div>{project.image}</div>
              <h1 className='text-gray-900 font-bold'>{project.name}</h1>
              <p className='leading-9 text-[#4F576A]'>{project.description}</p>
              <Link
                className='text-pink-500 font-bold'
                href={Routes.Project + `/${project.slug}`}
              >
                View Project {'>'}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
