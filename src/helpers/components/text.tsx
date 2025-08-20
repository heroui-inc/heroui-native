import React from 'react';
import { Text as RNText, type TextProps as RNTextProps } from 'react-native';
import { useTextComponentContext } from '../../providers/text-component/provider';

/**
 * Text component that automatically applies global text configuration
 * from HeroUINativeProvider.
 *
 * Global text props that can be configured:
 * - adjustsFontSizeToFit: Auto-scale text to fit constraints
 * - allowFontScaling: Respect Text Size accessibility settings
 * - maxFontSizeMultiplier: Maximum font scale when allowFontScaling is enabled
 * - minimumFontScale: Minimum scale when adjustsFontSizeToFit is enabled (iOS only)
 *
 * @example
 * ```tsx
 * <Text>Hello World</Text>
 * ```
 *
 * @example
 * Global configuration in HeroUINativeProvider:
 * ```tsx
 * <HeroUINativeProvider config={{
 *   textProps: {
 *     allowFontScaling: false,
 *     adjustsFontSizeToFit: false,
 *     maxFontSizeMultiplier: 1.5
 *   }
 * }}>
 *   <App />
 * </HeroUINativeProvider>
 * ```
 */
export const Text = React.forwardRef<RNText, RNTextProps>((props, ref) => {
  const { textProps } = useTextComponentContext();

  const mergedProps = Object.assign({}, textProps, props);

  return <RNText ref={ref} {...mergedProps} />;
});

Text.displayName = 'Text';
