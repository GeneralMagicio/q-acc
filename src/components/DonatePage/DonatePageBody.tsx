'use client';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import {
  useAccount,
  useWaitForTransactionReceipt,
  useSwitchChain,
} from 'wagmi';
import { useRouter } from 'next/navigation';
import { createPublicClient, http } from 'viem';
import Link from 'next/link';
import { LiFiWidget, WidgetDrawer } from '@lifi/widget';
import round from 'lodash/round';
import floor from 'lodash/floor';

import { IconRefresh } from '../Icons/IconRefresh';
import { IconMatic } from '../Icons/IconMatic';
import { IconTokenSchedule } from '../Icons/IconTokenSchedule';
import { IconShare } from '../Icons/IconShare';

import DonateSuccessPage from './DonateSuccessPage';
import { Button, ButtonColor } from '../Button';

import { fetchTokenDetails, handleErc20Transfer } from '@/helpers/token';
import config from '@/config/configuration';
import {
  createDraftDonation,
  saveDonations,
} from '@/services/donation.services';
import { useDonateContext } from '@/context/donation.context';
import { getIpfsAddress } from '@/helpers/image';
import { formatAmount, formatNumber } from '@/helpers/donation';
import { usePrivado } from '@/hooks/usePrivado';
import { useFetchUser } from '@/hooks/useFetchUser';
import FlashMessage from '../FlashMessage';
import ProgressBar from '../ProgressBar';
import { IconTotalSupply } from '../Icons/IconTotalSupply';
import { useUpdateAcceptedTerms } from '@/hooks/useUpdateAcceptedTerms';
import { useFetchTokenPrice } from '@/hooks/useFetchTokenPrice';
import {
  useTokenPriceRange,
  useTokenPriceRangeStatus,
} from '@/services/tokenPrice.service';
import { useFetchActiveRoundDetails } from '@/hooks/useFetchActiveRoundDetails';
import { fetchProjectUserDonationCap } from '@/services/user.service';
import { calculateCapAmount } from '@/helpers/round';
import { IconAlertTriangle } from '../Icons/IconAlertTriangle';
import { IconArrowRight } from '../Icons/IconArrowRight';
import { ShareProjectModal } from '../Modals/ShareProjectModal';
import { useFetchAllRound } from '@/hooks/useFetchAllRound';
import { EligibilityCheckToast } from './EligibilityCheckToast';
import { GitcoinEligibilityModal } from '../Modals/GitcoinEligibilityModal';

interface ITokenSchedule {
  message: string;
  toolTip: string;
}
interface DonatePageBodyProps {
  setIsConfirming: (isConfirming: boolean) => void;
}

export enum DonationStatus {
  Verified = 'verified',
  Pending = 'pending',
}
const PercentageButton = ({
  percentage,
  selectedPercentage,
  handleClick,
}: any) => {
  const isSelected = selectedPercentage === percentage;

  return (
    <span
      onClick={() => handleClick(percentage)}
      className={`flex justify-center px-4 py-2 border text-sm rounded-3xl cursor-pointer ${
        isSelected
          ? 'bg-[#E7E1FF] text-[#5326EC] border-[#5326EC]'
          : 'bg-[#F6F3FF] text-[#5326EC]'
      }`}
    >
      {percentage === 100 ? 'MAX' : `${percentage}%`}
    </span>
  );
};

