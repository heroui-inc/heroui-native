import BottomSheet from '@gorhom/bottom-sheet';
import { createContext, forwardRef, use, useCallback, useMemo } from 'react';
import type { Text as RNText, StyleProp, ViewStyle } from 'react-native';
import { View } from 'react-native';
import Animated, { ReduceMotion } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { withUniwind } from 'uniwind';
import {
  BottomSheetContentContainer,
  CloseIcon,
  FullWindowOverlay,
} from '../../helpers/components';
import { HeroText } from '../../helpers/components/hero-text';
import { BottomSheetIsDraggingProvider } from '../../helpers/contexts';
import {
  AnimationSettingsProvider,
  useAnimationSettings,
} from '../../helpers/contexts/animation-settings-context';
import { useBottomSheetGestureHandlers } from '../../helpers/hooks';
import { usePopupBottomSheetContentAnimation } from '../../helpers/hooks/use-popup-bottom-sheet-content-animation';
import { usePopupOverlayAnimation } from '../../helpers/hooks/use-popup-overlay-animation';
import { usePopupPopoverContentAnimation } from '../../helpers/hooks/use-popup-popover-content-animation';
import { usePopupRootAnimation } from '../../helpers/hooks/use-popup-root-animation';
import { useThemeColor } from '../../helpers/theme';
import * as PopoverPrimitives from '../../primitives/popover';
import * as PopoverPrimitivesTypes from '../../primitives/popover/popover.types';
import { useBottomSheetContentAnimation } from '../bottom-sheet/bottom-sheet.animation';
import bottomSheetStyles from '../bottom-sheet/bottom-sheet.styles';
import { ArrowSvg } from './arrow-svg';
import {
  PopoverAnimationProvider,
  usePopoverAnimation,
} from './popover.animation';
import {
  DEFAULT_ALIGN_OFFSET,
  DEFAULT_INSETS,
  DEFAULT_OFFSET,
  DISPLAY_NAME,
} from './popover.constants';
import popoverStyles, { styleSheet } from './popover.styles';
import type {
  PopoverArrowProps,
  PopoverCloseProps,
  PopoverContentBottomSheetProps,
  PopoverContentContextValue,
  PopoverContentPopoverProps,
  PopoverContentProps,
  PopoverDescriptionProps,
  PopoverOverlayProps,
  PopoverPortalProps,
  PopoverRootProps,
  PopoverTitleProps,
  PopoverTriggerProps,
} from './popover.types';

const AnimatedOverlay = Animated.createAnimatedComponent(
  PopoverPrimitives.Overlay
);

const AnimatedContent = Animated.createAnimatedComponent(
  PopoverPrimitives.Content
);

const StyledBottomSheet = withUniwind(BottomSheet);

const usePopover = PopoverPrimitives.useRootContext;

const PopoverContentContext = createContext<PopoverContentContextValue>({
  placement: undefined,
});

// --------------------------------------------------

const PopoverRoot = forwardRef<
  PopoverPrimitivesTypes.RootRef,
  PopoverRootProps
>(
  (
    {
      children,
      closeDelay = 400,
      isOpen: isOpenProp,
      isDefaultOpen,
      onOpenChange: onOpenChangeProp,
      animation,
      ...props
    },
    ref
  ) => {
    const {
      internalIsOpen,
      componentState,
      progress,
      isDragging,
      onOpenChange,
      isAllAnimationsDisabled,
    } = usePopupRootAnimation({
      isOpen: isOpenProp,
      isDefaultOpen,
      onOpenChange: onOpenChangeProp,
      closeDelay,
      isDismissKeyboardOnClose: false,
      animation,
    });

    const animationContextValue = useMemo(
      () => ({
        popoverState: componentState,
        progress,
        isDragging,
      }),
      [componentState, progress, isDragging]
    );

    const animationSettingsContextValue = useMemo(
      () => ({
        isAllAnimationsDisabled,
      }),
      [isAllAnimationsDisabled]
    );

    return (
      <AnimationSettingsProvider value={animationSettingsContextValue}>
        <PopoverAnimationProvider value={animationContextValue}>
          <PopoverPrimitives.Root
            ref={ref}
            isOpen={internalIsOpen}
            isDefaultOpen={isDefaultOpen}
            onOpenChange={onOpenChange}
            closeDelay={closeDelay}
            {...props}
          >
            {children}
          </PopoverPrimitives.Root>
        </PopoverAnimationProvider>
      </AnimationSettingsProvider>
    );
  }
);

// --------------------------------------------------

const PopoverTrigger = forwardRef<
  PopoverPrimitivesTypes.TriggerRef,
  PopoverTriggerProps
