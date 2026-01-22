import GorhomBottomSheet from '@gorhom/bottom-sheet';
import { forwardRef, useCallback, useMemo } from 'react';
import type { GestureResponderEvent, Text as RNText } from 'react-native';
import Animated, {
  ReduceMotion,
  useSharedValue,
} from 'react-native-reanimated';
import { withUniwind } from 'uniwind';
import {
  BottomSheetContentContainer,
  FullWindowOverlay,
  HeroText,
} from '../../helpers/internal/components';
import {
  AnimationSettingsProvider,
  BottomSheetIsDraggingProvider,
  useAnimationSettings,
} from '../../helpers/internal/contexts';
import {
  useBottomSheetGestureHandlers,
  usePopupBottomSheetContentAnimation,
  usePopupOverlayAnimation,
  usePopupRootAnimation,
} from '../../helpers/internal/hooks';
import type { PressableRef } from '../../helpers/internal/types';
import * as BottomSheetPrimitives from '../../primitives/bottom-sheet';
import * as BottomSheetPrimitivesTypes from '../../primitives/bottom-sheet/bottom-sheet.types';
import { CloseButton } from '../close-button';
import {
  BottomSheetAnimationProvider,
  useBottomSheetAnimation,
  useBottomSheetContentAnimation,
} from './bottom-sheet.animation';
import { DISPLAY_NAME } from './bottom-sheet.constants';
import bottomSheetStyles, { styleSheet } from './bottom-sheet.styles';
import type {
  BottomSheetCloseProps,
  BottomSheetContentProps,
  BottomSheetDescriptionProps,
  BottomSheetOverlayProps,
  BottomSheetPortalProps,
  BottomSheetRootProps,
  BottomSheetTitleProps,
  BottomSheetTriggerProps,
} from './bottom-sheet.types';

const AnimatedOverlay = Animated.createAnimatedComponent(
  BottomSheetPrimitives.Overlay
);

const StyledGorhomBottomSheet = withUniwind(GorhomBottomSheet);

const useBottomSheet = BottomSheetPrimitives.useRootContext;

// --------------------------------------------------

const BottomSheetRoot = forwardRef<
  BottomSheetPrimitivesTypes.RootRef,
  BottomSheetRootProps
