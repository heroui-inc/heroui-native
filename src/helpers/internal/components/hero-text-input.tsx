import React from 'react';
import {
  TextInput as RNTextInput,
  type TextInputProps as RNTextInputProps,
} from 'react-native';
import { useTextInputComponent } from '../../external/hooks';

/**
 * Props for HeroTextInput component
 */
export interface HeroTextInputProps extends RNTextInputProps {}

/**
 * HeroTextInput component that automatically applies global text input
 * configuration from HeroUINativeProvider.
 *
 * This component is distinct from React Native's TextInput component and
 * merges globally configured props (applied as defaults) with the props
 * passed directly to the component.
 *
 * Global text input props that can be configured:
 * - allowFontScaling: Respect Text Size accessibility settings
 * - maxFontSizeMultiplier: Maximum font scale when allowFontScaling is enabled
 *
 * @example
 * ```tsx
 * <HeroTextInput value={value} onChangeText={setValue} />
 * ```
 *
 * @example
 * Global configuration in HeroUINativeProvider:
 * ```tsx
 * <HeroUINativeProvider config={{
 *   textInputProps: {
 *     allowFontScaling: false,
 *     maxFontSizeMultiplier: 1.5
 *   }
 * }}>
 *   <App />
 * </HeroUINativeProvider>
 * ```
 */
export const HeroTextInput = React.forwardRef<RNTextInput, HeroTextInputProps>(
  (props, ref) => {
    const { textInputProps } = useTextInputComponent();

    const mergedProps = Object.assign({}, textInputProps, props);

    return <RNTextInput ref={ref} {...mergedProps} />;
  }
);

HeroTextInput.displayName = 'HeroTextInput';
