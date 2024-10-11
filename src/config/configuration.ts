import development from './development';
import production from './production';

export const isProduction = process.env.NEXT_PUBLIC_ENV === 'production';

if (!isProduction) {
  console.log('Running in development mode');
}

const envConfig = isProduction ? production : development;
const config = {
  ...envConfig,
};

export default config;
