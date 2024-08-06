// app/api/launch/route.ts
import { NextResponse } from "next/server";

const whiteListedAddresses = [
  "0x8F48094a12c8F99d616AE8F3305D5eC73cBAA6b6",
  "0xa8514833884e0C076C0650e0cAEe7a3C3c65B770",
];

export async function POST(request: Request) {
  const { address } = await request.json();

  // Perform your logic here, e.g., save the address to a database or process it as needed
  console.log("Received address:", address);

  // Check if the address is whitelisted
  const isWhiteListed = whiteListedAddresses.some(
    (whitelistedAddress) =>
      whitelistedAddress.toLowerCase() === address.toLowerCase()
  );

  // For this example, we'll just return the received address
  return NextResponse.json({
    isWhiteListed,
    message: "Address received",
    address,
  });
}
