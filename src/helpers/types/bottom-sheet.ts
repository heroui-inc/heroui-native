import type { BottomSheetViewProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetView/types';
import type { ReactNode } from 'react';

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
   * Current state of the bottom sheet for animation coordination
   */
  state: BottomSheetContentContainerState;
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
}
