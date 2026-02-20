import { forwardRef, useMemo, useRef } from 'react';
import { View, type GestureResponderEvent } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useSharedValue } from 'react-native-reanimated';
import { HeroText } from '../../helpers/internal/components';
import { AnimationSettingsProvider } from '../../helpers/internal/contexts';
import type { ViewRef } from '../../helpers/internal/types';
import * as SliderPrimitives from '../../primitives/slider';
import { useSlider } from '../../primitives/slider';
import { clamp } from '../../primitives/slider/slider.utils';
import {
  useSliderRootAnimation,
  useSliderThumbAnimation,
} from './slider.animation';
import { DISPLAY_NAME } from './slider.constants';
import sliderClassNames, { styleSheet } from './slider.styles';
import type {
  SliderFillProps,
  SliderOutputProps,
  SliderProps,
  SliderThumbProps,
  SliderTrackProps,
} from './slider.types';

const AnimatedKnob = Animated.createAnimatedComponent(View);

// --------------------------------------------------

const SliderRoot = forwardRef<ViewRef, SliderProps>((props, ref) => {
  const {
    children,
    orientation = 'horizontal',
    isDisabled = false,
    animation,
    className,
    style,
    ...primitiveProps
  } = props;

  const { isAllAnimationsDisabled } = useSliderRootAnimation({ animation });

  const animationSettingsContextValue = useMemo(
    () => ({
      isAllAnimationsDisabled,
    }),
    [isAllAnimationsDisabled]
  );

  const rootClassName = sliderClassNames.root({
    orientation,
    isDisabled,
    className,
  });

  return (
    <AnimationSettingsProvider value={animationSettingsContextValue}>
      <SliderPrimitives.Root
        ref={ref}
        orientation={orientation}
        isDisabled={isDisabled}
        className={rootClassName}
        style={style}
        {...primitiveProps}
      >
        {children}
      </SliderPrimitives.Root>
    </AnimationSettingsProvider>
  );
});

// --------------------------------------------------

const SliderOutput = forwardRef<ViewRef, SliderOutputProps>((props, ref) => {
  const { children, className, style, ...restProps } = props;

  const { values, orientation, isDisabled, getThumbValueLabel } = useSlider();

  const outputClassName = sliderClassNames.output({ className });

  const defaultContent = values
    .map((_, i) => getThumbValueLabel(i))
    .join(' – ');

  const resolvedChildren =
    typeof children === 'function'
      ? children({
          state: { values, getThumbValueLabel },
          orientation,
          isDisabled,
        })
      : children;

  return (
    <SliderPrimitives.Output ref={ref} style={style} {...restProps}>
      <HeroText className={outputClassName}>
        {resolvedChildren ?? defaultContent}
      </HeroText>
    </SliderPrimitives.Output>
  );
});

// --------------------------------------------------

const SliderTrack = forwardRef<ViewRef, SliderTrackProps>((props, ref) => {
  const { children, className, style, hitSlop = 8, ...restProps } = props;

  const {
    minValue,
    maxValue,
    orientation,
    isDisabled,
    handleTapAtValue,
    trackSize,
    thumbSize,
  } = useSlider();

  const trackClassName = sliderClassNames.track({
    orientation,
    className,
  });

  const handleTapRef = useRef(handleTapAtValue);
  handleTapRef.current = handleTapAtValue;

  const tapGesture = useMemo(() => {
    const effectiveTrackSize = trackSize - thumbSize;

    return Gesture.Tap()
      .runOnJS(true)
      .enabled(!isDisabled)
      .onEnd((event) => {
        if (effectiveTrackSize <= 0) return;

        const pos = orientation === 'horizontal' ? event.x : event.y;
        const adjustedPos =
          orientation === 'horizontal'
            ? pos - thumbSize / 2
            : trackSize - pos - thumbSize / 2;

        const pct = clamp(adjustedPos / effectiveTrackSize, 0, 1);
        const rawValue = minValue + pct * (maxValue - minValue);
        handleTapRef.current(rawValue);
      });
  }, [trackSize, thumbSize, isDisabled, orientation, minValue, maxValue]);

  return (
    <GestureDetector gesture={tapGesture}>
      <SliderPrimitives.Track
        ref={ref}
        className={trackClassName}
        style={[styleSheet.borderCurve, style]}
        hitSlop={hitSlop}
        {...restProps}
      >
        {children}
      </SliderPrimitives.Track>
    </GestureDetector>
  );
});

