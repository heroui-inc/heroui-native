import { forwardRef } from 'react';
import { useThemeColor } from '../../helpers/external/hooks';
import { CloseIcon } from '../../helpers/internal/components';
import type { PressableRef } from '../../helpers/internal/types';
import { Button } from '../button';
import { DISPLAY_NAME } from './close-button.constants';
import closeButtonClassNames from './close-button.styles';
import type { CloseButtonProps } from './close-button.types';

// --------------------------------------------------

const CloseButtonRoot = forwardRef<PressableRef, CloseButtonProps>(
  (props, ref) => {
    const { iconProps, className, children, ...restProps } = props;

    const themeColorMuted = useThemeColor('muted');

    /** Resolved root className from close-button styles */
    const rootClassName = closeButtonClassNames.root({ className });

    return (
      <Button
        ref={ref}
        variant="tertiary"
        size="sm"
        isIconOnly
        className={rootClassName}
        hitSlop={12}
        {...restProps}
      >
        {children ?? (
          <CloseIcon
            size={iconProps?.size ?? 18}
            color={iconProps?.color ?? themeColorMuted}
          />
        )}
      </Button>
    );
  }
);

// --------------------------------------------------

CloseButtonRoot.displayName = DISPLAY_NAME.CLOSE_BUTTON_ROOT;

/**
 * Compound CloseButton component
 *
 * @component CloseButton - A specialized button component that renders a close icon by default.
 * It is a Button with default variant='tertiary', size='sm', and isIconOnly=true.
 * The close icon can be customized via the iconProps prop, or you can provide custom children.
 *
 * @see Full documentation: https://v3.heroui.com/docs/native/components/close-button
 */
const CloseButton = CloseButtonRoot;

export default CloseButton;
