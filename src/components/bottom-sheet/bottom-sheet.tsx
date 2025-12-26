import GorhomBottomSheet from '@gorhom/bottom-sheet';
import { forwardRef, useMemo } from 'react';
import type { Text as RNText } from 'react-native';
import Animated, {
  ReduceMotion,
  useSharedValue,
} from 'react-native-reanimated';
import { withUniwind } from 'uniwind';
import {
  BottomSheetContentContainer,
  CloseIcon,
  FullWindowOverlay,
} from '../../helpers/components';
import { HeroText } from '../../helpers/components/hero-text';
import {
  AnimationSettingsProvider,
  useAnimationSettings,
} from '../../helpers/contexts/animation-settings-context';
import { usePopupBottomSheetContentAnimation } from '../../helpers/hooks/use-popup-bottom-sheet-content-animation';
import { usePopupOverlayAnimation } from '../../helpers/hooks/use-popup-overlay-animation';
import { usePopupRootAnimation } from '../../helpers/hooks/use-popup-root-animation';
import { useThemeColor } from '../../helpers/theme';
import * as BottomSheetPrimitives from '../../primitives/bottom-sheet';
import * as BottomSheetPrimitivesTypes from '../../primitives/bottom-sheet/bottom-sheet.types';
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
      closeDelay = 300,
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
      onOpenChange,
      isAllAnimationsDisabled,
    } = usePopupRootAnimation({
      isOpen: isOpenProp,
      isDefaultOpen,
      onOpenChange: onOpenChangeProp,
      closeDelay,
      isDismissKeyboardOnClose,
      animation,
    });

    const animationContextValue = useMemo(
      () => ({
        bottomSheetState: componentState,
        progress,
      }),
      [componentState, progress]
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
    const { bottomSheetState, progress } = useBottomSheetAnimation();

    const { isAnimationDisabledValue } = useBottomSheetContentAnimation({
      animation,
    });

    const { animatedIndex } = usePopupBottomSheetContentAnimation({
      progress,
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

    const onClose = () => {
      onOpenChange(false);
      restProps.onClose?.();
    };

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
      <StyledGorhomBottomSheet
        ref={ref}
        backgroundClassName={contentBackgroundClassName}
        backgroundStyle={[
          styleSheet.contentContainer,
          restProps.backgroundStyle,
        ]}
        handleIndicatorClassName={contentHandleIndicatorClassName}
        enablePanDownToClose={restProps.enablePanDownToClose ?? true}
        animatedIndex={animatedIndex ?? restProps.animatedIndex}
        onClose={onClose}
        animationConfigs={mergedAnimationConfigs}
        {...restProps}
      >
        <BottomSheetContentContainer
          state={bottomSheetState}
          contentContainerClassName={contentContainerClassNameValue}
          contentContainerProps={contentContainerProps}
        >
          {children}
        </BottomSheetContentContainer>
      </StyledGorhomBottomSheet>
    );
  }
);

// --------------------------------------------------

const BottomSheetClose = forwardRef<
  BottomSheetPrimitivesTypes.CloseRef,
  BottomSheetCloseProps
>(({ className, iconProps, hitSlop = 12, children, ...props }, ref) => {
  const themeColorMuted = useThemeColor('muted');

  const tvStyles = bottomSheetStyles.close({ className });

  return (
    <BottomSheetPrimitives.Close
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
    </BottomSheetPrimitives.Close>
  );
});

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
