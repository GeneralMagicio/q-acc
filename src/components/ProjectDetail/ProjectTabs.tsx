import React from 'react';
import Link from 'next/link';
import Routes from '@/lib/constants/Routes';

interface IProjectTabs {
  activeTab: number;
  slug: string;
}
export enum EProjectPageTabs {
  DONATIONS = 'donations',
  MEMEBERS = 'members',
}
const ProjectTabs = (props: IProjectTabs) => {
  const { activeTab, slug } = props;
  const badgeCount = (count?: number) => {
    return count || null;
  };
  const tabsArray = [
    { title: 'About' },
    {
      title: 'Donations',
      badge: 20,
      query: EProjectPageTabs.DONATIONS,
    },
    {
      title: 'Team Members',
      query: EProjectPageTabs.MEMEBERS,
    },
  ];
  return (
    <div>
      <div className='w-full py-4 h-min mt-6 text-gray-800 bg-white overflow-x-auto shadow-[0_3px_20px_rgba(212,218,238,0.4)]'>
        <div className='flex mx-auto max-w-[1200px] items-center gap-6 px-6'>
          {tabsArray.map((i, index) => (
            <Link
              key={i.title}
              href={`${Routes.Project}/${slug}${i.query ? `?tab=${i.query}` : ''}`}
              scroll={false}
            >
              <div
                className={`flex px-6 py-[9px] rounded-full cursor-pointer text-sm md:text-base ${
                  activeTab === index
                    ? 'font-medium text-pink-500 bg-gray-200'
                    : ''
                }`}
              >
                {i.title}
                {badgeCount(i.badge) && (
                  <span
                    className={` text-white text-sm md:text-base rounded-full h-[22px] px-[9px] flex items-center ml-[6px] ${
                      activeTab === index ? 'bg-pink-500' : 'bg-gray-800'
                    }`}
                  >
                    {i.badge}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectTabs;
