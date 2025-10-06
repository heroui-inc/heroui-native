import {
  Avatar,
  Button,
  Card,
  cn,
  RadioGroup,
  Skeleton,
  SkeletonGroup,
  type SkeletonAnimation,
} from 'heroui-native';
import { useState } from 'react';
import { Image, Text, View } from 'react-native';
import { FadeInLeft, FadeOutRight } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppText } from '../../../components/app-text';
import { ScreenScrollView } from '../../../components/screen-scroll-view';
import { SectionTitle } from '../../../components/section-title';

export default function SkeletonScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [animationType, setAnimationType] =
    useState<SkeletonAnimation>('shimmer');

  const insets = useSafeAreaInsets();

  return (
    <>
      <ScreenScrollView contentContainerClassName="gap-16">
        <SectionTitle title="Card Skeleton" />
        <View className="w-full">
          <SkeletonGroup isLoading={isLoading} animationType={animationType}>
            <Card className="p-4">
              <Card.Header>
                <View className="flex-row items-center gap-3 mb-4">
                  <SkeletonGroup.Item className="h-10 w-10 rounded-full">
                    <Avatar size="sm" alt="Avatar">
                      <Avatar.Image
                        source={{ uri: 'https://i.pravatar.cc/150?img=4' }}
                      />
                      <Avatar.Fallback />
                    </Avatar>
                  </SkeletonGroup.Item>

                  <View className="flex-1 gap-1">
                    <SkeletonGroup.Item className="h-3 w-32 rounded-md">
                      <Text className="font-semibold text-foreground">
                        John Doe
                      </Text>
                    </SkeletonGroup.Item>
                    <SkeletonGroup.Item className="h-3 w-24 rounded-md">
                      <Text className="text-sm text-muted-foreground">
                        @johndoe
                      </Text>
                    </SkeletonGroup.Item>
                  </View>
                </View>

                <View className={cn('mb-4', isLoading && 'gap-1.5')}>
                  <SkeletonGroup.Item className="h-4 w-full rounded-md">
                    <Text className="text-base text-foreground">
                      This is the first line of the post content.
                    </Text>
                  </SkeletonGroup.Item>

                  <SkeletonGroup.Item className="h-4 w-full rounded-md">
                    <Text className="text-base text-foreground">
                      Second line with more interesting content to read.
                    </Text>
                  </SkeletonGroup.Item>

                  <SkeletonGroup.Item className="h-4 w-2/3 rounded-md">
                    <Text className="text-base text-foreground">
                      Last line is shorter.
                    </Text>
                  </SkeletonGroup.Item>
                </View>
              </Card.Header>

              <SkeletonGroup.Item className="h-48 w-full rounded-lg">
                <View className="h-48 bg-surface-3 rounded-lg overflow-hidden">
                  <Image
                    source={{
                      uri: 'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/backgrounds/cards/car1.jpg',
                    }}
                    className="h-full w-full"
                  />
                </View>
              </SkeletonGroup.Item>
            </Card>
          </SkeletonGroup>
        </View>

        <SectionTitle title="Text Skeletons" />
        <SkeletonGroup
          entering={FadeInLeft}
          exiting={FadeOutRight}
          isLoading={isLoading}
          animationType={animationType}
          className="w-full gap-2"
        >
          <SkeletonGroup.Item className="h-4 w-full rounded-md">
            <Text className="text-foreground">
              This is a full width text content
            </Text>
          </SkeletonGroup.Item>

          <SkeletonGroup.Item className="h-4 w-3/4 rounded-md">
            <Text className="text-foreground">This is 3/4 width text</Text>
          </SkeletonGroup.Item>

          <SkeletonGroup.Item className="h-4 w-1/2 rounded-md">
            <Text className="text-foreground">Half width</Text>
          </SkeletonGroup.Item>
        </SkeletonGroup>

        <SectionTitle title="Circular Skeletons" />
        <SkeletonGroup
          isLoading={isLoading}
          animationType={animationType}
          className="flex-row gap-4 items-center justify-center"
        >
          <SkeletonGroup.Item className="size-10 rounded-full">
            <Avatar size="sm" alt="Avatar">
              <Avatar.Image
                source={{
                  uri: 'https://img.heroui.chat/image/avatar?w=400&h=400&u=3',
                }}
              />
              <Avatar.Fallback />
            </Avatar>
          </SkeletonGroup.Item>

          <SkeletonGroup.Item className="size-12 rounded-full">
            <Avatar size="md" alt="Avatar">
              <Avatar.Image
                source={{
                  uri: 'https://img.heroui.chat/image/avatar?w=400&h=400&u=5',
                }}
              />
              <Avatar.Fallback />
            </Avatar>
          </SkeletonGroup.Item>

          <SkeletonGroup.Item className="size-16 rounded-full">
            <Avatar size="lg" alt="Avatar">
              <Avatar.Image
                source={{
                  uri: 'https://img.heroui.chat/image/avatar?w=400&h=400&u=20',
                }}
              />
              <Avatar.Fallback />
            </Avatar>
          </SkeletonGroup.Item>
        </SkeletonGroup>

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
        <View
          className="w-full gap-3"
          style={{ paddingBottom: insets.bottom + 100 }}
        >
          {[1, 2, 3].map((item) => (
            <SkeletonGroup
              key={item}
              isLoading={isLoading}
              isSkeletonOnly
              animationType={animationType}
              className="flex-row items-center gap-3"
            >
              <SkeletonGroup.Item className="h-12 w-12 rounded-lg" />
              <View className="flex-1 gap-1.5">
                <SkeletonGroup.Item className="h-4 w-full rounded-md" />
                <SkeletonGroup.Item className="h-3 w-2/3 rounded-md" />
              </View>
            </SkeletonGroup>
          ))}
          {!isLoading && (
            <AppText className="text-lg text-center text-muted-foreground">
              No Data
            </AppText>
          )}
        </View>
      </ScreenScrollView>
      <View
        className="absolute bottom-0 left-0 right-0 pt-5 bg-background border-t border-border"
        style={{ paddingBottom: insets.bottom + 12 }}
      >
        <View className="gap-6 items-center">
          <RadioGroup
            value={animationType}
            onValueChange={(value) =>
              setAnimationType(value as SkeletonAnimation)
            }
            className="flex-row justify-center gap-5"
          >
            <RadioGroup.Item value="shimmer">
              <RadioGroup.Indicator />
              <RadioGroup.Title>Shimmer</RadioGroup.Title>
            </RadioGroup.Item>
            <RadioGroup.Item value="pulse">
              <RadioGroup.Indicator />
              <RadioGroup.Title>Pulse</RadioGroup.Title>
            </RadioGroup.Item>
            <RadioGroup.Item value="none">
              <RadioGroup.Indicator />
              <RadioGroup.Title>None</RadioGroup.Title>
            </RadioGroup.Item>
          </RadioGroup>
          <Button onPress={() => setIsLoading(!isLoading)} size="sm">
            {isLoading ? 'Loading...' : 'Loaded'}
          </Button>
        </View>
      </View>
    </>
  );
}
