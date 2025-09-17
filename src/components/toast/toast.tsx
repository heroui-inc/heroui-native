import * as React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { Button } from '../button';
import { toastCloseButtonVariants } from './toast.constants';
import {
  elevationStyle,
  toastActionButtonStyles,
  toastActionButtonTextStyles,
  toastCloseButtonStyles,
  toastContentStyles,
  toastDescriptionStyles,
  toastIconStyles,
  toastStyles,
  toastTitleStyles,
} from './toast.styles';
import type { ToastProps } from './toast.types';

export const Toast = React.forwardRef<View, ToastProps>(
  (
    {
      id,
      title,
      description,
      variant = 'default',
      action,
      closeButton = {
        enabled: true,
        className: '',
        textClassName: '',
        text: 'Close',
      },
      duration,
      onDismiss,
      onAutoClose,
      className,
      entering,
      exiting,
      ...props
    },
    ref
  ) => {
    const handleDismiss = React.useCallback(() => {
      onDismiss?.(id);
    }, [id, onDismiss]);

    const handleActionPress = React.useCallback(() => {
      action?.onPress();
    }, [action]);

    // Auto-dismiss functionality
    React.useEffect(() => {
      if (duration && duration > 0 && onAutoClose) {
        const timeoutId = setTimeout(() => {
          onAutoClose(id);
        }, duration);

        return () => clearTimeout(timeoutId);
      }
    }, [duration, onAutoClose, id]);

    const buttonVariant = toastCloseButtonVariants[variant];

    const closeButtonClassName = toastCloseButtonStyles({
      variant: variant,
      className: closeButton.className,
    });

    return (
      <Animated.View
        ref={ref}
        className={toastStyles({ className })}
        entering={entering}
        exiting={exiting}
        {...props}
        style={elevationStyle}
      >
        {/* Icon */}
        <View className={toastIconStyles({ variant })} />

        {/* Content Area */}
        <View className={toastContentStyles()}>
          {title && (
            <Text className={toastTitleStyles({ variant })}>{title}</Text>
          )}
          {description && (
            <Text className={toastDescriptionStyles()}>{description}</Text>
          )}
        </View>

        {/* Action Button */}
        {action && (
          <TouchableOpacity
            onPress={handleActionPress}
            className={toastActionButtonStyles({ variant })}
          >
            <Text className={toastActionButtonTextStyles({ variant })}>
              {action.label}
            </Text>
          </TouchableOpacity>
        )}

        {/* Close Button (only if explicitly enabled) */}
        {closeButton.enabled && (
          <Button
            variant={buttonVariant}
            size="sm"
            onPress={handleDismiss}
            className={closeButtonClassName}
          >
            <Button.LabelContent className={closeButton.textClassName}>
              {closeButton.text}
            </Button.LabelContent>
          </Button>
        )}
      </Animated.View>
    );
  }
);

Toast.displayName = 'Toast';
