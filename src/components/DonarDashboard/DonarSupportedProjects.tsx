import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ethers } from 'ethers';
import { useAccount } from 'wagmi';
import { getIpfsAddress } from '@/helpers/image';
import { IconViewTransaction } from '../Icons/IconViewTransaction';
import { IconTotalSupply } from '../Icons/IconTotalSupply';
import { IconTotalDonars } from '../Icons/IconTotalDonars';
import { IconTotalDonations } from '../Icons/IconTotalDonations';
import { formatAmount } from '@/helpers/donation';
import { IconTokenSchedule } from '../Icons/IconTokenSchedule';
import { IconMinted } from '../Icons/IconMinted';
import { IconAvailableTokens } from '../Icons/IconAvailableTokens';
import { Button, ButtonColor } from '../Button';
import { IconBreakdownArrow } from '../Icons/IconBreakdownArrow';

import { useFetchActiveRoundDetails } from '@/hooks/useFetchActiveRoundDetails';
import { calculateCapAmount } from '@/helpers/round';
import { useCheckSafeAccount } from '@/hooks/useCheckSafeAccount';
import { EProjectSocialMediaType, IProject } from '@/types/project.type';
import { IconShare } from '../Icons/IconShare';
import { ShareProjectModal } from '../Modals/ShareProjectModal';
import { useTokenSupplyDetails } from '@/hooks/useTokenSupplyDetails';
import { useFetchPOLPriceSquid } from '@/hooks/useFetchPOLPriceSquid';
import {
  useClaimRewards,
  useReleasableForStream,
} from '@/hooks/useClaimRewards';
import { useGetCurrentTokenPrice } from '@/hooks/useGetCurrentTokenPrice';
import config from '@/config/configuration';
import { getPoolAddressByPair } from '@/helpers/getListedTokenData';
import { TradeOptionsModal } from '../Modals/TradeOptionsModal';
import { BondingCurveModal } from '../BondingCurve/BondingCurveModal';

