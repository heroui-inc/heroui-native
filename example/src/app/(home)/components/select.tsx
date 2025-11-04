/* eslint-disable react-native/no-inline-styles */
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { Button, Divider, Select, useThemeColor } from 'heroui-native';
import React, { useState } from 'react';
import { Platform, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppText } from '../../../components/app-text';
import type { UsageVariant } from '../../../components/component-presentation/types';
import { UsageVariantFlatList } from '../../../components/component-presentation/usage-variant-flatlist';
import { PlacementSelect } from '../../../components/select/placement-select';
import { SearchableDialogSelect } from '../../../components/select/searchable-dialog-select';
import { SelectButtonTrigger } from '../../../components/select/select-button-trigger';

type SelectOption = {
  value: string;
  label: string;
};

type CountryOption = {
  value: string;
  label: string;
  flag: string;
  code: string;
};

const US_STATES: SelectOption[] = [
  { value: 'CA', label: 'California' },
  { value: 'NY', label: 'New York' },
  { value: 'TX', label: 'Texas' },
  { value: 'FL', label: 'Florida' },
  { value: 'IL', label: 'Illinois' },
  { value: 'PA', label: 'Pennsylvania' },
  { value: 'OH', label: 'Ohio' },
  { value: 'GA', label: 'Georgia' },
  { value: 'NC', label: 'North Carolina' },
];

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

// ------------------------------------------------------------------------------

const BasicUsageWithButtonTriggerContent = () => {
  return (
    <View className="flex-1 px-5 items-center justify-center">
      <SelectButtonTrigger />
    </View>
  );
};

// ------------------------------------------------------------------------------

