import React from 'react';
import Link from 'next/link';
import Routes from '@/lib/constants/Routes';

interface IDashboardTabs {
  activeTab: number;
  slug: string;
}
export enum EDashboardPageTabs {
  PROJECTS = 'projects',
  SUPPORTS = 'supports',
}
const DashboardTabs = (props: IDashboardTabs) => {
  const { activeTab, slug } = props;
  const badgeCount = (count?: number) => {
    return count || null;
  };
  const tabsArray = [
    {
      title: 'My Projects',
      query: EDashboardPageTabs.PROJECTS,
    },
    {
      title: 'My Supports',
      badge: 20,
      query: EDashboardPageTabs.SUPPORTS,
    },
  ];
  return (
    <div>
      <div className='w-full py-4 h-min mt-6 text-gray-800  overflow-x-auto'>
        <div className='flex container w-full   gap-6  justify-start'>
          {tabsArray.map((i, index) => (
            <Link
              key={i.title}
              href={`${Routes.DashBoard}/${i.query ? `?tab=${i.query}` : ''}`}
              scroll={false}
            >
              <div
                className={`flex px-6 py-[9px] rounded-full cursor-pointer text-sm md:text-base ${
                  activeTab === index
                    ? ' font-extrabold text-[#1D1E1F] bg-white shadow-lg'
                    : 'text-[#82899A]'
                }`}
              >
                {i.title}
                {badgeCount(i.badge) && (
                  <span
                    className={` text-white text-sm md:text-base rounded-full h-[22px] px-[9px] flex items-center ml-[6px] ${
                      activeTab === index ? 'bg-[#1D1E1F]' : 'bg-[#82899A]'
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

export default DashboardTabs;
