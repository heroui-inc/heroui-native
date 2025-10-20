import Feather from '@expo/vector-icons/Feather';
import { Avatar } from 'heroui-native';
import { type FC } from 'react';
import { Pressable, View } from 'react-native';
import { withUniwind } from 'uniwind';
import { simulatePress } from '../../../helpers/utils/simulate-press';
import { AppText } from '../../app-text';

const StyledFeather = withUniwind(Feather);

export const Author: FC = () => {
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
        <StyledFeather
          name="chevron-right"
          size={16}
          className="text-foreground"
        />
      </View>
    </Pressable>
  );
};
