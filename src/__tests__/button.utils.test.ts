import {
  isAnimationDisabled,
  resolveAnimationObject,
} from '../components/button/button.utils';

describe('resolveAnimationObject', () => {
  it('returns the animation config when it is an object', () => {
    const animation = { scale: { value: 0.9 } };

    expect(resolveAnimationObject(animation)).toBe(animation);
  });

  it('returns undefined for non-object animation values', () => {
    expect(resolveAnimationObject(undefined)).toBeUndefined();
    expect(resolveAnimationObject(true)).toBeUndefined();
    expect(resolveAnimationObject(false)).toBeUndefined();
    expect(resolveAnimationObject('disabled')).toBeUndefined();
    expect(resolveAnimationObject('disable-all')).toBeUndefined();
  });
});

describe('isAnimationDisabled', () => {
  it('is false when animation is unset or enabled', () => {
    expect(isAnimationDisabled(undefined)).toBe(false);
    expect(isAnimationDisabled(true)).toBe(false);
  });

  it('is true for false, "disabled" and "disable-all"', () => {
    expect(isAnimationDisabled(false)).toBe(true);
    expect(isAnimationDisabled('disabled')).toBe(true);
    expect(isAnimationDisabled('disable-all')).toBe(true);
  });

  it('is true when an object config sets a disabling state', () => {
    expect(isAnimationDisabled({ state: false })).toBe(true);
    expect(isAnimationDisabled({ state: 'disabled' })).toBe(true);
    expect(isAnimationDisabled({ state: 'disable-all' })).toBe(true);
  });

  it('is false when an object config does not disable animations', () => {
    expect(isAnimationDisabled({})).toBe(false);
    expect(isAnimationDisabled({ state: true })).toBe(false);
    expect(isAnimationDisabled({ scale: { value: 0.9 } })).toBe(false);
  });
});
