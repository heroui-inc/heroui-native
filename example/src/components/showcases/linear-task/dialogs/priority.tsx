import Feather from '@expo/vector-icons/Feather';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import * as Haptics from 'expo-haptics';
import { Chip, cn, Dialog, Label, RadioGroup, useDialog } from 'heroui-native';
import { useState, type FC } from 'react';
import { Platform, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { withUniwind } from 'uniwind';
import { useAppTheme } from '../../../../contexts/app-theme-context';
import { DialogBlurBackdrop } from '../../../dialog-blur-backdrop';
import { DialogHeader } from '../dialog-header';

const StyledFeather = withUniwind(Feather);
const StyledFontAwesome6 = withUniwind(FontAwesome6);

type PriorityItem = {
  value: string;
  label: string;
  indicator: React.ReactNode;
};

type PriorityRadioItemProps = {
  item: PriorityItem;
  value: string;
};

const PriorityRadioItem: FC<PriorityRadioItemProps> = ({ item, value }) => {
  const { onOpenChange } = useDialog();

  return (
    <RadioGroup.Item
      value={item.value}
      onPress={() => {
        if (Platform.OS === 'ios') {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
        onOpenChange(false);
      }}
    >
      <View className="flex-row items-center gap-2">
        <View className="w-7 pl-0.5 justify-center">
          <View className="scale-105">{item.indicator}</View>
        </View>
        <Label>{item.label}</Label>
      </View>
      <RadioGroup.Indicator className="border-none shadow-none bg-transparent">
        {value === item.value && (
          <Animated.View key={item.value} entering={FadeIn.duration(200)}>
            <StyledFeather name="check" size={18} className="text-foreground" />
          </Animated.View>
        )}
      </RadioGroup.Indicator>
    </RadioGroup.Item>
  );
};

export const Priority: FC = () => {
  const [value, setValue] = useState('high');

  const { isDark } = useAppTheme();

  const items: PriorityItem[] = [
    {
      value: 'no-priority',
      label: 'No Priority',
      indicator: (
        <View className="flex-row items-center gap-0.5">
          <View className="h-[1.5px] w-1 bg-muted/50" />
          <View className="h-[1.5px] w-1 bg-muted/50" />
          <View className="h-[1.5px] w-1 bg-muted/50" />
        </View>
      ),
    },
    {
      value: 'urgent',
      label: 'Urgent',
      indicator: (
        <StyledFontAwesome6
          name="circle-exclamation"
          size={13}
          className="text-foreground"
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
          <View className="h-3 w-[3px] rounded-[1px] bg-muted/50" />
        </View>
      ),
    },
    {
      value: 'low',
      label: 'Low',
      indicator: (
        <View className="flex-row items-end gap-0.5">
          <View className="h-1 w-[3px] rounded-[1px] bg-foreground" />
          <View className="h-2 w-[3px] rounded-[1px] bg-muted/50" />
          <View className="h-3 w-[3px] rounded-[1px] bg-muted/50" />
        </View>
      ),
    },
  ];

  return (
    <Dialog>
      <Dialog.Trigger asChild>
        <Chip
          className={cn(
            'h-7 px-2',
            isDark ? 'bg-neutral-900/50' : 'bg-neutral-300/50'
          )}
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
        <DialogBlurBackdrop />
        <Dialog.Content>
          <DialogHeader>Priority</DialogHeader>
          <RadioGroup value={value} onValueChange={setValue} className="gap-7">
            {items.map((item) => (
              <PriorityRadioItem key={item.value} item={item} value={value} />
            ))}
          </RadioGroup>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
};
