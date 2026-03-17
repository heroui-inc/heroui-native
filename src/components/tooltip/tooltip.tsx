import { forwardRef, useEffect, useMemo, useRef } from 'react';
import type { Text, ViewStyle } from 'react-native';
import { Pressable, StyleSheet, useWindowDimensions, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useThemeColor } from '../../helpers/external/hooks';
import { cn } from '../../helpers/external/utils';
import {
  ArrowSvg,
  FullWindowOverlay,
  HeroText,
} from '../../helpers/internal/components';
import {
  AnimationSettingsProvider,
  useAnimationSettings,
} from '../../helpers/internal/contexts';
import {
  useAugmentedRef,
  usePopupPopoverContentAnimation,
  usePopupRootAnimation,
} from '../../helpers/internal/hooks';
import type { PressableRef } from '../../helpers/internal/types';
import * as PopoverPrimitives from '../../primitives/popover';
import type * as PopoverPrimitivesTypes from '../../primitives/popover/popover.types';
import {
  ARROW_EDGE_PADDING,
  DEFAULT_DELAY_DURATION,
  DEFAULT_INSETS,
  DEFAULT_OFFSET,
  DISPLAY_NAME,
} from './tooltip.constants';
import {
  TooltipContentProvider,
  TooltipTriggerProvider,
  useTooltipContent,
  useTooltipTrigger,
} from './tooltip.context';
import { tooltipClassNames, tooltipStyleSheet } from './tooltip.styles';
import type {
  TooltipArrowProps,
  TooltipContentProps,
  TooltipPlacement,
  TooltipPortalProps,
  TooltipRootProps,
  TooltipTextProps,
  TooltipTriggerProps,
  TooltipTriggerRef,
} from './tooltip.types';

const AnimatedContent = Animated.createAnimatedComponent(
  PopoverPrimitives.Content
);

const useTooltip = PopoverPrimitives.useRootContext;

// --------------------------------------------------

const TooltipRoot = forwardRef<
  PopoverPrimitivesTypes.RootRef,
  TooltipRootProps
>(
  (
    {
      children,
      isOpen: isOpenProp,
      isDefaultOpen,
      onOpenChange: onOpenChangeProp,
      animation,
      mode = 'press',
      delay = DEFAULT_DELAY_DURATION,
      isDisabled,
      ...props
    },
    ref
  ) => {
    const { isAllAnimationsDisabled } = usePopupRootAnimation({ animation });

    const animationSettingsContextValue = useMemo(
      () => ({ isAllAnimationsDisabled }),
      [isAllAnimationsDisabled]
    );

    const triggerContextValue = useMemo(() => ({ mode, delay }), [mode, delay]);

    return (
      <AnimationSettingsProvider value={animationSettingsContextValue}>
        <TooltipTriggerProvider value={triggerContextValue}>
          <PopoverPrimitives.Root
            ref={ref}
            isOpen={isOpenProp}
            isDefaultOpen={isDefaultOpen}
            onOpenChange={onOpenChangeProp}
            isDisabled={isDisabled}
            {...props}
          >
            {children}
          </PopoverPrimitives.Root>
        </TooltipTriggerProvider>
      </AnimationSettingsProvider>
    );
  }
);

// --------------------------------------------------

