import { ScrollShadow, Select } from 'heroui-native';
import { Platform, useWindowDimensions, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Animated, { Easing, SlideInDown } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { LinearGradient } from 'expo-linear-gradient';
import { SelectBlurBackdrop } from '../../select/select-blur-backdrop';
import { CloseButton } from './close-button';
import { SelectContentContainer } from './select-content-container';
import { SelectItem } from './select-item';
import { TriggerButton } from './trigger-button';
import { type ModelOption } from './types';

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

type Props = {
  data: ModelOption[];
  model: ModelOption;
  setModel: (model: ModelOption) => void;
};

export const UsageVariantsSelect = ({ data, model, setModel }: Props) => {
  const insets = useSafeAreaInsets();
  const { height: screenHeight } = useWindowDimensions();

  return (
    <Select
      value={model}
      onValueChange={(value) => {
        const modelValue = data.find((m) => m.value === value?.value);
        setModel(modelValue!);
      }}
      defaultValue={data[0]}
    >
      <Select.Trigger>
        <TriggerButton />
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
            <SelectBlurBackdrop maxIntensity={75} />
          </Select.Overlay>
        )}

        <SelectContentContainer>
          <ScrollShadow size={200} LinearGradientComponent={LinearGradient}>
            <AnimatedScrollView
              entering={SlideInDown.withInitialValues({
                originY: 100,
              })
                .springify()
                .damping(70)
                .stiffness(1000)}
              showsVerticalScrollIndicator={false}
              contentContainerClassName="gap-2 px-4"
              contentContainerStyle={{ paddingBottom: insets.bottom + 80 }}
            >
              <Select.Close>
                <View style={{ height: insets.top + screenHeight * 0.25 }} />
              </Select.Close>
              {data.map((m) => (
                <SelectItem key={m.value} data={m} />
              ))}
            </AnimatedScrollView>
          </ScrollShadow>
          <CloseButton />
        </SelectContentContainer>
      </Select.Portal>
    </Select>
  );
};
