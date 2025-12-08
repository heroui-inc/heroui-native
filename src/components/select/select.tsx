import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { forwardRef, useCallback, useEffect, useMemo, useRef } from 'react';
import type {
  LayoutChangeEvent,
  Text as RNText,
  ViewStyle,
} from 'react-native';
import { View } from 'react-native';
import { GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  interpolate,
  useAnimatedReaction,
  useSharedValue,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  CheckIcon,
  CloseIcon,
  FullWindowOverlay,
} from '../../helpers/components';
import { Text } from '../../helpers/components/text';
import {
  AnimationSettingsProvider,
  useAnimationSettings,
} from '../../helpers/contexts/animation-settings-context';
import { useDialogContentAnimation } from '../../helpers/hooks';
import { usePopupOverlayAnimation } from '../../helpers/hooks/use-popup-overlay-animation';
import { usePopupPopoverContentAnimation } from '../../helpers/hooks/use-popup-popover-content-animation';
import { usePopupRootAnimation } from '../../helpers/hooks/use-popup-root-animation';
import { useThemeColor } from '../../helpers/theme';
import * as SelectPrimitives from '../../primitives/select';
import * as SelectPrimitivesTypes from '../../primitives/select/select.types';
import {
  SelectAnimationProvider,
  useSelectAnimation,
} from './select.animation';
import {
  DEFAULT_ALIGN_OFFSET,
  DEFAULT_INSETS,
  DEFAULT_OFFSET,
  DISPLAY_NAME,
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
  (
    {
      children,
      closeDelay = 400,
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
      isGestureReleaseAnimationRunning,
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
        selectState: componentState,
        progress,
        isDragging,
        isGestureReleaseAnimationRunning,
      }),
      [componentState, progress, isDragging, isGestureReleaseAnimationRunning]
    );

    const animationSettingsContextValue = useMemo(
      () => ({
        isAllAnimationsDisabled,
      }),
      [isAllAnimationsDisabled]
    );

    return (
      <AnimationSettingsProvider value={animationSettingsContextValue}>
        <SelectAnimationProvider value={animationContextValue}>
          <SelectPrimitives.Root
            ref={ref}
            isOpen={internalIsOpen}
            isDefaultOpen={isDefaultOpen}
            onOpenChange={onOpenChange}
            closeDelay={closeDelay}
            {...props}
          >
            {children}
          </SelectPrimitives.Root>
        </SelectAnimationProvider>
      </AnimationSettingsProvider>
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

const SelectPortal = ({ className, children, ...props }: SelectPortalProps) => {
  const animationSettingsContext = useAnimationSettings();
  const animationContext = useSelectAnimation();

  const tvStyles = selectStyles.portal({ className });

  return (
    <SelectPrimitives.Portal {...props}>
      <AnimationSettingsProvider value={animationSettingsContext}>
        <SelectAnimationProvider value={animationContext}>
          <FullWindowOverlay>
            <View className={tvStyles}>{children}</View>
          </FullWindowOverlay>
        </SelectAnimationProvider>
      </AnimationSettingsProvider>
    </SelectPrimitives.Portal>
  );
};

// --------------------------------------------------

const SelectOverlay = forwardRef<
  SelectPrimitivesTypes.OverlayRef,
  SelectOverlayProps
>(({ className, style, animation, ...props }, ref) => {
  const { progress, isDragging, isGestureReleaseAnimationRunning } =
    useSelectAnimation();

  const tvStyles = selectStyles.overlay({
    className,
  });

  const { rContainerStyle } = usePopupOverlayAnimation({
    progress,
    isDragging,
    isGestureReleaseAnimationRunning,
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
      animation,
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

    const { progress } = useSelectAnimation();

    const tvStyles = selectStyles.popoverContent({
      className,
    });

    const { rContainerStyle } = usePopupPopoverContentAnimation({
      progress,
      placement,
      animation,
      style: style as ViewStyle,
    });

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
        style={[styleSheet.contentContainer, rContainerStyle, style]}
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

    const { onOpenChange } = useSelect();
    const { selectState, progress } = useSelectAnimation();

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
      animation,
      isSwipeable = true,
      ...props
    },
    ref
  ) => {
    const { onOpenChange } = useSelect();

    const {
      progress,
      isDragging,
      isGestureReleaseAnimationRunning,
      selectState,
    } = useSelectAnimation();

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
      isGestureReleaseAnimationRunning,
      dialogState: selectState,
      onOpenChange,
      animation,
      style: style as ViewStyle | undefined,
      isSwipeable,
    });

    const handleLayout = useCallback(
      (event: LayoutChangeEvent) => {
        contentY.set(event.nativeEvent.layout.y);
        contentHeight.set(event.nativeEvent.layout.height);
        onLayout?.(event);
      },
      [contentY, contentHeight, onLayout]
    );

    return (
      <View className={wrapperStyles}>
        <GestureDetector gesture={panGesture}>
          <Animated.View
            style={rDragContainerStyle}
            pointerEvents="box-none"
            onLayout={handleLayout}
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

export { useSelect, useSelectAnimation, useSelectItem };
export default Select;
