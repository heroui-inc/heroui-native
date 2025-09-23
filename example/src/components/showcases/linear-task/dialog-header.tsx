import { Dialog, useTheme } from 'heroui-native';
import { type FC, type PropsWithChildren } from 'react';
import { View } from 'react-native';
import { AppText } from '../../app-text';

export const DialogHeader: FC<PropsWithChildren> = ({ children }) => {
  const { colors } = useTheme();

  return (
    <View className="mb-5 flex-row items-center justify-between">
      <AppText className="font-semibold text-lg text-muted-foreground">
        {children}
      </AppText>
      <Dialog.Close
        className="rounded-full bg-surface-2 p-1"
        iconProps={{ size: 14, color: colors.mutedForeground }}
      />
    </View>
  );
};
