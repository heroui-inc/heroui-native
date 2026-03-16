import {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type FC,
  type PropsWithChildren,
} from 'react';
import type { LayoutChangeEvent, StyleProp, ViewStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { useThemeColor } from '../../helpers/external/hooks';
import { ChevronRightIcon } from '../../helpers/internal/components';
import {
  AnimationSettingsProvider,
  useAnimationSettings,
} from '../../helpers/internal/contexts';
import type { ViewRef } from '../../helpers/internal/types';
import { useRootContext as useMenu } from '../../primitives/menu';
import * as SubMenuPrimitives from '../../primitives/sub-menu';
import type * as SubMenuPrimitivesTypes from '../../primitives/sub-menu/sub-menu.types';
import {
  SubMenuAnimationProvider,
  useRootContentContainerAnimation,
  useSubMenuAnimation,
  useSubMenuRootAnimation,
  useSubMenuTriggerIndicatorAnimation,
} from './sub-menu.animation';
import {
  DEFAULT_INDICATOR_ICON_SIZE,
  DISPLAY_NAME,
} from './sub-menu.constants';
import { subMenuClassNames, subMenuStyleSheet } from './sub-menu.styles';
import type {
  SubMenuContentProps,
  SubMenuRootAnimation,
  SubMenuRootProps,
  SubMenuTriggerIndicatorProps,
  SubMenuTriggerProps,
} from './sub-menu.types';

// --------------------------------------------------

const AnimatedContent = Animated.createAnimatedComponent(
  SubMenuPrimitives.Content
);

const useSubMenu = SubMenuPrimitives.useSubMenuContext;

// --------------------------------------------------

const SubMenuRoot = forwardRef<
  SubMenuPrimitivesTypes.RootRef,
  SubMenuRootProps
>(
  (
    {
      children,
      isOpen: isOpenProp,
      isDefaultOpen,
      animation,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const { presentation } = useMenu();

    if (__DEV__) {
      if (presentation === 'bottom-sheet') {
        throw new Error(
          'SubMenu cannot be used inside a Menu with presentation="bottom-sheet". Use presentation="popover" instead.'
        );
      }
    }

    const animationSettingsContext = useAnimationSettings();
    const {
      isAllAnimationsDisabled,
      triggerHeight,
      contentHeight,
      contentPaddingTop,
    } = useSubMenuRootAnimation({ animation });

    const animationContextValue = useMemo(
      () => ({ triggerHeight, contentHeight, contentPaddingTop }),
      [triggerHeight, contentHeight, contentPaddingTop]
    );

    return (
      <AnimationSettingsProvider
        value={{
          ...animationSettingsContext,
          isAllAnimationsDisabled,
        }}
      >
        <SubMenuAnimationProvider value={animationContextValue}>
          <SubMenuPrimitives.Root
            ref={ref}
            isOpen={isOpenProp}
            isDefaultOpen={isDefaultOpen}
            {...props}
          >
            <RootContentContainer
              animation={animation}
              className={className}
              style={style}
            >
              {children}
            </RootContentContainer>
          </SubMenuPrimitives.Root>
        </SubMenuAnimationProvider>
      </AnimationSettingsProvider>
    );
  }
);

// --------------------------------------------------

const RootContentContainer: FC<
  PropsWithChildren<{
    animation?: SubMenuRootAnimation;
    className?: string;
    style?: StyleProp<ViewStyle>;
  }>
> = ({ children, animation, className }) => {
  const [isMounted, setIsMounted] = useState(false);
  const { isOpen, onOpenChange, nativeID } = useSubMenu();
  const { openSubMenuId, openSubMenu, closeSubMenu } = useMenu();
  const { rOuterContainerStyle, rInnerContentStyle } =
    useRootContentContainerAnimation({ animation });

  const rootClassName = subMenuClassNames.root({ isOpen, className });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  /** Register / unregister this sub-menu with the parent Menu context. */
  useEffect(() => {
    if (isOpen) {
      openSubMenu(nativeID);
    } else {
      closeSubMenu(nativeID);
    }
    return () => {
      closeSubMenu(nativeID);
    };
  }, [isOpen, nativeID, openSubMenu, closeSubMenu]);

  /** Close this sub-menu when it's no longer the active one (e.g. backdrop press). */
  useEffect(() => {
    if (openSubMenuId !== nativeID && isOpen) {
      onOpenChange(false);
    }
    // Only react to openSubMenuId changes (not isOpen) to avoid
    // a race condition where isOpen=true fires before registration sets the ID.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openSubMenuId]);

  return (
    <Animated.View
      className={isOpen ? 'z-50' : 'z-40'}
      style={rOuterContainerStyle}
    >
      {isMounted ? (
        <Animated.View className={rootClassName} style={rInnerContentStyle}>
          {children}
        </Animated.View>
      ) : (
        children
      )}
    </Animated.View>
  );
};

// --------------------------------------------------

const SubMenuTrigger = forwardRef<
  SubMenuPrimitivesTypes.TriggerRef,
  SubMenuTriggerProps
>(
  (
    {
      children,
      className,
      style,
      onLayout: onLayoutProp,
      isDisabled = false,
      ...props
    },
    ref
  ) => {
    const { triggerHeight } = useSubMenuAnimation();
    const { openSubMenuId } = useMenu();
    const subMenuContext = useSubMenu();

    const isOtherSubMenuOpen =
      openSubMenuId !== null && openSubMenuId !== subMenuContext.nativeID;

    const triggerClassName = subMenuClassNames.trigger({
      className,
      isDisabled,
      isOtherSubMenuOpen,
    });

    const handleLayout = useCallback(
      (event: LayoutChangeEvent) => {
        triggerHeight.value = event.nativeEvent.layout.height;
        onLayoutProp?.(event);
      },
      [triggerHeight, onLayoutProp]
    );

    return (
      <SubMenuPrimitives.Trigger
        ref={ref}
        className={triggerClassName}
        style={
          typeof style === 'function'
            ? (state) => [subMenuStyleSheet.borderCurve, style(state)]
            : [subMenuStyleSheet.borderCurve, style]
        }
        isDisabled={isDisabled || isOtherSubMenuOpen}
        onLayout={handleLayout}
        {...props}
      >
        {children}
      </SubMenuPrimitives.Trigger>
    );
  }
);

// --------------------------------------------------

const SubMenuTriggerIndicator = forwardRef<
  ViewRef,
  SubMenuTriggerIndicatorProps
>(
  (
    {
      children,
      className,
      iconProps,
      animation,
      isAnimatedStyleActive = true,
      style,
      ...restProps
    },
    ref
  ) => {
    const { isOpen } = useSubMenu();

    const themeColorMuted = useThemeColor('muted');

    const indicatorClassName = subMenuClassNames.triggerIndicator({
      className,
    });

    const { rContainerStyle } = useSubMenuTriggerIndicatorAnimation({
      animation,
      isOpen,
    });

    const indicatorStyle = isAnimatedStyleActive
      ? [rContainerStyle, style]
      : style;

    if (children) {
      return (
        <Animated.View
          ref={ref}
          className={indicatorClassName}
          style={style}
          {...restProps}
        >
          {children}
        </Animated.View>
      );
    }

    return (
      <Animated.View
        ref={ref}
        className={indicatorClassName}
        style={indicatorStyle}
        {...restProps}
      >
        <ChevronRightIcon
          size={iconProps?.size ?? DEFAULT_INDICATOR_ICON_SIZE}
          color={iconProps?.color ?? themeColorMuted}
        />
      </Animated.View>
    );
  }
);

// --------------------------------------------------

const SubMenuContent = forwardRef<
  SubMenuPrimitivesTypes.ContentRef,
  SubMenuContentProps
>(({ children, className, style, onLayout: onLayoutProp, ...props }, ref) => {
  const { isOpen } = useSubMenu();

  const contentClassName = subMenuClassNames.content({ className });

  const { triggerHeight, contentHeight, contentPaddingTop } =
    useSubMenuAnimation();

  const rContainerStyle = useAnimatedStyle(() => ({
    top: triggerHeight.get() + contentPaddingTop.get(),
    opacity: withTiming(isOpen ? 1 : 0, { duration: 150 }),
  }));

  const handleLayout = useCallback(
    (event: LayoutChangeEvent) => {
      contentHeight.value = event.nativeEvent.layout.height;
      onLayoutProp?.(event);
    },
    [contentHeight, onLayoutProp]
  );

  return (
    <AnimatedContent
      ref={ref}
      className={contentClassName}
      style={
        typeof style === 'function'
          ? (state) => [rContainerStyle, style(state)]
          : [rContainerStyle, style]
      }
      pointerEvents={isOpen ? 'auto' : 'none'}
      onLayout={handleLayout}
      forceMount
      {...props}
    >
      {children}
    </AnimatedContent>
  );
});

// --------------------------------------------------

SubMenuRoot.displayName = DISPLAY_NAME.ROOT;
SubMenuTrigger.displayName = DISPLAY_NAME.TRIGGER;
SubMenuTriggerIndicator.displayName = DISPLAY_NAME.TRIGGER_INDICATOR;
SubMenuContent.displayName = DISPLAY_NAME.CONTENT;

// --------------------------------------------------

/**
 * Compound SubMenu component with sub-components.
 *
 * @component SubMenu - Root container that manages open/close state and
 * provides animation settings context to children.
 *
 * @component SubMenu.Trigger - Pressable item that toggles the submenu,
 * styled like a menu item.
 *
 * @component SubMenu.TriggerIndicator - Animated indicator (default: chevron-right)
 * that rotates when the submenu opens/closes. Place inside SubMenu.Trigger.
 *
 * @component SubMenu.Content - Absolutely positioned content that animates
 * its height when the submenu opens/closes.
 */
const SubMenu = Object.assign(SubMenuRoot, {
  Trigger: SubMenuTrigger,
  TriggerIndicator: SubMenuTriggerIndicator,
  Content: SubMenuContent,
});

export { useSubMenu, useSubMenuAnimation };
export default SubMenu;
