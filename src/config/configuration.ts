import development from './development';
import production from './production';

export const isProduction = process.env.NEXT_PUBLIC_ENV === 'production';
export const isProductReleased =
  process.env.NEXT_PUBLIC_IS_PRODUCT_RELEASE === 'true';

console.log('isProductReleased', isProductReleased);
console.log('isProduction', isProduction);

if (!isProduction) {
  console.log('Running in development mode');
}

const envConfig = isProduction ? production : development;
const config = {
  ...envConfig,
};

export default config;
