'use client';
import React, { useEffect, useState } from 'react';
import { useAccount, useWaitForTransactionReceipt } from 'wagmi';
import { createPublicClient, http } from 'viem';
import { IconRefresh } from '../Icons/IconRefresh';
import { IconABC } from '../Icons/IconABC';
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

interface ITokenSchedule {
  message: string;
  toolTip: string;
}

const DonatePageBody = () => {
  const { address, isConnected } = useAccount();
  const { chain } = useAccount();
  const [inputAmount, setInputAmount] = useState<string>('');
  const [tokenDetails, setTokenDetails] = useState<any>();
  const [tokenPrice, setTokenPrice] = useState(1);
  const [terms, setTerms] = useState<boolean>(false);
  const [anoynmous, setAnoynmous] = useState<boolean>(false);
  const [hash, setHash] = useState<`0x${string}` | undefined>(undefined);
  const [hasSavedDonation, setHasSavedDonation] = useState<boolean>(false);

  const [tokenSchedule, setTokenSchedule] = useState<ITokenSchedule>({
    message:
      'Tokens are locked for 1 year with a 6 month cliff. This means that after 6 months, tokens are locked for 6 months and unlocked in a 6 month stream.',
    toolTip:
      'Tokens are locked for 1 year with a 6 month cliff. This means that after 6 months, tokens are locked for 6 months and unlocked in a 6 month stream.',
  });

  const { projectData } = useDonateContext();

  const client = createPublicClient({
    chain: chain,
    transport: http(config.NETWORK_RPC_ADDRESS),
  });
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  const tokenAddress = '0x58a9BB66e2A57aF82e6621F1e2D1483286956683'; //POL token address
  const WMATIC = '0x97986A7526C6B7706C5e48bB8bE3644ab9f4747C';

  const totalSupply = '4000';
  let round = 'early';

  console.log(projectData?.addresses[0].address, projectData?.id);

  useEffect(() => {
    getTokenDetails();
  }, [address, tokenAddress, chain]);

  useEffect(() => {
    const fetchPrice = async () => {
      const price = await fetchTokenPrice('wmatic');
      setTokenPrice(price);
    };

    if (round === 'early') {
      const message =
        'Tokens are locked for 2 years with a 1-year cliff. This means that after 1 year, tokens will unlock in a stream over the following 1 year. ';
      const toolTip =
        'Tokens are locked for 2 years with a 1-year cliff. This means that after 1 year, tokens will unlock in a stream over the following 1 year. ';

      setTokenSchedule({ message, toolTip });
    }

    fetchPrice();
  }, []);

  useEffect(() => {
    if (isConfirmed && !hasSavedDonation) {
      const token = 'POL';

      handleSaveDonation({
        projectId: parseInt(projectData?.id),
        transactionNetworkId: chain?.id,
        amount: parseInt(inputAmount),
        token,
        transactionId: hash,
        tokenAddress,
      });

      setHasSavedDonation(true); // Mark the donation as saved
    }
  }, [isConfirmed, hasSavedDonation]);

  const getTokenDetails = async () => {
    if (!address) return;
    const data = await fetchTokenDetails({
      tokenAddress,
      address,
      client,
    });
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

  const handleRefetch = () => {
    getTokenDetails();
    console.log('Refetched', parseFloat(tokenDetails.formattedBalance));
  };

  const handlePercentageClick = (percentage: number) => {
    const amount = (parseFloat(totalSupply) * percentage) / 100;
    setInputAmount(amount.toString());
  };

  if (isConfirmed) {
    return <DonateSuccessPage transactionHash={hash} />;
  }
  return (
    <div className='bg-[#F7F7F9] w-full  py-10 absolute z-40 my-10'>
      <div className='container w-full flex  flex-col lg:flex-row gap-10 '>
        <div className='p-6 lg:w-1/2 flex flex-col gap-8 bg-white rounded-2xl shadow-[0px 3px 20px 0px rgba(212, 218, 238, 0.40)] font-redHatText'>
          <div className='flex p-4 rounded-lg border-[1px] border-[#8668FC] bg-[#F6F3FF] gap-2 font-redHatText text-[#8668FC] flex-col'>
            <h1 className='font-medium'>There is a 2% cap!</h1>
            <p className='border-b pb-2 border-[#8668FC]'>
              To maintain a fair launch one address cannot hold more than 2% of
              the total supply.
            </p>
            <p>
              {' '}
              Current total supply{' '}
              <span className='font-medium'>57,000,000 XYZ</span>
            </p>
          </div>

          <div className='flex flex-col md:flex-row  font-redHatText gap-4'>
            <div className='flex  justify-between p-2 w-full md:w-2/3 bg-[#EBECF2]  rounded-lg text-[#1D1E1F]'>
              <span className='flex gap-2 items-center  '>
                You're 2% cap limit is
                <div className='relative group'>
                  <IconTokenSchedule />
                  <div className='absolute w-[200px] z-50 mb-2 left-[-60px] hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2'>
                    The maximum amount of POL you can send is calculated by
                    multiplying the maximum number of tokens you can acquire by
                    the current mint price.
                  </div>
                </div>
              </span>
              <span className='font-medium'>{totalSupply} POL</span>
            </div>

            <div className='flex gap-2 items-center'>
              <span
                onClick={() => handlePercentageClick(25)}
                className=' flex justify-center px-4 py-2 border text-[#5326EC] text-sm border-[#5326EC] rounded-3xl bg-[#E7E1FF] cursor-pointer'
              >
                25%
              </span>
              <span
                onClick={() => handlePercentageClick(50)}
                className=' flex justify-center px-4 py-2 border text-[#5326EC] text-sm border-[#5326EC] rounded-3xl bg-[#E7E1FF] cursor-pointer'
              >
                50%
              </span>
              <span
                onClick={() => handlePercentageClick(100)}
                className=' flex justify-center px-4 py-2 border text-[#5326EC] text-sm border-[#5326EC] rounded-3xl bg-[#E7E1FF] cursor-pointer'
              >
                MAX
              </span>
            </div>
          </div>
          {/* Input Box */}

          <div className='flex flex-col gap-2 font-redHatText'>
            <div className='border rounded-lg flex relative '>
              <div className='md:w-40 flex gap-4 p-4 border '>
                <IconMatic size={24} />
                <h1 className=' font-medium'>{tokenDetails?.symbol}</h1>
              </div>
              <input
                onChange={e => setInputAmount(e.target.value)}
                value={inputAmount}
                type='number'
                disabled={isConfirming}
                className='w-full  text-sm  md:text-base border rounded-lg  px-4'
              />
              <span className='absolute text-sm  md:text-base top-0 right-0 h-full flex items-center pr-5 text-gray-400 pointer-events-none'>
                ${' '}
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
                Available:
                {!tokenDetails
                  ? 'Loading...'
                  : `${tokenDetails?.formattedBalance} ${tokenDetails?.symbol}`}
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
              <h1 className='font-bold  text-[#1D1E1F]'>
                Token Unlock Schedule{' '}
              </h1>
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

          <Button
            onClick={handleDonate}
            disabled={
              !isConnected ||
              parseFloat(inputAmount) <= 0 ||
              !terms ||
              inputAmount > totalSupply
            }
            loading={isConfirming}
            color={ButtonColor.Giv}
            className={`text-white justify-center ${
              isConnected ? 'opacity-100' : 'opacity-50 cursor-not-allowed'
            }`}
          >
            Support This Project
          </Button>

          <div className='flex flex-col gap-4'>
            {/* Terms of Service */}
            <div className='flex gap-2 items-center p-4 bg-[#EBECF2] rounded-2xl w-full'>
              <div>
                <input type='checkbox' onChange={() => setTerms(!terms)} />
              </div>
              <div className='flex flex-col text-[#1D1E1F] '>
                <h2 className='text-base'>
                  I have read and agree to the{' '}
                  <span className='text-[#E1458D] font-semibold'>
                    Terms of Service.
                  </span>
                </h2>
              </div>
            </div>

            {/* Make it Anoynmous */}
            <div className='flex gap-2 p-2'>
              <div>
                <input
                  type='checkbox'
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
            <div className=' flex flex-col absolute  bottom-[5%] left-[5%] md:bottom-[10%] md:left-[10%] gap-2'>
              <div className='border rounded-md bg-white p-1 block w-fit'>
                <IconABC size={40} />
              </div>
              <div className='flex flex-col text-white gap-2'>
                <h1 className='text-2xl md:text-[41px]  font-bold leading-10'>
                  {projectData?.title}
                </h1>
              </div>
            </div>
          </div>

          {/* Project Details */}
          <div className='flex flex-col gap-4'>
            <div className='flex flex-col gap-1'>
              <div className='flex gap-1 items-center'>
                <IconABC size={24} />
                <span>ABC current value</span>
                <div className='relative group'>
                  <IconTokenSchedule />
                  <div className='absolute w-[200px] z-50 mb-2 left-[-60px] hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2'>
                    <h3 className='font-bold'>ABC Current Value</h3>
                    Bonding curves have a mint price and a burn price. This
                    shows the mint price.
                  </div>
                </div>
              </div>
              <div className='flex gap-8 font-redHatText'>
                <h2 className='w-1/2'>
                  <span className='text-base font-medium text-[#4F576A] '>
                    ~ 2.02
                  </span>{' '}
                  in POL
                </h2>
                <h2 className=''>
                  <span>~ $ 2.02</span>
                </h2>
              </div>
            </div>

            <div className='flex flex-col font-redHatText'>
              <h2 className='text-sm text-[#82899A] bg-[#F7F7F9] rounded-md p-1 w-fit'>
                Total amount received
              </h2>
              <h1 className='text-4xl font-extrabold p-2'>$ 1,200</h1>
              <h2 className='text-[#1D1E1F] font-medium'>~ $ 980,345</h2>
              <p className='text-[#82899A]'>
                Raised from{' '}
                <span className='font-medium text-[#1D1E1F]'>25</span>{' '}
                contributors
              </p>
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
