import {
  forwardRef,
  useCallback,
  useId,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';
import { Platform, View, type GestureResponderEvent } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useThemeColor } from '../../helpers/external/hooks';
import {
  HeroText,
  useHasDefaultThemeBackground,
} from '../../helpers/internal/components';
import { AnimationSettingsProvider } from '../../helpers/internal/contexts';
import type { PressableRef, TextRef } from '../../helpers/internal/types';
import { createContext } from '../../helpers/internal/utils';
import TrueSheetReanimatedPackage from '../../optional/true-sheet-reanimated';
import { CloseButton } from '../close-button';
import {
  useBottomSheetAnimation,
  useBottomSheetRootAnimation,
} from './bottom-sheet.animation';
import {
  DEFAULT_DETENTS,
  DISPLAY_NAME,
  MISSING_PACKAGE_ERROR,
} from './bottom-sheet.constants';
import {
  bottomSheetClassNames,
  bottomSheetStyleSheet,
} from './bottom-sheet.styles';
import type {
  BottomSheetCloseProps,
  BottomSheetContextValue,
  BottomSheetDescriptionProps,
  BottomSheetProps,
  BottomSheetRef,
  BottomSheetTitleProps,
} from './bottom-sheet.types';

const ReanimatedTrueSheet = TrueSheetReanimatedPackage?.ReanimatedTrueSheet;
const ReanimatedTrueSheetProvider =
  TrueSheetReanimatedPackage?.ReanimatedTrueSheetProvider;

const [BottomSheetProvider, useBottomSheetContext] =
  createContext<BottomSheetContextValue>({
    name: 'BottomSheetContext',
    errorMessage:
      'BottomSheet.Close, Title, and Description cannot be rendered outside BottomSheet',
  });

// --------------------------------------------------

const BottomSheetRoot = forwardRef<BottomSheetRef, BottomSheetProps>(
  (
    {
      children,
      name: nameProp,
      detents = DEFAULT_DETENTS,
      background,
      backgroundColor,
      backgroundBlur,
      contentContainerClassName,
      grabber = true,
      animation,
      ...restProps
    },
    ref
  ) => {
    const nativeID = useId();
    const name = nameProp ?? nativeID;

    const hasDefaultThemeBackground = useHasDefaultThemeBackground();
    const themeColorOverlay = useThemeColor('overlay');

    const { isAllAnimationsDisabled } = useBottomSheetRootAnimation({
      animation,
    });

    /**
     * A theme with its own background (glass) keeps the platform's sheet
     * material (Liquid Glass on iOS 26+); other themes paint the sheet with
     * the overlay token. `background` and `backgroundBlur` take that slot —
     * an opaque color would cover them.
     */
    const resolvedBackgroundColor =
      backgroundColor ??
      (hasDefaultThemeBackground || background != null || backgroundBlur
        ? undefined
        : themeColorOverlay);

    const resolvedContentContainerClassName =
      bottomSheetClassNames.contentContainer({
        topInset: Platform.OS === 'android' && grabber ? 'grabber' : 'default',
        className: contentContainerClassName,
      });

    const sheetRef = useRef<BottomSheetRef>(null);
    useImperativeHandle(ref, () => sheetRef.current as BottomSheetRef, []);

    const dismiss = useCallback(() => {
      sheetRef.current?.dismiss();
    }, []);

    const contextValue = useMemo(
      () => ({ nativeID, dismiss }),
      [nativeID, dismiss]
    );

    const animationSettingsContextValue = useMemo(
      () => ({ isAllAnimationsDisabled }),
      [isAllAnimationsDisabled]
    );

    if (!ReanimatedTrueSheet || !ReanimatedTrueSheetProvider) {
      throw new Error(MISSING_PACKAGE_ERROR);
    }

    return (
      <AnimationSettingsProvider value={animationSettingsContextValue}>
        <BottomSheetProvider value={contextValue}>
          <ReanimatedTrueSheetProvider>
            <ReanimatedTrueSheet
              ref={sheetRef}
              name={name}
              detents={detents}
              background={background}
              backgroundColor={resolvedBackgroundColor}
              backgroundBlur={backgroundBlur}
              grabber={grabber}
              {...restProps}
            >
              <View
                role="dialog"
                nativeID={nativeID}
                aria-labelledby={`${nativeID}_label`}
                aria-describedby={`${nativeID}_desc`}
                aria-modal={true}
                className={resolvedContentContainerClassName}
              >
                <GestureHandlerRootView
                  style={bottomSheetStyleSheet.gestureRoot}
                >
                  {children}
                </GestureHandlerRootView>
              </View>
            </ReanimatedTrueSheet>
          </ReanimatedTrueSheetProvider>
        </BottomSheetProvider>
      </AnimationSettingsProvider>
    );
  }
);

// --------------------------------------------------

const BottomSheetClose = forwardRef<PressableRef, BottomSheetCloseProps>(
  ({ onPress: onPressProp, ...props }, ref) => {
    const { dismiss } = useBottomSheetContext();

    const onPress = (event: GestureResponderEvent) => {
      dismiss();
      if (typeof onPressProp === 'function') {
        onPressProp(event);
      }
    };

    return <CloseButton ref={ref} onPress={onPress} {...props} />;
  }
);

// --------------------------------------------------

const BottomSheetTitle = forwardRef<TextRef, BottomSheetTitleProps>(
  ({ className, ...props }, ref) => {
    const { nativeID } = useBottomSheetContext();

    return (
      <HeroText
        ref={ref}
        role="heading"
        accessibilityRole="header"
        nativeID={`${nativeID}_label`}
        className={bottomSheetClassNames.label({ className })}
        {...props}
      />
    );
  }
);

// --------------------------------------------------

const BottomSheetDescription = forwardRef<TextRef, BottomSheetDescriptionProps>(
  ({ className, ...props }, ref) => {
    const { nativeID } = useBottomSheetContext();

    return (
      <HeroText
        ref={ref}
        accessibilityRole="text"
        nativeID={`${nativeID}_desc`}
        className={bottomSheetClassNames.description({ className })}
        {...props}
      />
    );
  }
);

// --------------------------------------------------

BottomSheetRoot.displayName = DISPLAY_NAME.ROOT;
BottomSheetClose.displayName = DISPLAY_NAME.CLOSE;
BottomSheetTitle.displayName = DISPLAY_NAME.TITLE;
BottomSheetDescription.displayName = DISPLAY_NAME.DESCRIPTION;

/**
 * Bottom sheet presented natively (sheet presentation controller on iOS,
 * native bottom sheet on Android) through `@lodev09/react-native-true-sheet`.
 * Control it through its ref: `present()`, `resize()`, `dismiss()`, and
 * `dismissStack()`.
 *
 * @component BottomSheet - The sheet. Forwards sheet options such as
 * `detents`, `dimmed`, `dimColor`, `dimOpacity`, `dimBlur`, `background`,
 * `backgroundBlur`, `header`, `footer`, and `scrollableRef`.
 *
 * @component BottomSheet.Close - Close button that dismisses the sheet.
 *
 * @component BottomSheet.Title - Sheet title, linked for accessibility.
 *
 * @component BottomSheet.Description - Sheet description, linked for
 * accessibility.
 *
 * @see Full documentation: https://heroui.com/docs/native/components/bottom-sheet
 */
const BottomSheet = Object.assign(BottomSheetRoot, {
  /** @optional Close button for the sheet */
  Close: BottomSheetClose,
  /** @optional Sheet title text */
  Title: BottomSheetTitle,
  /** @optional Sheet description text */
  Description: BottomSheetDescription,
});

export { useBottomSheetAnimation };
export default BottomSheet;
