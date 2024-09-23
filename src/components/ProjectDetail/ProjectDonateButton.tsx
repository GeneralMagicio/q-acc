import React, { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { useRouter } from 'next/navigation';
import { Button, ButtonColor } from '../Button';
import { EDonationCardStates } from './DonateSection';
import { useProjectContext } from '@/context/project.context';
import { IconTokenSchedule } from '../Icons/IconTokenSchedule';
import { getIpfsAddress } from '@/helpers/image';
import { checkUserOwnsNFT, fetchTokenPrice } from '@/helpers/token';
import { useFetchRoundDetails } from '@/hooks/useFetchRoundDetails';
import useRemainingTime from '@/hooks/useRemainingTime';

const ProjectDonateButton = () => {
  const { projectData, totalAmount: totalPOLDonated } = useProjectContext();
  const [tokenPrice, setTokenPrice] = useState(1);
  const { address } = useAccount();
  const router = useRouter();
  const [ownsNFT, setOwnsNFT] = useState(false);
  const [loadingNFTCheck, setLoadingNFTCheck] = useState(true);
  const { data: roundDetails, isLoading } = useFetchRoundDetails();
  const remainingTime = useRemainingTime(roundDetails?.endDate);

  useEffect(() => {
    const fetchPrice = async () => {
      const price = await fetchTokenPrice('wmatic');
      setTokenPrice(price);
    };
    fetchPrice();
  }, []);

  useEffect(() => {
    const checkNFT = async () => {
      if (projectData?.abc?.nftContractAddress && address) {
        const res = await checkUserOwnsNFT(
          projectData.abc.nftContractAddress,
          address,
        );
        setOwnsNFT(res);
      }
      setLoadingNFTCheck(false);
    };
    checkNFT();
  }, [projectData?.abc?.nftContractAddress, address]);

  const handleSupport = (e: any) => {
    e.stopPropagation();
    if (ownsNFT) {
      router.push(`/donate/${projectData.slug}`);
    }
  };

  let maxPOLAmount = totalPOLDonated - 1;
  const PriceInfo = () => (
    <div className='flex flex-col gap-2 font-redHatText'>
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
            {projectData?.abc?.tokenTicker} range
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
            {projectData?.abc?.tokenPrice
              ? projectData?.abc?.tokenPrice
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
        <>
          <Button
            color={ButtonColor.Pink}
            className='w-full justify-center'
            onClick={handleSupport}
            disabled={
              !ownsNFT ||
              totalPOLDonated === maxPOLAmount ||
              remainingTime === 'Time is up!'
            }
            loading={loadingNFTCheck}
          >
            {totalPOLDonated === maxPOLAmount
              ? 'Project Maxed Out'
              : 'Support This Project'}
          </Button>

          {!ownsNFT ? (
            <span className='text-[#EA960D] p-1 rounded-full bg-[#FFFBEF] text-xs px-2 text-center font-medium'>
              Missing early access NFT
            </span>
          ) : (
            <span className='text-[#2EA096] p-1 rounded-full bg-[#D2FFFB] text-xs px-2 text-center font-medium'>
              You are on the early access list
            </span>
          )}
        </>
      )}
    </div>
  );
};

export default ProjectDonateButton;
