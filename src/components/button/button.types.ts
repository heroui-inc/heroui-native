import type { TimingConfig } from '@/helpers/types';
import type {
  SlottablePressableProps,
  SlottableViewProps,
} from '@/helpers/types/primitives';

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
  | 'ghost'
  | 'danger';

/**
 * Props for the Button.Root component
 */
export interface ButtonRootProps extends SlottablePressableProps {
  /**
   * Children elements to be rendered inside the button
   */
  children?: React.ReactNode;
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
   * Whether the button should take full width of its container
   * @default true
   */
  fullWidth?: boolean;
  /**
   * Whether the button displays an icon only (needed for correct layout)
   * @default false
   */
  onlyIcon?: boolean;
  /**
   * Whether the button is disabled
   * @default false
   */
  isDisabled?: boolean;
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Whether to disable the animation
   * @default false
   */
  disableAnimation?: boolean;
  /**
   * Animation configuration for press states
   * @default { duration: 150 }
   */
  animationConfig?: TimingConfig;
}

/**
 * Props for the Button.Label component
 */
export interface ButtonLabelProps extends SlottableViewProps {
  /**
   * Content to be rendered as label. If string, will be wrapped in Text component
   */
  children?: React.ReactNode;
  /**
   * Additional CSS classes for the slots
   */
  classNames?: {
    container?: string;
    text?: string;
  };
}

/**
 * Props for the Button.StartContent component
 */
export interface ButtonStartContentProps extends SlottableViewProps {
  /**
   * Content to be rendered at the start of the button
   */
  children?: React.ReactNode;
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Props for the Button.EndContent component
 */
export interface ButtonEndContentProps extends SlottableViewProps {
  /**
   * Content to be rendered at the end of the button
   */
  children?: React.ReactNode;
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Props for the Button.Background component
 */
export interface ButtonBackgroundProps extends SlottableViewProps {
  /**
   * Content to be rendered as the button background
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
  /**
   * Animation configuration for press states
   */
  animationConfig?: TimingConfig;
}
