import {
  isSameSource,
  isValidSource,
} from '../primitives/avatar/avatar.utils';

describe('isValidSource', () => {
  it('returns false when no source is provided', () => {
    expect(isValidSource(undefined)).toBe(false);
  });

  it('treats a require() result (number) as valid', () => {
    expect(isValidSource(1)).toBe(true);
  });

  it('accepts an object source with a non-empty uri', () => {
    expect(isValidSource({ uri: 'https://example.com/avatar.jpg' })).toBe(true);
  });

  it('rejects an object source with an empty or missing uri', () => {
    expect(isValidSource({ uri: '' })).toBe(false);
    expect(isValidSource({})).toBe(false);
  });

  it('accepts an array source when at least one entry has a uri', () => {
    expect(
      isValidSource([{ uri: '' }, { uri: 'https://example.com/avatar.jpg' }])
    ).toBe(true);
  });

  it('rejects an array source when no entry has a uri', () => {
    expect(isValidSource([{ uri: '' }, {}])).toBe(false);
    expect(isValidSource([])).toBe(false);
  });
});

describe('isSameSource', () => {
  it('treats two missing sources as the same', () => {
    expect(isSameSource(undefined, undefined)).toBe(true);
  });

  it('treats a missing source and a present source as different', () => {
    expect(isSameSource(undefined, { uri: 'https://example.com/a.jpg' })).toBe(
      false
    );
    expect(isSameSource({ uri: 'https://example.com/a.jpg' }, undefined)).toBe(
      false
    );
  });

  it('compares require() results (numbers) by value', () => {
    expect(isSameSource(1, 1)).toBe(true);
    expect(isSameSource(1, 2)).toBe(false);
  });

  it('treats a number and an object source as different', () => {
    expect(isSameSource(1, { uri: 'https://example.com/a.jpg' })).toBe(false);
    expect(isSameSource({ uri: 'https://example.com/a.jpg' }, 1)).toBe(false);
  });

  it('compares object sources by uri, not by reference', () => {
    expect(
      isSameSource(
        { uri: 'https://example.com/a.jpg' },
        { uri: 'https://example.com/a.jpg' }
      )
    ).toBe(true);
    expect(
      isSameSource(
        { uri: 'https://example.com/a.jpg' },
        { uri: 'https://example.com/b.jpg' }
      )
    ).toBe(false);
  });

  it('compares array sources element by element', () => {
    expect(
      isSameSource(
        [{ uri: 'https://example.com/a.jpg' }, { uri: 'https://example.com/b.jpg' }],
        [{ uri: 'https://example.com/a.jpg' }, { uri: 'https://example.com/b.jpg' }]
      )
    ).toBe(true);
    expect(
      isSameSource(
        [{ uri: 'https://example.com/a.jpg' }],
        [{ uri: 'https://example.com/b.jpg' }]
      )
    ).toBe(false);
  });

  it('treats arrays of different lengths as different', () => {
    expect(
      isSameSource(
        [{ uri: 'https://example.com/a.jpg' }],
        [{ uri: 'https://example.com/a.jpg' }, { uri: 'https://example.com/b.jpg' }]
      )
    ).toBe(false);
  });

  it('treats an array and an object source as different', () => {
    expect(
      isSameSource(
        [{ uri: 'https://example.com/a.jpg' }],
        { uri: 'https://example.com/a.jpg' }
      )
    ).toBe(false);
    expect(
      isSameSource(
        { uri: 'https://example.com/a.jpg' },
        [{ uri: 'https://example.com/a.jpg' }]
      )
    ).toBe(false);
  });
});