>((props, ref) => {
  return <PopoverPrimitives.Trigger ref={ref} {...props} />;
});

// --------------------------------------------------

const PopoverPortal = ({
  className,
  children,
  ...props
}: PopoverPortalProps) => {
  const animationSettingsContext = useAnimationSettings();
  const animationContext = usePopoverAnimation();

  const tvStyles = popoverStyles.portal({ className });

  return (
    <PopoverPrimitives.Portal {...props}>
      <AnimationSettingsProvider value={animationSettingsContext}>
        <PopoverAnimationProvider value={animationContext}>
          <FullWindowOverlay>
            <Animated.View className={tvStyles} pointerEvents="box-none">
              {children}
            </Animated.View>
          </FullWindowOverlay>
        </PopoverAnimationProvider>
      </AnimationSettingsProvider>
    </PopoverPrimitives.Portal>
  );
};

// --------------------------------------------------

const PopoverOverlay = forwardRef<
  PopoverPrimitivesTypes.OverlayRef,
  PopoverOverlayProps
>(
  (
    { className, style, animation, isAnimatedStyleActive = true, ...props },
    ref
  ) => {
    const { progress, isDragging } = usePopoverAnimation();

    const overlayClassName = popoverStyles.overlay({ className });

    const { rContainerStyle } = usePopupOverlayAnimation({
      progress,
      isDragging,
      animation,
    });

    const overlayStyle = isAnimatedStyleActive
      ? [rContainerStyle, style]
      : style;

    return (
      <AnimatedOverlay
        ref={ref}
        className={overlayClassName}
        style={overlayStyle}
        {...props}
      />
    );
  }
);

// --------------------------------------------------

const PopoverContentPopover = forwardRef<
  PopoverPrimitivesTypes.ContentRef,
  PopoverContentProps & { presentation?: 'popover' }
>(
  (
    {
      placement = 'bottom',
      align = 'center',
      avoidCollisions = true,
      offset = DEFAULT_OFFSET,
      alignOffset = DEFAULT_ALIGN_OFFSET,
      className,
      children,
      style,
      animation,
      isAnimatedStyleActive = true,
      ...props
    },
    ref
  ) => {
    const safeAreaInsets = useSafeAreaInsets();

    const insets = {
      top: DEFAULT_INSETS.top + safeAreaInsets.top,
      bottom: DEFAULT_INSETS.bottom + safeAreaInsets.bottom,
      left: DEFAULT_INSETS.left + safeAreaInsets.left,
      right: DEFAULT_INSETS.right + safeAreaInsets.right,
    };

    const { progress } = usePopoverAnimation();

    const contentClassName = popoverStyles.popoverContent({
      className,
    });

    const { rContainerStyle } = usePopupPopoverContentAnimation({
      progress,
      placement,
      animation,
    });

    const contentStyle = isAnimatedStyleActive
      ? [styleSheet.contentContainer, rContainerStyle, style]
      : [styleSheet.contentContainer, style];

    return (
      <PopoverContentContext value={{ placement }}>
        <AnimatedContent
          ref={ref}
          placement={placement}
          align={align}
          avoidCollisions={avoidCollisions}
          offset={offset}
          alignOffset={alignOffset}
          insets={insets}
          className={contentClassName}
          style={contentStyle}
          {...props}
        >
          {children}
        </AnimatedContent>
      </PopoverContentContext>
    );
  }
);

// --------------------------------------------------

const PopoverContentBottomSheet = forwardRef<
  BottomSheet,
  PopoverContentProps & { presentation: 'bottom-sheet' }
