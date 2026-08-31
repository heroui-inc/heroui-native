import { forwardRef, useLayoutEffect, useMemo, useState } from 'react';
import {
  type GestureResponderEvent,
  type TextInput as TextInputType,
  View,
} from 'react-native';
import { useThemeColor } from '../../helpers/external/hooks';
import { CloseIcon } from '../../helpers/internal/components';
import {
  AnimationSettingsProvider,
  FormFieldProvider,
} from '../../helpers/internal/contexts';
import type { ViewRef } from '../../helpers/internal/types';
import { createContext } from '../../helpers/internal/utils';
import { Button } from '../button';
import { Input } from '../input';
import { useSearchFieldRootAnimation } from './search-field.animation';
import { DISPLAY_NAME } from './search-field.constants';
import { searchFieldClassNames } from './search-field.styles';
import type {
  SearchFieldClearButtonProps,
  SearchFieldContextType,
  SearchFieldGroupProps,
  SearchFieldInputProps,
  SearchFieldProps,
  SearchFieldSearchIconProps,
  SearchFieldSlotsContextType,
} from './search-field.types';
import { SearchIcon } from './search-icon';

const [SearchFieldProvider, useSearchField] =
  createContext<SearchFieldContextType>({
    name: 'SearchFieldContext',
    strict: false,
  });

const [SearchFieldSlotsProvider, useSearchFieldSlots] =
  createContext<SearchFieldSlotsContextType>({
    name: 'SearchFieldSlotsContext',
    strict: false,
  });

/**
 * Registers an optional SearchField slot for the lifetime of the caller.
 * The effect still runs when the caller later returns `null` (ClearButton
 * with an empty value), so Input can keep trailing padding and avoid a
 * text jump when the first character is typed.
 *
 * @param setPresent - Slot setter from SearchFieldSlotsContext, or
 *   `undefined` when rendered outside SearchField
 */
function useRegisterSearchFieldSlot(
  setPresent: ((isPresent: boolean) => void) | undefined
): void {
  useLayoutEffect(() => {
    if (typeof setPresent !== 'function') {
      return;
    }

    setPresent(true);

    return () => {
      setPresent(false);
    };
  }, [setPresent]);
}

// --------------------------------------------------

const SearchFieldRoot = forwardRef<ViewRef, SearchFieldProps>((props, ref) => {
  const {
    children,
    className,
    value,
    onChange,
    isDisabled = false,
    isInvalid = false,
    isRequired = false,
    animation,
    ...restProps
  } = props;

  const rootClassName = searchFieldClassNames.root({ className });

  const { isAllAnimationsDisabled } = useSearchFieldRootAnimation({
    animation,
  });

  const [hasSearchIcon, setHasSearchIcon] = useState(false);
  const [hasClearButton, setHasClearButton] = useState(false);

  const searchFieldContextValue = useMemo<SearchFieldContextType>(
    () => ({ value, onChange, isDisabled, isInvalid, isRequired }),
    [value, onChange, isDisabled, isInvalid, isRequired]
  );

  const searchFieldSlotsContextValue = useMemo<SearchFieldSlotsContextType>(
    () => ({
      hasSearchIcon,
      hasClearButton,
      setHasSearchIcon,
      setHasClearButton,
    }),
    [hasSearchIcon, hasClearButton]
  );

  const formFieldContextValue = useMemo(
    () => ({ isDisabled, isInvalid, isRequired, hasFieldPadding: false }),
    [isDisabled, isInvalid, isRequired]
  );

  const animationSettingsContextValue = useMemo(
    () => ({
      isAllAnimationsDisabled,
    }),
    [isAllAnimationsDisabled]
  );

  return (
    <SearchFieldProvider value={searchFieldContextValue}>
      <SearchFieldSlotsProvider value={searchFieldSlotsContextValue}>
        <AnimationSettingsProvider value={animationSettingsContextValue}>
          <FormFieldProvider value={formFieldContextValue}>
            <View ref={ref} className={rootClassName} {...restProps}>
              {children}
            </View>
          </FormFieldProvider>
        </AnimationSettingsProvider>
      </SearchFieldSlotsProvider>
    </SearchFieldProvider>
  );
});

// --------------------------------------------------

const SearchFieldGroup = forwardRef<ViewRef, SearchFieldGroupProps>(
  (props, ref) => {
    const { children, className, ...restProps } = props;

    const groupClassName = searchFieldClassNames.group({ className });

    return (
      <View ref={ref} className={groupClassName} {...restProps}>
        {children}
      </View>
    );
  }
);

// --------------------------------------------------

const SearchFieldSearchIcon = forwardRef<View, SearchFieldSearchIconProps>(
  (props, ref) => {
    const { children, className, iconProps, ...restProps } = props;

    const slots = useSearchFieldSlots();
    useRegisterSearchFieldSlot(slots?.setHasSearchIcon);

    const searchIconClassName = searchFieldClassNames.searchIcon({ className });

    return (
      <View
        ref={ref}
        className={searchIconClassName}
        pointerEvents="none"
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
        {...restProps}
      >
        {children ?? (
          <SearchIcon size={iconProps?.size} color={iconProps?.color} />
        )}
      </View>
    );
  }
);

