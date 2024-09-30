'use server';

export async function fetchAbcToken(param: { userAddress: string }) {
  const { userAddress } = param;

  // Fetch project data from database
  const response = await fetch(`${process.env.MONGODB_URL}/action/findOne`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': process.env.MONGODB_API_KEY || '',
    },
    body: JSON.stringify({
      dataSource: 'giveth',
      database: 'abc-launcher',
      collection: 'project',
      filter: {
        projectAddress: userAddress.toLowerCase(),
      },
    }),
  });

  if (!response.ok) {
    const errorDetails = await response.text(); // Get more details about the error
    console.error('Error details:', errorDetails);
    throw new Error('Failed to fetch data');
  }

  return await response.json();
}
