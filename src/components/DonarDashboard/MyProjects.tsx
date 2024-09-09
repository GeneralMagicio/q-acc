import React from 'react';
import { IconABC } from '../Icons/IconABC';
import { Button, ButtonColor } from '../Button';
import { IconViewTransaction } from '../Icons/IconViewTransaction';
import { IconTotalDonars } from '../Icons/IconTotalDonars';
import { IconTotalSupply } from '../Icons/IconTotalSupply';
import { IconTotalDonations } from '../Icons/IconTotalDonations';
import ProjectSupportTable from './ProjectSupportTable';
import { IconCreatedAt } from '../Icons/IconCreatedAt';
import { IconTokenMinted } from '../Icons/IconTokenMinted';
import { useIsUserWhiteListed } from '@/hooks/useIsUserWhiteListed';
// import { IconTokenSchedule } from '../Icons/IconTokenSchedule';

const MyProjects = () => {
  const projectData = true;

  const { data: userWhiteListed } = useIsUserWhiteListed();

  if (!userWhiteListed) {
    return (
      <div className='container bg-white w-full h-[500px] flex items-center justify-center text-[25px]  font-bold text-[#82899A] rounded-2xl'>
        You don't have any project!
      </div>
    );
  }
  return (
    <div className='container'>
      {/* Project Header */}
      <div className='bg-white p-6 flex flex-col rounded-xl'>
        <div className='flex flex-col lg:flex-row justify-between lg:items-center'>
          <div className='flex flex-col'>
            <div className='flex gap-2 items-center text-xs font-medium'>
              <IconCreatedAt />
              <span className='text-[#82899A]'>Create on</span>
              <span className='text-[#4F576A]'>Jan 7, 2024</span>
            </div>
            <h1 className='text-[#1D1E1F] text-[25px] font-bold'>
              ABC Project number ( ONE )
            </h1>
          </div>

          {/* DropDown */}
          <div>Dropdown</div>
        </div>
        <hr className='my-5' />

        <div className='flex flex-col lg:flex-row gap-[60px]'>
          {/* Project banner */}
          <div className='flex flex-col gap-4  w-full lg:w-1/2 '>
            <div
              className='w-full h-[230px] bg-cover bg-center rounded-3xl relative'
              style={{
                backgroundImage:
                  "url('https://giveth.mypinata.cloud/ipfs/QmcQFkNQ3o6f555whoRtFqJgPz6k9nb8WfNEBHk3j2i3CW')",
              }}
            >
              <div className=' flex flex-col absolute  bottom-[5%] left-[5%] md:bottom-[10%] md:left-[10%] gap-2'>
                <div className='border rounded-md bg-white p-1 block w-fit'>
                  <IconABC size={40} />
                </div>
                <div className='flex flex-col text-white gap-2'></div>
              </div>
            </div>

            <p className='text-[#4F576A] font-redHatText leading-6'>
              The Commons Simulator is a gamified simulation tool powered by a
              cadCAD backend that was developed by the Commons Stack's
              Decentralized Dev community.
            </p>

            <Button
              color={ButtonColor.Base}
              className='flex justify-center border border-[#5326EC] font-bold font-redHatText '
            >
              Project Contract address{' '}
              <IconViewTransaction size={20} color={'#5326EC'} />
            </Button>
          </div>

          {/* Project Stats */}

          <div className='flex flex-col  w-full lg:w-1/2 gap-4 font-redHatText'>
            <div className='flex justify-between'>
              <h2 className='text-[#4F576A] font-medium leading-6'>
                Project status
              </h2>
              <div className='flex item-center  border p-1 rounded-2xl'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='6'
                  height='6'
                  viewBox='0 0 6 6'
                  fill='none'
                >
                  <circle cx='3' cy='3' r='3' fill='#37B4A9' />
                </svg>
                <span className='text-xs font-medium text-[#37B4A9]'>
                  Active project
                </span>
              </div>
            </div>
            <div className='flex gap-1'>
              <IconABC />
              ABC current value
            </div>

            <div className='flex justify-between gap-8 '>
              <div className='p-2 w-[80%] rounded-lg bg-[#F7F7F9] text-[#1D1E1F] font-medium'>
                2.02 in POL
              </div>
              <div className='w-[20%] text-right'>~ 3.83</div>
            </div>

            <div className='flex justify-between'>
              <div className='flex gap-2'>
                <IconTotalDonars />
                <span className='text-[#4F576A] font-medium'>
                  Total supporters
                </span>
              </div>
              <span className='text-[#1D1E1F] font-medium'>24</span>
            </div>

            <div className='flex  flex-col gap-2 md:flex-row justify-between'>
              <div className='flex gap-2'>
                <IconTotalSupply />
                <span className='text-[#4F576A] font-medium'>Total supply</span>
              </div>
              <span className='text-[#1D1E1F] font-medium'>
                25,000,000,000 ABC
              </span>
            </div>
            <div className='flex  flex-col md:flex-row gap-2 justify-between'>
              <div className='flex gap-2'>
                <IconTokenMinted />
                <span className='text-[#4F576A] font-medium'>
                  Reward tokens minted
                </span>
              </div>
              <span className='text-[#1D1E1F] font-medium'>
                7,000,000,000 ABC
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Support Summary */}
      {/* <div className='bg-white flex p-6 flex-col rounded-xl gap-4  mt-8'>
        <div className='border-b pb-4'>
          <h1 className='text-[#1D1E1F] font-bold text-2xl'>
            Contributions summary
          </h1>
        </div>

        <div className='flex  flex-col md:flex-row justify-between font-redHatText'>
          <div className='flex gap-2'>
            <IconGift />
            <span className='text-[#4F576A] font-medium'>
              Tributes received
            </span>
            <div className='relative group'>
              <IconTokenSchedule />
              <div className='absolute w-[200px] z-50 mb-2 left-[-60px] hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2'>
                <h3 className='font-bold'>Tributes received</h3>
                These are the tributes your project receives from the mint and
                burn transactions on the ABC.
              </div>
            </div>
          </div>

          <div>
            <span className='text-[#1D1E1F] font-medium'>29,500 POL</span>
            <span className='text-[#82899A] font-medium'>~ $ 7,900</span>
          </div>
        </div>

        <div className='flex  flex-col md:flex-row justify-between p-4 bg-[#EBECF2] md:items-center rounded-xl'>
          <div className='flex gap-4 items-center'>
            <IconTotalDonations size={32} />
            <span className='text-[#4F1D1E1F576A] font-bold text-[25px]'>
              Total contributions
            </span>
          </div>

          <div className='flex items-center gap-4'>
            <span className='text-[#1D1E1F] font-bold text-[25px]'>
              1,880,451 POL
            </span>
            <span className='text-[#82899A] font-medium'>~ $ 980,345</span>
          </div>
        </div>
      </div> */}

      {/* List of Supports */}

      <div className='bg-white flex p-6 flex-col gap-8 rounded-xl   mt-8'>
        {/* <div className='border-b pb-4'>
          <h1 className='text-[#1D1E1F] font-bold text-2xl'>
            List of all supports
          </h1>
        </div> */}
        <div className='border-b pb-4'>
          <h1 className='text-[#1D1E1F] font-bold text-2xl'>
            Contributions summary
          </h1>
        </div>

        <div className='flex  flex-col md:flex-row justify-between p-4 bg-[#EBECF2] md:items-center rounded-xl'>
          <div className='flex gap-4 items-center'>
            <IconTotalDonations size={32} />
            <span className='text-[#4F1D1E1F576A] font-bold text-[25px]'>
              Total contributions
            </span>
          </div>

          <div className='flex items-center gap-4'>
            <span className='text-[#1D1E1F] font-bold text-[25px]'>
              1,880,451 POL
            </span>
            <span className='text-[#82899A] font-medium'>~ $ 980,345</span>
          </div>
        </div>

        <ProjectSupportTable />
      </div>
    </div>
  );
};

export default MyProjects;