const PresentationContent = () => {
  const [popoverValue, setPopoverValue] = useState<CountryOption | undefined>();
  const [bottomSheetValue, setBottomSheetValue] = useState<
    CountryOption | undefined
  >();

  const insets = useSafeAreaInsets();
  const themeColorMuted = useThemeColor('muted');

  return (
    <View className="flex-1 px-5 items-center justify-center">
      <View className="flex-row items-center justify-center gap-4">
        <Select
          value={popoverValue}
          onValueChange={(value) => {
            const country = COUNTRIES.find((c) => c.value === value?.value);
            setPopoverValue(country);
          }}
        >
          <Select.Trigger asChild>
            <Button variant="secondary" className="min-w-28">
              {popoverValue ? (
                <View className="flex-row items-center gap-2">
                  <AppText className="text-base">{popoverValue.flag}</AppText>
                  <AppText className="text-sm text-accent font-medium">
                    {popoverValue.code}
                  </AppText>
                </View>
              ) : (
                <AppText className="text-accent">Popover</AppText>
              )}
            </Button>
          </Select.Trigger>
          <Select.Portal>
            <Select.Overlay />
            <Select.Content
              width={300}
              className="aspect-[1.2]"
              presentation="popover"
              placement="top"
              align="start"
              alignOffset={-20}
            >
              <ScrollView>
                {COUNTRIES.map((country) => (
                  <Select.Item
                    key={country.value}
                    value={country.value}
                    label={country.label}
                  >
                    <View className="flex-row items-center gap-3">
                      <AppText className="text-2xl">{country.flag}</AppText>
                      <AppText className="text-sm text-muted w-10">
                        {country.code}
                      </AppText>
                      <AppText className="text-base text-foreground flex-1">
                        {country.label}
                      </AppText>
                    </View>
                    <Select.ItemIndicator />
                  </Select.Item>
                ))}
              </ScrollView>
            </Select.Content>
          </Select.Portal>
        </Select>

        <SearchableDialogSelect />

        <Select
          value={bottomSheetValue}
          onValueChange={(value) => {
            const country = COUNTRIES.find((c) => c.value === value?.value);
            setBottomSheetValue(country);
          }}
        >
          <Select.Trigger asChild>
            <Button variant="secondary" className="min-w-28">
              {bottomSheetValue ? (
                <View className="flex-row items-center gap-2">
                  <AppText className="text-base">
                    {bottomSheetValue.flag}
                  </AppText>
                  <AppText className="text-sm text-accent font-medium">
                    {bottomSheetValue.code}
                  </AppText>
                </View>
              ) : (
                <AppText className="text-accent">Sheet</AppText>
              )}
            </Button>
          </Select.Trigger>
          <Select.Portal>
            <Select.Overlay className="bg-black/15" />
            <Select.Content
              presentation="bottom-sheet"
              snapPoints={['35%']}
              detached
              enableDynamicSizing={false}
              enableOverDrag={false}
              backgroundStyle={{
                backgroundColor: 'transparent',
              }}
              handleStyle={{
                height: 8,
              }}
              handleIndicatorStyle={{
                width: 42,
                backgroundColor: themeColorMuted,
              }}
              bottomSheetViewClassName="h-full mx-3 rounded-[32px] border border-divider/20 bg-overlay overflow-hidden"
              bottomSheetViewProps={{
                style: {
                  padding: 0,
                },
              }}
              bottomInset={insets.bottom + 4}
            >
              <BottomSheetScrollView
                contentContainerClassName="p-4"
                showsVerticalScrollIndicator={false}
              >
                {COUNTRIES.map((country, index) => (
                  <React.Fragment key={country.value}>
                    <Select.Item
                      value={country.value}
                      label={country.label}
                      className="py-5 px-3"
                    >
                      <View className="flex-row items-center gap-3 flex-1">
                        <AppText className="text-2xl">{country.flag}</AppText>
                        <AppText className="text-sm text-muted font-medium w-10">
                          {country.code}
                        </AppText>
                        <AppText className="text-base text-foreground flex-1">
                          {country.label}
                        </AppText>
                      </View>
                      <Select.ItemIndicator />
                    </Select.Item>
                    {index < COUNTRIES.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </BottomSheetScrollView>
            </Select.Content>
          </Select.Portal>
        </Select>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const PlacementOptionsContent = () => {
  return (
    <View className="flex-1 px-5 items-center justify-center">
      <View className="w-full gap-4">
        <View className="flex-row justify-between gap-4">
          <PlacementSelect placeholder="Top" placement="top" />
          <PlacementSelect placeholder="Left" placement="left" />
        </View>

        <View className="flex-row justify-between gap-4">
          <PlacementSelect placeholder="Right" placement="right" />
          <PlacementSelect placeholder="Bottom" placement="bottom" />
        </View>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const AlignmentOptionsContent = () => {
  return (
    <View className="flex-1 px-5 items-center justify-center">
      <View className="flex-row justify-center gap-4">
        <Select>
          <Select.Trigger asChild>
            <Button variant="secondary" className="w-24">
              <Select.Value
                placeholder="Start"
                numberOfLines={1}
                className="text-accent"
              />
            </Button>
          </Select.Trigger>
          <Select.Portal>
            <Select.Overlay />
            <Select.Content width={200} placement="top" align="start">
              {US_STATES.slice(0, 3).map((state) => (
                <Select.Item
                  key={state.value}
                  value={state.value}
                  label={state.label}
                />
              ))}
            </Select.Content>
          </Select.Portal>
        </Select>

        <Select>
          <Select.Trigger asChild>
            <Button variant="secondary" className="w-24">
              <Select.Value
                placeholder="Center"
                numberOfLines={1}
                className="text-accent"
              />
            </Button>
          </Select.Trigger>
          <Select.Portal>
            <Select.Overlay />
            <Select.Content width={200} placement="top" align="center">
              {US_STATES.slice(0, 3).map((state) => (
                <Select.Item
                  key={state.value}
                  value={state.value}
                  label={state.label}
                />
              ))}
            </Select.Content>
          </Select.Portal>
        </Select>

        <Select>
          <Select.Trigger asChild>
            <Button variant="secondary" className="w-24">
              <Select.Value
                placeholder="End"
                numberOfLines={1}
                className="text-accent"
              />
            </Button>
          </Select.Trigger>
          <Select.Portal>
            <Select.Overlay />
            <Select.Content width={200} placement="top" align="end">
              {US_STATES.slice(0, 3).map((state) => (
                <Select.Item
                  key={state.value}
                  value={state.value}
                  label={state.label}
                />
              ))}
            </Select.Content>
          </Select.Portal>
        </Select>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const NativeModalTestContent = () => {
  const router = require('expo-router').useRouter();

  return (
    <View className="flex-1 px-5 items-center justify-center">
      <Button
        variant="secondary"
        onPress={() => router.push('components/select-native-modal')}
      >
        Select from Native Modal
      </Button>
    </View>
  );
};

// ------------------------------------------------------------------------------

const SELECT_VARIANTS: UsageVariant[] = [
  {
    value: 'basic-usage-button-trigger',
    label: 'Select with indicator',
    content: <BasicUsageWithButtonTriggerContent />,
  },
  {
    value: 'presentation',
    label: 'Presentation variants',
    content: <PresentationContent />,
  },
  {
    value: 'placement-options',
    label: 'Placement options',
    content: <PlacementOptionsContent />,
  },
  {
    value: 'alignment-options',
    label: 'Alignment options',
    content: <AlignmentOptionsContent />,
  },
];

if (Platform.OS === 'ios') {
  SELECT_VARIANTS.push({
    value: 'native-modal-test',
    label: 'Native modal test',
    content: <NativeModalTestContent />,
  });
}

export default function SelectScreen() {
  return <UsageVariantFlatList data={SELECT_VARIANTS} />;
}
