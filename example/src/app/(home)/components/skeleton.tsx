import {
  Avatar,
  Button,
  Card,
  cn,
  Radio,
  RadioGroup,
  Skeleton,
  type SkeletonAnimation,
} from 'heroui-native';
import { useState } from 'react';
import { Text, View } from 'react-native';
import { FadeInLeft, FadeOutRight } from 'react-native-reanimated';
import { ScreenScrollView } from '../../../components/screen-scroll-view';
import { SectionTitle } from '../../../components/section-title';

export default function SkeletonScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [animationType, setAnimationType] =
    useState<SkeletonAnimation>('shimmer');

  return (
    <ScreenScrollView contentContainerClassName="gap-16">
      <SectionTitle title="Controls" />
      <View className="gap-6 items-center">
        <RadioGroup
          value={animationType}
          onValueChange={(value) =>
            setAnimationType(value as SkeletonAnimation)
          }
          orientation="horizontal"
        >
          <Radio value="shimmer" alignIndicator="start">
            <Radio.Content>
              <Radio.Title>Shimmer</Radio.Title>
            </Radio.Content>
          </Radio>
          <Radio value="pulse" alignIndicator="start">
            <Radio.Content>
              <Radio.Title>Pulse</Radio.Title>
            </Radio.Content>
          </Radio>
          <Radio value="none" alignIndicator="start">
            <Radio.Content>
              <Radio.Title>None</Radio.Title>
            </Radio.Content>
          </Radio>
        </RadioGroup>
        <Button onPress={() => setIsLoading(!isLoading)} size="sm">
          {isLoading ? 'Loading...' : 'Loaded'}
        </Button>
      </View>

      <SectionTitle title="Card Skeleton" />

      <View className="w-full">
        <Card className="p-4">
          <View className="flex-row items-center gap-3 mb-4">
            <Skeleton
              className="h-10 w-10 rounded-full"
              isLoading={isLoading}
              animationType={animationType}
            >
              <Avatar size="sm" alt="Avatar">
                <Avatar.Image
                  source={{ uri: 'https://i.pravatar.cc/150?img=4' }}
                />
                <Avatar.Fallback />
              </Avatar>
            </Skeleton>

            <View className="flex-1 gap-1">
              <Skeleton
                className="h-3 w-32 rounded-md"
                isLoading={isLoading}
                animationType={animationType}
              >
                <Text className="font-semibold text-foreground">John Doe</Text>
              </Skeleton>
              <Skeleton
                className="h-3 w-24 rounded-md"
                isLoading={isLoading}
                animationType={animationType}
              >
                <Text className="text-sm text-muted-foreground">@johndoe</Text>
              </Skeleton>
            </View>
          </View>

          <View className="gap-2 mb-4">
            <Skeleton
              className="h-4 w-full rounded-md"
              isLoading={isLoading}
              animationType={animationType}
            >
              <Text className="text-base text-foreground">
                This is the first line of the post content that spans the full
                width.
              </Text>
            </Skeleton>

            <Skeleton
              className="h-4 w-full rounded-md"
              isLoading={isLoading}
              animationType={animationType}
            >
              <Text className="text-base text-foreground">
                Second line with more interesting content to read.
              </Text>
            </Skeleton>

            <Skeleton
              className="h-4 w-2/3 rounded-md"
              isLoading={isLoading}
              animationType={animationType}
            >
              <Text className="text-base text-foreground">
                Last line is shorter.
              </Text>
            </Skeleton>
          </View>

          <Skeleton
            className="h-48 w-full rounded-lg"
            isLoading={isLoading}
            animationType={animationType}
          >
            <View className="h-48 bg-surface-3 rounded-lg items-center justify-center">
              <Text className="text-foreground">Image Content</Text>
            </View>
          </Skeleton>
        </Card>
      </View>

      <SectionTitle title="Text Skeletons" />
      <View className="w-full gap-2">
        <Skeleton
          entering={FadeInLeft}
          exiting={FadeOutRight}
          className="h-4 w-full rounded-md"
          isLoading={isLoading}
          animationType={animationType}
        >
          <Text className="text-foreground">
            This is a full width text content
          </Text>
        </Skeleton>

        <Skeleton
          entering={FadeInLeft}
          exiting={FadeOutRight}
          className="h-4 w-3/4 rounded-md"
          isLoading={isLoading}
          animationType={animationType}
        >
          <Text className="text-foreground">This is 3/4 width text</Text>
        </Skeleton>

        <Skeleton
          entering={FadeInLeft}
          exiting={FadeOutRight}
          className="h-4 w-1/2 rounded-md"
          isLoading={isLoading}
          animationType={animationType}
        >
          <Text className="text-foreground">Half width</Text>
        </Skeleton>
      </View>

      <SectionTitle title="Circular Skeletons" />
      <View className="flex-row gap-4 items-center justify-center">
        <Skeleton
          className="size-10 rounded-full"
          isLoading={isLoading}
          animationType={animationType}
        >
          <Avatar size="sm" alt="Avatar">
            <Avatar.Image source={{ uri: 'https://i.pravatar.cc/150?img=1' }} />
            <Avatar.Fallback />
          </Avatar>
        </Skeleton>

        <Skeleton
          className="size-12 rounded-full"
          isLoading={isLoading}
          animationType={animationType}
        >
          <Avatar size="md" alt="Avatar">
            <Avatar.Image source={{ uri: 'https://i.pravatar.cc/150?img=2' }} />
            <Avatar.Fallback />
          </Avatar>
        </Skeleton>

        <Skeleton
          className="size-16 rounded-full"
          isLoading={isLoading}
          animationType={animationType}
        >
          <Avatar size="lg" alt="Avatar">
            <Avatar.Image source={{ uri: 'https://i.pravatar.cc/150?img=3' }} />
            <Avatar.Fallback />
          </Avatar>
        </Skeleton>
      </View>

      <SectionTitle title="Custom Shimmer Configuration" />
      <View className="w-full gap-3">
        <Skeleton
          className="h-16 w-full rounded-lg"
          isLoading={isLoading}
          animationType="shimmer"
          shimmerConfig={{
            duration: 2000,
            highlightColor: 'rgba(59, 130, 246, 0.3)',
          }}
        >
          <View className="h-16 bg-blue-500 rounded-lg items-center justify-center">
            <Text className="text-white">Blue Shimmer</Text>
          </View>
        </Skeleton>

        <Skeleton
          className="h-16 w-full rounded-lg"
          isLoading={isLoading}
          animationType="shimmer"
          shimmerConfig={{
            duration: 1000,
            speed: 2,
            highlightColor: 'rgba(34, 197, 94, 0.3)',
          }}
        >
          <View className="h-16 bg-green-500 rounded-lg items-center justify-center">
            <Text className="text-white">Fast Green Shimmer</Text>
          </View>
        </Skeleton>
      </View>

      <SectionTitle title="Custom Pulse Configuration" />
      <View className="w-full gap-3">
        <Skeleton
          className="h-16 w-full rounded-lg"
          isLoading={isLoading}
          animationType="pulse"
          pulseConfig={{
            duration: 500,
            minOpacity: 0.1,
            maxOpacity: 0.8,
          }}
        >
          <View className="h-16 bg-purple-500 rounded-lg items-center justify-center">
            <Text className="text-white">Fast Pulse</Text>
          </View>
        </Skeleton>

        <Skeleton
          className="h-16 w-full rounded-lg"
          isLoading={isLoading}
          animationType="pulse"
          pulseConfig={{
            duration: 2000,
            minOpacity: 0.5,
            maxOpacity: 1,
          }}
        >
          <View className="h-16 bg-orange-500 rounded-lg items-center justify-center">
            <Text className="text-white">Slow Subtle Pulse</Text>
          </View>
        </Skeleton>
      </View>

      <SectionTitle title="List Skeleton" />
      <View className="w-full gap-3">
        {[1, 2, 3].map((item) => (
          <View key={item} className="flex-row items-center gap-3">
            <Skeleton
              className="h-12 w-12 rounded-lg"
              isLoading={isLoading}
              animationType={animationType}
            >
              <View className="h-12 w-12 bg-surface-3 rounded-lg" />
            </Skeleton>

            <View className={cn('flex-1', isLoading && 'gap-1.5')}>
              <Skeleton
                className="h-4 w-full rounded-md"
                isLoading={isLoading}
                animationType={animationType}
              >
                <Text className="font-semibold text-foreground">
                  List Item {item}
                </Text>
              </Skeleton>

              <Skeleton
                className="h-3 w-2/3 rounded-md"
                isLoading={isLoading}
                animationType={animationType}
              >
                <Text className="text-sm text-muted-foreground">
                  Description text
                </Text>
              </Skeleton>
            </View>
          </View>
        ))}
      </View>
    </ScreenScrollView>
  );
}
