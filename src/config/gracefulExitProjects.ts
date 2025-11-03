/**
 * Configuration for projects that have completed graceful exit
 * Maps project slug to their announcement tweet URL
 */
export const gracefulExitProjects: Record<string, string> = {
  x23ai: 'https://x.com/x23_ai/status/1978066885708071162',
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
