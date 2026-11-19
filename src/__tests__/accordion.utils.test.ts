import {
  isItemSelected,
  toStringArray,
} from '../primitives/accordion/accordion.utils';

describe('toStringArray', () => {
  it('returns an empty array for undefined or an empty string', () => {
    expect(toStringArray(undefined)).toEqual([]);
    expect(toStringArray('')).toEqual([]);
  });

  it('wraps a single string value in an array', () => {
    expect(toStringArray('item-1')).toEqual(['item-1']);
  });

  it('returns an array value unchanged', () => {
    const value = ['item-1', 'item-2'];

    expect(toStringArray(value)).toBe(value);
  });
});

describe('isItemSelected', () => {
  it('matches a single selected value by equality', () => {
    expect(isItemSelected('item-1', 'item-1')).toBe(true);
    expect(isItemSelected('item-1', 'item-2')).toBe(false);
  });

  it('matches multiple selected values by inclusion', () => {
    expect(isItemSelected(['item-1', 'item-2'], 'item-2')).toBe(true);
    expect(isItemSelected(['item-1', 'item-2'], 'item-3')).toBe(false);
    expect(isItemSelected([], 'item-1')).toBe(false);
  });

  it('returns false when nothing is selected', () => {
    expect(isItemSelected(undefined, 'item-1')).toBe(false);
  });
});