// --------------------------------------------------

const SliderFill = forwardRef<ViewRef, SliderFillProps>((props, ref) => {
  const { className, style, ...restProps } = props;

  const { values, orientation, getThumbPercent, trackSize, thumbSize } =
    useSlider();

  const fillClassName = sliderClassNames.fill({ orientation, className });

  const isSingleThumb = values.length <= 1;
  const startPercent = isSingleThumb ? 0 : getThumbPercent(0);
  const endPercent = isSingleThumb
    ? getThumbPercent(0)
    : getThumbPercent(values.length - 1);

  const effectiveTrackSize = trackSize - thumbSize;

  const fillStyle = useMemo(() => {
    if (orientation === 'horizontal') {
      const left = startPercent * effectiveTrackSize;
      const width =
        (endPercent - startPercent) * effectiveTrackSize + thumbSize;

      return {
        left,
        width: Math.max(width, thumbSize),
      };
    }

    const bottom = startPercent * effectiveTrackSize;
    const height = (endPercent - startPercent) * effectiveTrackSize + thumbSize;

    return {
      bottom,
      height: Math.max(height, thumbSize),
    };
  }, [orientation, startPercent, endPercent, effectiveTrackSize, thumbSize]);

  return (
    <SliderPrimitives.Fill
      ref={ref}
      className={fillClassName}
      style={[styleSheet.borderCurve, fillStyle, style]}
      {...restProps}
    />
  );
});

// --------------------------------------------------

const SliderThumb = forwardRef<ViewRef, SliderThumbProps>((props, ref) => {
  const {
    index = 0,
    isDisabled: thumbDisabled,
    animation,
    className,
    classNames,
    styles: stylesProp,
    style,
    hitSlop = 12,
    onTouchEnd,
    children,
    ...restProps
  } = props;

  const {
    values,
    minValue,
    maxValue,
    step,
    orientation,
    isDisabled: sliderDisabled,
    getThumbPercent,
    isThumbDragging,
    updateValue,
    setThumbDragging,
    trackSize,
    thumbSize,
  } = useSlider();

  const disabled = thumbDisabled ?? sliderDisabled;
  const isDragging = isThumbDragging(index);

  const { rKnobStyle } = useSliderThumbAnimation({
    animation,
    isDragging,
  });

  const { thumbContainer: containerSlot, thumbKnob: knobSlot } =
    sliderClassNames.thumb({ orientation });

  const thumbContainerClassName = containerSlot({
    className: [className, classNames?.thumbContainer],
  });
  const thumbKnobClassName = knobSlot({
    className: classNames?.thumbKnob,
  });

  const percent = getThumbPercent(index);
  const startValue = useSharedValue(0);

  const valuesRef = useRef(values);
  valuesRef.current = values;

  const updateValueRef = useRef(updateValue);
  updateValueRef.current = updateValue;

  const setThumbDraggingRef = useRef(setThumbDragging);
  setThumbDraggingRef.current = setThumbDragging;

  const panGesture = useMemo(() => {
    const effectiveTrackSize = trackSize - thumbSize;

    const gesture = Gesture.Pan()
      .runOnJS(true)
      .enabled(!disabled)
      .onBegin(() => {
        startValue.set(valuesRef.current[index] ?? minValue);
        setThumbDraggingRef.current(index, true);
      })
      .onUpdate((event) => {
        const delta =
          orientation === 'horizontal'
            ? event.translationX
            : -event.translationY;
        const valueDelta =
          effectiveTrackSize > 0
            ? (delta / effectiveTrackSize) * (maxValue - minValue)
            : 0;
        const newValue = clamp(
          startValue.get() + valueDelta,
          minValue,
          maxValue
        );
        const snapped =
          Math.round((newValue - minValue) / step) * step + minValue;
        const clampedSnapped = clamp(snapped, minValue, maxValue);
        updateValueRef.current(index, clampedSnapped);
      })
      .onFinalize(() => {
        setThumbDraggingRef.current(index, false);
      });

    return gesture;
  }, [
    disabled,
    index,
    minValue,
    maxValue,
    step,
    orientation,
    trackSize,
    thumbSize,
    startValue,
  ]);

  const positionStyle = useMemo(() => {
    const effectiveTrackSize = trackSize - thumbSize;
    const offset = percent * effectiveTrackSize;

    if (orientation === 'horizontal') {
      return { left: offset };
    }
    return { bottom: offset };
  }, [percent, trackSize, thumbSize, orientation]);

  const handleTouchEnd = (event: GestureResponderEvent) => {
    setThumbDraggingRef.current(index, false);
    onTouchEnd?.(event);
  };

  return (
    <GestureDetector gesture={panGesture}>
      <SliderPrimitives.Thumb
        ref={ref}
        index={index}
        className={thumbContainerClassName}
        style={[
          styleSheet.borderCurve,
          positionStyle,
          stylesProp?.thumbContainer,
          style,
        ]}
        onTouchEnd={handleTouchEnd}
        hitSlop={hitSlop}
        {...restProps}
      >
        {children ?? (
          <AnimatedKnob
            className={thumbKnobClassName}
            style={[styleSheet.borderCurve, rKnobStyle, stylesProp?.thumbKnob]}
          />
        )}
      </SliderPrimitives.Thumb>
    </GestureDetector>
  );
});

