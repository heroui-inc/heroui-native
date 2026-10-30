import React from 'react';
import { childrenToString } from '../helpers/internal/utils/children-to-string';
import { hasProp } from '../helpers/internal/utils/has-prop';

describe('hasProp', () => {
  it('returns true when the element defines the prop', () => {
    expect(hasProp(<div id="a" />, 'id')).toBe(true);
  });

  it('returns true when the prop is defined with a falsy value', () => {
    expect(hasProp(<div hidden={false} />, 'hidden')).toBe(true);
  });

  it('returns false when the prop is not defined', () => {
    expect(hasProp(<div />, 'id')).toBe(false);
  });

  it('returns false for null and undefined elements', () => {
    expect(hasProp(null, 'id')).toBe(false);
    expect(hasProp(undefined, 'id')).toBe(false);
  });
});

describe('childrenToString', () => {
  it('returns null for null and undefined', () => {
    expect(childrenToString(null)).toBeNull();
    expect(childrenToString(undefined)).toBeNull();
  });

  it('returns strings as they are', () => {
    expect(childrenToString('Hello')).toBe('Hello');
  });

  it('converts numbers to strings', () => {
    expect(childrenToString(42)).toBe('42');
    expect(childrenToString(0)).toBe('0');
  });

  it('returns null for booleans', () => {
    expect(childrenToString(true)).toBeNull();
    expect(childrenToString(false)).toBeNull();
  });

  it('returns null for a React element', () => {
    expect(childrenToString(<span>Hi</span>)).toBeNull();
  });

  it('joins arrays of strings and numbers', () => {
    expect(childrenToString(['Total: ', 5, ' items'])).toBe('Total: 5 items');
  });

  it('skips null, undefined and boolean entries inside arrays', () => {
    expect(childrenToString(['a', null, undefined, false, 'b'])).toBe('ab');
  });

  it('flattens nested arrays', () => {
    expect(childrenToString(['a', ['b', ['c']]])).toBe('abc');
  });

  it('returns null when an array contains a React element', () => {
    expect(childrenToString(['Hello ', <b key="b">world</b>])).toBeNull();
  });

  it('returns null for an array that only contains empty values', () => {
    expect(childrenToString([null, false, undefined])).toBeNull();
    expect(childrenToString([])).toBeNull();
  });
});
