import { forwardRef } from 'react';
import Animated from 'react-native-reanimated';
import { HeroText } from '../../helpers/internal/components';
import type { ViewRef } from '../../helpers/internal/types';
import { childrenToString } from '../../helpers/internal/utils';
import { useErrorViewRootAnimation } from './error-view.animation';
import { DISPLAY_NAME } from './error-view.constants';
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
    animation,
    ...restProps
  } = props;

  const tvStyles = errorViewStyles.root();

  const containerStyles = tvStyles.container({
    className: [className, classNames?.container],
  });

  const textStyles = tvStyles.text({
    className: [classNames?.text, textProps?.className],
  });

  const { entering, exiting } = useErrorViewRootAnimation({ animation });

  if (!isInvalid) return null;

  const stringifiedChildren = childrenToString(children);
  const renderedChildren = stringifiedChildren ? (
    <HeroText className={textStyles} {...textProps}>
      {stringifiedChildren}
    </HeroText>
  ) : (
    children
  );

  return (
    <Animated.View
      ref={ref}
      entering={entering}
      exiting={exiting}
      className={containerStyles}
      {...restProps}
    >
      {renderedChildren}
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
