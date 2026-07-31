import type { TextProps, ViewProps } from 'react-native';
import type {
  AnimationRoot,
  AnimationRootDisableAll,
} from '../../helpers/internal/types';
import type {
  PressableFeedbackHighlightAnimation,
  PressableFeedbackProps,
  PressableFeedbackRippleAnimation,
  PressableFeedbackScaleAnimation,
} from '../pressable-feedback/pressable-feedback.types';

/**
 * Size variants for the Button component
 */
export type ButtonSize = 'sm' | 'md' | 'lg';

/**
 * Variant types for the Button component
 */
export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'outline'
  | 'ghost'
  | 'danger'
  | 'danger-soft';

/**
 * Feedback variant that determines which PressableFeedback compound parts are rendered
 */
export type ButtonFeedbackVariant =
  | 'scale-highlight'
  | 'scale-ripple'
  | 'scale'
  | 'none';

/**
 * Shared base props for the Button.Root component (common across all feedback variants)
 */
type ButtonRootPropsBase = Omit<PressableFeedbackProps, 'animation'> & {
  /**
   * Visual variant of the button
   * @default 'primary'
   */
  variant?: ButtonVariant;
  /**
   * Size of the button
   * @default 'md'
   */
  size?: ButtonSize;
  /**
   * Whether the button displays an icon only (needed for correct layout)
   * @default false
   */
  isIconOnly?: boolean;
  /**
   * Background layer rendered behind the button surface.
   * - `undefined` (default): renders `Button.Background` for the `secondary`
   *   and `tertiary` variants when the active library theme registers
   *   default background content (e.g. `glass`); otherwise no layer
   * - custom node: replaces the default layer entirely
   * - `null`: removes the background layer
   */
  background?: React.ReactNode;
};

/**
 * Props when feedbackVariant is 'scale-highlight' (default).
 * Animation accepts scale and highlight configuration.
 */
export type ButtonRootPropsScaleHighlight = ButtonRootPropsBase & {
  /**
   * Feedback variant that renders Scale + Highlight compound parts
   * @default 'scale-highlight'
   */
  feedbackVariant?: 'scale-highlight';
  /**
   * Animation configuration for scale and highlight feedback
   */
  animation?: AnimationRoot<{
    /** Scale animation configuration */
    scale?: PressableFeedbackScaleAnimation;
    /** Highlight overlay configuration */
    highlight?: PressableFeedbackHighlightAnimation;
  }>;
};

/**
 * Props when feedbackVariant is 'scale-ripple'.
 * Animation accepts scale and ripple configuration.
 */
type ButtonRootPropsScaleRipple = ButtonRootPropsBase & {
  /**
   * Feedback variant that renders Scale + Ripple compound parts
   */
  feedbackVariant: 'scale-ripple';
  /**
   * Animation configuration for scale and ripple feedback
   */
  animation?: AnimationRoot<{
    /** Scale animation configuration */
    scale?: PressableFeedbackScaleAnimation;
    /** Ripple overlay configuration */
    ripple?: PressableFeedbackRippleAnimation;
  }>;
};

/**
 * Props when feedbackVariant is 'scale'.
 * Only the built-in scale animation is active — no highlight or ripple overlay is rendered.
 */
type ButtonRootPropsScale = ButtonRootPropsBase & {
  /**
   * Feedback variant that renders only the built-in scale animation (no highlight or ripple overlay)
   */
  feedbackVariant: 'scale';
  /**
   * Animation configuration for scale-only feedback
   */
  animation?: AnimationRoot<{
    /** Scale animation configuration */
    scale?: PressableFeedbackScaleAnimation;
  }>;
};

/**
 * Props when feedbackVariant is 'none'.
 * All feedback effects are disabled — no scale, highlight, or ripple is rendered.
 */
type ButtonRootPropsNone = ButtonRootPropsBase & {
  /**
   * Feedback variant that disables all feedback effects (no scale, highlight, or ripple)
   */
  feedbackVariant: 'none';
  /**
   * Only 'disable-all' is accepted when feedback is disabled
   */
  animation?: AnimationRootDisableAll;
};

/**
 * Props for the Button.Root component.
 * Discriminated union based on `feedbackVariant` — the `animation` prop type
 * is constrained to only the relevant sub-component configs for each variant.
 */
export type ButtonRootProps =
  | ButtonRootPropsScaleHighlight
  | ButtonRootPropsScaleRipple
  | ButtonRootPropsScale
  | ButtonRootPropsNone;

/**
 * Props for the Button.Background component.
 * Generic absolute-fill container rendered behind the button surface. When
 * no `children` are given, the active library theme decides the default
 * content (e.g. a frosted-glass blur layer when the theme is `glass`).
 */
export type ButtonBackgroundProps = ViewProps & {
  /**
   * Custom content to render inside the background container.
   * When omitted, the active library theme's default background content is
   * rendered.
   */
  children?: React.ReactNode;
  /**
   * Additional CSS classes
   */
  className?: string;
};

/**
 * Props for the Button.Label component
 */
export interface ButtonLabelProps extends TextProps {
  /**
   * Content to be rendered as label
   */
  children?: React.ReactNode;
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Context values shared between Button components
 */
export interface ButtonContextValue {
  /**
   * Size of the button
   */
  size: ButtonSize;
  /**
   * Visual variant of the button
   */
  variant: ButtonVariant;
  /**
   * Whether the button is disabled
   */
  isDisabled: boolean;
}
