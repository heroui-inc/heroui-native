import { forwardRef } from 'react';
import { View } from 'react-native';
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

// --------------------------------------------------

const DialogRoot = forwardRef<DialogPrimitivesTypes.RootRef, DialogRootProps>(
  (props, ref) => {
    return <DialogPrimitives.Root ref={ref} {...props} />;
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

const DialogPortal = ({ className, children, ...props }: DialogPortalProps) => {
  const tvStyles = dialogStyles.portal({ className });

  return (
    <DialogPrimitives.Portal {...props}>
      <View className={tvStyles}>{children}</View>
    </DialogPrimitives.Portal>
  );
};

// --------------------------------------------------

const DialogOverlay = forwardRef<
  DialogPrimitivesTypes.OverlayRef,
  DialogOverlayProps
>(({ className, ...props }, ref) => {
  const tvStyles = dialogStyles.overlay({ className });

  return <DialogPrimitives.Overlay ref={ref} className={tvStyles} {...props} />;
});

// --------------------------------------------------

const DialogContent = forwardRef<
  DialogPrimitivesTypes.ContentRef,
  DialogContentProps
>(({ className, style, children, ...props }, ref) => {
  const tvStyles = dialogStyles.content({ className });

  return (
    <DialogPrimitives.Content
      ref={ref}
      className={tvStyles}
      style={[nativeStyles.contentContainer, style]}
      {...props}
    >
      {children}
    </DialogPrimitives.Content>
  );
});

// --------------------------------------------------

const DialogClose = forwardRef<
  DialogPrimitivesTypes.CloseRef,
  DialogCloseProps
>(({ className, iconProps, children, ...props }, ref) => {
  const { colors } = useTheme();
  const tvStyles = dialogStyles.close({ className });

  return (
    <DialogPrimitives.Close
      ref={ref}
      className={tvStyles}
      hitSlop={12}
      {...props}
    >
      {children || (
        <CloseIcon
          size={iconProps?.size ?? 18}
          color={iconProps?.color ?? colors.foreground}
        />
      )}
    </DialogPrimitives.Close>
  );
});

// --------------------------------------------------

const DialogTitle = forwardRef<
  DialogPrimitivesTypes.TitleRef,
  DialogTitleProps
>(({ className, ...props }, ref) => {
  const tvStyles = dialogStyles.title({ className });

  return <DialogPrimitives.Title ref={ref} className={tvStyles} {...props} />;
});

// --------------------------------------------------

const DialogDescription = forwardRef<
  DialogPrimitivesTypes.DescriptionRef,
  DialogDescriptionProps
>(({ className, ...props }, ref) => {
  const tvStyles = dialogStyles.description({ className });

  return (
    <DialogPrimitives.Description ref={ref} className={tvStyles} {...props} />
  );
});

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

export default Dialog;
