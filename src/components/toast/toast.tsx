import {
  forwardRef,
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
} from 'react';
import { View, type LayoutChangeEvent, type ViewStyle } from 'react-native';
import { GestureDetector } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { useThemeColor } from '../../helpers/external/hooks';
import { cn, colorKit } from '../../helpers/external/utils';
import {
  CloseIcon,
  HeroText,
  PortalGestureRoot,
  ThemeBackground,
  useHasDefaultThemeBackground,
} from '../../helpers/internal/components';
import { AnimationSettingsProvider } from '../../helpers/internal/contexts';
import type { ViewRef } from '../../helpers/internal/types';
import { createContext } from '../../helpers/internal/utils';
import { composeRefs } from '../../primitives/slot/utils';
import * as ToastPrimitive from '../../primitives/toast';
import { useToastConfig } from '../../providers/toast/toast-config.context';
import { useToastItem } from '../../providers/toast/toast-item.context';
import type { ToastComponentProps } from '../../providers/toast/types';
import { Button } from '../button';
import { flattenColorOverBackground } from '../glass-view/glass-view.utils';
import { useToastRootAnimation } from './toast.animation';
import { DISPLAY_NAME } from './toast.constants';
import { useCoverBackgroundStyle } from './toast.hooks';
import { toastClassNames, toastStyleSheet } from './toast.styles';
import type {
  DefaultToastProps,
  ToastActionProps,
  ToastBackgroundProps,
  ToastCloseProps,
  ToastContextValue,
  ToastDescriptionProps,
  ToastRootProps,
  ToastTitleProps,
} from './toast.types';

const AnimatedToastRoot = Animated.createAnimatedComponent(ToastPrimitive.Root);

/**
 * Layout getters of a host element ref (`ReactNativeElement`, React Native
 * 0.83+). Read defensively: older versions do not provide them.
 */
type MeasurableElement = {
  offsetHeight?: unknown;
  offsetWidth?: unknown;
  parentElement?: { offsetWidth?: unknown } | null;
};

const [ToastProvider, useToast] = createContext<ToastContextValue>({
  name: 'ToastContext',
});

// --------------------------------------------------

/**
 * Generic absolute-fill background container rendered behind the toast
 * surface. With no `children`, the active library theme decides the default
 * content: `glass` renders the opaque `overlay` fallback color on every
 * platform (`forceFallbackColor`) — toasts stack, so an iOS blur layer would
 * reveal the toast underneath; other themes render nothing. Pass `children`
 * to host arbitrary content (gradients, images) with the container's
 * positioning and clipping applied.
 */
const ToastBackground = forwardRef<ViewRef, ToastBackgroundProps>(
  ({ className, ...props }, ref) => {
    const backgroundClassName = toastClassNames.background({ className });

    return (
      <ThemeBackground
        ref={ref}
        className={backgroundClassName}
        fallbackColor="overlay"
        forceFallbackColor
        {...props}
      />
    );
  }
);

// --------------------------------------------------

