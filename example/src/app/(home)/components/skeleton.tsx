/* eslint-disable react-native/no-inline-styles */
import {
  Avatar,
  Button,
  Card,
  RadioGroup,
  Skeleton,
  SkeletonGroup,
  Surface,
  type SkeletonAnimation,
} from 'heroui-native';
import { useState } from 'react';
import { Image, Text, View } from 'react-native';
import Animated, { FadeInLeft, FadeOutRight } from 'react-native-reanimated';
import { AppText } from '../../../components/app-text';
import type { UsageVariant } from '../../../components/component-presentation/types';
import { UsageVariantFlatList } from '../../../components/component-presentation/usage-variant-flatlist';

const SkeletonControls = ({
  isLoading,
  setIsLoading,
  animationType,
  setAnimationType,
}: {
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  animationType: SkeletonAnimation;
  setAnimationType: (value: SkeletonAnimation) => void;
}) => {
  return (
    <Surface className="w-full gap-6">
      <RadioGroup
        value={animationType}
        onValueChange={(value) => setAnimationType(value as SkeletonAnimation)}
        className="flex-row justify-center gap-5"
      >
        <RadioGroup.Item value="shimmer">
          <RadioGroup.Indicator />
          <RadioGroup.Label>Shimmer</RadioGroup.Label>
        </RadioGroup.Item>
        <RadioGroup.Item value="pulse">
          <RadioGroup.Indicator />
          <RadioGroup.Label>Pulse</RadioGroup.Label>
        </RadioGroup.Item>
        <RadioGroup.Item value="none">
          <RadioGroup.Indicator />
          <RadioGroup.Label>None</RadioGroup.Label>
        </RadioGroup.Item>
      </RadioGroup>
      <Button variant="secondary" onPress={() => setIsLoading(!isLoading)}>
        {isLoading ? 'Loading...' : 'Loaded'}
      </Button>
    </Surface>
  );
};

const CardSkeletonContent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [animationType, setAnimationType] =
    useState<SkeletonAnimation>('shimmer');

  return (
    <View className="flex-1 items-center justify-center px-5">
      <View className="w-full">
        <SkeletonGroup
          isLoading={isLoading}
          animationType={animationType}
          className="h-[360px]"
        >
          <Card className="p-4">
            <Card.Header>
              <View className="flex-row items-center gap-3 mb-4">
                <SkeletonGroup.Item className="size-10 rounded-full">
                  <Avatar size="sm" alt="Avatar">
                    <Avatar.Image
                      source={{ uri: 'https://i.pravatar.cc/150?img=4' }}
                    />
                    <Avatar.Fallback />
                  </Avatar>
                </SkeletonGroup.Item>

                <View className="flex-1 gap-1.5">
                  {isLoading && (
                    <>
                      <SkeletonGroup.Item className="h-2.5 w-32 rounded-md" />
                      <SkeletonGroup.Item className="h-2.5 w-24 rounded-md" />
                    </>
                  )}
                  {!isLoading && (
                    <View>
                      <Text className="font-semibold text-foreground">
                        Alex Mitchell
                      </Text>
                      <Text className="text-sm text-muted">@alexmitchell</Text>
                    </View>
                  )}
                </View>
              </View>

              <View className="mb-4">
                {isLoading && (
                  <View className="gap-2">
                    <SkeletonGroup.Item className="h-3 w-full rounded-md" />
                    <SkeletonGroup.Item className="h-3 w-2/3 rounded-md" />
                  </View>
                )}
                {!isLoading && (
                  <Text className="text-base text-foreground">
                    Finally picked up my dream car today! The sleek design and
                    powerful engine.
                  </Text>
                )}
              </View>
            </Card.Header>

            <SkeletonGroup.Item className="h-48 w-full rounded-2xl">
              <View className="h-48 bg-surface-secondary rounded-2xl overflow-hidden">
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
        <SkeletonControls
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          animationType={animationType}
          setAnimationType={setAnimationType}
        />
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const ListSkeletonContent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [animationType, setAnimationType] =
    useState<SkeletonAnimation>('shimmer');

  return (
    <View className="flex-1 items-center justify-center px-5 gap-12">
      <View className="w-full gap-3 h-[175px]">
        {[1, 2, 3].map((item) => (
          <SkeletonGroup
            key={item}
            isLoading={isLoading}
            isSkeletonOnly
            animationType={animationType}
            className="flex-row items-center gap-3"
          >
            <SkeletonGroup.Item className="size-12 rounded-xl" />
            <View className="flex-1 gap-1.5">
              <SkeletonGroup.Item className="h-4 w-full rounded-md" />
              <SkeletonGroup.Item className="h-3 w-2/3 rounded-md" />
            </View>
          </SkeletonGroup>
        ))}
        {!isLoading && (
          <View className="flex-1 items-center justify-center">
            <Text className="text-lg text-muted">No Data</Text>
          </View>
        )}
      </View>
      <SkeletonControls
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        animationType={animationType}
        setAnimationType={setAnimationType}
      />
    </View>
  );
};

// ------------------------------------------------------------------------------

