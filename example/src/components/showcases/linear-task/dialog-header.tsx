import { Dialog } from 'heroui-native';
import { type FC, type PropsWithChildren } from 'react';
import { View } from 'react-native';
import { AppText } from '../../app-text';

export const DialogHeader: FC<PropsWithChildren> = ({ children }) => {
  return (
    <View className="mb-5 flex-row items-center justify-between">
      <AppText className="font-semibold text-lg text-muted">{children}</AppText>
      <Dialog.Close variant="ghost" className="-mr-2" />
    </View>
  );
};