const TooltipTrigger = forwardRef<TooltipTriggerRef, TooltipTriggerProps>(
  (
    {
      children,
      isDisabled: isDisabledProp = false,
      accessibilityRole = 'button',
    },
    ref
  ) => {
    const {
      onOpenChange,
      isOpen,
      isDisabled: isDisabledRoot,
      setTriggerPosition,
      setContentLayout,
      isDefaultOpen,
      triggerPosition,
    } = useTooltip();

    const { mode, delay } = useTooltipTrigger();

    const isDisabled = isDisabledProp || !!isDisabledRoot;

    // Avoid reading `isOpen` in onPressOut: it would be stale if onPressOut fires
    // in the same event dispatch as onLongPress before React commits the state update.
    const wasOpenedByCurrentGesture = useRef(false);

    const augmentedRef = useAugmentedRef<PressableRef>({
      ref,
      methods: {
        open: () => {
          measureTrigger();
          onOpenChange(true);
        },
        close: () => {
          onOpenChange(false);
          setTriggerPosition(null);
          setContentLayout(null);
        },
      },
      deps: [isOpen],
    });

    // Deferred: the view has no measured position until after the first layout pass.
    useEffect(() => {
      if ((isDefaultOpen || isOpen) && !triggerPosition) {
        const timeoutId = setTimeout(() => {
          augmentedRef.current?.measure(
            (_x, _y, width, height, pageX, pageY) => {
              setTriggerPosition({ width, pageX, pageY, height });
              if (isDefaultOpen) {
                onOpenChange(true);
              }
            }
          );
        }, 0);
        return () => clearTimeout(timeoutId);
      }
      return undefined;
      // eslint-disable-next-line react-hooks/exhaustive-deps -- intentionally runs once on mount only
    }, []);

    function measureTrigger() {
      augmentedRef.current?.measure((_x, _y, width, height, pageX, pageY) => {
        setTriggerPosition({ width, pageX, pageY, height });
      });
    }

    // measureTrigger before onOpenChange: gives the native bridge a head-start so
    // triggerPosition is likely set before the portal's first render.
    function onLongPress() {
      measureTrigger();
      onOpenChange(true);
      wasOpenedByCurrentGesture.current = true;
    }

    function onPress() {
      if (isOpen) {
        onOpenChange(false);
        setTriggerPosition(null);
        setContentLayout(null);
      } else {
        measureTrigger();
        onOpenChange(true);
      }
    }

    function onPressOut() {
      // Don't close a tooltip opened via ref.open() or isDefaultOpen while the finger is still down.
      if (wasOpenedByCurrentGesture.current) {
        onOpenChange(false);
        setTriggerPosition(null);
        setContentLayout(null);
        wasOpenedByCurrentGesture.current = false;
      }
    }

    return (
      <Pressable
        ref={augmentedRef}
        onLongPress={mode === 'long-press' ? onLongPress : undefined}
        onPress={mode === 'press' ? onPress : undefined}
        onPressOut={mode === 'long-press' ? onPressOut : undefined}
        delayLongPress={mode === 'long-press' ? delay : undefined}
        disabled={isDisabled || undefined}
        aria-disabled={isDisabled || undefined}
        accessibilityRole={accessibilityRole}
      >
        {children}
      </Pressable>
    );
  }
);

// --------------------------------------------------

const TooltipPortal = ({
  className,
  children,
  disableFullWindowOverlay = false,
  ...props
}: TooltipPortalProps) => {
  // Re-provide AnimationSettingsProvider so animations work across the portal boundary.
  const animationSettingsContext = useAnimationSettings();

  const portalClassName = tooltipClassNames.portal({ className });

  return (
    <PopoverPrimitives.Portal {...props}>
      <AnimationSettingsProvider value={animationSettingsContext}>
        <FullWindowOverlay disableFullWindowOverlay={disableFullWindowOverlay}>
          <View className={portalClassName} pointerEvents="box-none">
            {/* Invisible full-screen overlay: captures outside taps to dismiss the tooltip. */}
            <PopoverPrimitives.Overlay style={StyleSheet.absoluteFill} />
            {children}
          </View>
        </FullWindowOverlay>
      </AnimationSettingsProvider>
    </PopoverPrimitives.Portal>
  );
};

// --------------------------------------------------

const TooltipContent = forwardRef<
  PopoverPrimitivesTypes.ContentRef,
  TooltipContentProps
