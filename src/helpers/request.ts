import config from '@/config/configuration';
import { getCurrentUserToken } from './generateJWT';

export const requestGraphQL = async <T>(
  query: string,
  variables: Record<string, any> = {},
  options: { auth?: boolean; url?: string } = {},
): Promise<T> => {
  const response = await fetch(options.url || config.GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${options.auth ? getCurrentUserToken() : ''}`,
      authVersion: '2',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const { data, errors } = await response.json();

  if (errors) {
    const errorMessages = errors.map((error: any) => error.message).join(', ');

    // Check if any error message contains "Authentication required."
    if (errorMessages.includes('Authentication required.')) {
      // Dispatch a custom event to show the sign-in modal
      window.dispatchEvent(new CustomEvent('showSignInModal'));

      // Optionally, you could also throw a specific error or handle it here
      throw new Error('Authentication required. Please sign in.');
    }

    throw new Error(errorMessages);
  }

  return data;
};