>(
  (
    {
      children,
      index: initialIndex,
      backgroundClassName,
      handleIndicatorClassName,
      contentContainerClassName,
      contentContainerProps,
      animation,
      animationConfigs,
      ...restProps
    },
    ref
  ) => {
    const { onOpenChange } = usePopover();
    const { popoverState, progress, isDragging } = usePopoverAnimation();

    const { isAnimationDisabledValue } = useBottomSheetContentAnimation({
      animation,
    });

    const { animatedIndex, isClosingOnSwipe } =
      usePopupBottomSheetContentAnimation({
        progress,
        isDragging,
        componentState: popoverState,
      });

    const contentBackgroundClassName = bottomSheetStyles.contentBackground({
      className: backgroundClassName,
    });

    const contentHandleIndicatorClassName =
      bottomSheetStyles.contentHandleIndicator({
        className: handleIndicatorClassName,
      });

    const contentContainerClassNameValue = bottomSheetStyles.contentContainer({
      className: contentContainerClassName,
    });

    const onClose = useCallback(() => {
      progress.set(2);
      onOpenChange(false);
    }, [onOpenChange, progress]);

    const mergedAnimationConfigs = useMemo(
      () => ({
        ...animationConfigs,
        reduceMotion: isAnimationDisabledValue
          ? ReduceMotion.Always
          : animationConfigs?.reduceMotion,
      }),
      [animationConfigs, isAnimationDisabledValue]
    );

    return (
      <PopoverContentContext value={{ placement: 'bottom' }}>
        <BottomSheetIsDraggingProvider value={{ isDragging }}>
          <StyledBottomSheet
            ref={ref}
            index={-1}
            backgroundClassName={contentBackgroundClassName}
            backgroundStyle={[
              styleSheet.contentContainer,
              restProps.backgroundStyle,
            ]}
            handleIndicatorClassName={contentHandleIndicatorClassName}
            enablePanDownToClose={restProps.enablePanDownToClose ?? true}
            animatedIndex={animatedIndex ?? restProps.animatedIndex}
            animationConfigs={mergedAnimationConfigs}
            gestureEventsHandlersHook={useBottomSheetGestureHandlers}
            onClose={onClose}
            {...restProps}
          >
            <BottomSheetContentContainer
              initialIndex={initialIndex ?? 0}
              state={popoverState}
              progress={progress}
              isDragging={isDragging}
              isClosingOnSwipe={isClosingOnSwipe}
              contentContainerClassName={contentContainerClassNameValue}
              contentContainerProps={contentContainerProps}
              onOpenChange={onOpenChange}
            >
              {children}
            </BottomSheetContentContainer>
          </StyledBottomSheet>
        </BottomSheetIsDraggingProvider>
      </PopoverContentContext>
    );
  }
);

// --------------------------------------------------

const PopoverContent = forwardRef<
  PopoverPrimitivesTypes.ContentRef | BottomSheet,
  PopoverContentProps
>((props, ref) => {
  const presentation = props.presentation || 'popover';

  if (presentation === 'bottom-sheet') {
    return (
      <PopoverContentBottomSheet
        ref={ref as React.Ref<BottomSheet>}
        {...(props as PopoverContentBottomSheetProps)}
      />
    );
  }

  return (
    <PopoverContentPopover
      ref={ref as React.Ref<PopoverPrimitivesTypes.ContentRef>}
      {...(props as PopoverContentPopoverProps)}
    />
  );
});

// --------------------------------------------------

const PopoverClose = forwardRef<
  PopoverPrimitivesTypes.CloseRef,
  PopoverCloseProps
>(({ className, children, iconProps, hitSlop = 12, ...props }, ref) => {
  const tvStyles = popoverStyles.close({ className });

  const themeColorMuted = useThemeColor('muted');

  return (
    <PopoverPrimitives.Close
      ref={ref}
      className={tvStyles}
      hitSlop={hitSlop}
      {...props}
    >
      {children || (
        <CloseIcon
          size={iconProps?.size ?? 18}
          color={iconProps?.color ?? themeColorMuted}
        />
      )}
    </PopoverPrimitives.Close>
  );
});

// --------------------------------------------------

const PopoverTitle = forwardRef<RNText, PopoverTitleProps>(
  ({ className, children, ...props }, ref) => {
    const tvStyles = popoverStyles.label({ className });

    return (
      <HeroText
        ref={ref}
        role="heading"
        accessibilityRole="header"
        className={tvStyles}
        {...props}
      >
        {children}
      </HeroText>
    );
  }
);

// --------------------------------------------------

const PopoverDescription = forwardRef<RNText, PopoverDescriptionProps>(
  ({ className, children, ...props }, ref) => {
    const tvStyles = popoverStyles.description({
      className,
    });

    return (
      <HeroText
        ref={ref}
        accessibilityRole="text"
        className={tvStyles}
        {...props}
      >
        {children}
      </HeroText>
    );
  }
);

// --------------------------------------------------

