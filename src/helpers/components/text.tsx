import React from 'react';
import {
  Text as RNText,
  StyleSheet,
  type TextProps as RNTextProps,
} from 'react-native';
import { tv } from 'tailwind-variants';
import { useTextComponentContext } from '../../providers/text-component/provider';

export interface TextProps extends RNTextProps {}

const textStyles = tv({
  base: '',
});

/**
 * Text component that automatically applies global text configuration
 * from HeroUINativeProvider
 *
 * @example
 * ```tsx
 * <Text>Hello World</Text>
 * ```
 */
export const Text = React.forwardRef<RNText, TextProps>((props, ref) => {
  const { textProps: globalTextProps } = useTextComponentContext();

  const { className: propsClassName, style: propsStyle, ...restProps } = props;
  const {
    className: globalClassName,
    style: globalStyle,
    ...restGlobalProps
  } = globalTextProps || {};

  const className = textStyles({
    className: [globalClassName, propsClassName],
  });

  const style = StyleSheet.flatten([globalStyle, propsStyle]);

  const mergedProps = Object.assign(restProps, restGlobalProps);

  return (
    // <RNText ref={ref} className={className} style={style} {...mergedProps} />
    <RNText ref={ref} {...props} />
  );
});

Text.displayName = 'Text';
