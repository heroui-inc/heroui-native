import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { createContext, forwardRef, use, useEffect, useRef } from 'react';
import type { Text as RNText, StyleProp, ViewStyle } from 'react-native';
import { StyleSheet, View } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FullWindowOverlay } from '../../helpers/components';
import { Text } from '../../helpers/components/text';
import * as PopoverPrimitives from '../../primitives/popover';
import * as PopoverPrimitivesTypes from '../../primitives/popover/popover.types';
import { useTheme } from '../../providers/theme';
import { CloseIcon } from './close-icon';
import {
  DEFAULT_ALIGN_OFFSET,
  DEFAULT_INSETS,
  DEFAULT_OFFSET,
  DEFAULT_SPRING_CONFIG,
  DISPLAY_NAME,
} from './popover.constants';
import popoverStyles, { nativeStyles } from './popover.styles';
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

const usePopover = PopoverPrimitives.useRootContext;

const PopoverContentContext = createContext<PopoverContentContextValue>({
  placement: undefined,
});

// --------------------------------------------------

const PopoverRoot = forwardRef<
  PopoverPrimitivesTypes.RootRef,
  PopoverRootProps
>(({ children, onOpenChange, closeDelay = 400, ...props }, ref) => {
  return (
    <PopoverPrimitives.Root
      ref={ref}
      onOpenChange={onOpenChange}
      closeDelay={closeDelay}
      {...props}
    >
      {children}
    </PopoverPrimitives.Root>
  );
});

// --------------------------------------------------

const PopoverTrigger = forwardRef<
  PopoverPrimitivesTypes.TriggerRef,
  PopoverTriggerProps
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
>(({ className, ...props }, ref) => {
  return <PopoverPrimitives.Trigger ref={ref} asChild {...props} />;
});

// --------------------------------------------------

const PopoverPortal = ({
  className,
  children,
  progressAnimationConfigs,
  ...props
}: PopoverPortalProps) => {
  const tvStyles = popoverStyles.portal({ className });

  const { popoverState, progress } = usePopover();

  useEffect(() => {
    if (popoverState === 'open') {
      const openConfig = progressAnimationConfigs?.onOpen;
      if (openConfig?.animationType === 'spring') {
        progress.set(withSpring(1, openConfig.animationConfig));
      } else if (openConfig?.animationType === 'timing') {
        progress.set(withTiming(1, openConfig.animationConfig));
      } else {
        progress.set(withSpring(1, DEFAULT_SPRING_CONFIG));
      }
    } else if (popoverState === 'close') {
      const closeConfig = progressAnimationConfigs?.onClose;
      if (closeConfig?.animationType === 'spring') {
        progress.set(withSpring(2, closeConfig.animationConfig));
      } else if (closeConfig?.animationType === 'timing') {
        progress.set(withTiming(2, closeConfig.animationConfig));
      } else {
        progress.set(withSpring(2, DEFAULT_SPRING_CONFIG));
      }
    } else {
      progress.set(0);
    }
  }, [popoverState, progress, progressAnimationConfigs]);

  return (
    <PopoverPrimitives.Portal {...props}>
      <FullWindowOverlay>
        <View className={tvStyles}>{children}</View>
      </FullWindowOverlay>
    </PopoverPrimitives.Portal>
  );
};

// --------------------------------------------------

const PopoverOverlay = forwardRef<
  PopoverPrimitivesTypes.OverlayRef,
  PopoverOverlayProps
