import type BottomSheet from '@gorhom/bottom-sheet';
import type { BottomSheetProps } from '@gorhom/bottom-sheet';
import { forwardRef, useMemo } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import type { SharedValue } from 'react-native-reanimated';
import { ReduceMotion } from 'react-native-reanimated';
import { withUniwind } from 'uniwind';
import { useBottomSheetContentAnimation } from '../../../components/bottom-sheet/bottom-sheet.animation';
import { bottomSheetClassNames } from '../../../components/bottom-sheet/bottom-sheet.styles';
import GorhomBottomSheetPackage from '../../../optional/gorhom-bottom-sheet';
import { BottomSheetIsDraggingProvider } from '../contexts';
import { useBottomSheetGestureHandlers } from '../hooks';
import { usePopupBottomSheetContentAnimation } from '../hooks/use-popup-bottom-sheet-content-animation';
import type { BaseBottomSheetContentProps } from '../types/bottom-sheet';
import { BottomSheetContentContainer } from './bottom-sheet-content-container';

const StyledBottomSheet = withUniwind(GorhomBottomSheetPackage?.default);

/**
 * Props for the reusable BottomSheetContent component
 */
export interface BottomSheetContentProps
  extends BaseBottomSheetContentProps,
    Partial<BottomSheetProps> {
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
   * Callback when the bottom sheet open state changes
   */
  onOpenChange: (open: boolean) => void;
  /**
   * Initial index of the bottom sheet
   */
  index?: number;
  /**
   * Additional style for the background
   */
  backgroundStyle?: StyleProp<ViewStyle>;
}

/**
 * Reusable BottomSheetContent component
 *
 * This component provides a reusable bottom sheet content wrapper used across
 * Popover, Select, and other components when using bottom-sheet presentation.
 * It handles animation coordination, styling, and gesture handling.
 *
 * @example
 * ```tsx
 * <BottomSheetContent
 *   isOpen={isOpen}
 *   progress={progress}
 *   isDragging={isDragging}
 *   onOpenChange={onOpenChange}
 *   index={0}
 * >
 *   {children}
 * </BottomSheetContent>
 * ```
 */
export const BottomSheetContent = forwardRef<
  BottomSheet,
  BottomSheetContentProps
>(
  (
    {
      children,
      index: initialIndex,
      backgroundClassName,
      handleIndicatorClassName,
      contentContainerClassName: contentContainerClassNameProp,
      contentContainerProps,
      animation,
      animationConfigs,
      backgroundStyle,
      isOpen,
      progress,
      isDragging,
      onOpenChange,
      ...restProps
    },
    ref
  ) => {
    const { isAnimationDisabledValue } = useBottomSheetContentAnimation({
      animation,
    });

    const { animatedIndex, isClosingOnSwipe, isPanActivated } =
      usePopupBottomSheetContentAnimation({
        progress,
        isDragging,
      });

    const contentBackgroundClassName = bottomSheetClassNames.contentBackground({
      className: backgroundClassName,
    });

    const contentHandleIndicatorClassName =
      bottomSheetClassNames.contentHandleIndicator({
        className: handleIndicatorClassName,
      });

    const contentContainerClassName = bottomSheetClassNames.contentContainer({
      className: contentContainerClassNameProp,
    });

    const mergedAnimationConfigs = useMemo(
      () => ({
        ...animationConfigs,
        reduceMotion: isAnimationDisabledValue
          ? ReduceMotion.Always
          : animationConfigs?.reduceMotion,
      }),
      [animationConfigs, isAnimationDisabledValue]
    );

    return (
      <BottomSheetIsDraggingProvider value={{ isDragging }}>
        <StyledBottomSheet
          ref={ref}
          index={-1}
          backgroundClassName={contentBackgroundClassName}
          backgroundStyle={backgroundStyle}
          handleIndicatorClassName={contentHandleIndicatorClassName}
          enablePanDownToClose={restProps.enablePanDownToClose ?? true}
          animatedIndex={animatedIndex ?? restProps.animatedIndex}
          animationConfigs={mergedAnimationConfigs}
          gestureEventsHandlersHook={useBottomSheetGestureHandlers}
          {...restProps}
        >
          <BottomSheetContentContainer
            initialIndex={initialIndex ?? 0}
            isOpen={isOpen}
            progress={progress}
            isDragging={isDragging}
            isPanActivated={isPanActivated}
            isClosingOnSwipe={isClosingOnSwipe}
            contentContainerClassName={contentContainerClassName}
            contentContainerProps={contentContainerProps}
            onOpenChange={onOpenChange}
            enablePanDownToClose={restProps.enablePanDownToClose ?? true}
          >
            {children}
          </BottomSheetContentContainer>
        </StyledBottomSheet>
      </BottomSheetIsDraggingProvider>
    );
  }
);

BottomSheetContent.displayName = 'HeroUINative.BottomSheetContent';
