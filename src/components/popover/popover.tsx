import type BottomSheet from '@gorhom/bottom-sheet';
import { createContext, forwardRef, use, useMemo } from 'react';
import type {
  GestureResponderEvent,
  Text as RNText,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useThemeColor } from '../../helpers/external/hooks';
import { cn } from '../../helpers/external/utils';
import {
  BottomSheetContent,
  FullWindowOverlay,
  HeroText,
} from '../../helpers/internal/components';
import {
  AnimationSettingsProvider,
  useAnimationSettings,
} from '../../helpers/internal/contexts';
import {
  usePopupOverlayAnimation,
  usePopupPopoverContentAnimation,
  usePopupRootAnimation,
} from '../../helpers/internal/hooks';
import type { PressableRef } from '../../helpers/internal/types';
import * as PopoverPrimitives from '../../primitives/popover';
import * as PopoverPrimitivesTypes from '../../primitives/popover/popover.types';
import { CloseButton } from '../close-button';
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
import { popoverClassNames, popoverStyleSheet } from './popover.styles';
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
>(
  (
    {
      children,
      isOpen: isOpenProp,
      isDefaultOpen,
      onOpenChange: onOpenChangeProp,
      presentation = 'popover',
      animation,
      ...props
    },
    ref
  ) => {
    const { isAllAnimationsDisabled, progress, isDragging } =
      usePopupRootAnimation({
        animation,
      });

    const animationContextValue = useMemo(
      () => ({
        progress,
        isDragging,
      }),
      [progress, isDragging]
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
            presentation={presentation}
            isOpen={isOpenProp}
            isDefaultOpen={isDefaultOpen}
            onOpenChange={onOpenChangeProp}
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
  disableFullWindowOverlay = false,
  unstable_accessibilityContainerViewIsModal,
  ...props
}: PopoverPortalProps) => {
  const animationSettingsContext = useAnimationSettings();
  const animationContext = usePopoverAnimation();

  const portalClassName = popoverClassNames.portal({ className });

  return (
    <PopoverPrimitives.Portal {...props}>
      <AnimationSettingsProvider value={animationSettingsContext}>
        <PopoverAnimationProvider value={animationContext}>
          <FullWindowOverlay
            disableFullWindowOverlay={disableFullWindowOverlay}
            unstable_accessibilityContainerViewIsModal={
              unstable_accessibilityContainerViewIsModal
            }
          >
            <View className={portalClassName} pointerEvents="box-none">
              {children}
            </View>
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
    const { isOpen, presentation } = usePopover();
    const { progress, isDragging } = usePopoverAnimation();

    const overlayClassName = popoverClassNames.overlay({ className });

    const { rContainerStyle, entering, exiting } = usePopupOverlayAnimation({
      progress: presentation === 'bottom-sheet' ? progress : undefined,
      isDragging: presentation === 'bottom-sheet' ? isDragging : undefined,
      animation,
    });

    const overlayStyle = isAnimatedStyleActive
      ? [rContainerStyle, style]
      : style;

    return (
      <Animated.View
        entering={entering}
        exiting={exiting}
        style={StyleSheet.absoluteFill}
        pointerEvents="box-none"
      >
        <AnimatedOverlay
          ref={ref}
          className={overlayClassName}
          style={overlayStyle}
          forceMount={presentation === 'bottom-sheet' ? true : undefined}
          pointerEvents={isOpen ? 'auto' : 'none'}
          {...props}
        />
      </Animated.View>
    );
  }
);

// --------------------------------------------------

const PopoverContentPopover = forwardRef<
  PopoverPrimitivesTypes.ContentRef,
  PopoverContentPopoverProps
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
      ...props
    },
    ref
  ) => {
    const { contentLayout } = usePopover();

    const safeAreaInsets = useSafeAreaInsets();
    const { height: screenHeight } = useWindowDimensions();

    // Initially useRelativePosition returns { position: 'absolute', opacity: 0, top: dimensions.height }
    // So we need to wait for the content to be ready before showing it
    const isReady = Boolean(contentLayout?.y && contentLayout.y < screenHeight);

    const insets = {
      top: DEFAULT_INSETS.top + safeAreaInsets.top,
      bottom: DEFAULT_INSETS.bottom + safeAreaInsets.bottom,
      left: DEFAULT_INSETS.left + safeAreaInsets.left,
      right: DEFAULT_INSETS.right + safeAreaInsets.right,
    };

    const contentClassName = popoverClassNames.content({
      className,
    });

    const { entering, exiting } = usePopupPopoverContentAnimation({
      placement,
      offset,
      animation,
    });

    return (
      <PopoverContentContext value={{ placement }}>
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
            style={[popoverStyleSheet.contentContainer, style]}
            {...props}
          >
            {children}
          </AnimatedContent>
        )}
        <AnimatedContent
          placement={placement}
          accessible={false}
          accessibilityElementsHidden={true}
          importantForAccessibility="no"
          pointerEvents="none"
          collapsable={false}
          align={align}
          avoidCollisions={avoidCollisions}
          offset={offset}
          alignOffset={alignOffset}
          insets={insets}
          className={cn(contentClassName, 'absolute opacity-0')}
          style={[popoverStyleSheet.contentContainer, style]}
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
  PopoverContentBottomSheetProps
