'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useAccount, useWaitForTransactionReceipt } from 'wagmi';
import { createPublicClient, http } from 'viem';
import Link from 'next/link';
import { IconRefresh } from '../Icons/IconRefresh';
import { IconMatic } from '../Icons/IconMatic';
import { IconTokenSchedule } from '../Icons/IconTokenSchedule';
import { IconShare } from '../Icons/IconShare';

import DonateSuccessPage from './DonateSuccessPage';
import { Button, ButtonColor } from '../Button';

import {
  fetchTokenDetails,
  fetchTokenPrice,
  handleErc20Transfer,
} from '@/helpers/token';
import config from '@/config/configuration';
import { saveDonations } from '@/services/donation.services';
import { useDonateContext } from '@/context/donation.context';
import { getIpfsAddress } from '@/helpers/image';
import { formatAmount } from '@/helpers/donation';
import { usePrivado } from '@/hooks/usePrivado';
import { useFetchUser } from '@/hooks/useFetchUser';
import FlashMessage from '../FlashMessage';
import ProgressBar from '../ProgressBar';
import { IconTotalSupply } from '../Icons/IconTotalSupply';
import { useUpdateAcceptedTerms } from '@/hooks/useUpdateAcceptedTerms';

interface ITokenSchedule {
  message: string;
  toolTip: string;
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

const DonatePageBody = () => {
  const { address, isConnected } = useAccount();
  const { chain } = useAccount();
  const { data: user } = useFetchUser();
  const [inputAmount, setInputAmount] = useState<string>('');
  const [tokenDetails, setTokenDetails] = useState<any>();
  const [tokenPrice, setTokenPrice] = useState(1);
  const [terms, setTerms] = useState<boolean>(false);
  const [anoynmous, setAnoynmous] = useState<boolean>(false);
  const [hash, setHash] = useState<`0x${string}` | undefined>(undefined);
  const [hasSavedDonation, setHasSavedDonation] = useState<boolean>(false);
  const [donateDisabled, setDonateDisabled] = useState(true);
  const [flashMessage, setFlashMessage] = useState('');
  let { isVerified, isLoading, verifyAccount } = usePrivado();
  isVerified = true;
  const {
    projectData,
    totalAmount: totalPOLDonated,
    uniqueDonars,
  } = useDonateContext();
  const { mutate: updateAcceptedTerms } = useUpdateAcceptedTerms();

  let maxPOLAmount = 100000 / tokenPrice;
  let progress = Math.round((totalPOLDonated / maxPOLAmount) * 100 * 100) / 100; // calculate and round the progress to 2 decimal places

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
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  // const tokenAddress = '0x58a9BB66e2A57aF82e6621F1e2D1483286956683'; //POL token address
  const WMATIC = '0x97986A7526C6B7706C5e48bB8bE3644ab9f4747C';
  const tokenAddress = config.ERC_TOKEN_ADDRESS; //SPC token

  const totalTokenSupply = '57000000';
  const totalSupply = 0.02 * parseFloat(totalTokenSupply) * 0.125;

  // const totalSupply = totalPol * 0.125;
  let round = 'early';

  console.log(projectData?.addresses[0].address, projectData?.id);

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
      !(parseFloat(inputAmount) >= 5 && parseFloat(inputAmount) <= totalSupply)
    ) {
      setDonateDisabled(true);
    } else {
      setDonateDisabled(false);
    }
  }, [terms, isConnected, inputAmount, totalSupply]);

  useEffect(() => {
    const fetchPrice = async () => {
      const price = await fetchTokenPrice('wmatic');
      setTokenPrice(price);
    };

    if (round === 'early') {
      const message =
        'Tokens are locked for 2 years with a 1-year cliff. This means that after 1 year, tokens will unlock in a stream over the following 1 year.';
      const toolTip =
        'Tokens are locked for a period of time. The cliff is when tokens begin to unlock, in a stream, until the last day of the schedule.';

      setTokenSchedule({ message, toolTip });
    }

    fetchPrice();
  }, []);

  useEffect(() => {
    if (isConfirmed && !hasSavedDonation) {
      const token = config.ERC_TOKEN_SYMBOL;

      handleSaveDonation({
        projectId: parseInt(projectData?.id),
        transactionNetworkId: chain?.id,
        amount: parseInt(inputAmount),
        token,
        transactionId: hash,
        tokenAddress,
      });

      setHasSavedDonation(true);

      // Save that user accepted terms and conditions
      if (terms && !user?.acceptedToS) {
        updateAcceptedTerms(true);
      }
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
    const data = await saveDonations(
      projectId,
      transactionNetworkId,
      amount,
      token,
      transactionId,
      tokenAddress,
      anoynmous,
    );
  };

  const handleDonate = async () => {
    try {
      const hash = await handleErc20Transfer({
        inputAmount,
        tokenAddress,
        projectAddress: projectData?.addresses[0].address,
      });

      setHash(hash);
    } catch (ContractFunctionExecutionError) {
      console.log(ContractFunctionExecutionError);
    }
  };

  const handleDonateClick = () => {
    console.log(parseFloat(inputAmount));
    if (!isVerified) {
      setFlashMessage('User is not verified with Privado');
      return;
    }

    if (parseFloat(inputAmount) < 5 || isNaN(parseFloat(inputAmount))) {
      setFlashMessage('The minimum donation amount is 5.');
      return;
    }
    if (parseFloat(inputAmount) > totalSupply) {
      setFlashMessage('The donation amount exceeds the cap limit.');
      return;
    }
    if (!terms) {
      setFlashMessage('Please accept the terms and conditions.');
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
        return null;
      } else {
        // Set the new selected percentage and calculate the amount
        const amount = (totalSupply * percentage) / 100;
        setInputAmount(amount.toString());
        return percentage;
      }
    });
  };

  if (isConfirmed) {
    return <DonateSuccessPage transactionHash={hash} round={round} />;
  }
  const percentages = [25, 50, 100];
  return (
    <div className='bg-[#F7F7F9] w-full my-10'>
      <div className='container w-full flex  flex-col lg:flex-row gap-10 '>
        <div className='p-6 lg:w-1/2 flex flex-col gap-8 bg-white rounded-2xl shadow-[0px 3px 20px 0px rgba(212, 218, 238, 0.40)] font-redHatText'>
          <div className='flex p-4 rounded-lg border-[1px] border-[#8668FC] bg-[#F6F3FF] gap-2 font-redHatText text-[#8668FC] flex-col'>
            <h1 className='font-medium'>Caps enable a fair launch!</h1>
            <p className='pb-2 '>
              Individual caps allow more people to participate in the important
              early stage of this project’s token economy. Everyone has the same
              cap for each round. The cap per round is subject to change.
            </p>
          </div>

          <div className='flex flex-col md:flex-row  font-redHatText gap-4'>
            <div className='flex  justify-between p-2 w-full md:w-2/3 bg-[#EBECF2]  rounded-lg text-[#1D1E1F] items-center'>
              <span className='flex gap-2 items-center  '>
                Your remaining cap
                <span className='font-medium text-[#4F576A]'>
                  {formatAmount(totalSupply)} POL
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
                onChange={e => setInputAmount(e.target.value)}
                value={inputAmount}
                type='number'
                disabled={isConfirming}
                className='w-full  text-sm  md:text-base border rounded-lg  px-4'
              />

              <span className='absolute text-sm  md:text-base top-0 right-0 h-full flex items-center pr-5 text-gray-400 pointer-events-none'>
                ~ ${' '}
                {inputAmount === ''
                  ? 0
                  : Math.floor(parseFloat(inputAmount) * tokenPrice * 100) /
                    100}
              </span>
            </div>
            {/* Avaliable token */}
            <div className='flex gap-1'>
              {/* <span className='text-sm'>Available: 85000 MATIC</span> */}
              <div
                onClick={() => setInputAmount(tokenDetails?.formattedBalance)}
                className='cursor-pointer hover:underline'
              >
                Available in your wallet:{' '}
                {!tokenDetails
                  ? 'Loading...'
                  : `${Math.floor(tokenDetails?.formattedBalance * 100) / 100} ${tokenDetails?.symbol}`}
              </div>

              <button onClick={handleRefetch}>
                <IconRefresh size={16} />
              </button>
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
              disabled={!isConnected}
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
            <div
              className='flex gap-2 items-center p-4 bg-[#EBECF2] rounded-2xl w-full cursor-pointer'
              onClick={() => user?.acceptedToS || setTerms(!terms)}
            >
              <div>
                <input
                  type='checkbox'
                  checked={terms}
                  onChange={() => user?.acceptedToS || setTerms(!terms)}
                  disabled={user?.acceptedToS}
                />
              </div>
              <div className='flex flex-col text-[#1D1E1F] '>
                <h2 className='text-base'>
                  I have read and agree to the{' '}
                  <Link
                    href='https://giveth.notion.site/Terms-and-Conditions-10a3ab28d48c8058af3cd37455b591c5'
                    className='text-[#E1458D] font-semibold'
                    target='_blank'
                  >
                    Terms of Service.
                  </Link>
                </h2>
              </div>
            </div>

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

          <div className='flex flex-col gap-2 '>
            <div
              className={`px-2 py-[2px] rounded-md  w-fit flex gap-2 font-redHatText text-xs font-medium ${progress === 100 ? 'bg-[#5326EC] text-white' : 'bg-[#F7F7F9] text-[#1D1E1F]'} `}
            >
              {progress === 0
                ? 'Getting started !'
                : progress !== 100
                  ? progress + '% collected'
                  : 'Maxed out this round!'}

              <div className='relative group'>
                <IconTokenSchedule />
                <div className='absolute w-[200px] z-50 mb-2 left-[-60px] hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2'>
                  <h3 className='font-bold'>
                    {projectData?.abc?.tokenTicker} Current Value
                  </h3>
                  Every round has a round limit. This is the % of the current
                  round limit that has been collected. Once it reaches 100%, the
                  round will close.
                </div>
              </div>
            </div>
            <ProgressBar progress={progress} isStarted={false} />
            <div className='flex justify-between px-2 font-redHatText  font-medium items-center'>
              <span className='text-[#A5ADBF] text-xs'> Round Cap</span>
              <span className='text-[#1D1E1F]'>
                {formatAmount(maxPOLAmount)} POL
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
                  {totalPOLDonated} POL
                </h1>
                <h2 className='text-[#1D1E1F] font-medium'>
                  ~ ${' '}
                  {formatAmount(
                    Math.round(totalPOLDonated * tokenPrice * 100) / 100,
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

                <span>{projectData?.abc?.tokenTicker} range</span>
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
                <h2 className=' flex gap-1 items-center'>
                  <span className='text-base font-medium text-[#4F576A] '>
                    {projectData?.abc?.tokenPrice
                      ? projectData?.abc?.tokenPrice
                      : '---'}
                  </span>
                  <span className='text-xs text-[#82899A]'>POL</span>
                </h2>
                <h2 className=''>
                  <span>
                    ~ ${' '}
                    {projectData?.abc?.tokenPrice
                      ? Math.round(
                          projectData?.abc?.tokenPrice * tokenPrice * 100,
                        ) / 100
                      : '---'}
                  </span>
                </h2>
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

      {round === 'early' ? (
        ''
      ) : (
        <div className='flex flex-col items-center  gap-6 mt-20 p-5 font-redHatText'>
          <h1 className=' text-center text-xl  text-[#1D1E1F]'>
            Want to spread the word about this project? Tell others now.
          </h1>
          <span className='text-xs  flex gap-2 font-medium text-[#E1458D]'>
            <IconShare size={16} />
            Share
          </span>
        </div>
      )}
    </div>
  );
};

export default DonatePageBody;
