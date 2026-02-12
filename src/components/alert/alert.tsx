import { forwardRef } from 'react';
import { HeroText } from '../../helpers/internal/components';
import * as AlertPrimitives from '../../primitives/alert';
import type * as AlertPrimitiveTypes from '../../primitives/alert/alert.types';
import { DEFAULT_ICON_SIZE, DISPLAY_NAME } from './alert.constants';
import { useStatusColor } from './alert.hooks';
import { alertClassNames, alertStyleSheet } from './alert.styles';
import type {
  AlertContentProps,
  AlertDescriptionProps,
  AlertIconProps,
  AlertIndicatorProps,
  AlertRootProps,
  AlertTitleProps,
} from './alert.types';
import { getStatusIcon } from './alert.utils';

const useAlert = AlertPrimitives.useRootContext;

// --------------------------------------------------

const AlertRoot = forwardRef<AlertPrimitiveTypes.RootRef, AlertRootProps>(
  (props, ref) => {
    const {
      children,
      status = 'default',
      className,
      style,
      ...restProps
    } = props;

    const rootClassName = alertClassNames.root({ className });

    return (
      <AlertPrimitives.Root
        ref={ref}
        status={status}
        className={rootClassName}
        style={[alertStyleSheet.root, style]}
        {...restProps}
      >
        {children}
      </AlertPrimitives.Root>
    );
  }
);

// --------------------------------------------------

const AlertIndicator = forwardRef<
  AlertPrimitiveTypes.IndicatorRef,
  AlertIndicatorProps
>((props, ref) => {
  const { children, className, iconProps, ...restProps } = props;

  const { status } = useAlert();
  const statusColor = useStatusColor(status);

  const indicatorClassName = alertClassNames.indicator({ className });

  /** Merge default color with user-provided iconProps */
  const resolvedIconProps: AlertIconProps = {
    size: iconProps?.size ?? DEFAULT_ICON_SIZE,
    color: iconProps?.color ?? statusColor,
  };

  return (
    <AlertPrimitives.Indicator
      ref={ref}
      className={indicatorClassName}
      {...restProps}
    >
      {children ?? getStatusIcon(status, resolvedIconProps)}
    </AlertPrimitives.Indicator>
  );
});

// --------------------------------------------------

const AlertContent = forwardRef<
  AlertPrimitiveTypes.ContentRef,
  AlertContentProps
>((props, ref) => {
  const { children, className, ...restProps } = props;

  const contentClassName = alertClassNames.content({ className });

  return (
    <AlertPrimitives.Content
      ref={ref}
      className={contentClassName}
      {...restProps}
    >
      {children}
    </AlertPrimitives.Content>
  );
});

// --------------------------------------------------

const AlertTitle = forwardRef<AlertPrimitiveTypes.TitleRef, AlertTitleProps>(
  (props, ref) => {
    const { children, className, ...restProps } = props;

    const { status } = useAlert();

    const titleClassName = alertClassNames.title({ status, className });

    return (
      <AlertPrimitives.Title asChild {...restProps}>
        <HeroText ref={ref} className={titleClassName}>
          {children}
        </HeroText>
      </AlertPrimitives.Title>
    );
  }
);

// --------------------------------------------------

const AlertDescription = forwardRef<
  AlertPrimitiveTypes.DescriptionRef,
  AlertDescriptionProps
>((props, ref) => {
  const { children, className, ...restProps } = props;

  const descriptionClassName = alertClassNames.description({ className });

  return (
    <AlertPrimitives.Description asChild {...restProps}>
      <HeroText ref={ref} className={descriptionClassName}>
        {children}
      </HeroText>
    </AlertPrimitives.Description>
  );
});

// --------------------------------------------------

AlertRoot.displayName = DISPLAY_NAME.ROOT;
AlertIndicator.displayName = DISPLAY_NAME.INDICATOR;
AlertContent.displayName = DISPLAY_NAME.CONTENT;
AlertTitle.displayName = DISPLAY_NAME.TITLE;
AlertDescription.displayName = DISPLAY_NAME.DESCRIPTION;

/**
 * Compound Alert component with sub-components
 *
 * @component Alert - Main container that renders a styled alert with role="alert"
 * and configurable status (default, accent, success, warning, danger).
 * Status flows to sub-components via primitive context.
 *
 * @component Alert.Indicator - Renders a status-appropriate icon by default.
 * Accepts custom children to override the default icon.
 * Supports iconProps (size, color) for customising the default icon.
 *
 * @component Alert.Content - Flex-1 wrapper for Alert.Title and Alert.Description.
 *
 * @component Alert.Title - Heading text with status-based color (success, warning,
 * danger apply their respective semantic color; default and accent use foreground).
 *
 * @component Alert.Description - Body text rendered with muted color.
 *
 * Props flow from Alert to sub-components via context (status, nativeID).
 * Title and Description are connected to root via aria-labelledby / aria-describedby.
 *
 * @see Full documentation: https://v3.heroui.com/docs/native/components/alert
 */
const CompoundAlert = Object.assign(AlertRoot, {
  /** @optional Status icon rendered as the leading visual element */
  Indicator: AlertIndicator,
  /** @optional Wrapper for title and description content */
  Content: AlertContent,
  /** @optional Primary heading with status-aware text color */
  Title: AlertTitle,
  /** @optional Secondary description with muted text color */
  Description: AlertDescription,
});

export { useAlert };
export default CompoundAlert;
