import Image from 'next/image';
import React, { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAccount } from 'wagmi';
import { IProject } from '@/types/project.type';
import ProjectCardImage from './ProjectCardImage';

import { Button, ButtonColor } from '../Button';
import { getIpfsAddress } from '@/helpers/image';
import { checkUserOwnsNFT } from '@/helpers/token';
import { NFTModal } from '../Modals/NFTModal';
import ProgressBar from '../ProgressBar';
import useRemainingTime from '@/hooks/useRemainingTime';
import { fetchProjectDonationsById } from '@/services/donation.services';
import { calculateTotalDonations, formatNumber } from '@/helpers/donation';
import { useFetchTokenPrice } from '@/hooks/useFetchTokenPrice';
import { useFetchActiveRoundDetails } from '@/hooks/useFetchActiveRoundDetails';
import {
  useTokenPriceRange,
  useTokenPriceRangeStatus,
} from '@/services/tokenPrice.service';
import { calculateCapAmount, getMostRecentEndRound } from '@/helpers/round';
import { useFetchAllRound } from '@/hooks/useFetchAllRound';

interface ProjectCardProps extends React.HTMLAttributes<HTMLDivElement> {
  project: IProject;
}

export const ProjectHoverCard: FC<ProjectCardProps> = ({
  className,
  project,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();
  const { address } = useAccount();
  const [isModalOpen, setModalOpen] = useState(false);
  const { data: activeRoundDetails } = useFetchActiveRoundDetails();
  const remainingTime = useRemainingTime(
    activeRoundDetails?.startDate,
    activeRoundDetails?.endDate,
  );
  const [maxPOLCap, setMaxPOLCap] = useState(0);
  const [totalPOLDonated, setTotalPOLDonated] = useState<number>(0);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const [amountDonatedInRound, setAmountDonatedInRound] = useState(0);

  const { data: POLPrice } = useFetchTokenPrice();

  const [progress, setProgress] = useState(0);
  const [isRoundEnded, setIsRoundEnded] = useState(false);

  useEffect(() => {
    const fetchMostRecentEndRound = async () => {
      const res = await getMostRecentEndRound();

      return res?.__typename === 'QfRound';
    };

    const getData = async () => {
      const data = await fetchMostRecentEndRound();
      setIsRoundEnded(data);
    };

    getData();
  }, [activeRoundDetails, isRoundEnded]);

  useEffect(() => {
    console.log(
      project?.title,
      project?.id + ' NFT address ' + project?.abc?.nftContractAddress,
    );
    if (project?.id) {
      const fetchProjectDonations = async () => {
        const data = await fetchProjectDonationsById(
          parseInt(project?.id),
          1000,
          0,
        );

        if (data) {
          const { donations, totalCount } = data;

          setTotalPOLDonated(calculateTotalDonations(donations));
        }
      };
      fetchProjectDonations();
    }
  }, [project]);

  useEffect(() => {
    const updatePOLCap = async () => {
      const { capAmount, totalDonationAmountInRound }: any =
        await calculateCapAmount(activeRoundDetails, Number(project.id));

      setMaxPOLCap(capAmount);
      setAmountDonatedInRound(totalDonationAmountInRound);

      let tempprogress = 0;
      if (maxPOLCap > 0) {
        tempprogress =
          Math.round((totalDonationAmountInRound / capAmount) * 100 * 100) /
          100;
        setProgress(tempprogress);
      }
    };

    updatePOLCap();
  }, [activeRoundDetails, project, progress, maxPOLCap, amountDonatedInRound]);

  const handleSupport = async (e: any) => {
    e.stopPropagation();
    if (activeRoundDetails?.__typename !== 'QfRound') {
      console.log(activeRoundDetails);
      const res = await checkUserOwnsNFT(
        project?.abc?.nftContractAddress || '',
        address || '',
      );
      if (res) {
        router.push(`/support/${project.slug}`);
      } else {
        openModal();
      }
    } else {
      router.push(`/support/${project.slug}`);
    }
  };

  const handleCardClick = () => {
    router.push(`/project/${project.slug}`);
  };

  const tokenPriceRange = useTokenPriceRange({
    contributionLimit: maxPOLCap,
    contractAddress: project.abc?.fundingManagerAddress || '',
  });

  const { data: allRounds } = useFetchAllRound();
  const tokenPriceRangeStatus = useTokenPriceRangeStatus({
    project,
    allRounds,
  });

  const polPriceNumber = Number(POLPrice);

  return (
    <div
      className={`${className} relative cursor-pointer rounded-xl ${progress === 100 ? 'shadow-cardShadow' : ''}`}
    >
      <NFTModal
        isOpen={isModalOpen}
        onClose={closeModal}
        showCloseButton={true}
      />
      <div
        onClick={handleCardClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`relative  w-full  h-[470px] rounded-xl bg-white overflow-hidden shadow-tabShadow shadow-gray-200 `}
        {...props}
      >
        <div className='relative h-[350px] font-redHatText '>
          <ProjectCardImage
            src={project.image}
            alt='Project Card'
            layout='fill'
            fallbackSrc='/images/project-card/card-image.jpeg'
          />
        </div>

        <div
          className={`w-full bg-white absolute h-fit   ${isHovered ? 'bottom-0' : activeRoundDetails ? 'bottom-[-80px]' : 'bottom-[-10px]'}  rounded-xl p-6  transition-bottom duration-500 ease-in-out`}
        >
          <div className='absolute bg-white left-0 -top-11 w-16 h-16 p-3 rounded-tr-xl rounded-bl-xl '>
            <Image
              src={project.icon || '/images/project-card/logo.svg'}
              alt=''
              width={50}
              height={50}
            />
            <svg
              className=' absolute bottom-5 right-[-18px]'
              xmlns='http://www.w3.org/2000/svg'
              width='18'
              height='18'
              viewBox='0 0 18 18'
              fill='none'
            >
              <path
                d='M0 18V0C0 0 0.153782 10.1538 4 14C7.84622 17.8462 18 18 18 18H0Z'
                fill='white'
              />
            </svg>
          </div>

          <div className='flex flex-col gap-4'>
            <div className='flex flex-col'>
              <h2 className='text-lg font-bold'>{project.title}</h2>
            </div>
            <div className='min-h-[100px] text-ellipsis  pb-3  '>
              <p className='text-gray-500  overflow-hidden    font-redHatText  line-clamp-4 leading-6'>
                {project.descriptionSummary}
                {/* {project.teaser ? project.teaser : '\u00A0'} */}
              </p>
            </div>

            {!isRoundEnded && (
              <>
                {/* Percentage Bar */}
                <div className='flex flex-col gap-2'>
                  <div
                    className={`px-2 py-[2px] rounded-md  w-fit  font-redHatText text-xs font-medium ${progress === 100 ? 'bg-[#5326EC] text-white' : 'bg-[#F7F7F9] text-[#1D1E1F]'} `}
                  >
                    {progress === 0
                      ? 'Getting started !'
                      : progress !== 100
                        ? progress + '% collected'
                        : 'Maxed out this round!'}
                  </div>
                  <ProgressBar progress={progress} isStarted={false} />
                </div>

                <div>
                  <div className='flex gap-2 items-center pb-1'>
                    {/* {getIpfsAddress(project.abc?.icon!)} */}

                    <img
                      className='w-6 h-6 rounded-full'
                      src={getIpfsAddress(
                        project.abc?.icon! ||
                          'Qmeb6CzCBkyEkAhjrw5G9GShpKiVjUDaU8F3Xnf5bPHtm4',
                      )}
                    />

                    {/* <IconABC /> */}
                    <p className='text-gray-800 font-medium'>
                      {project?.abc?.tokenTicker} range
                    </p>
                  </div>
                  <div className='mt-1 flex justify-between'>
                    {tokenPriceRangeStatus.isSuccess &&
                    tokenPriceRangeStatus.data?.isPriceUpToDate ? (
                      <>
                        <div className='flex gap-1 items-center p-2 bg-[#F7F7F9] rounded-md w-2/3'>
                          <p className='font-bold text-gray-800'>
                            {tokenPriceRange.min.toFixed(2)} -{' '}
                            {tokenPriceRange.max.toFixed(2)}
                          </p>
                          <p className='text-xs text-gray-400'>POL</p>
                        </div>
                        <div className='flex gap-1 items-center'>
                          <p className='text-sm text-[#4F576A] font-medium'>
                            ~$
                            {polPriceNumber
                              ? `${formatNumber(polPriceNumber * tokenPriceRange.min)} - ${formatNumber(polPriceNumber * tokenPriceRange.max)}`
                              : ''}
                          </p>
                        </div>
                      </>
                    ) : (
                      <p>Calculating...</p>
                    )}
                  </div>
                </div>

                <Button
                  color={ButtonColor.Pink}
                  className={`w-full justify-center opacity-80 ${remainingTime === 'Time is up!' ? '' : 'hover:opacity-100'}`}
                  onClick={handleSupport}
                  disabled={
                    remainingTime === 'Time is up!' ||
                    remainingTime === '--:--:--' ||
                    maxPOLCap === amountDonatedInRound
                  }
                >
                  Support This Project
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