>(({ className, style, isDefaultAnimationDisabled, ...props }, ref) => {
  const { isDark } = useTheme();

  const { progress } = usePopover();

  const tvStyles = popoverStyles.overlay({
    className,
    isDark,
  });

  const rOverlayStyle = useAnimatedStyle(() => {
    if (isDefaultAnimationDisabled) {
      return {};
    }
    const opacity = interpolate(progress.get(), [0, 1, 2], [0, 1, 0]);
    return {
      opacity,
    };
  });

  return (
    <AnimatedOverlay
      ref={ref}
      className={tvStyles}
      style={[rOverlayStyle, style]}
      {...props}
    />
  );
});

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
      isDefaultAnimationDisabled,
      ...props
    },
    ref
  ) => {
    const { isDark } = useTheme();
    const safeAreaInsets = useSafeAreaInsets();

    const insets = {
      top: DEFAULT_INSETS.top + safeAreaInsets.top,
      bottom: DEFAULT_INSETS.bottom + safeAreaInsets.bottom,
      left: DEFAULT_INSETS.left + safeAreaInsets.left,
      right: DEFAULT_INSETS.right + safeAreaInsets.right,
    };

    const { progress } = usePopover();
    const tvStyles = popoverStyles.popoverContent({ className, isDark });

    const rContainerStyle = useAnimatedStyle(() => {
      if (isDefaultAnimationDisabled) {
        return {};
      }

      let translateX = 0;
      let translateY = 0;

      if (placement === 'top') {
        translateY = interpolate(progress.get(), [0, 1, 2], [8, 0, 8]);
      } else if (placement === 'bottom') {
        translateY = interpolate(progress.get(), [0, 1, 2], [-8, 0, -8]);
      } else if (placement === 'left') {
        translateX = interpolate(progress.get(), [0, 1, 2], [8, 0, 8]);
      } else if (placement === 'right') {
        translateX = interpolate(progress.get(), [0, 1, 2], [-8, 0, -8]);
      }

      return {
        opacity: interpolate(
          progress.get(),
          [0, 1, 1.75, 2],
          [0.5, 1, 0.75, 0]
        ),
        transform: [
          { translateX },
          { translateY },
          { scale: interpolate(progress.get(), [0, 1, 2], [0.95, 1, 0.95]) },
        ],
      };
    });

    const flatStyle = StyleSheet.flatten([
      nativeStyles.contentContainer,
      rContainerStyle,
      style,
    ]);

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
          className={tvStyles}
          style={flatStyle}
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
    { children, bottomSheetViewClassName, bottomSheetViewProps, ...restProps },
    ref
  ) => {
    const insets = useSafeAreaInsets();

    const bottomSheetRef = useRef<BottomSheet>(null);

    const { popoverState, onOpenChange, progress } = usePopover();

    const { colors } = useTheme();

    const tvStyles = popoverStyles.bottomSheetView({
      className: bottomSheetViewClassName,
    });

    useEffect(() => {
      if (popoverState === 'open') {
        bottomSheetRef.current?.expand();
      } else if (popoverState === 'close') {
        bottomSheetRef.current?.close();
      }
    }, [popoverState]);

    useEffect(() => {
      if (ref && bottomSheetRef.current) {
        if (typeof ref === 'function') {
          ref(bottomSheetRef.current);
        } else {
          ref.current = bottomSheetRef.current;
        }
      }
    }, [ref]);

    const onClose = () => {
      onOpenChange(false);
      restProps.onClose?.();
    };

    const animatedIndex = useSharedValue(0);

    useAnimatedReaction(
      () => animatedIndex.get(),
      (value) => {
        if (popoverState === 'open' && value <= 0) {
          progress.set(interpolate(animatedIndex.get(), [0, -1], [1, 2]));
        }
      }
    );

    return (
      <PopoverContentContext value={{ placement: 'bottom' }}>
        <BottomSheet
          ref={bottomSheetRef}
          backgroundStyle={[
            { backgroundColor: colors.panel },
            restProps.backgroundStyle,
          ]}
          handleIndicatorStyle={[
            { backgroundColor: colors.mutedForeground },
            restProps.handleIndicatorStyle,
          ]}
          enablePanDownToClose={restProps.enablePanDownToClose ?? true}
          animatedIndex={animatedIndex ?? restProps.animatedIndex}
          onClose={onClose}
          {...restProps}
        >
          <BottomSheetView
            className={tvStyles}
            style={[
              { paddingBottom: insets.bottom + 12 },
              bottomSheetViewProps?.style,
            ]}
            {...bottomSheetViewProps}
          >
            {children}
          </BottomSheetView>
        </BottomSheet>
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
  const { colors } = useTheme();
  const tvStyles = popoverStyles.close({ className });

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
          color={iconProps?.color ?? colors.mutedForeground}
        />
      )}
    </PopoverPrimitives.Close>
  );
});

// --------------------------------------------------

