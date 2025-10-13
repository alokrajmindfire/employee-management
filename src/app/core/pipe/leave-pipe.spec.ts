import { LeavePipe } from './leave-pipe';

describe('LeavePipe', () => {
  let pipe: LeavePipe;

  beforeEach(() => {
    pipe = new LeavePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should format date string to "dd MMM yyyy" format', () => {
    const input = '2024-10-10T00:00:00Z';
    const result = pipe.transform(input);
    // 'en-IN' locale, day: 2-digit, month: short, year: numeric
    // For example: "10 Oct 2024"
    expect(result).toBe('10 Oct 2024');
  });

  it('should handle invalid date string gracefully', () => {
    const invalidInput = 'invalid-date';
    const result = pipe.transform(invalidInput);
    // Invalid date will result in "Invalid Date" which toLocaleDateString usually throws an error,
    // but Date constructor with invalid date returns "Invalid Date" object.
    // In that case, transform will return "Invalid Date" string or something else.
    // Let's test if it returns 'Invalid Date' string or empty string.
    expect(typeof result).toBe('string');
    expect(result).toMatch(/Invalid Date|NaN/);
  });

  it('should handle empty string input', () => {
    const result = pipe.transform('');
    expect(typeof result).toBe('string');
    expect(result).toMatch(/Invalid Date|NaN/);
  });
});
