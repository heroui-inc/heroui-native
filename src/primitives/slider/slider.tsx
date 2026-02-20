import {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { View } from 'react-native';
import { useControllableState } from '../../helpers/internal/hooks';
import { createContext } from '../../helpers/internal/utils';
import * as Slot from '../slot';
import type {
  FillProps,
  FillRef,
  OutputProps,
  OutputRef,
  RootProps,
  RootRef,
  SliderContextValue,
  SliderRenderProps,
  SliderState,
  SliderValue,
  ThumbProps,
  ThumbRef,
  TrackProps,
  TrackRef,
} from './slider.types';
import {
  clamp,
  denormalizeValue,
  formatValue,
  normalizeValue,
  snapToStep,
  valueToPercent,
} from './slider.utils';

// ---------------------------------------------------------------------------
// Slider context – provides all value logic to sub-components
// ---------------------------------------------------------------------------

const [SliderProvider, useSlider] = createContext<SliderContextValue>({
  name: 'SliderPrimitiveContext',
  errorMessage:
    'Slider compound components cannot be rendered outside the Slider.Root component',
});

// --------------------------------------------------
// Root – manages value state and provides context
// --------------------------------------------------

const Root = forwardRef<RootRef, RootProps>(
  (
    {
      asChild,
      children,
      'value': valueProp,
      defaultValue,
      onChange,
      onChangeEnd,
      minValue = 0,
      maxValue = 100,
      step = 1,
      formatOptions,
      orientation = 'horizontal',
      isDisabled = false,
      'aria-label': ariaLabel,
      ...restProps
    },
    ref
  ) => {
    /** Track whether the consumer originally passed an array value */
    const wasArray = useRef(
      Array.isArray(valueProp) || Array.isArray(defaultValue)
    );

    /** Track layout width (horizontal) or height (vertical) in pixels */
    const [trackSize, setTrackSize] = useState(0);

    /** Measured thumb dimension (main-axis) in pixels, set via onLayout at the component level */
    const [thumbSize, setThumbSize] = useState(0);

    const [internalValue, setInternalValue] = useControllableState<SliderValue>(
      {
        prop: valueProp,
        defaultProp: defaultValue ?? minValue,
        onChange,
      }
    );

    const values = useMemo(
      () =>
        normalizeValue(internalValue ?? minValue).map((v) =>
          clamp(v, minValue, maxValue)
        ),
      [internalValue, minValue, maxValue]
    );

    // -----------------------------------------------------------------
    // Dragging state – tracks which thumb (if any) is being dragged.
    // When dragging transitions true → false, `onChangeEnd` fires with
    // the latest committed value (avoids the stale-closure problem of
    // calling onChangeEnd directly from gesture callbacks).
    // -----------------------------------------------------------------

    const [draggingIndex, setDraggingIndex] = useState<number | null>(null);

    const internalValueRef = useRef(internalValue);
    internalValueRef.current = internalValue;

    const onChangeEndRef = useRef(onChangeEnd);
    onChangeEndRef.current = onChangeEnd;

    const prevDraggingRef = useRef<number | null>(null);

    useEffect(() => {
      const wasDragging = prevDraggingRef.current !== null;
      const isNowIdle = draggingIndex === null;

      if (wasDragging && isNowIdle && internalValueRef.current !== undefined) {
        onChangeEndRef.current?.(internalValueRef.current);
      }

      prevDraggingRef.current = draggingIndex;
    }, [draggingIndex]);

    // -----------------------------------------------------------------
    // Value helpers
    // -----------------------------------------------------------------

    const getThumbPercent = useCallback(
      (index: number): number => {
        const val = values[index] ?? minValue;
        return valueToPercent(val, minValue, maxValue);
      },
      [values, minValue, maxValue]
    );

    const getThumbValueLabel = useCallback(
      (index: number): string => {
        const val = values[index] ?? minValue;
        return formatValue(val, formatOptions);
      },
      [values, minValue, formatOptions]
    );

    /**
     * For range sliders the thumb's min is bounded by the previous thumb's value;
     * for the first thumb (or single-thumb sliders) it equals `minValue`.
     */
    const getThumbMinValue = useCallback(
      (index: number): number => {
        return index === 0 ? minValue : (values[index - 1] ?? minValue);
      },
      [values, minValue]
    );

    /**
     * For range sliders the thumb's max is bounded by the next thumb's value;
     * for the last thumb (or single-thumb sliders) it equals `maxValue`.
     */
    const getThumbMaxValue = useCallback(
      (index: number): number => {
        return index === values.length - 1
          ? maxValue
          : (values[index + 1] ?? maxValue);
      },
      [values, maxValue]
    );

    /**
     * Update a single thumb's value with range-ordering enforcement.
     * Adjacent thumbs act as boundaries: a thumb can never cross its neighbours.
     */
    const updateValue = useCallback(
      (index: number, newValue: number) => {
        const newValues = [...values];
        newValues[index] = newValue;

        if (newValues.length > 1) {
          if (index > 0 && newValue < (newValues[index - 1] ?? minValue)) {
            newValues[index] = newValues[index - 1] ?? minValue;
          }
          if (
            index < newValues.length - 1 &&
            newValue > (newValues[index + 1] ?? maxValue)
          ) {
            newValues[index] = newValues[index + 1] ?? maxValue;
          }
        }

        setInternalValue(denormalizeValue(newValues, wasArray.current));
      },
      [values, minValue, maxValue, setInternalValue]
    );

    // -----------------------------------------------------------------
    // Dragging helpers exposed via context
    // -----------------------------------------------------------------

    const isThumbDragging = useCallback(
      (index: number): boolean => {
        return draggingIndex === index;
      },
      [draggingIndex]
    );

    const setThumbDragging = useCallback(
      (index: number, dragging: boolean): void => {
        setDraggingIndex(dragging ? index : null);
      },
      []
    );

    /**
     * Snap the closest thumb to a raw target value.
     * Used by tap-to-position on the track (implemented at the component level).
     * Calls `onChangeEnd` directly since no drag phase is involved.
     */
    const handleTapAtValue = useCallback(
      (targetValue: number) => {
        if (isDisabled) return;

        const snapped = snapToStep(targetValue, minValue, maxValue, step);

        let closestIdx = 0;
        if (values.length > 1) {
          let closestDist = Math.abs((values[0] ?? 0) - snapped);
          for (let i = 1; i < values.length; i++) {
            const dist = Math.abs((values[i] ?? 0) - snapped);
            if (dist < closestDist) {
              closestDist = dist;
              closestIdx = i;
            }
          }
        }

        const newValues = [...values];
        newValues[closestIdx] = snapped;
        const newSliderValue = denormalizeValue(newValues, wasArray.current);
        setInternalValue(newSliderValue);
        onChangeEnd?.(newSliderValue);
      },
      [
        isDisabled,
        values,
        minValue,
        maxValue,
        step,
        setInternalValue,
        onChangeEnd,
      ]
    );

    // -----------------------------------------------------------------
    // Context
    // -----------------------------------------------------------------

    const contextValue = useMemo<SliderContextValue>(
      () => ({
        values,
        minValue,
        maxValue,
        step,
        orientation,
        isDisabled,
        formatOptions,
        getThumbPercent,
        getThumbValueLabel,
        getThumbMinValue,
        getThumbMaxValue,
        updateValue,
        isThumbDragging,
        setThumbDragging,
        handleTapAtValue,
        trackSize,
        setTrackSize,
        thumbSize,
        setThumbSize,
      }),
      [
        values,
        minValue,
        maxValue,
        step,
        orientation,
        isDisabled,
        formatOptions,
        getThumbPercent,
        getThumbValueLabel,
        getThumbMinValue,
        getThumbMaxValue,
        updateValue,
        isThumbDragging,
        setThumbDragging,
        handleTapAtValue,
        trackSize,
        thumbSize,
      ]
    );

    const Component = asChild ? Slot.View : View;

    return (
      <SliderProvider value={contextValue}>
        <Component
          ref={ref}
          aria-label={ariaLabel}
          aria-disabled={isDisabled}
          accessibilityState={{ disabled: isDisabled }}
          {...restProps}
        >
          {children}
        </Component>
      </SliderProvider>
    );
  }
);

Root.displayName = 'HeroUINative.Primitive.Slider.Root';

// --------------------------------------------------
// Track – resolves render-function children via context
// --------------------------------------------------

const Track = forwardRef<TrackRef, TrackProps>(
  ({ asChild, children, onLayout, ...restProps }, ref) => {
    const {
      values,
      orientation,
      isDisabled,
      getThumbValueLabel,
      setTrackSize,
    } = useSlider();

    const state = useMemo<SliderState>(
      () => ({ values, getThumbValueLabel }),
      [values, getThumbValueLabel]
    );

    const renderProps: SliderRenderProps = { state, orientation, isDisabled };

    const resolvedChildren =
      typeof children === 'function' ? children(renderProps) : children;

    const handleLayout = useCallback(
      (event: import('react-native').LayoutChangeEvent) => {
        const { width, height } = event.nativeEvent.layout;
        setTrackSize(orientation === 'horizontal' ? width : height);
        onLayout?.(event);
      },
      [orientation, setTrackSize, onLayout]
    );

    const Component = asChild ? Slot.View : View;

    return (
      <Component ref={ref} onLayout={handleLayout} {...restProps}>
        {resolvedChildren}
      </Component>
    );
  }
);

Track.displayName = 'HeroUINative.Primitive.Slider.Track';

// --------------------------------------------------
// Fill – unstyled placeholder
// --------------------------------------------------

const Fill = forwardRef<FillRef, FillProps>(({ asChild, ...props }, ref) => {
  const Component = asChild ? Slot.View : View;

  return <Component ref={ref} {...props} />;
});

Fill.displayName = 'HeroUINative.Primitive.Slider.Fill';

// --------------------------------------------------
// Thumb – accessibility-enabled view for each slider thumb
// --------------------------------------------------

const Thumb = forwardRef<ThumbRef, ThumbProps>(
  ({ asChild, index = 0, onLayout, ...props }, ref) => {
    const {
      orientation,
      isDisabled,
      getThumbPercent,
      getThumbValueLabel,
      setThumbSize,
    } = useSlider();

    const Component = asChild ? Slot.View : View;

    /**
     * RN's native bridge converts `accessibilityValue.min/max/now` to integers
     * (`long long`), so passing fractional slider values (e.g. 0.75) crashes.
     * We normalise to a 0–100 percentage scale and let `text` carry the
     * human-readable label.
     */
    const percentNow = Math.round(getThumbPercent(index) * 100);

    const handleLayout = useCallback(
      (event: import('react-native').LayoutChangeEvent) => {
        const { width, height } = event.nativeEvent.layout;
        setThumbSize(orientation === 'horizontal' ? width : height);
        onLayout?.(event);
      },
      [orientation, setThumbSize, onLayout]
    );

    return (
      <Component
        ref={ref}
        role="slider"
        aria-disabled={isDisabled}
        accessibilityValue={{
          min: 0,
          max: 100,
          now: percentNow,
          text: getThumbValueLabel(index),
        }}
        accessibilityState={{ disabled: isDisabled }}
        onLayout={handleLayout}
        {...props}
      />
    );
  }
);

Thumb.displayName = 'HeroUINative.Primitive.Slider.Thumb';

// --------------------------------------------------
// Output – resolves render-function children via context
// --------------------------------------------------

const Output = forwardRef<OutputRef, OutputProps>(
  ({ asChild, children, ...restProps }, ref) => {
    const { values, orientation, isDisabled, getThumbValueLabel } = useSlider();

    const state = useMemo<SliderState>(
      () => ({ values, getThumbValueLabel }),
      [values, getThumbValueLabel]
    );

    const renderProps: SliderRenderProps = { state, orientation, isDisabled };

    const resolvedChildren =
      typeof children === 'function' ? children(renderProps) : children;

    const Component = asChild ? Slot.View : View;

    return (
      <Component ref={ref} {...restProps}>
        {resolvedChildren}
      </Component>
    );
  }
);

Output.displayName = 'HeroUINative.Primitive.Slider.Output';

export { Fill, Output, Root, Thumb, Track, useSlider };
