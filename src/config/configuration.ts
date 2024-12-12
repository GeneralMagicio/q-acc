import development from './development';
import production from './production';

export const isProduction = process.env.NEXT_PUBLIC_ENV === 'production';
export const isProductReleased =
  process.env.NEXT_PUBLIC_IS_PRODUCT_RELEASE === 'true';
export const isEarlyAccessBranch =
  process.env.NEXT_PUBLIC_EARLY_ACCESS_BRANCH === 'true';
export const isCountryRestrictionEnabled =
  process.env.NEXT_PUBLIC_RESTRICT_FEATURE_FLAG === 'true';
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
export const isAllocationDone =
  process.env.NEXT_PUBLIC_IS_ALLOCATION_DONE === 'true';

console.log('config-isProductReleased', isProductReleased);
console.log('config-isProduction', isProduction);
console.log('config-isEarlyAccessBranch', isEarlyAccessBranch);
console.log('isCountryRestrictionEnabled', isCountryRestrictionEnabled);

if (!isProduction) {
  console.log('Running in development mode');
}

const envConfig = isProduction ? production : development;
const config = {
  LOW_CAP_TEXT: '1,356 POL',
  HIGH_CAP_TEXT: '20,341 POL',
  ...envConfig,
};

export default config;
