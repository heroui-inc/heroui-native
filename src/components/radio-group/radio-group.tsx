import * as RadioGroupPrimitives from '@/primitives/radio-group';
import { forwardRef } from 'react';
import { DISPLAY_NAME } from './radio-group.constants';
import radioGroupStyles from './radio-group.styles';
import type { RadioGroupProps } from './radio-group.types';

// --------------------------------------------------

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

RadioGroupRoot.displayName = DISPLAY_NAME.RADIO_GROUP_ROOT;

/**
 * RadioGroup component for managing radio button selection
 *
 * @component RadioGroup - Container that manages the selection state of Radio components.
 * Supports both horizontal and vertical orientations.
 *
 * @see Full documentation: https://heroui.com/components/radio-group
 */
const RadioGroup = RadioGroupRoot;

export default RadioGroup;
