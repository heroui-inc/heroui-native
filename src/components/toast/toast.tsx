import { forwardRef, useMemo } from 'react';
import { View } from 'react-native';
import { GestureDetector } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { useThemeColor } from '../../helpers/external/hooks';
import { cn } from '../../helpers/external/utils';
import { CloseIcon, HeroText } from '../../helpers/internal/components';
import { AnimationSettingsProvider } from '../../helpers/internal/contexts';
import type { ViewRef } from '../../helpers/internal/types';
import { createContext } from '../../helpers/internal/utils';
import * as ToastPrimitive from '../../primitives/toast';
import type { ToastComponentProps } from '../../providers/toast';
import { useToastConfig } from '../../providers/toast/toast-config.context';
import { Button } from '../button';
import { useToastRootAnimation } from './toast.animation';
import { DISPLAY_NAME } from './toast.constants';
import { useVerticalPlaceholderStyles } from './toast.hooks';
import { toastClassNames, toastStyleSheet } from './toast.styles';
import type {
  DefaultToastProps,
  ToastActionProps,
  ToastCloseProps,
  ToastContextValue,
  ToastDescriptionProps,
  ToastRootProps,
  ToastTitleProps,
} from './toast.types';

const AnimatedToastRoot = Animated.createAnimatedComponent(ToastPrimitive.Root);

const [ToastProvider, useToast] = createContext<ToastContextValue>({
  name: 'ToastContext',
});

// --------------------------------------------------

const ToastRoot = forwardRef<ViewRef, ToastRootProps>((props, ref) => {
  const globalConfig = useToastConfig();

  const {
    children,
    variant: localVariant,
    placement: localPlacement,
    index,
    total,
    heights,
    maxVisibleToasts,
    className,
    style,
    animation: localAnimation,
    isSwipeable: localIsSwipeable,
    isAnimatedStyleActive = true,
    hide,
    ...restProps
  } = props;

  /**
   * Merge global config with local props, ensuring local props take precedence
   */
  const variant = localVariant ?? globalConfig?.variant ?? 'default';
  const placement = localPlacement ?? globalConfig?.placement ?? 'top';
  const animation = localAnimation ?? globalConfig?.animation;
  const isSwipeable = localIsSwipeable ?? globalConfig?.isSwipeable;

  // Access id from props (id is omitted from ToastRootProps type but available at runtime)
  const toastProps = props as ToastRootProps & Pick<ToastComponentProps, 'id'>;
  const { id } = toastProps;

  const rootClassName = toastClassNames.root({
    className,
  });

  // Extract padding and backgroundColor for placeholder Views
  const { topStyle, bottomStyle } = useVerticalPlaceholderStyles({
    rootClassName,
    style,
  });

  const {
    rContainerStyle,
    entering,
    exiting,
    panGesture,
    isAllAnimationsDisabled,
  } = useToastRootAnimation({
    animation,
    index,
    total,
    heights,
    placement,
    hide,
    id,
    isSwipeable,
    maxVisibleToasts,
  });

  const rootStyle = isAnimatedStyleActive
    ? [toastStyleSheet.root, rContainerStyle, style]
    : [toastStyleSheet.root, style];

  const animationSettingsContextValue = useMemo(
    () => ({
      isAllAnimationsDisabled,
    }),
    [isAllAnimationsDisabled]
  );

  const contextValue = useMemo(
    () => ({
      variant,
      hide,
      id,
    }),
    [variant, hide, id]
  );

  return (
    <AnimationSettingsProvider value={animationSettingsContextValue}>
      <ToastProvider value={contextValue}>
        <GestureDetector gesture={panGesture}>
          <Animated.View
            className={cn(
              'absolute left-0 right-0',
              placement === 'top' ? 'top-0' : 'bottom-0'
            )}
            entering={entering}
            exiting={exiting}
          >
            {/* Animated toast instance */}
            <AnimatedToastRoot
              ref={ref}
              className={rootClassName}
              style={rootStyle}
              {...restProps}
            >
              {children}
              {/* 
                When visible toasts have different heights, the toast adapts to the last visible toast height.
                In cases where a toast originally has one height and gets smaller when a new toast comes to stack,
                content might be visible behind the last toast without proper padding.
                The placeholder Views ensure that the content under active toast is hidden.
              */}
              <View
                className="absolute left-0 right-0 top-0"
                style={topStyle}
              />
              <View
                className="absolute left-0 right-0 bottom-0"
                style={bottomStyle}
              />
            </AnimatedToastRoot>
            {/* Hidden toast instance for height measurement */}
            <AnimatedToastRoot
              pointerEvents="none"
              className={cn(rootClassName, 'absolute opacity-0')}
              style={[toastStyleSheet.root, style]}
              onLayout={(event) => {
                const measuredHeight = event.nativeEvent.layout.height;
                heights.modify((value) => {
                  'worklet';
                  return { ...value, [id]: measuredHeight };
                });
              }}
              {...restProps}
            >
              {children}
            </AnimatedToastRoot>
          </Animated.View>
        </GestureDetector>
      </ToastProvider>
    </AnimationSettingsProvider>
  );
});

