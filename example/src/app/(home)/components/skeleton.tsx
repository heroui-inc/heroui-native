import { Avatar, Button, Card, Skeleton } from 'heroui-native';
import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

export default function SkeletonScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [animationType, setAnimationType] = useState<
    'shimmer' | 'pulse' | 'none'
  >('shimmer');

  return (
    <ScrollView
      className="bg-background"
      contentContainerClassName="items-center justify-center p-4"
      contentInsetAdjustmentBehavior="automatic"
    >
      {/* Controls */}
      <View className="w-full mb-6">
        <Text className="text-lg font-bold text-muted-foreground mb-4">
          Controls
        </Text>

        <View className="flex-row gap-2 mb-4">
          <Button onPress={() => setIsLoading(!isLoading)} size="sm">
            {isLoading ? 'Loading' : 'Loaded'}
          </Button>
        </View>

        <View className="flex-row gap-2">
          <Button onPress={() => setAnimationType('shimmer')} size="sm">
            Shimmer
          </Button>
          <Button onPress={() => setAnimationType('pulse')} size="sm">
            Pulse
          </Button>
          <Button onPress={() => setAnimationType('none')} size="sm">
            None
          </Button>
        </View>
      </View>

      {/* Text Skeletons */}
      <Text className="text-lg font-bold text-muted-foreground mb-4">
        Text Skeletons
      </Text>

      <View className="w-full gap-3 mb-6">
        <Skeleton
          className="h-4 w-full rounded-md"
          isLoading={isLoading}
          animationType={animationType}
        >
          <Text className="text-foreground">
            This is a full width text content
          </Text>
        </Skeleton>

        <Skeleton
          className="h-4 w-3/4 rounded-md"
          isLoading={isLoading}
          animationType={animationType}
        >
          <Text className="text-foreground">This is 3/4 width text</Text>
        </Skeleton>

        <Skeleton
          className="h-4 w-1/2 rounded-md"
          isLoading={isLoading}
          animationType={animationType}
        >
          <Text className="text-foreground">Half width</Text>
        </Skeleton>
      </View>

      {/* Circular Skeletons */}
      <Text className="text-lg font-bold text-muted-foreground mb-4">
        Circular Skeletons
      </Text>

      <View className="flex-row gap-4 mb-6">
        <Skeleton
          className="h-12 w-12 rounded-full"
          isLoading={isLoading}
          animationType={animationType}
        >
          <Avatar size="sm" alt="Avatar">
            <Avatar.Image source={{ uri: 'https://i.pravatar.cc/150?img=1' }} />
            <Avatar.Fallback />
          </Avatar>
        </Skeleton>

        <Skeleton
          className="h-16 w-16 rounded-full"
          isLoading={isLoading}
          animationType={animationType}
        >
          <Avatar size="md" alt="Avatar">
            <Avatar.Image source={{ uri: 'https://i.pravatar.cc/150?img=2' }} />
            <Avatar.Fallback />
          </Avatar>
        </Skeleton>

        <Skeleton
          className="h-20 w-20 rounded-full"
          isLoading={isLoading}
          animationType={animationType}
        >
          <Avatar size="lg" alt="Avatar">
            <Avatar.Image source={{ uri: 'https://i.pravatar.cc/150?img=3' }} />
            <Avatar.Fallback />
          </Avatar>
        </Skeleton>
      </View>

      {/* Card Skeleton */}
      <Text className="text-lg font-bold text-muted-foreground mb-4">
        Card Skeleton
      </Text>

      <View className="w-full mb-6">
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

            <View className="flex-1 gap-2">
              <Skeleton
                className="h-4 w-32 rounded-md"
                isLoading={isLoading}
                animationType={animationType}
              >
                <Text className="font-semibold">John Doe</Text>
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
              <Text>
                This is the first line of the post content that spans the full
                width.
              </Text>
            </Skeleton>

            <Skeleton
              className="h-4 w-full rounded-md"
              isLoading={isLoading}
              animationType={animationType}
            >
              <Text>Second line with more interesting content to read.</Text>
            </Skeleton>

            <Skeleton
              className="h-4 w-2/3 rounded-md"
              isLoading={isLoading}
              animationType={animationType}
            >
              <Text>Last line is shorter.</Text>
            </Skeleton>
          </View>

          <Skeleton
            className="h-48 w-full rounded-lg"
            isLoading={isLoading}
            animationType={animationType}
          >
            <View className="h-48 bg-accent rounded-lg items-center justify-center">
              <Text className="text-white">Image Content</Text>
            </View>
          </Skeleton>
        </Card>
      </View>

      {/* Custom Shimmer Colors */}
      <Text className="text-lg font-bold text-muted-foreground mb-4">
        Custom Shimmer Configuration
      </Text>

      <View className="w-full gap-3 mb-6">
        <Skeleton
          className="h-16 w-full rounded-lg"
          isLoading={isLoading}
          animationType="shimmer"
          shimmerConfig={{
            duration: 2000,
            gradientConfig: {
              colors: ['transparent', 'rgba(59, 130, 246, 0.3)', 'transparent'],
            },
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
            gradientConfig: {
              colors: ['transparent', 'rgba(34, 197, 94, 0.3)', 'transparent'],
            },
          }}
        >
          <View className="h-16 bg-green-500 rounded-lg items-center justify-center">
            <Text className="text-white">Fast Green Shimmer</Text>
          </View>
        </Skeleton>
      </View>

      {/* Custom Pulse Configuration */}
      <Text className="text-lg font-bold text-muted-foreground mb-4">
        Custom Pulse Configuration
      </Text>

      <View className="w-full gap-3 mb-6">
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

      {/* List Skeleton */}
      <Text className="text-lg font-bold text-muted-foreground mb-4">
        List Skeleton
      </Text>

      <View className="w-full gap-3 mb-6">
        {[1, 2, 3].map((item) => (
          <View key={item} className="flex-row items-center gap-3">
            <Skeleton
              className="h-12 w-12 rounded-lg"
              isLoading={isLoading}
              animationType={animationType}
            >
              <View className="h-12 w-12 bg-accent rounded-lg" />
            </Skeleton>

            <View className="flex-1 gap-2">
              <Skeleton
                className="h-4 w-full rounded-md"
                isLoading={isLoading}
                animationType={animationType}
              >
                <Text className="font-semibold">List Item {item}</Text>
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
    </ScrollView>
  );
}
