/**
 * Configuration for projects that have completed graceful exit
 * Maps project slug to their announcement tweet URL
 */
export const gracefulExitProjects: Record<string, string> = {
  x23ai: 'https://x.com/x23_ai/status/1978066885708071162',
  akarun: 'https://x.com/theqacc/status/1988594492610371936', // AKA
  'gridlock-social-recovery-wallet':
    'https://x.com/GridlockCrypto/status/1987228808584503528?s=20', // LOCK
  'xade-finance': 'https://x.com/xade_xyz/status/1987066666363273636', // ACHAD
  'citizen-wallet': 'https://x.com/citizenwallet/status/1987801700464226611', // CITIZEN
  h2dao: 'https://x.com/HowToDAObook/status/1998786165110190375', // H2DAO
  'the-grand-timeline':
    'https://x.com/GrandTimeline/status/1998800144813404571', // GRAND
  todamoon: 'https://x.com/ToDaMoonAI/status/1998801121452642419', // TDM

  // Add more projects here in the future:
  // example: 'https://x.com/example-tweet-url',
};

/**
 * Check if a project has completed graceful exit
 */
export const hasGracefulExit = (slug: string): boolean => {
  return slug in gracefulExitProjects;
};

/**
 * Get the tweet URL for a project that has completed graceful exit
 */
export const getGracefulExitTweetUrl = (slug: string): string | undefined => {
  return gracefulExitProjects[slug];
};
