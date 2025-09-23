import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import * as Haptics from 'expo-haptics';
import { Chip, Dialog, Radio, RadioGroup, useTheme } from 'heroui-native';
import { useState, type FC } from 'react';
import { Platform, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { DialogBlurBackdrop } from '../../../dialog-blur-backdrop';
import { DialogHeader } from '../dialog-header';

type StatusItem = {
  value: string;
  label: string;
  indicator: React.ReactNode;
};

export const Status: FC = () => {
  const [value, setValue] = useState('done');

  const { colors } = useTheme();

  const items: StatusItem[] = [
    {
      value: 'backlog',
      label: 'Backlog',
      indicator: (
        <MaterialCommunityIcons
          name="circle-opacity"
          size={13}
          color={colors.mutedForeground}
        />
      ),
    },
    {
      value: 'todo',
      label: 'Todo',
      indicator: (
        <MaterialCommunityIcons
          name="circle-outline"
          size={13}
          color={colors.foreground}
        />
      ),
    },
    {
      value: 'in-progress',
      label: 'In Progress',
      indicator: (
        <MaterialCommunityIcons
          name="circle-slice-4"
          size={13}
          color={colors.warning}
        />
      ),
    },
    {
      value: 'in-review',
      label: 'In Review',
      indicator: (
        <MaterialCommunityIcons
          name="circle-slice-6"
          size={13}
          color={colors.success}
        />
      ),
    },
    {
      value: 'done',
      label: 'Done',
      indicator: (
        <MaterialCommunityIcons
          name="checkbox-marked-circle"
          size={14}
          color="#4f46e5"
        />
      ),
    },
    {
      value: 'cancelled',
      label: 'Cancelled',
      indicator: (
        <MaterialCommunityIcons
          name="close-circle"
          size={13}
          color={colors.mutedForeground}
        />
      ),
    },
    {
      value: 'duplicate',
      label: 'Duplicate',
      indicator: (
        <MaterialCommunityIcons
          name="close-circle"
          size={13}
          color={colors.mutedForeground}
        />
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
        <Dialog.Overlay isAnimationDisabled>
          <DialogBlurBackdrop />
        </Dialog.Overlay>
        <Dialog.Content className="rounded-2xl border-0">
          <DialogHeader>Status</DialogHeader>
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
                  <Radio.Content className="flex-row items-center">
                    <View className="w-7 pl-0.5 justify-center">
                      <View className="scale-[1.2]">{item.indicator}</View>
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
