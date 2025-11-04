import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { forwardRef, useEffect, useRef } from 'react';
import type { Text as RNText } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { GestureDetector } from 'react-native-gesture-handler';
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
import {
  CheckIcon,
  CloseIcon,
  FullWindowOverlay,
} from '../../helpers/components';
import { Text } from '../../helpers/components/text';
import { useDialogContentAnimation } from '../../helpers/hooks';
import { useThemeColor } from '../../helpers/theme';
import * as SelectPrimitives from '../../primitives/select';
import * as SelectPrimitivesTypes from '../../primitives/select/select.types';
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
  SelectContentDialogProps,
  SelectContentPopoverProps,
  SelectContentProps,
  SelectItemDescriptionProps,
  SelectItemIndicatorProps,
  SelectItemLabelProps,
  SelectItemProps,
  SelectListLabelProps,
  SelectOverlayProps,
  SelectPortalProps,
  SelectRootProps,
  SelectTriggerProps,
  SelectValueProps,
} from './select.types';

const AnimatedOverlay = Animated.createAnimatedComponent(
  SelectPrimitives.Overlay
);

const AnimatedPopoverContent = Animated.createAnimatedComponent(
  SelectPrimitives.PopoverContent
);

const AnimatedDialogContent = Animated.createAnimatedComponent(
  SelectPrimitives.DialogContent
);

const useSelect = SelectPrimitives.useRootContext;

const useSelectItem = SelectPrimitives.useItemContext;

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
  const { isDisabled: isDisabledProp } = props;

  const { isDisabled } = useSelect();

  const tvStyles = selectStyles.trigger({
    isDisabled: isDisabledProp || isDisabled,
  });

  return <SelectPrimitives.Trigger ref={ref} className={tvStyles} {...props} />;
});

// --------------------------------------------------

const SelectValue = forwardRef<
  SelectPrimitivesTypes.ValueRef,
  SelectValueProps
