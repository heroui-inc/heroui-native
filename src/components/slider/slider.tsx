import { forwardRef, useCallback, useMemo, useRef, useState } from 'react';
import type { LayoutChangeEvent } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { HeroText } from '../../helpers/internal/components';
import type { ViewRef } from '../../helpers/internal/types';
import { createContext } from '../../helpers/internal/utils';
import * as SliderPrimitives from '../../primitives/slider';
import { useSliderContext } from '../../primitives/slider';
import { clamp } from '../../primitives/slider/slider.utils';
import {
  DISPLAY_NAME,
  THUMB_HIT_SLOP_MAP,
  THUMB_SIZE_MAP,
  THUMB_SPRING_CONFIG,
  TRACK_HEIGHT_MAP,
} from './slider.constants';
import sliderClassNames, { styleSheet } from './slider.styles';
import type {
  SliderFillProps,
  SliderOutputProps,
  SliderProps,
  SliderStyleContextValue,
  SliderThumbProps,
  SliderTrackProps,
} from './slider.types';

// ---------------------------------------------------------------------------
// Animated primitive wrappers
// ---------------------------------------------------------------------------

const AnimatedThumb = Animated.createAnimatedComponent(SliderPrimitives.Thumb);

// ---------------------------------------------------------------------------
// Style context – visual properties shared between compound sub-components
// ---------------------------------------------------------------------------

const [SliderStyleProvider, useSliderStyle] =
  createContext<SliderStyleContextValue>({
    name: 'SliderStyleContext',
    errorMessage:
      'Slider style compound components cannot be rendered outside the Slider component',
  });

// --------------------------------------------------
// Root – wraps primitive Root with styling + visual context
// --------------------------------------------------

const SliderRoot = forwardRef<ViewRef, SliderProps>((props, ref) => {
  const {
    children,
    size = 'md',
    color = 'accent',
    orientation = 'horizontal',
    isDisabled = false,
    className,
    classNames,
    styles: stylesProp,
    style,
    ...primitiveProps
  } = props;

  const [trackSize, setTrackSize] = useState(0);

  const { container: containerSlot } = sliderClassNames.root({
    orientation,
    isDisabled,
  });

  const containerClassName = containerSlot({
    className: [className, classNames?.container],
  });

  const styleContextValue = useMemo<SliderStyleContextValue>(
    () => ({ size, color, trackSize, setTrackSize }),
    [size, color, trackSize]
  );

  return (
    <SliderStyleProvider value={styleContextValue}>
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
    </SliderStyleProvider>
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

  const { minValue, maxValue, orientation, isDisabled, handleTapAtValue } =
    useSliderContext();

  const { size, trackSize, setTrackSize } = useSliderStyle();

  const thumbSize = THUMB_SIZE_MAP[size];

  const trackClassName = sliderClassNames.track({
    orientation,
    size,
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
    const effectiveTrackSize = trackSize - thumbSize;

    return Gesture.Tap()
      .runOnJS(true)
      .enabled(!isDisabled)
      .hitSlop({
        top: thumbSize,
        bottom: thumbSize,
      })
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

  const { values, orientation, getThumbPercent } = useSliderContext();
  const { size, color, trackSize } = useSliderStyle();

  const fillClassName = sliderClassNames.fill({ color, className });

  const thumbSize = THUMB_SIZE_MAP[size];
  const trackCrossAxisSize = TRACK_HEIGHT_MAP[size];
  const centerOffset = -(thumbSize - trackCrossAxisSize) / 2;

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
        height: thumbSize,
        top: centerOffset,
      };
    }

    const bottom = startPercent * effectiveTrackSize;
    const height =
      (endPercent - startPercent) * effectiveTrackSize + thumbSize;

    return {
      bottom,
      height: Math.max(height, thumbSize),
      width: thumbSize,
      left: centerOffset,
    };
  }, [
    orientation,
    startPercent,
    endPercent,
    effectiveTrackSize,
    thumbSize,
    centerOffset,
  ]);

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
  } = useSliderContext();

  const { size, color, trackSize } = useSliderStyle();

  const disabled = thumbDisabled ?? sliderDisabled;
  const thumbSize = THUMB_SIZE_MAP[size];
  const hitSlop = THUMB_HIT_SLOP_MAP[size];
  const trackCrossAxisSize = TRACK_HEIGHT_MAP[size];

  const thumbClassName = sliderClassNames.thumb({ size, color, className });

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
    const effectiveTrackSize = trackSize - thumbSize;

    const gesture = Gesture.Pan()
      .runOnJS(true)
      .enabled(!disabled)
      .hitSlop({
        top: hitSlop,
        bottom: hitSlop,
        left: hitSlop,
        right: hitSlop,
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
    hitSlop,
    index,
    minValue,
    maxValue,
    step,
    orientation,
    trackSize,
    thumbSize,
    startValue,
    thumbScale,
  ]);

  const animatedThumbStyle = useAnimatedStyle(() => ({
    transform: [{ scale: thumbScale.value }],
  }));

  const positionStyle = useMemo(() => {
    const effectiveTrackSize = trackSize - thumbSize;
    const offset = percent * effectiveTrackSize;
    const centerOffset = -(thumbSize - trackCrossAxisSize) / 2;

    if (orientation === 'horizontal') {
      return { left: offset, top: centerOffset };
    }
    return { bottom: offset, left: centerOffset };
  }, [percent, trackSize, thumbSize, trackCrossAxisSize, orientation]);

  return (
    <GestureDetector gesture={panGesture}>
      <AnimatedThumb
        ref={ref}
        index={index}
        className={thumbClassName}
        style={[
          styleSheet.thumb,
          { width: thumbSize, height: thumbSize },
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
 * Animates scale to 0.95 on press via react-native-reanimated. Has a colored border
 * matching the fill. Supports multiple thumbs for range sliders via the index prop.
 * Each thumb gets `role="slider"` with full `accessibilityValue` (min, max, now, text)
 * from the primitive layer.
 *
 * Architecture:
 * - Primitive context (`useSliderContext`): value logic, accessibility, state management,
 *   dragging state, onChangeEnd lifecycle
 * - Style context (`useSliderStyle`): size, color, track measurement
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

export { useSliderContext, useSliderStyle };
export default CompoundSlider;
