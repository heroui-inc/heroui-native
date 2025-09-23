import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Chip, useTheme } from 'heroui-native';
import { type FC } from 'react';

export const Project: FC = () => {
  const { colors } = useTheme();

  return (
    <Chip className="bg-surface-3 px-2">
      <Chip.StartContent>
        <MaterialIcons name="animation" size={12} color={colors.danger} />
      </Chip.StartContent>
      <Chip.LabelContent classNames={{ text: 'text-foreground font-medium' }}>
        HeroUI Native
      </Chip.LabelContent>
    </Chip>
  );
};