const ToastRoot = forwardRef<ViewRef, ToastRootProps>((props, ref) => {
  const globalConfig = useToastConfig();

  const {
    children,
    variant: localVariant,
    placement: localPlacement,
    index,
    total,
    heights,
    maxVisibleToasts,
    background,
    className,
    style,
    animation: localAnimation,
    isSwipeable: localIsSwipeable,
    isAnimatedStyleActive = true,
    hide,
    onLayout: onLayoutProp,
    ...restProps
  } = props;

  /**
   * Merge global config with local props, ensuring local props take precedence
   */
  const variant = localVariant ?? globalConfig?.variant ?? 'default';
  const placement = localPlacement ?? globalConfig?.placement ?? 'top';
  const animation = localAnimation ?? globalConfig?.animation;
  const isSwipeable = localIsSwipeable ?? globalConfig?.isSwipeable;

  // Access id from props (id is omitted from ToastRootProps type but available at runtime)
  const toastProps = props as ToastRootProps & Pick<ToastComponentProps, 'id'>;
  const { id } = toastProps;

  const rootClassName = toastClassNames.root({
    className,
  });

  // Background color of the covers that hide the content of stacked toasts
  const coverBackgroundStyle = useCoverBackgroundStyle({
    rootClassName,
    style,
  });

  const hasDefaultThemeBackground = useHasDefaultThemeBackground();

  const [themeColorOverlay, themeColorBackground] = useThemeColor([
    'overlay',
    'background',
  ]);

  /**
   * On themes with default background content (e.g. glass) the root's
   * `--color-overlay` is translucent, so the covers would let the content of
   * a stacked toast show through. Paint them with the same opaque color the
   * toast background layer uses: the `overlay` token flattened over
   * `--background`.
   */
  const coverFallbackStyle = useMemo<ViewStyle | undefined>(
    () =>
      hasDefaultThemeBackground
        ? {
            backgroundColor: flattenColorOverBackground(
              themeColorOverlay,
              themeColorBackground
            ),
          }
        : undefined,
    [hasDefaultThemeBackground, themeColorOverlay, themeColorBackground]
  );

  const { isBehindStack, stack, getStack, frontDrag, timers } = useToastItem();

  const {
    rContainerStyle,
    rRootStyle,
    rCoverStyle,
    rCoverEdgeStyle,
    onLayout: onLayoutHeight,
    recordMountHeight,
    entering,
    exiting,
    panGesture,
    isAllAnimationsDisabled,
  } = useToastRootAnimation({
    animation,
    index,
    total,
    heights,
    placement,
    hide,
    id,
    isSwipeable,
    maxVisibleToasts,
    stack,
    getStack,
    frontDrag,
    timers,
  });

  const rootRef = useRef<ViewRef>(null);
  const composedRef = useMemo(() => composeRefs(ref, rootRef), [ref]);

  /**
   * Measures the natural height synchronously after mount, before the first
   * frame is drawn, so the toasts behind it take the right height without
   * waiting for the asynchronous `onLayout` event. `offsetHeight` (layout
   * height, ignoring transforms) is available on host refs from React
   * Native 0.83; on older versions `onLayout` records the height instead.
   *
   * The measurement is only trusted when the toast fits its container: the
   * root stretches to its parent, so a root wider than its parent means the
   * overlay has not been laid out yet (Android, first toast after the
   * overlay mounts) and the text wrapped at the wrong width. `onLayout`
   * records the height in that case.
   */
  useLayoutEffect(() => {
    const node = rootRef.current as unknown as MeasurableElement | null;
    const offsetHeight = node?.offsetHeight;
    const offsetWidth = node?.offsetWidth;
    const parentWidth = node?.parentElement?.offsetWidth;
    if (
      typeof offsetHeight === 'number' &&
      typeof offsetWidth === 'number' &&
      typeof parentWidth === 'number' &&
      offsetHeight > 0 &&
      parentWidth > 0 &&
      offsetWidth <= parentWidth + 1
    ) {
      recordMountHeight(offsetHeight);
    }
  }, [recordMountHeight]);

  const handleLayout = useCallback(
    (event: LayoutChangeEvent) => {
      onLayoutHeight(event);
      onLayoutProp?.(event);
    },
    [onLayoutHeight, onLayoutProp]
  );

  const rootStyle = isAnimatedStyleActive
    ? [toastStyleSheet.root, rRootStyle, style]
    : [toastStyleSheet.root, style];

  const animationSettingsContextValue = useMemo(
    () => ({
      isAllAnimationsDisabled,
    }),
    [isAllAnimationsDisabled]
  );

  const contextValue = useMemo(
    () => ({
      variant,
      hide,
      id,
    }),
    [variant, hide, id]
  );

  /**
   * Background layer rendered behind the toast surface. `undefined` falls
   * back to the theme-aware default; `null` removes the layer.
   */
  const backgroundElement =
    background === undefined ? <ToastBackground /> : background;

  return (
    <AnimationSettingsProvider value={animationSettingsContextValue}>
      <ToastProvider value={contextValue}>
        {/*
          Positions the toast at the top or bottom of the overlay and runs the
          entering / exiting layout animations. A toast behind the visible
          stack is fully transparent, so it mounts and unmounts without them
          and never flashes into view.
        */}
        <Animated.View
          className={cn(
            'absolute left-0 right-0',
            placement === 'top' ? 'top-0' : 'bottom-0'
          )}
          entering={isBehindStack ? undefined : entering}
          exiting={isBehindStack ? undefined : exiting}
        >
          {/*
            The overlay that hosts toasts is a separate native root, and
            Gesture Handler only routes touches to detectors that have a
            `GestureHandlerRootView` in their native ancestor chain. Without
            this nested root the pan gesture never activates on Android. It
            wraps only the toast, not the whole overlay, so touches outside
            the toasts still reach the app.
          */}
          <PortalGestureRoot>
            <GestureDetector gesture={panGesture}>
              {/*
                Static view the pan gesture is attached to. Gesture Handler
                measures the drag relative to this view, so it must not be the
                view that moves with the finger: the translation would shrink
                as the toast follows it and the toast would trail the finger.
              */}
              <View collapsable={false}>
                {/*
                  Stack position (translateY, scale, opacity) is animated on
                  this view rather than on the root. Android clips a scaled
                  view against its unscaled bounds, so the root only animates
                  its height and clips its content unscaled.
                */}
                <Animated.View
                  style={isAnimatedStyleActive ? rContainerStyle : undefined}
                >
                  <AnimatedToastRoot
                    ref={composedRef}
                    className={rootClassName}
                    style={rootStyle}
                    onLayout={handleLayout}
                    {...restProps}
                  >
                    {backgroundElement}
                    {children}
                  </AnimatedToastRoot>
                  {/*
                    Covers for toasts stacked behind the front one. Such a
                    toast takes the front toast's height, so its content is
                    cut off; the covers hide it. Both are siblings drawn over
                    the root (not children) that reach 2px past its bottom
                    edge: the stack scale puts the rounded edge on fractional
                    pixels, and a cover clipped by the same edge would let the
                    anti-aliased edge pixels of the text show through.

                    - Full cover: hides all content. Fades out while the front
                      toast is dragged, so the next toast is readable as the
                      front one is swiped away.
                    - Edge cover: hides the cut-off bottom line of content.
                      Stays while the front toast is dragged.

                    Both are transparent on the front toast.
                  */}
                  {isAnimatedStyleActive && (
                    <Animated.View
                      pointerEvents="none"
                      aria-hidden
                      accessibilityElementsHidden
                      importantForAccessibility="no-hide-descendants"
                      className={toastClassNames.cover()}
                      style={[
                        coverBackgroundStyle,
                        coverFallbackStyle,
                        rCoverStyle,
                      ]}
                    />
                  )}
                  {isAnimatedStyleActive && (
                    <Animated.View
                      pointerEvents="none"
                      aria-hidden
                      accessibilityElementsHidden
                      importantForAccessibility="no-hide-descendants"
                      className={toastClassNames.coverEdge()}
                      style={[
                        coverBackgroundStyle,
                        coverFallbackStyle,
                        rCoverEdgeStyle,
                      ]}
                    />
                  )}
                </Animated.View>
              </View>
            </GestureDetector>
          </PortalGestureRoot>
        </Animated.View>
      </ToastProvider>
    </AnimationSettingsProvider>
  );
});