const PopoverArrow = forwardRef<View, PopoverArrowProps>(
  (
    {
      children,
      style,
      className,
      height = 8,
      width = 16,
      fill,
      stroke,
      strokeWidth = 1,
      placement: placementLocal,
      strokeBaselineInset = 1,
    },
    ref
  ) => {
    const [themeColorOverlay, themeColorBorder] = useThemeColor([
      'overlay',
      'border',
    ]);
    const { triggerPosition, contentLayout } = usePopover();
    const { placement: placementContext } = use(PopoverContentContext);

    const placement = placementLocal || placementContext;

    const tvStyles = popoverStyles.arrow({ className });

    if (
      !triggerPosition ||
      !contentLayout ||
      contentLayout.x === 0 ||
      contentLayout.y === 0 ||
      !placement
    ) {
      return null;
    }

    const arrowFill = fill || themeColorOverlay;
    const arrowStroke = stroke || themeColorBorder;

    const getArrowPosition = (): StyleProp<ViewStyle> => {
      const triggerCenterX = triggerPosition.pageX + triggerPosition.width / 2;
      const triggerCenterY = triggerPosition.pageY + triggerPosition.height / 2;

      const baseStyle: ViewStyle = {
        position: 'absolute',
      };

      switch (placement) {
        case 'top':
          return {
            ...baseStyle,
            bottom: -height + strokeBaselineInset,
            left: Math.min(
              Math.max(12, triggerCenterX - contentLayout.x - width / 2),
              contentLayout.width - width - 12
            ),
          };
        case 'bottom':
          return {
            ...baseStyle,
            top: -height + strokeBaselineInset,
            left: Math.min(
              Math.max(12, triggerCenterX - contentLayout.x - width / 2),
              contentLayout.width - width - 12
            ),
          };

        case 'left':
          return {
            ...baseStyle,
            right: -height + strokeBaselineInset,
            top: Math.min(
              Math.max(12, triggerCenterY - contentLayout.y - width / 2),
              contentLayout.height - width - 12
            ),
          };

        case 'right':
          return {
            ...baseStyle,
            left: -height + strokeBaselineInset,
            top: Math.min(
              Math.max(12, triggerCenterY - contentLayout.y - width / 2),
              contentLayout.height - width - 12
            ),
          };
        default:
          return baseStyle;
      }
    };

    const arrowPositionStyle = getArrowPosition();

    return (
      <Animated.View
        ref={ref}
        className={tvStyles}
        style={[arrowPositionStyle, style]}
        pointerEvents="none"
      >
        {children ? (
          children
        ) : (
          <ArrowSvg
            width={width}
            height={height}
            placement={placement}
            fill={arrowFill}
            stroke={arrowStroke}
            strokeWidth={strokeWidth}
          />
        )}
      </Animated.View>
    );
  }
);

// --------------------------------------------------

PopoverRoot.displayName = DISPLAY_NAME.ROOT;
PopoverTrigger.displayName = DISPLAY_NAME.TRIGGER;
PopoverPortal.displayName = DISPLAY_NAME.PORTAL;
PopoverOverlay.displayName = DISPLAY_NAME.OVERLAY;
PopoverContent.displayName = DISPLAY_NAME.CONTENT;
PopoverClose.displayName = DISPLAY_NAME.CLOSE;
PopoverTitle.displayName = DISPLAY_NAME.TITLE;
PopoverDescription.displayName = DISPLAY_NAME.DESCRIPTION;
PopoverArrow.displayName = DISPLAY_NAME.ARROW;

/**
 * Compound Popover component with sub-components
 *
 * @component Popover - Main container that manages open/close state, positioning,
 * and provides context to child components. Handles placement, alignment, and collision detection.
 *
 * @component Popover.Trigger - Clickable element that toggles the popover visibility.
 * Wraps any child element with press handlers.
 *
 * @component Popover.Portal - Renders popover content in a portal layer above other content.
 * Ensures proper stacking and positioning.
 *
 * @component Popover.Overlay - Optional background overlay. Can be transparent or
 * semi-transparent to capture outside clicks.
 *
 * @component Popover.Content - Container for popover content with two presentation modes:
 * default floating popover with positioning and collision detection, or bottom sheet modal.
 * Supports arrow indicators and custom animations.
 *
 * @component Popover.Arrow - Optional arrow indicator pointing to the trigger element.
 * Automatically positions itself based on popover placement.
 *
 * @component Popover.Close - Close button that dismisses the popover when pressed.
 * Renders a default X icon if no children provided.
 *
 * @component Popover.Title - Optional title text with pre-styled typography.
 *
 * @component Popover.Description - Optional description text with muted styling.
 *
 * Props flow from Popover to sub-components via context (placement, align, offset, etc.).
 * The popover automatically positions itself relative to the trigger element.
 *
 * @see Full documentation: https://v3.heroui.com/docs/native/components/popover
 */
const Popover = Object.assign(PopoverRoot, {
  Trigger: PopoverTrigger,
  Portal: PopoverPortal,
  Overlay: PopoverOverlay,
  Content: PopoverContent,
  Arrow: PopoverArrow,
  Close: PopoverClose,
  Title: PopoverTitle,
  Description: PopoverDescription,
});

export { usePopover, usePopoverAnimation };
export default Popover;
