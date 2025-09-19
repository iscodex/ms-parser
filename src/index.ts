/**
 * Time constants in milliseconds
 */
const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;
const WEEK = DAY * 7;
const YEAR = DAY * 365.25;

/**
 * Time units supported by the parser
 */
export type Unit =
  | 'Years'
  | 'Year'
  | 'Yrs'
  | 'Yr'
  | 'Y'
  | 'Weeks'
  | 'Week'
  | 'W'
  | 'Days'
  | 'Day'
  | 'D'
  | 'Hours'
  | 'Hour'
  | 'Hrs'
  | 'Hr'
  | 'H'
  | 'Minutes'
  | 'Minute'
  | 'Mins'
  | 'Min'
  | 'M'
  | 'Seconds'
  | 'Second'
  | 'Secs'
  | 'Sec'
  | 's'
  | 'Milliseconds'
  | 'Millisecond'
  | 'Msecs'
  | 'Msec'
  | 'Ms';

export type UnitAnyCase = Unit | Uppercase<Unit> | Lowercase<Unit>;

export type StringValue =
  | `${number}`
  | `${number}${UnitAnyCase}`
  | `${number} ${UnitAnyCase}`;

/**
 * Configuration options for formatting
 */
export interface FormatOptions {
  /**
   * Use long format (e.g., "1 day" instead of "1d")
   * @default false
   */
  long?: boolean;
}

/**
 * Configuration options for parsing
 */
export interface ParseOptions {
  /**
   * Maximum string length to parse
   * @default 100
   */
  maxLength?: number;
}

/**
 * Parse a time string and return milliseconds
 *
 * @param value - Time string to parse (e.g., "2h", "30 minutes", "1d")
 * @param options - Parsing options
 * @returns Parsed time in milliseconds
 * @throws {Error} When the string format is invalid
 *
 * @example
 * ```ts
 * parse("2h"); // 7200000
 * parse("30 minutes"); // 1800000
 * parse("1d"); // 86400000
 * ```
 */
export function parse(value: string, options: ParseOptions = {}): number {
  if (typeof value !== 'string' || value.length === 0) {
    throw new Error('Value must be a non-empty string');
  }

  const maxLength = options.maxLength ?? 100;
  if (value.length > maxLength) {
    throw new Error(
      `String too long. Maximum length is ${maxLength} characters`
    );
  }

  const match =
    /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
      value.trim()
    );

  if (!match) {
    throw new Error(`Invalid time format: "${value}"`);
  }

  const num = parseFloat(match[1]);
  if (!isFinite(num)) {
    throw new Error(`Invalid number: "${match[1]}"`);
  }

  const unit = (match[2] || 'ms').toLowerCase();

  switch (unit) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return num * YEAR;
    case 'weeks':
    case 'week':
    case 'w':
      return num * WEEK;
    case 'days':
    case 'day':
    case 'd':
      return num * DAY;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return num * HOUR;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return num * MINUTE;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return num * SECOND;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return num;
    default:
      throw new Error(`Unknown unit: "${unit}"`);
  }
}

/**
 * Format milliseconds to a human-readable string
 *
 * @param ms - Milliseconds to format
 * @param options - Formatting options
 * @returns Formatted string
 * @throws {Error} When the input is not a finite number
 *
 * @example
 * ```ts
 * format(7200000); // "2h"
 * format(7200000, { long: true }); // "2 hours"
 * format(1800000); // "30m"
 * ```
 */
export function format(ms: number, options: FormatOptions = {}): string {
  if (typeof ms !== 'number' || !isFinite(ms)) {
    throw new Error('Value must be a finite number');
  }

  return options.long ? formatLong(ms) : formatShort(ms);
}

/**
 * Format milliseconds in short format (e.g., "2h", "30m")
 */
function formatShort(ms: number): string {
  const absMs = Math.abs(ms);

  if (absMs >= DAY) {
    return Math.round(ms / DAY) + 'd';
  }
  if (absMs >= HOUR) {
    return Math.round(ms / HOUR) + 'h';
  }
  if (absMs >= MINUTE) {
    return Math.round(ms / MINUTE) + 'm';
  }
  if (absMs >= SECOND) {
    return Math.round(ms / SECOND) + 's';
  }
  return ms + 'ms';
}

/**
 * Format milliseconds in long format (e.g., "2 hours", "30 minutes")
 */
function formatLong(ms: number): string {
  const absMs = Math.abs(ms);

  if (absMs >= DAY) {
    return plural(ms, absMs, DAY, 'day');
  }
  if (absMs >= HOUR) {
    return plural(ms, absMs, HOUR, 'hour');
  }
  if (absMs >= MINUTE) {
    return plural(ms, absMs, MINUTE, 'minute');
  }
  if (absMs >= SECOND) {
    return plural(ms, absMs, SECOND, 'second');
  }
  return ms + ' ms';
}

/**
 * Helper function for pluralization
 */
function plural(ms: number, absMs: number, unit: number, name: string): string {
  const isPlural = absMs >= unit * 1.5;
  return Math.round(ms / unit) + ' ' + name + (isPlural ? 's' : '');
}

/**
 * Main function that can either parse a string or format a number
 *
 * @param value - String to parse or number to format
 * @param options - Options for parsing or formatting
 * @returns Parsed milliseconds or formatted string
 *
 * @example
 * ```ts
 * ms("2h"); // 7200000
 * ms(7200000); // "2h"
 * ms(7200000, { long: true }); // "2 hours"
 * ```
 */
function ms(value: StringValue): number;
function ms(value: number, options?: FormatOptions): string;
function ms(
  value: StringValue | number,
  options?: FormatOptions | ParseOptions
): string | number {
  if (typeof value === 'string') {
    return parse(value, options as ParseOptions);
  }

  if (typeof value === 'number') {
    return format(value, options as FormatOptions);
  }

  throw new Error('Value must be a string or number');
}

// Export the main function as default
export default ms;

// Export individual functions for more granular usage
export { ms };
