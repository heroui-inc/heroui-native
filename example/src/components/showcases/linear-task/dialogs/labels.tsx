import { Chip } from 'heroui-native';
import { type FC } from 'react';
import { View } from 'react-native';

export const Labels: FC = () => {
  return (
    <Chip className="bg-surface-3 px-2">
      <Chip.StartContent>
        <View className="size-2 rounded-full bg-yellow-500" />
      </Chip.StartContent>
      <Chip.LabelContent classNames={{ text: 'text-foreground font-medium' }}>
        2 labels
      </Chip.LabelContent>
    </Chip>
  );
};
