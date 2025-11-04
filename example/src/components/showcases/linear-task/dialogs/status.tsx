import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import * as Haptics from 'expo-haptics';
import { Chip, Dialog, RadioGroup } from 'heroui-native';
import { useState, type FC } from 'react';
import { Platform, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { withUniwind } from 'uniwind';
import { DialogBlurBackdrop } from '../../../dialog-blur-backdrop';
import { DialogHeader } from '../dialog-header';

const StyledFeather = withUniwind(Feather);
const StyledMaterialCommunityIcons = withUniwind(MaterialCommunityIcons);

type StatusItem = {
  value: string;
  label: string;
  indicator: React.ReactNode;
};

export const Status: FC = () => {
  const [value, setValue] = useState('done');

  const items: StatusItem[] = [
    {
      value: 'backlog',
      label: 'Backlog',
      indicator: (
        <StyledMaterialCommunityIcons
          name="circle-opacity"
          size={13}
          className="text-muted"
        />
      ),
    },
    {
      value: 'todo',
      label: 'Todo',
      indicator: (
        <StyledMaterialCommunityIcons
          name="circle-outline"
          size={13}
          className="text-foreground"
        />
      ),
    },
    {
      value: 'in-progress',
      label: 'In Progress',
      indicator: (
        <StyledMaterialCommunityIcons
          name="circle-slice-4"
          size={13}
          className="text-warning"
        />
      ),
    },
    {
      value: 'in-review',
      label: 'In Review',
      indicator: (
        <StyledMaterialCommunityIcons
          name="circle-slice-6"
          size={13}
          className="text-success"
        />
      ),
    },
    {
      value: 'done',
      label: 'Done',
      indicator: (
        <StyledMaterialCommunityIcons
          name="checkbox-marked-circle"
          size={14}
          className="text-[#4f46e5]"
        />
      ),
    },
    {
      value: 'cancelled',
      label: 'Cancelled',
      indicator: (
        <StyledMaterialCommunityIcons
          name="close-circle"
          size={13}
          className="text-muted"
        />
      ),
    },
    {
      value: 'duplicate',
      label: 'Duplicate',
      indicator: (
        <StyledMaterialCommunityIcons
          name="close-circle"
          size={13}
          className="text-muted"
        />
      ),
    },
  ];

  return (
    <Dialog>
      <Dialog.Trigger asChild>
        <Chip
          className="h-7 bg-surface-quaternary px-2"
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
        <Dialog.Content>
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
                    <RadioGroup.Label>{item.label}</RadioGroup.Label>
                  </View>
                  <RadioGroup.Indicator className="border-0 bg-transparent">
                    {value === item.value && (
                      <Animated.View
                        key={item.value}
                        entering={FadeIn.duration(200)}
                      >
                        <StyledFeather
                          name="check"
                          size={18}
                          className="text-foreground"
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
