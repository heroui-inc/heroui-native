import {
  isAnimationDisabled,
  resolveAnimationObject,
} from '../components/button/button.utils';

describe('resolveAnimationObject', () => {
  it('returns the object when animation is an object', () => {
    const animation = { scale: { value: 0.9 } };

    expect(resolveAnimationObject(animation as never)).toBe(animation);
  });

  it('returns undefined for non-object values', () => {
    expect(resolveAnimationObject(undefined)).toBeUndefined();
    expect(resolveAnimationObject(true as never)).toBeUndefined();
    expect(resolveAnimationObject(false as never)).toBeUndefined();
    expect(resolveAnimationObject('disabled' as never)).toBeUndefined();
  });

  it('returns undefined for null', () => {
    expect(resolveAnimationObject(null as never)).toBeUndefined();
  });
});

describe('isAnimationDisabled', () => {
  it('is not disabled by default (undefined) or when animation is true', () => {
    expect(isAnimationDisabled(undefined)).toBe(false);
    expect(isAnimationDisabled(true as never)).toBe(false);
  });

  it('is disabled for false, "disabled" and "disable-all"', () => {
    expect(isAnimationDisabled(false as never)).toBe(true);
    expect(isAnimationDisabled('disabled' as never)).toBe(true);
    expect(isAnimationDisabled('disable-all' as never)).toBe(true);
  });

  it('reads the state key when animation is an object', () => {
    expect(isAnimationDisabled({ state: false } as never)).toBe(true);
    expect(isAnimationDisabled({ state: 'disabled' } as never)).toBe(true);
    expect(isAnimationDisabled({ state: 'disable-all' } as never)).toBe(true);
  });

  it('is not disabled when an object has no state or an enabling state', () => {
    expect(isAnimationDisabled({} as never)).toBe(false);
    expect(isAnimationDisabled({ scale: { value: 0.9 } } as never)).toBe(false);
    expect(isAnimationDisabled({ state: true } as never)).toBe(false);
  });

  it('is not disabled for null', () => {
    expect(isAnimationDisabled(null as never)).toBe(false);
  });
});
