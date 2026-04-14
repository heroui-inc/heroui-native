import type BottomSheet from '@gorhom/bottom-sheet';
import { createContext, forwardRef, useMemo } from 'react';
import type { GestureResponderEvent, Text as RNText } from 'react-native';
import { Pressable, StyleSheet, useWindowDimensions, View } from 'react-native';
import Animated, { FadeOut } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useThemeColor } from '../../helpers/external/hooks';
import { cn } from '../../helpers/external/utils';
import {
  BottomSheetContent,
  CheckIcon,
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
import { childrenToString } from '../../helpers/internal/utils';
import * as MenuPrimitives from '../../primitives/menu';
import * as MenuPrimitivesTypes from '../../primitives/menu/menu.types';
import { CloseButton } from '../close-button';
import { useSubMenu } from '../sub-menu';
import {
  MenuAnimationProvider,
  useMenuAnimation,
  useMenuContentPopoverAnimation,
  useMenuItemAnimation,
} from './menu.animation';
import {
  DEFAULT_ALIGN_OFFSET,
  DEFAULT_INSETS,
  DEFAULT_OFFSET,
  DISPLAY_NAME,
} from './menu.constants';
import { menuClassNames, menuStyleSheet } from './menu.styles';
import type {
  MenuCloseProps,
  MenuContentBottomSheetProps,
  MenuContentContextValue,
  MenuContentPopoverProps,
  MenuContentProps,
  MenuGroupProps,
  MenuItemDescriptionProps,
  MenuItemIndicatorProps,
  MenuItemProps,
  MenuItemTitleProps,
  MenuLabelProps,
  MenuOverlayProps,
  MenuPortalProps,
  MenuRootProps,
  MenuTriggerProps,
} from './menu.types';

const AnimatedOverlay = Animated.createAnimatedComponent(
  MenuPrimitives.Overlay
);

const AnimatedContent = Animated.createAnimatedComponent(
  MenuPrimitives.Content
);

const AnimatedItem = Animated.createAnimatedComponent(MenuPrimitives.Item);

const useMenu = MenuPrimitives.useRootContext;
const useMenuItem = MenuPrimitives.useItemContext;

const MenuContentContext = createContext<MenuContentContextValue>({
  placement: undefined,
});

// --------------------------------------------------

const MenuRoot = forwardRef<MenuPrimitivesTypes.RootRef, MenuRootProps>(
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
        <MenuAnimationProvider value={animationContextValue}>
          <MenuPrimitives.Root
            ref={ref}
            presentation={presentation}
            isOpen={isOpenProp}
            isDefaultOpen={isDefaultOpen}
            onOpenChange={onOpenChangeProp}
            {...props}
          >
            {children}
          </MenuPrimitives.Root>
        </MenuAnimationProvider>
      </AnimationSettingsProvider>
    );
  }
);

// --------------------------------------------------

const MenuTrigger = forwardRef<
  MenuPrimitivesTypes.TriggerRef,
  MenuTriggerProps
>((props, ref) => {
  return <MenuPrimitives.Trigger ref={ref} {...props} />;
});

// --------------------------------------------------

const MenuPortal = ({
  className,
  children,
  disableFullWindowOverlay = false,
  unstable_accessibilityContainerViewIsModal,
  ...props
}: MenuPortalProps) => {
  const animationSettingsContext = useAnimationSettings();
  const animationContext = useMenuAnimation();

  const portalClassName = menuClassNames.portal({ className });

  return (
    <MenuPrimitives.Portal {...props}>
      <AnimationSettingsProvider value={animationSettingsContext}>
        <MenuAnimationProvider value={animationContext}>
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
        </MenuAnimationProvider>
      </AnimationSettingsProvider>
    </MenuPrimitives.Portal>
  );
};

// --------------------------------------------------

const MenuOverlay = forwardRef<
  MenuPrimitivesTypes.OverlayRef,
  MenuOverlayProps
