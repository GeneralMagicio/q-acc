import { Address } from "viem";
import { requestGraphQL } from "@/helpers/request";
import {
  GET_USER_BY_ADDRESS,
  GET_GIVETH_USER_BY_ADDRESS,
} from "../queries/user.query";
import config from "@/config/configuration";
import type { IUser, IGivethUser } from "@/types/user.type";

export const fetchUserInfo = async (address: Address) => {
  try {
    const res = await requestGraphQL<{ userByAddress: IUser }>(
      GET_USER_BY_ADDRESS,
      { address },
      { auth: true }
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
        auth: true,
      }
    );
    return res?.userByAddress;
  } catch (error) {
    console.error(error);
  }
};

export async function checkUserIsWhiteListed(address?: Address) {
  if (!address) return false;
  try {
    const res = await fetch("/api/whitelist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ address }),
    });
    const data = await res.json();
    return data.isWhiteListed;
  } catch (error: any) {
    console.log("Error:", error);
    throw new Error("Error checking whitelist", error.message);
  }
}
