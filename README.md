# @iscodex/ms-parser

A lightweight, TypeScript-first library for parsing and formatting time durations with human-readable strings.

[![npm version](https://badge.fury.io/js/%40iscodex%2Fms-parser.svg)](https://badge.fury.io/js/%40iscodex%2Fms-parser)
[![Build Status](https://github.com/iscodex/ms-parser/workflows/CI/badge.svg)](https://github.com/iscodex/ms-parser/actions)

## Features

- 🚀 **Lightweight**: Zero dependencies
- 📝 **TypeScript-first**: Full type safety and IntelliSense support
- 🔄 **Bidirectional**: Parse strings to milliseconds and format milliseconds to strings
- 🎯 **Precise**: Handles decimal values and negative numbers
- 📚 **Comprehensive**: Supports all common time units
- 🧪 **Well-tested**: 100% test coverage

## Installation

```bash
npm install @iscodex/ms-parser
```

```bash
yarn add @iscodex/ms-parser
```

```bash
pnpm add @iscodex/ms-parser
```

## Usage

### Basic Usage

```typescript
import ms from '@iscodex/ms-parser';

// Parse string to milliseconds
ms('2 hours'); // 7200000
ms('1d'); // 86400000
ms('10h'); // 36000000
ms('2.5 hrs'); // 9000000
ms('1y'); // 31557600000

// Format milliseconds to string
ms(60000); // "1m"
ms(2 * 60 * 1000); // "2m"
ms(ms('10 hours')); // "10h"
ms(60000, { long: true }); // "1 minute"
ms(2 * 60 * 1000, { long: true }); // "2 minutes"
```

### Individual Functions

```typescript
import { parse, format } from '@iscodex/ms-parser';

// Parse only
const milliseconds = parse('1.5h'); // 5400000

// Format only
const shortFormat = format(3600000); // "1h"
const longFormat = format(3600000, { long: true }); // "1 hour"
```

### Advanced Usage

```typescript
import ms, {
  parse,
  format,
  type FormatOptions,
  type ParseOptions,
} from '@iscodex/ms-parser';

// Custom parsing options
const result = parse('30m', { maxLength: 50 });

// Custom formatting options
const formatted = format(7200000, { long: true });

// Type-safe string values
type TimeString = `${number}h` | `${number}m` | `${number}s`;
const timeValue: TimeString = '2h';
const parsed = ms(timeValue); // 7200000
```

## Supported Units

| Unit         | Long Format                                    | Short Format |
| ------------ | ---------------------------------------------- | ------------ |
| Years        | `years`, `year`, `yrs`, `yr`                   | `y`          |
| Weeks        | `weeks`, `week`                                | `w`          |
| Days         | `days`, `day`                                  | `d`          |
| Hours        | `hours`, `hour`, `hrs`, `hr`                   | `h`          |
| Minutes      | `minutes`, `minute`, `mins`, `min`             | `m`          |
| Seconds      | `seconds`, `second`, `secs`, `sec`             | `s`          |
| Milliseconds | `milliseconds`, `millisecond`, `msecs`, `msec` | `ms`         |

All units are case-insensitive and support both singular and plural forms.

## API Reference

### `ms(value, options?)`

Main function that can parse strings or format numbers.

**Parameters:**

- `value: string | number` - String to parse or number to format
- `options?: FormatOptions | ParseOptions` - Configuration options

**Returns:**

- `number` when parsing strings
- `string` when formatting numbers

### `parse(value, options?)`

Parse a time string into milliseconds.

**Parameters:**

- `value: string` - Time string to parse
- `options?: ParseOptions` - Parsing configuration

**Returns:** `number` - Parsed time in milliseconds

**Options:**

- `maxLength?: number` - Maximum string length (default: 100)

### `format(ms, options?)`

Format milliseconds into a human-readable string.

**Parameters:**

- `ms: number` - Milliseconds to format
- `options?: FormatOptions` - Formatting configuration

**Returns:** `string` - Formatted time string

**Options:**

- `long?: boolean` - Use long format (default: false)

## Examples

### Basic Parsing

```typescript
ms('1s'); // 1000
ms('1m'); // 60000
ms('1h'); // 3600000
ms('1d'); // 86400000
ms('1w'); // 604800000
ms('1y'); // 31557600000
```

### Decimal Values

```typescript
ms('1.5h'); // 5400000
ms('0.5d'); // 43200000
ms('2.5 hours'); // 9000000
```

### Negative Values

```typescript
ms('-1h'); // -3600000
ms('-30m'); // -1800000
```

### Different Formats

```typescript
// Short format (default)
ms(60000); // "1m"
ms(3600000); // "1h"

// Long format
ms(60000, { long: true }); // "1 minute"
ms(120000, { long: true }); // "2 minutes"
ms(3600000, { long: true }); // "1 hour"
ms(7200000, { long: true }); // "2 hours"
```

## Error Handling

The library throws descriptive errors for invalid inputs:

```typescript
try {
  ms('invalid');
} catch (error) {
  console.log(error.message); // "Invalid time format: "invalid""
}

try {
  ms('a'.repeat(101));
} catch (error) {
  console.log(error.message); // "String too long. Maximum length is 100 characters"
}

try {
  format(NaN);
} catch (error) {
  console.log(error.message); // "Value must be a finite number"
}
```

## Limitations

- Currently doesn't support compound time strings like "1h 30m"
- Maximum string length is 100 characters by default
- Uses approximate year length (365.25 days)

## Development

```bash
# Install dependencies
pnpm install

# Run tests
pnpm test

# Run tests in watch mode
pnpm run test:watch

# Run tests with coverage
pnpm run test:coverage

# Build the package
pnpm run build

# Lint the code
pnpm run lint

# Type check
pnpm run type-check
```

## Requirements

- Node.js >= 20.0.0
- Supports ES Modules

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT © [Francisco Luis Rios Vega](https://github.com/alckordev)

## Changelog

### 1.0.0

- Initial release
- TypeScript support
- Full test coverage
- Comprehensive documentation
