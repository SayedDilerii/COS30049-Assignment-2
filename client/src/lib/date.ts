import { addDays, isMonday, isSaturday, isSunday, startOfDay } from "date-fns";

/**
 * Returns the date of the upcoming weekend (Saturday or Sunday).
 * If the current date is a weekend, returns the current date.
 *
 * @param date - Optional date to calculate from. Defaults to current date.
 * @returns Date object representing the next weekend date
 */
export function getUpcomingWeekend(date: string): Date {
  const startDate: Date = startOfDay(date);

  const isWeekend = (date: Date): boolean => isSaturday(date) || isSunday(date);

  if (isWeekend(startDate)) {
    return startDate;
  }

  let nextDate: Date = startDate;
  while (!isWeekend(nextDate)) {
    nextDate = addDays(nextDate, 1);
  }

  return nextDate;
}

/**
 * Returns the date of the next Monday.
 * If the current date is a Monday, returns the next Monday.
 *
 * @param date - Optional date to calculate from. Defaults to current date.
 * @returns Date object representing the next Monday
 */
export const getNextMonday = (date: string): Date => {
  let nextDate: Date = startOfDay(date);
  // If it's Monday, move to next day before starting the search
  // to ensure we get the *next* Monday
  if (isMonday(nextDate)) {
    nextDate = addDays(nextDate, 1);
  }
  while (!isMonday(nextDate)) {
    nextDate = addDays(nextDate, 1);
  }
  return nextDate;
};
