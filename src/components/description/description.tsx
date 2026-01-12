import { forwardRef } from 'react';
import { HeroText } from '../../helpers/components';
import type { TextRef } from '../../helpers/types/primitives';
import { DISPLAY_NAME } from './description.constants';
import descriptionStyles from './description.styles';
import type { DescriptionProps } from './description.types';

// --------------------------------------------------

const Description = forwardRef<TextRef, DescriptionProps>((props, ref) => {
  const { children, className, nativeID, ...restProps } = props;

  const tvStyles = descriptionStyles({
    className,
  });

  return (
    <HeroText ref={ref} className={tvStyles} nativeID={nativeID} {...restProps}>
      {children}
    </HeroText>
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
