import React, { useMemo } from 'react';
import { LayoutDirectionProvider } from '../../helpers/internal/contexts';
import type { LayoutDirectionScopeProps } from './types';

/**
 * LayoutDirectionScope Component
 *
 * @description
 * Overrides the layout direction that HeroUI Native components use for their
 * JS-driven logic within a subtree.
 *
 * `HeroUINativeProvider` sets one direction for the whole app via `config.isRTL`.
 * Some surfaces need to opt out of it — for example a demo or preview area that
 * must stay left-to-right while the surrounding app is right-to-left.
 *
 * Yoga layout and Uniwind's `rtl:` variants are scoped separately, by Uniwind's
 * own `LayoutDirection` component and a `direction` style. This provider covers
 * the remaining case: hooks such as the internal `useIsRTL`, which drive gesture
 * inversion (`Slider`), animation offsets (`Skeleton`, `SubMenu`) and popover
 * start/end alignment (`useRelativePosition`). Those read from context and would
 * otherwise keep following the app-level direction.
 *
 * Note that content rendered through a `Portal` escapes this subtree. To keep
 * overlays in scope, render a `PortalHost` with a custom `name` inside the scope
 * and pass the matching `hostName` to the overlay.
 *
 * @param {LayoutDirectionScopeProps} props - Provider props
 * @param {boolean} props.isRTL - Direction applied within the subtree
 * @param {ReactNode} props.children - Child components to wrap
 *
 * @example
 * ```tsx
 * <LayoutDirectionScope isRTL={false}>
 *   <PreviewArea />
 * </LayoutDirectionScope>
 * ```
 */
export const LayoutDirectionScope: React.FC<LayoutDirectionScopeProps> = ({
  isRTL,
  children,
}) => {
  const value = useMemo(() => ({ isRTL }), [isRTL]);

  return (
    <LayoutDirectionProvider value={value}>{children}</LayoutDirectionProvider>
  );
};

export default LayoutDirectionScope;
