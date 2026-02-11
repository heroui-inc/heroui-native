import { forwardRef, useMemo } from 'react';
import { View } from 'react-native';
import Animated from 'react-native-reanimated';

import { useIsOnSurface } from '../../helpers/external/hooks';
import {
  AnimationSettingsProvider,
  FormItemStateProvider,
} from '../../helpers/internal/contexts';
import * as RadioPrimitives from '../../primitives/radio';
import {
  useRadioIndicatorThumbAnimation,
  useRadioRootAnimation,
} from './radio.animation';
import { DEFAULT_HIT_SLOP, DISPLAY_NAME } from './radio.constants';
import { radioClassNames, radioStyleSheet } from './radio.styles';
import type {
  RadioIndicatorProps,
  RadioIndicatorThumbProps,
  RadioProps,
  RadioRenderProps,
} from './radio.types';

const useRadio = RadioPrimitives.useRadioContext;

const AnimatedRadioRoot = Animated.createAnimatedComponent(
  RadioPrimitives.Root
);

const AnimatedRadioIndicator = Animated.createAnimatedComponent(
  RadioPrimitives.Indicator
);

// --------------------------------------------------

const RadioRoot = forwardRef<RadioPrimitives.RootRef, RadioProps>(
  (props, ref) => {
    const {
      children,
      isSelected,
      onSelectedChange,
      isDisabled,
      isInvalid,
      variant,
      className,
      animation,
      ...restProps
    } = props;

    const isOnSurfaceAutoDetected = useIsOnSurface();
    const finalVariant =
      variant !== undefined
        ? variant
        : isOnSurfaceAutoDetected
          ? 'secondary'
          : 'primary';

    const rootClassName = radioClassNames.root({
      className,
    });

    const renderProps: RadioRenderProps = {
      isSelected: isSelected ?? false,
      isDisabled: isDisabled ?? false,
      isInvalid: isInvalid ?? false,
    };

    const content =
      typeof children === 'function'
        ? children(renderProps)
        : (children ?? <RadioIndicator />);

    const formItemStateContextValue = useMemo(
      () => ({
        isDisabled: isDisabled ?? false,
        isInvalid: isInvalid ?? false,
        isRequired: false,
      }),
      [isDisabled, isInvalid]
    );

    const { isAllAnimationsDisabled } = useRadioRootAnimation({
      animation,
    });

    const animationSettingsContextValue = useMemo(
      () => ({
        isAllAnimationsDisabled,
      }),
      [isAllAnimationsDisabled]
    );

    return (
      <AnimationSettingsProvider value={animationSettingsContextValue}>
        <FormItemStateProvider value={formItemStateContextValue}>
          <AnimatedRadioRoot
            ref={ref}
            variant={finalVariant}
            className={rootClassName}
            isSelected={isSelected}
            onSelectedChange={onSelectedChange}
            isDisabled={isDisabled}
            isInvalid={isInvalid}
            hitSlop={props.hitSlop ?? DEFAULT_HIT_SLOP}
            {...restProps}
          >
            {content}
          </AnimatedRadioRoot>
        </FormItemStateProvider>
      </AnimationSettingsProvider>
    );
  }
);

// --------------------------------------------------

const RadioIndicator = forwardRef<Animated.View, RadioIndicatorProps>(
  (props, ref) => {
    const { children, className, style, ...restProps } = props;

    const { isSelected, isInvalid, variant } = useRadio();

    const indicatorClassName = radioClassNames.indicator({
      variant,
      isSelected,
      isInvalid,
      className,
    });

    return (
      <AnimatedRadioIndicator
        ref={ref}
        className={indicatorClassName}
        style={[radioStyleSheet.borderCurve, style]}
        {...restProps}
      >
        {children ?? <RadioIndicatorThumb />}
      </AnimatedRadioIndicator>
    );
  }
);

// --------------------------------------------------

const RadioIndicatorThumb = forwardRef<View, RadioIndicatorThumbProps>(
  (props, ref) => {
    const {
      className,
      style,
      animation,
      isAnimatedStyleActive = true,
      ...restProps
    } = props;

    const { isSelected } = useRadio();

    const thumbClassName = radioClassNames.indicatorThumb({
      isSelected,
      className,
    });

    const { rContainerStyle } = useRadioIndicatorThumbAnimation({
      animation,
      isSelected,
    });

    const thumbStyle = isAnimatedStyleActive ? [rContainerStyle, style] : style;

    return (
      <Animated.View
        ref={ref}
        className={thumbClassName}
        style={thumbStyle}
        {...restProps}
      />
    );
  }
);

// --------------------------------------------------

RadioRoot.displayName = DISPLAY_NAME.RADIO_ROOT;
RadioIndicator.displayName = DISPLAY_NAME.RADIO_INDICATOR;
RadioIndicatorThumb.displayName = DISPLAY_NAME.RADIO_INDICATOR_THUMB;

/**
 * Compound Radio component with sub-components.
 *
 * @component Radio - Individual radio option. Works standalone with `isSelected`/`onSelectedChange`,
 * or inside a RadioGroup with `value` prop. Handles selection state and renders default indicator
 * if no children provided. Supports render function children to access state
 * (`isSelected`, `isInvalid`, `isDisabled`).
 *
 * @component Radio.Indicator - Optional container for the radio circle. Renders default thumb
 * if no children provided. Manages the visual selection state.
 *
 * @component Radio.IndicatorThumb - Optional inner circle that appears when selected. Animates
 * scale based on selection. Can be replaced with custom content.
 *
 * @see Full documentation: https://v3.heroui.com/docs/native/components/radio
 */
const CompoundRadio = Object.assign(RadioRoot, {
  /** @optional Custom radio indicator container */
  Indicator: RadioIndicator,
  /** @optional Custom indicator thumb that appears when selected */
  IndicatorThumb: RadioIndicatorThumb,
});

export { useRadio };
export default CompoundRadio;
