/**
 * Compile-time check that Input accepts a native text input instance ref.
 *
 * `React.ComponentRef<typeof TextInput>` is `TextInput` on the legacy RN
 * types and `TextInputInstance` under the Strict TypeScript API (0.87+).
 * This file is typechecked by `yarn typecheck`; it is not a Jest test.
 */
import { createElement, createRef } from 'react';
import { TextInput } from 'react-native';
import { Input, type InputRef } from '../components/input';
import { InputGroup } from '../components/input-group';
import { SearchField } from '../components/search-field';
import { TextArea, type TextAreaRef } from '../components/text-area';

type NativeTextInputRef = React.ComponentRef<typeof TextInput>;

type AssertEqual<A, B> =
  (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2
    ? true
    : never;

export const assertInputRef: AssertEqual<InputRef, NativeTextInputRef> = true;
export const assertTextAreaRef: AssertEqual<TextAreaRef, NativeTextInputRef> =
  true;

const nativeInputRef = createRef<NativeTextInputRef>();

createElement(Input, { ref: nativeInputRef });
createElement(TextArea, { ref: nativeInputRef });
createElement(SearchField.Input, { ref: nativeInputRef });
createElement(InputGroup.Input, { ref: nativeInputRef });
