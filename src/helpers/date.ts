/**
 * Formats an ISO date string (e.g., "2024-09-10T15:44:56.794Z") into a readable date
 * in the format "Month Day, Year" (e.g., "Sep 10, 2024").
 *
 * @param {string} isoString - The ISO date string to format.
 * @returns {string} - The formatted date as "Month Day, Year".
 */
export function formatDateMonthDayYear(isoString: string) {
  const date = new Date(isoString);

  // Get the day, month, and year
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'short' }); // "Jan", "Feb", etc.
  const year = date.getFullYear();

  return `${month} ${day}, ${year}`;
}
