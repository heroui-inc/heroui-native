import { selectClassNames } from '../components/select/select.styles';

describe('selectClassNames.trigger', () => {
  it('applies the default variant when no variant is passed', () => {
    expect(selectClassNames.trigger()).toBe('select__trigger--variant-default');
  });

  it('keeps the default variant when other props are passed', () => {
    expect(selectClassNames.trigger({ isDisabled: true })).toBe(
      'select__trigger--variant-default select__trigger--is-disabled'
    );
  });

  it('omits the default variant styles when unstyled is requested', () => {
    expect(
      selectClassNames.trigger({ variant: 'unstyled', isDisabled: true })
    ).toBe('select__trigger--is-disabled');
  });
});
