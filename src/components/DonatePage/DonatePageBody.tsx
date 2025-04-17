'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  useAccount,
  useWaitForTransactionReceipt,
  useSwitchChain,
  useSendTransaction,
} from 'wagmi';
import { getConnectorClient } from '@wagmi/core';
import { useRouter } from 'next/navigation';
import { Account, Chain, Client, parseEther, Transport } from 'viem';
import round from 'lodash/round';
import floor from 'lodash/floor';
import { BrowserProvider, JsonRpcSigner } from 'ethers';
import debounce from 'lodash/debounce';

import { IconRefresh } from '../Icons/IconRefresh';
import { IconTokenSchedule } from '../Icons/IconTokenSchedule';
import { IconShare } from '../Icons/IconShare';

import DonateSuccessPage from './DonateSuccessPage';
import { Button, ButtonColor } from '../Button';

import {
  convertDonationAmount,
  convertToPOLAmount,
  fetchBalanceWithDecimals,
  formatBalance,
} from '@/helpers/token';
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
import {
  useTokenPriceRange,
  useTokenPriceRangeStatus,
} from '@/services/tokenPrice.service';
import { useFetchActiveRoundDetails } from '@/hooks/useFetchActiveRoundDetails';
import { calculateCapAmount } from '@/helpers/round';
import { IconAlertTriangle } from '../Icons/IconAlertTriangle';
import { ShareProjectModal } from '../Modals/ShareProjectModal';
import { useFetchAllRound } from '@/hooks/useFetchAllRound';
import { EligibilityCheckToast } from './EligibilityCheckToast';
import { GitcoinEligibilityModal } from '../Modals/GitcoinEligibilityModal';
import { fetchProjectUserDonationCapKyc } from '@/services/user.service';
import { ZkidEligibilityModal } from '../Modals/ZkidEligibilityModal';
import { TermsConditionModal } from '../Modals/TermsConditionModal';
import SelectChainModal, {
  POLYGON_POS_CHAIN_ID,
  POLYGON_POS_CHAIN_IMAGE,
} from './SelectChainModal';
import {
  approveSpending,
  convertToTokenUnits,
  getRoute,
  SquidTokenType,
  SwapData,
} from '@/helpers/squidTransactions';
import { useFetchPOLPriceSquid } from '@/hooks/useFetchPOLPriceSquid';
import { UserCapUpdateModal } from '../Modals/UserCapUpdateModal';
import { wagmiAdapter } from '@/config/wagmi';

const SUPPORTED_CHAIN = config.SUPPORTED_CHAINS[0];
export function clientToSigner(client: Client<Transport, Chain, Account>) {
  const { account, chain, transport } = client;
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  };
  const provider = new BrowserProvider(transport, network);
  const signer = new JsonRpcSigner(provider, account.address);
  return signer;
}

