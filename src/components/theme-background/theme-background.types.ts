import type { ViewProps } from 'react-native';

/**
 * Props for the ThemeBackground component.
 * Component-level background sub-components (e.g. `Popover.ContentBackground`)
 * forward their props here after resolving their own class name.
 */
export type ThemeBackgroundProps = ViewProps & {
  /** Additional CSS classes */
  className?: string;
};
