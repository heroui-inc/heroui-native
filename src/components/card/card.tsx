import { forwardRef } from 'react';
import { View } from 'react-native';
import { Text } from '../../helpers/components';
import type { TextRef, ViewRef } from '../../helpers/types/primitives';
import { Surface } from '../surface';
import { DISPLAY_NAME } from './card.constants';
import cardStyles from './card.styles';
import type {
  CardBodyProps,
  CardDescriptionProps,
  CardFooterProps,
  CardHeaderProps,
  CardRootProps,
  CardTitleProps,
} from './card.types';

// --------------------------------------------------

const CardRoot = forwardRef<ViewRef, CardRootProps>((props, ref) => {
  const { children, variant = 'default', className, ...restProps } = props;

  const tvStyles = cardStyles.root({ className });

  return (
    <Surface ref={ref} variant={variant} className={tvStyles} {...restProps}>
      {children}
    </Surface>
  );
});

// --------------------------------------------------

const CardHeader = forwardRef<ViewRef, CardHeaderProps>((props, ref) => {
  const { children, className, ...restProps } = props;

  const tvStyles = cardStyles.header({ className });

  return (
    <View ref={ref} className={tvStyles} {...restProps}>
      {children}
    </View>
  );
});

// --------------------------------------------------

const CardBody = forwardRef<ViewRef, CardBodyProps>((props, ref) => {
  const { children, className, ...restProps } = props;

  const tvStyles = cardStyles.body({ className });

  return (
    <View ref={ref} className={tvStyles} {...restProps}>
      {children}
    </View>
  );
});

// --------------------------------------------------

const CardFooter = forwardRef<ViewRef, CardFooterProps>((props, ref) => {
  const { children, className, ...restProps } = props;

  const tvStyles = cardStyles.footer({ className });

  return (
    <View ref={ref} className={tvStyles} {...restProps}>
      {children}
    </View>
  );
});

// --------------------------------------------------

const CardTitle = forwardRef<TextRef, CardTitleProps>((props, ref) => {
  const { children, className, ...restProps } = props;

  const tvStyles = cardStyles.title({ className });

  return (
    <Text ref={ref} className={tvStyles} {...restProps}>
      {children}
    </Text>
  );
});

// --------------------------------------------------

const CardDescription = forwardRef<TextRef, CardDescriptionProps>(
  (props, ref) => {
    const { children, className, ...restProps } = props;

    const tvStyles = cardStyles.description({
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

CardRoot.displayName = DISPLAY_NAME.ROOT;
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
const CompoundCard = Object.assign(CardRoot, {
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

export default CompoundCard;