>(
  (
    {
      children,
      index: initialIndex,
      backgroundClassName,
      handleIndicatorClassName,
      contentContainerClassName: contentContainerClassNameProp,
      contentContainerProps,
      animation,
      animationConfigs,
      ...restProps
    },
    ref
  ) => {
    const { isOpen, onOpenChange } = usePopover();

    const { progress, isDragging } = usePopoverAnimation();

    return (
      <BottomSheetContent
        ref={ref}
        index={initialIndex}
        backgroundClassName={backgroundClassName}
        handleIndicatorClassName={handleIndicatorClassName}
        contentContainerClassName={contentContainerClassNameProp}
        contentContainerProps={contentContainerProps}
        animation={animation}
        animationConfigs={animationConfigs}
        backgroundStyle={[
          popoverStyleSheet.contentContainer,
          restProps.backgroundStyle,
        ]}
        isOpen={isOpen}
        progress={progress}
        isDragging={isDragging}
        onOpenChange={onOpenChange}
        {...restProps}
      >
        {children}
      </BottomSheetContent>
    );
  }
);

// --------------------------------------------------

const PopoverContent = forwardRef<
  PopoverPrimitivesTypes.ContentRef | BottomSheet,
  PopoverContentProps
>((props, ref) => {
  const { presentation: contextPresentation } = usePopover();

  if (__DEV__) {
    if (props.presentation !== contextPresentation) {
      throw new Error(
        `Popover.Content presentation prop ("${props.presentation}") does not match Popover.Root presentation prop ("${contextPresentation}"). They must be the same.`
      );
    }
  }

  if (props.presentation === 'bottom-sheet') {
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

const PopoverClose = forwardRef<PressableRef, PopoverCloseProps>(
  (props, ref) => {
    const { onPress: onPressProp, ...restProps } = props;
    const { onOpenChange } = usePopover();

    const onPress = (ev: GestureResponderEvent) => {
      onOpenChange(false);
      if (typeof onPressProp === 'function') {
        onPressProp(ev);
      }
    };

    return <CloseButton ref={ref} onPress={onPress} {...restProps} />;
  }
);

// --------------------------------------------------

const PopoverTitle = forwardRef<RNText, PopoverTitleProps>(
  ({ className, children, ...props }, ref) => {
    const titleClassName = popoverClassNames.label({ className });

    return (
      <HeroText
        ref={ref}
        role="heading"
        accessibilityRole="header"
        className={titleClassName}
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
    const descriptionClassName = popoverClassNames.description({
      className,
    });

    return (
      <HeroText
        ref={ref}
        accessibilityRole="text"
        className={descriptionClassName}
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
      height = 12,
      width = 20,
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

    const arrowClassName = popoverClassNames.arrow({ className });

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
        className={arrowClassName}
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
 * @component Popover.Close - Close button for the popover.
 * Can accept custom children or uses default close icon.
 *
 * @component Popover.Title - Optional title text with pre-styled typography.
 *
 * @component Popover.Description - Optional description text with muted styling.
 *
 * Props flow from Popover to sub-components via context (placement, align, offset, etc.).
 * The popover automatically positions itself relative to the trigger element.
 *
 * @see Full documentation: https://heroui.com/docs/native/components/popover
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
