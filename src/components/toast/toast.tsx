import { forwardRef, useMemo } from 'react';
import { View } from 'react-native';
import Animated, {
  Easing,
  FadeInDown,
  interpolate,
  Keyframe,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { CloseIcon } from '../../helpers/components/close-icon';
import { Text } from '../../helpers/components/text';
import type { ViewRef } from '../../helpers/types';
import { createContext } from '../../helpers/utils';
import * as ToastPrimitive from '../../primitives/toast';
import { Button } from '../button';
import { DISPLAY_NAME } from './toast.constants';
import toastStyles, { styleSheet } from './toast.styles';
import type {
  ToastActionProps,
  ToastCloseProps,
  ToastContextValue,
  ToastDescriptionProps,
  ToastLabelProps,
  ToastRootProps,
} from './toast.types';

const exiting = new Keyframe({
  0: {
    opacity: 1,
    transform: [{ translateY: 0 }, { scale: 1 }],
  },
  100: {
    opacity: 0.5,
    transform: [{ translateY: 100 }, { scale: 0.97 }],
    easing: Easing.in(Easing.ease),
  },
});

const AnimatedToastRoot = Animated.createAnimatedComponent(ToastPrimitive.Root);

const [ToastProvider, useToast] = createContext<ToastContextValue>({
  name: 'ToastContext',
});

// --------------------------------------------------

const ToastRoot = forwardRef<ViewRef, ToastRootProps>((props, ref) => {
  const {
    children,
    variant = 'default',
    placement = 'top',
    index,
    total,
    height,
    className,
    style,
    ...restProps
  } = props;

  const tvStyles = toastStyles.root({
    placement,
    className,
  });

  const isLast = index === total - 1;

  const rContainerStyle = useAnimatedStyle(() => {
    const inputRange = [total - 1, total - 2];

    const opacity = interpolate(index, [total - 3, total - 4], [1, 0]);
    const translateY = interpolate(index, inputRange, [0, -10]);
    const scale = interpolate(index, inputRange, [1, 0.97]);

    return {
      pointerEvents: opacity === 0 ? 'none' : 'auto',
      opacity: withTiming(opacity, { duration: 300 }),
      transform: [
        {
          translateY: withTiming(translateY, { duration: 300 }),
        },
        {
          scale: withTiming(scale, { duration: 300 }),
        },
      ],
    };
  });

  const contextValue = useMemo(
    () => ({
      variant,
    }),
    [variant]
  );

  return (
    <ToastProvider value={contextValue}>
      <Animated.View
        className="absolute left-0 right-0 bottom-0"
        entering={FadeInDown.springify()
          .withInitialValues({
            opacity: 1,
            transform: [{ translateY: 100 }],
          })
          .mass(3)}
        exiting={exiting.duration(200)}
      >
        <AnimatedToastRoot
          ref={ref}
          className={tvStyles}
          style={[styleSheet.root, rContainerStyle, style]}
          onLayout={(event) => {
            if (isLast) {
              height.set(event.nativeEvent.layout.height);
            }
          }}
          {...restProps}
        >
          {children}
        </AnimatedToastRoot>
      </Animated.View>
    </ToastProvider>
  );
});

// --------------------------------------------------

const ToastLabel = forwardRef<View, ToastLabelProps>((props, ref) => {
  const { children, className, ...restProps } = props;

  const { variant } = useToast();

  const tvStyles = toastStyles.label({
    variant,
    className,
  });

  return (
    <Text ref={ref} className={tvStyles} {...restProps}>
      {children}
    </Text>
  );
});

// --------------------------------------------------

const ToastDescription = forwardRef<View, ToastDescriptionProps>(
  (props, ref) => {
    const { children, className, ...restProps } = props;

    const tvStyles = toastStyles.description({
      className,
    });

    return (
      <Text ref={ref} className={tvStyles} {...restProps}>
        {children}
      </Text>
    );
  }
);

// --------------------------------------------------

const ToastAction = forwardRef<View, ToastActionProps>((props, ref) => {
  const { children, variant, size = 'sm', className, ...restProps } = props;

  const { variant: toastVariant } = useToast();

  const buttonVariant = useMemo(() => {
    if (variant) return variant;

    switch (toastVariant) {
      case 'accent':
        return 'primary';
      case 'danger':
        return 'destructive';
      default:
        return 'tertiary';
    }
  }, [toastVariant, variant]);

  const tvStyles = toastStyles.action({
    variant: toastVariant,
    className,
  });

  return (
    <Button
      ref={ref}
      variant={buttonVariant}
      size={size}
      className={tvStyles}
      {...restProps}
    >
      {children}
    </Button>
  );
});

// --------------------------------------------------

const ToastClose = forwardRef<View, ToastCloseProps>((props, ref) => {
  const { children, iconProps, size = 'sm', className, ...restProps } = props;

  return (
    <Button
      ref={ref}
      variant="ghost"
      size={size}
      isIconOnly
      aria-label="Close"
      className={className}
      {...restProps}
    >
      {children ?? (
        <CloseIcon size={iconProps?.size ?? 16} color={iconProps?.color} />
      )}
    </Button>
  );
});

// --------------------------------------------------

ToastRoot.displayName = DISPLAY_NAME.TOAST_ROOT;
ToastLabel.displayName = DISPLAY_NAME.TOAST_LABEL;
ToastDescription.displayName = DISPLAY_NAME.TOAST_DESCRIPTION;
ToastAction.displayName = DISPLAY_NAME.TOAST_ACTION;
ToastClose.displayName = DISPLAY_NAME.TOAST_CLOSE;

/**
 * Compound Toast component with sub-components
 *
 * @component Toast - Main toast container that displays notification messages with various variants.
 *
 * @component Toast.Label - Title/heading text of the toast notification.
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
 * @see Full documentation: https://heroui.com/components/toast
 */
const CompoundToast = Object.assign(ToastRoot, {
  /** Toast label/title - renders text content */
  Label: ToastLabel,
  /** Toast description - renders descriptive text */
  Description: ToastDescription,
  /** Toast action button - renders action with appropriate variant */
  Action: ToastAction,
  /** Toast close button - renders icon-only close button */
  Close: ToastClose,
});

export default CompoundToast;