// --------------------------------------------------

const ToastTitle = forwardRef<View, ToastTitleProps>((props, ref) => {
  const { children, className, ...restProps } = props;

  const { variant } = useToast();

  const labelClassName = toastClassNames.label({
    variant,
    className,
  });

  return (
    <HeroText ref={ref} className={labelClassName} {...restProps}>
      {children}
    </HeroText>
  );
});

// --------------------------------------------------

const ToastDescription = forwardRef<View, ToastDescriptionProps>(
  (props, ref) => {
    const { children, className, ...restProps } = props;

    const descriptionClassName = toastClassNames.description({
      className,
    });

    return (
      <HeroText ref={ref} className={descriptionClassName} {...restProps}>
        {children}
      </HeroText>
    );
  }
);

// --------------------------------------------------

const ToastAction = forwardRef<View, ToastActionProps>((props, ref) => {
  const {
    children,
    variant,
    size = 'sm',
    animation,
    className,
    ...restProps
  } = props;

  const { variant: toastVariant } = useToast();

  const actionClassName = toastClassNames.action({
    variant: toastVariant,
    className,
  });

  const [
    themeColorDefaultHover,
    themeColorAccentHover,
    themeColorSuccessHover,
    themeColorWarningHover,
    themeColorDangerHover,
  ] = useThemeColor([
    'default-hover',
    'accent-hover',
    'success-hover',
    'warning-hover',
    'danger-hover',
  ]);

  const highlightColorMap = useMemo(() => {
    switch (toastVariant) {
      case 'default':
        return themeColorDefaultHover;
      case 'accent':
        return themeColorAccentHover;
      case 'success':
        return themeColorSuccessHover;
      case 'warning':
        return themeColorWarningHover;
      case 'danger':
        return themeColorDangerHover;
    }
  }, [
    toastVariant,
    themeColorDefaultHover,
    themeColorAccentHover,
    themeColorSuccessHover,
    themeColorWarningHover,
    themeColorDangerHover,
  ]);

  const buttonVariant = useMemo(() => {
    if (variant) return variant;

    switch (toastVariant) {
      case 'accent':
        return 'primary';
      case 'danger':
        return 'danger';
      default:
        return 'tertiary';
    }
  }, [toastVariant, variant]);

  const defaultHighlightConfig = useMemo(
    () => ({
      backgroundColor: { value: highlightColorMap },
      opacity: { value: [0, 1] as [number, number] },
    }),
    [highlightColorMap]
  );

  const resolvedAnimation =
    typeof animation === 'object' && animation !== null ? animation : undefined;

  const mergedAnimation = useMemo<ToastActionProps['animation']>(() => {
    if (
      animation === false ||
      animation === 'disabled' ||
      animation === 'disable-all'
    ) {
      return animation;
    }

    return {
      scale: false,
      ...resolvedAnimation,
      highlight: resolvedAnimation?.highlight ?? defaultHighlightConfig,
    };
  }, [animation, resolvedAnimation, defaultHighlightConfig]);

  return (
    <Button
      ref={ref}
      variant={buttonVariant}
      size={size}
      className={actionClassName}
      feedbackVariant="scale-highlight"
      animation={mergedAnimation}
      {...restProps}
    >
      {children}
    </Button>
  );
});

