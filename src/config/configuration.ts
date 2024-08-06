import development from "./development";
import production from "./production";

export const isProduction = process.env.NEXT_PUBLIC_ENV === "production";

const envConfig = isProduction ? production : development;
const config = {
  ...envConfig,
  SCAN_URL: "https://etherscan.io/",
};

export default config;
