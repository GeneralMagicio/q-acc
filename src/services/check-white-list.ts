import { Address } from "viem";

export async function checkWhiteList(address: Address) {
  try {
    const res = await fetch("/api/whitelist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ address }),
    });
    const data = await res.json();
    if (data.isWhiteListed) {
      return true;
    } else {
      return false;
    }
  } catch (error: any) {
    console.log("Error:", error);
    throw new Error("Error checking whitelist", error.message);
  }

  return;
}