// --------------------------------------------------

const SearchFieldInput = forwardRef<TextInputType, SearchFieldInputProps>(
  (props, ref) => {
    const {
      className,
      containerClassName: containerClassNameProp,
      placeholder = 'Search...',
      returnKeyType = 'search',
      accessibilityRole = 'search',
      accessibilityLabel = 'Search',
      ...restProps
    } = props;

    const searchField = useSearchField();
    const slots = useSearchFieldSlots();

    const inputClassName = searchFieldClassNames.input({
      hasSearchIcon: slots?.hasSearchIcon ?? false,
      hasClearButton: slots?.hasClearButton ?? false,
      className,
    });

    const inputContainerClassName = searchFieldClassNames.inputContainer({
      className: containerClassNameProp,
    });

    return (
      <Input
        ref={ref}
        className={inputClassName}
        containerClassName={inputContainerClassName}
        value={searchField?.value}
        onChangeText={searchField?.onChange}
        placeholder={placeholder}
        returnKeyType={returnKeyType}
        accessibilityRole={accessibilityRole}
        accessibilityLabel={accessibilityLabel}
        {...restProps}
      />
    );
  }
);

// --------------------------------------------------

const SearchFieldClearButton = forwardRef<View, SearchFieldClearButtonProps>(
  (props, ref) => {
    const { iconProps, className, children, onPress, ...restProps } = props;

    const searchField = useSearchField();
    const slots = useSearchFieldSlots();
    const themeColorMuted = useThemeColor('muted');

    /**
     * Register before the empty-value early return so composed ClearButtons
     * keep trailing input padding while they are visually hidden.
     */
    useRegisterSearchFieldSlot(slots?.setHasClearButton);

    if (searchField?.value !== undefined && searchField.value.length === 0) {
      return null;
    }

    const handlePress = (event: GestureResponderEvent) => {
      searchField?.onChange?.('');

      if (typeof onPress === 'function') {
        onPress(event);
      }
    };

    const clearButtonClassName = searchFieldClassNames.clearButton({
      className,
    });

    return (
      <Button
        ref={ref}
        variant="tertiary"
        size="sm"
        isIconOnly
        className={clearButtonClassName}
        hitSlop={8}
        accessibilityRole="button"
        accessibilityLabel="Clear search"
        onPress={handlePress}
        {...restProps}
      >
        {children ?? (
          <CloseIcon
            size={iconProps?.size ?? 14}
            color={iconProps?.color ?? themeColorMuted}
          />
        )}
      </Button>
    );
  }
);

// --------------------------------------------------

SearchFieldRoot.displayName = DISPLAY_NAME.SEARCH_FIELD;
SearchFieldGroup.displayName = DISPLAY_NAME.SEARCH_FIELD_GROUP;
SearchFieldSearchIcon.displayName = DISPLAY_NAME.SEARCH_FIELD_SEARCH_ICON;
SearchFieldInput.displayName = DISPLAY_NAME.SEARCH_FIELD_INPUT;
SearchFieldClearButton.displayName = DISPLAY_NAME.SEARCH_FIELD_CLEAR_BUTTON;

/**
 * Compound SearchField component with sub-components.
 *
 * @component SearchField - Root container that accepts `value`, `onChange`,
 * `isDisabled`, `isInvalid`, and `isRequired`, providing them to children via
 * SearchFieldContext. Also provides FormFieldProvider and animation settings.
 *
 * @component SearchField.Group - Flex-row container for the search icon, input,
 * and clear button.
 *
 * @component SearchField.SearchIcon - Magnifying glass icon positioned
 * absolutely on the leading edge (left in LTR, right in RTL). Registers
 * itself so Input reserves leading space only while this part is composed.
 *
 * @component SearchField.Input - Wraps the Input component with search-specific
 * defaults: "Search..." placeholder and search a11y role. Reserves leading
 * space when SearchIcon is composed and trailing space when ClearButton is
 * composed. Reads `value` / `onChangeText` from SearchFieldContext.
 *
 * @component SearchField.ClearButton - Small button that clears the search
 * input. Automatically hidden when value is empty. Calls `onChange("")` from
 * context on press. Registers itself so Input keeps trailing space while
 * this part is composed, including when it is visually hidden.
 *
 * @see Full documentation: https://heroui.com/docs/native/components/search-field
 */
const CompoundSearchField = Object.assign(SearchFieldRoot, {
  /** Flex-row container for search icon, input, and clear button */
  Group: SearchFieldGroup,
  /** Magnifying glass search icon */
  SearchIcon: SearchFieldSearchIcon,
  /** Text input with search-specific defaults */
  Input: SearchFieldInput,
  /** Small clear button to dismiss search text */
  ClearButton: SearchFieldClearButton,
});

export { useSearchField };
export default CompoundSearchField;