// --------------------------------------------------

SliderRoot.displayName = DISPLAY_NAME.ROOT;
SliderOutput.displayName = DISPLAY_NAME.OUTPUT;
SliderTrack.displayName = DISPLAY_NAME.TRACK;
SliderFill.displayName = DISPLAY_NAME.FILL;
SliderThumb.displayName = DISPLAY_NAME.THUMB;

// --------------------------------------------------

/**
 * Compound Slider component with sub-components
 *
 * @component Slider - Main container that manages slider value state, orientation,
 * and provides context to all sub-components. Supports single value and range modes.
 *
 * @component Slider.Output - Optional display of current value(s). Supports render
 * functions for custom formatting. Shows formatted value label by default.
 *
 * @component Slider.Track - Sizing container for Fill and Thumb elements. Sets the
 * cross-axis dimension (h-5 horizontal, w-5 vertical) and centers Thumb via Yoga
 * alignment. Reports its layout size for position calculations. Supports tap-to-position
 * and render functions for dynamic content (e.g. multiple thumbs for range sliders).
 *
 * @component Slider.Fill - Responsive fill bar that stretches full cross-axis of Track
 * (via inset-y-0 / inset-x-0). Only main-axis position (left + width) is computed.
 *
 * @component Slider.Thumb - Draggable thumb element using react-native-gesture-handler.
 * Centered on the cross-axis by Track's Yoga alignment (no manual offset needed).
 * Size is set via className and measured via onLayout into thumbSize context.
 * Animates scale on press via react-native-reanimated. Each thumb gets `role="slider"`
 * with full `accessibilityValue` from the primitive layer.
 *
 * Architecture:
 * All value logic, accessibility, state management, dragging state, track/thumb
 * measurement, and onChangeEnd lifecycle are managed by the primitive context
 * (`useSlider`). The component layer is purely for styling, animations,
 * and gesture handling.
 *
 * @see Full documentation: https://v3.heroui.com/docs/native/components/slider
 */
const CompoundSlider = Object.assign(SliderRoot, {
  /** @optional Value display with optional render function */
  Output: SliderOutput,
  /** @optional Sizing container for fill and thumbs, supports tap-to-position */
  Track: SliderTrack,
  /** @optional Responsive fill bar stretching full cross-axis */
  Fill: SliderFill,
  /** @optional Draggable thumb with gesture support, centered by Track alignment */
  Thumb: SliderThumb,
});

export { useSlider };
export default CompoundSlider;
