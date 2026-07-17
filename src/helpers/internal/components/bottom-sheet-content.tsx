import type BottomSheet from '@gorhom/bottom-sheet';
import type {
  BottomSheetProps,
  BottomSheetBackgroundProps as GorhomBottomSheetBackgroundProps,
} from '@gorhom/bottom-sheet';
import { forwardRef, useMemo, type FC } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { View } from 'react-native';
import type { SharedValue } from 'react-native-reanimated';
import { ReduceMotion } from 'react-native-reanimated';
import { withUniwind } from 'uniwind';
import { useBottomSheetContentAnimation } from '../../../components/bottom-sheet/bottom-sheet.animation';
import { DISPLAY_NAME as BOTTOM_SHEET_DISPLAY_NAME } from '../../../components/bottom-sheet/bottom-sheet.constants';
import { bottomSheetClassNames } from '../../../components/bottom-sheet/bottom-sheet.styles';
import type { BottomSheetBackgroundProps } from '../../../components/bottom-sheet/bottom-sheet.types';
import { GlassView } from '../../../components/glass-view';
import GorhomBottomSheetPackage from '../../../optional/gorhom-bottom-sheet';
import { BottomSheetIsDraggingProvider } from '../contexts';
import { useBottomSheetGestureHandlers, useLibraryTheme } from '../hooks';
import { usePopupBottomSheetContentAnimation } from '../hooks/use-popup-bottom-sheet-content-animation';
import type { BaseBottomSheetContentProps } from '../types/bottom-sheet';
import { BottomSheetContentContainer } from './bottom-sheet-content-container';

const StyledBottomSheet = withUniwind(GorhomBottomSheetPackage?.default);

/**
 * Generic absolute-fill background container rendered inside the sheet
 * background surface, clipped to the sheet's top radius. With no `children`,
 * the active library theme decides the default content: `glass` renders a
 * `GlassView` blur layer; other themes render nothing. Pass `children` to
 * host arbitrary content (gradients, images) with the container's
 * positioning and clipping applied. Exposed as `BottomSheet.Background`;
 * use it inside a custom gorhom `backgroundComponent` to customize the
 * default layer.
 */
export const BottomSheetBackground = forwardRef<
  View,
  BottomSheetBackgroundProps
>(({ children, className, ...props }, ref) => {
  const theme = useLibraryTheme();

  const backgroundClassName = bottomSheetClassNames.background({ className });

  const themeContent = theme === 'glass' ? <GlassView /> : null;

  return (
    <View ref={ref} className={backgroundClassName} {...props}>
      {children ?? themeContent}
    </View>
  );
});

BottomSheetBackground.displayName = BOTTOM_SHEET_DISPLAY_NAME.BACKGROUND;

/**
 * Default gorhom `backgroundComponent`. Renders the sheet background surface
 * (styles arrive via gorhom's merged `style` prop, including the
 * `backgroundClassName`-derived styles) with the theme-aware background
 * layer inside.
 */
const BottomSheetDefaultBackground: FC<GorhomBottomSheetBackgroundProps> = ({
  style,
}) => {
  return (
    <View style={style} pointerEvents="none">
      <BottomSheetBackground />
    </View>
  );
};

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

    /**
     * Theme-aware background layer support: render the default background
     * component unless the caller provides their own `backgroundComponent`.
     */
    const backgroundComponent =
      restProps.backgroundComponent ?? BottomSheetDefaultBackground;

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
          backgroundComponent={backgroundComponent}
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
