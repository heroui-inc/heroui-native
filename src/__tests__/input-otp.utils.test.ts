import {
  defaultPasteTransformer,
  REGEXP_ONLY_CHARS,
  REGEXP_ONLY_DIGITS,
  REGEXP_ONLY_DIGITS_AND_CHARS,
} from '../primitives/input-otp/input-otp.utils';

describe('input-otp regex patterns', () => {
  it('REGEXP_ONLY_DIGITS matches digit-only strings', () => {
    const pattern = new RegExp(REGEXP_ONLY_DIGITS);

    expect(pattern.test('123456')).toBe(true);
    expect(pattern.test('12a456')).toBe(false);
    expect(pattern.test('')).toBe(false);
  });

  it('REGEXP_ONLY_CHARS matches letter-only strings', () => {
    const pattern = new RegExp(REGEXP_ONLY_CHARS);

    expect(pattern.test('abCDef')).toBe(true);
    expect(pattern.test('abc123')).toBe(false);
    expect(pattern.test('')).toBe(false);
  });

  it('REGEXP_ONLY_DIGITS_AND_CHARS matches letters and digits only', () => {
    const pattern = new RegExp(REGEXP_ONLY_DIGITS_AND_CHARS);

    expect(pattern.test('a1B2c3')).toBe(true);
    expect(pattern.test('a1-B2')).toBe(false);
    expect(pattern.test('')).toBe(false);
  });
});

describe('defaultPasteTransformer', () => {
  it('returns the code when the pasted text is exactly maxLength digits', () => {
    expect(defaultPasteTransformer(6)('123456')).toBe('123456');
  });

  it('extracts the code from surrounding text', () => {
    expect(defaultPasteTransformer(6)('Your code is 123456.')).toBe('123456');
  });

  it('ignores digit groups of a different length', () => {
    expect(defaultPasteTransformer(6)('ref 12 code 654321')).toBe('654321');
  });

  it('returns an empty string when the digit run is too short', () => {
    expect(defaultPasteTransformer(6)('12345')).toBe('');
  });

  it('returns an empty string when the digit run is too long', () => {
    expect(defaultPasteTransformer(6)('1234567')).toBe('');
  });

  it('returns an empty string when no digits are present', () => {
    expect(defaultPasteTransformer(6)('no code here')).toBe('');
    expect(defaultPasteTransformer(6)('')).toBe('');
  });

  it('respects the provided maxLength', () => {
    expect(defaultPasteTransformer(4)('PIN: 4821')).toBe('4821');
    expect(defaultPasteTransformer(4)('PIN: 482')).toBe('');
  });
});
