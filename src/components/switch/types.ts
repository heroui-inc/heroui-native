import type { ViewStyle } from 'react-native';

export interface SwitchProps {
  /**
   * Whether the switch is currently on (true) or off (false)
   */
  value: boolean;

  /**
   * Callback function when the switch value changes
   */
  onValueChange?: (value: boolean) => void;

  /**
   * Whether the switch is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Color of the switch track when it's on
   * @default '#4CD964'
   */
  trackColorOn?: string;

  /**
   * Color of the switch track when it's off
   * @default '#e9e9e9'
   */
  trackColorOff?: string;

  /**
   * Color of the switch thumb
   * @default '#ffffff'
   */
  thumbColor?: string;

  /**
   * Custom style for the switch container
   */
  style?: ViewStyle;
}
