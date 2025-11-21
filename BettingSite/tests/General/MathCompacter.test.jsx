import { formatCompactNumber } from '../../src/utils/MathCompacter'; 
import { describe, it, expect } from 'vitest';

describe('formatCompactNumber', () => {

  it('formats numbers below 1000 without suffix', () => {
    expect(formatCompactNumber(0)).toBe("0");
    expect(formatCompactNumber(999)).toBe("999");
    expect(formatCompactNumber(-999)).toBe("-999");
  });

  it('formats numbers in thousands with K suffix', () => {
    expect(formatCompactNumber(1000)).toBe("1.0K");
    expect(formatCompactNumber(1500)).toBe("1.5K");
    expect(formatCompactNumber(999_999)).toBe("1000.0K"); // rounds up
    expect(formatCompactNumber(-1200)).toBe("-1.2K");
  });

  it('formats numbers in millions with M suffix', () => {
    expect(formatCompactNumber(1_000_000)).toBe("1.0M");
    expect(formatCompactNumber(2_500_000)).toBe("2.5M");
    expect(formatCompactNumber(-3_750_000)).toBe("-3.8M"); // rounds up
  });

  it('handles edge cases near thresholds', () => {
    expect(formatCompactNumber(999)).toBe("999");
    expect(formatCompactNumber(999_999)).toBe("1000.0K"); // round up
    expect(formatCompactNumber(1_000_000)).toBe("1.0M");
    expect(formatCompactNumber(999_999_999)).toBe("1000.0M"); // rounds up
  });
});