// --------------------------------------------------

const ToastClose = forwardRef<View, ToastCloseProps>((props, ref) => {
  const {
    children,
    iconProps,
    size = 'sm',
    className,
    onPress,
    ...restProps
  } = props;
  const { hide, id } = useToast();

  const themeColorMuted = useThemeColor('muted');

  /**
   * Handle close button press
   * If hide and id are available from context, use them to hide the toast
   * Otherwise, use the provided onPress handler
   */
  const handlePress = (event: any) => {
    if (hide && id) {
      hide(id);
    }
    if (onPress && typeof onPress === 'function') {
      onPress(event);
    }
  };

  return (
    <Button
      ref={ref}
      variant="ghost"
      size={size}
      isIconOnly
      aria-label="Close"
      className={className}
      onPress={handlePress}
      {...restProps}
    >
      {children ?? (
        <CloseIcon
          size={iconProps?.size ?? 16}
          color={iconProps?.color ?? themeColorMuted}
        />
      )}
    </Button>
  );
});

// --------------------------------------------------

/**
 * Default styled toast component for simplified toast.show() API
 * Used internally when showing toasts with string or config object (without component)
 */
export function DefaultToast(props: DefaultToastProps) {
  const globalConfig = useToastConfig();

  const {
    id,
    variant: localVariant,
    placement: localPlacement,
    isSwipeable: localIsSwipeable,
    animation: localAnimation,
    label,
    description,
    actionLabel,
    onActionPress,
    icon,
    hide,
    show,
    ...toastComponentProps
  } = props;

  /**
   * Merge global config with local props, ensuring local props take precedence
   */
  const variant = localVariant ?? globalConfig?.variant ?? 'default';
  const placement = localPlacement ?? globalConfig?.placement ?? 'top';
  const isSwipeable = localIsSwipeable ?? globalConfig?.isSwipeable;
  const animation = localAnimation ?? globalConfig?.animation;

  const handleActionPress = () => {
    if (onActionPress) {
      onActionPress({ show, hide });
    }
  };

  return (
    <ToastRoot
      id={id}
      variant={variant}
      placement={placement}
      isSwipeable={isSwipeable}
      animation={animation}
      className="flex-row gap-3"
      hide={hide}
      show={show}
      {...toastComponentProps}
    >
      {icon && <View>{icon}</View>}
      <View className="flex-1">
        {label && <ToastTitle>{label}</ToastTitle>}
        {description && <ToastDescription>{description}</ToastDescription>}
      </View>
      {actionLabel && (
        <ToastAction onPress={handleActionPress}>{actionLabel}</ToastAction>
      )}
    </ToastRoot>
  );
}

// --------------------------------------------------

ToastRoot.displayName = DISPLAY_NAME.TOAST_ROOT;
ToastTitle.displayName = DISPLAY_NAME.TOAST_TITLE;
ToastDescription.displayName = DISPLAY_NAME.TOAST_DESCRIPTION;
ToastAction.displayName = DISPLAY_NAME.TOAST_ACTION;
ToastClose.displayName = DISPLAY_NAME.TOAST_CLOSE;

/**
 * Compound Toast component with sub-components
 *
 * @component Toast - Main toast container that displays notification messages with various variants.
 *
 * @component Toast.Title - Title/heading text of the toast notification.
 *
 * @component Toast.Description - Descriptive text content of the toast.
 *
 * @component Toast.Action - Action button within the toast. Variant is automatically determined
 * based on toast variant but can be overridden.
 *
 * @component Toast.Close - Close button for dismissing the toast. Renders as an icon-only button.
 *
 * Props flow from Toast to sub-components via context (variant).
 *
 * @see Full documentation: https://heroui.com/docs/native/components/toast
 */
const CompoundToast = Object.assign(ToastRoot, {
  /** Toast title - renders text content */
  Title: ToastTitle,
  /** Toast description - renders descriptive text */
  Description: ToastDescription,
  /** Toast action button - renders action with appropriate variant */
  Action: ToastAction,
  /** Toast close button - renders icon-only close button */
  Close: ToastClose,
});

export default CompoundToast;