>(
  (
    {
      placement = 'bottom',
      align = 'center',
      avoidCollisions = true,
      offset = DEFAULT_OFFSET,
      alignOffset = 0,
      className,
      children,
      style,
      animation,
      ...props
    },
    ref
  ) => {
    const { contentLayout } = useTooltip();
    const safeAreaInsets = useSafeAreaInsets();
    const { height: screenHeight } = useWindowDimensions();

    // Guard against a flash at the wrong position on the first render.
    const isReady = Boolean(contentLayout?.y && contentLayout.y < screenHeight);

    const insets = {
      top: DEFAULT_INSETS.top + safeAreaInsets.top,
      bottom: DEFAULT_INSETS.bottom + safeAreaInsets.bottom,
      left: DEFAULT_INSETS.left + safeAreaInsets.left,
      right: DEFAULT_INSETS.right + safeAreaInsets.right,
    };

    const contentClassName = tooltipClassNames.content({ className });

    const { entering, exiting } = usePopupPopoverContentAnimation({
      placement,
      offset,
      animation,
    });

    return (
      <TooltipContentProvider value={{ placement }}>
        {isReady && (
          <AnimatedContent
            ref={ref}
            entering={entering}
            exiting={exiting}
            placement={placement}
            align={align}
            avoidCollisions={avoidCollisions}
            offset={offset}
            alignOffset={alignOffset}
            insets={insets}
            className={contentClassName}
            style={[tooltipStyleSheet.contentContainer, style]}
            {...props}
          >
            {children}
          </AnimatedContent>
        )}
        {/* Invisible measurement clone: always mounted so the primitive can measure content dimensions before reveal. */}
        <AnimatedContent
          placement={placement}
          accessible={false}
          accessibilityElementsHidden
          importantForAccessibility="no"
          pointerEvents="none"
          collapsable={false}
          align={align}
          avoidCollisions={avoidCollisions}
          offset={offset}
          alignOffset={alignOffset}
          insets={insets}
          className={cn(contentClassName, 'absolute opacity-0')}
          style={[tooltipStyleSheet.contentContainer, style]}
          {...props}
        >
          {children}
        </AnimatedContent>
      </TooltipContentProvider>
    );
  }
);

// --------------------------------------------------

/**
 * Centres the arrow on the trigger along the content edge, clamped away from
 * the corners. When the content is too small for the full edge padding on both
 * sides, the padding shrinks symmetrically, so the arrow centres rather than
 * snapping to one edge.
 */
function clampArrowOffset(
  ideal: number,
  contentSpan: number,
  arrowSpan: number,
  edgePadding: number
): number {
  const pad = Math.min(edgePadding, Math.max(0, (contentSpan - arrowSpan) / 2));
  return Math.min(Math.max(pad, ideal), contentSpan - arrowSpan - pad);
}

function getArrowPlacementStyle(
  placement: TooltipPlacement,
  sideInset: number,
  crossOffset: number
): ViewStyle {
  switch (placement) {
    case 'top':
      return { position: 'absolute', bottom: sideInset, left: crossOffset };
    case 'bottom':
      return { position: 'absolute', top: sideInset, left: crossOffset };
    case 'left':
      return { position: 'absolute', right: sideInset, top: crossOffset };
    case 'right':
      return { position: 'absolute', left: sideInset, top: crossOffset };
  }
}

