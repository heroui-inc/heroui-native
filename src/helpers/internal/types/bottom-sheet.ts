import type { BottomSheetViewProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetView/types';
import type { ReactNode } from 'react';
import type { SharedValue } from 'react-native-reanimated';
import type { AnimationDisabled } from './animation';

/**
 * State type for bottom sheet content container animation coordination
 */
export type BottomSheetContentContainerState = 'idle' | 'open' | 'close';

/**
 * Props for the reusable BottomSheetContentContainer component
 */
export interface BottomSheetContentContainerProps {
  /**
   * The content to be rendered inside the container
   */
  children?: ReactNode;
  /**
   * Additional CSS class for the content container
   */
  contentContainerClassName?: string;
  /**
   * Props for the content container
   */
  contentContainerProps?: Omit<BottomSheetViewProps, 'children'>;
  /**
   * Whether the bottom sheet is open
   */
  isOpen: boolean;
  /**
   * Animation progress shared value (0=idle, 1=open, 2=close)
   */
  progress: SharedValue<number>;
  /**
   * Whether the bottom sheet is dragging
   */
  isDragging: SharedValue<boolean>;
  /**
   * Whether the bottom sheet is pan activated
   */
  isPanActivated: SharedValue<boolean>;
  /**
   * Whether the bottom sheet is closing on swipe
   */
  isClosingOnSwipe: SharedValue<boolean>;
  /**
   * Initial index of the bottom sheet
   */
  initialIndex: number;
  /**
   * Callback when the bottom sheet is opened
   */
  onOpenChange: (open: boolean) => void;
}

/**
 * Base props shared across BottomSheet Content components
 * Used by BottomSheet, Popover, and Select components when using bottom-sheet presentation
 */
export interface BaseBottomSheetContentProps {
  /**
   * The bottom sheet content
   */
  children?: ReactNode;
  /**
   * Additional CSS class for the bottom sheet
   */
  className?: string;
  /**
   * Additional CSS class for the container
   */
  containerClassName?: string;
  /**
   * Additional CSS class for the content container
   */
  contentContainerClassName?: string;
  /**
   * Additional CSS class for the background
   */
  backgroundClassName?: string;
  /**
   * Additional CSS class for the handle
   */
  handleClassName?: string;
  /**
   * Additional CSS class for the handle indicator
   */
  handleIndicatorClassName?: string;
  /**
   * Props for the content container
   */
  contentContainerProps?: Omit<BottomSheetViewProps, 'children'>;
  /**
   * Animation configuration for bottom sheet content
   * - `false` or `"disabled"`: Disable all animations
   */
  animation?: AnimationDisabled;
}
