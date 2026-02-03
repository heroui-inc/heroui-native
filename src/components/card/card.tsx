import { forwardRef } from 'react';
import { View } from 'react-native';
import { HeroText } from '../../helpers/internal/components';
import type { TextRef, ViewRef } from '../../helpers/internal/types';
import { Surface } from '../surface';
import { DISPLAY_NAME } from './card.constants';
import { cardClassNames } from './card.styles';
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

  const rootClassName = cardClassNames.root({ className });

  return (
    <Surface
      ref={ref}
      variant={variant}
      className={rootClassName}
      {...restProps}
    >
      {children}
    </Surface>
  );
});

// --------------------------------------------------

const CardHeader = forwardRef<ViewRef, CardHeaderProps>((props, ref) => {
  const { children, className, ...restProps } = props;

  const headerClassName = cardClassNames.header({ className });

  return (
    <View ref={ref} className={headerClassName} {...restProps}>
      {children}
    </View>
  );
});

// --------------------------------------------------

const CardBody = forwardRef<ViewRef, CardBodyProps>((props, ref) => {
  const { children, className, ...restProps } = props;

  const bodyClassName = cardClassNames.body({ className });

  return (
    <View ref={ref} className={bodyClassName} {...restProps}>
      {children}
    </View>
  );
});

// --------------------------------------------------

const CardFooter = forwardRef<ViewRef, CardFooterProps>((props, ref) => {
  const { children, className, ...restProps } = props;

  const footerClassName = cardClassNames.footer({ className });

  return (
    <View ref={ref} className={footerClassName} {...restProps}>
      {children}
    </View>
  );
});

// --------------------------------------------------

const CardTitle = forwardRef<TextRef, CardTitleProps>((props, ref) => {
  const { children, className, ...restProps } = props;

  const titleClassName = cardClassNames.label({ className });

  return (
    <HeroText ref={ref} className={titleClassName} {...restProps}>
      {children}
    </HeroText>
  );
});

// --------------------------------------------------

const CardDescription = forwardRef<TextRef, CardDescriptionProps>(
  (props, ref) => {
    const { children, className, ...restProps } = props;

    const descriptionClassName = cardClassNames.description({
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
 * @see Full documentation: https://v3.heroui.com/docs/native/components/card
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