export async function getEthersSigner({ chainId }: { chainId?: number } = {}) {
  const client = await getConnectorClient(wagmiAdapter.wagmiConfig, {
    chainId,
  });
  return clientToSigner(client);
}

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
  const { data: POLPrice } = useFetchPOLPriceSquid();

  const [terms, setTerms] = useState<boolean>(user?.acceptedToS || false);
  const [anoynmous, setAnoynmous] = useState<boolean>(false);
  const [hash, setHash] = useState<`0x${string}` | undefined>(undefined);
  const [hasSavedDonation, setHasSavedDonation] = useState<boolean>(false);
  const [donateDisabled, setDonateDisabled] = useState(true);
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [flashMessage, setFlashMessage] = useState('');
  const [userDonationCap, setUserDonationCap] = useState<number>(0);
  const [userUnusedCapOnGP, setUserUnusedCapOnGP] = useState(0);
  const [inputErrorMessage, setInputErrorMessage] = useState<string | null>(
    null,
  );
  const [inputBalanceError, setInputBalanceError] = useState<boolean>(false);
  const [userDonationCapError, setUserDonationCapError] =
    useState<boolean>(false);

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

  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const openShareModal = () => setIsShareModalOpen(true);
  const closeShareModal = () => setIsShareModalOpen(false);

  const [showGitcoinModal, setShowGitcoinModal] = useState(false);
  const [showZkidModal, setShowZkidModal] = useState(false);
  const [showTermsConditionModal, setShowTermsConditionModal] = useState(false);
  const [showUserCapModal, setshowUserCapModal] = useState(false);
  const [donationId, setDonationId] = useState<number>(0);
  const router = useRouter();

  const [showChainTokenModal, setShowChainTokenModal] = useState(false);

  const [selectedChain, setSelectedChain] = useState<{
    id: string | null;
    imageUrl: string;
  }>({
    id: POLYGON_POS_CHAIN_ID,
    imageUrl: POLYGON_POS_CHAIN_IMAGE, // Replace with actual URL
  });
  const [selectedToken, setSelectedToken] = useState<SquidTokenType>({
    symbol: 'POL',
    address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
    chainId: '137',
    name: 'POL',
    decimals: 18,
    type: 'evm',
    logoURI:
      'https://raw.githubusercontent.com/0xsquid/assets/main/images/tokens/matic.svg',
    usdPrice: POLPrice,
    coingeckoId: 'polygon-ecosystem-token',
    subGraphIds: [],
    subGraphOnly: false,
    active: true,
    balance: 0,
  });

  const [squidTransactionRequest, setSquidTransactionRequest] =
    useState<any>(null);
  const [squidRouteLoading, setSquidRouteLoading] = useState(false);
  const [isSquidTransaction, setIsSquidTransaction] = useState(false);

  const [minimumContributionAmount, setMinimumContributionAmount] =
    useState<number>(config.MINIMUM_DONATION_AMOUNT);

  // let provider = new ethers.BrowserProvider(window.ethereum);

  useEffect(() => {
    const fetchConversion = async () => {
      const amount = await convertDonationAmount(selectedToken);
      console.log(amount);
      setMinimumContributionAmount(amount ?? config.MINIMUM_DONATION_AMOUNT);
    };

    fetchConversion();
  }, [selectedToken]);

  const handleChainTokenSelection = (chain: any, token: any) => {
    setSelectedChain(chain);
    setSelectedToken(token);
    setInputAmount('');
    setSquidTransactionRequest(null);
    setShowChainTokenModal(false);
  };

  const handleShare = () => {
    openShareModal();
  };

  const getDonationCap: any = async () => {
    if (projectData?.id) {
      const userCapp = await fetchProjectUserDonationCapKyc(
        Number(projectData?.id),
      );
      const { gitcoinPassport, zkId } = userCapp || {};
      const convertedUnusedCapOnGP = await convertDonationAmount(
        selectedToken,
        gitcoinPassport?.unusedCap,
      );
      setUserUnusedCapOnGP(convertedUnusedCapOnGP || 0);
      const userCap =
        floor(Number(zkId?.unusedCap)) ||
        floor(Number(gitcoinPassport?.unusedCap)) ||
        0;
      const convertedCap = await convertDonationAmount(selectedToken, userCap);
      const res = remainingDonationAmount / 2 - 1;
      if (progress >= 90) {
        // console.log('Res', res, progress);
        setUserDonationCap(Math.min(res, Number(convertedCap)));
      } else {
        setUserDonationCap(Number(convertedCap));
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
  const handleDonateClick = async () => {
    setDonateDisabled(true);
    if (!isVerified) {
      if (
        activeRoundDetails &&
        'roundPOLCapPerUserPerProjectWithGitcoinScoreOnly' in
          activeRoundDetails &&
        parseFloat(inputAmount) >
          activeRoundDetails?.roundPOLCapPerUserPerProjectWithGitcoinScoreOnly
      ) {
        {
          console.log(
            'User is not verified with Privado ID',
            activeRoundDetails?.roundPOLCapPerUserPerProjectWithGitcoinScoreOnly,
          );
          setShowZkidModal(true);
          setDonateDisabled(false);
          return;
        }
      }

      if (
        !user?.hasEnoughGitcoinPassportScore &&
        !user?.hasEnoughGitcoinAnalysisScore
      ) {
        setDonateDisabled(false);
        setShowGitcoinModal(true);
        console.log('User is not verified with Human Passport');
        return;
      } else if (parseFloat(inputAmount) > userUnusedCapOnGP) {
        console.log('User is not verified with Privado ID');
        setDonateDisabled(false);
        setShowZkidModal(true);
        return;
      }
    }
    if (!terms) {
      setDonateDisabled(false);
      setShowTermsConditionModal(true);
      return;
    }
    if (
      parseFloat(inputAmount) < minimumContributionAmount ||
      isNaN(parseFloat(inputAmount))
    ) {
      console.log(
        `The minimum donation amount is ${minimumContributionAmount}.`,
      );
      setDonateDisabled(false);

      return;
    }
    if (parseFloat(inputAmount) > userDonationCap) {
      console.log('The donation amount exceeds the cap limit.');
      setshowUserCapModal(true);
      setDonateDisabled(false);
      return;
    }
    if (!terms) {
      console.log('Please accept the terms and conditions.');
      setDonateDisabled(false);
      return;
    }
    if (parseFloat(inputAmount) > remainingDonationAmount) {
      console.log('Input amount will exceed the round cap');
      setDonateDisabled(false);
      return;
    }
    if (parseFloat(inputAmount) > tokenDetails.formattedBalance) {
      console.log('Input amount is more than available balance');
      setDonateDisabled(false);
      return;
    }

    handleDonate();
  };

  useEffect(() => {
    const fetchData = async () => {
      if (projectData) {
        await updatePOLCap();
        await getDonationCap();
      }
    };

    fetchData();
  }, [
    projectData,
    activeRoundDetails,
    remainingDonationAmount,
    maxPOLCap,
    progress,
    selectedToken,
    handleDonateClick,
  ]);

  useEffect(() => {
    if (isConnected && chain?.id !== SUPPORTED_CHAIN.id) {
      switchChain({ chainId: SUPPORTED_CHAIN.id });
    }
  }, [isConnected]);

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
    message: `Season 2 tokens are locked for 1 year with a 6 month cliff. Tokens are locked completely for 6 months, and then unlocked gradually in a 6 month stream. `,
    toolTip:
      'Tokens are locked for a period of time followed by an unlock stream over another period of time. The cliff is when tokens begin to unlock, in a stream, until the last day of the schedule.',
  });

  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    status,
  } = useWaitForTransactionReceipt({
    hash,
  });

  // useEffect(() => {
  //   if (hash !== undefined && donationId === 0) {
  //     setIsConfirming(true);
  //   } else {
  //     setIsConfirming(false);
  //   }
  // }, [isConfirming, setIsConfirming, hash, donationId]);

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
  }, [address, tokenAddress, selectedToken]);

  // if user allready accepted terms and conditions set it to true
  // useEffect(() => {
  //   if (user && user.acceptedToS) {
  //     setTerms(true);
  //   }
  // }, [user]);

  useEffect(() => {
    // Update donateDisabled based on conditions
    if (
      // !terms ||
      !isConnected ||
      !(
        (parseFloat(inputAmount) >= minimumContributionAmount)
        // &&
        // parseFloat(inputAmount) <= userDonationCap
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
    if (projectData?.seasonNumber === 1) {
      const message =
        'Season 1 tokens are locked for 10 months with a 6 month cliff. Tokens are locked completely for 5 months, and then unlocked gradually in a 5 month stream. The shorter vesting is to ensure  tokens nought through q/acc always unlock before the Project’s vesting completes.';
      const toolTip =
        'Tokens are locked for a period of time followed by an unlock stream over another period of time. The cliff is when tokens begin to unlock, in a stream, until the last day of the schedule.';

      setTokenSchedule({ message, toolTip });
    }
  }, [projectData]);

  const { data: noramalTransferTx, sendTransactionAsync } =
    useSendTransaction();

  useEffect(() => {
    const saveDonation = async () => {
      if (isConfirmed && !hasSavedDonation) {
        const token = config.ERC_TOKEN_SYMBOL;

        if (isSquidTransaction) {
          const swapData: SwapData = {
            squidRequestId: squidTransactionRequest?.requestId,
            firstTxHash: hash!,
            fromChainId: Number(selectedChain.id),
            toChainId: Number(137),
            fromTokenAddress: selectedToken.address,
            toTokenAddress: tokenAddress,
            fromAmount: parseFloat(inputAmount),
            toAmount: parseFloat(inputAmount),
            fromTokenSymbol: selectedToken.symbol,
            toTokenSymbol: config.ERC_TOKEN_SYMBOL,
          };

          const amountInPOL = await convertToPOLAmount(
            selectedToken,
            parseFloat(inputAmount),
          );

          handleSaveDonation({
            projectId: parseInt(projectData?.id),
            transactionNetworkId: 137, //chain?.id,
            amount: amountInPOL,
            token,
            transactionId: hash,
            tokenAddress,
            swapData,
            fromTokenAmount: parseFloat(inputAmount),
          });
        } else {
          handleSaveDonation({
            projectId: parseInt(projectData?.id),
            transactionNetworkId: 137, //chain?.id,
            amount: parseFloat(inputAmount),
            token,
            transactionId: hash,
            tokenAddress,
            fromTokenAmount: parseFloat(inputAmount),
          });
        }

        setHasSavedDonation(true);
      }
    };

    saveDonation();
  }, [isConfirmed, hasSavedDonation]);

  const getTokenDetails = async () => {
    if (!address) return;
    // const data = await fetchTokenDetails({
    //   tokenAddress,
    //   address,
    //   client,
    // });
    const data = await fetchBalanceWithDecimals(
      selectedToken.address as `0x${string}`,
      address,
    );
    setTokenDetails(data);
  };

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    const regex = /^\d*\.?\d{0,5}$/;

    if (regex.test(value)) {
      const inputAmount = parseFloat(value);
      if (activeRoundDetails) {
        if (
          inputAmount > activeRoundDetails?.cumulativePOLCapPerUserPerProject
        ) {
          return; // Exit without updating the input
        }
      }

      setInputAmount(value);

      if (inputAmount < minimumContributionAmount) {
        setInputErrorMessage(
          `Minimum contribution: ${minimumContributionAmount} POL`,
        );
        return;
      } else {
        setInputErrorMessage(null);
      }
      if (inputAmount > tokenDetails.formattedBalance) {
        setInputBalanceError(true);
        return;
      } else {
        setInputBalanceError(false);
      }

      const fromAmount = convertToTokenUnits(
        inputAmount.toString(),
        selectedToken.decimals || 18,
      );

      // param for getting route of transaction
      const params = {
        fromAddress: address,
        fromChain: selectedChain.id,
        fromToken: selectedToken.address,
        fromAmount: fromAmount,
        toChain: '137',
        toToken: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
        toAddress: projectData?.addresses[0].address, // '0x4ce6B0F604E1036AFFD0826764b51Fb72310964c',
        quoteOnly: false,
      };

      const debouncedGetRoute = debounce(async () => {
        try {
          const routeResult = await getRoute(params);
          const route = routeResult.data.route;
          setSquidTransactionRequest(route.transactionRequest);
        } catch (error) {
          setFlashMessage('No route round');
          console.error('Error fetching route:', error);
        } finally {
          setSquidRouteLoading(false);
        }
      }, 1500);

      console.log(selectedToken, selectedChain);

      if (
        selectedToken.address ===
          '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee' &&
        selectedChain.id === '137'
      ) {
        return;
      } else {
        setSquidRouteLoading(true);
        debouncedGetRoute();
      }
    }
  };

  const handleSaveDonation = async ({
    projectId,
    transactionNetworkId,
    amount,
    token,
    transactionId,
    tokenAddress,
    swapData,
    fromTokenAmount,
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
        swapData,
        fromTokenAmount,
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
    setIsButtonLoading(true);
    try {
      await createDraftDonation(
        parseInt(projectData?.id),
        137,
        parseFloat(inputAmount),
        config.ERC_TOKEN_SYMBOL,
        projectData?.addresses[0].address,
        selectedToken.address,
        parseFloat(inputAmount),
      );

      if (
        selectedToken.address ===
          '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee' &&
        selectedChain.id === '137'
      ) {
        await handleNormalTranfer();
        console.log("handle normal transfeer'");
      } else {
        await handleApproveSpendingAndSendTransaction();
      }
    } catch (ContractFunctionExecutionError) {
      setFlashMessage('An error occurred.');
      console.log(ContractFunctionExecutionError);
      setDonateDisabled(false);
      setIsButtonLoading(false);
    } finally {
      setIsButtonLoading(false);
    }
  };

  useEffect(() => {
    if (noramalTransferTx) {
      setHash(noramalTransferTx);
      console.log('Transaction hash updated:', noramalTransferTx);
    }
  }, [noramalTransferTx]);

  const handleNormalTranfer = async () => {
    try {
      const to = projectData?.addresses[0].address; // '0x2E555fCf3A9a91C2971C6205D3f8F42Cbbfc9d5A' as `0x${string}`;
      const value = inputAmount;
      await sendTransactionAsync({ to, value: parseEther(value) });
    } catch (e) {
      setInputAmount('');
      setSquidTransactionRequest(null);
      setIsButtonLoading(false);
      console.log('Error in normal tx ', e);
    } finally {
    }
  };

  const handleApproveSpendingAndSendTransaction = async () => {
    try {
      const signer = await getEthersSigner();

      const amount = convertToTokenUnits(inputAmount, selectedToken.decimals);

      // approve from user to user their token
      await approveSpending(
        squidTransactionRequest?.target,
        selectedToken.address,
        amount,
      );

      const tx = await signer.sendTransaction({
        to: squidTransactionRequest.target,
        data: squidTransactionRequest.data,
        value: squidTransactionRequest.value,
        // gasPrice: (await provider.getFeeData()).gasPrice,
        gasLimit: squidTransactionRequest.gasLimit,
      });
      console.log(tx.hash);
      console.log('Tx Request', squidTransactionRequest);
      setIsSquidTransaction(true);
      setHash(tx.hash as `0x${string}`);
      const txReceipt = await tx.wait();
      console.log(txReceipt);
    } catch (e) {
      setSquidTransactionRequest(null);
      setInputAmount('');
      setIsButtonLoading(false);
      console.log('Error in Approve or sending tx ', e);
    }
  };

  const handleRefetch = async () => {
    await getTokenDetails();
    console.log('Refetched', parseFloat(tokenDetails.formattedBalance));
  };

  const handlePercentageClick = (percentage: number) => {
    setSelectedPercentage((prevSelected): any => {
      if (prevSelected === percentage) {
        setInputAmount('');
        setInputBalanceError(false);
        return null;
      } else {
        const remainingBalance = tokenDetails?.formattedBalance;

        const amount =
          (Math.min(remainingBalance, userDonationCap) * percentage) / 100;
        const formattedAmount = Math.min(amount, userDonationCap).toFixed(2);

        setInputAmount(formattedAmount);
        // setUserDonationCapError(userDonationCap === 0);
        // setInputBalanceError(remainingBalance === 0);

        return percentage;
      }
    });
  };

  const handleRemainingCapClick = () => {
    const remainingBalance = floor(tokenDetails?.formattedBalance);
    setInputAmount(Math.min(remainingBalance, userDonationCap).toString());
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
      <ZkidEligibilityModal
        isOpen={showZkidModal}
        onClose={() => setShowZkidModal(false)}
      />
      <TermsConditionModal
        isOpen={showTermsConditionModal}
        onClose={() => setShowTermsConditionModal(false)}
      />
      <SelectChainModal
        isOpen={showChainTokenModal}
        onClose={() => setShowChainTokenModal(false)}
        onSelection={handleChainTokenSelection}
      />
      <UserCapUpdateModal
        isOpen={showUserCapModal}
        onClose={() => setshowUserCapModal(false)}
        userDonationCap={userDonationCap}
        selectedTokenSymbol={selectedToken.symbol}
      />
      <div className='container w-full flex  flex-col lg:flex-row gap-10 '>
        <div className='p-6 lg:w-2/3 flex flex-col gap-8 bg-white rounded-2xl shadow-[0px 3px 20px 0px rgba(212, 218, 238, 0.40)] font-redHatText'>
          <EligibilityCheckToast />
          <div className='flex flex-col md:flex-row  font-redHatText gap-4'>
            <div className='flex  justify-between p-2 w-fit md:w-2/3 lg:w-fit bg-[#EBECF2]  rounded-lg text-[#1D1E1F] items-center'>
              <span
                className={`flex gap-2 items-center  ${inputBalanceError ? 'text-[#E6492D]' : 'text-black'} `}
              >
                Available in your wallet:
                <span className='font-medium'>
                  {!tokenDetails
                    ? 'Loading...'
                    : `${formatBalance(Number(tokenDetails?.formattedBalance))} ${selectedToken?.symbol}`}
                </span>
                <button onClick={handleRefetch}>
                  <IconRefresh size={16} />
                </button>
              </span>
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
            <div className='border rounded-lg flex relative  '>
              <div
                className='md:w-[40%] flex gap-4 p-4 border  justify-between items-center cursor-pointer'
                onClick={() => setShowChainTokenModal(true)}
              >
                <div className='flex gap-2 items-center'>
                  <div className='flex relative px-2'>
                    <div className='flex items-center'>
                      <div className='w-6 h-6  absolute right-6 p-[2px] bg-[#F7F7F9] rounded-full'>
                        <img
                          className='rounded-full  w-full'
                          src={
                            selectedChain?.imageUrl || POLYGON_POS_CHAIN_IMAGE
                          }
                          alt='Chain Logo'
                        />
                      </div>
                      <div className='w-6 h-6 z-10 p-[2px] bg-[#F7F7F9] rounded-full'>
                        <img
                          className='rounded-full  w-full'
                          src={
                            selectedToken?.logoURI || POLYGON_POS_CHAIN_IMAGE
                          }
                          alt='Token Logo'
                        />
                      </div>
                    </div>
                  </div>

                  <h1 className=' font-medium text-[#1D1E1F] font-redHatText'>
                    {selectedToken?.symbol}
                  </h1>
                </div>
                <div>
                  <svg
                    width='16'
                    height='16'
                    viewBox='0 0 16 16'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M4.14279 6.126L7.55548 10.7619C7.61049 10.8366 7.67873 10.8965 7.75551 10.9376C7.8323 10.9787 7.91581 11 8.00032 11C8.08483 11 8.16835 10.9787 8.24513 10.9376C8.32191 10.8965 8.39015 10.8366 8.44516 10.7619L11.8579 6.126C12.1835 5.6835 11.9135 5 11.413 5H4.58665C4.08614 5 3.81612 5.6835 4.14279 6.126Z'
                      fill='#1D1E1F'
                    />
                  </svg>
                </div>
              </div>
              <input
                onChange={handleInputChange}
                value={inputAmount}
                type='number'
                disabled={isConfirming}
                className='w-full  text-sm  md:text-base border rounded-r-lg  px-4'
                onWheel={(e: any) => e.target.blur()}
              />

              <span className='absolute text-sm  md:text-base top-0 right-0 h-full flex items-center pr-5 text-gray-400 pointer-events-none'>
                ~ ${' '}
                {inputAmount === ''
                  ? 0
                  : formatAmount(
                      round(
                        parseFloat(inputAmount) *
                          Number(selectedToken.usdPrice),
                      ),
                    )}
              </span>
            </div>
            {/* Avaliable token */}
            <div className='flex md:flex-row flex-col justify-between'>
              <div className='flex gap-1'>
                {/* <span className='text-sm'>Available: 85000 MATIC</span> */}
                <div
                  className={` flex  font-redHatText     ${userDonationCapError ? 'text-[#E6492D]' : 'text-black'}`}
                >
                  Your remaining cap for this project:&nbsp;
                  <span
                    onClick={handleRemainingCapClick}
                    className='font-medium cursor-pointer  flex gap-2 hover:underline'
                  >
                    {userDonationCap !== null && userDonationCap !== undefined
                      ? formatAmount(Math.floor(userDonationCap * 100) / 100)
                      : '---'}{' '}
                    {selectedToken?.symbol}
                    <div className='relative group'>
                      <IconTokenSchedule />
                      <div className='absolute w-[200px] z-50 mb-2 left-[-60px] hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2'>
                        Caps are set at the start of the round in POL.
                      </div>
                    </div>
                  </span>
                </div>
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
                    {formatBalance(minimumContributionAmount || 20)}{' '}
                    {selectedToken.symbol}
                  </span>
                </h2>
              </div>
            </div>
          </div>

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
              disabled={!isConnected || donateDisabled || squidRouteLoading}
              loading={isConfirming || squidRouteLoading || isButtonLoading}
              color={ButtonColor.Giv}
              className='text-white justify-center'
            >
              {isConnected
                ? squidRouteLoading
                  ? 'Getting Swap Routes'
                  : 'Buy Token'
                : 'Connect Wallet'}
            </Button>
            <FlashMessage
              message={flashMessage}
              onClose={() => setFlashMessage('')}
            />
          </div>
          <div className='flex flex-col gap-4'>
            {/* Terms of Service */}
            {/* <label className='flex gap-2 items-center p-4 bg-[#EBECF2] rounded-2xl w-full cursor-pointer'>
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
            </label> */}

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
                  By checking this, we won't show your name and profile
                  information associated with this contribution on public pages.
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

          {/* <div className='flex flex-col gap-2  px-4 py-4 bg-[#F7F7F9] rounded-lg'>
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
          </div> */}

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

            {/* <div className='flex justify-between gap-1'>
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
            </div> */}

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
            projectTitle={projectData?.title}
          />
        </div>
      )}
    </div>
  );
};

export default DonatePageBody;
