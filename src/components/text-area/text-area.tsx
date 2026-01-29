import { forwardRef } from 'react';
import { type TextInput as TextInputType } from 'react-native';
import Input from '../input/input';
import { DISPLAY_NAME } from './text-area.constants';
import { textAreaClassNames } from './text-area.styles';
import type { TextAreaProps } from './text-area.types';

// --------------------------------------------------

const TextAreaRoot = forwardRef<TextInputType, TextAreaProps>((props, ref) => {
  const {
    multiline = true,
    textAlignVertical = 'top',
    className,
    ...restProps
  } = props;

  const textAreaClassName = textAreaClassNames.root({ className });

  return (
    <Input
      ref={ref}
      className={textAreaClassName}
      multiline={multiline}
      textAlignVertical={textAlignVertical}
      {...restProps}
    />
  );
});

// --------------------------------------------------

TextAreaRoot.displayName = DISPLAY_NAME.TEXT_AREA;

/**
 * TextArea component - A multiline text input component with styled border and background for collecting longer user input.
 * Extends Input component with multiline support, defaulting to 8 lines and top-aligned text.
 * Supports primary and secondary variants, and integrates with form item state context.
 *
 * @see Full documentation: https://v3.heroui.com/docs/native/components/text-area
 */
const TextArea = TextAreaRoot;

export default TextArea;
