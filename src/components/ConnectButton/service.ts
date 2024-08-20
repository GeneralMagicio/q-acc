import { requestGraphQL } from "@/helpers/request";
import { Address } from "viem";
import { GET_USER_BY_ADDRESS } from "./query";
import config from "@/config/configuration";

export const fetchUserInfo = async (address: Address) => {
  try {
    const res = await requestGraphQL<{ userByAddress: IUser }>(
      GET_USER_BY_ADDRESS,
      { address },
      {
        url: config.GIVETH_GQL_ENDPOINT,
      }
    );
    return res?.userByAddress;
  } catch (error) {
    console.error(error);
  }
};