const TooltipArrow = forwardRef<View, TooltipArrowProps>(
  (
    {
      children,
      style,
      className,
      height = 12,
      width = 20,
      fill,
      stroke,
      strokeWidth = 1,
      strokeBaselineInset = 1,
      placement: placementProp,
    },
    ref
  ) => {
    const themeColorOverlay = useThemeColor('overlay');
    const { triggerPosition, contentLayout } = useTooltip();
    const { placement: placementContext } = useTooltipContent() ?? {};

    const placement = placementProp ?? placementContext;

    const arrowClassName = tooltipClassNames.arrow({ className });

    if (
      !triggerPosition ||
      !contentLayout ||
      contentLayout.x === 0 ||
      contentLayout.y === 0 ||
      !placement
    ) {
      return null;
    }

    const arrowFill = fill ?? themeColorOverlay;

    // Negative: arrow extends outside the content edge.
    const sideInset = -height + strokeBaselineInset;

    // top/bottom centre on the x-axis; left/right on the y-axis.
    const isVertical = placement === 'top' || placement === 'bottom';
    const crossOffset = clampArrowOffset(
      isVertical
        ? triggerPosition.pageX +
            triggerPosition.width / 2 -
            contentLayout.x -
            width / 2
        : triggerPosition.pageY +
            triggerPosition.height / 2 -
            contentLayout.y -
            width / 2,
      isVertical ? contentLayout.width : contentLayout.height,
      width,
      ARROW_EDGE_PADDING
    );

    const arrowPositionStyle = getArrowPlacementStyle(
      placement,
      sideInset,
      crossOffset
    );

    return (
      <Animated.View
        ref={ref}
        className={arrowClassName}
        style={[arrowPositionStyle, style]}
        pointerEvents="none"
      >
        {children ?? (
          <ArrowSvg
            width={width}
            height={height}
            placement={placement}
            fill={arrowFill}
            stroke={stroke}
            strokeWidth={strokeWidth}
          />
        )}
      </Animated.View>
    );
  }
);

// --------------------------------------------------

const TooltipText = forwardRef<Text, TooltipTextProps>(
  ({ className, children, ...props }, ref) => {
    const textClassName = tooltipClassNames.text({ className });

    return (
      <HeroText ref={ref} className={textClassName} {...props}>
        {children}
      </HeroText>
    );
  }
);

// --------------------------------------------------

TooltipRoot.displayName = DISPLAY_NAME.ROOT;
TooltipTrigger.displayName = DISPLAY_NAME.TRIGGER;
TooltipPortal.displayName = DISPLAY_NAME.PORTAL;
TooltipContent.displayName = DISPLAY_NAME.CONTENT;
TooltipArrow.displayName = DISPLAY_NAME.ARROW;
TooltipText.displayName = DISPLAY_NAME.TEXT;

/**
 * Compound Tooltip component with sub-components
 *
 * @component Tooltip - Root container managing open/close state, positioning, and animation.
 *
 * @component Tooltip.Trigger - Pressable that opens the tooltip on press (default) or
 * long-press. Exposes imperative `open()` / `close()` methods via ref.
 *
 * @component Tooltip.Portal - Renders tooltip content in a portal layer above other content,
 * using FullWindowOverlay on iOS to appear above native modals. Tapping outside the tooltip
 * automatically dismisses it.
 *
 * @component Tooltip.Content - Positioned tooltip bubble with enter/exit animations and
 * collision detection. Uses a measurement clone to avoid position flashing on the first render.
 *
 * @component Tooltip.Arrow - Optional SVG arrow pointing toward the trigger element.
 * Inherits placement from Tooltip.Content; can be overridden via the `placement` prop.
 *
 * @component Tooltip.Text - Pre-styled text component for tooltip labels.
 *
 * @example
 * ```tsx
 * <Tooltip>
 *   <Tooltip.Trigger>
 *     <Button>Press me</Button>
 *   </Tooltip.Trigger>
 *   <Tooltip.Portal>
 *     <Tooltip.Content placement="top">
 *       <Tooltip.Arrow />
 *       <Tooltip.Text>Save document</Tooltip.Text>
 *     </Tooltip.Content>
 *   </Tooltip.Portal>
 * </Tooltip>
 * ```
 *
 * @see Full documentation: https://v3.heroui.com/docs/native/components/tooltip
 */
const Tooltip = Object.assign(TooltipRoot, {
  Trigger: TooltipTrigger,
  Portal: TooltipPortal,
  Content: TooltipContent,
  Arrow: TooltipArrow,
  Text: TooltipText,
});

export { useTooltip };
export default Tooltip;