const TextSkeletonsContent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [animationType, setAnimationType] =
    useState<SkeletonAnimation>('shimmer');

  return (
    <View className="flex-1 items-center justify-center px-5">
      <View className="w-full gap-6 h-[100px]">
        {isLoading ? (
          <SkeletonGroup
            entering={FadeInLeft.duration(200)}
            exiting={FadeOutRight.duration(200)}
            isLoading={isLoading}
            animationType={animationType}
            isSkeletonOnly
            className="gap-2"
          >
            <SkeletonGroup.Item className="h-4 w-full rounded-md" />
            <SkeletonGroup.Item className="h-4 w-3/4 rounded-md" />
            <SkeletonGroup.Item className="h-4 w-1/2 rounded-md" />
          </SkeletonGroup>
        ) : (
          <Animated.View
            key="text"
            entering={FadeInLeft.duration(200)}
            exiting={FadeOutRight.duration(200)}
          >
            <AppText className="text-base text-foreground">
              The new productivity dashboard makes it easy to track daily tasks
              and goals. You can customize widgets and set smart reminders.
            </AppText>
          </Animated.View>
        )}
      </View>
      <SkeletonControls
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        animationType={animationType}
        setAnimationType={setAnimationType}
      />
    </View>
  );
};

// ------------------------------------------------------------------------------

const CircularSkeletonsContent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [animationType, setAnimationType] =
    useState<SkeletonAnimation>('shimmer');

  return (
    <View className="flex-1 items-center justify-center gap-12 px-5">
      <View className="gap-6">
        <SkeletonGroup
          isLoading={isLoading}
          animationType={animationType}
          className="flex-row gap-4 items-end justify-center"
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
      </View>
      <SkeletonControls
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        animationType={animationType}
        setAnimationType={setAnimationType}
      />
    </View>
  );
};

// ------------------------------------------------------------------------------

const CustomShimmerConfigContent = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <View className="flex-1 items-center justify-center px-5">
      <View className="w-full gap-12">
        <View className="gap-3">
          <Skeleton
            className="h-16 w-full rounded-2xl"
            isLoading={isLoading}
            animationType="shimmer"
            shimmerConfig={{
              duration: 2000,
              highlightColor: 'rgba(59, 130, 246, 0.3)',
            }}
          >
            <View
              className="h-16 bg-blue-500 rounded-2xl items-center justify-center"
              style={{ borderCurve: 'continuous' }}
            >
              <Text className="text-white">Blue Shimmer</Text>
            </View>
          </Skeleton>

          <Skeleton
            className="h-16 w-full rounded-2xl"
            isLoading={isLoading}
            animationType="shimmer"
            shimmerConfig={{
              duration: 1000,
              speed: 2,
              highlightColor: 'rgba(34, 197, 94, 0.3)',
            }}
          >
            <View
              className="h-16 bg-green-500 rounded-2xl items-center justify-center"
              style={{ borderCurve: 'continuous' }}
            >
              <Text className="text-white">Fast Green Shimmer</Text>
            </View>
          </Skeleton>
        </View>
        <View className="items-center">
          <Button
            variant="secondary"
            onPress={() => setIsLoading(!isLoading)}
            size="sm"
          >
            {isLoading ? 'Loading...' : 'Loaded'}
          </Button>
        </View>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const CustomPulseConfigContent = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <View className="flex-1 items-center justify-center px-5">
      <View className="w-full gap-6">
        <View className="gap-3">
          <Skeleton
            className="h-16 w-full rounded-2xl bg-purple-500"
            isLoading={isLoading}
            animationType="pulse"
            pulseConfig={{
              duration: 500,
              minOpacity: 0.2,
              maxOpacity: 0.8,
            }}
          >
            <View
              className="h-16 bg-purple-500 rounded-2xl items-center justify-center"
              style={{ borderCurve: 'continuous' }}
            >
              <Text className="text-white">Fast Pulse</Text>
            </View>
          </Skeleton>

          <Skeleton
            className="h-16 w-full rounded-2xl bg-orange-500"
            isLoading={isLoading}
            animationType="pulse"
            pulseConfig={{
              duration: 1000,
              minOpacity: 0.5,
              maxOpacity: 1,
            }}
          >
            <View
              className="h-16 bg-orange-500 rounded-2xl items-center justify-center"
              style={{ borderCurve: 'continuous' }}
            >
              <Text className="text-white">Slow Subtle Pulse</Text>
            </View>
          </Skeleton>
        </View>
        <View className="items-center">
          <Button
            variant="secondary"
            onPress={() => setIsLoading(!isLoading)}
            size="sm"
          >
            {isLoading ? 'Loading...' : 'Loaded'}
          </Button>
        </View>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const SKELETON_VARIANTS: UsageVariant[] = [
  {
    value: 'card-skeleton',
    label: 'Card skeleton',
    content: <CardSkeletonContent />,
  },
  {
    value: 'list-skeleton',
    label: 'List skeleton',
    content: <ListSkeletonContent />,
  },
  {
    value: 'text-skeletons',
    label: 'Text skeletons',
    content: <TextSkeletonsContent />,
  },
  {
    value: 'circular-skeletons',
    label: 'Circular skeletons',
    content: <CircularSkeletonsContent />,
  },
  {
    value: 'custom-shimmer-config',
    label: 'Custom shimmer configuration',
    content: <CustomShimmerConfigContent />,
  },
  {
    value: 'custom-pulse-config',
    label: 'Custom pulse configuration',
    content: <CustomPulseConfigContent />,
  },
];

export default function SkeletonScreen() {
  return <UsageVariantFlatList data={SKELETON_VARIANTS} />;
}
