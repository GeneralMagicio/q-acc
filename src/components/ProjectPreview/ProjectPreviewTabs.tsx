import React from 'react';
import Link from 'next/link';
import Routes from '@/lib/constants/Routes';
import { useProjectContext } from '@/context/project.context';

interface IProjectTabs {
  activeTab: number;
}
export enum EProjectPageTabs {
  DONATIONS = 'supporters',
  MEMEBERS = 'members',
}
const ProjectPreviewTabs = (props: IProjectTabs) => {
  const { activeTab } = props;
  const { totalDonationsCount } = useProjectContext();
  const badgeCount = (count?: number) => {
    return count || null;
  };
  const tabsArray = [
    { title: 'About' },
    {
      title: 'Transactions',
      badge: totalDonationsCount,
      query: EProjectPageTabs.DONATIONS,
    },
    {
      title: 'Team Members',
      query: EProjectPageTabs.MEMEBERS,
    },
  ];
  return (
    <div>
      <div className='w-full py-4 h-min mt-6 text-gray-800 bg-white overflow-x-auto shadow-[0_3px_20px_rgba(212,218,238,0.4)] relative '>
        <div className='flex container  w-full  items-center gap-6 justify-start'>
          {tabsArray.map((i, index) => (
            <Link
              key={i.title}
              href={`${Routes.Preview}/${i.query ? `?tab=${i.query}` : ''}`}
              scroll={false}
            >
              <div
                className={`flex px-6 py-[9px] rounded-full font-redHatText cursor-pointer text-sm md:text-base font-medium gap-1 items-center${
                  activeTab === index ? '  bg-white shadow-tabShadow' : ''
                }`}
              >
                <span
                  className={`${
                    activeTab === index ? ' text-[#1D1E1F]' : 'text-[#82899A]'
                  }`}
                >
                  {i.title}
                </span>
                {badgeCount(i.badge) && (
                  <span
                    className={`inline-flex items-center  text-white text-xs  min-w-6 min-h-6  font-redHatText  font-medium rounded-full   justify-center ${
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

export default ProjectPreviewTabs;
