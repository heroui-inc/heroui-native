import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import * as Haptics from 'expo-haptics';
import { Chip, Dialog, RadioGroup, useTheme } from 'heroui-native';
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
      <Dialog.Trigger asChild>
        <Chip
          className="h-7 bg-surface-3 px-2"
          onPress={() => {
            if (Platform.OS === 'ios') {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }
          }}
        >
          {items.find((item) => item.value === value)?.indicator}
          <Chip.Label className="text-foreground font-medium">
            {items.find((item) => item.value === value)?.label}
          </Chip.Label>
        </Chip>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay isDefaultAnimationDisabled>
          <DialogBlurBackdrop />
        </Dialog.Overlay>
        <Dialog.Content className="rounded-2xl border-0">
          <DialogHeader>Status</DialogHeader>
          <RadioGroup value={value} onValueChange={setValue} className="gap-7">
            {items.map((item) => (
              <Dialog.Close key={item.value} className="self-stretch" asChild>
                <RadioGroup.Item
                  value={item.value}
                  onPress={() => {
                    if (Platform.OS === 'ios') {
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    }
                  }}
                >
                  <View className="flex-row items-center">
                    <View className="w-7 pl-0.5 justify-center">
                      <View className="scale-[1.2]">{item.indicator}</View>
                    </View>
                    <RadioGroup.Title>{item.label}</RadioGroup.Title>
                  </View>
                  <RadioGroup.Indicator className="border-0 bg-transparent">
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
                  </RadioGroup.Indicator>
                </RadioGroup.Item>
              </Dialog.Close>
            ))}
          </RadioGroup>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
};
