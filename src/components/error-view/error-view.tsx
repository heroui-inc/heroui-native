import { forwardRef } from 'react';
import Animated from 'react-native-reanimated';
import { Text } from '../../helpers/components';
import type { ViewRef } from '../../helpers/types/primitives';
import { childrenToString } from '../../helpers/utils';
import {
  DISPLAY_NAME,
  ENTERING_ANIMATION_CONFIG,
  EXITING_ANIMATION_CONFIG,
} from './error-view.constants';
import errorViewStyles from './error-view.styles';
import type { ErrorViewRootProps } from './error-view.types';

// --------------------------------------------------

const ErrorViewRoot = forwardRef<ViewRef, ErrorViewRootProps>((props, ref) => {
  const {
    children,
    className,
    classNames,
    textProps,
    isInvalid = false,
    entering = ENTERING_ANIMATION_CONFIG,
    exiting = EXITING_ANIMATION_CONFIG,
    ...restProps
  } = props;

  const tvStyles = errorViewStyles.root();

  const containerStyles = tvStyles.container({
    className: [className, classNames?.container],
  });

  const textStyles = tvStyles.text({
    className: [classNames?.text, textProps?.className],
  });

  if (!isInvalid) return null;

  return (
    <Animated.View
      ref={ref}
      entering={entering}
      exiting={exiting}
      className={containerStyles}
      {...restProps}
    >
      {(() => {
        const stringifiedChildren = childrenToString(children);

        return stringifiedChildren ? (
          <Text className={textStyles} {...textProps}>
            {stringifiedChildren}
          </Text>
        ) : (
          children
        );
      })()}
    </Animated.View>
  );
});

// --------------------------------------------------

ErrorViewRoot.displayName = DISPLAY_NAME.ROOT;

/**
 * ErrorView component for displaying validation errors
 *
 * @component ErrorView - Error message container with entering/exiting animations.
 * Automatically wraps string children with Text component.
 * Hidden when isInvalid is false.
 */
const ErrorView = ErrorViewRoot;

export default ErrorView;
