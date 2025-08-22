import { Avatar } from 'heroui-native';
import { View } from 'react-native';
import { ScreenScrollView } from '../../components/screen-scroll-view';
import { SectionTitle } from '../../components/section-title';

export default function AvatarExample() {
  return (
    <ScreenScrollView contentContainerClassName="gap-16">
      {/* Basic Usage */}
      <SectionTitle title="Basic Usage" />
      <View className="gap-4 flex-row">
        <Avatar>
          <Avatar.Fallback>JD</Avatar.Fallback>
        </Avatar>

        <Avatar>
          <Avatar.Image
            source="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
            alt="Colm Tuite"
          />
          <Avatar.Fallback>AB</Avatar.Fallback>
        </Avatar>

        <Avatar>
          <Avatar.Image
            source="https://i.pravatar.cc/150?u=a042581f4e29026024d"
            alt="Pedro Duarte"
          />
          <Avatar.Fallback>JS</Avatar.Fallback>
        </Avatar>
      </View>

      {/* Different Sizes */}
      <SectionTitle title="Different Sizes" />
      <View className="flex-row gap-4 items-end">
        <Avatar size="sm">
          <Avatar.Fallback>SM</Avatar.Fallback>
        </Avatar>
        <Avatar size="md">
          <Avatar.Fallback>MD</Avatar.Fallback>
        </Avatar>
        <Avatar size="lg">
          <Avatar.Image
            source="https://i.pravatar.cc/150?u=a042581f4e29026024d"
            alt="Pedro Duarte"
          />
          <Avatar.Fallback>LG</Avatar.Fallback>
        </Avatar>
        <Avatar size="xl">
          <Avatar.Image
            source="https://images.unsplash.com/photo-1511485977113-f34c92461ad9"
            alt="Pedro Duarte"
          />
          <Avatar.Fallback>XL</Avatar.Fallback>
        </Avatar>
      </View>

      {/* Different Radius */}
      <SectionTitle title="Different Radius" />
      <View className="flex-row gap-4">
        <Avatar radius="sm">
          <Avatar.Fallback>SM</Avatar.Fallback>
        </Avatar>
        <Avatar radius="md">
          <Avatar.Fallback>MD</Avatar.Fallback>
        </Avatar>
        <Avatar radius="lg">
          <Avatar.Image
            source="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
            alt="Colm Tuite"
          />
          <Avatar.Fallback>LG</Avatar.Fallback>
        </Avatar>
        <Avatar radius="xl">
          <Avatar.Image
            source="https://i.pravatar.cc/150?u=a042581f4e29026024d"
            alt="Pedro Duarte"
          />
          <Avatar.Fallback>XL</Avatar.Fallback>
        </Avatar>
        <Avatar radius="full">
          <Avatar.Image
            source="https://images.unsplash.com/photo-1511485977113-f34c92461ad9"
            alt="Pedro Duarte"
          />
          <Avatar.Fallback>FU</Avatar.Fallback>
        </Avatar>
      </View>
    </ScreenScrollView>
  );
}
