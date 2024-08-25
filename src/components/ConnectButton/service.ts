import { requestGraphQL } from "@/helpers/request";
import { Address } from "viem";
import { GET_USER_BY_ADDRESS, GET_GIVETH_USER_BY_ADDRESS } from "./query";
import config from "@/config/configuration";
import { IGivethUser, IUser } from "./type";

export const fetchUserInfo = async (address: Address) => {
  try {
    const res = await requestGraphQL<{ userByAddress: IUser }>(
      GET_USER_BY_ADDRESS,
      { address }
    );
    return res?.userByAddress;
  } catch (error) {
    console.error(error);
  }
};

export const fetchGivethUserInfo = async (address: Address) => {
  try {
    const res = await requestGraphQL<{ userByAddress: IGivethUser }>(
      GET_GIVETH_USER_BY_ADDRESS,
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
