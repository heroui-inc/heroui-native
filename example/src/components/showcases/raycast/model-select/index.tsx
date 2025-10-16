import Feather from '@expo/vector-icons/Feather';
import * as Haptics from 'expo-haptics';
import { Button, Select, useTheme } from 'heroui-native';
import { Platform, Pressable, useWindowDimensions, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Animated, { Easing, SlideInDown } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { simulatePress } from '../../../../helpers/utils/simulate-press';
import { AppText } from '../../../app-text';
import { SelectBlurBackdrop } from '../../../select/select-blur-backdrop';
import { ProgressiveBlurView } from '../progresive-blur-view';
import { SelectContentContainer } from './select-content-container';
import { SelectItem } from './select-item';
import { type ModelOption } from './types';

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

type Props = {
  data: ModelOption[];
  model: ModelOption;
  setModel: (model: ModelOption) => void;
};

export const ModelSelect = ({ data, model, setModel }: Props) => {
  const insets = useSafeAreaInsets();
  const { height: screenHeight } = useWindowDimensions();

  const { colors } = useTheme();

  return (
    <Select
      value={model}
      onValueChange={(value) => {
        const modelValue = data.find((m) => m.value === value?.value);
        setModel(modelValue!);
      }}
      defaultValue={data[0]}
    >
      <Select.Trigger asChild>
        <Button
          variant="tertiary"
          size="sm"
          className="rounded-full px-4 h-11 bg-transparent border border-neutral-400/25 dark:border-neutral-600/25"
          onPress={() => {
            if (Platform.OS === 'android') return;
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
          }}
        >
          <AppText className="text-foreground">{model.emoji}</AppText>
          <AppText className="text-foreground font-medium">
            {model.label}
          </AppText>
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
        {Platform.OS === 'android' ? (
          <Select.Overlay className="bg-background" />
        ) : (
          <Select.Overlay className="bg-transparent" isDefaultAnimationDisabled>
            <SelectBlurBackdrop />
          </Select.Overlay>
        )}

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
              <AppText className="text-xl font-semibold dark:font-bold text-foreground">
                Presets
              </AppText>
            </Pressable>
            <Pressable onPress={simulatePress}>
              <AppText className="text-medium text-foreground">
                <Feather name="plus" size={20} color={colors.foreground} />
              </AppText>
            </Pressable>
          </View>

          <AnimatedScrollView
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
            {data.map((m) => (
              <SelectItem key={m.value} data={m} />
            ))}
          </AnimatedScrollView>

          <ProgressiveBlurView height={insets.top + 150} />
          <ProgressiveBlurView position="bottom" />
        </SelectContentContainer>
      </Select.Portal>
    </Select>
  );
};
