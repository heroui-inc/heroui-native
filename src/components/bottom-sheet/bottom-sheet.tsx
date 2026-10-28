import {
  forwardRef,
  useCallback,
  useId,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';
import {
  Platform,
  StyleSheet,
  View,
  type GestureResponderEvent,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useThemeColor } from '../../helpers/external/hooks';
import { HeroText } from '../../helpers/internal/components';
import { useLibraryTheme } from '../../helpers/internal/hooks';
import type { PressableRef, TextRef } from '../../helpers/internal/types';
import { createContext } from '../../helpers/internal/utils';
import TrueSheetReanimatedPackage from '../../optional/true-sheet-reanimated';
import { CloseButton } from '../close-button';
import {
  MISSING_PACKAGE_ERROR,
  useBottomSheetAnimation,
} from './bottom-sheet.animation';
import { DEFAULT_DETENTS, DISPLAY_NAME } from './bottom-sheet.constants';
import { bottomSheetClassNames } from './bottom-sheet.styles';
import type {
  BottomSheetCloseProps,
  BottomSheetDescriptionProps,
  BottomSheetProps,
  BottomSheetRef,
  BottomSheetTitleProps,
} from './bottom-sheet.types';

const ReanimatedTrueSheet = TrueSheetReanimatedPackage?.ReanimatedTrueSheet;
const ReanimatedTrueSheetProvider =
  TrueSheetReanimatedPackage?.ReanimatedTrueSheetProvider;

/**
 * `dismiss` goes through the sheet's own ref: TrueSheet's static methods
 * (`TrueSheet.dismiss(name)`) are rejected on web. `nativeID` links the
 * title and description.
 */
const [BottomSheetProvider, useBottomSheetContext] = createContext<{
  nativeID: string;
  dismiss: () => void;
}>({
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
      footer,
      scrollableRef,
      insetAdjustment,
      grabber = true,
      onWillPresent,
      ...restProps
    },
    ref
  ) => {
    const nativeID = useId();
    const name = nameProp ?? nativeID;

    const sheetRef = useRef<BottomSheetRef>(null);
    useImperativeHandle(ref, () => sheetRef.current as BottomSheetRef, []);

    const dismiss = useCallback(() => {
      sheetRef.current?.dismiss();
    }, []);

    const contextValue = useMemo(
      () => ({ nativeID, dismiss }),
      [nativeID, dismiss]
    );

    /**
     * TrueSheet binds lifecycle handlers once and reads the latest listener
     * from that stable callback. An inline `onWillPresent` swapped on each
     * render never reaches the native sheet, so focus-on-present (keyboard
     * rising with the sheet) would be dropped.
     */
    const onWillPresentRef = useRef(onWillPresent);
    onWillPresentRef.current = onWillPresent;
    const handleWillPresent = useCallback<
      NonNullable<BottomSheetProps['onWillPresent']>
    >((event) => {
      onWillPresentRef.current?.(event);
    }, []);

    const libraryTheme = useLibraryTheme();
    const themeColorOverlay = useThemeColor('overlay');

    /**
     * The glass theme keeps the platform's own sheet material (Liquid Glass
     * on iOS 26+); other themes paint the sheet with the overlay token.
     * `background` and `backgroundBlur` take that slot — an opaque color
     * would cover them.
     */
    const resolvedBackgroundColor =
      backgroundColor ??
      (libraryTheme === 'glass' || background != null || backgroundBlur
        ? undefined
        : themeColorOverlay);

    const resolvedContentContainerClassName =
      bottomSheetClassNames.contentContainer({
        topInset: Platform.OS === 'android' && grabber ? 'grabber' : 'default',
        className: contentContainerClassName,
      });

    if (!ReanimatedTrueSheet || !ReanimatedTrueSheetProvider) {
      throw new Error(MISSING_PACKAGE_ERROR);
    }

    return (
      <BottomSheetProvider value={contextValue}>
        <ReanimatedTrueSheetProvider>
          <ReanimatedTrueSheet
            ref={sheetRef}
            name={name}
            detents={detents}
            background={background}
            backgroundColor={resolvedBackgroundColor}
            backgroundBlur={backgroundBlur}
            footer={footer}
            scrollableRef={scrollableRef}
            insetAdjustment={insetAdjustment}
            grabber={grabber}
            onWillPresent={handleWillPresent}
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
              <GestureHandlerRootView style={styles.gestureRoot}>
                {children}
              </GestureHandlerRootView>
            </View>
          </ReanimatedTrueSheet>
        </ReanimatedTrueSheetProvider>
      </BottomSheetProvider>
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
 */
const BottomSheet = Object.assign(BottomSheetRoot, {
  /** @optional Close button for the sheet */
  Close: BottomSheetClose,
  /** @optional Sheet title text */
  Title: BottomSheetTitle,
  /** @optional Sheet description text */
  Description: BottomSheetDescription,
});

const styles = StyleSheet.create({
  /**
   * The sheet is presented outside the app's native root, so on Android
   * gesture-handler gestures (Slider, swipeable content) need their own root
   * inside it. `flexGrow`, not GH's default `flex: 1`: the content wraps its
   * natural height for the `auto` detent, and `flex: 1` would collapse it.
   */
  gestureRoot: {
    flexGrow: 1,
  },
});

export { useBottomSheetAnimation };
export default BottomSheet;
