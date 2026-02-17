import { forwardRef, useMemo } from 'react';
import { type TextInput as TextInputType, View } from 'react-native';
import { useThemeColor } from '../../helpers/external/hooks';
import { CloseIcon } from '../../helpers/internal/components';
import {
  AnimationSettingsProvider,
  FormFieldProvider,
  useFormField,
} from '../../helpers/internal/contexts';
import type { ViewRef } from '../../helpers/internal/types';
import { Button } from '../button';
import { Input } from '../input';
import { useSearchFieldRootAnimation } from './search-field.animation';
import { DISPLAY_NAME } from './search-field.constants';
import { searchFieldClassNames } from './search-field.styles';
import type {
  SearchFieldClearButtonProps,
  SearchFieldGroupProps,
  SearchFieldInputProps,
  SearchFieldProps,
  SearchFieldSearchIconProps,
} from './search-field.types';
import { SearchIcon } from './search-icon';

const useSearchField = useFormField;

// --------------------------------------------------
const SearchFieldRoot = forwardRef<ViewRef, SearchFieldProps>((props, ref) => {
  const {
    children,
    className,
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

  const formFieldContextValue = useMemo(
    () => ({ isDisabled, isInvalid, isRequired, hasFieldPadding: true }),
    [isDisabled, isInvalid, isRequired]
  );

  const animationSettingsContextValue = useMemo(
    () => ({
      isAllAnimationsDisabled,
    }),
    [isAllAnimationsDisabled]
  );

  return (
    <AnimationSettingsProvider value={animationSettingsContextValue}>
      <FormFieldProvider value={formFieldContextValue}>
        <View ref={ref} className={rootClassName} {...restProps}>
          {children}
        </View>
      </FormFieldProvider>
    </AnimationSettingsProvider>
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
      placeholder = 'Search...',
      returnKeyType = 'search',
      accessibilityRole = 'search',
      accessibilityLabel = 'Search',
      ...restProps
    } = props;

    const inputClassName = searchFieldClassNames.input({ className });

    return (
      <Input
        ref={ref}
        className={inputClassName}
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
    const { iconProps, className, children, ...restProps } = props;

    const themeColorMuted = useThemeColor('muted');

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
 * Compound SearchField component with sub-components
 *
 * @component SearchField - Root container that provides form item state context
 * (isDisabled, isInvalid, isRequired) and animation settings to all children.
 *
 * @component SearchField.Group - Flex-row container for the search icon, input, and clear button.
 *
 * @component SearchField.SearchIcon - Magnifying glass icon positioned absolutely on the left.
 *
 * @component SearchField.Input - Wraps the Input component with search-specific defaults:
 * "Search..." placeholder, left padding for the search icon, and search a11y role.
 * Consumes form state from FormFieldProvider context automatically.
 *
 * @component SearchField.ClearButton - Small button to clear the search input,
 * styled similarly to CloseButton with size-5 and 8px icon.
 *
 * Props flow from SearchField to sub-components via FormFieldProvider context.
 *
 * @see Full documentation: https://v3.heroui.com/docs/native/components/search-field
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
