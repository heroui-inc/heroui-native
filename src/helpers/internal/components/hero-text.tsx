import React from 'react';
import { Text as RNText, type TextProps as RNTextProps } from 'react-native';
import { useTextComponent } from '../../external/hooks';
import { cn } from '../../external/utils';

/**
 * Props for HeroText component
 */
export interface HeroTextProps extends RNTextProps {
  /**
   * Additional CSS classes that will be merged with the default 'font-normal' class
   */
  className?: string;
}

/**
 * HeroText component that automatically applies global text configuration
 * from HeroUINativeProvider.
 *
 * This component is distinct from React Native's Text component and includes
 * a default 'font-normal' className that can be extended via the className prop.
 *
 * Global text props that can be configured:
 * - adjustsFontSizeToFit: Auto-scale text to fit constraints
 * - allowFontScaling: Respect Text Size accessibility settings
 * - maxFontSizeMultiplier: Maximum font scale when allowFontScaling is enabled
 * - minimumFontScale: Minimum scale when adjustsFontSizeToFit is enabled (iOS only)
 *
 * @example
 * ```tsx
 * <HeroText>Hello World</HeroText>
 * ```
 *
 * @example
 * With custom className:
 * ```tsx
 * <HeroText className="text-lg font-bold">Hello World</HeroText>
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
export const HeroText = React.forwardRef<RNText, HeroTextProps>(
  (props, ref) => {
    const { className, ...restProps } = props;
    const { textProps } = useTextComponent();

    const mergedProps = Object.assign({}, textProps, restProps);

    return (
      <RNText
        ref={ref}
        className={cn('font-normal', className)}
        {...mergedProps}
      />
    );
  }
);

HeroText.displayName = 'HeroText';