// --------------------------------------------------

const ToastTitle = forwardRef<ViewRef, ToastTitleProps>((props, ref) => {
  const { children, className, ...restProps } = props;

  const { variant } = useToast();

  const labelClassName = toastClassNames.label({
    variant,
    className,
  });

  return (
    <HeroText ref={ref} className={labelClassName} {...restProps}>
      {children}
    </HeroText>
  );
});

// --------------------------------------------------

const ToastDescription = forwardRef<ViewRef, ToastDescriptionProps>(
  (props, ref) => {
    const { children, className, ...restProps } = props;

    const descriptionClassName = toastClassNames.description({
      className,
    });

    return (
      <HeroText ref={ref} className={descriptionClassName} {...restProps}>
        {children}
      </HeroText>
    );
  }
);

// --------------------------------------------------

const ToastAction = forwardRef<ViewRef, ToastActionProps>((props, ref) => {
  const {
    children,
    variant,
    size = 'sm',
    animation,
    className,
    ...restProps
  } = props;

  const { variant: toastVariant } = useToast();

  const hasDefaultThemeBackground = useHasDefaultThemeBackground();

  const actionClassName = toastClassNames.action({
    variant: toastVariant,
    className,
  });

  const [
    themeColorDefaultHover,
    themeColorAccentHover,
    themeColorSuccessHover,
    themeColorWarningHover,
    themeColorDangerHover,
  ] = useThemeColor([
    'default-hover',
    'accent-hover',
    'success-hover',
    'warning-hover',
    'danger-hover',
  ]);

  const highlightColorMap = useMemo(() => {
    switch (toastVariant) {
      // Themes with default background content (e.g. glass) render a
      // translucent surface, so the hover overlay uses a subtler alpha.
      case 'default':
        return hasDefaultThemeBackground
          ? colorKit.setAlpha(themeColorDefaultHover, 0.1).hex()
          : themeColorDefaultHover;
      case 'accent':
        return themeColorAccentHover;
      case 'success':
        return themeColorSuccessHover;
      case 'warning':
        return themeColorWarningHover;
      case 'danger':
        return themeColorDangerHover;
    }
  }, [
    toastVariant,
    hasDefaultThemeBackground,
    themeColorDefaultHover,
    themeColorAccentHover,
    themeColorSuccessHover,
    themeColorWarningHover,
    themeColorDangerHover,
  ]);

  const buttonVariant = useMemo(() => {
    if (variant) return variant;

    switch (toastVariant) {
      case 'accent':
        return 'primary';
      case 'danger':
        return 'danger';
      default:
        return 'tertiary';
    }
  }, [toastVariant, variant]);

  const defaultHighlightConfig = useMemo(
    () => ({
      backgroundColor: { value: highlightColorMap },
      opacity: { value: [0, 1] as [number, number] },
    }),
    [highlightColorMap]
  );

  const resolvedAnimation =
    typeof animation === 'object' && animation !== null ? animation : undefined;

  const mergedAnimation = useMemo<ToastActionProps['animation']>(() => {
    if (
      animation === false ||
      animation === 'disabled' ||
      animation === 'disable-all'
    ) {
      return animation;
    }

    return {
      scale: false,
      ...resolvedAnimation,
      highlight: resolvedAnimation?.highlight ?? defaultHighlightConfig,
    };
  }, [animation, resolvedAnimation, defaultHighlightConfig]);

  return (
    <Button
      ref={ref}
      variant={buttonVariant}
      size={size}
      className={actionClassName}
      feedbackVariant="scale-highlight"
      animation={mergedAnimation}
      {...restProps}
    >
      {children}
    </Button>
  );
});

