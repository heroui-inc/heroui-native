import type GorhomBottomSheet from '@gorhom/bottom-sheet';
import {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  type ComponentType,
  type ReactNode,
} from 'react';
import {
  BackHandler,
  StyleSheet,
  type GestureResponderEvent,
  type Text as RNText,
} from 'react-native';
import Animated, {
  ReduceMotion,
  useSharedValue,
} from 'react-native-reanimated';
import { withUniwind } from 'uniwind';
import {
  FullWindowOverlay,
  HeroText,
  BottomSheetContent as InternalBottomSheetContent,
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
import GorhomBottomSheetPackage from '../../optional/gorhom-bottom-sheet';
import * as BottomSheetPrimitives from '../../primitives/bottom-sheet';
import * as BottomSheetPrimitivesTypes from '../../primitives/bottom-sheet/bottom-sheet.types';
import { CloseButton } from '../close-button';
import {
  BottomSheetAnimationProvider,
  useBottomSheetAnimation,
  useBottomSheetContentAnimation,
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
  BottomSheetStackProps,
  BottomSheetStackSheetOverlayProps,
  BottomSheetStackSheetProps,
  BottomSheetTitleProps,
  BottomSheetTriggerProps,
} from './bottom-sheet.types';

const AnimatedOverlay = Animated.createAnimatedComponent(
  BottomSheetPrimitives.Overlay
);

const useBottomSheet = BottomSheetPrimitives.useRootContext;

const GorhomBottomSheetModalProvider =
  GorhomBottomSheetPackage?.BottomSheetModalProvider;
const GorhomBottomSheetView = GorhomBottomSheetPackage?.BottomSheetView;
const StyledGorhomBottomSheetBackdrop = withUniwind(
  GorhomBottomSheetPackage?.BottomSheetBackdrop
);
const StyledGorhomBottomSheetModal = withUniwind(
  GorhomBottomSheetPackage?.BottomSheetModal
);

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

/** Drop-in replacement for BottomSheet.Content with stacked sheet support. */
const BottomSheetStack = forwardRef<GorhomBottomSheet, BottomSheetStackProps>(
  (props, ref) => {
    if (!GorhomBottomSheetModalProvider) return null;
    return (
      <GorhomBottomSheetModalProvider>
        <BottomSheetContent ref={ref} {...props} />
      </GorhomBottomSheetModalProvider>
    );
  }
);

// --------------------------------------------------

// Keep containerComponent type stable so the modal subtree does not remount.
// This also lets us pass `isDragging` into portal-rendered content.
type StackSheetContainerProps = { children: ReactNode };
function makeStackSheetContainerComponent(
  isDragging: ReturnType<typeof usePopupRootAnimation>['isDragging']
): ComponentType<StackSheetContainerProps> {
  return function BottomSheetStackSheetContainer({
    children: modalChildren,
  }: StackSheetContainerProps) {
    return (
      <BottomSheetIsDraggingProvider value={{ isDragging }}>
        {modalChildren}
      </BottomSheetIsDraggingProvider>
    );
  };
}

// --------------------------------------------------

/** Sheet rendered on top of BottomSheet.Stack using BottomSheetModal. */
const BottomSheetStackSheet = ({
  children,
  isOpen,
  onOpenChange,
  stackBehavior = 'push',
  onDismiss,
  backgroundClassName,
  handleIndicatorClassName,
  contentContainerClassName: contentContainerClassNameProp,
  contentContainerProps,
  animation,
  animationConfigs,
  backgroundStyle: backgroundStyleProp,
  enablePanDownToClose,
  ...restProps
}: BottomSheetStackSheetProps) => {
  const modalRef = useRef<{
    dismiss: () => void;
    present: () => void;
  } | null>(null);
  const prevIsOpenRef = useRef(false);
  const skipNextDismissOpenChangeRef = useRef(false);

  const { progress, isDragging, isAllAnimationsDisabled } =
    usePopupRootAnimation({});

  const { animatedIndex } = usePopupBottomSheetContentAnimation({
    progress,
    isDragging,
  });

  const { isAnimationDisabledValue } = useBottomSheetContentAnimation({
    animation,
  });

  const mergedAnimationConfigs = useMemo(
    () => ({
      ...animationConfigs,
      reduceMotion: isAnimationDisabledValue
        ? ReduceMotion.Always
        : animationConfigs?.reduceMotion,
    }),
    [animationConfigs, isAnimationDisabledValue]
  );

  const dismissModal = useCallback(
    (shouldNotifyOpenChange: boolean) => {
      skipNextDismissOpenChangeRef.current = true;

      if (shouldNotifyOpenChange) {
        onOpenChange(false);
      }

      modalRef.current?.dismiss();
    },
    [onOpenChange]
  );

  // Only present/dismiss on state transitions to mirror BottomSheet.Content
  useEffect(() => {
    const wasOpen = prevIsOpenRef.current;
    prevIsOpenRef.current = isOpen;

    if (isOpen && !wasOpen) {
      modalRef.current?.present();
    } else if (!isOpen && wasOpen) {
      dismissModal(false);
    }
  }, [dismissModal, isOpen]);

  // When the root bottom sheet closes (e.g. overlay tap), also close this stacked
  // sheet. Gorhom does not automatically fire onDismiss on BottomSheetModal when its
  // parent BottomSheet collapses, so the consumer's state would otherwise remain open.
  const { isOpen: isRootOpen } = useBottomSheet();
  useEffect(() => {
    if (!isRootOpen && isOpen) {
      dismissModal(true);
    }
  }, [dismissModal, isOpen, isRootOpen]);

  // Android hardware back button closes this sheet, not the one beneath it.
  useEffect(() => {
    if (!isOpen) return;

    const handler = BackHandler.addEventListener('hardwareBackPress', () => {
      dismissModal(true);
      return true;
    });

    return () => handler.remove();
  }, [dismissModal, isOpen]);

  const containerComponentRef =
    useRef<ComponentType<StackSheetContainerProps> | null>(null);
  containerComponentRef.current ??=
    makeStackSheetContainerComponent(isDragging);
  const ContainerComponent = containerComponentRef.current;

  const contentBackgroundClassName = bottomSheetClassNames.contentBackground({
    className: backgroundClassName,
  });
  const contentHandleIndicatorClassName =
    bottomSheetClassNames.contentHandleIndicator({
      className: handleIndicatorClassName,
    });
  const contentContainerClassName = bottomSheetClassNames.contentContainer({
    className: contentContainerClassNameProp,
  });

  const animContextValue = useMemo(
    () => ({ progress, isDragging }),
    [progress, isDragging]
  );
  const animSettingsValue = useMemo(
    () => ({ isAllAnimationsDisabled }),
    [isAllAnimationsDisabled]
  );

  if (!StyledGorhomBottomSheetModal || !GorhomBottomSheetView) {
    return null;
  }

  return (
    <StyledGorhomBottomSheetModal
      ref={modalRef}
      stackBehavior={stackBehavior}
      enableDismissOnClose={true}
      enablePanDownToClose={enablePanDownToClose ?? true}
      animatedIndex={animatedIndex}
      backgroundClassName={contentBackgroundClassName}
      backgroundStyle={[
        bottomSheetStyleSheet.contentContainer,
        backgroundStyleProp,
      ]}
      handleIndicatorClassName={contentHandleIndicatorClassName}
      gestureEventsHandlersHook={useBottomSheetGestureHandlers}
      animationConfigs={mergedAnimationConfigs}
      onDismiss={() => {
        prevIsOpenRef.current = false;

        if (skipNextDismissOpenChangeRef.current) {
          skipNextDismissOpenChangeRef.current = false;
        } else {
          onOpenChange(false);
        }
        onDismiss?.();
      }}
      containerComponent={ContainerComponent}
      {...restProps}
    >
      {/* Re-provide contexts inside the portal so nested subcomponents still work. */}
      <AnimationSettingsProvider value={animSettingsValue}>
        <BottomSheetAnimationProvider value={animContextValue}>
          <BottomSheetPrimitives.Root
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            asChild
          >
            <BottomSheetPrimitives.Content asChild>
              <GorhomBottomSheetView
                className={contentContainerClassName}
                {...contentContainerProps}
              >
                {children}
              </GorhomBottomSheetView>
            </BottomSheetPrimitives.Content>
          </BottomSheetPrimitives.Root>
        </BottomSheetAnimationProvider>
      </AnimationSettingsProvider>
    </StyledGorhomBottomSheetModal>
  );
};

// --------------------------------------------------

/**
 * Backdrop for BottomSheet.Stack.Sheet.
 * Use as `backdropComponent={BottomSheet.Stack.Sheet.Overlay}`.
 */
const BottomSheetStackSheetOverlay = ({
  className,
  ...props
}: BottomSheetStackSheetOverlayProps) => {
  if (!StyledGorhomBottomSheetBackdrop) return null;

  return (
    <StyledGorhomBottomSheetBackdrop
      opacity={1}
      {...props}
      disappearsOnIndex={-1}
      appearsOnIndex={0}
      className={bottomSheetClassNames.overlay({ className })}
    />
  );
};

// --------------------------------------------------

BottomSheetRoot.displayName = DISPLAY_NAME.ROOT;
BottomSheetTrigger.displayName = DISPLAY_NAME.TRIGGER;
BottomSheetPortal.displayName = DISPLAY_NAME.PORTAL;
BottomSheetOverlay.displayName = DISPLAY_NAME.OVERLAY;
BottomSheetContent.displayName = DISPLAY_NAME.CONTENT;
BottomSheetClose.displayName = DISPLAY_NAME.CLOSE;
BottomSheetTitle.displayName = DISPLAY_NAME.TITLE;
BottomSheetDescription.displayName = DISPLAY_NAME.DESCRIPTION;
BottomSheetStack.displayName = DISPLAY_NAME.STACK;
BottomSheetStackSheet.displayName = DISPLAY_NAME.STACK_SHEET;
BottomSheetStackSheetOverlay.displayName = DISPLAY_NAME.STACK_SHEET_OVERLAY;

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
 * @component BottomSheet.Stack - Drop-in replacement for BottomSheet.Content that
 * enables stacking. Use BottomSheet.Stack.Sheet inside its content to push sheets.
 *
 * @component BottomSheet.Stack.Sheet - A sheet that stacks on top via BottomSheetModal.
 * Must be rendered inside a BottomSheet.Stack.
 *
 * @component BottomSheet.Stack.Sheet.Overlay - Backdrop for a stacked sheet.
 * Pass as the `backdropComponent` prop on BottomSheet.Stack.Sheet.
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
  /** @optional Drop-in for Content that enables BottomSheet.Stack.Sheet */
  Stack: Object.assign(BottomSheetStack, {
    /** @optional Stacked sheet. Must be inside BottomSheet.Stack. */
    Sheet: Object.assign(BottomSheetStackSheet, {
      /**
       * @optional Overlay for this stacked sheet.
       * Pass as `backdropComponent={BottomSheet.Stack.Sheet.Overlay}`.
       */
      Overlay: BottomSheetStackSheetOverlay,
    }),
  }),
  /** @optional Close button for the bottom sheet */
  Close: BottomSheetClose,
  /** @optional Bottom sheet title text */
  Title: BottomSheetTitle,
  /** @optional Bottom sheet description text */
  Description: BottomSheetDescription,
});

export { useBottomSheet, useBottomSheetAnimation };
export default BottomSheet;
