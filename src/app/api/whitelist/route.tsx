// app/api/launch/route.ts
import { NextResponse } from 'next/server';

const whiteListedAddresses = [
  '0x8F48094a12c8F99d616AE8F3305D5eC73cBAA6b6',
  '0xa8514833884e0C076C0650e0cAEe7a3C3c65B770',
  '0xF23eA0b5F14afcbe532A1df273F7B233EBe41C78',
  '0x6D97d65aDfF6771b31671443a6b9512104312d3D',
  '0xd11256d99f8833beE0B99203DDcfe4cd6c823d8D',
  '0xD7542DC0F58095064BFEf6117fac82E4c5504d28',
  '0xA1179f64638adb613DDAAc32D918EB6BEB824104',
  '0xD5db3F8B0a236176587460dC85F0fC5705D78477',
  // '0x4ce6B0F604E1036AFFD0826764b51Fb72310964c', //my address
];

export async function POST(request: Request) {
  const { address } = await request.json();

  // Perform your logic here, e.g., save the address to a database or process it as needed
  console.log('Received address:', address);

  // Check if the address is whitelisted
  const isWhiteListed = whiteListedAddresses.some(
    whitelistedAddress =>
      whitelistedAddress.toLowerCase() === address.toLowerCase(),
  );

  // For this example, we'll just return the received address
  return NextResponse.json({
    isWhiteListed,
    message: 'Address received',
    address,
  });
}
