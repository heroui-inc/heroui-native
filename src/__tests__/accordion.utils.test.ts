import {
  isItemSelected,
  toStringArray,
} from '../primitives/accordion/accordion.utils';

describe('toStringArray', () => {
  it('returns an empty array when the value is undefined', () => {
    expect(toStringArray(undefined)).toEqual([]);
  });

  it('returns an empty array for an empty string', () => {
    expect(toStringArray('')).toEqual([]);
  });

  it('wraps a single string in an array', () => {
    expect(toStringArray('item-1')).toEqual(['item-1']);
  });

  it('returns an array value unchanged', () => {
    const value = ['item-1', 'item-2'];

    expect(toStringArray(value)).toBe(value);
  });

  it('keeps an empty array as an empty array', () => {
    expect(toStringArray([])).toEqual([]);
  });
});

describe('isItemSelected', () => {
  describe('single selection (string root value)', () => {
    it('is selected when the root value equals the item value', () => {
      expect(isItemSelected('item-1', 'item-1')).toBe(true);
    });

    it('is not selected when the root value differs', () => {
      expect(isItemSelected('item-1', 'item-2')).toBe(false);
    });
  });

  describe('multiple selection (array root value)', () => {
    it('is selected when the array contains the item value', () => {
      expect(isItemSelected(['item-1', 'item-2'], 'item-2')).toBe(true);
    });

    it('is not selected when the array does not contain the item value', () => {
      expect(isItemSelected(['item-1', 'item-2'], 'item-3')).toBe(false);
    });

    it('is not selected for an empty array', () => {
      expect(isItemSelected([], 'item-1')).toBe(false);
    });
  });

  it('is not selected when the root value is undefined', () => {
    expect(isItemSelected(undefined, 'item-1')).toBe(false);
  });
});
