import { forwardRef, useCallback, useId, useRef } from 'react';
import { Platform, View, type GestureResponderEvent } from 'react-native';
import { useThemeColor } from '../../helpers/external/hooks';
import { HeroText } from '../../helpers/internal/components';
import { useLibraryTheme } from '../../helpers/internal/hooks';
import type { PressableRef, TextRef } from '../../helpers/internal/types';
import { createContext } from '../../helpers/internal/utils';
import TrueSheetPackage from '../../optional/true-sheet';
import TrueSheetReanimatedPackage from '../../optional/true-sheet-reanimated';
import { CloseButton } from '../close-button';
import {
  MISSING_PACKAGE_ERROR,
  useNativeBottomSheetAnimation,
} from './native-bottom-sheet.animation';
import { DEFAULT_DETENTS, DISPLAY_NAME } from './native-bottom-sheet.constants';
import { nativeBottomSheetClassNames } from './native-bottom-sheet.styles';
import type {
  NativeBottomSheetCloseProps,
  NativeBottomSheetDescriptionProps,
  NativeBottomSheetProps,
  NativeBottomSheetRef,
  NativeBottomSheetTitleProps,
} from './native-bottom-sheet.types';

const ReanimatedTrueSheet = TrueSheetReanimatedPackage?.ReanimatedTrueSheet;
const ReanimatedTrueSheetProvider =
  TrueSheetReanimatedPackage?.ReanimatedTrueSheetProvider;

/**
 * `name` registers the sheet with TrueSheet, which is how sub-components
 * reach it without a ref; `nativeID` links the title and description.
 */
const [NativeBottomSheetProvider, useNativeBottomSheet] = createContext<{
  name: string;
  nativeID: string;
}>({
  name: 'NativeBottomSheetContext',
  errorMessage:
    'NativeBottomSheet.Close, Title, and Description cannot be rendered outside NativeBottomSheet',
});

// --------------------------------------------------

const NativeBottomSheetRoot = forwardRef<
  NativeBottomSheetRef,
  NativeBottomSheetProps
>(
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
      onWillPresent,
      ...restProps
    },
    ref
  ) => {
    const nativeID = useId();
    const name = nameProp ?? nativeID;

    /**
     * TrueSheet binds lifecycle handlers once and reads the latest listener
     * from that stable callback. An inline `onWillPresent` swapped on each
     * render never reaches the native sheet, so focus-on-present (keyboard
     * rising with the sheet) would be dropped.
     */
    const onWillPresentRef = useRef(onWillPresent);
    onWillPresentRef.current = onWillPresent;
    const handleWillPresent = useCallback<
      NonNullable<NativeBottomSheetProps['onWillPresent']>
    >((event) => {
      onWillPresentRef.current?.(event);
    }, []);

    const libraryTheme = useLibraryTheme();
    const themeColorOverlay = useThemeColor('overlay');

    /**
     * iPhone edge-attached sheets do not pad non-scroll content. A footer
     * absorbs the inset, a plugged scrollable gets it from
     * `contentInsetAdjustment`, and Android adds it to the detent height.
     * `insetAdjustment="never"` opts out so the caller can pad themselves.
     */
    const shouldInsetBottomSafeArea =
      Platform.OS === 'ios' &&
      Platform.isPad !== true &&
      insetAdjustment !== 'never' &&
      footer == null &&
      scrollableRef == null;

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
      nativeBottomSheetClassNames.contentContainer({
        bottomInset: shouldInsetBottomSafeArea ? 'safe' : 'padding',
        className: contentContainerClassName,
      });

    if (!ReanimatedTrueSheet || !ReanimatedTrueSheetProvider) {
      throw new Error(MISSING_PACKAGE_ERROR);
    }

    return (
      <NativeBottomSheetProvider value={{ name, nativeID }}>
        <ReanimatedTrueSheetProvider>
          <ReanimatedTrueSheet
            ref={ref}
            name={name}
            detents={detents}
            background={background}
            backgroundColor={resolvedBackgroundColor}
            backgroundBlur={backgroundBlur}
            footer={footer}
            scrollableRef={scrollableRef}
            insetAdjustment={insetAdjustment}
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
              {children}
            </View>
          </ReanimatedTrueSheet>
        </ReanimatedTrueSheetProvider>
      </NativeBottomSheetProvider>
    );
  }
);

// --------------------------------------------------

const NativeBottomSheetClose = forwardRef<
  PressableRef,
  NativeBottomSheetCloseProps
>(({ onPress: onPressProp, ...props }, ref) => {
  const { name } = useNativeBottomSheet();

  const onPress = (event: GestureResponderEvent) => {
    TrueSheetPackage.TrueSheet.dismiss(name);
    if (typeof onPressProp === 'function') {
      onPressProp(event);
    }
  };

  return <CloseButton ref={ref} onPress={onPress} {...props} />;
});

// --------------------------------------------------

const NativeBottomSheetTitle = forwardRef<TextRef, NativeBottomSheetTitleProps>(
  ({ className, ...props }, ref) => {
    const { nativeID } = useNativeBottomSheet();

    return (
      <HeroText
        ref={ref}
        role="heading"
        accessibilityRole="header"
        nativeID={`${nativeID}_label`}
        className={nativeBottomSheetClassNames.label({ className })}
        {...props}
      />
    );
  }
);

// --------------------------------------------------

const NativeBottomSheetDescription = forwardRef<
  TextRef,
  NativeBottomSheetDescriptionProps
>(({ className, ...props }, ref) => {
  const { nativeID } = useNativeBottomSheet();

  return (
    <HeroText
      ref={ref}
      accessibilityRole="text"
      nativeID={`${nativeID}_desc`}
      className={nativeBottomSheetClassNames.description({ className })}
      {...props}
    />
  );
});

// --------------------------------------------------

NativeBottomSheetRoot.displayName = DISPLAY_NAME.ROOT;
NativeBottomSheetClose.displayName = DISPLAY_NAME.CLOSE;
NativeBottomSheetTitle.displayName = DISPLAY_NAME.TITLE;
NativeBottomSheetDescription.displayName = DISPLAY_NAME.DESCRIPTION;

/**
 * Bottom sheet presented natively (sheet presentation controller on iOS,
 * native bottom sheet on Android) through `@lodev09/react-native-true-sheet`.
 * Control it through its ref: `present()`, `resize()`, `dismiss()`, and
 * `dismissStack()`.
 *
 * @component NativeBottomSheet - The sheet. Forwards sheet options such as
 * `detents`, `dimmed`, `dimColor`, `dimOpacity`, `background`,
 * `backgroundBlur`, `header`, `footer`, and `scrollableRef`.
 *
 * @component NativeBottomSheet.Close - Close button that dismisses the sheet.
 *
 * @component NativeBottomSheet.Title - Sheet title, linked for accessibility.
 *
 * @component NativeBottomSheet.Description - Sheet description, linked for
 * accessibility.
 */
const NativeBottomSheet = Object.assign(NativeBottomSheetRoot, {
  /** @optional Close button for the sheet */
  Close: NativeBottomSheetClose,
  /** @optional Sheet title text */
  Title: NativeBottomSheetTitle,
  /** @optional Sheet description text */
  Description: NativeBottomSheetDescription,
});

export { useNativeBottomSheetAnimation };
export default NativeBottomSheet;