const DonatePageBody: React.FC<DonatePageBodyProps> = ({ setIsConfirming }) => {
  const { address, isConnected } = useAccount();
  const { chain } = useAccount();
  const { switchChain } = useSwitchChain();
  const { data: user } = useFetchUser();
  const [inputAmount, setInputAmount] = useState<string>('');
  const [tokenDetails, setTokenDetails] = useState<any>();
  const { data: POLPrice } = useFetchTokenPrice();

  const [terms, setTerms] = useState<boolean>(user?.acceptedToS || false);
  const [anoynmous, setAnoynmous] = useState<boolean>(false);
  const [hash, setHash] = useState<`0x${string}` | undefined>(undefined);
  const [hasSavedDonation, setHasSavedDonation] = useState<boolean>(false);
  const [donateDisabled, setDonateDisabled] = useState(true);
  const [flashMessage, setFlashMessage] = useState('');
  const [userDonationCap, setUserDonationCap] = useState<number>(0);
  const [inputErrorMessage, setInputErrorMessage] = useState<string | null>(
    null,
  );
  const [inputBalanceError, setInputBalanceError] = useState<boolean>(false);

  const drawerRef = useRef<WidgetDrawer>(null);

  let { isVerified } = usePrivado();

  const {
    projectData,
    totalAmount: totalPOLDonated,
    uniqueDonars,
  } = useDonateContext();

  const { data: activeRoundDetails } = useFetchActiveRoundDetails();

  const [progress, setProgress] = useState(0);
  const [maxPOLCap, setMaxPOLCap] = useState(0);
  const [remainingDonationAmount, setRemainingDonationAmount] = useState(0);

  const { mutate: updateAcceptedTerms } = useUpdateAcceptedTerms();

  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const openShareModal = () => setIsShareModalOpen(true);
  const closeShareModal = () => setIsShareModalOpen(false);

  const [showGitcoinModal, setShowGitcoinModal] = useState(false);
  const [donationId, setDonationId] = useState<number>(0);
  const router = useRouter();

  const handleShare = () => {
    openShareModal();
  };

  useEffect(() => {
    const getDonationCap: any = async () => {
      if (projectData?.id) {
        const cap = await fetchProjectUserDonationCap(Number(projectData?.id));
        const res = remainingDonationAmount / 2 - 1;
        if (progress >= 90) {
          console.log('Res', res, progress);
          setUserDonationCap(Math.min(res, Number(cap)));
        } else {
          setUserDonationCap(floor(Number(cap)) || 0);
        }
      }
    };

    const updatePOLCap = async () => {
      const { capAmount, totalDonationAmountInRound }: any =
        await calculateCapAmount(activeRoundDetails, Number(projectData.id));

      setMaxPOLCap(capAmount);
      setRemainingDonationAmount(capAmount - totalDonationAmountInRound);
      console.log('Remaining Donation Limit', remainingDonationAmount);
      let tempprogress = 0;
      if (maxPOLCap > 0) {
        tempprogress = round((totalDonationAmountInRound / capAmount) * 100, 2); // Round to 2 decimal places
        setProgress(tempprogress);
      }
    };

    if (projectData) {
      getDonationCap();
      updatePOLCap();
    }
  }, [
    projectData,
    activeRoundDetails,
    remainingDonationAmount,
    maxPOLCap,
    progress,
  ]);

  // LIFI LOGIC
  const toggleWidget = () => {
    drawerRef.current?.toggleDrawer();
  };

  // New token price logic

  const tokenPriceRange = useTokenPriceRange({
    contributionLimit: maxPOLCap,
    contractAddress: projectData?.abc?.fundingManagerAddress || '',
  });

  const { data: allRounds } = useFetchAllRound();
  const tokenPriceRangeStatus = useTokenPriceRangeStatus({
    project: projectData,
    allRounds,
  });

  const [selectedPercentage, setSelectedPercentage] = useState(0);

  const [tokenSchedule, setTokenSchedule] = useState<ITokenSchedule>({
    message:
      'Tokens are locked for 1 year with a 6 month cliff. This means that after 6 months, tokens are locked for 6 months and unlocked in a 6 month stream.',
    toolTip:
      'Tokens are locked for a period of time followed by an unlock stream over another period of time. The cliff is when tokens begin to unlock, in a stream, until the last day of the schedule.',
  });

  const client = createPublicClient({
    chain: chain,
    transport: http(config.NETWORK_RPC_ADDRESS),
  });
  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    status,
  } = useWaitForTransactionReceipt({
    hash,
  });
  useEffect(() => {
    if (hash !== undefined && donationId === 0) {
      setIsConfirming(true);
    } else {
      setIsConfirming(false);
    }
  }, [isConfirming, setIsConfirming, hash, donationId]);

  useEffect(() => {
    const handleBeforeUnload = (event: any) => {
      if (isConfirming) {
        event.preventDefault();

        event.returnValue =
          'Transaction is in progress. Are you sure you want to leave?';
        return 'Transaction is in progress. Are you sure you want to leave?';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isConfirming, donationId]);

  const tokenAddress = config.ERC_TOKEN_ADDRESS;

  useEffect(() => {
    getTokenDetails();
  }, [address, tokenAddress, chain]);

  // if user allready accepted terms and conditions set it to true
  useEffect(() => {
    if (user && user.acceptedToS) {
      setTerms(true);
    }
  }, [user]);

  useEffect(() => {
    // Update donateDisabled based on conditions
    if (
      !terms ||
      !isConnected ||
      !(
        parseFloat(inputAmount) >= 5 &&
        parseFloat(inputAmount) <= userDonationCap
      ) ||
      parseFloat(inputAmount) > remainingDonationAmount ||
      parseFloat(inputAmount) > tokenDetails?.formattedBalance
    ) {
      setDonateDisabled(true);
    } else {
      setDonateDisabled(false);
    }
  }, [terms, isConnected, inputAmount, userDonationCap]);

  useEffect(() => {
    if (activeRoundDetails?.__typename === 'EarlyAccessRound') {
      const message =
        'Tokens are locked for 2 years with a 1-year cliff. This means that after 1 year, tokens will unlock in a stream over the following 1 year.';
      const toolTip =
        'Tokens are locked for a period of time. The cliff is when tokens begin to unlock, in a stream, until the last day of the schedule.';

      setTokenSchedule({ message, toolTip });
    }
  }, []);

  useEffect(() => {
    if (isConfirmed && !hasSavedDonation) {
      const token = config.ERC_TOKEN_SYMBOL;

      handleSaveDonation({
        projectId: parseInt(projectData?.id),
        transactionNetworkId: chain?.id,
        amount: parseFloat(inputAmount),
        token,
        transactionId: hash,
        tokenAddress,
      });

      setHasSavedDonation(true);
    }
  }, [isConfirmed, hasSavedDonation]);

  const getTokenDetails = async () => {
    if (!address) return;
    const data = await fetchTokenDetails({
      tokenAddress,
      address,
      client,
    });
    console.log('Data', data, chain);
    setTokenDetails(data);
  };

  const handleSaveDonation = async ({
    projectId,
    transactionNetworkId,
    amount,
    token,
    transactionId,
    tokenAddress,
  }: any) => {
    try {
      const data = await saveDonations(
        projectId,
        transactionNetworkId,
        amount,
        token,
        transactionId,
        tokenAddress,
        anoynmous,
      );
      setDonationId(Number(data));
    } catch (error) {
      console.log('Save donation error', error);
      setFlashMessage('Error saving  donation : ' + error);
      setHash(undefined);
      setHasSavedDonation(false);
      setDonateDisabled(false);
    }
  };

  const handleDonate = async () => {
    setDonateDisabled(true);
    try {
      await createDraftDonation(
        parseInt(projectData?.id),
        chain?.id!,
        parseFloat(inputAmount),
        config.ERC_TOKEN_SYMBOL,
        projectData?.addresses[0].address,
        tokenAddress,
      );

      const hash = await handleErc20Transfer({
        inputAmount,
        tokenAddress,
        projectAddress: projectData?.addresses[0].address,
      });

      setHash(hash);
    } catch (ContractFunctionExecutionError) {
      setFlashMessage('Error creating donation');
      console.log(ContractFunctionExecutionError);
      setDonateDisabled(false);
    }
  };

  const handleDonateClick = () => {
    console.log(parseFloat(inputAmount));
    const _usdAmount =
      Number(activeRoundDetails?.tokenPrice || 1) * parseFloat(inputAmount);
    if (_usdAmount <= 1000) {
      setShowGitcoinModal(true);
      return;
    }
    if (chain?.id !== 1101) {
      {
        switchChain({ chainId: 1101 });
      }
      console.log('chain', chain?.id);
      setFlashMessage('Wrong Network ! Switching  to Polygon Zkevm ');
      return;
    }
    // if (!isVerified) {
    //   openPrivadoModal();
    //   console.log('User is not verified with Privado ID');
    //   return;
    // }

    if (parseFloat(inputAmount) < 5 || isNaN(parseFloat(inputAmount))) {
      console.log('The minimum donation amount is 5.');
      return;
    }
    if (parseFloat(inputAmount) > userDonationCap) {
      console.log('The donation amount exceeds the cap limit.');
      return;
    }
    if (!terms) {
      console.log('Please accept the terms and conditions.');
      return;
    }
    if (parseFloat(inputAmount) > remainingDonationAmount) {
      console.log('Input amount will exceed the round cap');
      return;
    }
    if (parseFloat(inputAmount) > tokenDetails.formattedBalance) {
      console.log('Input amount is more than available balance');
      return;
    }
    handleDonate();
  };

  const handleRefetch = () => {
    getTokenDetails();
    console.log('Refetched', parseFloat(tokenDetails.formattedBalance));
  };

  const handlePercentageClick = (percentage: number) => {
    setSelectedPercentage((prevSelected): any => {
      if (prevSelected === percentage) {
        setInputAmount('');
        setInputBalanceError(false);
        return null;
      } else {
        const amount = floor((userDonationCap * percentage) / 100);
        setInputAmount(amount.toString());
        if (amount > parseFloat(tokenDetails.formattedBalance)) {
          setInputBalanceError(true);
        } else {
          setInputBalanceError(false);
        }
        return percentage;
      }
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    const regex = /^\d*\.?\d{0,2}$/;

    if (regex.test(value)) {
      setInputAmount(value);
      const inputAmount = parseFloat(value);

      if (inputAmount < 5) {
        setInputErrorMessage('Minimum contribution: 5 POL');
      }
      // else if (inputAmount > userDonationCap) {
      //   setInputErrorMessage('Amount should be less than the remaining cap');
      // }
      else {
        setInputErrorMessage(null);
      }
      if (inputAmount > tokenDetails.formattedBalance) {
        setInputBalanceError(true);
      } else {
        setInputBalanceError(false);
      }
    }
  };

  // Handle Terms checkbox change event
  const handleAcceptTerms = (_event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = _event.target.checked;

    // Save that user accepted terms and conditions - ONLY ONCE
    if (!user?.acceptedToS && isChecked) {
      updateAcceptedTerms(true);
    }

    setTerms(isChecked);
  };

  if (isConfirmed && donationId) {
    return (
      <DonateSuccessPage
        transactionHash={hash}
        round={activeRoundDetails?.__typename}
        donationId={donationId}
        status={status}
      />
    );
  }

  if (progress >= 100) {
    router.push(`/project/${projectData.slug}`);
  }
  const percentages = [25, 50, 100];

  return (
    <div className='bg-[#F7F7F9] w-full my-10'>
      <GitcoinEligibilityModal
        isOpen={showGitcoinModal}
        onClose={() => setShowGitcoinModal(false)}
      />
      <div className='container w-full flex  flex-col lg:flex-row gap-10 '>
        <div className='p-6 lg:w-1/2 flex flex-col gap-8 bg-white rounded-2xl shadow-[0px 3px 20px 0px rgba(212, 218, 238, 0.40)] font-redHatText'>
          <EligibilityCheckToast />
          <div className='flex flex-col md:flex-row  font-redHatText gap-4'>
            <div className='flex  justify-between p-2 w-full md:w-2/3 bg-[#EBECF2]  rounded-lg text-[#1D1E1F] items-center'>
              <span className='flex gap-2 items-center  '>
                Your remaining cap
                <span className='font-medium text-[#4F576A]'>
                  {userDonationCap !== null && userDonationCap !== undefined
                    ? formatAmount(Math.floor(userDonationCap * 100) / 100)
                    : '---'}{' '}
                  POL
                </span>
              </span>

              <div className='relative group'>
                <IconTokenSchedule />
                <div className='absolute w-[200px] z-50 mb-2 left-[-60px] hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2'>
                  This is the amount of POL that you have remaining from the
                  individual cap for this round. It takes into account any
                  funding that you have previously sent in this round.
                </div>
              </div>
            </div>

            <div className='flex gap-2 items-center'>
              {percentages.map(percentage => (
                <PercentageButton
                  key={percentage}
                  percentage={percentage}
                  selectedPercentage={selectedPercentage}
                  handleClick={handlePercentageClick}
                />
              ))}
            </div>
          </div>
          {/* Input Box */}

          <div className='flex flex-col gap-2 font-redHatText'>
            <div className='border rounded-lg flex relative '>
              <div className='md:w-40 flex gap-4 p-4 border '>
                <IconMatic size={24} />
                <h1 className=' font-medium'>POL</h1>
              </div>
              <input
                onChange={handleInputChange}
                value={inputAmount}
                type='number'
                disabled={isConfirming}
                className='w-full  text-sm  md:text-base border rounded-lg  px-4'
                onWheel={(e: any) => e.target.blur()}
              />

              <span className='absolute text-sm  md:text-base top-0 right-0 h-full flex items-center pr-5 text-gray-400 pointer-events-none'>
                ~ ${' '}
                {inputAmount === ''
                  ? 0
                  : formatAmount(
                      round(
                        parseFloat(inputAmount) *
                          Number(activeRoundDetails?.tokenPrice || 1),
                      ),
                    )}
              </span>
            </div>
            {/* Avaliable token */}
            <div className='flex md:flex-row flex-col justify-between'>
              <div className='flex gap-1'>
                {/* <span className='text-sm'>Available: 85000 MATIC</span> */}
                <div
                  onClick={() => setInputAmount(tokenDetails?.formattedBalance)}
                  className={`cursor-pointer hover:underline ${inputBalanceError ? 'text-[#E6492D]' : 'text-black'}`}
                >
                  Available in your wallet:{' '}
                  {!tokenDetails
                    ? 'Loading...'
                    : `${formatAmount(Math.floor(tokenDetails?.formattedBalance * 100) / 100)} ${tokenDetails?.symbol}`}
                </div>

                <button onClick={handleRefetch}>
                  <IconRefresh size={16} />
                </button>
              </div>

              <div>
                {/* {inputErrorMessage && (
                  <span className='font-redHatText text-[#E6492D] flex gap-1 items-center'>
                    <IconAlertTriangle />
                    {inputErrorMessage}
                    Minimum contribution: 5 POL
                  </span>
                )} */}

                <h2
                  className={`font-redHatText  flex gap-1 items-center ${inputErrorMessage ? 'text-[#E6492D]' : 'text-[#303B72]'}`}
                >
                  {inputErrorMessage && <IconAlertTriangle />}
                  Minimum contribution:{' '}
                  <span
                    className={` font-medium ${inputErrorMessage ? 'text-[#E6492D]' : 'text-[#303B72]'}`}
                  >
                    5 POL
                  </span>
                </h2>
              </div>
            </div>
          </div>

          {/* LIFI */}

          <div className='px-4 py-2 bg-[#F7F7F9]  rounded-lg flex flex-col md:flex-row  justify-between font-redHatText items-center'>
            <div>
              <span className='text-[#4F576A] font-medium'>
                Need POL or ETH (for gas) ?
              </span>
            </div>

            <div className='flex gap-2 font-medium items-center'>
              <button
                className='px-4 py-1 bg-white rounded-lg  hover:border-[#5326EC] border border-white'
                onClick={toggleWidget}
              >
                <span className='text-[#5326EC]'>Use Li.FI</span>
              </button>
              <LiFiWidget
                ref={drawerRef}
                config={{
                  variant: 'drawer',
                  fromChain: 137,
                  fee: 0.006,
                  fromToken: '0x0000000000000000000000000000000000001010', // POL token address in polygon
                  toChain: 1101,
                  toToken: '0x22B21BedDef74FE62F031D2c5c8F7a9F8a4b304D', //POL token address in zkevm
                }}
                integrator='general-magic'
              />

              <Link
                target='_blank'
                href={
                  'https://giveth.notion.site/Get-ETH-and-POL-on-Polygon-zkEVM-1223ab28d48c8003b76fd98c3ed2a194'
                }
              >
                <div className='px-4 py-1 bg-white rounded-lg flex gap-1 items-center hover:border-[#5326EC] border border-white cursor-pointer'>
                  <span className='text-[#5326EC]'>Need help!</span>
                  <IconArrowRight color='#5326EC' />
                </div>
              </Link>
            </div>
          </div>

          {/*  */}

          {/* Token Lock Schedule */}

          <div className='flex flex-col p-4 border-[1px] border-[#D7DDEA] rounded-lg  gap-2'>
            <div className='flex gap-2 items-center'>
              <span className='font-medium  font-redHatText text-[#1D1E1F]'>
                Token Unlock Schedule{' '}
              </span>
              <div className='relative group'>
                <IconTokenSchedule />
                <div className='absolute w-[200px] z-50 mb-2 left-[-60px] hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2'>
                  <h3 className='font-bold'>Token Unlock Schedule</h3>
                  {tokenSchedule.toolTip}
                </div>
              </div>
            </div>

            <hr />
            <h2 className='text-[#4F576A]'>{tokenSchedule.message}</h2>
          </div>

          {/* Donate Button */}

          <div className='flex flex-col'>
            <Button
              onClick={handleDonateClick}
              disabled={!isConnected || donateDisabled}
              loading={isConfirming}
              color={ButtonColor.Giv}
              className={`text-white justify-center ${
                !donateDisabled
                  ? 'opacity-100'
                  : 'opacity-50 cursor-not-allowed'
              }`}
            >
              {isConnected ? 'Support This Project' : 'Connect Wallet'}
            </Button>
            <FlashMessage
              message={flashMessage}
              onClose={() => setFlashMessage('')}
            />
          </div>
          <div className='flex flex-col gap-4'>
            {/* Terms of Service */}
            <label className='flex gap-2 items-center p-4 bg-[#EBECF2] rounded-2xl w-full cursor-pointer'>
              <div>
                <input
                  type='checkbox'
                  checked={terms}
                  onChange={event => handleAcceptTerms(event)}
                />
              </div>
              <div className='flex flex-col text-[#1D1E1F] '>
                <h2 className='text-base'>
                  I have read and agree to the{' '}
                  <Link
                    href='https://giveth.notion.site/Terms-and-Conditions-10a3ab28d48c8058af3cd37455b591c5'
                    className='text-pink-500 font-semibold'
                    target='_blank'
                  >
                    Terms of Service.
                  </Link>
                </h2>
              </div>
            </label>

            {/* Make it Anoynmous */}
            <div
              className='flex gap-2 p-2 cursor-pointer'
              onClick={() => setAnoynmous(!anoynmous)}
            >
              <div>
                <input
                  type='checkbox'
                  checked={anoynmous}
                  onChange={() => setAnoynmous(!anoynmous)}
                />
              </div>
              <div className='flex flex-col text-[#1D1E1F]'>
                <h2 className='text-base'>Make it anonymous</h2>
                <p className='text-xs'>
                  By checking this, we won&apos;t consider your profile
                  information as a donor for this donation and won&apos;t show
                  it on public pages.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className='p-6 flex flex-col gap-8 h-fit lg:w-1/2 bg-white rounded-2xl shadow-[0px 3px 20px 0px rgba(212, 218, 238, 0.40)]  font-redHatText'>
          {/* Project Banner */}
          <div
            className='w-full h-[250px] bg-cover bg-center rounded-3xl relative'
            style={{
              backgroundImage: `url(${projectData?.image})`,
            }}
          >
            <div className=' flex flex-col absolute  bottom-[24px] left-[24px] md:bottom-[24px] md:left-[24px] gap-2'>
              <div className='border rounded-md bg-white p-1 block w-fit'>
                <Image
                  src={projectData?.icon || '/images/project-card/logo.svg'}
                  alt=''
                  width={40}
                  height={40}
                />
              </div>
              <div className='flex flex-col text-white gap-2'>
                <h1 className='text-2xl md:text-[41px]  font-bold leading-10'>
                  {projectData?.title}
                </h1>
              </div>
            </div>
          </div>

          {/* Percentage Bar */}

          <div className='flex flex-col gap-2  px-4 py-4 bg-[#F7F7F9] rounded-lg'>
            <div
              className={`px-2 py-[2px] rounded-md  w-fit flex gap-2 font-redHatText text-xs font-medium ${progress === 100 ? 'bg-[#5326EC] text-white' : 'bg-[#F7F7F9] text-[#1D1E1F]'} `}
            >
              {progress === 0 ? (
                'Getting started !'
              ) : progress >= 100 ? (
                'Maxed out this round!'
              ) : (
                <div className='flex gap-1'>
                  {progress} % collected
                  <div className='relative group'>
                    <IconTokenSchedule />
                    <div className='absolute w-[200px] z-50 mb-2 left-[-60px] hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2'>
                      Bonding curves have a mint price and a burn price. This
                      shows the mint price.
                    </div>
                  </div>
                </div>
              )}
            </div>
            <ProgressBar progress={progress} isStarted={false} />
            <div className='flex justify-between px-2 font-redHatText  font-medium items-center'>
              <span className='text-[#A5ADBF] text-xs'>
                {' '}
                Cumulative Round Cap
              </span>
              <span className='text-[#1D1E1F]'>
                {formatAmount(maxPOLCap)} POL
              </span>
            </div>
          </div>

          {/* Project Details */}
          <div className='flex flex-col gap-6'>
            <div className='flex flex-col font-redHatText'>
              <h2 className='text-sm text-[#82899A] bg-[#F7F7F9] rounded-md p-1 w-fit'>
                Total amount received
              </h2>
              <div className='flex gap-2 items-center'>
                <h1 className='text-4xl font-extrabold p-2'>
                  {formatAmount(totalPOLDonated)} POL
                </h1>
                <h2 className='text-[#1D1E1F] font-medium'>
                  ~ ${' '}
                  {formatAmount(
                    Math.round(totalPOLDonated * Number(POLPrice) * 100) / 100,
                  )}
                </h2>
              </div>

              <p className='text-[#82899A]'>
                From{' '}
                <span className='font-medium text-[#1D1E1F]'>
                  {uniqueDonars}
                </span>{' '}
                supporters
              </p>
            </div>
            <div className='flex justify-between gap-1'>
              <div className='flex gap-1 items-center'>
                <img
                  className='w-6 h-6 rounded-full'
                  src={getIpfsAddress(
                    projectData?.abc?.icon! ||
                      'Qmeb6CzCBkyEkAhjrw5G9GShpKiVjUDaU8F3Xnf5bPHtm4',
                  )}
                />

                <span>
                  {projectData?.abc?.tokenTicker} range{' '}
                  {tokenPriceRangeStatus.isSuccess &&
                  tokenPriceRangeStatus.data?.isPriceUpToDate
                    ? ' '
                    : ' (Calculating) '}
                </span>
                <div className='relative group'>
                  <IconTokenSchedule />
                  <div className='absolute w-[200px] z-50 mb-2 left-[-60px] hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2'>
                    The mint value of the {projectData?.abc?.tokenTicker} token
                    will be within this range, based on the amount of POL this
                    project receives.
                  </div>
                </div>
              </div>
              <div className='flex gap-8 font-redHatText'>
                {tokenPriceRangeStatus.isSuccess &&
                tokenPriceRangeStatus.data?.isPriceUpToDate ? (
                  <>
                    <h2 className='flex gap-1 items-center'>
                      <span className='text-base font-medium text-[#4F576A]'>
                        {tokenPriceRange.min.toFixed(2)} -{' '}
                        {tokenPriceRange.max.toFixed(2)}
                      </span>
                      <span className='text-xs text-[#82899A]'>POL</span>
                    </h2>
                    <h2>
                      <span>
                        ~${' '}
                        {Number(POLPrice) &&
                          formatNumber(
                            Number(POLPrice) * tokenPriceRange.min,
                          )}{' '}
                        -
                        {Number(POLPrice) &&
                          formatNumber(Number(POLPrice) * tokenPriceRange.max)}
                      </span>
                    </h2>
                  </>
                ) : (
                  <>
                    <h2 className='flex gap-1 items-center'>
                      <span className='text-base font-medium text-[#4F576A]'>
                        ---
                      </span>
                      <span className='text-xs text-[#82899A]'>POL</span>
                    </h2>
                    <h2>
                      <span>~$ ---</span>
                    </h2>
                  </>
                )}
              </div>
            </div>

            {/* Total Supply */}
            <div className='flex  flex-wrap  gap-2 justify-between'>
              <div className='flex gap-2'>
                <IconTotalSupply />
                <span className='font-medium text-[#4F576A]'>Total Supply</span>
              </div>

              <h3 className='font-medium text-[#1D1E1F]'>
                {formatAmount(projectData?.abc?.totalSupply) || '---'}{' '}
                {projectData?.abc?.tokenTicker}
              </h3>
            </div>
          </div>
        </div>
      </div>

      {activeRoundDetails?.__typename === 'EarlyAccessRound' ? (
        ''
      ) : (
        <div className='flex flex-col items-center  gap-6 mt-20 p-5 font-redHatText'>
          <h1 className=' text-center text-xl  text-[#1D1E1F]'>
            Want to spread the word about this project? Tell others now.
          </h1>
          <span
            onClick={handleShare}
            className='text-xs cursor-pointer flex gap-2 font-medium text-pink-500 px-[15px] py-2 bg-white w-[220px] h-[48px] justify-center items-center rounded-full'
          >
            <IconShare size={16} />
            Share
          </span>
          <ShareProjectModal
            isOpen={isShareModalOpen}
            onClose={closeShareModal}
            showCloseButton={true}
            projectSlug={projectData?.slug || ''}
          />
        </div>
      )}
    </div>
  );
};

export default DonatePageBody;
