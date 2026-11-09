import type { ReactElement } from 'react';
import { ToastItemRenderer } from '../providers/toast/toast-item-renderer';
import type {
  ToastItem,
  ToastItemRendererProps,
} from '../providers/toast/types';

type Compare = (
  prev: ToastItemRendererProps,
  next: ToastItemRendererProps
) => boolean;

/**
 * `React.memo` exposes its comparator as `compare`; returning `true` means
 * the toast is NOT re-rendered.
 */
const isSkipped = (ToastItemRenderer as unknown as { compare: Compare })
  .compare;

const component = () => null as unknown as ReactElement;

function props(
  toastItem: ToastItem,
  overrides: Partial<ToastItemRendererProps> = {}
): ToastItemRendererProps {
  return {
    toastItem,
    index: 0,
    maxVisibleToasts: 3,
    isBehindStack: false,
    show: () => '',
    hide: () => {},
    total: {} as ToastItemRendererProps['total'],
    heights: {} as ToastItemRendererProps['heights'],
    ...overrides,
  };
}

describe('ToastItemRenderer re-render rules', () => {
  it('does not re-render a library toast when only its index changes', () => {
    const item: ToastItem = { id: 'a', component, isIndexIndependent: true };

    expect(
      isSkipped(props(item, { index: 2 }), props(item, { index: 1 }))
    ).toBe(true);
  });

  it('re-renders a custom component toast when its index changes', () => {
    const item: ToastItem = { id: 'a', component };

    expect(
      isSkipped(props(item, { index: 2 }), props(item, { index: 1 }))
    ).toBe(false);
  });

  it('re-renders when the toast moves behind the visible stack', () => {
    const item: ToastItem = { id: 'a', component, isIndexIndependent: true };

    expect(isSkipped(props(item), props(item, { isBehindStack: true }))).toBe(
      false
    );
  });

  it('re-renders when the toast item changes', () => {
    const item: ToastItem = { id: 'a', component, isIndexIndependent: true };

    expect(isSkipped(props(item), props({ ...item }))).toBe(false);
  });
});