// --------------------------------------------------

const ToastClose = forwardRef<ViewRef, ToastCloseProps>((props, ref) => {
  const {
    children,
    iconProps,
    size = 'sm',
    className,
    onPress,
    ...restProps
  } = props;
  const { hide, id } = useToast();

  const themeColorMuted = useThemeColor('muted');

  /**
   * Handle close button press
   * If hide and id are available from context, use them to hide the toast
   * Otherwise, use the provided onPress handler
   */
  const handlePress = (event: any) => {
    if (hide && id) {
      hide(id);
    }
    if (onPress && typeof onPress === 'function') {
      onPress(event);
    }
  };

  return (
    <Button
      ref={ref}
      variant="ghost"
      size={size}
      isIconOnly
      aria-label="Close"
      className={className}
      onPress={handlePress}
      {...restProps}
    >
      {children ?? (
        <CloseIcon
          size={iconProps?.size ?? 16}
          color={iconProps?.color ?? themeColorMuted}
        />
      )}
    </Button>
  );
});

// --------------------------------------------------

/**
 * Default styled toast component for simplified toast.show() API
 * Used internally when showing toasts with string or config object (without component)
 */
export function DefaultToast(props: DefaultToastProps) {
  const globalConfig = useToastConfig();

  const {
    id,
    variant: localVariant,
    placement: localPlacement,
    isSwipeable: localIsSwipeable,
    animation: localAnimation,
    label,
    description,
    actionLabel,
    onActionPress,
    icon,
    hide,
    show,
    ...toastComponentProps
  } = props;

  /**
   * Merge global config with local props, ensuring local props take precedence
   */
  const variant = localVariant ?? globalConfig?.variant ?? 'default';
  const placement = localPlacement ?? globalConfig?.placement ?? 'top';
  const isSwipeable = localIsSwipeable ?? globalConfig?.isSwipeable;
  const animation = localAnimation ?? globalConfig?.animation;

  const handleActionPress = () => {
    if (onActionPress) {
      onActionPress({ show, hide });
    }
  };

  return (
    <ToastRoot
      id={id}
      variant={variant}
      placement={placement}
      isSwipeable={isSwipeable}
      animation={animation}
      className="flex-row gap-3"
      hide={hide}
      show={show}
      {...toastComponentProps}
    >
      {icon && <View>{icon}</View>}
      <View className="flex-1">
        {label && <ToastTitle>{label}</ToastTitle>}
        {description && <ToastDescription>{description}</ToastDescription>}
      </View>
      {actionLabel && (
        <ToastAction onPress={handleActionPress}>{actionLabel}</ToastAction>
      )}
    </ToastRoot>
  );
}

