import React, { useEffect, useState } from 'react';
import { useAccount, useSwitchChain } from 'wagmi';
import { IconX } from '../Icons/IconX';
import { IconArrowRight } from '../Icons/IconArrowRight';
import { IconSearch } from '../Icons/IconSearch';
import { fetchEVMTokenBalances, formatBalance } from '@/helpers/token';
import { Spinner } from '../Loading/Spinner';
import { IconArrowLeft } from '../Icons/IconArrowLeft';
import config from '@/config/configuration';
import { SquidTokenType } from '@/helpers/squidTransactions';
import { useFetchChainsFromSquid } from '@/hooks/useFetchChainsFromSquid';

export const POLYGON_POS_CHAIN_ID = '137';
export const POLYGON_POS_CHAIN_IMAGE =
  'https://raw.githubusercontent.com/0xsquid/assets/main/images/chains/polygon.svg';

const headers = {
  'x-integrator-id': config.SQUID_INTEGRATOR_ID,
};

const SelectChainModal = ({
  isOpen,
  onClose,
  closeable = true,
  onSelection = (chainId: any, tokenAddress: string) => {},
}: any) => {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [tokenLoading, setTokenLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [chainData, setChainData] = useState<any[]>([]);
  const [tokenData, setTokenData] = useState<any[]>([]);
  const [selectedChain, setSelectedChain] = useState<{
    id: string | null;
    imageUrl: string;
  }>({
    id: POLYGON_POS_CHAIN_ID,
    imageUrl: POLYGON_POS_CHAIN_IMAGE,
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [chainSearchTerm, setChainSearchTerm] = useState('');
  const [hideZeroBalance, setHideZeroBalance] = useState(false);
  const [showAllNetworks, setShowAllNetworks] = useState(false);
  const { address } = useAccount();
  const { switchChain } = useSwitchChain();
  const { data: chainsData } = useFetchChainsFromSquid();

  useEffect(() => {
    try {
      const evmChains = chainsData.chains.filter(
        (chain: any) =>
          chain.type === 'evm' && chain.chainId !== POLYGON_POS_CHAIN_ID,
      );
      evmChains.sort((a: any, b: any) => {
        if (a.chainId === POLYGON_POS_CHAIN_ID) return -1;
        if (b.chainId === POLYGON_POS_CHAIN_ID) return 1;
        return 0;
      });
      setChainData(evmChains);

      // Set Polygon PoS as the default selected chain
      const polygonChain = evmChains.find(
        (chain: any) => chain.chainId === POLYGON_POS_CHAIN_ID,
      );
      if (polygonChain) {
        setSelectedChain({
          id: polygonChain.chainId,
          imageUrl: polygonChain.chainIconURI,
        });
      }

      setLoading(false);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  }, [chainsData.chains]);

  useEffect(() => {
    if (!selectedChain || !address) {
      console.log('No address or chain found');
      return;
    }

    setTokenLoading(true);
    const fetchToken = async () => {
      try {
        setTokenLoading(true);

        // Single API call for the selected chain
        const tokenResponse = await fetch(
          `https://v2.api.squidrouter.com/v2/tokens?chainId=${selectedChain.id}`,
          {
            headers: headers,
          },
        );

        const tokenData = await tokenResponse.json();
        const tokenWithBalances = await fetchEVMTokenBalances(
          tokenData.tokens,
          address,
        );

        const sortedTokens = tokenWithBalances.sort(
          (a, b) => b.balance - a.balance,
        );

        // Update state with the token data for selected chain
        setTokenData(sortedTokens);
      } catch (error) {
        console.error('Error fetching tokens:', error);
      } finally {
        setTokenLoading(false);
      }
    };

    fetchToken();
  }, [selectedChain, address]);

  const displayedNetworks = chainData.slice(0, 11);
  const remainingNetworksCount = Math.max(0, chainData.length - 11);

  const filteredTokens =
    selectedChain && tokenData
      ? tokenData.filter(
          (token: SquidTokenType) =>
            token.symbol.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (!hideZeroBalance || (token.balance ?? 0) > 0),
        )
      : [];

  const filteredChains = chainData.filter((chain: any) =>
    chain.networkName.toLowerCase().includes(chainSearchTerm.toLowerCase()),
  );

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (isOpen && mounted) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, mounted]);

  if (error) {
    return <div className='p-4 text-red-500'>Error: {error}</div>;
  }

  if (!mounted || !isOpen) return null;

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-50 backdrop-blur'
      onClick={e => {
        e.stopPropagation();
        closeable && onClose();
      }}
    >
      <div
        className={`bg-white w-full max-h-[100vh] overflow-x-hidden overflow-y-auto relative p-4 md:max-h-[90vh] md:rounded-xl md:shadow-lg md:max-w-[650px] md:p-6 font-redHatText`}
        onClick={e => e.stopPropagation()} // Prevent modal content clicks from propagating
      >
        <div className='flex gap-4  items-center justify-between pb-4'>
          <div className=' flex gap-4 items-center'>
            {showAllNetworks && (
              <button onClick={() => setShowAllNetworks(false)}>
                <IconArrowLeft />
              </button>
            )}

            <h2 className='text-base font-semibold text-[#1D1E1F] leading-6 '>
              {showAllNetworks
                ? 'Select a Chain'
                : 'Select chain & token to continue'}
            </h2>
          </div>

          <button onClick={onClose}>
            <IconX size={14} />
          </button>
        </div>

        {!showAllNetworks ? (
          <div className=' flex flex-col gap-5 font-redHatText '>
            <div className='grid grid-flow-row-dense  grid-cols-6 sm:grid-cols-9  gap-3'>
              <div
                className={`col-span-1 sm:col-span-4 h-[50px] flex py-[3px] px-2 justify-start cursor-pointer items-center border rounded-lg gap-2 ${POLYGON_POS_CHAIN_ID === selectedChain.id ? ' border-2 border-[#754DFF] bg-[#F6F3FF]' : ''} `}
                onClick={() => {
                  switchChain({ chainId: Number(POLYGON_POS_CHAIN_ID) });
                  setSelectedChain({
                    id: POLYGON_POS_CHAIN_ID,
                    imageUrl: POLYGON_POS_CHAIN_IMAGE,
                  });
                }}
              >
                <img
                  className='rounded-full'
                  src='https://raw.githubusercontent.com/0xsquid/assets/main/images/chains/polygon.svg'
                  alt='ETH Logo'
                  width='32'
                  height='32'
                />
                <div className='sm:flex flex-col gap justify-start items-start  hidden'>
                  <span className='font-medium text-[#4F576A] text-sm'>
                    Polygon
                  </span>
                  <span className='text-[#82899A] text-sm'>
                    Save more on gas fees!
                  </span>
                </div>
              </div>

              {displayedNetworks.map(chain => (
                <div
                  key={chain.chainId}
                  className={`flex p-2 gap-2 items-center border w-[50px] h-[50px] rounded-lg justify-center   cursor-pointer ${chain.chainId === selectedChain.id ? ' border-2 border-[#754DFF] bg-[#F6F3FF]' : ''}  `}
                  onClick={() => {
                    switchChain({ chainId: Number(chain.chainId) });
                    setSelectedChain({
                      id: chain.chainId,
                      imageUrl: chain.chainIconURI,
                    });
                  }}
                >
                  <img
                    className='rounded-full'
                    src={chain.chainIconURI}
                    alt='ETH Logo'
                    width={32}
                    height={32}
                  />
                </div>
              ))}

              {!showAllNetworks && (
                <div
                  className='col-span-3 border flex px-3 py-3 items-center justify-center gap-2 rounded-lg cursor-pointer hover:bg-gray-50'
                  onClick={() => setShowAllNetworks(true)}
                >
                  <span className='font-semibold text-[#4F576A] text-sm leading-5'>
                    +{remainingNetworksCount} Network
                  </span>
                  <IconArrowRight size={24} color='#1D1E1F' />
                </div>
              )}
            </div>

            <div className='relative'>
              <input
                className='w-full pl-4 pr-12 py-2 text-base bg-transparent border-2 border-neutral-300 rounded-lg focus:outline-none'
                placeholder='Search name or paste an address'
                name={''}
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
              <div className='absolute top-3 right-3 border-l border-neutral-300 pl-2 pt-0.5'>
                <IconSearch color='#A5ADBF' />
              </div>
              <div className='flex items-center gap-2 my-3'>
                <input
                  type='checkbox'
                  onChange={() => setHideZeroBalance(prev => !prev)}
                  checked={hideZeroBalance}
                />
                <span className='text-xs text-[#82899A] font-medium'>
                  Hide 0 balance tokens
                </span>
              </div>
              <div className='flex flex-col gap-3 max-h-[300px] overflow-y-auto'>
                {selectedChain && tokenLoading ? (
                  <h1 className=' flex justify-center'>
                    <Spinner />
                  </h1>
                ) : (
                  filteredTokens.map((token: SquidTokenType) => (
                    <div
                      key={token.address}
                      onClick={() => {
                        onSelection(selectedChain, token); // Call the callback
                        onClose();
                      }}
                      className='flex px-2 py-1  gap-4 items-center cursor-pointer hover:border-2 border-2 border-transparent  hover:border-[#754DFF] rounded-lg hover:bg-[#F6F3FF]'
                    >
                      <div className='flex items-center gap-3'>
                        <img
                          className='rounded-full'
                          src={token.logoURI}
                          alt={token.symbol}
                          width={32}
                          height={32}
                        />
                      </div>

                      <div className='flex justify-between flex-[1_0_0] items-center font-redHatText'>
                        <div className='flex gap-2 items-center'>
                          <div className='font-medium text-[#4F576A] leading-5 text-sm'>
                            {token.symbol}
                          </div>
                          <div className='text-sm text-[#82899A] leading-5'>
                            {token.name}
                          </div>
                        </div>
                        <div className='flex px-2 py-[2px] gap-2 bg-[#EBECF2] rounded-lg'>
                          <span className='text-[#4F576A] font-medium leading-5 text-sm'>
                            {/* {token.balance?.toFixed(6) || '0.00'} */}
                            {formatBalance(token.balance)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className='relative'>
              <div>
                <input
                  className='w-full pl-4 pr-12 py-2 text-base bg-transparent border-2 border-neutral-300 rounded-lg focus:outline-none my-3'
                  placeholder='Search by chain name'
                  name={''}
                  value={chainSearchTerm}
                  onChange={e => setChainSearchTerm(e.target.value)}
                />
                <div className='absolute top-6 right-3 border-l border-neutral-300 pl-2 pt-0.5'>
                  <IconSearch color='#A5ADBF' />
                </div>
              </div>
              <div
                className={`w-full flex p-2 cursor-pointer items-center border rounded-lg gap-2 my-3 `}
                onClick={() => {
                  switchChain({ chainId: 137 });
                  setSelectedChain({ id: POLYGON_POS_CHAIN_ID, imageUrl: '' });
                  setShowAllNetworks(false);
                }}
              >
                <img
                  className='rounded-full'
                  src='https://raw.githubusercontent.com/0xsquid/assets/main/images/chains/polygon.svg'
                  alt='ETH Logo'
                  width='32'
                  height='32'
                />
                <div className='flex flex-col gap'>
                  <span className='font-medium text-[#4F576A] text-sm'>
                    Polygon
                  </span>
                  <span className='text-[14px] text-[#82899A] text-sm'>
                    Save more on gas fees!
                  </span>
                </div>
              </div>
              <div className='flex flex-col gap-3  max-h-[500px] overflow-y-auto'>
                {filteredChains.map((chain: any) => (
                  <div
                    key={chain.chainId}
                    onClick={() => {
                      switchChain({ chainId: Number(chain.chainId) });
                      setSelectedChain({
                        id: chain.chainId,
                        imageUrl: chain.chainIconURI,
                      });
                      setShowAllNetworks(false);
                    }}
                    className='w-full justify-between h-auto '
                  >
                    <div
                      className={`flex items-center gap-2 p-2 flex-[1_0_0] cursor-pointer border-2  border-transparent hover:border-[#754DFF] rounded-lg hover:bg-[#F6F3FF] `}
                    >
                      <img
                        className='rounded-full'
                        src={chain.chainIconURI}
                        alt={chain.networkName}
                        width={32}
                        height={32}
                      />
                      <div className=''>
                        <div className='text-sm text-muted-foreground'>
                          {chain.networkName}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectChainModal;
