import { forwardRef, useCallback, useMemo, useRef } from 'react';
import type { LayoutChangeEvent } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { HeroText } from '../../helpers/internal/components';
import type { ViewRef } from '../../helpers/internal/types';
import * as SliderPrimitives from '../../primitives/slider';
import { useSliderContext } from '../../primitives/slider';
import { clamp } from '../../primitives/slider/slider.utils';
import {
  DISPLAY_NAME,
  THUMB_HIT_SLOP,
  THUMB_SIZE,
  THUMB_SPRING_CONFIG,
  TRACK_HEIGHT,
} from './slider.constants';
import sliderClassNames, { styleSheet } from './slider.styles';
import type {
  SliderFillProps,
  SliderOutputProps,
  SliderProps,
  SliderThumbProps,
  SliderTrackProps,
} from './slider.types';

// ---------------------------------------------------------------------------
// Animated primitive wrappers
// ---------------------------------------------------------------------------

const AnimatedThumb = Animated.createAnimatedComponent(SliderPrimitives.Thumb);

// --------------------------------------------------
// Root – wraps primitive Root with styling
// --------------------------------------------------

const SliderRoot = forwardRef<ViewRef, SliderProps>((props, ref) => {
  const {
    children,
    orientation = 'horizontal',
    isDisabled = false,
    className,
    classNames,
    styles: stylesProp,
    style,
    ...primitiveProps
  } = props;

  const { container: containerSlot } = sliderClassNames.root({
    orientation,
    isDisabled,
  });

  const containerClassName = containerSlot({
    className: [className, classNames?.container],
  });

  return (
    <SliderPrimitives.Root
      ref={ref}
      orientation={orientation}
      isDisabled={isDisabled}
      className={containerClassName}
      style={[stylesProp?.container, style]}
      {...primitiveProps}
    >
      {children}
    </SliderPrimitives.Root>
  );
});

// --------------------------------------------------
// Output – styled value display
// --------------------------------------------------

const SliderOutput = forwardRef<ViewRef, SliderOutputProps>((props, ref) => {
  const { children, className, style, ...restProps } = props;

  const { values, getThumbValueLabel } = useSliderContext();

  const outputClassName = sliderClassNames.output({ className });

  const defaultContent = values
    .map((_, i) => getThumbValueLabel(i))
    .join(' – ');

  return (
    <SliderPrimitives.Output ref={ref} style={style} {...restProps}>
      <HeroText className={outputClassName}>
        {children ?? defaultContent}
      </HeroText>
    </SliderPrimitives.Output>
  );
});

// --------------------------------------------------
// Track – styled + tap gesture + layout measurement
// --------------------------------------------------

const SliderTrack = forwardRef<ViewRef, SliderTrackProps>((props, ref) => {
  const { children, className, style, ...restProps } = props;

  const {
    minValue,
    maxValue,
    orientation,
    isDisabled,
    handleTapAtValue,
    trackSize,
    setTrackSize,
  } = useSliderContext();

  const trackClassName = sliderClassNames.track({
    orientation,
    className,
  });

  const handleLayout = useCallback(
    (event: LayoutChangeEvent) => {
      const { width, height } = event.nativeEvent.layout;
      setTrackSize(orientation === 'horizontal' ? width : height);
    },
    [orientation, setTrackSize]
  );

  // Stable ref avoids recreating the gesture when handleTapAtValue changes
  const handleTapRef = useRef(handleTapAtValue);
  handleTapRef.current = handleTapAtValue;

  const tapGesture = useMemo(() => {
    const effectiveTrackSize = trackSize - THUMB_SIZE;

    return Gesture.Tap()
      .runOnJS(true)
      .enabled(!isDisabled)
      .hitSlop({
        top: THUMB_SIZE,
        bottom: THUMB_SIZE,
      })
      .onEnd((event) => {
        if (effectiveTrackSize <= 0) return;

        const pos = orientation === 'horizontal' ? event.x : event.y;
        const adjustedPos =
          orientation === 'horizontal'
            ? pos - THUMB_SIZE / 2
            : trackSize - pos - THUMB_SIZE / 2;

        const pct = clamp(adjustedPos / effectiveTrackSize, 0, 1);
        const rawValue = minValue + pct * (maxValue - minValue);
        handleTapRef.current(rawValue);
      });
  }, [trackSize, isDisabled, orientation, minValue, maxValue]);

  return (
    <GestureDetector gesture={tapGesture}>
      <SliderPrimitives.Track
        ref={ref}
        className={trackClassName}
        style={[styleSheet.track, style]}
        onLayout={handleLayout}
        {...restProps}
      >
        {children}
      </SliderPrimitives.Track>
    </GestureDetector>
  );
});

