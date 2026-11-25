import { cn, tv } from '../helpers/external/utils/cn';

describe('cn', () => {
  it('merges conflicting opacity classes, including the custom disabled group', () => {
    expect(cn('opacity-50 opacity-disabled')).toBe('opacity-disabled');
    expect(cn('opacity-disabled opacity-50')).toBe('opacity-50');
  });

  it('merges the custom field-width border group', () => {
    expect(cn('border-2 border-field-width')).toBe('border-field-width');
  });

  it('returns an empty string for empty input', () => {
    expect(cn()).toBe('');
  });
});

describe('tv', () => {
  it('defines a recipe with a custom twMergeConfig without throwing', () => {
    const recipe = tv({ base: 'px-2 opacity-disabled' });
    expect(recipe()).toBe('px-2 opacity-disabled');
  });

  it('merges conflicts using the custom class groups', () => {
    const recipe = tv({
      base: 'opacity-50',
      variants: { disabled: { true: 'opacity-disabled' } },
    });
    expect(recipe({ disabled: true })).toBe('opacity-disabled');
  });
});
