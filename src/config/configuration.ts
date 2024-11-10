import development from './development';
import production from './production';

export const isProduction = process.env.NEXT_PUBLIC_ENV === 'production';
export const isProductReleased =
  process.env.NEXT_PUBLIC_IS_PRODUCT_RELEASE === 'true';
export const isEarlyAccessBranch =
  process.env.NEXT_PUBLIC_EARLY_ACCESS_BRANCH === 'true';

console.log('config-isProductReleased', isProductReleased);
console.log('config-isProduction', isProduction);
console.log('config-isEarlyAccessBranch', isEarlyAccessBranch);

if (!isProduction) {
  console.log('Running in development mode');
}

const envConfig = isProduction ? production : development;
const config = {
  ...envConfig,
};

export default config;
