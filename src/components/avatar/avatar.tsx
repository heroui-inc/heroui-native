import { forwardRef, useEffect, useMemo, useState } from 'react';
import { Text } from '../../helpers/components';
import { createContext } from '../../helpers/utils';
import * as AvatarPrimitives from '../../primitives/avatar';
import { AVATAR_DISPLAY_NAME } from './avatar.constants';
import avatarStyles, { avatarNativeStyles } from './avatar.styles';
import type {
  AvatarContextValue,
  AvatarFallbackProps,
  AvatarFallbackRef,
  AvatarImageProps,
  AvatarImageRef,
  AvatarRootProps,
  AvatarRootRef,
} from './avatar.types';

const [AvatarProvider, useAvatarContext] = createContext<AvatarContextValue>({
  name: 'AvatarContext',
});

// --------------------------------------------------

const AvatarRoot = forwardRef<AvatarRootRef, AvatarRootProps>((props, ref) => {
  const {
    children,
    size = 'md',
    color = 'default',
    className,
    style,
    ...restProps
  } = props;

  const tvStyles = avatarStyles.root({
    size,
    className,
  });

  const contextValue = useMemo(
    () => ({
      size,
      color,
    }),
    [size, color]
  );

  return (
    <AvatarProvider value={contextValue}>
      <AvatarPrimitives.Root
        ref={ref}
        className={tvStyles}
        style={[avatarNativeStyles.borderCurve, style]}
        {...restProps}
      >
        {children}
      </AvatarPrimitives.Root>
    </AvatarProvider>
  );
});

// --------------------------------------------------

const AvatarImage = forwardRef<AvatarImageRef, AvatarImageProps>(
  (props, ref) => {
    const { className, style, ...restProps } = props;

    const tvStyles = avatarStyles.image({
      className,
    });

    return (
      <AvatarPrimitives.Image
        ref={ref}
        className={tvStyles}
        style={style}
        {...restProps}
      />
    );
  }
);

// --------------------------------------------------

const AvatarFallback = forwardRef<AvatarFallbackRef, AvatarFallbackProps>(
  (props, ref) => {
    const contextValue = useAvatarContext();

    const {
      children,
      delayMs = 0,
      color: colorProp,
      className,
      classNames,
      textProps,
      style,
      ...restProps
    } = props;

    const [isVisible, setIsVisible] = useState(delayMs === 0);

    useEffect(() => {
      if (delayMs > 0) {
        const timer = setTimeout(() => {
          setIsVisible(true);
        }, delayMs);

        return () => clearTimeout(timer);
      }
      return undefined;
    }, [delayMs]);

    const size = contextValue.size;
    const color = colorProp ?? contextValue.color;

    const { container, text } = avatarStyles.fallback({
      size,
      color,
    });

    const tvContainerStyles = container({
      className: [className, classNames?.container],
    });

    const tvTextStyles = text({
      className: [classNames?.text, textProps?.className],
    });

    if (!isVisible) {
      return null;
    }

    return (
      <AvatarPrimitives.Fallback
        ref={ref}
        className={tvContainerStyles}
        style={[avatarNativeStyles.borderCurve, style]}
        {...restProps}
      >
        {typeof children === 'string' ? (
          <Text className={tvTextStyles} {...textProps}>
            {children}
          </Text>
        ) : (
          children
        )}
      </AvatarPrimitives.Fallback>
    );
  }
);

// --------------------------------------------------

AvatarRoot.displayName = AVATAR_DISPLAY_NAME.ROOT;
AvatarImage.displayName = AVATAR_DISPLAY_NAME.IMAGE;
AvatarFallback.displayName = AVATAR_DISPLAY_NAME.FALLBACK;

/**
 * Compound Avatar component with sub-components
 *
 * @component Avatar - Main container that manages avatar display state.
 * Provides color and size context to child components.
 *
 * @component Avatar.Image - Optional image component that displays the avatar image.
 * Handles loading states and errors automatically.
 *
 * @component Avatar.Fallback - Optional fallback component shown when image fails to load.
 * Supports text initials or custom content with optional delay.
 *
 * Props flow from Avatar to sub-components via context (size, color).
 * Fallback can override color with its own prop.
 *
 * @see Full documentation: https://heroui.com/components/avatar
 */
const Avatar = Object.assign(AvatarRoot, {
  /** @optional Displays the avatar image with loading state management */
  Image: AvatarImage,
  /** @optional Shows fallback content when image is unavailable */
  Fallback: AvatarFallback,
});

export default Avatar;
export { useAvatarContext };
