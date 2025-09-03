/* eslint-disable react-native/no-inline-styles */
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Avatar, cn } from 'heroui-native';
import { StyleSheet, Text, View } from 'react-native';
import { ScreenScrollView } from '../../../components/screen-scroll-view';
import { SectionTitle } from '../../../components/section-title';

type User = {
  id: number;
  image: string;
  name: string;
};

const users: User[] = [
  {
    id: 1,
    image: 'https://img.heroui.chat/image/avatar?w=400&h=400&u=3',
    name: 'John Doe',
  },
  {
    id: 2,
    image: 'https://img.heroui.chat/image/avatar?w=400&h=400&u=5',
    name: 'Kate Wilson',
  },
  {
    id: 3,
    image: 'https://img.heroui.chat/image/avatar?w=400&h=400&u=20',
    name: 'Emily Chen',
  },
  {
    id: 4,
    image: 'https://img.heroui.chat/image/avatar?w=400&h=400&u=23',
    name: 'Michael Brown',
  },
  {
    id: 5,
    image: 'https://img.heroui.chat/image/avatar?w=400&h=400&u=16',
    name: 'Olivia Davis',
  },
];

export default function AvatarScreen() {
  return (
    <ScreenScrollView contentContainerClassName="gap-16">
      <SectionTitle title="Sizes" />
      <View className="flex-row items-center justify-center gap-4">
        <Avatar size="sm" alt="Small Avatar">
          <Avatar.Image source={{ uri: users[0]?.image }} />
          <Avatar.Fallback />
        </Avatar>
        <Avatar size="md" alt="Medium Avatar">
          <Avatar.Image source={{ uri: users[1]?.image }} />
          <Avatar.Fallback>MD</Avatar.Fallback>
        </Avatar>
        <Avatar size="lg" alt="Large Avatar">
          <Avatar.Image source={{ uri: users[2]?.image }} />
          <Avatar.Fallback>LG</Avatar.Fallback>
        </Avatar>
      </View>

      <SectionTitle title="Colors" />
      <View className="gap-8">
        <View className="flex-row items-center justify-center gap-4">
          <Avatar color="default" alt="Default">
            <Avatar.Image source={undefined} />
            <Avatar.Fallback />
          </Avatar>
          <Avatar color="accent" alt="Accent">
            <Avatar.Image source={undefined} />
            <Avatar.Fallback />
          </Avatar>
          <Avatar color="success" alt="Success">
            <Avatar.Image source={undefined} />
            <Avatar.Fallback />
          </Avatar>
          <Avatar color="warning" alt="Warning">
            <Avatar.Image source={undefined} />
            <Avatar.Fallback />
          </Avatar>
          <Avatar color="danger" alt="Danger">
            <Avatar.Image source={undefined} />
            <Avatar.Fallback />
          </Avatar>
        </View>
        <View className="flex-row items-center justify-center gap-4">
          <Avatar color="default" alt="Default">
            <Avatar.Image source={undefined} />
            <Avatar.Fallback />
          </Avatar>
          <Avatar color="accent" alt="Accent">
            <Avatar.Image source={undefined} />
            <Avatar.Fallback>AC</Avatar.Fallback>
          </Avatar>
          <Avatar color="success" alt="Success">
            <Avatar.Image source={undefined} />
            <Avatar.Fallback>SC</Avatar.Fallback>
          </Avatar>
          <Avatar color="warning" alt="Warning">
            <Avatar.Image source={undefined} />
            <Avatar.Fallback>WR</Avatar.Fallback>
          </Avatar>
          <Avatar color="danger" alt="Danger">
            <Avatar.Image source={undefined} />
            <Avatar.Fallback>DG</Avatar.Fallback>
          </Avatar>
        </View>
      </View>

      <SectionTitle title="Fallback Content" />
      <View className="flex-row items-center justify-center gap-4">
        <Avatar alt="John Doe">
          <Avatar.Fallback>JD</Avatar.Fallback>
        </Avatar>
        <Avatar alt="User">
          <Avatar.Fallback>
            <Ionicons name="person" size={18} color="#666" />
          </Avatar.Fallback>
        </Avatar>
        <Avatar alt="Delayed Avatar">
          <Avatar.Image
            source={{
              uri: 'https://invalid-url-to-show-fallback.com/image.jpg',
            }}
          />
          <Avatar.Fallback delayMs={600}>NA</Avatar.Fallback>
        </Avatar>

        <Avatar alt="Custom">
          <Avatar.Fallback>
            <LinearGradient
              colors={['#ec4899', '#a855f7']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                flex: 1,
                width: '100%',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text className="text-white font-medium">GB</Text>
            </LinearGradient>
          </Avatar.Fallback>
        </Avatar>
      </View>

      <SectionTitle title="Avatar Group" />
      <View className="gap-6 items-center justify-center">
        <View className="flex-row">
          {users.slice(0, 4).map((user, index) => (
            <Avatar
              key={user.id}
              className={cn(
                'border-background border-[2px]',
                index !== 0 && '-ml-3'
              )}
              alt={user.name}
            >
              <Avatar.Image source={{ uri: user.image }} />
              <Avatar.Fallback
                classNames={{
                  container: 'bg-warning',
                  text: 'text-warning-foreground',
                }}
              >
                {user.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </Avatar.Fallback>
            </Avatar>
          ))}
        </View>
      </View>

      <SectionTitle title="Custom Styles" />
      <View className="flex-row items-center justify-center gap-4">
        <Avatar className="h-16 w-16" alt="Extra Large">
          <Avatar.Image source={{ uri: users[0]?.image }} />
          <Avatar.Fallback>XL</Avatar.Fallback>
        </Avatar>

        <Avatar className="rounded-lg" alt="Square Avatar">
          <Avatar.Image source={{ uri: users[1]?.image }} />
          <Avatar.Fallback className="rounded-lg">SQ</Avatar.Fallback>
        </Avatar>

        <Avatar className="p-0.5" size="lg" alt="Gradient Border">
          <LinearGradient
            colors={['#ec4899', '#f59e0b']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={StyleSheet.absoluteFill}
          />
          <Avatar.Image
            className="border-[0.5px] border-background rounded-full"
            source={{ uri: users[2]?.image }}
          />
          <Avatar.Fallback className="border-none">GB</Avatar.Fallback>
        </Avatar>

        <View className="relative">
          <Avatar size="lg" alt="Online User">
            <Avatar.Image source={{ uri: users[3]?.image }} asChild>
              <Image
                style={{ width: '100%', height: '100%' }}
                contentFit="cover"
              />
            </Avatar.Image>
            <Avatar.Fallback>ON</Avatar.Fallback>
          </Avatar>
          <View className="absolute bottom-0 right-0 size-3.5 rounded-full bg-green-500 border border-background" />
        </View>
      </View>
    </ScreenScrollView>
  );
}