>(
  (
    {
      children,
      isDismissKeyboardOnClose = true,
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
      isDismissKeyboardOnClose,
      animation,
    });

    const animationContextValue = useMemo(
      () => ({
        bottomSheetState: componentState,
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
        <BottomSheetAnimationProvider value={animationContextValue}>
          <BottomSheetPrimitives.Root
            ref={ref}
            isOpen={internalIsOpen}
            isDefaultOpen={isDefaultOpen}
            onOpenChange={onOpenChange}
            {...props}
          >
            {children}
          </BottomSheetPrimitives.Root>
        </BottomSheetAnimationProvider>
      </AnimationSettingsProvider>
    );
  }
);

// --------------------------------------------------

const BottomSheetTrigger = forwardRef<
  BottomSheetPrimitivesTypes.TriggerRef,
  BottomSheetTriggerProps
>((props, ref) => {
  return <BottomSheetPrimitives.Trigger ref={ref} {...props} />;
});

// --------------------------------------------------

const BottomSheetPortal = ({ children, ...props }: BottomSheetPortalProps) => {
  const animationSettingsContext = useAnimationSettings();
  const animationContext = useBottomSheetAnimation();

  return (
    <BottomSheetPrimitives.Portal {...props}>
      <AnimationSettingsProvider value={animationSettingsContext}>
        <BottomSheetAnimationProvider value={animationContext}>
          <FullWindowOverlay>{children}</FullWindowOverlay>
        </BottomSheetAnimationProvider>
      </AnimationSettingsProvider>
    </BottomSheetPrimitives.Portal>
  );
};

// --------------------------------------------------

const BottomSheetOverlay = forwardRef<
  BottomSheetPrimitivesTypes.OverlayRef,
  BottomSheetOverlayProps
>(
  (
    { className, style, animation, isAnimatedStyleActive = true, ...props },
    ref
  ) => {
    const { progress } = useBottomSheetAnimation();
    const isDragging = useSharedValue(false);

    const overlayClassName = bottomSheetStyles.overlay({ className });

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

const BottomSheetContent = forwardRef<
  GorhomBottomSheet,
  BottomSheetContentProps
>(
  (
    {
      children,
      index: initialIndex,
      backgroundClassName,
      handleIndicatorClassName,
      contentContainerClassName,
      contentContainerProps,
      animationConfigs,
      animation,
      ...restProps
    },
    ref
  ) => {
    const { onOpenChange } = useBottomSheet();

    const { bottomSheetState, progress, isDragging } =
      useBottomSheetAnimation();

    const { isAnimationDisabledValue } = useBottomSheetContentAnimation({
      animation,
    });

    const { animatedIndex, isClosingOnSwipe } =
      usePopupBottomSheetContentAnimation({
        progress,
        isDragging,
        componentState: bottomSheetState,
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
      <BottomSheetIsDraggingProvider value={{ isDragging }}>
        <StyledGorhomBottomSheet
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
            state={bottomSheetState}
            progress={progress}
            isDragging={isDragging}
            isClosingOnSwipe={isClosingOnSwipe}
            contentContainerClassName={contentContainerClassNameValue}
            contentContainerProps={contentContainerProps}
            onOpenChange={onOpenChange}
          >
            {children}
          </BottomSheetContentContainer>
        </StyledGorhomBottomSheet>
      </BottomSheetIsDraggingProvider>
    );
  }
);

// --------------------------------------------------

const BottomSheetClose = forwardRef<PressableRef, BottomSheetCloseProps>(
  (props, ref) => {
    const { onPress: onPressProp, ...restProps } = props;
    const { onOpenChange } = useBottomSheet();

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

const BottomSheetTitle = forwardRef<RNText, BottomSheetTitleProps>(
  ({ className, children, ...props }, ref) => {
    const { nativeID } = useBottomSheet();
    const tvStyles = bottomSheetStyles.label({ className });

    return (
      <HeroText
        ref={ref}
        role="heading"
        accessibilityRole="header"
        nativeID={`${nativeID}_label`}
        className={tvStyles}
        {...props}
      >
        {children}
      </HeroText>
    );
  }
);

// --------------------------------------------------

const BottomSheetDescription = forwardRef<RNText, BottomSheetDescriptionProps>(
  ({ className, children, ...props }, ref) => {
    const { nativeID } = useBottomSheet();

    const tvStyles = bottomSheetStyles.description({
      className,
    });

    return (
      <HeroText
        ref={ref}
        accessibilityRole="text"
        nativeID={`${nativeID}_desc`}
        className={tvStyles}
        {...props}
      >
        {children}
      </HeroText>
    );
  }
);

// --------------------------------------------------

BottomSheetRoot.displayName = DISPLAY_NAME.ROOT;
BottomSheetTrigger.displayName = DISPLAY_NAME.TRIGGER;
BottomSheetPortal.displayName = DISPLAY_NAME.PORTAL;
BottomSheetOverlay.displayName = DISPLAY_NAME.OVERLAY;
BottomSheetContent.displayName = DISPLAY_NAME.CONTENT;
BottomSheetClose.displayName = DISPLAY_NAME.CLOSE;
BottomSheetTitle.displayName = DISPLAY_NAME.TITLE;
BottomSheetDescription.displayName = DISPLAY_NAME.DESCRIPTION;

/**
 * Compound BottomSheet component with sub-components
 *
 * @component BottomSheet.Root - Main container that manages open/close state.
 * Provides the bottom sheet context to child components.
 *
 * @component BottomSheet.Trigger - Button or element that opens the bottom sheet.
 * Accepts any pressable element as children.
 *
 * @component BottomSheet.Portal - Portal container for bottom sheet overlay and content.
 * Renders children in a portal with full window overlay.
 *
 * @component BottomSheet.Overlay - Background overlay that covers the screen.
 * Typically closes the bottom sheet when clicked.
 *
 * @component BottomSheet.Content - The bottom sheet content container.
 * Uses @gorhom/bottom-sheet for rendering. Contains the main bottom sheet UI elements.
 *
 * @component BottomSheet.Close - Close button for the bottom sheet.
 * Can accept custom children or uses default close icon.
 *
 * @component BottomSheet.Title - The bottom sheet title text.
 * Automatically linked for accessibility.
 *
 * @component BottomSheet.Description - The bottom sheet description text.
 * Automatically linked for accessibility.
 */
const BottomSheet = Object.assign(BottomSheetRoot, {
  /** @optional Trigger element to open the bottom sheet */
  Trigger: BottomSheetTrigger,
  /** @optional Portal container for overlay and content */
  Portal: BottomSheetPortal,
  /** @optional Background overlay */
  Overlay: BottomSheetOverlay,
  /** @optional Main bottom sheet content container */
  Content: BottomSheetContent,
  /** @optional Close button for the bottom sheet */
  Close: BottomSheetClose,
  /** @optional Bottom sheet title text */
  Title: BottomSheetTitle,
  /** @optional Bottom sheet description text */
  Description: BottomSheetDescription,
});

export { useBottomSheet, useBottomSheetAnimation };
export default BottomSheet;
