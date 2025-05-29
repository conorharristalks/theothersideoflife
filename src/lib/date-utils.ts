import { TIME_SETTINGS } from './constants';

/**
 * Standardizes a date to noon UTC to avoid timezone issues
 */
export function standardizeDate(date: Date): Date {
  return new Date(
    Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      TIME_SETTINGS.STANDARDIZED_HOUR,
      0,
      0
    )
  );
}

/**
 * Creates a date range for a given day (start to end of day)
 */
export function createDayRange(date: Date): { startOfDay: Date; endOfDay: Date } {
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth();
  const day = date.getUTCDate();
  
  const startOfDay = new Date(Date.UTC(year, month, day, TIME_SETTINGS.START_OF_DAY, 0, 0));
  const endOfDay = new Date(Date.UTC(
    year, 
    month, 
    day, 
    TIME_SETTINGS.END_OF_DAY_HOUR, 
    TIME_SETTINGS.END_OF_DAY_MINUTE, 
    TIME_SETTINGS.END_OF_DAY_SECOND, 
    TIME_SETTINGS.END_OF_DAY_MS
  ));
  
  return { startOfDay, endOfDay };
}

/**
 * Formats a date as YYYY-MM-DD in UTC
 */
export function formatDateUTC(date: Date): string {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Parses a YYYY-MM-DD date string to a local Date object at noon
 */
export function parseDateString(dateStr: string): Date {
  const [year, month, day] = dateStr.split('-').map(Number);
  return new Date(year, month - 1, day, TIME_SETTINGS.STANDARDIZED_HOUR, 0, 0);
}
