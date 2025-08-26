import type { ImageProps, ViewProps } from 'react-native';
import type { AnimatedProps } from 'react-native-reanimated';

/**
 * Size variants for the Avatar component
 */
export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

/**
 * Radius variants for the Avatar component
 */
export type AvatarRadius = 'sm' | 'md' | 'lg' | 'xl' | 'full';

/**
 * Props for the Avatar.Root component
 */
export interface AvatarRootProps extends AnimatedProps<ViewProps> {
  /**
   * Children elements to be rendered inside the avatar
   */
  children?: React.ReactNode;
  /**
   * Size of the avatar
   * @default 'md'
   */
  size?: AvatarSize;
  /**
   * Border radius of the avatar
   * @default 'full'
   */
  radius?: AvatarRadius;
  /**
   * Whether the avatar is disabled
   * @default false
   */
  isDisabled?: boolean;
  /**
   * Whether to show a loading state
   * @default false
   */
  isLoading?: boolean;
  /**
   * Custom class name for styling
   */
  className?: string;
  /**
   * Custom style object
   */
  style?: any;
}

/**
 * Props for the Avatar.Image component
 */
export interface AvatarImageProps extends AnimatedProps<ImageProps> {
  /**
   * Source of the image
   */
  source: any;
  /**
   * Alt text for accessibility
   */
  alt?: string;
  /**
   * Whether the image failed to load
   */
  isFailed?: boolean;
  /**
   * Custom class name for styling
   */
  className?: string;
  /**
   * Custom style object
   */
  style?: any;
}

/**
 * Props for the Avatar.Fallback component
 */
export interface AvatarFallbackProps extends AnimatedProps<ViewProps> {
  /**
   * Children elements to be rendered as fallback
   */
  children?: React.ReactNode;
  /**
   * Custom class name for styling
   */
  className?: string;
  /**
   * Custom style object
   */
  style?: any;
}

/**
 * Props for the Avatar.Text component
 */
export interface AvatarTextProps extends AnimatedProps<ViewProps> {
  /**
   * Children elements to be rendered as text
   */
  children?: React.ReactNode;
  /**
   * Custom class name for styling
   */
  className?: string;
  /**
   * Custom style object
   */
  style?: any;
}

/**
 * Context value for Avatar components
 */
export interface AvatarContextValue {
  /**
   * Size of the avatar
   */
  size: AvatarSize;
  /**
   * Radius of the avatar
   */
  radius: AvatarRadius;
  /**
   * Whether the avatar is disabled
   */
  isDisabled: boolean;
  /**
   * Whether the avatar is loading
   */
  isLoading: boolean;
  /**
   * Whether the image failed to load
   */
  isImageFailed: boolean;
  /**
   * Function to set image failed state
   */
  setImageFailed: (failed: boolean) => void;
  /**
   * Whether the image element is not found
   */
  imageElementPresent: boolean;
}
