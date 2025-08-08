import { forwardRef } from 'react';
import type { ViewRef } from '../../helpers/types/primitives';
import * as RadioGroupPrimitives from '../../primitives/radio-group';
import { ErrorField } from '../error-field';
import { DISPLAY_NAME } from './radio-group.constants';
import radioGroupStyles from './radio-group.styles';
import type {
  RadioGroupErrorMessageProps,
  RadioGroupProps,
} from './radio-group.types';

// --------------------------------------------------

const useRadioGroupContext = RadioGroupPrimitives.useRadioGroupContext;

const RadioGroupRoot = forwardRef<
  RadioGroupPrimitives.RootRef,
  RadioGroupProps
>((props, ref) => {
  const {
    className,
    orientation = 'vertical',
    isValid = true,
    ...restProps
  } = props;

  const tvStyles = radioGroupStyles.root({
    orientation,
    className,
  });

  return (
    <RadioGroupPrimitives.Root
      ref={ref}
      className={tvStyles}
      orientation={orientation}
      isValid={isValid}
      {...restProps}
    />
  );
});

// --------------------------------------------------

const RadioGroupErrorMessage = forwardRef<ViewRef, RadioGroupErrorMessageProps>(
  (props, ref) => {
    const { isValid, orientation } = useRadioGroupContext();
    const { className, ...restProps } = props;

    const tvStyles = radioGroupStyles.errorMessage({
      orientation,
      className,
    });

    return (
      <ErrorField
        ref={ref}
        isValid={isValid}
        className={tvStyles}
        {...restProps}
      />
    );
  }
);

// --------------------------------------------------

RadioGroupRoot.displayName = DISPLAY_NAME.RADIO_GROUP_ROOT;
RadioGroupErrorMessage.displayName = DISPLAY_NAME.RADIO_GROUP_ERROR_MESSAGE;

/**
 * Compound RadioGroup component with sub-components
 *
 * @component RadioGroup - Container that manages the selection state of Radio components.
 * Supports both horizontal and vertical orientations.
 *
 * @component RadioGroup.ErrorMessage - Error message displayed when radio group is invalid.
 * Shown with animation below the radio group content. Takes full width when orientation is horizontal.
 *
 * @see Full documentation: https://heroui.com/components/radio-group
 */
const CompoundRadioGroup = Object.assign(RadioGroupRoot, {
  /** @optional Error message displayed when radio group is invalid */
  ErrorMessage: RadioGroupErrorMessage,
});

export default CompoundRadioGroup;
export { useRadioGroupContext };
