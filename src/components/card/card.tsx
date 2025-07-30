import { Surface } from '@/components/surface';
import type { TextRef, ViewRef } from '@/helpers/types/primitives';
import { Text as SlotText, View as SlotView } from '@/primitives/slot';
import { forwardRef } from 'react';
import { Text, View } from 'react-native';
import { DISPLAY_NAME } from './card.constants';
import cardStyles from './card.styles';
import type {
  CardBodyProps,
  CardDescriptionProps,
  CardDetailsProps,
  CardFooterProps,
  CardHeaderProps,
  CardRootProps,
  CardTitleProps,
} from './card.types';

// --------------------------------------------------

const CardRoot = forwardRef<ViewRef, CardRootProps>((props, ref) => {
  const { children, surfaceVariant = '1', className, ...restProps } = props;

  const tvStyles = cardStyles.root({ className });

  return (
    <Surface
      ref={ref}
      variant={surfaceVariant}
      className={tvStyles}
      {...restProps}
    >
      {children}
    </Surface>
  );
});

// --------------------------------------------------

const CardDetails = forwardRef<ViewRef, CardDetailsProps>((props, ref) => {
  const { children, className, asChild, ...restProps } = props;

  const tvStyles = cardStyles.details({ className });

  const Component = asChild ? SlotView : View;

  return (
    <Component ref={ref} className={tvStyles} {...restProps}>
      {children}
    </Component>
  );
});

// --------------------------------------------------

const CardHeader = forwardRef<ViewRef, CardHeaderProps>((props, ref) => {
  const { children, className, asChild, ...restProps } = props;

  const tvStyles = cardStyles.header({ className });

  const Component = asChild ? SlotView : View;

  return (
    <Component ref={ref} className={tvStyles} {...restProps}>
      {children}
    </Component>
  );
});

// --------------------------------------------------

const CardBody = forwardRef<ViewRef, CardBodyProps>((props, ref) => {
  const { children, className, asChild, ...restProps } = props;

  const tvStyles = cardStyles.body({ className });

  const Component = asChild ? SlotView : View;

  return (
    <Component ref={ref} className={tvStyles} {...restProps}>
      {children}
    </Component>
  );
});

// --------------------------------------------------

const CardFooter = forwardRef<ViewRef, CardFooterProps>((props, ref) => {
  const { children, className, asChild, ...restProps } = props;

  const tvStyles = cardStyles.footer({ className });

  const Component = asChild ? SlotView : View;

  return (
    <Component ref={ref} className={tvStyles} {...restProps}>
      {children}
    </Component>
  );
});

// --------------------------------------------------

const CardTitle = forwardRef<TextRef, CardTitleProps>((props, ref) => {
  const { children, className, asChild, ...restProps } = props;

  const tvStyles = cardStyles.title({ className });

  const Component = asChild ? SlotText : Text;

  return (
    <Component ref={ref} className={tvStyles} {...restProps}>
      {children}
    </Component>
  );
});

// --------------------------------------------------

const CardDescription = forwardRef<TextRef, CardDescriptionProps>(
  (props, ref) => {
    const { children, className, asChild, ...restProps } = props;

    const tvStyles = cardStyles.description({ className });

    const Component = asChild ? SlotText : Text;

    return (
      <Component ref={ref} className={tvStyles} {...restProps}>
        {children}
      </Component>
    );
  }
);

// --------------------------------------------------

CardRoot.displayName = DISPLAY_NAME.ROOT;
CardDetails.displayName = DISPLAY_NAME.DETAILS;
CardHeader.displayName = DISPLAY_NAME.HEADER;
CardBody.displayName = DISPLAY_NAME.BODY;
CardFooter.displayName = DISPLAY_NAME.FOOTER;
CardTitle.displayName = DISPLAY_NAME.TITLE;
CardDescription.displayName = DISPLAY_NAME.DESCRIPTION;

/**
 * Compound Card component with sub-components
 *
 * @component Card - Main container that extends Surface component. Provides base card structure
 * with configurable surface variants and handles overall layout.
 *
 * @component Card.Details - Content wrapper that applies gap-3 spacing between children.
 * Use when you need proper layout for vertical cards with images.
 *
 * @component Card.Header - Header section for top-aligned content like icons or badges.
 *
 * @component Card.Body - Main content area with flex-1 that expands to fill all available space
 * between Card.Header and Card.Footer.
 *
 * @component Card.Title - Title text with foreground color and medium font weight.
 *
 * @component Card.Description - Description text with muted color and smaller font size.
 *
 * @component Card.Footer - Footer section for bottom-aligned actions like buttons.
 *
 * All sub-components support asChild pattern for custom element composition.
 *
 * @see Full documentation: https://heroui.com/components/card
 */
export const Card = Object.assign(CardRoot, {
  /** @optional Content wrapper with gap spacing for proper layout */
  Details: CardDetails,
  /** @optional Top-aligned header section */
  Header: CardHeader,
  /** @optional Main content area that expands between header and footer */
  Body: CardBody,
  /** @optional Bottom-aligned footer for actions */
  Footer: CardFooter,
  /** @optional Title text with styled typography */
  Title: CardTitle,
  /** @optional Description text with muted styling */
  Description: CardDescription,
});