const PopoverTitle = forwardRef<RNText, PopoverTitleProps>(
  ({ className, children, ...props }, ref) => {
    const tvStyles = popoverStyles.title({ className });

    return (
      <Text
        ref={ref}
        role="heading"
        accessibilityRole="header"
        className={tvStyles}
        {...props}
      >
        {children}
      </Text>
    );
  }
);

// --------------------------------------------------

const PopoverDescription = forwardRef<RNText, PopoverDescriptionProps>(
  ({ className, children, ...props }, ref) => {
    const tvStyles = popoverStyles.description({ className });

    return (
      <Text ref={ref} accessibilityRole="text" className={tvStyles} {...props}>
        {children}
      </Text>
    );
  }
);

// --------------------------------------------------

const PopoverArrow = forwardRef<View, PopoverArrowProps>(
  (
    {
      className,
      height = 8,
      width = 16,
      color,
      placement: placementLocal,
      ...props
    },
    ref
  ) => {
    const { colors } = useTheme();
    const { triggerPosition, contentLayout } = usePopover();
    const { placement: placementContext } = use(PopoverContentContext);

    const placement = placementLocal || placementContext;

    const tvStyles = popoverStyles.arrow({ className });

    if (!triggerPosition || !contentLayout) {
      return null;
    }

    const getArrowStyle = () => {
      const arrowColor = color || colors.panel;

      const triggerCenterX = triggerPosition.pageX + triggerPosition.width / 2;
      const triggerCenterY = triggerPosition.pageY + triggerPosition.height / 2;

      const baseStyle: StyleProp<ViewStyle> = {
        width: 0,
        height: 0,
        borderStyle: 'solid',
        position: 'absolute',
      };

      switch (placement) {
        case 'top':
          return {
            ...baseStyle,
            bottom: -height,
            left: Math.min(
              Math.max(12, triggerCenterX - contentLayout.x - width / 2),
              contentLayout.width - width - 12
            ),
            borderLeftWidth: width / 2,
            borderRightWidth: width / 2,
            borderTopWidth: height,
            borderBottomWidth: 0,
            borderLeftColor: 'transparent',
            borderRightColor: 'transparent',
            borderTopColor: arrowColor,
            borderBottomColor: 'transparent',
          };

        case 'bottom':
          return {
            ...baseStyle,
            top: -height,
            left: Math.min(
              Math.max(12, triggerCenterX - contentLayout.x - width / 2),
              contentLayout.width - width - 12
            ),
            borderLeftWidth: width / 2,
            borderRightWidth: width / 2,
            borderTopWidth: 0,
            borderBottomWidth: height,
            borderLeftColor: 'transparent',
            borderRightColor: 'transparent',
            borderTopColor: 'transparent',
            borderBottomColor: arrowColor,
          };

        case 'left':
          return {
            ...baseStyle,
            right: -height,
            top: Math.min(
              Math.max(12, triggerCenterY - contentLayout.y - width / 2),
              contentLayout.height - width - 12
            ),
            borderTopWidth: width / 2,
            borderBottomWidth: width / 2,
            borderLeftWidth: height,
            borderRightWidth: 0,
            borderTopColor: 'transparent',
            borderBottomColor: 'transparent',
            borderLeftColor: arrowColor,
            borderRightColor: 'transparent',
          };

        case 'right':
          return {
            ...baseStyle,
            left: -height,
            top: Math.min(
              Math.max(12, triggerCenterY - contentLayout.y - width / 2),
              contentLayout.height - width - 12
            ),
            borderTopWidth: width / 2,
            borderBottomWidth: width / 2,
            borderLeftWidth: 0,
            borderRightWidth: height,
            borderTopColor: 'transparent',
            borderBottomColor: 'transparent',
            borderLeftColor: 'transparent',
            borderRightColor: arrowColor,
          };

        default:
          return baseStyle;
      }
    };

    return (
      <View
        ref={ref}
        className={tvStyles}
        style={getArrowStyle()}
        pointerEvents="none"
        {...props}
      />
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
 * @component Popover.Content - Container for popover content with positioning,
 * styling, and collision detection.
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
 * @see Full documentation: https://heroui.com/components/popover
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

export default Popover;