>(({ className, ...props }, ref) => {
  const tvStyles = selectStyles.value({ className });

  return <SelectPrimitives.Value ref={ref} className={tvStyles} {...props} />;
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
  const { progress } = useSelect();

  const tvStyles = selectStyles.overlay({
    className,
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
    const safeAreaInsets = useSafeAreaInsets();

    const insets = {
      top: DEFAULT_INSETS.top + safeAreaInsets.top,
      bottom: DEFAULT_INSETS.bottom + safeAreaInsets.bottom,
      left: DEFAULT_INSETS.left + safeAreaInsets.left,
      right: DEFAULT_INSETS.right + safeAreaInsets.right,
    };

    const { progress } = useSelect();
    const tvStyles = selectStyles.popoverContent({
      className,
    });

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
      <AnimatedPopoverContent
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
      </AnimatedPopoverContent>
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

    const themeColorOverlay = useThemeColor('overlay');
    const themeColorMuted = useThemeColor('muted');

    const tvStyles = selectStyles.bottomSheetContent({
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
      <BottomSheet
        ref={bottomSheetRef}
        backgroundStyle={[
          { backgroundColor: themeColorOverlay },
          restProps.backgroundStyle,
        ]}
        handleIndicatorStyle={[
          { backgroundColor: themeColorMuted },
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
    );
  }
);

// --------------------------------------------------

const SelectContentDialog = forwardRef<
  SelectPrimitivesTypes.ContentRef,
  SelectContentProps & { presentation: 'dialog' }
>(
  (
    {
      classNames,
      style,
      children,
      onLayout,
      isDefaultAnimationDisabled = false,
      ...props
    },
    ref
  ) => {
    const { progress, isDragging, selectState, onOpenChange } = useSelect();

    const { wrapper, content } = selectStyles.dialogContent();

    const wrapperStyles = wrapper({ className: classNames?.wrapper });
    const contentStyles = content({ className: classNames?.content });

    const {
      contentY,
      contentHeight,
      panGesture,
      rDragContainerStyle,
      rContainerStyle,
    } = useDialogContentAnimation({
      progress,
      isDragging,
      dialogState: selectState,
      onOpenChange,
      isDefaultAnimationDisabled,
    });

    return (
      <View className={wrapperStyles}>
        <GestureDetector gesture={panGesture}>
          <Animated.View
            style={rDragContainerStyle}
            className="pointer-events-box-none"
            onLayout={(event) => {
              contentY.set(event.nativeEvent.layout.y);
              contentHeight.set(event.nativeEvent.layout.height);
              onLayout?.(event);
            }}
          >
            <AnimatedDialogContent
              ref={ref}
              className={contentStyles}
              style={[styleSheet.contentContainer, rContainerStyle, style]}
              {...props}
            >
              {children}
            </AnimatedDialogContent>
          </Animated.View>
        </GestureDetector>
      </View>
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

  if (presentation === 'dialog') {
    return (
      <SelectContentDialog
        ref={ref as React.Ref<SelectPrimitivesTypes.ContentRef>}
        {...(props as SelectContentDialogProps)}
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
  const themeColorMuted = useThemeColor('muted');
  const defaultIconColor = themeColorMuted;

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

const SelectItem = forwardRef<SelectPrimitivesTypes.ItemRef, SelectItemProps>(
  ({ children, className, ...props }, ref) => {
    const tvStyles = selectStyles.item({ className });

    return (
      <SelectPrimitives.Item ref={ref} className={tvStyles} {...props}>
        {children || (
          <>
            <SelectItemLabel />
            <SelectItemIndicator />
          </>
        )}
      </SelectPrimitives.Item>
    );
  }
);

// --------------------------------------------------

const SelectItemLabel = forwardRef<
  SelectPrimitivesTypes.ItemLabelRef,
  SelectItemLabelProps
>(({ className, ...props }, ref) => {
  const { label } = useSelectItem();

  const tvStyles = selectStyles.itemLabel({ className });

  return (
    <Text ref={ref} accessibilityRole="text" className={tvStyles} {...props}>
      {label}
    </Text>
  );
});

// --------------------------------------------------

const SelectItemDescription = forwardRef<RNText, SelectItemDescriptionProps>(
  ({ className, ...props }, ref) => {
    const tvStyles = selectStyles.itemDescription({
      className,
    });

    return (
      <Text
        ref={ref}
        accessibilityRole="summary"
        className={tvStyles}
        {...props}
      />
    );
  }
);

// --------------------------------------------------

const SelectItemIndicator = forwardRef<
  SelectPrimitivesTypes.ItemIndicatorRef,
  SelectItemIndicatorProps
>(({ className, children, iconProps, ...props }, ref) => {
  const themeColorAccent = useThemeColor('accent');

  const iconSize = iconProps?.size ?? 16;
  const iconColor = iconProps?.color ?? themeColorAccent;

  const tvStyles = selectStyles.itemIndicator({ className });

  return (
    <SelectPrimitives.ItemIndicator ref={ref} className={tvStyles} {...props}>
      {children || <CheckIcon size={iconSize} color={iconColor} />}
    </SelectPrimitives.ItemIndicator>
  );
});

// --------------------------------------------------

const SelectListLabel = forwardRef<
  SelectPrimitivesTypes.GroupLabelRef,
  SelectListLabelProps
>(({ className, ...props }, ref) => {
  const tvStyles = selectStyles.listLabel({
    className,
  });

  return (
    <Text
      ref={ref}
      className={tvStyles}
      accessibilityRole="header"
      {...props}
    />
  );
});

// --------------------------------------------------

SelectRoot.displayName = DISPLAY_NAME.ROOT;
SelectTrigger.displayName = DISPLAY_NAME.TRIGGER;
SelectPortal.displayName = DISPLAY_NAME.PORTAL;
SelectOverlay.displayName = DISPLAY_NAME.OVERLAY;
SelectContent.displayName = DISPLAY_NAME.CONTENT;
SelectClose.displayName = DISPLAY_NAME.CLOSE;
SelectItemDescription.displayName = DISPLAY_NAME.ITEM_DESCRIPTION;
SelectValue.displayName = DISPLAY_NAME.VALUE;
SelectItem.displayName = DISPLAY_NAME.ITEM;
SelectItemLabel.displayName = DISPLAY_NAME.ITEM_LABEL;
SelectItemIndicator.displayName = DISPLAY_NAME.ITEM_INDICATOR;
SelectListLabel.displayName = DISPLAY_NAME.LIST_LABEL;

/**
 * Compound Select component with sub-components
 *
 * @component Select - Main container that manages open/close state, positioning,
 * value selection and provides context to child components. Handles placement, alignment, and collision detection.
 *
 * @component Select.Trigger - Clickable element that toggles the select visibility.
 * Wraps any child element with press handlers.
 *
 * @component Select.Value - Displays the selected value or placeholder text.
 * Automatically updates when selection changes.
 *
 * @component Select.Portal - Renders select content in a portal layer above other content.
 * Ensures proper stacking and positioning.
 *
 * @component Select.Overlay - Optional background overlay. Can be transparent or
 * semi-transparent to capture outside clicks.
 *
 * @component Select.Content - Container for select content with three presentation modes:
 * popover (default floating with positioning and collision detection), bottom sheet modal, or dialog modal.
 * Supports custom animations.
 *
 * @component Select.Item - Selectable option item. Handles selection state and press events.
 *
 * @component Select.ItemLabel - Displays the label text for an item.
 *
 * @component Select.ItemIndicator - Optional indicator shown for selected items.
 *
 * @component Select.ListLabel - Label for the list of items.
 *
 * @component Select.Close - Close button that dismisses the select when pressed.
 * Renders a default X icon if no children provided.
 *
 * @component Select.ItemDescription - Optional description text for items with muted styling.
 *
 * Props flow from Select to sub-components via context (placement, align, offset, value, etc.).
 * The select automatically positions itself relative to the trigger element.
 *
 * @see Full documentation: https://heroui.com/components/select
 */
const Select = Object.assign(SelectRoot, {
  Trigger: SelectTrigger,
  Value: SelectValue,
  Portal: SelectPortal,
  Overlay: SelectOverlay,
  Content: SelectContent,
  Item: SelectItem,
  ItemLabel: SelectItemLabel,
  ItemDescription: SelectItemDescription,
  ItemIndicator: SelectItemIndicator,
  ListLabel: SelectListLabel,
  Close: SelectClose,
});

export { useSelect, useSelectItem };
export default Select;
