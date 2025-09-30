import Feather from '@expo/vector-icons/Feather';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import * as Haptics from 'expo-haptics';
import { Chip, Dialog, Radio, RadioGroup, useTheme } from 'heroui-native';
import { useState, type FC } from 'react';
import { Platform, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { DialogBlurBackdrop } from '../../../dialog-blur-backdrop';
import { DialogHeader } from '../dialog-header';

type PriorityItem = {
  value: string;
  label: string;
  indicator: React.ReactNode;
};

export const Priority: FC = () => {
  const [value, setValue] = useState('high');

  const { colors } = useTheme();

  const items: PriorityItem[] = [
    {
      value: 'no-priority',
      label: 'No Priority',
      indicator: (
        <View className="flex-row items-center gap-0.5">
          <View className="h-[1.5px] w-1 bg-muted-foreground" />
          <View className="h-[1.5px] w-1 bg-muted-foreground" />
          <View className="h-[1.5px] w-1 bg-muted-foreground" />
        </View>
      ),
    },
    {
      value: 'urgent',
      label: 'Urgent',
      indicator: (
        <FontAwesome6
          name="circle-exclamation"
          size={13}
          color={colors.foreground}
        />
      ),
    },
    {
      value: 'high',
      label: 'High',
      indicator: (
        <View className="flex-row items-end gap-0.5">
          <View className="h-1 w-[3px] rounded-[1px] bg-foreground" />
          <View className="h-2 w-[3px] rounded-[1px] bg-foreground" />
          <View className="h-3 w-[3px] rounded-[1px] bg-foreground" />
        </View>
      ),
    },
    {
      value: 'medium',
      label: 'Medium',
      indicator: (
        <View className="flex-row items-end gap-0.5">
          <View className="h-1 w-[3px] rounded-[1px] bg-foreground" />
          <View className="h-2 w-[3px] rounded-[1px] bg-foreground" />
          <View className="h-3 w-[3px] rounded-[1px] bg-muted-foreground" />
        </View>
      ),
    },
    {
      value: 'low',
      label: 'Low',
      indicator: (
        <View className="flex-row items-end gap-0.5">
          <View className="h-1 w-[3px] rounded-[1px] bg-foreground" />
          <View className="h-2 w-[3px] rounded-[1px] bg-muted-foreground" />
          <View className="h-3 w-[3px] rounded-[1px] bg-muted-foreground" />
        </View>
      ),
    },
  ];

  return (
    <Dialog>
      <Dialog.Trigger>
        <Chip
          className="h-7 bg-surface-3 px-2"
          onPress={() => {
            if (Platform.OS === 'ios') {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }
          }}
        >
          <Chip.StartContent>
            {items.find((item) => item.value === value)?.indicator}
          </Chip.StartContent>
          <Chip.LabelContent
            classNames={{ text: 'text-foreground font-medium' }}
          >
            {items.find((item) => item.value === value)?.label}
          </Chip.LabelContent>
        </Chip>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay isDefaultAnimationDisabled>
          <DialogBlurBackdrop />
        </Dialog.Overlay>
        <Dialog.Content className="rounded-2xl border-0">
          <DialogHeader>Priority</DialogHeader>
          <RadioGroup value={value} onValueChange={setValue} className="gap-7">
            {items.map((item) => (
              <Dialog.Close key={item.value} className="self-stretch" asChild>
                <Radio
                  value={item.value}
                  onPress={() => {
                    if (Platform.OS === 'ios') {
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    }
                  }}
                >
                  <Radio.Content className="flex-row items-center gap-2">
                    <View className="w-7 pl-0.5 justify-center">
                      <View className="scale-105">{item.indicator}</View>
                    </View>
                    <Radio.Title>{item.label}</Radio.Title>
                  </Radio.Content>
                  <Radio.Indicator
                    colors={{
                      defaultBorder: 'transparent',
                      selectedBorder: 'transparent',
                    }}
                  >
                    <Radio.IndicatorBackground
                      colors={{
                        defaultBackground: 'transparent',
                        selectedBackground: 'transparent',
                      }}
                    />
                    <Radio.IndicatorThumb>
                      {value === item.value && (
                        <Animated.View
                          key={item.value}
                          entering={FadeIn.duration(200)}
                        >
                          <Feather
                            name="check"
                            size={18}
                            color={colors.foreground}
                          />
                        </Animated.View>
                      )}
                    </Radio.IndicatorThumb>
                  </Radio.Indicator>
                </Radio>
              </Dialog.Close>
            ))}
          </RadioGroup>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
};
