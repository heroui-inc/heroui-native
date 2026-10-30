import {
  REGEXP_ONLY_CHARS,
  REGEXP_ONLY_DIGITS,
  REGEXP_ONLY_DIGITS_AND_CHARS,
  defaultPasteTransformer,
} from '../primitives/input-otp/input-otp.utils';

describe('input-otp regex patterns', () => {
  describe('REGEXP_ONLY_DIGITS', () => {
    const pattern = new RegExp(REGEXP_ONLY_DIGITS);

    it('accepts digits only', () => {
      expect(pattern.test('123456')).toBe(true);
    });

    it('rejects letters, mixed values and the empty string', () => {
      expect(pattern.test('12a456')).toBe(false);
      expect(pattern.test('abc')).toBe(false);
      expect(pattern.test('')).toBe(false);
    });
  });

  describe('REGEXP_ONLY_CHARS', () => {
    const pattern = new RegExp(REGEXP_ONLY_CHARS);

    it('accepts upper and lower case letters only', () => {
      expect(pattern.test('abcXYZ')).toBe(true);
    });

    it('rejects digits, mixed values and the empty string', () => {
      expect(pattern.test('abc1')).toBe(false);
      expect(pattern.test('123')).toBe(false);
      expect(pattern.test('')).toBe(false);
    });
  });

  describe('REGEXP_ONLY_DIGITS_AND_CHARS', () => {
    const pattern = new RegExp(REGEXP_ONLY_DIGITS_AND_CHARS);

    it('accepts letters and digits', () => {
      expect(pattern.test('abc123')).toBe(true);
      expect(pattern.test('123')).toBe(true);
      expect(pattern.test('abc')).toBe(true);
    });

    it('rejects symbols, whitespace and the empty string', () => {
      expect(pattern.test('abc-123')).toBe(false);
      expect(pattern.test('abc 123')).toBe(false);
      expect(pattern.test('')).toBe(false);
    });
  });
});

describe('defaultPasteTransformer', () => {
  const transform = defaultPasteTransformer(6);

  it('returns the code when the pasted text is exactly the OTP', () => {
    expect(transform('123456')).toBe('123456');
  });

  it('extracts the OTP from surrounding text', () => {
    expect(transform('Your verification code is 123456.')).toBe('123456');
  });

  it('returns an empty string when there are fewer digits than maxLength', () => {
    expect(transform('12345')).toBe('');
  });

  it('returns an empty string when the digit run is longer than maxLength', () => {
    expect(transform('1234567')).toBe('');
  });

  it('returns an empty string when there are no digits', () => {
    expect(transform('no code here')).toBe('');
    expect(transform('')).toBe('');
  });

  it('returns the first valid code when several digit groups are present', () => {
    expect(transform('code 123456 or 654321')).toBe('123456');
  });

  it('ignores digit groups of the wrong length next to a valid one', () => {
    expect(transform('order 12345678 code 246810')).toBe('246810');
  });

  it('respects the maxLength it was created with', () => {
    expect(defaultPasteTransformer(4)('PIN: 4821')).toBe('4821');
    expect(defaultPasteTransformer(4)('PIN: 482')).toBe('');
  });
});
