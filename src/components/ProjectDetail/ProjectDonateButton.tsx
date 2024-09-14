import React, { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { useRouter } from 'next/navigation';
import { Button, ButtonColor } from '../Button';
import { EDonationCardStates } from './DonateSection';
import { useProjectContext } from '@/context/project.context';
import { IconTokenSchedule } from '../Icons/IconTokenSchedule';
import { getIpfsAddress } from '@/helpers/image';
import { checkUserOwnsNFT, fetchTokenPrice } from '@/helpers/token';

import { NFTModal } from '../Modals/NFTModal';

const ProjectDonateButton = () => {
  const { projectData } = useProjectContext();
  const [tokenPrice, setTokenPrice] = useState(1);
  const { address } = useAccount();
  const router = useRouter();
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  useEffect(() => {
    const fetchPrice = async () => {
      const price = await fetchTokenPrice('wmatic');
      setTokenPrice(price);
    };
    fetchPrice();
  }, []);

  const handleSupport = async (e: any) => {
    e.stopPropagation();
    const res = await checkUserOwnsNFT(
      projectData?.abc?.nftContractAddress || '',
      address || '',
    );
    if (res) {
      router.push(`/donate/${projectData.slug}`);
    } else {
      openModal();
    }
  };
  const PriceInfo = () => (
    <div className='flex flex-col gap-2 font-redHatText'>
      <NFTModal isOpen={isModalOpen} onClose={closeModal} />
      <div className='flex justify-start items-center gap-2 '>
        <img
          className='w-6 h-6 rounded-full'
          src={getIpfsAddress(
            projectData.abc?.icon! ||
              'Qmeb6CzCBkyEkAhjrw5G9GShpKiVjUDaU8F3Xnf5bPHtm4',
          )}
        />
        <div className='flex gap-2 items-center'>
          <span className='text-[#4F576A] font-medium'>
            {projectData?.abc?.tokenTicker} current value
          </span>
          <div className='relative group'>
            <IconTokenSchedule />
            <div className='absolute w-[200px] z-50 mb-2 left-[-60px] hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2'>
              <h3 className='font-bold'>ABC Current Value</h3>
              Bonding curves have a mint price and a burn price. This shows the
              mint price.
            </div>
          </div>
        </div>

        {/* <IconInfo /> */}
      </div>
      <div className='flex items-center  text-sm  gap-2 text-[#82899A] '>
        <h1 className=' w-[200px] p-2 bg-[#F7F7F9] rounded-lg'>
          <span className='text-[#1D1E1F] font-medium'>
            {projectData?.abc?.tokenPrices
              ? projectData?.abc?.tokenPrices
              : '---'}
          </span>
          <span className='text-[#4F576A] text-xs '> POL</span>
        </h1>
        <span className='text-[#4F576A] font-medium'>
          ${' '}
          {projectData?.abc?.tokenPrice
            ? Math.round(projectData?.abc?.tokenPrice * tokenPrice * 100) / 100
            : '---'}
        </span>
      </div>
    </div>
  );
  let currentState = 'early';
  return (
    <div className='flex flex-col gap-4'>
      {PriceInfo()}
      {currentState === EDonationCardStates.beforeFirstRound ? (
        <Button
          color={ButtonColor.Pink}
          className='w-full justify-center opacity-50 cursor-not-allowed'
        >
          Starting Soon
        </Button>
      ) : (
        // <Link id='Donate_Project' href={`/donate/${projectData.slug}`}>
        <Button
          color={ButtonColor.Pink}
          className='w-full justify-center'
          onClick={handleSupport}
        >
          Support This Project
        </Button>
        // </Link>
      )}
    </div>
  );
};

export default ProjectDonateButton;
