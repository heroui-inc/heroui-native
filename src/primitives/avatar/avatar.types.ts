import type { Image, ImageProps as RNImageProps } from 'react-native';
import type {
  ComponentPropsWithAsChild,
  SlottableViewProps,
  ViewRef,
} from '../../helpers/types';

/**
 * Represents the loading state of an avatar image.
 * - 'loading': Image is currently being loaded
 * - 'loaded': Image has successfully loaded
 * - 'error': Image failed to load or source is invalid
 */
type AvatarStatus = 'loading' | 'loaded' | 'error';

/**
 * Props for the Avatar root component.
 * Extends SlottableViewProps to support the asChild pattern.
 */
type RootProps = SlottableViewProps & {
  /** Alternative text description for the avatar, used for accessibility */
  alt: string;
};

/**
 * Props for the Avatar image component.
 * Extends React Native Image props with additional avatar-specific functionality.
 */
type ImageProps = Omit<
  ComponentPropsWithAsChild<typeof Image>,
  'alt' | 'source'
> & {
  /** Optional child elements to render within the image component */
  children?: React.ReactNode;
  /** Source of the image */
  source: RNImageProps['source'];
  /** Callback fired when the loading status changes */
  onLoadingStatusChange?: (status: AvatarStatus) => void;
};

/**
 * Props for the Avatar fallback component.
 * Displayed when the image fails to load or is in error state.
 */
type FallbackProps = SlottableViewProps;

/** Reference type for the Avatar root component */
type RootRef = ViewRef;
/** Reference type for the Avatar image component */
type ImageRef = React.ComponentRef<typeof Image>;
/** Reference type for the Avatar fallback component */
type FallbackRef = ViewRef;

export type {
  AvatarStatus,
  FallbackProps,
  FallbackRef,
  ImageProps,
  ImageRef,
  RootProps,
  RootRef,
};
