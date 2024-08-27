import { Connector, signMessage } from "@wagmi/core";
import { wagmiConfig } from "@/config/wagmi";
import config from "@/config/configuration";

// Generate Nonce
export const fetchNonce = async (): Promise<string> => {
  const nonceResponse: any = await fetch(
    `${config.AUTH_BASE_ROUTE}/nonce`
  ).then((n) => {
    return n.json();
  });
  const nonce = nonceResponse.message;
  return nonce;
};

// Generate SIWE Message
export const createSiweMessage = async (
  address: string,
  chainId: number,
  statement: string
) => {
  let domain = "qacc.io";
  try {
    if (typeof window !== "undefined") {
      domain = window.location.hostname;
    }
    const nonce = await fetchNonce();
    const { SiweMessage } = await import("siwe");
    const siweMessage = new SiweMessage({
      domain,
      address,
      nonce,
      statement,
      uri: origin,
      version: "1",
      chainId,
    });
    return {
      message: siweMessage.prepareMessage(),
      nonce,
    };
  } catch (error) {
    console.error({ error });
    return false;
  }
};

// Get JWT Token
export const signWithEVM = async (
  address?: string,
  chainId?: number,
  connector?: Connector
) => {
  const siweMessage: any = await createSiweMessage(
    address!,
    chainId!,
    "Login into Giveth services"
  );

  const { message, nonce } = siweMessage;

  const signature = await signMessage(wagmiConfig, {
    connector: connector,
    message: message,
  });
  console.log("sign", signature);
  console.log("message", message);
  console.log("nonce", nonce);

  const headers = { "Content-Type": "application/json" };
  const body: Record<string, any> = {
    signature,
    message,
    nonce,
  };

  try {
    return fetch(`${config.AUTH_BASE_ROUTE}/authentication`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    }).then(async (response) => {
      if (response.ok) {
        return await response.json();
      } else {
        const errorObject = await response.json();
        const errorMessage =
          (errorObject.message || errorObject?.errors[0]?.message) ??
          "An error occurred";
        return Promise.reject(new Error(errorMessage));
      }
    });
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getLocalStorageToken = (address: string) => {
  const storedToken = localStorage.getItem("token");
  if (storedToken) {
    const tokenObj = JSON.parse(storedToken);
    if (tokenObj.publicAddress.toLowerCase() === address.toLowerCase()) {
      return storedToken;
    }
    localStorage.removeItem("token");
  }
};

export const getCurrentUserToken = () => {
  try {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      const tokenObj = JSON.parse(storedToken);
      return tokenObj.jwt;
    }
  } catch (error) {
    console.error(error);
  }
};
