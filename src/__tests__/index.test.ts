import ms, { parse, format } from '../index';

describe('ms parser', () => {
  describe('parse function', () => {
    test('should parse milliseconds', () => {
      expect(parse('100ms')).toBe(100);
      expect(parse('100')).toBe(100);
    });

    test('should parse seconds', () => {
      expect(parse('1s')).toBe(1000);
      expect(parse('1sec')).toBe(1000);
      expect(parse('1 second')).toBe(1000);
      expect(parse('2 seconds')).toBe(2000);
    });

    test('should parse minutes', () => {
      expect(parse('1m')).toBe(60000);
      expect(parse('1min')).toBe(60000);
      expect(parse('1 minute')).toBe(60000);
      expect(parse('2 minutes')).toBe(120000);
    });

    test('should parse hours', () => {
      expect(parse('1h')).toBe(3600000);
      expect(parse('1hr')).toBe(3600000);
      expect(parse('1 hour')).toBe(3600000);
      expect(parse('2 hours')).toBe(7200000);
    });

    test('should parse days', () => {
      expect(parse('1d')).toBe(86400000);
      expect(parse('1 day')).toBe(86400000);
      expect(parse('2 days')).toBe(172800000);
    });

    test('should parse weeks', () => {
      expect(parse('1w')).toBe(604800000);
      expect(parse('1 week')).toBe(604800000);
      expect(parse('2 weeks')).toBe(1209600000);
    });

    test('should parse years', () => {
      expect(parse('1y')).toBe(31557600000);
      expect(parse('1 year')).toBe(31557600000);
      expect(parse('2 years')).toBe(63115200000);
    });

    test('should handle negative values', () => {
      expect(parse('-1h')).toBe(-3600000);
      expect(parse('-30m')).toBe(-1800000);
    });

    test('should handle decimal values', () => {
      expect(parse('1.5h')).toBe(5400000);
      expect(parse('0.5d')).toBe(43200000);
    });

    test('should throw error for invalid formats', () => {
      expect(() => parse('')).toThrow('Value must be a non-empty string');
      expect(() => parse('invalid')).toThrow('Invalid time format');
      expect(() => parse('1x')).toThrow('Invalid time format');
    });

    test('should throw error for too long strings', () => {
      const longString = 'a'.repeat(101);
      expect(() => parse(longString)).toThrow('String too long');
    });

    test('should respect maxLength option', () => {
      expect(() => parse('1h', { maxLength: 1 })).toThrow('String too long');
    });
  });

  describe('format function', () => {
    test('should format milliseconds in short format', () => {
      expect(format(100)).toBe('100ms');
      expect(format(1000)).toBe('1s');
      expect(format(60000)).toBe('1m');
      expect(format(3600000)).toBe('1h');
      expect(format(86400000)).toBe('1d');
    });

    test('should format milliseconds in long format', () => {
      expect(format(1000, { long: true })).toBe('1 second');
      expect(format(2000, { long: true })).toBe('2 seconds');
      expect(format(60000, { long: true })).toBe('1 minute');
      expect(format(120000, { long: true })).toBe('2 minutes');
      expect(format(3600000, { long: true })).toBe('1 hour');
      expect(format(7200000, { long: true })).toBe('2 hours');
      expect(format(86400000, { long: true })).toBe('1 day');
      expect(format(172800000, { long: true })).toBe('2 days');
    });

    test('should handle negative values', () => {
      expect(format(-1000)).toBe('-1s');
      expect(format(-60000, { long: true })).toBe('-1 minute');
    });

    test('should throw error for invalid input', () => {
      expect(() => format(NaN)).toThrow('Value must be a finite number');
      expect(() => format(Infinity)).toThrow('Value must be a finite number');
    });
  });

  describe('main ms function', () => {
    test('should parse when given a string', () => {
      expect(ms('1h')).toBe(3600000);
      expect(ms('30m')).toBe(1800000);
    });

    test('should format when given a number', () => {
      expect(ms(3600000)).toBe('1h');
      expect(ms(1800000)).toBe('30m');
    });

    test('should format with long option', () => {
      expect(ms(3600000, { long: true })).toBe('1 hour');
      expect(ms(7200000, { long: true })).toBe('2 hours');
    });

    test('should throw error for invalid types', () => {
      expect(() => ms(null as any)).toThrow('Value must be a string or number');
      expect(() => ms(undefined as any)).toThrow(
        'Value must be a string or number'
      );
    });
  });

  describe('edge cases', () => {
    test('should handle zero', () => {
      expect(parse('0')).toBe(0);
      expect(format(0)).toBe('0ms');
    });

    test('should handle very large numbers', () => {
      const largeMs = 999999999999;
      expect(format(largeMs)).toMatch(/\d+d/);
    });

    test('should be case insensitive', () => {
      expect(parse('1H')).toBe(parse('1h'));
      expect(parse('1M')).toBe(parse('1m'));
      expect(parse('1S')).toBe(parse('1s'));
    });
  });
});
