import { forwardRef, useMemo } from 'react';
import { View, type ViewStyle } from 'react-native';
import { GestureDetector } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { CloseIcon } from '../../helpers/components/close-icon';
import { Text } from '../../helpers/components/text';
import { cn } from '../../helpers/theme';
import type { ViewRef } from '../../helpers/types';
import { createContext } from '../../helpers/utils';
import * as ToastPrimitive from '../../primitives/toast';
import type { ToastComponentProps } from '../../providers/toast';
import { Button } from '../button';
import { useToastRootAnimation } from './toast.animation';
import { DISPLAY_NAME } from './toast.constants';
import { useToastDuration } from './toast.hooks';
import toastStyles, { styleSheet } from './toast.styles';
import type {
  ToastActionProps,
  ToastCloseProps,
  ToastContextValue,
  ToastDescriptionProps,
  ToastLabelProps,
  ToastRootProps,
} from './toast.types';

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
    className,
    style,
    animation,
    duration = 4000,
    hide,
    isSwipable,
    ...restProps
  } = props;

  // Access id from props (id is omitted from ToastRootProps type but available at runtime)
  const toastProps = props as ToastRootProps & Pick<ToastComponentProps, 'id'>;
  const { id } = toastProps;

  // Handle automatic toast dismissal based on duration
  useToastDuration(duration, id, hide);

  const tvStyles = toastStyles.root({
    className,
  });

  const { rContainerStyle, entering, exiting, panGesture } =
    useToastRootAnimation({
      animation,
      style: style as ViewStyle | undefined,
      index,
      total,
      placement,
      hide,
      id,
      isSwipable,
    });

  const contextValue = useMemo(
    () => ({
      variant,
    }),
    [variant]
  );

  return (
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
          <AnimatedToastRoot
            ref={ref}
            className={tvStyles}
            style={[styleSheet.root, rContainerStyle, style]}
            {...restProps}
          >
            {children}
          </AnimatedToastRoot>
        </Animated.View>
      </GestureDetector>
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
