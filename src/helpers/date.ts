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

/**
 * Calculates the time difference between the current date and a future date,
 * which is determined by adding a given number of years (including fractional years)
 * to a provided start date. The function returns the difference in a readable
 * format, such as "X Years Y Months Z Days". It accounts for potential month
 * and day overflows (e.g., adding months that lead to invalid dates).
 *
 * @param {string} startDateString - The starting date in string format (ISO or other formats parsable by Date).
 * @param {number} yearsToAdd - The number of years to add to the starting date. Can be a fractional number (e.g., 1.5 for 1 year and 6 months).
 *
 * @returns {string} - A formatted string representing the time difference from now to the calculated end date, such as "X Years Y Months Z Days".
 * If the end date is in the past, the function returns a message indicating that the period has ended.
 *
 * Example usage:
 *   getDifferenceFromPeriod("2023-09-11T13:20:36.013Z", 1.5);
 *   // Returns a string like "1 Year 6 Months 15 Days" depending on the current date.
 */
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

export function calculateRemainingTime(endDate: Date): string {
  const now = new Date().getTime(); // Current time in milliseconds
  const end = endDate.getTime(); // End time in milliseconds
  const difference = end - now; // Time difference in milliseconds

  if (difference <= 0) {
    return 'Time is up!';
  }

  const seconds = Math.floor((difference / 1000) % 60);
  const minutes = Math.floor((difference / (1000 * 60)) % 60);
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));

  // Store each non-zero unit in an array
  const timeParts: string[] = [];

  if (days > 0) timeParts.push(`${days} day${days > 1 ? 's' : ''}`);
  if (hours > 0) timeParts.push(`${hours} hour${hours > 1 ? 's' : ''}`);
  if (minutes > 0) timeParts.push(`${minutes} min${minutes > 1 ? 's' : ''}`);
  if (seconds > 0) timeParts.push(`${seconds} second${seconds > 1 ? 's' : ''}`);

  // Limit to the three biggest units
  return timeParts.slice(0, 3).join(', ');
}

export const isMiddleOfThePeriod = (startDate: string, endDate: string) => {
  const now = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);

  return now >= start && now <= end;
};

export const formatDate = (date: string) => {
  const d = new Date(date);

  return d.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const getAdjustedEndDate = (endDate?: string): string | undefined => {
  if (!endDate) return undefined;
  const adjustedDate = new Date(
    new Date(endDate).getTime() -
      Number(process.env.NEXT_PUBLIC_ADJUSTED_MINUTES) * 60 * 1000,
  );
  return adjustedDate.toISOString();
};
