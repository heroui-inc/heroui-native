import { forwardRef, useEffect } from 'react';
import type { Text as RNText } from 'react-native';
import { Keyboard, useWindowDimensions } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';
import { FullWindowOverlay } from '../../helpers/components';
import { Text } from '../../helpers/components/text';
import { useKeyboardStatus } from '../../helpers/hooks';
import * as DialogPrimitives from '../../primitives/dialog';
import * as DialogPrimitivesTypes from '../../primitives/dialog/dialog.types';
import { useTheme } from '../../providers/theme';
import { CloseIcon } from './close-icon';
import { DISPLAY_NAME } from './dialog.constants';
import dialogStyles, { nativeStyles } from './dialog.styles';
import type {
  DialogCloseProps,
  DialogContentProps,
  DialogDescriptionProps,
  DialogOverlayProps,
  DialogPortalProps,
  DialogRootProps,
  DialogTitleProps,
  DialogTriggerProps,
} from './dialog.types';

const AnimatedOverlay = Animated.createAnimatedComponent(
  DialogPrimitives.Overlay
);

const AnimatedContent = Animated.createAnimatedComponent(
  DialogPrimitives.Content
);

const useDialog = DialogPrimitives.useRootContext;

// --------------------------------------------------

const DialogRoot = forwardRef<DialogPrimitivesTypes.RootRef, DialogRootProps>(
  ({ children, isOpen, onOpenChange, closeDelay = 300, ...props }, ref) => {
    return (
      <DialogPrimitives.Root
        ref={ref}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        closeDelay={closeDelay}
        {...props}
      >
        {children}
      </DialogPrimitives.Root>
    );
  }
);

// --------------------------------------------------

const DialogTrigger = forwardRef<
  DialogPrimitivesTypes.TriggerRef,
  DialogTriggerProps
>((props, ref) => {
  return <DialogPrimitives.Trigger ref={ref} asChild {...props} />;
});

// --------------------------------------------------

const DialogPortal = ({
  className,
  children,
  style,
  progressAnimationConfigs,
  ...props
}: DialogPortalProps) => {
  const { dialogState, progress } = useDialog();

  const tvStyles = dialogStyles.portal({ className });

  useEffect(() => {
    if (dialogState === 'open') {
      // Transition to open state (progress = 1)
      const openConfig = progressAnimationConfigs?.onOpen;
      if (openConfig?.animationType === 'spring') {
        progress.set(withSpring(1, openConfig.animationConfig));
      } else if (openConfig?.animationType === 'timing') {
        progress.set(withTiming(1, openConfig.animationConfig));
      } else {
        progress.set(withTiming(1, { duration: 200 }));
      }
    } else if (dialogState === 'close') {
      // Transition to close state (progress = 2)
      const closeConfig = progressAnimationConfigs?.onClose;
      if (closeConfig?.animationType === 'spring') {
        progress.set(withSpring(2, closeConfig.animationConfig));
      } else if (closeConfig?.animationType === 'timing') {
        progress.set(withTiming(2, closeConfig.animationConfig));
      } else {
        progress.set(withTiming(2, { duration: 200 }));
      }
    }
  }, [dialogState, progress, progressAnimationConfigs]);

  return (
    <DialogPrimitives.Portal {...props}>
      <FullWindowOverlay>
        <Animated.View className={tvStyles} style={style}>
          {children}
        </Animated.View>
      </FullWindowOverlay>
    </DialogPrimitives.Portal>
  );
};

// --------------------------------------------------

const DialogOverlay = forwardRef<
  DialogPrimitivesTypes.OverlayRef,
  DialogOverlayProps
