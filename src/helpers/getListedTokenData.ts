import { Contract, formatUnits, JsonRpcProvider, ZeroAddress } from 'ethers';
import ALGEBRA_POOL_ABI from './ALGEBRA_POOL_ABI';
import ALGEBRA_CORE_FACTORY_ABI from './ALGEBRA_CORE_FACTORY_ABI';
import config from '@/config/configuration';

const provider = new JsonRpcProvider(config.NETWORK_RPC_ADDRESS);

let poolAddressCache: { [key: string]: string } = {};

export const ALGEBRA_CONTRACTS = {
  core: '0x4B9f4d2435Ef65559567e5DbFC1BbB37abC43B57',
  poolDeployer: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
  quoter: '0x55BeE1bD3Eb9986f6d2d963278de09eE92a3eF1D',
  swapRouter: '0xF6Ad3CcF71Abb3E12beCf6b3D2a74C963859ADCd',
  nonFungiblePositionManager: '0xd8E1E7009802c914b0d39B31Fc1759A865b727B1',
  multicall: '0x61530d6E1c7A47BBB3e48e8b8EdF7569DcFeE121',
  migrator: '0x4aE2bD0666c76C7f39311b9B3e39b53C8D7C43Ea',
  finiteFarming: '0x17bE2Ed4409d8e6c22d46dE599f7C9Af40bD0759',
  infiniteFarming: '0x1fd3f47B363f5b844eD7B7FAB6ceb679A367621E',
  farmingCenter: '0x481FcFa00Ee6b2384FF0B3c3b5b29aD911c1AAA7',
};

export function calculatePriceFromTick(tick: bigint): bigint {
  const priceNum = Math.pow(1.0001, Number(tick));
  return BigInt(Math.floor(priceNum * 1e18));
}

export async function getCurrentTickByPoolAddress(poolAddress: string) {
  try {
    if (!poolAddress) throw new Error('Pool address is required.');

    const poolContract = new Contract(poolAddress, ALGEBRA_POOL_ABI, provider);
    const globalState = await poolContract.globalState();

    const sqrtPriceX96: bigint = globalState.price;
    const currentTick: bigint = globalState.tick;

    return currentTick;
  } catch (error) {
    console.error('Error fetching current tick by pool address:', error);
    throw error;
  }
}

export async function getPoolAddressByPair(
  tokenABC: string,
  tokenPOL: string,
): Promise<{ price: string; isListed: boolean }> {
  try {
    // Check if the pool address is cached
    const cacheKey = `${tokenABC}-${tokenPOL}`;
    if (poolAddressCache[cacheKey]) {
      const currentTick = await getCurrentTickByPoolAddress(
        poolAddressCache[cacheKey],
      );
      const currentPrice = calculatePriceFromTick(currentTick);

      return {
        price: formatUnits(currentPrice, 18),
        isListed: true,
      };
    }
    const coreFactoryContract = new Contract(
      ALGEBRA_CONTRACTS.core,
      ALGEBRA_CORE_FACTORY_ABI,
      provider,
    );

    // Fetch the pool address
    const poolAddress = await coreFactoryContract.poolByPair(
      tokenABC,
      tokenPOL,
    );

    // Validate if a pool exists
    const isListed = poolAddress !== ZeroAddress;

    if (!isListed) {
      console.log('token abc pool not found', tokenABC);
      return { price: '0', isListed: false };
    }

    // Cache the pool address
    poolAddressCache[cacheKey] = poolAddress;

    const currentTick = await getCurrentTickByPoolAddress(poolAddress);

    const currentPrice = calculatePriceFromTick(currentTick);
    const formattedPrice = formatUnits(currentPrice, 18);

    return {
      price: formattedPrice,
      isListed: true,
    };
    // return poolAddress;
  } catch (error) {
    console.error('Error fetching pool by pair:', error);
    throw error;
  }
}
