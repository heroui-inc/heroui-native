import { forwardRef, useEffect, useMemo, useState } from 'react';
import type { ImageSourcePropType } from 'react-native';
import Animated from 'react-native-reanimated';
import { Text } from '../../helpers/components';
import { useThemeColor } from '../../helpers/theme';
import { childrenToString, createContext } from '../../helpers/utils';
import * as AvatarPrimitives from '../../primitives/avatar';
import {
  useAvatarFallbackAnimation,
  useAvatarImageAnimation,
  useAvatarRootAnimation,
} from './avatar.animation';
import {
  AVATAR_DEFAULT_ICON_SIZE,
  AVATAR_DISPLAY_NAME,
} from './avatar.constants';
import avatarStyles, { styleSheet } from './avatar.styles';
import type {
  AvatarColor,
  AvatarContextValue,
  AvatarFallbackProps,
  AvatarFallbackRef,
  AvatarImageProps,
  AvatarImageRef,
  AvatarRootProps,
  AvatarRootRef,
  AvatarSize,
} from './avatar.types';
import type { PersonIconProps } from './person-icon';
import { PersonIcon } from './person-icon';

const AnimatedFallback = Animated.createAnimatedComponent(
  AvatarPrimitives.Fallback
);

const [AvatarProvider, useAvatarContext] = createContext<AvatarContextValue>({
  name: 'AvatarContext',
});

// --------------------------------------------------

const AvatarRoot = forwardRef<AvatarRootRef, AvatarRootProps>((props, ref) => {
  const {
    children,
    size = 'md',
    variant = 'default',
    color = 'accent',
    className,
    style,
    animation,
    ...restProps
  } = props;

  const tvStyles = avatarStyles.root({
    variant,
    size,
    color,
    className,
  });

  const { isAllAnimationsDisabled } = useAvatarRootAnimation({
    animation,
  });

  const contextValue = useMemo(
    () => ({
      size,
      color,
      isAllAnimationsDisabled,
    }),
    [size, color, isAllAnimationsDisabled]
  );

  return (
    <AvatarProvider value={contextValue}>
      <AvatarPrimitives.Root
        ref={ref}
        className={tvStyles}
        style={[styleSheet.borderCurve, style]}
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
    const { className } = props;
    const animation =
      'asChild' in props && props.asChild
        ? undefined
        : 'animation' in props
          ? props.animation
          : undefined;

    const { entering } = useAvatarImageAnimation({
      animation,
    });

    const tvStyles = avatarStyles.image({
      className,
    });

    if (props.asChild) {
      return (
        <AvatarPrimitives.Image ref={ref} className={tvStyles} {...props} />
      );
    }

    const { source, ...restProps } = props;

    return (
      <AvatarPrimitives.Image
        ref={ref}
        source={source as ImageSourcePropType}
        asChild
      >
        <Animated.Image
          key={AVATAR_DISPLAY_NAME.IMAGE}
          entering={entering}
          className={tvStyles}
          {...restProps}
        />
      </AvatarPrimitives.Image>
    );
  }
);

// --------------------------------------------------

const DefaultFallbackIcon: React.FC<{
  sizeVariant: AvatarSize;
  colorVariant: AvatarColor;
  iconProps?: PersonIconProps;
}> = ({ sizeVariant, colorVariant, iconProps }) => {
  const themeColorDefaultForeground = useThemeColor('default-foreground');
  const themeColorAccent = useThemeColor('accent');
  const themeColorSuccess = useThemeColor('success');
  const themeColorWarning = useThemeColor('warning');
  const themeColorDanger = useThemeColor('danger');

  const iconSize = iconProps?.size ?? AVATAR_DEFAULT_ICON_SIZE[sizeVariant];

  const defaultIconColorMap: Record<AvatarColor, string> = {
    default: themeColorDefaultForeground,
    accent: themeColorAccent,
    success: themeColorSuccess,
    warning: themeColorWarning,
    danger: themeColorDanger,
  };

  const iconColor = iconProps?.color ?? defaultIconColorMap[colorVariant];

  return <PersonIcon size={iconSize} color={iconColor} />;
};

// --------------------------------------------------

const AvatarFallback = forwardRef<AvatarFallbackRef, AvatarFallbackProps>(
  (props, ref) => {
    const { size, color: contextColor } = useAvatarContext();

    const {
      children,
      delayMs = 0,
      color: colorProp,
      className,
      classNames,
      textProps,
      iconProps,
      style,
      animation,
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

    const color = colorProp ?? contextColor;

    const { entering } = useAvatarFallbackAnimation({
      animation,
    });

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

    const stringifiedChildren = childrenToString(children);

    return (
      <AnimatedFallback
        key={AVATAR_DISPLAY_NAME.FALLBACK}
        ref={ref}
        entering={entering}
        className={tvContainerStyles}
        style={[styleSheet.borderCurve, style]}
        {...restProps}
      >
        {children ? (
          stringifiedChildren ? (
            <Text className={tvTextStyles} {...textProps}>
              {stringifiedChildren}
            </Text>
          ) : (
            children
          )
        ) : (
          <DefaultFallbackIcon
            sizeVariant={size}
            colorVariant={color}
            iconProps={iconProps}
          />
        )}
      </AnimatedFallback>
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
