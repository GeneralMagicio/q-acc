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

console.log('config-isProductReleased', isProductReleased);
console.log('config-isProduction', isProduction);
console.log('config-isEarlyAccessBranch', isEarlyAccessBranch);
console.log('isCountryRestrictionEnabled', isCountryRestrictionEnabled);

if (!isProduction) {
  console.log('Running in development mode');
}

const envConfig = isProduction ? production : development;
const config = {
  LOW_CAP_TEXT: 'approximately $1,000 denominated in POL',
  HIGH_CAP_TEXT: 'approximately $15,000 denominated in POL',
  ...envConfig,
};

export default config;
