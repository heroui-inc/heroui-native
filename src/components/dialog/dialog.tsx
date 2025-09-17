import { forwardRef } from 'react';
import { View } from 'react-native';
import * as DialogPrimitives from '../../primitives/dialog';
import * as DialogPrimitivesTypes from '../../primitives/dialog/dialog.types';
import { useTheme } from '../../providers/theme';
import { CloseIcon } from './close-icon';
import { DISPLAY_NAME } from './dialog.constants';
import dialogStyles, { nativeStyles } from './dialog.styles';
import type {
  DialogBodyProps,
  DialogContentProps,
  DialogDescriptionProps,
  DialogFooterProps,
  DialogHeaderProps,
  DialogProps,
  DialogTitleProps,
  DialogTriggerProps,
} from './dialog.types';

// --------------------------------------------------

const DialogRoot = forwardRef<DialogPrimitivesTypes.RootRef, DialogProps>(
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

const DialogContent = forwardRef<
  DialogPrimitivesTypes.ContentRef,
  DialogContentProps
>(
  (
    {
      className,
      classNames,
      style,
      portalHost,
      children,
      isCloseVisible = true,
      iconProps,
      ...props
    },
    ref
  ) => {
    const { colors } = useTheme();

    const { container, content, closeButton } = dialogStyles.content();

    const containerStyles = container({
      className: classNames?.container,
    });

    const contentStyles = content({
      className: [className, classNames?.content],
    });

    const closeButtonStyles = closeButton({
      className: classNames?.closeButton,
    });

    return (
      <DialogPrimitives.Portal hostName={portalHost}>
        <DialogPrimitives.Overlay className={containerStyles}>
          <DialogPrimitives.Content
            ref={ref}
            className={contentStyles}
            style={[nativeStyles.contentContainer, style]}
            {...props}
          >
            {isCloseVisible && (
              <DialogPrimitives.Close
                className={closeButtonStyles}
                hitSlop={12}
              >
                <CloseIcon
                  size={iconProps?.size ?? 18}
                  color={iconProps?.color ?? colors.foreground}
                />
              </DialogPrimitives.Close>
            )}
            {children}
          </DialogPrimitives.Content>
        </DialogPrimitives.Overlay>
      </DialogPrimitives.Portal>
    );
  }
);

// --------------------------------------------------

const DialogHeader = forwardRef<View, DialogHeaderProps>(
  ({ className, ...props }, ref) => {
    const tvStyles = dialogStyles.header({ className });

    return <View ref={ref} className={tvStyles} {...props} />;
  }
);

// --------------------------------------------------

const DialogBody = forwardRef<View, DialogBodyProps>(
  ({ className, ...props }, ref) => {
    const tvStyles = dialogStyles.body({ className });
    return <View ref={ref} className={tvStyles} {...props} />;
  }
);

// --------------------------------------------------

const DialogFooter = forwardRef<View, DialogFooterProps>(
  ({ className, ...props }, ref) => {
    const tvStyles = dialogStyles.footer({ className });

    return <View ref={ref} className={tvStyles} {...props} />;
  }
);

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
DialogContent.displayName = DISPLAY_NAME.CONTENT;
DialogHeader.displayName = DISPLAY_NAME.HEADER;
DialogBody.displayName = DISPLAY_NAME.BODY;
DialogFooter.displayName = DISPLAY_NAME.FOOTER;
DialogTitle.displayName = DISPLAY_NAME.TITLE;
DialogDescription.displayName = DISPLAY_NAME.DESCRIPTION;

/**
 * Compound Dialog component with sub-components
 *
 * @component Dialog - Main container that manages open/close state.
 * Provides the dialog context to child components.
 *
 * @component Dialog.Trigger - Button or element that opens the dialog.
 * Accepts any pressable element as children.
 *
 * @component Dialog.Content - The dialog modal content container.
 * Renders in a portal with overlay and handles close button visibility.
 *
 * @component Dialog.Header - Optional header section for title and description.
 * Use for grouping Dialog.Title and Dialog.Description.
 *
 * @component Dialog.Body - Optional body section for main content.
 * Use for the main dialog content area.
 *
 * @component Dialog.Footer - Optional footer section for actions.
 * Use for action buttons like Cancel/Confirm.
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
  /** @optional Main dialog content container with overlay */
  Content: DialogContent,
  /** @optional Header section for title and description */
  Header: DialogHeader,
  /** @optional Body section for main content */
  Body: DialogBody,
  /** @optional Footer section for action buttons */
  Footer: DialogFooter,
  /** @optional Dialog title text */
  Title: DialogTitle,
  /** @optional Dialog description text */
  Description: DialogDescription,
});

export default Dialog;
