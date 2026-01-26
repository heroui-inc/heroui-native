import { forwardRef } from 'react';
import Animated from 'react-native-reanimated';
import { HeroText } from '../../helpers/internal/components';
import { useFormItemState } from '../../helpers/internal/contexts';
import type { TextRef } from '../../helpers/internal/types';
import { useDescriptionAnimation } from './description.animation';
import { DISPLAY_NAME } from './description.constants';
import descriptionStyles from './description.styles';
import type { DescriptionProps } from './description.types';

const AnimatedText = Animated.createAnimatedComponent(HeroText);

// --------------------------------------------------

const Description = forwardRef<TextRef, DescriptionProps>((props, ref) => {
  const {
    children,
    className,
    nativeID,
    isInvalid: localIsInvalid,
    animation,
    ...restProps
  } = props;

  const formItemState = useFormItemState();

  const isInvalid =
    localIsInvalid !== undefined
      ? localIsInvalid
      : (formItemState?.isInvalid ?? false);

  const tvStyles = descriptionStyles({
    isInvalid,
    className,
  });

  const { entering, exiting } = useDescriptionAnimation({
    animation,
  });

  if (isInvalid) return null;

  return (
    <AnimatedText
      ref={ref}
      entering={entering}
      exiting={exiting}
      className={tvStyles}
      nativeID={nativeID}
      {...restProps}
    >
      {children}
    </AnimatedText>
  );
});

// --------------------------------------------------

Description.displayName = DISPLAY_NAME.DESCRIPTION;

/**
 * Description component for form fields and other UI elements.
 *
 * Provides accessible description text with proper styling. Can be linked to
 * form fields via the nativeID prop for accessibility support.
 *
 * @see Full documentation: https://v3.heroui.com/docs/native/components/description
 */
export default Description;
