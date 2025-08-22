import { forwardRef, useCallback, useMemo, useState } from 'react';
import { Image, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { Text } from '../../helpers/components';
import { createContext, getElementByDisplayName } from '../../helpers/utils';
import { getElementWithDefault } from '../../helpers/utils/get-element-with-default';
import { DISPLAY_NAME } from './avatar.constants';
import avatarStyles, { nativeStyles } from './avatar.styles';
import type {
  AvatarContextValue,
  AvatarFallbackProps,
  AvatarImageProps,
  AvatarRootProps,
} from './avatar.types';

const AnimatedView = Animated.createAnimatedComponent(View);
const AnimatedImage = Animated.createAnimatedComponent(Image);

const [AvatarProvider, useAvatarContext] = createContext<AvatarContextValue>({
  name: 'AvatarContext',
});

// --------------------------------------------------

const AvatarRoot = forwardRef<View, AvatarRootProps>((props, ref) => {
  const {
    children,
    size = 'md',
    radius = 'full',
    isDisabled = false,
    isLoading = false,
    className,
    style,
    ...restProps
  } = props;

  const [isImageFailed, setIsImageFailed] = useState(false);

  // Look for IMAGE
  const imageElement = useMemo(
    () => getElementByDisplayName(children, DISPLAY_NAME.IMAGE),
    [children]
  );

  const fallbackElement = useMemo(
    () =>
      getElementWithDefault(
        children,
        DISPLAY_NAME.FALLBACK,
        <AvatarFallback>?</AvatarFallback>
      ),
    [children]
  );

  const tvStyles = avatarStyles.root({
    size,
    radius,
    isDisabled,
    isLoading,
    className,
  });

  const contextValue: AvatarContextValue = useMemo(
    () => ({
      size,
      radius,
      isDisabled,
      isLoading,
      isImageFailed,
      setImageFailed: setIsImageFailed,
      imageElementPresent: !!imageElement,
    }),
    [size, radius, isDisabled, isLoading, isImageFailed, imageElement]
  );

  return (
    <AvatarProvider value={contextValue}>
      <AnimatedView
        ref={ref}
        className={tvStyles}
        style={[nativeStyles.avatarRoot, style]}
        {...restProps}
      >
        {imageElement}
        {fallbackElement}
      </AnimatedView>
    </AvatarProvider>
  );
});

AvatarRoot.displayName = DISPLAY_NAME.ROOT;

// --------------------------------------------------

const AvatarImage = forwardRef<Image, AvatarImageProps>((props, ref) => {
  const { source, alt, ...restProps } = props;
  const { size, radius, isImageFailed, setImageFailed } = useAvatarContext();

  const handleError = useCallback(() => {
    setImageFailed(true);
  }, [setImageFailed]);

  const handleLoad = useCallback(() => {
    setImageFailed(false);
  }, [setImageFailed]);

  const tvStyles = avatarStyles.root({ size });
  const imageStyles = avatarStyles.image({ radius });

  if (isImageFailed) {
    return null;
  }

  return (
    <AnimatedImage
      ref={ref}
      source={{ uri: source }}
      accessibilityLabel={alt}
      // Fix: Tailwind merge is not imported in the project
      className={`${tvStyles} ${imageStyles}`}
      onError={handleError}
      onLoad={handleLoad}
      entering={FadeIn.duration(200)}
      exiting={FadeOut.duration(200)}
      {...restProps}
    />
  );
});

AvatarImage.displayName = DISPLAY_NAME.IMAGE;

// --------------------------------------------------

const AvatarFallback = forwardRef<View, AvatarFallbackProps>((props, ref) => {
  const { children, style, ...restProps } = props;
  const { size, isImageFailed, imageElementPresent } = useAvatarContext();

  if (imageElementPresent && !isImageFailed) {
    return null;
  }

  const tvStyles = avatarStyles.fallback({ size });
  const textStyles = avatarStyles.text({ size });

  return (
    <AnimatedView
      ref={ref}
      className={tvStyles}
      style={[nativeStyles.avatarFallback, style]}
      entering={FadeIn.duration(200)}
      {...restProps}
    >
      <Text className={textStyles}>{isImageFailed ? '?' : children}</Text>
    </AnimatedView>
  );
});

AvatarFallback.displayName = DISPLAY_NAME.FALLBACK;

// --------------------------------------------------

const Avatar = Object.assign(AvatarRoot, {
  Image: AvatarImage,
  Fallback: AvatarFallback,
});

export default Avatar;
export { useAvatarContext };
