import development from './development';
import production from './production';

export const isProduction = true;
export const isProductReleased = false;
export const isEarlyAccessBranch = false;

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
