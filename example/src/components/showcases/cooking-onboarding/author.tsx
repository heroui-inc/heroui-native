import Feather from '@expo/vector-icons/Feather';
import { Avatar, useTheme } from 'heroui-native';
import { type FC } from 'react';
import { Pressable, View } from 'react-native';
import { simulatePress } from '../../../helpers/utils/simulate-press';
import { AppText } from '../../app-text';

export const Author: FC = () => {
  const { colors } = useTheme();

  return (
    <Pressable className="flex-row items-center mb-6" onPress={simulatePress}>
      <Avatar alt="junior" size="sm" className="size-8 border-foreground/20">
        <Avatar.Image
          source={{
            uri: 'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/images/heroui-native-example/junior-avatar.jpg',
          }}
        />
        <Avatar.Fallback>
          <AppText className="text-[8px] font-bold text-white">JG</AppText>
        </Avatar.Fallback>
      </Avatar>
      <AppText className="text-base text-foreground ml-2">
        Junior Garcia
      </AppText>
      <View className="mt-0.5">
        <Feather name="chevron-right" size={16} color={colors.foreground} />
      </View>
    </Pressable>
  );
};