// --------------------------------------------------
// Fill – styled bar that hugs the thumb(s)
// --------------------------------------------------

const SliderFill = forwardRef<ViewRef, SliderFillProps>((props, ref) => {
  const { className, style, ...restProps } = props;

  const { values, orientation, getThumbPercent, trackSize } =
    useSliderContext();

  const fillClassName = sliderClassNames.fill({ className });

  const centerOffset = -(THUMB_SIZE - TRACK_HEIGHT) / 2;

  const isSingleThumb = values.length <= 1;
  const startPercent = isSingleThumb ? 0 : getThumbPercent(0);
  const endPercent = isSingleThumb
    ? getThumbPercent(0)
    : getThumbPercent(values.length - 1);

  const effectiveTrackSize = trackSize - THUMB_SIZE;

  const fillStyle = useMemo(() => {
    if (orientation === 'horizontal') {
      const left = startPercent * effectiveTrackSize;
      const width =
        (endPercent - startPercent) * effectiveTrackSize + THUMB_SIZE;

      return {
        left,
        width: Math.max(width, THUMB_SIZE),
        height: THUMB_SIZE,
        top: centerOffset,
      };
    }

    const bottom = startPercent * effectiveTrackSize;
    const height =
      (endPercent - startPercent) * effectiveTrackSize + THUMB_SIZE;

    return {
      bottom,
      height: Math.max(height, THUMB_SIZE),
      width: THUMB_SIZE,
      left: centerOffset,
    };
  }, [orientation, startPercent, endPercent, effectiveTrackSize, centerOffset]);

  return (
    <SliderPrimitives.Fill
      ref={ref}
      className={fillClassName}
      style={[styleSheet.fill, fillStyle, style]}
      {...restProps}
    />
  );
});

// --------------------------------------------------
// Thumb – styled + pan gesture + scale animation
// Uses AnimatedThumb (primitive) so accessibility props
// (role="slider", accessibilityValue) are applied automatically.
// --------------------------------------------------

