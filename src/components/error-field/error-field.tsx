import { forwardRef } from 'react';
import Animated from 'react-native-reanimated';
import { Text } from '../../helpers/components';
import type { ViewRef } from '../../helpers/types/primitives';
import {
  DISPLAY_NAME,
  ENTERING_ANIMATION_CONFIG,
  EXITING_ANIMATION_CONFIG,
} from './error-field.constants';
import errorFieldStyles from './error-field.styles';
import type { ErrorFieldRootProps } from './error-field.types';

// --------------------------------------------------

const ErrorFieldRoot = forwardRef<ViewRef, ErrorFieldRootProps>(
  (props, ref) => {
    const {
      children,
      className,
      classNames,
      isInvalid = false,
      entering = ENTERING_ANIMATION_CONFIG,
      exiting = EXITING_ANIMATION_CONFIG,
      ...restProps
    } = props;

    const tvStyles = errorFieldStyles.root();

    const containerStyles = tvStyles.container({
      className: [className, classNames?.container],
    });

    const textStyles = tvStyles.text({ className: classNames?.text });

    if (!isInvalid) return null;

    return (
      <Animated.View
        ref={ref}
        entering={entering}
        exiting={exiting}
        className={containerStyles}
        {...restProps}
      >
        {typeof children === 'string' ? (
          <Text className={textStyles}>{children}</Text>
        ) : (
          children
        )}
      </Animated.View>
    );
  }
);

// --------------------------------------------------

ErrorFieldRoot.displayName = DISPLAY_NAME.ROOT;

/**
 * ErrorField component for displaying validation errors
 *
 * @component ErrorField - Error message container with entering/exiting animations.
 * Automatically wraps string children with Text component.
 * Hidden when isInvalid is false.
 */
const ErrorField = ErrorFieldRoot;

export default ErrorField;
