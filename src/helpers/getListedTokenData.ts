import { Contract, formatUnits, JsonRpcProvider, ZeroAddress } from 'ethers';
import ALGEBRA_POOL_ABI from './ALGEBRA_POOL_ABI';
import ALGEBRA_CORE_FACTORY_ABI from './ALGEBRA_CORE_FACTORY_ABI';
import config from '@/config/configuration';

const provider = new JsonRpcProvider(config.NETWORK_RPC_ADDRESS);

let poolAddressCache: { [key: string]: string } = {};

export const ALGEBRA_CONTRACTS = {
  core: '0x411b0fAcC3489691f28ad58c47006AF5E3Ab3A28',
  poolDeployer: '0x2D98E2FA9da15aa6dC9581AB097Ced7af697CB92',
  quoter: '0xa15F0D7377B2A0C0c10db057f641beD21028FC89',
  swapRouter: '0xf5b509bB0909a69B1c207E495f687a596C168E12',
  nonFungiblePositionManager: '0x8eF88E4c7CfbbaC1C163f7eddd4B578792201de6',
  multicall: '0x6ccb9426CeceE2903FbD97fd833fD1D31c100292',
  migrator: '0x157B9913E00204f8c980bb00aa62E22b0dAb1a63',
  realStaker: '0x32CFF674763b06B983C0D55Ef2e41B84D16855bb',
  finiteFarming: '0x9923f42a02A82dA63EE0DbbC5f8E311e3DD8A1f8',
  infiniteFarming: '0x8a26436e41d0b5fc4C6Ed36C1976fafBe173444E',
  farmingCenter: '0x7F281A8cdF66eF5e9db8434Ec6D97acc1bc01E78',
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
