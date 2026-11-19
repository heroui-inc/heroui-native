import {
  Children,
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
import type {
  PressableRef,
  TextRef,
  ViewRef,
} from '../../helpers/internal/types';
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
  BottomSheetBodyProps,
  BottomSheetCloseProps,
  BottomSheetContentProps,
  BottomSheetContextValue,
  BottomSheetDescriptionProps,
  BottomSheetFooterProps,
  BottomSheetHeaderProps,
  BottomSheetProps,
  BottomSheetRef,
  BottomSheetTitleProps,
} from './bottom-sheet.types';
import { getStickyPart, isStickyPart } from './bottom-sheet.utils';

const ReanimatedTrueSheet = TrueSheetReanimatedPackage?.ReanimatedTrueSheet;
const ReanimatedTrueSheetProvider =
  TrueSheetReanimatedPackage?.ReanimatedTrueSheetProvider;

const [BottomSheetProvider, useBottomSheetContext] =
  createContext<BottomSheetContextValue>({
    name: 'BottomSheetContext',
    errorMessage:
      'BottomSheet.Content, Header, Body, Footer, Close, Title, and Description cannot be rendered outside BottomSheet',
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
      header,
      footer,
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

    /**
     * A sticky `BottomSheet.Header` / `BottomSheet.Footer` renders in the
     * sheet's own header / footer slot, which stays in place while the
     * content scrolls. Each gets its own gesture root, like the content.
     */
    const stickyHeader = getStickyPart(children, DISPLAY_NAME.HEADER);
    const stickyFooter = getStickyPart(children, DISPLAY_NAME.FOOTER);

    const hasGrabberInset = Platform.OS === 'android' && grabber;

    const sheetRef = useRef<BottomSheetRef>(null);
    useImperativeHandle(ref, () => sheetRef.current as BottomSheetRef, []);

    const dismiss = useCallback(() => {
      sheetRef.current?.dismiss();
    }, []);

    const hasStickyHeader = stickyHeader != null;
    const hasStickyFooter = stickyFooter != null;

    const contextValue = useMemo(
      () => ({
        nativeID,
        dismiss,
        hasGrabberInset,
        hasStickyHeader,
        hasStickyFooter,
      }),
      [nativeID, dismiss, hasGrabberInset, hasStickyHeader, hasStickyFooter]
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
              header={
                stickyHeader ? (
                  <GestureHandlerRootView
                    style={bottomSheetStyleSheet.gestureRoot}
                  >
                    {stickyHeader}
                  </GestureHandlerRootView>
                ) : (
                  header
                )
              }
              footer={
                stickyFooter ? (
                  <GestureHandlerRootView
                    style={bottomSheetStyleSheet.gestureRoot}
                  >
                    {stickyFooter}
                  </GestureHandlerRootView>
                ) : (
                  footer
                )
              }
              grabber={grabber}
              {...restProps}
            >
              {children}
            </ReanimatedTrueSheet>
          </ReanimatedTrueSheetProvider>
        </BottomSheetProvider>
      </AnimationSettingsProvider>
    );
  }
);

// --------------------------------------------------

const BottomSheetContent = forwardRef<ViewRef, BottomSheetContentProps>(
  ({ children, className, ...props }, ref) => {
    const { nativeID, hasGrabberInset, hasStickyHeader, hasStickyFooter } =
      useBottomSheetContext();

    const contentClassName = bottomSheetClassNames.content({
      topInset: hasStickyHeader
        ? 'none'
        : hasGrabberInset
          ? 'grabber'
          : 'default',
      bottomInset: hasStickyFooter ? 'none' : 'default',
      className,
    });

    return (
      <View
        ref={ref}
        role="dialog"
        nativeID={nativeID}
        aria-labelledby={`${nativeID}_label`}
        aria-describedby={`${nativeID}_desc`}
        aria-modal={true}
        className={contentClassName}
        {...props}
      >
        <GestureHandlerRootView style={bottomSheetStyleSheet.gestureRoot}>
          {Children.toArray(children).filter((child) => !isStickyPart(child))}
        </GestureHandlerRootView>
      </View>
    );
  }
);

// --------------------------------------------------

const BottomSheetHeader = forwardRef<ViewRef, BottomSheetHeaderProps>(
  ({ isSticky = false, className, ...props }, ref) => {
    const { hasGrabberInset } = useBottomSheetContext();

    const headerClassName = bottomSheetClassNames.header({
      isSticky,
      topInset: isSticky && hasGrabberInset ? 'grabber' : 'default',
      className,
    });

    return <View ref={ref} className={headerClassName} {...props} />;
  }
);

// --------------------------------------------------

const BottomSheetBody = forwardRef<ViewRef, BottomSheetBodyProps>(
  ({ className, ...props }, ref) => {
    const bodyClassName = bottomSheetClassNames.body({ className });

    return <View ref={ref} className={bodyClassName} {...props} />;
  }
);

// --------------------------------------------------

const BottomSheetFooter = forwardRef<ViewRef, BottomSheetFooterProps>(
  ({ isSticky = false, className, ...props }, ref) => {
    const footerClassName = bottomSheetClassNames.footer({
      isSticky,
      className,
    });

    return <View ref={ref} className={footerClassName} {...props} />;
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
BottomSheetContent.displayName = DISPLAY_NAME.CONTENT;
BottomSheetHeader.displayName = DISPLAY_NAME.HEADER;
BottomSheetBody.displayName = DISPLAY_NAME.BODY;
BottomSheetFooter.displayName = DISPLAY_NAME.FOOTER;
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
 * `backgroundBlur`, and `scrollableRef`.
 *
 * @component BottomSheet.Content - Dialog container that pads the sheet and
 * holds its parts.
 *
 * @component BottomSheet.Header - Top section. `isSticky` pins it while the
 * content scrolls.
 *
 * @component BottomSheet.Body - Main section.
 *
 * @component BottomSheet.Footer - Bottom section, usually the actions.
 * `isSticky` pins it while the content scrolls.
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
  /** Dialog container that pads the sheet and holds its parts */
  Content: BottomSheetContent,
  /** @optional Top section, sticky with `isSticky` */
  Header: BottomSheetHeader,
  /** @optional Main section */
  Body: BottomSheetBody,
  /** @optional Bottom section, sticky with `isSticky` */
  Footer: BottomSheetFooter,
  /** @optional Close button for the sheet */
  Close: BottomSheetClose,
  /** @optional Sheet title text */
  Title: BottomSheetTitle,
  /** @optional Sheet description text */
  Description: BottomSheetDescription,
});

export { useBottomSheetAnimation };
export default BottomSheet;
