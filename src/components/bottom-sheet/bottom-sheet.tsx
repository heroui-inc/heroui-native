/* eslint-disable react-native/no-inline-styles */
import GorhomBottomSheet, {
  BottomSheetView as GorhomBottomSheetView,
} from '@gorhom/bottom-sheet';
import { forwardRef, useEffect, useMemo, useRef } from 'react';
import type { Text as RNText, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CloseIcon, FullWindowOverlay } from '../../helpers/components';
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
} from './bottom-sheet.animation';
import { DISPLAY_NAME } from './bottom-sheet.constants';
import bottomSheetStyles from './bottom-sheet.styles';
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
      isDragging,
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

const BottomSheetPortal = ({
  className,
  children,
  style,
  ...props
}: BottomSheetPortalProps) => {
  const animationSettingsContext = useAnimationSettings();
  const animationContext = useBottomSheetAnimation();

  const tvStyles = bottomSheetStyles.portal({ className });

  return (
    <BottomSheetPrimitives.Portal {...props}>
      <AnimationSettingsProvider value={animationSettingsContext}>
        <BottomSheetAnimationProvider value={animationContext}>
          <FullWindowOverlay>
            <Animated.View className={tvStyles} style={style}>
              {children}
            </Animated.View>
          </FullWindowOverlay>
        </BottomSheetAnimationProvider>
      </AnimationSettingsProvider>
    </BottomSheetPrimitives.Portal>
  );
};

// --------------------------------------------------

const BottomSheetOverlay = forwardRef<
  BottomSheetPrimitivesTypes.OverlayRef,
  BottomSheetOverlayProps
>(({ className, style, animation, ...props }, ref) => {
  const { progress, isDragging } = useBottomSheetAnimation();

  const tvStyles = bottomSheetStyles.overlay({ className });

  const { rContainerStyle } = usePopupOverlayAnimation({
    progress,
    isDragging,
    animation,
    style: style as ViewStyle,
  });

  return (
    <AnimatedOverlay
      ref={ref}
      className={tvStyles}
      style={[rContainerStyle, style]}
      {...props}
    />
  );
});

// --------------------------------------------------

const BottomSheetContent = forwardRef<
  GorhomBottomSheet,
  BottomSheetContentProps
>(
  (
    {
      children,
      contentContainerClassName,
      contentContainerProps,
      ...restProps
    },
    ref
  ) => {
    const insets = useSafeAreaInsets();

    const bottomSheetRef = useRef<GorhomBottomSheet>(null);

    const { onOpenChange } = useBottomSheet();
    const { bottomSheetState, progress } = useBottomSheetAnimation();

    const [themeColorOverlay, themeColorMuted] = [
      useThemeColor('overlay'),
      useThemeColor('muted'),
    ];

    const tvStyles = bottomSheetStyles.contentContainer({
      className: contentContainerClassName,
    });

    const handleIndicatorStyle = StyleSheet.flatten([
      { backgroundColor: themeColorMuted },
      restProps.handleIndicatorStyle,
    ]);

    useEffect(() => {
      if (bottomSheetState === 'open') {
        bottomSheetRef.current?.expand();
      } else if (bottomSheetState === 'close') {
        bottomSheetRef.current?.close();
      }
    }, [bottomSheetState]);

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

    const { animatedIndex } = usePopupBottomSheetContentAnimation({
      progress,
      componentState: bottomSheetState,
    });

    return (
      <GorhomBottomSheet
        ref={bottomSheetRef}
        backgroundStyle={[
          {
            backgroundColor: themeColorOverlay,
            borderRadius: 32,
            borderCurve: 'continuous',
          },
          restProps.backgroundStyle,
        ]}
        handleIndicatorStyle={handleIndicatorStyle}
        enablePanDownToClose={restProps.enablePanDownToClose ?? true}
        animatedIndex={animatedIndex ?? restProps.animatedIndex}
        onClose={onClose}
        {...restProps}
      >
        <GorhomBottomSheetView
          className={tvStyles}
          style={[
            { paddingBottom: insets.bottom + 12 },
            contentContainerProps?.style,
          ]}
          {...contentContainerProps}
        >
          {children}
        </GorhomBottomSheetView>
      </GorhomBottomSheet>
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