// --------------------------------------------------

ToastRoot.displayName = DISPLAY_NAME.TOAST_ROOT;
ToastBackground.displayName = DISPLAY_NAME.TOAST_BACKGROUND;
ToastTitle.displayName = DISPLAY_NAME.TOAST_TITLE;
ToastDescription.displayName = DISPLAY_NAME.TOAST_DESCRIPTION;
ToastAction.displayName = DISPLAY_NAME.TOAST_ACTION;
ToastClose.displayName = DISPLAY_NAME.TOAST_CLOSE;

/**
 * Compound Toast component with sub-components
 *
 * @component Toast - Main toast container that displays notification messages with various variants.
 *
 * @component Toast.Background - Absolute-fill background container behind the
 * toast surface. With no children, the active library theme decides the content
 * (glass theme renders a blur layer). Accepts children to host custom content
 * such as gradients with the container's positioning and clipping applied.
 * Replaceable via the `background` prop on Toast.
 *
 * @component Toast.Title - Title/heading text of the toast notification.
 *
 * @component Toast.Description - Descriptive text content of the toast.
 *
 * @component Toast.Action - Action button within the toast. Variant is automatically determined
 * based on toast variant but can be overridden.
 *
 * @component Toast.Close - Close button for dismissing the toast. Renders as an icon-only button.
 *
 * Props flow from Toast to sub-components via context (variant).
 *
 * @see Full documentation: https://heroui.com/docs/native/components/toast
 */
const CompoundToast = Object.assign(ToastRoot, {
  /** Theme-aware background container behind the toast surface */
  Background: ToastBackground,
  /** Toast title - renders text content */
  Title: ToastTitle,
  /** Toast description - renders descriptive text */
  Description: ToastDescription,
  /** Toast action button - renders action with appropriate variant */
  Action: ToastAction,
  /** Toast close button - renders icon-only close button */
  Close: ToastClose,
});

export default CompoundToast;
