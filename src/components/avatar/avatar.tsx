import { forwardRef, useMemo } from 'react';
import type { ImageSourcePropType, ImageStyle } from 'react-native';
import Animated from 'react-native-reanimated';
import { HeroText } from '../../helpers/components';
import { AnimationSettingsProvider } from '../../helpers/contexts/animation-settings-context';
import { useThemeColor } from '../../helpers/theme';
import { childrenToString } from '../../helpers/utils';
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
import { AvatarProvider, useInnerAvatarContext } from './avatar.context';
import avatarStyles, { styleSheet } from './avatar.styles';
import type {
  AvatarColor,
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

/**
 * Hook to access Avatar primitive root context
 * Provides access to avatar status and other root-level state
 */
const useAvatar = AvatarPrimitives.useRootContext;

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
    }),
    [size, color]
  );

  const animationSettingsContextValue = useMemo(
    () => ({
      isAllAnimationsDisabled,
    }),
    [isAllAnimationsDisabled]
  );

  return (
    <AnimationSettingsProvider value={animationSettingsContextValue}>
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
    </AnimationSettingsProvider>
  );
});

// --------------------------------------------------

const AvatarImage = forwardRef<AvatarImageRef, AvatarImageProps>(
  (props, ref) => {
    const {
      className,
      style: styleProp,
      source,
      asChild,
      ...restProps
    } = props;

    const animation = asChild
      ? undefined
      : 'animation' in props
        ? props.animation
        : undefined;

    const normalizedStyle =
      styleProp && typeof styleProp === 'object' && !Array.isArray(styleProp)
        ? (styleProp as ImageStyle)
        : undefined;

    const { rImageStyle } = useAvatarImageAnimation({
      animation,
      style: normalizedStyle,
    });

    const tvStyles = avatarStyles.image({
      className,
    });

    if (asChild) {
      return (
        <AvatarPrimitives.Image ref={ref} className={tvStyles} {...props} />
      );
    }

    return (
      <AvatarPrimitives.Image
        ref={ref}
        source={source as ImageSourcePropType}
        asChild
      >
        <Animated.Image
          style={[rImageStyle, styleProp]}
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
  const [
    themeColorDefaultForeground,
    themeColorAccent,
    themeColorSuccess,
    themeColorWarning,
    themeColorDanger,
  ] = useThemeColor([
    'default-foreground',
    'accent',
    'success',
    'warning',
    'danger',
  ]);

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
    const { size, color: contextColor } = useInnerAvatarContext();

    const {
      children,
      color: colorProp,
      className,
      classNames,
      textProps,
      iconProps,
      style,
      delayMs,
      animation,
      ...restProps
    } = props;

    const stringifiedChildren = childrenToString(children);

    const color = colorProp ?? contextColor;

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

    const { entering } = useAvatarFallbackAnimation({
      animation,
      delayMs,
    });

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
            <HeroText className={tvTextStyles} {...textProps}>
              {stringifiedChildren}
            </HeroText>
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
export { Avatar, useAvatar };
