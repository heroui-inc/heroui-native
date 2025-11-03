/* eslint-disable react-native/no-inline-styles */
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Avatar, cn } from 'heroui-native';
import { StyleSheet, Text, View } from 'react-native';
import { withUniwind } from 'uniwind';
import type { UsageVariant } from '../../../components/component-presentation/types';
import { UsageVariantFlatList } from '../../../components/component-presentation/usage-variant-flatlist';

const StyledIonicons = withUniwind(Ionicons);

const SizesContent = () => {
  return (
    <View className="flex-1 px-5 items-center justify-center">
      <View className="flex-row items-center justify-center gap-4">
        <Avatar size="sm" alt="Small Avatar">
          <Avatar.Image
            source={{
              uri: 'https://img.heroui.chat/image/avatar?w=400&h=400&u=3',
            }}
          />
          <Avatar.Fallback />
        </Avatar>
        <Avatar size="md" alt="Medium Avatar">
          <Avatar.Image
            source={{
              uri: 'https://img.heroui.chat/image/avatar?w=400&h=400&u=5',
            }}
          />
          <Avatar.Fallback>MD</Avatar.Fallback>
        </Avatar>
        <Avatar size="lg" alt="Large Avatar">
          <Avatar.Image
            source={{
              uri: 'https://img.heroui.chat/image/avatar?w=400&h=400&u=20',
            }}
          />
          <Avatar.Fallback>LG</Avatar.Fallback>
        </Avatar>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const DefaultTextFallbackContent = () => {
  return (
    <View className="flex-1 px-5 items-center justify-center">
      <View className="flex-row items-center justify-center gap-3">
        <Avatar color="accent" alt="Accent">
          <Avatar.Image source={undefined} />
          <Avatar.Fallback>AC</Avatar.Fallback>
        </Avatar>
        <Avatar color="default" alt="Default">
          <Avatar.Image source={undefined} />
          <Avatar.Fallback>DF</Avatar.Fallback>
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
  );
};

// ------------------------------------------------------------------------------

const SoftTextFallbackContent = () => {
  return (
    <View className="flex-1 px-5 items-center justify-center">
      <View className="flex-row items-center justify-center gap-3">
        <Avatar variant="soft" color="accent" alt="Accent">
          <Avatar.Image source={undefined} />
          <Avatar.Fallback>AC</Avatar.Fallback>
        </Avatar>
        <Avatar variant="soft" color="default" alt="Default">
          <Avatar.Image source={undefined} />
          <Avatar.Fallback>DF</Avatar.Fallback>
        </Avatar>
        <Avatar variant="soft" color="success" alt="Success">
          <Avatar.Image source={undefined} />
          <Avatar.Fallback>SC</Avatar.Fallback>
        </Avatar>
        <Avatar variant="soft" color="warning" alt="Warning">
          <Avatar.Image source={undefined} />
          <Avatar.Fallback>WR</Avatar.Fallback>
        </Avatar>
        <Avatar variant="soft" color="danger" alt="Danger">
          <Avatar.Image source={undefined} />
          <Avatar.Fallback>DG</Avatar.Fallback>
        </Avatar>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const DefaultIconFallbackContent = () => {
  return (
    <View className="flex-1 px-5 items-center justify-center">
      <View className="flex-row items-center justify-center gap-3">
        <Avatar color="accent" alt="Accent">
          <Avatar.Image source={undefined} />
          <Avatar.Fallback />
        </Avatar>
        <Avatar color="default" alt="Default">
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
    </View>
  );
};

// ------------------------------------------------------------------------------

const SoftIconFallbackContent = () => {
  return (
    <View className="flex-1 px-5 items-center justify-center">
      <View className="flex-row items-center justify-center gap-3">
        <Avatar variant="soft" color="accent" alt="Accent">
          <Avatar.Image source={undefined} />
          <Avatar.Fallback />
        </Avatar>
        <Avatar variant="soft" color="default" alt="Default">
          <Avatar.Image source={undefined} />
          <Avatar.Fallback />
        </Avatar>
        <Avatar variant="soft" color="success" alt="Success">
          <Avatar.Image source={undefined} />
          <Avatar.Fallback />
        </Avatar>
        <Avatar variant="soft" color="warning" alt="Warning">
          <Avatar.Image source={undefined} />
          <Avatar.Fallback />
        </Avatar>
        <Avatar variant="soft" color="danger" alt="Danger">
          <Avatar.Image source={undefined} />
          <Avatar.Fallback />
        </Avatar>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const CustomFallbackContent = () => {
  return (
    <View className="flex-1 px-5 items-center justify-center">
      <View className="flex-row items-center justify-center gap-4">
        <Avatar alt="John Doe">
          <Avatar.Fallback>🎉</Avatar.Fallback>
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
        <Avatar alt="User">
          <Avatar.Fallback>
            <StyledIonicons name="person" size={18} className="text-[#666]" />
          </Avatar.Fallback>
        </Avatar>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const AvatarGroupContent = () => {
  return (
    <View className="flex-1 px-5 items-center justify-center">
      <View className="flex-row">
        {[
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
        ].map((user, index) => (
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
  );
};

// ------------------------------------------------------------------------------

const CustomStylesContent = () => {
  return (
    <View className="flex-1 px-5 items-center justify-center">
      <View className="flex-row items-center justify-center gap-4">
        <Avatar className="h-16 w-16" alt="Extra Large">
          <Avatar.Image
            source={{
              uri: 'https://img.heroui.chat/image/avatar?w=400&h=400&u=3',
            }}
          />
          <Avatar.Fallback>XL</Avatar.Fallback>
        </Avatar>
        <Avatar className="rounded-lg" alt="Square Avatar">
          <Avatar.Image
            source={{
              uri: 'https://img.heroui.chat/image/avatar?w=400&h=400&u=5',
            }}
          />
          <Avatar.Fallback className="rounded-lg">SQ</Avatar.Fallback>
        </Avatar>
        <Avatar className="p-[2.5px]" size="lg" alt="Gradient Border">
          <LinearGradient
            colors={['#ec4899', '#f59e0b']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={StyleSheet.absoluteFill}
          />
          <Avatar.Image
            className="border-[0.5px] border-background rounded-full"
            source={{
              uri: 'https://img.heroui.chat/image/avatar?w=400&h=400&u=20',
            }}
          />
          <Avatar.Fallback className="border-none">GB</Avatar.Fallback>
        </Avatar>
        <View className="relative">
          <Avatar size="lg" alt="Online User">
            <Avatar.Image
              source={{
                uri: 'https://img.heroui.chat/image/avatar?w=400&h=400&u=23',
              }}
              asChild
            >
              <Image
                style={{ width: '100%', height: '100%' }}
                contentFit="cover"
              />
            </Avatar.Image>
            <Avatar.Fallback>ON</Avatar.Fallback>
          </Avatar>
          <View className="absolute bottom-0.5 right-0.5 size-3.5 rounded-full bg-green-500 border border-background" />
        </View>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const AVATAR_VARIANTS: UsageVariant[] = [
  {
    value: 'sizes',
    label: 'Sizes',
    content: <SizesContent />,
  },
  {
    value: 'default-text-fallback',
    label: 'Default text fallback',
    content: <DefaultTextFallbackContent />,
  },
  {
    value: 'soft-text-fallback',
    label: 'Soft text fallback',
    content: <SoftTextFallbackContent />,
  },
  {
    value: 'default-icon-fallback',
    label: 'Default icon fallback',
    content: <DefaultIconFallbackContent />,
  },
  {
    value: 'soft-icon-fallback',
    label: 'Soft icon fallback',
    content: <SoftIconFallbackContent />,
  },
  {
    value: 'custom-fallback',
    label: 'Custom fallback',
    content: <CustomFallbackContent />,
  },
  {
    value: 'avatar-group',
    label: 'Avatar group',
    content: <AvatarGroupContent />,
  },
  {
    value: 'custom-styles',
    label: 'Custom styles',
    content: <CustomStylesContent />,
  },
];

export default function AvatarScreen() {
  return <UsageVariantFlatList data={AVATAR_VARIANTS} />;
}
