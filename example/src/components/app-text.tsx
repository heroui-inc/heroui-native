import { cn } from 'heroui-native';
import React from 'react';
import { Text as RNText, type TextProps as RNTextProps } from 'react-native';

export const AppText = React.forwardRef<RNText, RNTextProps>((props, ref) => {
  const { className, ...restProps } = props;

  return (
    <RNText
      ref={ref}
      // `text-left` resolves logically to the layout "start" edge on RN Text, so
      // it is a no-op in LTR but keeps copy start-aligned (right) in RTL. Any
      // explicit alignment passed via className overrides it through cn/merge.
      className={cn('font-normal text-left', className)}
      {...restProps}
    />
  );
});

AppText.displayName = 'AppText';
