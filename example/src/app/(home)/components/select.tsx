/* eslint-disable react-native/no-inline-styles */
import { FontAwesome6 } from '@expo/vector-icons';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';
import { Button, Divider, Select, useTheme } from 'heroui-native';
import React, { useState } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppText } from '../../../components/app-text';
import { PlacementSelect } from '../../../components/placement-select';
import { ScreenScrollView } from '../../../components/screen-scroll-view';
import { SectionTitle } from '../../../components/section-title';

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

export default function PopoverScreen() {
  const router = useRouter();
  const [basicValue, setBasicValue] = useState<SelectOption | undefined>();
  const [popoverValue, setPopoverValue] = useState<CountryOption | undefined>();
  const [dialogValue, setDialogValue] = useState<CountryOption | undefined>();
  const [bottomSheetValue, setBottomSheetValue] = useState<
    CountryOption | undefined
  >();

  const insets = useSafeAreaInsets();

  const { colors, isDark } = useTheme();

  return (
    <ScreenScrollView contentContainerClassName="gap-16">
      {/* Basic Select */}
      <SectionTitle title="Basic Usage" />
      <View className="items-center">
        <Select
          value={basicValue}
          onValueChange={setBasicValue}
          defaultValue={US_STATES[1]}
        >
          <Select.Trigger asChild>
            <Button variant="tertiary" size="sm" className="w-48">
              <Select.Value placeholder="Select a state" />
            </Button>
          </Select.Trigger>
          <Select.Portal>
            <Select.Overlay className="bg-transparent" />
            <Select.Content className="w-[240px] px-0 bg-transparent overflow-hidden border border-border">
              <BlurView
                tint={
                  isDark
                    ? 'systemThickMaterialDark'
                    : 'systemThickMaterialLight'
                }
                style={StyleSheet.absoluteFill}
              />
              <Select.GroupLabel className="px-4 mb-2">
                Choose a state
              </Select.GroupLabel>
              {US_STATES.slice(0, 6).map((state, index) => (
                <React.Fragment key={state.value}>
                  <Select.Item
                    value={state.value}
                    label={state.label}
                    className="px-4"
                  >
                    <Select.ItemLabel />
                    <Select.ItemIndicator className="size-1.5 rounded-full bg-muted" />
                  </Select.Item>
                  {index < 5 && <Divider />}
                </React.Fragment>
              ))}
            </Select.Content>
          </Select.Portal>
        </Select>
      </View>

      {/* Presentation */}
      <SectionTitle title="Presentation - Country Picker" />
      <View className="flex-row items-center justify-center gap-4">
        <Select
          value={popoverValue}
          onValueChange={(value) => {
            const country = COUNTRIES.find((c) => c.value === value?.value);
            setPopoverValue(country);
          }}
        >
          <Select.Trigger asChild>
            <Button variant="tertiary" size="sm" className="min-w-28">
              {popoverValue ? (
                <View className="flex-row items-center gap-2">
                  <AppText className="text-base">{popoverValue.flag}</AppText>
                  <AppText className="text-sm text-foreground">
                    {popoverValue.code}
                  </AppText>
                </View>
              ) : (
                <AppText className="text-foreground">Popover</AppText>
              )}
            </Button>
          </Select.Trigger>
          <Select.Portal>
            <Select.Overlay />
            <Select.Content
              className="w-[280px]"
              presentation="popover"
              align="start"
              alignOffset={-20}
            >
              {COUNTRIES.slice(0, 5).map((country) => (
                <Select.Item
                  key={country.value}
                  value={country.value}
                  label={country.label}
                >
                  <View className="flex-row items-center gap-3 flex-1">
                    <AppText className="text-2xl">{country.flag}</AppText>
                    <AppText className="text-sm text-muted w-10">
                      {country.code}
                    </AppText>
                    <AppText className="text-base text-foreground flex-1">
                      {country.label}
                    </AppText>
                  </View>
                  <Select.ItemIndicator>
                    <FontAwesome6 name="check" size={16} color="#10b981" />
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Portal>
        </Select>

        <Select
          value={dialogValue}
          onValueChange={(value) => {
            const country = COUNTRIES.find((c) => c.value === value?.value);
            setDialogValue(country);
          }}
        >
          <Select.Trigger asChild>
            <Button variant="tertiary" size="sm" className="min-w-28">
              {dialogValue ? (
                <View className="flex-row items-center gap-2">
                  <AppText className="text-base">{dialogValue.flag}</AppText>
                  <AppText className="text-sm text-foreground">
                    {dialogValue.code}
                  </AppText>
                </View>
              ) : (
                <AppText className="text-foreground">Dialog</AppText>
              )}
            </Button>
          </Select.Trigger>
          <Select.Portal>
            <Select.Overlay />
            <Select.Content
              classNames={{
                wrapper: 'items-center',
                content: 'gap-2 w-[320px] rounded-2xl',
              }}
              presentation="dialog"
            >
              <View className="flex-row items-center justify-between mb-2">
                <Select.GroupLabel>Select Country</Select.GroupLabel>
                <Select.Close />
              </View>
              {COUNTRIES.slice(0, 5).map((country) => (
                <Select.Item
                  key={country.value}
                  value={country.value}
                  label={country.label}
                >
                  <View className="flex-row items-center gap-3 flex-1">
                    <AppText className="text-2xl">{country.flag}</AppText>
                    <AppText className="text-sm text-muted w-10">
                      {country.code}
                    </AppText>
                    <AppText className="text-base text-foreground flex-1">
                      {country.label}
                    </AppText>
                  </View>
                  <Select.ItemIndicator>
                    <FontAwesome6 name="check" size={16} color="#10b981" />
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Portal>
        </Select>

        <Select
          value={bottomSheetValue}
          onValueChange={(value) => {
            const country = COUNTRIES.find((c) => c.value === value?.value);
            setBottomSheetValue(country);
          }}
        >
          <Select.Trigger asChild>
            <Button variant="tertiary" size="sm" className="min-w-28">
              {bottomSheetValue ? (
                <View className="flex-row items-center gap-2">
                  <AppText className="text-base">
                    {bottomSheetValue.flag}
                  </AppText>
                  <AppText className="text-sm text-foreground">
                    {bottomSheetValue.code}
                  </AppText>
                </View>
              ) : (
                <AppText className="text-foreground">Sheet</AppText>
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
                backgroundColor: colors.muted,
              }}
              bottomSheetViewClassName="h-full mx-4 rounded-3xl border border-border bg-panel overflow-hidden"
              bottomSheetViewProps={{
                style: {
                  padding: 0,
                },
              }}
              bottomInset={insets.bottom + 8}
            >
              <BottomSheetScrollView
                contentContainerClassName="py-4"
                showsVerticalScrollIndicator={false}
              >
                {COUNTRIES.map((country, index) => (
                  <React.Fragment key={country.value}>
                    <Select.Item
                      value={country.value}
                      label={country.label}
                      className="py-5 px-8"
                    >
                      <View className="flex-row items-center gap-3 flex-1">
                        <AppText className="text-2xl">{country.flag}</AppText>
                        <AppText className="text-sm text-muted dark:text-muted-foreground font-medium w-10">
                          {country.code}
                        </AppText>
                        <AppText className="text-base text-foreground flex-1">
                          {country.label}
                        </AppText>
                      </View>
                      <Select.ItemIndicator>
                        <FontAwesome6
                          name="check"
                          size={16}
                          color={colors.muted}
                        />
                      </Select.ItemIndicator>
                    </Select.Item>
                    {index < COUNTRIES.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </BottomSheetScrollView>
            </Select.Content>
          </Select.Portal>
        </Select>
      </View>

      {/* Placements */}
      <SectionTitle title="Placement Options" />
      <View className="gap-4">
        <View className="flex-row justify-between gap-4">
          <PlacementSelect placeholder="Top" placement="top" />
          <PlacementSelect placeholder="Left" placement="left" />
        </View>

        <View className="flex-row justify-between gap-4">
          <PlacementSelect placeholder="Right" placement="right" />
          <PlacementSelect placeholder="Bottom" placement="bottom" />
        </View>
      </View>

      {/* Alignment Options */}
      <SectionTitle title="Alignment Options" />
      <View className="flex-row justify-center gap-4">
        <Select>
          <Select.Trigger asChild>
            <Button size="sm" variant="tertiary" className="w-24">
              <Select.Value placeholder="Start" numberOfLines={1} />
            </Button>
          </Select.Trigger>
          <Select.Portal>
            <Select.Overlay />
            <Select.Content placement="top" align="start" className="w-[200px]">
              {US_STATES.slice(0, 3).map((state) => (
                <Select.Item
                  key={state.value}
                  value={state.value}
                  label={state.label}
                >
                  <Select.ItemLabel />
                  <Select.ItemIndicator>
                    <FontAwesome6 name="check" size={16} color="#10b981" />
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Portal>
        </Select>

        <Select>
          <Select.Trigger asChild>
            <Button size="sm" variant="tertiary" className="w-24">
              <Select.Value placeholder="Center" numberOfLines={1} />
            </Button>
          </Select.Trigger>
          <Select.Portal>
            <Select.Overlay />
            <Select.Content
              placement="top"
              align="center"
              className="w-[200px]"
            >
              {US_STATES.slice(0, 3).map((state) => (
                <Select.Item
                  key={state.value}
                  value={state.value}
                  label={state.label}
                >
                  <Select.ItemLabel />
                  <Select.ItemIndicator>
                    <FontAwesome6 name="check" size={16} color="#10b981" />
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Portal>
        </Select>

        <Select>
          <Select.Trigger asChild>
            <Button size="sm" variant="tertiary" className="w-24">
              <Select.Value placeholder="End" numberOfLines={1} />
            </Button>
          </Select.Trigger>
          <Select.Portal>
            <Select.Overlay />
            <Select.Content placement="top" align="end" className="w-[200px]">
              {US_STATES.slice(0, 3).map((state) => (
                <Select.Item
                  key={state.value}
                  value={state.value}
                  label={state.label}
                >
                  <Select.ItemLabel />
                  <Select.ItemIndicator>
                    <FontAwesome6 name="check" size={16} color="#10b981" />
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Portal>
        </Select>
      </View>

      {/* Native Modal Navigation */}
      {Platform.OS === 'ios' && (
        <>
          <SectionTitle title="Native Modal Test" />
          <View className="items-center">
            <Button
              variant="tertiary"
              size="sm"
              onPress={() => router.push('components/select-native-modal')}
            >
              Select from Native Modal
            </Button>
          </View>
        </>
      )}
    </ScreenScrollView>
  );
}
