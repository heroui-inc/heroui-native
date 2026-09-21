import type { ReactElement } from 'react';
import { Root as SwitchRoot } from '../primitives/switch/switch';
import type { RootProps } from '../primitives/switch/switch.types';

/**
 * The Switch primitive Root calls no hooks, so its `forwardRef` render function
 * can be invoked directly to read the props handed to the underlying Pressable.
 */
function getRootProps(props: RootProps): Record<string, unknown> {
  const { render } = SwitchRoot as unknown as {
    render: (props: RootProps, ref: null) => ReactElement;
  };

  return render(props, null).props as Record<string, unknown>;
}

describe('Switch primitive aria-valuetext', () => {
  it('derives the value text from the selected state when none is provided', () => {
    expect(getRootProps({ isSelected: true })['aria-valuetext']).toBe('on');
    expect(getRootProps({ isSelected: false })['aria-valuetext']).toBe('off');
  });

  it('forwards a consumer provided value text unchanged', () => {
    expect(
      getRootProps({
        'isSelected': false,
        'aria-valuetext': 'Silent mode off',
      })['aria-valuetext']
    ).toBe('Silent mode off');

    expect(
      getRootProps({ 'isSelected': true, 'aria-valuetext': 'Silent mode on' })[
        'aria-valuetext'
      ]
    ).toBe('Silent mode on');
  });
});
