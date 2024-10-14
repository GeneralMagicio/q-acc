import React, { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import Link from 'next/link';
import Image from 'next/image';
import { IconViewTransaction } from '../Icons/IconViewTransaction';
import { IconTotalDonars } from '../Icons/IconTotalDonars';
import { IconTotalSupply } from '../Icons/IconTotalSupply';
import { IconTotalDonations } from '../Icons/IconTotalDonations';
import ProjectSupportTable from './ProjectSupportTable';
import { IconCreatedAt } from '../Icons/IconCreatedAt';
import { IconTokenMinted } from '../Icons/IconTokenMinted';
import { useIsUserWhiteListed } from '@/hooks/useIsUserWhiteListed';
import { IconViewProject } from '../Icons/IconViewProject';
import { IconEditProject } from '../Icons/IconEditProject';
import { IconSearch } from '../Icons/IconSearch';
import { IconTributesReceived } from '../Icons/IconTributesReceived';
import { IconTokenSchedule } from '../Icons/IconTokenSchedule';
import { IconDropDown } from '../Icons/IconDropDown';
import { useFetchUser } from '@/hooks/useFetchUser';
import { useFetchProjectByUserId } from '@/hooks/useFetchProjectByUserId';
import { formatDateMonthDayYear, isMiddleOfThePeriod } from '@/helpers/date';
import config from '@/config/configuration';
import { fetchProjectDonationsById } from '@/services/donation.services';
import {
  calculateTotalDonations,
  calculateUniqueDonors,
  formatAmount,
  formatNumber,
} from '@/helpers/donation';
import { getIpfsAddress } from '@/helpers/image';
import { RoundCollectedInfo } from './RoundCollectedInfo';
import { IconChevronDown } from '../Icons/IconChevronDown';
import { IconChevronUp } from '../Icons/IconChevronUp';
import { useFetchAllRound } from '@/hooks/useFetchAllRound';
import { IEarlyAccessRound, IQfRound } from '@/types/round.type';
import { useFetchTokenPrice } from '@/hooks/useFetchTokenPrice';
import { useTokenPriceRange } from '@/services/tokenPrice.service';
import { RoundCollectHeader } from './RoundCollectHeader';
import { useProjectCollateralFeeCollected } from '@/services/tributeCollected.service';
import { useFetchActiveRoundDetails } from '@/hooks/useFetchActiveRoundDetails';
import { Button, ButtonColor } from '../Button';
import { IconShare } from '../Icons/IconShare';
import { IconUnlock } from '../Icons/IconUnlock';
import { ShareProjectModal } from '../Modals/ShareProjectModal';

const MyProjects = () => {
  const { data: userData } = useFetchUser(true);
  const { data: projectData } = useFetchProjectByUserId(
    parseInt(userData?.id ?? ''),
  );
  const projectId = projectData?.id;
  const projectSlug = projectData?.slug;
  const { address, isConnected } = useAccount();
  const { data: userWhiteListed } = useIsUserWhiteListed();
  const [isHovered, setIsHovered] = useState(false);
  const [donations, setDonations] = useState<any[]>([]);
  const [totalDonationsCount, setTotalDonationsCount] = useState(0);
  const [uniqueDonars, setUniqueDonars] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const { data: POLPrice } = useFetchTokenPrice();
  const [searchTerm, setSearchTerm] = useState('');
  const [submittedSearchTerm, setSubmittedSearchTerm] = useState('');
  const [showRoundCollected, setShowRoundCollected] = useState(false);
  const [filteredRoundData, setFilteredRoundData] = useState<{
    activeRound: IEarlyAccessRound | IQfRound;
    pastRounds: (IEarlyAccessRound | IQfRound)[];
    roundType: string;
    lastRound: IEarlyAccessRound | IQfRound;
    qfRoundEnded: boolean;
    pastRoundNumber: number;
  }>({
    activeRound: {} as IEarlyAccessRound | IQfRound,
    pastRounds: [],
    roundType: '',
    lastRound: {} as IEarlyAccessRound | IQfRound,
    qfRoundEnded: false,
    pastRoundNumber: 1,
  });
  const { data: allRoundData } = useFetchAllRound();
  const { data: activeRoundDetails } = useFetchActiveRoundDetails();

  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const openShareModal = () => setIsShareModalOpen(true);
  const closeShareModal = () => setIsShareModalOpen(false);

  // New token price logic
  const maxContributionPOLAmountInCurrentRound = 200000 * (10 ^ 18); // Adjust the max cap later from backend
  const tokenPriceRange = useTokenPriceRange({
    contributionLimit: maxContributionPOLAmountInCurrentRound,
    contractAddress: projectData?.abc?.fundingManagerAddress || '',
  });

  useEffect(() => {
    if (!allRoundData) return;

    let activeRound: IEarlyAccessRound | IQfRound = {} as
      | IEarlyAccessRound
      | IQfRound;
    let pastRounds: (IEarlyAccessRound | IQfRound)[] = [];
    let roundType = 'ea';
    let qfRoundEnded = false;
    let lastRound: IEarlyAccessRound | IQfRound = {} as
      | IEarlyAccessRound
      | IQfRound;
    let pastRoundNumber = 1;
    allRoundData.forEach(round => {
      const { __typename, startDate, endDate } = round;

      // Update last round if it's an EarlyAccessRound
      if (__typename === 'EarlyAccessRound') {
        lastRound = round;
      }

      // Check if the round is active
      let isActive = isMiddleOfThePeriod(startDate, endDate);
      if (
        (__typename === 'EarlyAccessRound' && isActive) ||
        (__typename === 'QfRound' && isActive)
      ) {
        activeRound = round;
        roundType = __typename;
        console.log('active', activeRound);
      }

      // Push past EarlyAccessRounds to pastRounds
      const hasEnded = new Date(endDate) < new Date();
      if (__typename === 'EarlyAccessRound' && (hasEnded || isActive)) {
        pastRounds.push(round);
        pastRoundNumber = round.roundNumber;
      }

      // Check if a QfRound has ended
      if (__typename === 'QfRound' && hasEnded) {
        activeRound = round;
        qfRoundEnded = true;
      }
    });

    // Sort past rounds by endDate in descending order
    pastRounds.sort(
      (a, b) => new Date(b.endDate).getTime() - new Date(a.endDate).getTime(),
    );

    setFilteredRoundData({
      activeRound,
      pastRounds,
      roundType,
      lastRound,
      qfRoundEnded,
      pastRoundNumber,
    });
  }, [allRoundData]);

  useEffect(() => {
    if (projectData?.id) {
      const fetchProjectDonations = async () => {
        const data = await fetchProjectDonationsById(
          parseInt(projectData?.id),
          1000,
          0,
        );

        if (data) {
          const { donations, totalCount } = data;
          setDonations(donations);
          setTotalDonationsCount(totalCount);
          setUniqueDonars(calculateUniqueDonors(donations));
          setTotalAmount(calculateTotalDonations(donations));
        }
      };
      fetchProjectDonations();
    }
  }, [projectData]);

  // Handler for input change to update searchTerm
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    if (event.target.value === '') {
      setSubmittedSearchTerm(searchTerm);
    }
  };

  const handleShare = () => {
    openShareModal();
  };

  // Handler for search button click
  const handleSearchClick = () => {
    setSubmittedSearchTerm(searchTerm);
  };

  // Handler for detecting Enter key press
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearchClick();
    }
  };

  const tributeReceived = useProjectCollateralFeeCollected({
    contractAddress: projectData?.abc?.fundingManagerAddress,
  }).collectedFees;

  if (!userWhiteListed) {
    return (
      <div className='container bg-white w-full h-[500px] flex items-center justify-center text-[25px]  font-bold text-[#82899A] rounded-2xl'>
        You don't have any project!
      </div>
    );
  }

  // Setup project image
  const backgroundImage = projectData?.image
    ? `url(${projectData?.image})`
    : '';

  return (
    <div className='container'>
      {/* Project Header */}
      <div className='bg-white p-6 flex flex-col rounded-xl'>
        <div className='flex flex-col lg:flex-row justify-between lg:items-center'>
          <div className='flex flex-col'>
            <div className='flex gap-2 items-center text-xs font-medium'>
              <IconCreatedAt />
              <span className='text-[#82899A]'>Create on</span>
              <span className='text-[#4F576A]'>
                {formatDateMonthDayYear(projectData?.creationDate ?? '')}
              </span>
            </div>
            <h1 className='text-[#1D1E1F] text-[25px] font-bold'>
              {projectData?.title}
            </h1>
          </div>

          {/* DropDown */}
          <div className='relative w-fit cursor-pointer'>
            <div
              onClick={() => setIsHovered(!isHovered)}
              onMouseLeave={() => setIsHovered(false)}
              className='py-[10px] px-[16px] bg-[#F7F7F9] rounded-lg flex gap-2 text-[#1D1E1F] font-medium font-redHatText'
            >
              <span>Actions</span>
              <IconDropDown />
            </div>
            <div
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className={`p-2 flex flex-col absolute bg-white md:left-[-100px] shadow-tabShadow rounded-xl  z-30 gap-2 w-[239px] ${isHovered ? 'visible' : 'hidden '} `}
            >
              <Link
                href={`/project/${projectSlug}/`}
                className='p-2 flex gap-2 items-center hover:bg-[#F7F7F9] rounded-lg'
              >
                <IconViewProject />
                View project
              </Link>
              <Link
                href={`edit/${projectId}/project`}
                className='p-2 flex gap-2 items-center hover:bg-[#F7F7F9] rounded-lg'
              >
                <IconEditProject />
                Edit project
              </Link>
            </div>
          </div>
        </div>
        <hr className='my-5' />

        <div className='flex flex-col lg:flex-row gap-[60px]'>
          {/* Project banner */}
          <div className='flex flex-col gap-4  w-full lg:w-1/2 '>
            <div
              className='w-full h-[230px] bg-cover bg-center rounded-3xl relative'
              style={{
                backgroundImage: backgroundImage,
              }}
            >
              <div className=' flex flex-col absolute  bottom-[24px] left-[24px] md:bottom-[24px] md:left-[24px] gap-2'>
                <div className='border rounded-md bg-white p-1 block w-fit'>
                  <Image
                    src={projectData?.icon || '/images/project-card/logo.svg'}
                    alt=''
                    width={50}
                    height={50}
                  />
                </div>
                <div className='flex flex-col text-white gap-2'></div>
              </div>
            </div>

            <p className='text-[#4F576A] font-redHatText leading-6'>
              {projectData?.teaser}
            </p>

            <Link
              target='_blank'
              href={`${config.SCAN_URL}/address/${projectData?.abc?.projectAddress}`}
            >
              <div className='w-full p-[10px_16px] shadow-tabShadow rounded-3xl flex justify-center font-redHatText'>
                <span className='flex gap-4 text-[#5326EC] font-bold'>
                  Project Contract Address
                  <IconViewTransaction color='#5326EC' />
                </span>
              </div>{' '}
            </Link>
            <div className='flex justify-center gap-4'>
              <Link target='_blank' href={`/project/${projectData?.slug}`}>
                <div className='w-full p-[10px_16px]  shadow-tabShadow rounded-3xl flex justify-center font-redHatText'>
                  <span className='flex gap-4 text-[#5326EC] font-bold items-center'>
                    View Project
                    <IconViewTransaction color='#5326EC' />
                  </span>
                </div>{' '}
              </Link>
              <div onClick={handleShare} className='cursor-pointer'>
                <div className='w-full p-[10px_16px]  shadow-tabShadow rounded-3xl flex justify-center font-redHatText'>
                  <span className='flex gap-4 text-[#5326EC] font-bold items-center'>
                    Share your project
                    <IconShare color='#5326EC' size={24} />
                  </span>
                </div>
              </div>{' '}
              <ShareProjectModal
                isOpen={isShareModalOpen}
                onClose={closeShareModal}
                showCloseButton={true}
                projectSlug={projectData?.slug || ''}
              />
            </div>
          </div>

          {/* Project Stats */}

          <div className='flex flex-col  w-full lg:w-1/2 gap-4 font-redHatText'>
            <div className='flex justify-between border-b pb-4'>
              <h2 className='text-[#4F576A] font-medium leading-6 '>
                Project status
              </h2>
              <div className='flex items-center gap-1 border p-1 rounded-2xl'>
                <div className='bg-[#37B4A9] w-[5px] h-[5px] rounded-full'></div>

                <span className='text-xs font-medium text-[#37B4A9]'>
                  Active project
                </span>
              </div>
            </div>
            {activeRoundDetails && (
              <>
                <div className='flex gap-1 items-center'>
                  <img
                    className='w-6 h-6 rounded-full'
                    src={getIpfsAddress(
                      projectData?.abc?.icon! ||
                        'Qmeb6CzCBkyEkAhjrw5G9GShpKiVjUDaU8F3Xnf5bPHtm4',
                    )}
                  />
                  {projectData?.abc?.tokenTicker} range
                  <div className='relative group'>
                    <IconTokenSchedule />
                    <div className='absolute w-[200px] z-50 mb-2 left-[-60px] hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2'>
                      The mint value of the ABC token will be within this range,
                      based on the amount of POL this project receives.
                    </div>
                  </div>
                </div>
                <div className='flex justify-between gap-8 font-redHatText items-center py-2'>
                  <div className='p-2 w-[80%] rounded-lg bg-[#F7F7F9] text-[#1D1E1F] font-medium flex  items-center gap-1'>
                    {tokenPriceRange.min.toFixed(2)} -{' '}
                    {tokenPriceRange.max.toFixed(2)}
                    <span className='text-gray-400 text-xs'>POL</span>
                  </div>
                  <div className='w-[20%] text-gray-400 text-right font-medium'>
                    ~${' '}
                    {Number(POLPrice) &&
                      formatNumber(Number(POLPrice) * tokenPriceRange.min)}{' '}
                    -{' '}
                    {Number(POLPrice) &&
                      formatNumber(Number(POLPrice) * tokenPriceRange.max)}
                  </div>
                </div>
              </>
            )}
            <div className='flex  flex-col gap-2 md:flex-row justify-between pb-4 pt-2 border-b'>
              <div className='flex gap-2'>
                <IconTotalSupply />
                <span className='text-[#4F576A] font-medium'>Total supply</span>
              </div>
              <span className='text-[#1D1E1F] font-medium'>
                {projectData?.abc?.totalSupply
                  ? formatAmount(projectData?.abc?.totalSupply)
                  : '---'}{' '}
                {projectData?.abc?.tokenTicker}
              </span>
            </div>

            <div className='flex justify-between py-2'>
              <div className='flex gap-2'>
                <IconTotalDonars />
                <span className='text-[#4F576A] font-medium'>
                  Total supporters
                </span>
              </div>
              <span className='text-[#1D1E1F] font-medium'>{uniqueDonars}</span>
            </div>

            <div className='flex  flex-col md:flex-row gap-2 justify-between py-2'>
              <div className='flex gap-2'>
                <IconTokenMinted />
                <span className='text-[#4F576A] font-medium'>
                  Tokens minted to supporters
                </span>
              </div>
              <span className='text-[#1D1E1F] font-medium'>
                {formatAmount(projectData?.abc?.mintedAmount || 0)}{' '}
                {projectData?.abc?.tokenTicker}
              </span>
            </div>

            <div className='flex  flex-col gap-2 md:flex-row justify-between pb-4 pt-2 border-b '>
              <div className='flex gap-2 items-center'>
                <IconTributesReceived />
                <span className='text-[#4F576A] font-medium'>
                  Tributes received
                </span>
                <div className='relative group'>
                  <IconTokenSchedule />
                  <div className='absolute w-[200px] z-50 mb-2 left-[-60px] hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2'>
                    These are the tributes your project receives from the mint
                    and burn transactions on the ABC.
                  </div>
                </div>
              </div>
              <div className='flex gap-1'>
                <span className='font-medium text-[#1D1E1F]'>
                  {formatAmount(tributeReceived)} POL
                </span>
                <span className='font-medium text-[#82899A]'>
                  ~ ${' '}
                  {formatAmount(
                    Math.round(tributeReceived * Number(POLPrice) * 100) / 100,
                  )}
                </span>
              </div>
            </div>

            <div className='flex  flex-col gap-2 md:flex-row justify-between pb-4 pt-2 border-b '>
              <div className='flex gap-2 items-center'>
                <IconUnlock />
                <span className='text-[#4F576A] font-medium'>
                  Tributes available to claim
                </span>
                <div className='relative group'>
                  <IconTokenSchedule />
                  <div className='absolute w-[200px] z-50 mb-2 left-[-60px] hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2'>
                    These are the tributes your project receives from the mint
                    and burn transactions on the ABC.
                  </div>
                </div>
              </div>
              <div className='flex gap-1'>
                <span className='font-medium text-[#1D1E1F]'>
                  {formatAmount(tributeReceived)} POL
                </span>
                <span className='font-medium text-[#82899A]'>
                  ~ ${' '}
                  {formatAmount(
                    Math.round(tributeReceived * Number(POLPrice) * 100) / 100,
                  )}
                </span>
              </div>
            </div>

            <Button color={ButtonColor.Giv} className='flex justify-center'>
              Claim Tributes
            </Button>
          </div>
        </div>
      </div>

      {/* List of Supports */}

      <div className='bg-white flex p-6 flex-col gap-8 rounded-xl my-8'>
        <div className='border-b pb-4'>
          <h1 className='text-[#1D1E1F] font-bold text-2xl'>
            Contributions summary
          </h1>
        </div>

        <div className='flex flex-col gap-4'>
          {(filteredRoundData.roundType === 'QfRound' ||
            filteredRoundData.qfRoundEnded) && (
            <RoundCollectHeader
              type={'qacc'}
              info={filteredRoundData.activeRound}
              projectId={projectId}
            ></RoundCollectHeader>
          )}

          <div className='flex flex-col'>
            <RoundCollectHeader
              type={'ea'}
              info={filteredRoundData.lastRound}
              projectId={projectId}
              pastRoundNumber={filteredRoundData.pastRoundNumber}
            ></RoundCollectHeader>

            {showRoundCollected && filteredRoundData.pastRounds
              ? filteredRoundData.pastRounds.map((round, id) => (
                  <RoundCollectedInfo
                    key={id}
                    info={round}
                    projectId={projectId}
                    currentRound={filteredRoundData.activeRound === round}
                  />
                ))
              : null}
            <div
              className='bg-[#D7DDEA] w-full  justify-center mx-auto py-1 px-4 rounded-b-lg flex gap-1 cursor-pointer select-none'
              onClick={() => setShowRoundCollected(!showRoundCollected)}
            >
              {showRoundCollected ? 'Hide breakdown' : 'Early access breakdown'}
              {showRoundCollected ? (
                <IconChevronUp size={24} />
              ) : (
                <IconChevronDown size={24} />
              )}
            </div>
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
              {formatAmount(totalAmount)} POL
            </span>
            <span className='text-[#1D1E1F]  font-medium'>
              ~ ${' '}
              {formatAmount(
                Math.round(totalAmount * Number(POLPrice) * 100) / 100,
              )}
            </span>
          </div>
        </div>

        {/* Search Bar */}
        <div className='flex  flex-col md:flex-row gap-4 md:items-center'>
          <div className='md:w-[80%] '>
            <div className='relative'>
              <span className='absolute inset-y-0 left-0 flex items-center pl-3 pr-1 border-r my-4 '>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='16'
                  height='16'
                  viewBox='0 0 16 16'
                  fill='none'
                >
                  <path
                    d='M14 14L11.1 11.1M12.6667 7.33333C12.6667 10.2789 10.2789 12.6667 7.33333 12.6667C4.38781 12.6667 2 10.2789 2 7.33333C2 4.38781 4.38781 2 7.33333 2C10.2789 2 12.6667 4.38781 12.6667 7.33333Z'
                    stroke='#A5ADBF'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </span>
              <input
                type='text'
                className='pl-10 p-2 border h-[56px]  border-gray-300 rounded-lg w-full shadow-tabShadow'
                value={searchTerm}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder='Search for a supporter wallet address or a supporter name'
              />
            </div>
          </div>

          <div className='flex flex-col gap-4 font-redHatText md:w-[20%] cursor-pointer'>
            <div
              onClick={handleSearchClick}
              className='w-full px-6 py-4 shadow-baseShadow rounded-full  flex justify-center'
            >
              <span className='flex gap-4 text-[#5326EC]  font-bold items-center'>
                Search <IconSearch />
              </span>
            </div>
          </div>
        </div>

        <ProjectSupportTable
          projectId={projectId ?? ''}
          term={submittedSearchTerm}
        />
      </div>
    </div>
  );
};

export default MyProjects;
