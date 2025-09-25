import { createContext, forwardRef, use, useMemo } from 'react';
import type { Text as RNText } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { Text } from '../../helpers/components/text';
import * as PopoverPrimitives from '../../primitives/popover';
import * as PopoverPrimitivesTypes from '../../primitives/popover/popover.types';
import { useTheme } from '../../providers/theme';
import { CloseIcon } from './close-icon';
import {
  DEFAULT_ALIGN_OFFSET,
  DEFAULT_OFFSET,
  DISPLAY_NAME,
} from './popover.constants';
import popoverStyles, { nativeStyles } from './popover.styles';
import type {
  PopoverCloseProps,
  PopoverContentProps,
  PopoverContextType,
  PopoverDescriptionProps,
  PopoverOverlayProps,
  PopoverPortalProps,
  PopoverRootProps,
  PopoverTitleProps,
  PopoverTriggerProps,
} from './popover.types';

const PopoverContext = createContext<PopoverContextType>({
  isOpen: false,
  onOpenChange: () => {},
  placement: 'bottom',
  align: 'center',
  avoidCollisions: true,
  offset: DEFAULT_OFFSET,
  alignOffset: DEFAULT_ALIGN_OFFSET,
});

// --------------------------------------------------

const PopoverRoot = forwardRef<
  PopoverPrimitivesTypes.RootRef,
  PopoverRootProps
>(
  (
    {
      children,
      isOpen,
      onOpenChange,
      placement = 'bottom',
      align = 'center',
      avoidCollisions = true,
      offset = DEFAULT_OFFSET,
      alignOffset = DEFAULT_ALIGN_OFFSET,
      ...props
    },
    ref
  ) => {
    const value = useMemo(() => {
      return {
        isOpen,
        onOpenChange,
        placement,
        align,
        avoidCollisions,
        offset,
        alignOffset,
      };
    }, [
      isOpen,
      onOpenChange,
      placement,
      align,
      avoidCollisions,
      offset,
      alignOffset,
    ]);

    return (
      <PopoverPrimitives.Root ref={ref} onOpenChange={onOpenChange} {...props}>
        <PopoverContext value={value}>{children}</PopoverContext>
      </PopoverPrimitives.Root>
    );
  }
);

// --------------------------------------------------

const PopoverTrigger = forwardRef<
  PopoverPrimitivesTypes.TriggerRef,
  PopoverTriggerProps
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
>(({ className, ...props }, ref) => {
  return <PopoverPrimitives.Trigger ref={ref} asChild {...props} />;
});

// --------------------------------------------------

const PopoverPortal = ({
  className,
  children,
  ...props
}: PopoverPortalProps) => {
  const tvStyles = popoverStyles.portal({ className });

  const contextValue = use(PopoverContext);

  return (
    <PopoverPrimitives.Portal {...props}>
      <PopoverContext value={contextValue}>
        <View className={tvStyles}>{children}</View>
      </PopoverContext>
    </PopoverPrimitives.Portal>
  );
};

// --------------------------------------------------

const PopoverOverlay = forwardRef<
  PopoverPrimitivesTypes.OverlayRef,
  PopoverOverlayProps
>(({ className, ...props }, ref) => {
  const tvStyles = popoverStyles.overlay({ className });

  return (
    <PopoverPrimitives.Overlay ref={ref} className={tvStyles} {...props} />
  );
});

// --------------------------------------------------

const PopoverContent = forwardRef<
  PopoverPrimitivesTypes.ContentRef,
  PopoverContentProps
>(({ className, children, style, ...props }, ref) => {
  const { placement, align, avoidCollisions, offset, alignOffset } =
    use(PopoverContext);

  const side =
    placement === 'top' || placement === 'bottom'
      ? placement
      : placement === 'left'
        ? 'top'
        : 'bottom';

  const tvStyles = popoverStyles.content({ className });

  const flatStyle = StyleSheet.flatten([nativeStyles.contentContainer, style]);

  return (
    <PopoverPrimitives.Content
      ref={ref}
      side={side as 'top' | 'bottom'}
      align={align}
      sideOffset={offset}
      alignOffset={alignOffset}
      avoidCollisions={avoidCollisions}
      className={tvStyles}
      style={flatStyle}
      {...props}
    >
      {children}
    </PopoverPrimitives.Content>
  );
});

// --------------------------------------------------

const PopoverClose = forwardRef<
  PopoverPrimitivesTypes.CloseRef,
  PopoverCloseProps
>(({ className, children, iconProps, hitSlop = 12, ...props }, ref) => {
  const { colors } = useTheme();
  const tvStyles = popoverStyles.close({ className });

  return (
    <PopoverPrimitives.Close
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
    </PopoverPrimitives.Close>
  );
});

// --------------------------------------------------

const PopoverTitle = forwardRef<RNText, PopoverTitleProps>(
  ({ className, children, ...props }, ref) => {
    const tvStyles = popoverStyles.title({ className });

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

const PopoverDescription = forwardRef<RNText, PopoverDescriptionProps>(
  ({ className, children, ...props }, ref) => {
    const tvStyles = popoverStyles.description({ className });

    return (
      <Text ref={ref} accessibilityRole="text" className={tvStyles} {...props}>
        {children}
      </Text>
    );
  }
);

// --------------------------------------------------

// Display names
PopoverRoot.displayName = DISPLAY_NAME.ROOT;
PopoverTrigger.displayName = DISPLAY_NAME.TRIGGER;
PopoverPortal.displayName = DISPLAY_NAME.PORTAL;
PopoverOverlay.displayName = DISPLAY_NAME.OVERLAY;
PopoverContent.displayName = DISPLAY_NAME.CONTENT;
PopoverClose.displayName = DISPLAY_NAME.CLOSE;
PopoverTitle.displayName = DISPLAY_NAME.TITLE;
PopoverDescription.displayName = DISPLAY_NAME.DESCRIPTION;

/**
 * Compound Popover component with sub-components
 *
 * @component Popover - Main container that manages open/close state, positioning,
 * and provides context to child components. Handles placement, alignment, and collision detection.
 *
 * @component Popover.Trigger - Clickable element that toggles the popover visibility.
 * Wraps any child element with press handlers.
 *
 * @component Popover.Portal - Renders popover content in a portal layer above other content.
 * Ensures proper stacking and positioning.
 *
 * @component Popover.Overlay - Optional background overlay. Can be transparent or
 * semi-transparent to capture outside clicks.
 *
 * @component Popover.Content - Container for popover content with positioning,
 * styling, and collision detection.
 *
 * @component Popover.Close - Close button that dismisses the popover when pressed.
 * Renders a default X icon if no children provided.
 *
 * @component Popover.Title - Optional title text with pre-styled typography.
 *
 * @component Popover.Description - Optional description text with muted styling.
 *
 * Props flow from Popover to sub-components via context (placement, align, offset, etc.).
 * The popover automatically positions itself relative to the trigger element.
 *
 * @see Full documentation: https://heroui.com/components/popover
 */
const Popover = Object.assign(PopoverRoot, {
  Trigger: PopoverTrigger,
  Portal: PopoverPortal,
  Overlay: PopoverOverlay,
  Content: PopoverContent,
  Close: PopoverClose,
  Title: PopoverTitle,
  Description: PopoverDescription,
});

export default Popover;