const DonarSupportedProjects = ({
  projectId,
  project,
  uniqueDonors,
  totalClaimableRewardTokens,
  totalContributions,
  projectDonations,
  totalContribution,
  totalRewardTokens,
  onClickBreakdown,
}: {
  projectId: string;
  project: IProject;
  uniqueDonors: number;
  totalClaimableRewardTokens: number | null;
  totalContributions: number;
  projectDonations: number;
  totalContribution: number;
  totalRewardTokens: number;
  onClickBreakdown: () => void;
}) => {
  const { address } = useAccount();
  const { data: POLPrice } = useFetchPOLPriceSquid();
  const { data: activeRoundDetails } = useFetchActiveRoundDetails();
  const [maxPOLCap, setMaxPOLCap] = useState(0);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isTokenListed, setIsTokenListed] = useState(false);
  const [isTradeModalOpen, setIsTradeModalOpen] = useState(false);
  const [isBondingCurveModalOpen, setIsBondingCurveModalOpen] = useState(false);
  const openShareModal = () => setIsShareModalOpen(true);
  const closeShareModal = () => setIsShareModalOpen(false);
  const { issuanceTokenAddress } = project?.abc || {};
  const { currentTokenPrice } = useGetCurrentTokenPrice(issuanceTokenAddress);

  useEffect(() => {
    const updatePOLCap = async () => {
      if (activeRoundDetails) {
        const { capAmount, totalDonationAmountInRound }: any =
          await calculateCapAmount(activeRoundDetails, Number(projectId));

        setMaxPOLCap(capAmount);
      }
    };

    updatePOLCap();
  }, [activeRoundDetails, projectId, maxPOLCap]);

  useEffect(() => {
    const fetchPoolAddress = async () => {
      if (project?.abc?.issuanceTokenAddress) {
        const { price, isListed } = await getPoolAddressByPair(
          project.abc.issuanceTokenAddress,
          config.WPOL_TOKEN_ADDRESS,
        );

        setIsTokenListed(isListed);
      }
    };

    fetchPoolAddress();
  }, [project?.abc?.issuanceTokenAddress]);

  const { data: isSafeAccount } = useCheckSafeAccount();

  const { data: tokenDetails } = useTokenSupplyDetails(
    project?.abc?.fundingManagerAddress!,
  );

  // const tokenPriceRangeStatus = useTokenPriceRangeStatus({
  //   project,
  //   allRounds,
  // });
  // const tokenPriceRange = useTokenPriceRange({
  //   contributionLimit: maxPOLCap,
  //   contractAddress: project.abc?.fundingManagerAddress || '',
  // });

  const handleShare = () => {
    openShareModal();
  };

  const website = project.socialMedia?.find(
    social => social.type === EProjectSocialMediaType.WEBSITE,
  )?.link;

  const releasable = useReleasableForStream({
    paymentProcessorAddress: project?.abc?.paymentProcessorAddress!,
    client: project?.abc?.paymentRouterAddress!,
    receiver: address,
    streamIds: [
      BigInt(1),
      BigInt(2),
      BigInt(3),
      BigInt(4),
      BigInt(5),
      BigInt(6),
    ],
  });

  const claimableReward = releasable.data
    ? Number(ethers.formatUnits(releasable.data, 18)) // Format BigInt data to decimal
    : 0;
  const isTokenClaimable = releasable.data !== undefined && claimableReward > 0;
  const { claim } = useClaimRewards({
    paymentProcessorAddress: project?.abc?.paymentProcessorAddress!,
    paymentRouterAddress: project?.abc?.paymentRouterAddress!,
    onSuccess: () => {
      // do after 5 seconds
      // setTimeout(() => {
      //   claimedTributesAndMintedTokenAmounts.refetch();
      // }, 5000);
      // projectCollateralFeeCollected.refetch();

      releasable.refetch();

      console.log('Successly Clamied Tokens');
    },
  });
  return (
    <div className='p-6 flex lg:flex-row flex-col gap-14 bg-white rounded-xl'>
      {/* Project Details */}
      <div className='flex flex-col gap-4 w-full lg:w-1/2'>
        {/* Project Banner */}
        <div
          className='w-full h-[230px] bg-cover bg-center rounded-3xl relative'
          style={{
            backgroundImage: `url('${project.image}')`,
          }}
        >
          <div className=' flex flex-col absolute  bottom-[24px] left-[24px] md:bottom-[24px] md:left-[24px] gap-2'>
            <div className='border rounded-md bg-white p-1 block w-fit'>
              <img
                className='w-6 h-6 rounded-full'
                src={getIpfsAddress(
                  project.abc?.icon ||
                    'Qmeb6CzCBkyEkAhjrw5G9GShpKiVjUDaU8F3Xnf5bPHtm4',
                )}
              />
            </div>
            <div className='flex flex-col text-white gap-2'>
              <h1 className='text-2xl md:text-[41px] font-bold leading-10'>
                {project.title}
              </h1>
            </div>
          </div>
        </div>
        <p className='text-gray-500 text-sm font-redHatText'>
          {project.descriptionSummary}
        </p>
        <div className='flex flex-wrap gap-2'>
          {project?.socialMedia
            ?.filter(sm => sm.type !== EProjectSocialMediaType.WEBSITE)
            .map((social: any) => {
              return (
                <Link
                  key={social.link}
                  href={social.link}
                  target='_blank'
                  className='p-2 rounded-lg border-gray-200 border'
                >
                  <Image
                    src={`/images/icons/social/${social.type.toLowerCase()}.svg`}
                    alt={`${social.type} icon`}
                    width={24}
                    height={24}
                  />
                </Link>
              );
            })}
          <div
            onClick={handleShare}
            className='cursor-pointer p-2 rounded-lg border-gray-200 border'
          >
            <IconShare size={24} color='black' />
          </div>
        </div>
        <div className='flex flex-col gap-4 font-redHatText'>
          <div className='flex gap-4 flex-wrap'>
            {website && (
              <Link
                target='_blank'
                href={website}
                className='w-full py-2 px-4 border border-giv-500 rounded-3xl flex justify-center flex-1'
              >
                <div>
                  <span className='flex gap-4 text-giv-500 font-bold'>
                    Website
                    <IconViewTransaction color='#5326EC' />
                  </span>
                </div>{' '}
              </Link>
            )}
            <Link
              target='_blank'
              href={`https://polygonscan.com/address/${project?.abc?.issuanceTokenAddress}`}
              className='w-full py-2 px-4 border border-giv-500 rounded-3xl flex justify-center flex-1'
            >
              <div>
                <span className='flex gap-4 text-giv-500 font-bold text-nowrap'>
                  Contract Address
                  <IconViewTransaction color='#5326EC' />
                </span>
              </div>{' '}
            </Link>
          </div>
          <div className='flex justify-center gap-4 flex-wrap'>
            <Link
              target='_blank'
              href={`/project/${project?.slug}`}
              className=' py-2 px-4 border border-giv-500 rounded-3xl flex justify-center flex-1'
            >
              <span className='flex gap-4 text-[#5326EC] font-bold items-center text-nowrap'>
                View Project
                <IconViewTransaction color='#5326EC' />
              </span>
            </Link>
            {isTokenListed &&
              project.abc?.tokenTicker &&
              project.abc?.issuanceTokenAddress &&
              project.abc?.fundingManagerAddress && (
                <div
                  className='py-2 px-4 border border-giv-500 rounded-3xl flex justify-center flex-1 cursor-pointer'
                  onClick={e => {
                    e.stopPropagation();
                    setIsTradeModalOpen(true);
                  }}
                >
                  <span className='flex gap-4 text-[#5326EC] font-bold items-center text-nowrap'>
                    Trade ${project.abc.tokenTicker}
                  </span>
                </div>
              )}
            <ShareProjectModal
              isOpen={isShareModalOpen}
              onClose={closeShareModal}
              showCloseButton={true}
              projectSlug={project?.slug || ''}
              projectTitle={project?.title}
              tokenTicker={project?.abc?.tokenTicker}
              projectData={project}
            />
          </div>

          <div className='flex justify-between p-2'>
            <div className='flex gap-2'>
              <IconTotalSupply size={24} />
              <span className='text-[#4F576A] font-medium font-redHatText'>
                Total Supply
              </span>
            </div>
            <span className='font-medium text-[#1D1E1F]'>
              {formatAmount(Number(tokenDetails?.issuance_supply)) || '---'}{' '}
              {project.abc?.tokenTicker}
            </span>
          </div>

          <div className='flex justify-between p-2'>
            <div className='flex gap-2'>
              <IconTotalDonars size={24} />
              <span className='text-[#4F576A] font-medium  font-redHatText'>
                Total supporters
              </span>
            </div>
            <span className='font-medium text-[#1D1E1F]'>{uniqueDonors}</span>
          </div>

          <div className='flex flex-col md:flex-row gap-3 justify-between p-[16px_8px] bg-[#F7F7F9] rounded-md'>
            <div className='flex gap-2'>
              <IconTotalDonations size={24} />
              <span className='font-medium text-[#1D1E1F]'>Total received</span>
            </div>
            <div className='flex gap-2'>
              {/* <span className='font-medium text-[#1D1E1F]'>
                ~ $ {formatAmount(totalContributions * POLPrice) || 0}
              </span> */}
              <span className='font-medium text-[#82899A]'>
                {formatAmount(totalContributions) || 0} POL{' '}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Project Claim and Reward */}
      <div className='flex flex-col gap-4 w-full lg:w-1/2  font-redHatText'>
        {/* {activeRoundDetails && (
          <>
            <div className='flex items-center gap-2'>
              <img
                className='w-6 h-6 rounded-full'
                src={getIpfsAddress(
                  project.abc?.icon ||
                    'Qmeb6CzCBkyEkAhjrw5G9GShpKiVjUDaU8F3Xnf5bPHtm4',
                )}
              />
              <span className='text-[#4F576A] font-medium'>
                {project.abc?.tokenTicker} range
                {tokenPriceRangeStatus.isSuccess &&
                tokenPriceRangeStatus.data?.isPriceUpToDate
                  ? ' '
                  : ' (Calculating) '}
              </span>
              <div className='relative group'>
                <IconTokenSchedule />
                <div className='absolute w-[200px] z-50 mb-2 left-[-60px] hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2'>
                  The mint value of the ABC token will be within this range,
                  based on the amount of POL this project receives.
                </div>
              </div>
            </div>

            <div className='flex justify-between text-[#1D1E1F] font-medium'>
              {tokenPriceRangeStatus.isSuccess &&
              tokenPriceRangeStatus.data?.isPriceUpToDate ? (
                <>
                  <h2 className='flex gap-1 items-center'>
                    {tokenPriceRange.min.toFixed(2)} -{' '}
                    {tokenPriceRange.max.toFixed(2)}
                    <span className='text-[#4F576A] text-xs pb-1'>POL</span>
                  </h2>
                  <h2 className='text-[#4F576A]'>
                    ~${' '}
                    {Number(POLPrice) &&
                      formatNumber(Number(POLPrice) * tokenPriceRange.min)}{' '}
                    -
                    {Number(POLPrice) &&
                      formatNumber(Number(POLPrice) * tokenPriceRange.max)}
                  </h2>
                </>
              ) : (
                <>
                  <div className='p-2 w-[80%] rounded-lg bg-[#F7F7F9] text-[#1D1E1F] font-medium flex items-center gap-1'>
                    ---
                    <span className='text-gray-400 text-xs'>POL</span>
                  </div>
                  <div className='w-[20%] text-gray-400 text-right font-medium'>
                    ~$ ---
                  </div>
                </>
              )}
            </div>
          </>
        )} */}
        {/* <hr /> */}

        {!isSafeAccount && (
          <>
            <h1 className='flex p-[4px_16px] bg-[#EBECF2] w-fit rounded-md'>
              You supported this project{' '}
              {projectDonations > 1 && (
                <span className='font-medium'>
                  &nbsp;{projectDonations}&nbsp;
                </span>
              )}
              {projectDonations === 1 ? (
                <span className='font-bold'>&nbsp;once</span>
              ) : (
                'times'
              )}
              .
            </h1>
            <div className='flex justify-between p-2 bg-[#F7F7F9] rounded-lg'>
              <div className='flex gap-2'>
                <IconTotalDonations size={24} />
                <span className='text-[#4F576A] font-medium '>
                  Your contribution
                </span>
              </div>
              <span className='font-medium text-[#1D1E1F]'>
                {formatAmount(totalContribution)} POL
              </span>
            </div>
          </>
        )}

        {totalRewardTokens > 0 ? (
          <>
            <div className='flex justify-between p-2'>
              <div className='flex gap-2'>
                <IconMinted size={24} />
                <span className='text-[#4F576A] font-medium '>
                  Your project tokens{' '}
                </span>
              </div>
              <div className='flex gap-1'>
                <span className='font-medium text-[#1D1E1F]'>
                  {formatAmount(totalRewardTokens) || '---'}{' '}
                  {project.abc?.tokenTicker}
                </span>
                <span className='font-medium text-[#82899A]'>
                  ~{' '}
                  {formatAmount(totalRewardTokens * (currentTokenPrice || 0)) ||
                    '---'}{' '}
                  POL
                </span>
              </div>
            </div>

            <div className='flex flex-col md:flex-row gap-3 justify-between p-[16px_8px] bg-[#EBECF2] rounded-md'>
              <div className='flex gap-2'>
                <IconAvailableTokens size={24} />
                <span className='font-medium text-[#1D1E1F]'>
                  Available to claim
                </span>
                <div className='relative group'>
                  <IconTokenSchedule />
                  <div className='absolute w-[200px] z-50 mb-2 left-[-60px] hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2'>
                    The tokens have been unlocked and are now available for you
                    to claim. Once claimed, they will be transferred to your
                    wallet.
                  </div>
                </div>
              </div>
              <div className='flex gap-1 font-medium text-[#1D1E1F]'>
                <span>
                  {totalClaimableRewardTokens !== null
                    ? `${formatAmount(Number(claimableReward))} ${project.abc?.tokenTicker || ''}`
                    : '---'}
                </span>
                <span className='text-[#82899A]'>
                  ~{' '}
                  {totalClaimableRewardTokens !== null
                    ? formatAmount(
                        Number(claimableReward) * (currentTokenPrice || 0),
                      )
                    : '---'}{' '}
                  POL
                </span>
              </div>
            </div>
          </>
        ) : (
          ''
        )}

        {/* Claim Rewards */}
        <Button
          color={isTokenClaimable ? ButtonColor.Giv : ButtonColor.Gray}
          className='flex justify-center rounded-xl'
          disabled={!isTokenClaimable}
          loading={claim.isPending}
          onClick={() => claim.mutateAsync()}
        >
          Claim Tokens
        </Button>
        <Link href={`/dashboard?tab=contributions&projectId=${projectId}`}>
          <Button
            color={ButtonColor.Base}
            className='flex justify-center w-full border border-giv-500 rounded-xl'
            onClick={onClickBreakdown}
          >
            Tokens & Contributions Breakdown <IconBreakdownArrow />
          </Button>
        </Link>

        {/* Trade Options Modal */}
        <TradeOptionsModal
          isOpen={isTradeModalOpen}
          onClose={() => setIsTradeModalOpen(false)}
          tokenTicker={project.abc?.tokenTicker || ''}
          quickswapUrl={`https://dapp.quickswap.exchange/swap/best/ETH/${project.abc?.issuanceTokenAddress}`}
          onBondingCurve={() => {
            setIsTradeModalOpen(false);
            setIsBondingCurveModalOpen(true);
          }}
        />

        {/* Bonding Curve Modal */}
        <BondingCurveModal
          isOpen={isBondingCurveModalOpen}
          onClose={() => setIsBondingCurveModalOpen(false)}
          contractAddress={project.abc?.fundingManagerAddress || ''}
          tokenAddress={project.abc?.issuanceTokenAddress || ''}
          tokenTicker={project.abc?.tokenTicker || ''}
        />
      </div>
    </div>
  );
};

export default DonarSupportedProjects;
