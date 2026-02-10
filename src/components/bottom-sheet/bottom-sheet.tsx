import GorhomBottomSheet from '@gorhom/bottom-sheet';
import { forwardRef, useMemo } from 'react';
import {
  StyleSheet,
  type GestureResponderEvent,
  type Text as RNText,
} from 'react-native';
import Animated, { useSharedValue } from 'react-native-reanimated';
import {
  FullWindowOverlay,
  HeroText,
  BottomSheetContent as InternalBottomSheetContent,
} from '../../helpers/internal/components';
import {
  AnimationSettingsProvider,
  useAnimationSettings,
} from '../../helpers/internal/contexts';
import {
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
} from './bottom-sheet.animation';
import { DISPLAY_NAME } from './bottom-sheet.constants';
import {
  bottomSheetClassNames,
  bottomSheetStyleSheet,
} from './bottom-sheet.styles';
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
    { children, isOpen, isDefaultOpen, onOpenChange, animation, ...props },
    ref
  ) => {
    const { progress, isDragging, isAllAnimationsDisabled } =
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
        <BottomSheetAnimationProvider value={animationContextValue}>
          <BottomSheetPrimitives.Root
            ref={ref}
            isOpen={isOpen}
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
  children,
  disableFullWindowOverlay = false,
  ...props
}: BottomSheetPortalProps) => {
  const animationSettingsContext = useAnimationSettings();
  const animationContext = useBottomSheetAnimation();

  return (
    <BottomSheetPrimitives.Portal {...props}>
      <AnimationSettingsProvider value={animationSettingsContext}>
        <BottomSheetAnimationProvider value={animationContext}>
          <FullWindowOverlay
            disableFullWindowOverlay={disableFullWindowOverlay}
          >
            <Animated.View
              style={StyleSheet.absoluteFill}
              pointerEvents="box-none"
            >
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
>(
  (
    { className, style, animation, isAnimatedStyleActive = true, ...props },
    ref
  ) => {
    const { isOpen } = useBottomSheet();
    const { progress } = useBottomSheetAnimation();
    const isDragging = useSharedValue(false);

    const overlayClassName = bottomSheetClassNames.overlay({ className });

    const { rContainerStyle } = usePopupOverlayAnimation({
      progress,
      isDragging,
      animation,
    });

    if (!isOpen) {
      return null;
    }

    const overlayStyle = isAnimatedStyleActive
      ? [rContainerStyle, style]
      : style;

    return (
      <AnimatedOverlay
        ref={ref}
        className={overlayClassName}
        style={overlayStyle}
        pointerEvents={isOpen ? 'auto' : 'none'}
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
      contentContainerClassName: contentContainerClassNameProp,
      contentContainerProps,
      animationConfigs,
      animation,
      ...restProps
    },
    ref
  ) => {
    const { isOpen, onOpenChange } = useBottomSheet();

    const { progress, isDragging } = useBottomSheetAnimation();

    return (
      <InternalBottomSheetContent
        ref={ref}
        index={initialIndex}
        backgroundClassName={backgroundClassName}
        handleIndicatorClassName={handleIndicatorClassName}
        contentContainerClassName={contentContainerClassNameProp}
        contentContainerProps={contentContainerProps}
        animation={animation}
        animationConfigs={animationConfigs}
        backgroundStyle={[
          bottomSheetStyleSheet.contentContainer,
          restProps.backgroundStyle,
        ]}
        isOpen={isOpen}
        progress={progress}
        isDragging={isDragging}
        onOpenChange={onOpenChange}
        {...restProps}
      >
        {children}
      </InternalBottomSheetContent>
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
    const titleClassName = bottomSheetClassNames.label({ className });

    return (
      <HeroText
        ref={ref}
        role="heading"
        accessibilityRole="header"
        nativeID={`${nativeID}_label`}
        className={titleClassName}
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

    const descriptionClassName = bottomSheetClassNames.description({
      className,
    });

    return (
      <HeroText
        ref={ref}
        accessibilityRole="text"
        nativeID={`${nativeID}_desc`}
        className={descriptionClassName}
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