>(({ className, style, isAnimationDisabled = false, ...props }, ref) => {
  const { progress, isDragging } = useDialog();

  const rContainerStyle = useAnimatedStyle(() => {
    if (isAnimationDisabled) {
      return {};
    }

    if (isDragging.get() && progress.get() <= 1) {
      return { opacity: 1 };
    }

    const opacity = interpolate(progress.get(), [0, 1, 2], [0, 1, 0]);

    return {
      opacity,
    };
  });

  const tvStyles = dialogStyles.overlay({
    className,
    isAnimationDisabled,
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

const DialogContent = forwardRef<
  DialogPrimitivesTypes.ContentRef,
  DialogContentProps
>(
  (
    {
      className,
      style,
      children,
      onLayout,
      isAnimationDisabled = false,
      ...props
    },
    ref
  ) => {
    const { progress, isDragging, dialogState, onOpenChange } = useDialog();

    const { height: screenHeight } = useWindowDimensions();

    const isKeyboardOpen = useKeyboardStatus();

    const tvStyles = dialogStyles.content({ className });

    const contentY = useSharedValue(0);
    const contentHeight = useSharedValue(0);
    const isOnEndAnimationRunning = useSharedValue(false);
    const progressAnchor = useSharedValue(1);
    const contentTranslateYAnchor = useSharedValue(0);
    const contentScaleAnchor = useSharedValue(1);

    const dismissKeyboard = () => {
      Keyboard.dismiss();
    };

    const contentTranslateY = useDerivedValue(() => {
      const maxDragDistance = screenHeight - contentY.get();

      return interpolate(
        progress.get(),
        [0, 1, 2],
        [-maxDragDistance * 0.1, 0, maxDragDistance],
        Extrapolation.CLAMP
      );
    });

    const contentScale = useDerivedValue(() => {
      return interpolate(
        progress.get(),
        [1, 2],
        [1, 0.95],
        Extrapolation.CLAMP
      );
    });

    const panGesture = Gesture.Pan()
      .enabled(dialogState === 'open')
      .onStart(() => {
        if (isOnEndAnimationRunning.get()) return;
        isDragging.set(true);
      })
      .onUpdate((event) => {
        if (!isDragging.get()) return;

        const maxDragDistance = screenHeight - contentY.get();

        if (event.translationY > 0) {
          const progressValue = 1 + event.translationY / maxDragDistance;
          progress.set(progressValue);
        } else if (event.translationY < 0 && !isKeyboardOpen) {
          const progressValue =
            1 - Math.abs(event.translationY) / contentY.get();
          progress.set(progressValue);
        }
      })
      .onEnd(() => {
        progressAnchor.set(progress.get());
        contentTranslateYAnchor.set(contentTranslateY.get());
        contentScaleAnchor.set(contentScale.get());

        if (progress.get() > 1.1) {
          isOnEndAnimationRunning.set(true);
          scheduleOnRN(dismissKeyboard);
          progress.set(
            withSpring(
              2,
              {
                mass: 4,
                damping: 120,
                stiffness: 900,
                overshootClamping: false,
              },
              () => {
                isOnEndAnimationRunning.set(false);
                isDragging.set(false);
              }
            )
          );
          setTimeout(() => {
            scheduleOnRN(onOpenChange, false);
          }, 300);
        } else {
          progress.set(
            withSpring(1, {}, () => {
              isDragging.set(false);
            })
          );
        }
      });

    const rDragContainerStyle = useAnimatedStyle(() => {
      if (!isDragging.get()) {
        return {};
      }

      if (isOnEndAnimationRunning.get()) {
        return {
          opacity: interpolate(
            progress.get(),
            [1, progressAnchor.get(), 1.5, 1.75],
            [1, 1, 1, 0]
          ),
          transform: [
            {
              translateY: interpolate(
                progress.get(),
                [1, progressAnchor.get(), progressAnchor.get() + 0.1, 2],
                [
                  0,
                  contentTranslateYAnchor.get(),
                  contentTranslateYAnchor.get() + 50,
                  contentTranslateYAnchor.get() - 150,
                ]
              ),
            },
            {
              scale: interpolate(
                progress.get(),
                [1, progressAnchor.get(), 2],
                [1, contentScaleAnchor.get(), 0.75]
              ),
            },
          ],
        };
      }

      return {
        transform: [
          {
            translateY: contentTranslateY.get(),
          },
          {
            scale: contentScale.get(),
          },
        ],
      };
    });

    const rContainerStyle = useAnimatedStyle(() => {
      if (isDragging.get()) {
        return { opacity: 1 };
      }

      if (isAnimationDisabled) {
        return {};
      }

      return {
        opacity: interpolate(progress.get(), [0, 1, 2], [0, 1, 0]),
        transform: [
          {
            scale: interpolate(progress.get(), [0, 1, 2], [0.97, 1, 0.97]),
          },
        ],
      };
    });

    return (
      <GestureDetector gesture={panGesture}>
        <Animated.View
          style={rDragContainerStyle}
          onLayout={(event) => {
            contentY.set(event.nativeEvent.layout.y);
            contentHeight.set(event.nativeEvent.layout.height);
            onLayout?.(event);
          }}
        >
          <AnimatedContent
            ref={ref}
            className={tvStyles}
            style={[nativeStyles.contentContainer, rContainerStyle, style]}
            {...props}
          >
            {children}
          </AnimatedContent>
        </Animated.View>
      </GestureDetector>
    );
  }
);

// --------------------------------------------------

const DialogClose = forwardRef<
  DialogPrimitivesTypes.CloseRef,
  DialogCloseProps
>(({ className, iconProps, hitSlop = 12, children, ...props }, ref) => {
  const { colors } = useTheme();

  const tvStyles = dialogStyles.close({ className });

  return (
    <DialogPrimitives.Close
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
    </DialogPrimitives.Close>
  );
});

// --------------------------------------------------

const DialogTitle = forwardRef<RNText, DialogTitleProps>(
  ({ className, children, ...props }, ref) => {
    const { nativeID } = useDialog();
    const tvStyles = dialogStyles.title({ className });

    return (
      <Text
        ref={ref}
        role="heading"
        accessibilityRole="header"
        nativeID={`${nativeID}_label`}
        className={tvStyles}
        {...props}
      >
        {children}
      </Text>
    );
  }
);

// --------------------------------------------------

const DialogDescription = forwardRef<RNText, DialogDescriptionProps>(
  ({ className, children, ...props }, ref) => {
    const { nativeID } = useDialog();
    const tvStyles = dialogStyles.description({ className });

    return (
      <Text
        ref={ref}
        accessibilityRole="text"
        nativeID={`${nativeID}_desc`}
        className={tvStyles}
        {...props}
      >
        {children}
      </Text>
    );
  }
);

// --------------------------------------------------

DialogRoot.displayName = DISPLAY_NAME.ROOT;
DialogTrigger.displayName = DISPLAY_NAME.TRIGGER;
DialogPortal.displayName = DISPLAY_NAME.PORTAL;
DialogOverlay.displayName = DISPLAY_NAME.OVERLAY;
DialogContent.displayName = DISPLAY_NAME.CONTENT;
DialogClose.displayName = DISPLAY_NAME.CLOSE;
DialogTitle.displayName = DISPLAY_NAME.TITLE;
DialogDescription.displayName = DISPLAY_NAME.DESCRIPTION;

/**
 * Compound Dialog component with sub-components
 *
 * @component Dialog.Root - Main container that manages open/close state.
 * Provides the dialog context to child components.
 *
 * @component Dialog.Trigger - Button or element that opens the dialog.
 * Accepts any pressable element as children.
 *
 * @component Dialog.Portal - Portal container for dialog overlay and content.
 * Renders children in a portal with centered layout.
 *
 * @component Dialog.Overlay - Background overlay that covers the screen.
 * Typically closes the dialog when clicked.
 *
 * @component Dialog.Content - The dialog content container.
 * Contains the main dialog UI elements.
 *
 * @component Dialog.Close - Close button for the dialog.
 * Can accept custom children or uses default close icon.
 *
 * @component Dialog.Title - The dialog title text.
 * Automatically linked for accessibility.
 *
 * @component Dialog.Description - The dialog description text.
 * Automatically linked for accessibility.
 *
 * @see Full documentation: https://heroui.com/components/dialog
 */
const Dialog = Object.assign(DialogRoot, {
  /** @optional Trigger element to open the dialog */
  Trigger: DialogTrigger,
  /** @optional Portal container for overlay and content */
  Portal: DialogPortal,
  /** @optional Background overlay */
  Overlay: DialogOverlay,
  /** @optional Main dialog content container */
  Content: DialogContent,
  /** @optional Close button for the dialog */
  Close: DialogClose,
  /** @optional Dialog title text */
  Title: DialogTitle,
  /** @optional Dialog description text */
  Description: DialogDescription,
});

export { useDialog };
export default Dialog;