const SliderThumb = forwardRef<ViewRef, SliderThumbProps>((props, ref) => {
  const {
    index = 0,
    isDisabled: thumbDisabled,
    className,
    style,
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
    updateValue,
    setThumbDragging,
    trackSize,
  } = useSliderContext();

  const disabled = thumbDisabled ?? sliderDisabled;

  const thumbClassName = sliderClassNames.thumb({ className });

  const percent = getThumbPercent(index);
  const thumbScale = useSharedValue(1);
  const startValue = useSharedValue(0);

  // Stable refs prevent gesture recreation when values/callbacks change
  const valuesRef = useRef(values);
  valuesRef.current = values;

  const updateValueRef = useRef(updateValue);
  updateValueRef.current = updateValue;

  const setThumbDraggingRef = useRef(setThumbDragging);
  setThumbDraggingRef.current = setThumbDragging;

  const panGesture = useMemo(() => {
    const effectiveTrackSize = trackSize - THUMB_SIZE;

    const gesture = Gesture.Pan()
      .runOnJS(true)
      .enabled(!disabled)
      .hitSlop({
        top: THUMB_HIT_SLOP,
        bottom: THUMB_HIT_SLOP,
        left: THUMB_HIT_SLOP,
        right: THUMB_HIT_SLOP,
      })
      .onStart(() => {
        startValue.value = valuesRef.current[index] ?? minValue;
        thumbScale.value = withSpring(0.95, THUMB_SPRING_CONFIG);
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
          startValue.value + valueDelta,
          minValue,
          maxValue
        );
        const snapped =
          Math.round((newValue - minValue) / step) * step + minValue;
        const clampedSnapped = clamp(snapped, minValue, maxValue);
        updateValueRef.current(index, clampedSnapped);
      })
      .onEnd(() => {
        thumbScale.value = withSpring(1, THUMB_SPRING_CONFIG);
        setThumbDraggingRef.current(index, false);
      })
      .onFinalize(() => {
        thumbScale.value = withSpring(1, THUMB_SPRING_CONFIG);
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
    startValue,
    thumbScale,
  ]);

  const animatedThumbStyle = useAnimatedStyle(() => ({
    transform: [{ scale: thumbScale.value }],
  }));

  const positionStyle = useMemo(() => {
    const effectiveTrackSize = trackSize - THUMB_SIZE;
    const offset = percent * effectiveTrackSize;
    const centerOffset = -(THUMB_SIZE - TRACK_HEIGHT) / 2;

    if (orientation === 'horizontal') {
      return { left: offset, top: centerOffset };
    }
    return { bottom: offset, left: centerOffset };
  }, [percent, trackSize, orientation]);

  return (
    <GestureDetector gesture={panGesture}>
      <AnimatedThumb
        ref={ref}
        index={index}
        className={thumbClassName}
        style={[
          styleSheet.thumb,
          { width: THUMB_SIZE, height: THUMB_SIZE },
          positionStyle,
          animatedThumbStyle,
          style,
        ]}
        {...restProps}
      >
        {children}
      </AnimatedThumb>
    </GestureDetector>
  );
});

// --------------------------------------------------
// Display names
// --------------------------------------------------

SliderRoot.displayName = DISPLAY_NAME.ROOT;
SliderOutput.displayName = DISPLAY_NAME.OUTPUT;
SliderTrack.displayName = DISPLAY_NAME.TRACK;
SliderFill.displayName = DISPLAY_NAME.FILL;
SliderThumb.displayName = DISPLAY_NAME.THUMB;

// --------------------------------------------------
// Compound export
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
 * @component Slider.Track - Container for Fill and Thumb elements. Reports its layout
 * size for position calculations. Supports tap-to-position (tapping on the track
 * snaps the nearest thumb to that position). Supports render functions for dynamic
 * content (e.g. rendering multiple thumbs for range sliders).
 *
 * @component Slider.Fill - Pill-shaped bar that hugs the thumb, extending from the
 * start to wrap around the active thumb(s). Same height as the thumb for a cohesive look.
 *
 * @component Slider.Thumb - Draggable thumb element using react-native-gesture-handler.
 * Animates scale to 0.95 on press via react-native-reanimated. Has an accent-colored
 * border matching the fill. Supports multiple thumbs for range sliders via the index prop.
 * Each thumb gets `role="slider"` with full `accessibilityValue` (min, max, now, text)
 * from the primitive layer.
 *
 * Architecture:
 * All value logic, accessibility, state management, dragging state, track measurement,
 * and onChangeEnd lifecycle are managed by the primitive context (`useSliderContext`).
 * The component layer is purely for styling, animations, and gesture handling.
 *
 * @see Full documentation: https://v3.heroui.com/docs/native/components/slider
 */
const CompoundSlider = Object.assign(SliderRoot, {
  /** @optional Value display with optional render function */
  Output: SliderOutput,
  /** @optional Track container for fill and thumbs, supports tap-to-position */
  Track: SliderTrack,
  /** @optional Pill-shaped fill bar that hugs the thumb */
  Fill: SliderFill,
  /** @optional Draggable thumb with gesture support and accent border */
  Thumb: SliderThumb,
});

export { useSliderContext };
export default CompoundSlider;