>(
  (
    { className, style, animation, isAnimatedStyleActive = true, ...props },
    ref
  ) => {
    const { isOpen, presentation } = useMenu();
    const { progress, isDragging } = useMenuAnimation();

    const overlayClassName = menuClassNames.overlay({ className });

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

const MenuContentPopover = forwardRef<
  MenuPrimitivesTypes.ContentRef,
  MenuContentPopoverProps
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
    const { contentLayout, isSubMenuOpen, openSubMenuId, closeSubMenu } =
      useMenu();

    const safeAreaInsets = useSafeAreaInsets();
    const { height: screenHeight } = useWindowDimensions();

    const isReady = Boolean(contentLayout?.y && contentLayout.y < screenHeight);

    const insets = {
      top: DEFAULT_INSETS.top + safeAreaInsets.top,
      bottom: DEFAULT_INSETS.bottom + safeAreaInsets.bottom,
      left: DEFAULT_INSETS.left + safeAreaInsets.left,
      right: DEFAULT_INSETS.right + safeAreaInsets.right,
    };

    const contentClassName = menuClassNames.content({
      isSubMenuOpen,
      className,
    });

    const { entering, exiting } = usePopupPopoverContentAnimation({
      placement,
      offset,
      animation,
    });

    const rContainerStyle = useMenuContentPopoverAnimation({
      isSubMenuOpen,
      animation,
    });

    return (
      <MenuContentContext value={{ placement }}>
        {isReady && (
          <AnimatedContent
            ref={ref}
            entering={entering}
            exiting={isSubMenuOpen ? FadeOut.duration(150) : exiting}
            placement={placement}
            align={align}
            avoidCollisions={avoidCollisions}
            offset={offset}
            alignOffset={alignOffset}
            insets={insets}
            className={contentClassName}
            style={[menuStyleSheet.borderCurve, rContainerStyle, style]}
            {...props}
          >
            {children}
            {isSubMenuOpen && (
              <Pressable
                className="absolute inset-0 z-40"
                onPress={() => {
                  if (openSubMenuId !== null) {
                    closeSubMenu(openSubMenuId);
                  }
                }}
              />
            )}
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
          style={[menuStyleSheet.borderCurve, style]}
          {...props}
        >
          {children}
        </AnimatedContent>
      </MenuContentContext>
    );
  }
);

// --------------------------------------------------

const MenuContentBottomSheet = forwardRef<
  BottomSheet,
  MenuContentBottomSheetProps
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
    const { isOpen, onOpenChange } = useMenu();

    const { progress, isDragging } = useMenuAnimation();

    const contentContainerClassName = menuClassNames.contentBottomSheet({
      className: contentContainerClassNameProp,
    });

    return (
      <BottomSheetContent
        ref={ref}
        index={initialIndex}
        backgroundClassName={backgroundClassName}
        handleIndicatorClassName={handleIndicatorClassName}
        contentContainerClassName={contentContainerClassName}
        contentContainerProps={contentContainerProps}
        animation={animation}
        animationConfigs={animationConfigs}
        backgroundStyle={[
          menuStyleSheet.borderCurve,
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

const MenuContent = forwardRef<
  MenuPrimitivesTypes.ContentRef | BottomSheet,
  MenuContentProps
>((props, ref) => {
  const { presentation: contextPresentation } = useMenu();

  if (__DEV__) {
    if (props.presentation !== contextPresentation) {
      throw new Error(
        `Menu.Content presentation prop ("${props.presentation}") does not match Menu.Root presentation prop ("${contextPresentation}"). They must be the same.`
      );
    }
  }

  if (props.presentation === 'bottom-sheet') {
    return (
      <MenuContentBottomSheet
        ref={ref as React.Ref<BottomSheet>}
        {...(props as MenuContentBottomSheetProps)}
      />
    );
  }

  return (
    <MenuContentPopover
      ref={ref as React.Ref<MenuPrimitivesTypes.ContentRef>}
      {...(props as MenuContentPopoverProps)}
    />
  );
});

// --------------------------------------------------

const MenuClose = forwardRef<PressableRef, MenuCloseProps>((props, ref) => {
  const { onPress: onPressProp, ...restProps } = props;
  const { onOpenChange } = useMenu();

  const onPress = (ev: GestureResponderEvent) => {
    onOpenChange(false);
    if (typeof onPressProp === 'function') {
      onPressProp(ev);
    }
  };

  return <CloseButton ref={ref} onPress={onPress} {...restProps} />;
});

// --------------------------------------------------

const MenuLabel = forwardRef<RNText, MenuLabelProps>(
  ({ className, children, ...props }, ref) => {
    const labelClassName = menuClassNames.label({ className });

    return (
      <MenuPrimitives.Label ref={ref} className={labelClassName} {...props}>
        {children}
      </MenuPrimitives.Label>
    );
  }
);

// --------------------------------------------------

const MenuGroup = forwardRef<MenuPrimitivesTypes.GroupRef, MenuGroupProps>(
  ({ className, children, ...props }, ref) => {
    const groupClassName = menuClassNames.group({ className });

    return (
      <MenuPrimitives.Group ref={ref} className={groupClassName} {...props}>
        {children}
      </MenuPrimitives.Group>
    );
  }
);

// --------------------------------------------------

const MenuItemComponent = forwardRef<
  MenuPrimitivesTypes.ItemRef,
  MenuItemProps
>(
  (
    {
      children,
      className,
      style,
      isDisabled = false,
      variant = 'default',
      animation,
      isAnimatedStyleActive = true,
      onPressIn,
      onPressOut,
      ...props
    },
    ref
  ) => {
    const { isSubMenuOpen } = useMenu();
    const subMenuContext = useSubMenu();
    const isInsideSubMenu = subMenuContext !== undefined;

    const isOutsideSubMenuOnOpen = isSubMenuOpen && !isInsideSubMenu;

    const { rItemStyle, isPressed, animationOnPressIn, animationOnPressOut } =
      useMenuItemAnimation({ animation, variant, isInsideSubMenu });

    const itemClassName = menuClassNames.item({
      isDisabled,
      isOutsideSubMenuOnOpen,
      className,
    });

    const isSelected = props.isSelected ?? false;

    const handlePressIn = (event: GestureResponderEvent) => {
      animationOnPressIn();
      onPressIn?.(event);
    };

    const handlePressOut = (event: GestureResponderEvent) => {
      animationOnPressOut();
      onPressOut?.(event);
    };

    const resolvedChildren =
      typeof children === 'function'
        ? children({
            isSelected,
            isDisabled,
            isPressed,
            variant,
          })
        : children;

    const stringifiedChildren =
      typeof children !== 'function' ? childrenToString(children) : null;

    const content = stringifiedChildren ? (
      <MenuItemTitle>{stringifiedChildren}</MenuItemTitle>
    ) : (
      resolvedChildren
    );

    const itemStyle = isAnimatedStyleActive
      ? [menuStyleSheet.borderCurve, rItemStyle, style]
      : [menuStyleSheet.borderCurve, style];

    return (
      <AnimatedItem
        ref={ref}
        className={itemClassName}
        style={itemStyle}
        isDisabled={isDisabled}
        variant={variant}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        {...props}
      >
        {content}
      </AnimatedItem>
    );
  }
);

// --------------------------------------------------

const MenuItemTitle = forwardRef<RNText, MenuItemTitleProps>(
  ({ className, children, ...props }, ref) => {
    const { variant } = useMenuItem();
    const itemTitleClassName = menuClassNames.itemTitle({ className, variant });

    return (
      <HeroText
        ref={ref}
        accessibilityRole="text"
        className={itemTitleClassName}
        {...props}
      >
        {children}
      </HeroText>
    );
  }
);

// --------------------------------------------------

const MenuItemDescription = forwardRef<RNText, MenuItemDescriptionProps>(
  ({ className, children, ...props }, ref) => {
    const itemDescriptionClassName = menuClassNames.itemDescription({
      className,
    });

    return (
      <HeroText
        ref={ref}
        accessibilityRole="summary"
        className={itemDescriptionClassName}
        {...props}
      >
        {children}
      </HeroText>
    );
  }
);

// --------------------------------------------------

const MenuItemIndicator = forwardRef<
  MenuPrimitivesTypes.ItemIndicatorRef,
  MenuItemIndicatorProps
>(
  (
    {
      className,
      children,
      variant = 'checkmark',
      iconProps,
      forceMount = true,
      ...props
    },
    ref
  ) => {
    const { isSelected } = useMenuItem();

    const themeColorMuted = useThemeColor('muted');

    const iconSize = iconProps?.size ?? (variant === 'dot' ? 8 : 16);
    const iconColor = iconProps?.color ?? themeColorMuted;

    const itemIndicatorClassName = menuClassNames.itemIndicator({ className });

    const defaultContent =
      variant === 'dot' ? (
        <View
          style={{
            width: iconSize,
            height: iconSize,
            borderRadius: iconSize / 2,
            backgroundColor: iconColor,
          }}
        />
      ) : (
        <CheckIcon size={iconSize} color={iconColor} />
      );

    return (
      <MenuPrimitives.ItemIndicator
        ref={ref}
        className={itemIndicatorClassName}
        forceMount={forceMount}
        {...props}
      >
        {isSelected && (children ?? defaultContent)}
      </MenuPrimitives.ItemIndicator>
    );
  }
);

// --------------------------------------------------

MenuRoot.displayName = DISPLAY_NAME.ROOT;
MenuTrigger.displayName = DISPLAY_NAME.TRIGGER;
MenuPortal.displayName = DISPLAY_NAME.PORTAL;
MenuOverlay.displayName = DISPLAY_NAME.OVERLAY;
MenuContent.displayName = DISPLAY_NAME.CONTENT;
MenuClose.displayName = DISPLAY_NAME.CLOSE;
MenuGroup.displayName = DISPLAY_NAME.GROUP;
MenuLabel.displayName = DISPLAY_NAME.LABEL;
MenuItemComponent.displayName = DISPLAY_NAME.ITEM;
MenuItemTitle.displayName = DISPLAY_NAME.ITEM_TITLE;
MenuItemDescription.displayName = DISPLAY_NAME.ITEM_DESCRIPTION;
MenuItemIndicator.displayName = DISPLAY_NAME.ITEM_INDICATOR;

/**
 * Compound Menu component with sub-components
 *
 * @component Menu - Main container that manages open/close state, positioning,
 * and provides context to child components.
 *
 * @component Menu.Trigger - Clickable element that toggles the menu visibility.
 *
 * @component Menu.Portal - Renders menu content in a portal layer above other content.
 *
 * @component Menu.Overlay - Optional background overlay to capture outside clicks.
 *
 * @component Menu.Content - Container for menu content with two presentation modes:
 * default floating popover with positioning and collision detection, or bottom sheet modal.
 *
 * @component Menu.Close - Close button for the menu.
 *
 * @component Menu.Group - Groups menu items with optional selection state (none, single, multiple).
 *
 * @component Menu.Label - Non-interactive section heading text within the menu.
 *
 * @component Menu.Item - Pressable menu item. Standalone or within a Group for selection.
 *
 * @component Menu.ItemTitle - Primary label text for a menu item.
 *
 * @component Menu.ItemDescription - Secondary description text for a menu item.
 *
 * @component Menu.ItemIndicator - Visual selection indicator (e.g. checkmark) for a menu item.
 */
const Menu = Object.assign(MenuRoot, {
  Trigger: MenuTrigger,
  Portal: MenuPortal,
  Overlay: MenuOverlay,
  Content: MenuContent,
  Close: MenuClose,
  Group: MenuGroup,
  Label: MenuLabel,
  Item: MenuItemComponent,
  ItemTitle: MenuItemTitle,
  ItemDescription: MenuItemDescription,
  ItemIndicator: MenuItemIndicator,
});

export { useMenu, useMenuAnimation, useMenuItem };
export default Menu;
