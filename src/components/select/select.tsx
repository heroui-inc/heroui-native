import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { createContext, forwardRef, useEffect, useRef } from 'react';
import type { Text as RNText } from 'react-native';
import { StyleSheet, View } from 'react-native';
import Animated, {
  Extrapolation,
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
import * as SelectPrimitives from '../../primitives/select';
import * as SelectPrimitivesTypes from '../../primitives/select/select.types';
import { useTheme } from '../../providers/theme';
import { CloseIcon } from './close-icon';
import {
  DEFAULT_ALIGN_OFFSET,
  DEFAULT_INSETS,
  DEFAULT_OFFSET,
  DISPLAY_NAME,
  SPRING_CONFIG_CLOSE,
  SPRING_CONFIG_OPEN,
} from './select.constants';
import selectStyles, { styleSheet } from './select.styles';
import type {
  SelectCloseProps,
  SelectContentBottomSheetProps,
  SelectContentContextValue,
  SelectContentPopoverProps,
  SelectContentProps,
  SelectDescriptionProps,
  SelectOverlayProps,
  SelectPortalProps,
  SelectRootProps,
  SelectTitleProps,
  SelectTriggerProps,
} from './select.types';

const AnimatedOverlay = Animated.createAnimatedComponent(
  SelectPrimitives.Overlay
);

const AnimatedContent = Animated.createAnimatedComponent(
  SelectPrimitives.Content
);

const useSelect = SelectPrimitives.useRootContext;

const SelectContentContext = createContext<SelectContentContextValue>({
  placement: undefined,
});

// --------------------------------------------------

const SelectRoot = forwardRef<SelectPrimitivesTypes.RootRef, SelectRootProps>(
  ({ children, onOpenChange, closeDelay = 400, ...props }, ref) => {
    return (
      <SelectPrimitives.Root
        ref={ref}
        onOpenChange={onOpenChange}
        closeDelay={closeDelay}
        {...props}
      >
        {children}
      </SelectPrimitives.Root>
    );
  }
);

// --------------------------------------------------

const SelectTrigger = forwardRef<
  SelectPrimitivesTypes.TriggerRef,
  SelectTriggerProps
>((props, ref) => {
  return <SelectPrimitives.Trigger ref={ref} {...props} />;
});

// --------------------------------------------------

const SelectPortal = ({
  className,
  children,
  progressAnimationConfigs,
  ...props
}: SelectPortalProps) => {
  const tvStyles = selectStyles.portal({ className });

  const { selectState, progress } = useSelect();

  useEffect(() => {
    if (selectState === 'open') {
      const openConfig = progressAnimationConfigs?.onOpen;
      if (openConfig?.animationType === 'spring') {
        progress.set(withSpring(1, openConfig.animationConfig));
      } else if (openConfig?.animationType === 'timing') {
        progress.set(withTiming(1, openConfig.animationConfig));
      } else {
        progress.set(withSpring(1, SPRING_CONFIG_OPEN));
      }
    } else if (selectState === 'close') {
      const closeConfig = progressAnimationConfigs?.onClose;
      if (closeConfig?.animationType === 'spring') {
        progress.set(withSpring(2, closeConfig.animationConfig));
      } else if (closeConfig?.animationType === 'timing') {
        progress.set(withTiming(2, closeConfig.animationConfig));
      } else {
        progress.set(withSpring(2, SPRING_CONFIG_CLOSE));
      }
    } else {
      progress.set(0);
    }
  }, [selectState, progress, progressAnimationConfigs]);

  return (
    <SelectPrimitives.Portal {...props}>
      <FullWindowOverlay>
        <View className={tvStyles}>{children}</View>
      </FullWindowOverlay>
    </SelectPrimitives.Portal>
  );
};

// --------------------------------------------------

const SelectOverlay = forwardRef<
  SelectPrimitivesTypes.OverlayRef,
  SelectOverlayProps
>(({ className, style, isDefaultAnimationDisabled, ...props }, ref) => {
  const { isDark } = useTheme();

  const { progress } = useSelect();

  const tvStyles = selectStyles.overlay({
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

const SelectContentPopover = forwardRef<
  SelectPrimitivesTypes.ContentRef,
  SelectContentProps & { presentation?: 'popover' }
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

    const { progress } = useSelect();
    const tvStyles = selectStyles.selectContent({ className, isDark });

    const rContainerStyle = useAnimatedStyle(() => {
      if (isDefaultAnimationDisabled) {
        return {};
      }

      let transformOrigin = 'top';
      let translateX = 0;
      let translateY = 0;

      if (placement === 'top') {
        transformOrigin = 'bottom';
        translateY = interpolate(progress.get(), [0, 1, 2], [4, 0, 4]);
      } else if (placement === 'bottom') {
        transformOrigin = 'top';
        translateY = interpolate(progress.get(), [0, 1, 2], [-4, 0, -4]);
      } else if (placement === 'left') {
        transformOrigin = 'right';
        translateX = interpolate(progress.get(), [0, 1, 2], [4, 0, 4]);
      } else if (placement === 'right') {
        transformOrigin = 'left';
        translateX = interpolate(progress.get(), [0, 1, 2], [-4, 0, -4]);
      }

      return {
        opacity: interpolate(
          progress.get(),
          [0, 1, 1.75, 2],
          [0.25, 1, 0.75, 0],
          Extrapolation.CLAMP
        ),
        transformOrigin,
        transform: [
          { translateX },
          { translateY },
          { scale: interpolate(progress.get(), [0, 1, 2], [0.95, 1, 0.95]) },
        ],
      };
    });

    const flatStyle = StyleSheet.flatten([
      styleSheet.contentContainer,
      rContainerStyle,
      style,
    ]);

    return (
      <SelectContentContext value={{ placement }}>
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
      </SelectContentContext>
    );
  }
);

// --------------------------------------------------

const SelectContentBottomSheet = forwardRef<
  BottomSheet,
  SelectContentProps & { presentation: 'bottom-sheet' }
>(
  (
    { children, bottomSheetViewClassName, bottomSheetViewProps, ...restProps },
    ref
  ) => {
    const insets = useSafeAreaInsets();

    const bottomSheetRef = useRef<BottomSheet>(null);

    const { selectState, onOpenChange, progress } = useSelect();

    const { colors } = useTheme();

    const tvStyles = selectStyles.bottomSheetView({
      className: bottomSheetViewClassName,
    });

    useEffect(() => {
      if (selectState === 'open') {
        bottomSheetRef.current?.expand();
      } else if (selectState === 'close') {
        bottomSheetRef.current?.close();
      }
    }, [selectState]);

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
        if (selectState === 'open' && value <= 0) {
          progress.set(interpolate(animatedIndex.get(), [0, -1], [1, 2]));
        }
      }
    );

    return (
      <SelectContentContext value={{ placement: 'bottom' }}>
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
      </SelectContentContext>
    );
  }
);

// --------------------------------------------------

const SelectContent = forwardRef<
  SelectPrimitivesTypes.ContentRef | BottomSheet,
  SelectContentProps
>((props, ref) => {
  const presentation = props.presentation || 'popover';

  if (presentation === 'bottom-sheet') {
    return (
      <SelectContentBottomSheet
        ref={ref as React.Ref<BottomSheet>}
        {...(props as SelectContentBottomSheetProps)}
      />
    );
  }

  return (
    <SelectContentPopover
      ref={ref as React.Ref<SelectPrimitivesTypes.ContentRef>}
      {...(props as SelectContentPopoverProps)}
    />
  );
});

// --------------------------------------------------

const SelectClose = forwardRef<
  SelectPrimitivesTypes.CloseRef,
  SelectCloseProps
>(({ className, children, iconProps, hitSlop = 12, ...props }, ref) => {
  const { colors, isDark } = useTheme();

  const defaultIconColor = isDark ? colors.mutedForeground : colors.muted;

  const tvStyles = selectStyles.close({ className });

  return (
    <SelectPrimitives.Close
      ref={ref}
      className={tvStyles}
      hitSlop={hitSlop}
      {...props}
    >
      {children || (
        <CloseIcon
          size={iconProps?.size ?? 18}
          color={iconProps?.color ?? defaultIconColor}
        />
      )}
    </SelectPrimitives.Close>
  );
});

// --------------------------------------------------

const SelectTitle = forwardRef<RNText, SelectTitleProps>(
  ({ className, children, ...props }, ref) => {
    const tvStyles = selectStyles.title({ className });

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

const SelectDescription = forwardRef<RNText, SelectDescriptionProps>(
  ({ className, children, ...props }, ref) => {
    const { isDark } = useTheme();

    const tvStyles = selectStyles.description({ className, isDark });

    return (
      <Text ref={ref} accessibilityRole="text" className={tvStyles} {...props}>
        {children}
      </Text>
    );
  }
);

// --------------------------------------------------

SelectRoot.displayName = DISPLAY_NAME.ROOT;
SelectTrigger.displayName = DISPLAY_NAME.TRIGGER;
SelectPortal.displayName = DISPLAY_NAME.PORTAL;
SelectOverlay.displayName = DISPLAY_NAME.OVERLAY;
SelectContent.displayName = DISPLAY_NAME.CONTENT;
SelectClose.displayName = DISPLAY_NAME.CLOSE;
SelectTitle.displayName = DISPLAY_NAME.TITLE;
SelectDescription.displayName = DISPLAY_NAME.DESCRIPTION;

/**
 * Compound Select component with sub-components
 *
 * @component Select - Main container that manages open/close state, positioning,
 * and provides context to child components. Handles placement, alignment, and collision detection.
 *
 * @component Select.Trigger - Clickable element that toggles the select visibility.
 * Wraps any child element with press handlers.
 *
 * @component Select.Portal - Renders select content in a portal layer above other content.
 * Ensures proper stacking and positioning.
 *
 * @component Select.Overlay - Optional background overlay. Can be transparent or
 * semi-transparent to capture outside clicks.
 *
 * @component Select.Content - Container for select content with two presentation modes:
 * default floating popover with positioning and collision detection, or bottom sheet modal.
 * Supports arrow indicators and custom animations.
 *
 * @component Select.Close - Close button that dismisses the select when pressed.
 * Renders a default X icon if no children provided.
 *
 * @component Select.Title - Optional title text with pre-styled typography.
 *
 * @component Select.Description - Optional description text with muted styling.
 *
 * Props flow from Select to sub-components via context (placement, align, offset, etc.).
 * The select automatically positions itself relative to the trigger element.
 *
 * @see Full documentation: https://heroui.com/components/select
 */
const Select = Object.assign(SelectRoot, {
  Trigger: SelectTrigger,
  Portal: SelectPortal,
  Overlay: SelectOverlay,
  Content: SelectContent,
  Close: SelectClose,
  Title: SelectTitle,
  Description: SelectDescription,
});

export { useSelect };
export default Select;
