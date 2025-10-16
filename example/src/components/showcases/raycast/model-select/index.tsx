import Feather from '@expo/vector-icons/Feather';
import * as Haptics from 'expo-haptics';
import { Button, Select, useTheme } from 'heroui-native';
import { useState } from 'react';
import { Pressable, useWindowDimensions, View } from 'react-native';
import Animated, { Easing, SlideInDown } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { simulatePress } from '../../../../helpers/utils/simulate-press';
import { AppText } from '../../../app-text';
import { SelectBlurBackdrop } from '../../../select/select-blur-backdrop';
import { ProgressiveBlurView } from '../progresive-blur-view';
import { SelectContentContainer } from './select-content-container';
import { SelectItem } from './select-item';
import { type ModelOption } from './types';

const MODELS: ModelOption[] = [
  { value: 'raycast', label: 'Raycast AI', flag: '🇺🇸' },
  { value: 'chatgpt', label: 'ChatGPT', flag: '🇬🇧' },
  { value: 'claude', label: 'Claude', flag: '🇨🇦' },
  { value: 'gemini', label: 'Gemini', flag: '🇦🇺' },
  { value: 'perplexity', label: 'Perplexity', flag: '🇩🇪' },
  { value: 'deepseek', label: 'DeepSeek', flag: '🇫🇷' },
  { value: 'llama', label: 'Llama', flag: '🇯🇵' },
  { value: 'grok', label: 'Grok', flag: '🇨🇳' },
  { value: 'mistral', label: 'Mistral', flag: '🇮🇳' },
  { value: 'moonshot', label: 'Moonshot AI', flag: '🇧🇷' },
  { value: 'qwen', label: 'Qwen', flag: '🇧🇷' },
];

export const ModelSelect = () => {
  const [bottomSheetValue, setBottomSheetValue] = useState<
    ModelOption | undefined
  >();

  const insets = useSafeAreaInsets();
  const { height: screenHeight } = useWindowDimensions();

  const { colors } = useTheme();

  return (
    <Select
      value={bottomSheetValue}
      onValueChange={(value) => {
        const country = MODELS.find((c) => c.value === value?.value);
        setBottomSheetValue(country);
      }}
      defaultValue={MODELS[0]}
    >
      <Select.Trigger asChild>
        <Button
          variant="tertiary"
          size="sm"
          className="min-w-28"
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
          }}
        >
          {bottomSheetValue ? (
            <View className="flex-row items-center gap-2">
              <AppText className="text-base">{bottomSheetValue.flag}</AppText>
            </View>
          ) : (
            <AppText className="text-foreground">Sheet</AppText>
          )}
        </Button>
      </Select.Trigger>
      <Select.Portal
        progressAnimationConfigs={{
          onOpen: {
            animationType: 'timing',
            animationConfig: {
              duration: 400,
              easing: Easing.out(Easing.quad),
            },
          },
          onClose: {
            animationType: 'timing',
            animationConfig: {
              duration: 200,
              easing: Easing.out(Easing.quad),
            },
          },
        }}
      >
        <Select.Overlay className="bg-transparent" isDefaultAnimationDisabled>
          <SelectBlurBackdrop />
        </Select.Overlay>
        <SelectContentContainer>
          <View
            className="absolute left-0 right-0 flex-row items-center justify-center px-8 py-2 z-50"
            style={{
              top: insets.top + 8,
            }}
          >
            <Pressable onPress={simulatePress}>
              <AppText className="text-lg text-foreground">Edit</AppText>
            </Pressable>
            <View className="flex-1" />
            <Pressable className="absolute" onPress={simulatePress}>
              <AppText className="text-xl font-bold text-foreground">
                Presets
              </AppText>
            </Pressable>
            <Pressable onPress={simulatePress}>
              <AppText className="text-medium text-foreground">
                <Feather name="plus" size={20} color={colors.foreground} />
              </AppText>
            </Pressable>
          </View>

          <Animated.ScrollView
            entering={SlideInDown.withInitialValues({
              originY: 100,
            })
              .springify()
              .damping(70)
              .stiffness(1000)}
            showsVerticalScrollIndicator={false}
            contentContainerClassName="gap-2"
            contentContainerStyle={{ paddingBottom: insets.bottom + 80 }}
          >
            <Select.Close>
              <View style={{ height: insets.top + screenHeight * 0.25 }} />
            </Select.Close>
            {MODELS.map((country) => (
              <SelectItem key={country.value} data={country} />
            ))}
          </Animated.ScrollView>

          <ProgressiveBlurView height={insets.top + 150} />
          <ProgressiveBlurView position="bottom" />
        </SelectContentContainer>
      </Select.Portal>
    </Select>
  );
};
