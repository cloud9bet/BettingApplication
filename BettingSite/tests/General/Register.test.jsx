import { describe, it, expect } from 'vitest';
import { validatePassword } from '../../src/utils/SignUpCheck';

describe('validatePassword', () => {

  it('returns error for password shorter than 12 chars', () => {
    const errors = validatePassword('Ab1!', 'Ab1!');
    expect(errors).toContain("Password must be at least 12 characters");
  });

  it('returns error if missing uppercase', () => {
    const errors = validatePassword('abcdefghijk1!', 'abcdefghijk1!');
    expect(errors).toContain(" Password must contain at least one uppercase letter");
  });

  it('returns error if missing lowercase', () => {
    const errors = validatePassword('ABCDEFGHIJK1!', 'ABCDEFGHIJK1!');
    expect(errors).toContain(" Password must contain at least one lowercase letter");
  });

  it('returns error if missing digit', () => {
    const errors = validatePassword('Abcdefghijk!', 'Abcdefghijk!');
    expect(errors).toContain(" Password must contain at least one number");
  });

  it('returns error if missing special character', () => {
    const errors = validatePassword('Abcdefghijk1', 'Abcdefghijk1');
    expect(errors).toContain(" Password must contain at least one special character");
  });

  it('returns error if passwords do not match', () => {
    const errors = validatePassword('Abcdefghijk1!', 'DifferentPass1!');
    expect(errors).toContain(" Password must be the same");
  });

  it('returns empty array for a valid password', () => {
    const errors = validatePassword('Abcdefghijk1!', 'Abcdefghijk1!');
    expect(errors).toEqual([]);
  });

});
