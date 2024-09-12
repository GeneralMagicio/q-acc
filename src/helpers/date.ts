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

export function getDifferenceFromPeriod(
  startDateString: string,
  yearsToAdd: number,
) {
  // Get the current date
  const now = new Date();

  // Parse the provided start date
  const startDate = new Date(startDateString);

  // Calculate the number of full years and the remaining months from the fractional years
  const fullYears = Math.floor(yearsToAdd);
  const additionalMonths = Math.round((yearsToAdd - fullYears) * 12); // Convert fractional part to months

  // Calculate the final date by adding the full years
  let finalDate = new Date(startDate);
  finalDate.setFullYear(finalDate.getFullYear() + fullYears);

  // Add the remaining months (if any)
  finalDate.setMonth(finalDate.getMonth() + additionalMonths);

  // Handle overflow for months (if we go over 12 months, correct the date)
  if (finalDate.getMonth() !== (startDate.getMonth() + additionalMonths) % 12) {
    finalDate.setDate(0); // Set to last day of previous month if overflow occurs
  }

  // Calculate the difference in milliseconds
  const diffInMilliseconds = Number(finalDate) - Number(now);

  // If the date is in the past, return a message
  if (diffInMilliseconds < 0) {
    return 'The period has ended.';
  }

  // Calculate months and years using date math
  let diffYears = finalDate.getFullYear() - now.getFullYear();
  let diffMonths = finalDate.getMonth() - now.getMonth();
  let diffDays = finalDate.getDate() - now.getDate();

  // Adjust for negative days
  if (diffDays < 0) {
    diffMonths--;
    const daysInPreviousMonth = new Date(
      finalDate.getFullYear(),
      finalDate.getMonth(),
      0,
    ).getDate();
    diffDays += daysInPreviousMonth;
  }

  // Adjust for negative months
  if (diffMonths < 0) {
    diffYears--;
    diffMonths += 12;
  }

  // Format the output
  let result = '';

  if (diffYears > 0) {
    result += `${diffYears} Year${diffYears > 1 ? 's' : ''} `;
  }

  if (diffMonths > 0) {
    result += `${diffMonths} Month${diffMonths > 1 ? 's' : ''} `;
  }

  result += `${diffDays} Day${diffDays > 1 ? 's' : ''}`;

  return result.trim(); // Trim any extra spaces
}
