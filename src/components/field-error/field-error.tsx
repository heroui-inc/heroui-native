import { forwardRef } from 'react';
import Animated from 'react-native-reanimated';
import { HeroText } from '../../helpers/internal/components';
import { useFormItemState } from '../../helpers/internal/contexts';
import type { ViewRef } from '../../helpers/internal/types';
import { childrenToString } from '../../helpers/internal/utils';
import { useTextField } from '../text-field';
import { useFieldErrorRootAnimation } from './field-error.animation';
import { DISPLAY_NAME } from './field-error.constants';
import fieldErrorStyles from './field-error.styles';
import type { FieldErrorRootProps } from './field-error.types';

// --------------------------------------------------

const FieldErrorRoot = forwardRef<ViewRef, FieldErrorRootProps>(
  (props, ref) => {
    const {
      children,
      className,
      classNames,
      textProps,
      isInvalid: localIsInvalid,
      animation,
      ...restProps
    } = props;

    const formItemState = useFormItemState();
    const textFieldContext = useTextField();

    // Merge form item state with local props (local takes precedence)
    const isInvalid =
      localIsInvalid !== undefined
        ? localIsInvalid
        : (formItemState?.isInvalid ?? false);

    const isInsideTextField = Boolean(textFieldContext);

    const tvStyles = fieldErrorStyles.root({
      isInsideTextField,
    });

    const containerStyles = tvStyles.container({
      className: [className, classNames?.container],
    });

    const textStyles = tvStyles.text({
      className: [classNames?.text, textProps?.className],
    });

    const { entering, exiting } = useFieldErrorRootAnimation({ animation });

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
  }
);

// --------------------------------------------------

FieldErrorRoot.displayName = DISPLAY_NAME.ROOT;

/**
 * FieldError component for displaying validation errors
 *
 * @component FieldError - Error message container with entering/exiting animations.
 * Automatically wraps string children with Text component.
 * Hidden when isInvalid is false.
 */
const FieldError = FieldErrorRoot;

export default FieldError;
