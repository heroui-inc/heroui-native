import { LinearGradient } from 'expo-linear-gradient';
import { Button, cn, ScrollShadow, Select, useThemeColor } from 'heroui-native';
import { useState } from 'react';
import { TextInput, useWindowDimensions, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {
  KeyboardAvoidingView,
  KeyboardController,
} from 'react-native-keyboard-controller';
import { Easing, FadeInDown, FadeOutDown } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAppTheme } from '../../contexts/app-theme-context';
import { AppText } from '../app-text';
import { SelectBlurBackdrop } from './select-blur-backdrop';

KeyboardController.preload();

type CountryOption = {
  value: string;
  label: string;
  flag: string;
  code: string;
};

const COUNTRIES: CountryOption[] = [
  { value: 'US', label: 'United States', flag: '🇺🇸', code: '+1' },
  { value: 'GB', label: 'United Kingdom', flag: '🇬🇧', code: '+44' },
  { value: 'CA', label: 'Canada', flag: '🇨🇦', code: '+1' },
  { value: 'AU', label: 'Australia', flag: '🇦🇺', code: '+61' },
  { value: 'DE', label: 'Germany', flag: '🇩🇪', code: '+49' },
  { value: 'FR', label: 'France', flag: '🇫🇷', code: '+33' },
  { value: 'JP', label: 'Japan', flag: '🇯🇵', code: '+81' },
  { value: 'CN', label: 'China', flag: '🇨🇳', code: '+86' },
  { value: 'IN', label: 'India', flag: '🇮🇳', code: '+91' },
  { value: 'BR', label: 'Brazil', flag: '🇧🇷', code: '+55' },
];

/**
 * Component containing the searchable select content and state logic.
 * Manages search query state, filtering, and UI rendering.
 */
const SearchableSelectContent = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const { isDark } = useAppTheme();

  const [themeColorMuted, themeColorOverlay, themeColorSurface] = useThemeColor(
    ['muted', 'overlay', 'surface']
  );

  const { height } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const insetTop = insets.top + 12;
  const maxDialogHeight = (height - insetTop) / 2;

  /**
   * Filters countries based on the search query.
   * Case-insensitive search on country labels.
   */
  const filteredCountries = COUNTRIES.filter((country) =>
    country.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  /**
   * Resets the search query.
   * Called when a country is selected.
   */
  const resetSearch = () => {
    setSearchQuery('');
  };

  return (
    <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={24}>
      <Select.Content
        presentation="dialog"
        classNames={{
          content: cn('gap-2 rounded-3xl', isDark && 'bg-surface'),
        }}
        style={{ marginTop: insetTop, height: maxDialogHeight }}
        animation={{
          entering: FadeInDown.duration(250).easing(Easing.out(Easing.ease)),
          exiting: FadeOutDown.duration(200).easing(Easing.in(Easing.ease)),
        }}
      >
        <View className="flex-row items-center justify-between mb-2">
          <Select.ListLabel maxFontSizeMultiplier={1}>Country</Select.ListLabel>
          <Select.Close variant="ghost" />
        </View>
        <View className="w-full mb-2">
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search country..."
            placeholderTextColor={themeColorMuted}
            className="p-3 rounded-xl bg-surface-secondary/80 text-foreground"
            autoFocus
            maxFontSizeMultiplier={1}
          />
        </View>
        <ScrollShadow
          className="flex-1"
          LinearGradientComponent={LinearGradient}
          color={isDark ? themeColorSurface : themeColorOverlay}
        >
          <ScrollView keyboardShouldPersistTaps="handled">
            {filteredCountries.map((country) => (
              <Select.Item
                key={country.value}
                value={country.value}
                label={country.label}
                onPress={() => {
                  KeyboardController.dismiss();
                  resetSearch();
                }}
              >
                <View className="flex-row items-center gap-3 flex-1">
                  <AppText className="text-2xl" maxFontSizeMultiplier={1}>
                    {country.flag}
                  </AppText>
                  <AppText
                    className="text-sm text-muted w-10"
                    maxFontSizeMultiplier={1}
                  >
                    {country.code}
                  </AppText>
                  <AppText
                    className="text-base text-foreground flex-1"
                    maxFontSizeMultiplier={1}
                  >
                    {country.label}
                  </AppText>
                </View>
                <Select.ItemIndicator />
              </Select.Item>
            ))}
            {filteredCountries.length === 0 && (
              <AppText
                className="text-muted text-center mt-8"
                maxFontSizeMultiplier={1}
              >
                No countries found
              </AppText>
            )}
          </ScrollView>
        </ScrollShadow>
      </Select.Content>
    </KeyboardAvoidingView>
  );
};

export function SearchableDialogSelect() {
  const [value, setValue] = useState<CountryOption | undefined>();

  return (
    <Select
      presentation="dialog"
      value={value}
      onValueChange={(newValue) => {
        const country = COUNTRIES.find((c) => c.value === newValue?.value);
        setValue(country);
      }}
      className="flex-1"
    >
      <Select.Trigger variant="unstyled" asChild>
        <Button variant="tertiary">
          {value ? (
            <View className="flex-row items-center gap-2">
              <AppText className="text-base" maxFontSizeMultiplier={1}>
                {value.flag}
              </AppText>
              <AppText
                className="text-sm text-accent font-medium"
                maxFontSizeMultiplier={1}
              >
                {value.code}
              </AppText>
            </View>
          ) : (
            <AppText className="text-accent" maxFontSizeMultiplier={1}>
              Dialog
            </AppText>
          )}
        </Button>
      </Select.Trigger>
      <Select.Portal>
        <SelectBlurBackdrop />
        <SearchableSelectContent />
      </Select.Portal>
    </Select>
  );
}
