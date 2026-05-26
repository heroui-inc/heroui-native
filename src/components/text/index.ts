import TypographyComponent from './text';
import { textClassNames as typographyClassNamesValue } from './text.styles';
import type {
  TextAlign as TextAlignSource,
  TextCodeProps as TextCodePropsSource,
  TextColor as TextColorSource,
  TextHeadingProps as TextHeadingPropsSource,
  TextParagraphProps as TextParagraphPropsSource,
  TextRootProps as TextRootPropsSource,
  TextType as TextTypeSource,
  TextWeight as TextWeightSource,
} from './text.types';

export { TypographyComponent as Typography };

export const typographyClassNames = typographyClassNamesValue;

export type TypographyAlign = TextAlignSource;
export type TypographyCodeProps = TextCodePropsSource;
export type TypographyColor = TextColorSource;
export type TypographyHeadingProps = TextHeadingPropsSource;
export type TypographyParagraphProps = TextParagraphPropsSource;
export type TypographyRootProps = TextRootPropsSource;
export type TypographyType = TextTypeSource;
export type TypographyWeight = TextWeightSource;

/**
 * @deprecated Use `Typography` instead. Will be removed in a future major version.
 */
export const Text = TypographyComponent;

/**
 * @deprecated Use `typographyClassNames` instead. Will be removed in a future major version.
 */
export const textClassNames = typographyClassNamesValue;

/**
 * @deprecated Use `TypographyAlign` instead.
 */
export type TextAlign = TextAlignSource;

/**
 * @deprecated Use `TypographyCodeProps` instead.
 */
export type TextCodeProps = TextCodePropsSource;

/**
 * @deprecated Use `TypographyColor` instead.
 */
export type TextColor = TextColorSource;

/**
 * @deprecated Use `TypographyHeadingProps` instead.
 */
export type TextHeadingProps = TextHeadingPropsSource;

/**
 * @deprecated Use `TypographyParagraphProps` instead.
 */
export type TextParagraphProps = TextParagraphPropsSource;

/**
 * @deprecated Use `TypographyRootProps` instead.
 */
export type TextRootProps = TextRootPropsSource;

/**
 * @deprecated Use `TypographyType` instead.
 */
export type TextType = TextTypeSource;

/**
 * @deprecated Use `TypographyWeight` instead.
 */
export type TextWeight = TextWeightSource;
