import Image from 'next/image';
import React, { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAccount } from 'wagmi';
import { IProject } from '@/types/project.type';
import ProjectCardImage from './ProjectCardImage';

import { Button, ButtonColor } from '../Button';
import { getIpfsAddress } from '@/helpers/image';
import { checkUserOwnsNFT, fetchTokenPrice } from '@/helpers/token';
import { NFTModal } from '../Modals/NFTModal';
import ProgressBar from '../ProgressBar';
import useRemainingTime from '@/hooks/useRemainingTime';
import { fecthProjectDonationsById } from '@/services/donation.services';
import { calculateTotalDonations } from '@/helpers/donation';
import { useFetchTokenPrice } from '@/hooks/useFetchTokenPrice';
import { useFetchActiveRoundDetails } from '@/hooks/useFetchActiveRoundDetails';
import { useTokenPriceRange } from '@/services/tokenPrice.service';

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
  const remainingTime = useRemainingTime(activeRoundDetails?.endDate);

  const [totalPOLDonated, setTotalPOLDonated] = useState<number>(0);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const { data: tokenPrice, isLoading } = useFetchTokenPrice();

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    console.log(
      project?.title + ' NFT address' + project?.abc?.nftContractAddress,
    );
    if (tokenPrice) {
      let maxPOLAmount = 100000 / tokenPrice;
      let tempprogress =
        Math.round((totalPOLDonated / maxPOLAmount) * 100 * 100) / 100;
      setProgress(tempprogress);
    }
  }, [totalPOLDonated]);

  useEffect(() => {
    if (project?.id) {
      const fetchProjectDonations = async () => {
        const data = await fecthProjectDonationsById(
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

  const handleSupport = async (e: any) => {
    e.stopPropagation();
    const res = await checkUserOwnsNFT(
      project?.abc?.nftContractAddress || '',
      address || '',
    );
    if (res) {
      router.push(`/donate/${project.slug}`);
    } else {
      openModal();
    }
  };

  const handleCardClick = () => {
    router.push(`/project/${project.slug}`);
  };

  // New token price logic
  const maxContributionPOLAmountInCurrentRound = 200000 * (10 ^ 18); // Adjust the max cap later from backend
  const tokenPriceRange = useTokenPriceRange({
    contributionLimit: maxContributionPOLAmountInCurrentRound,
    contractAddress: project.abc?.fundingManagerAddress || '',
  });

  const POLPrice = useFetchTokenPrice();

  return (
    <div
      className={`${className} relative cursor-pointer rounded-xl ${progress === 100 ? 'shadow-cardShadow' : ''}`}
    >
      <NFTModal isOpen={isModalOpen} onClose={closeModal} />
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
          className={`w-full bg-white absolute h-fit   ${isHovered ? 'bottom-0' : 'bottom-[-80px] '}  rounded-xl p-6  transition-bottom duration-500 ease-in-out`}
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
                <div className='flex gap-1 items-center p-2 bg-[#F7F7F9] rounded-md w-2/3'>
                  <p className='font-bold text-gray-800'>
                    {tokenPriceRange.min.toFixed(3)} -{' '}
                    {tokenPriceRange.max.toFixed(3)}
                  </p>
                  <p className='text-xs text-gray-400'> POL</p>
                </div>
                <div className='flex gap-1 items-center'>
                  <p className='text-sm text-[#4F576A] font-medium'>
                    ~${' '}
                    {Number(POLPrice) &&
                      (Number(POLPrice) * tokenPriceRange.min).toFixed(3)}{' '}
                    ${' '}
                    {Number(POLPrice) &&
                      (Number(POLPrice) * tokenPriceRange.max).toFixed(3)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Button
            color={ButtonColor.Pink}
            className={`w-full justify-center mt-4 opacity-80 ${remainingTime === 'Time is up!' ? '' : 'hover:opacity-100'}`}
            onClick={handleSupport}
            disabled={remainingTime === 'Time is up!'}
          >
            Support This Project
          </Button>
        </div>
      </div>
    </div>
  );
};
