import { fetchGraphQL } from "@/helpers/request";
import { Address } from "viem";
import { GET_USER_BY_ADDRESS } from "./query";

export const fetchUserInfo = async (address: Address) => {
  try {
    const res = await fetchGraphQL<{ userByAddress: IUser }>(
      GET_USER_BY_ADDRESS,
      { address }
    );
    return res?.userByAddress;
  } catch (error) {
    console.error(error);
  }
};
