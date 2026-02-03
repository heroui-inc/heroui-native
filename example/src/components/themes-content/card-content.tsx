/* eslint-disable react-native/no-inline-styles */
import { Image } from 'expo-image';
import { Card, PressableFeedback } from 'heroui-native';
import { View } from 'react-native';
import { AppText } from '../app-text';

export const CardContent = () => {
  return (
    <View className="flex-row gap-4">
      <PressableFeedback className="flex-1 aspect-[1/1.3] rounded-3xl shadow-surface">
        <Card className="flex-1">
          <View className="flex-1 gap-4">
            <Card.Header>
              <Image
                source={{
                  uri: 'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/demo1.jpg',
                }}
                style={{
                  height: 60,
                  aspectRatio: 1,
                  borderRadius: 14,
                }}
              />
            </Card.Header>
            <Card.Body className="flex-1">
              <Card.Title>Indie Hackers</Card.Title>
              <Card.Description className="text-sm">
                148 members
              </Card.Description>
            </Card.Body>
            <Card.Footer className="flex-row items-center gap-2">
              <View className="size-3 rounded-full bg-warning" />
              <AppText className="text-sm font-medium text-foreground">
                @indiehackers
              </AppText>
            </Card.Footer>
          </View>
        </Card>
        <PressableFeedback.Ripple
          animation={{
            backgroundColor: { value: '#fecdd3' },
            opacity: { value: [0, 0.2, 0] },
          }}
        />
      </PressableFeedback>
      <PressableFeedback className="flex-1 aspect-[1/1.3] rounded-3xl shadow-surface">
        <Card className="flex-1">
          <View className="flex-1 gap-4">
            <Card.Header>
              <Image
                source={{
                  uri: 'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/demo2.jpg',
                }}
                style={{
                  height: 60,
                  aspectRatio: 1,
                  borderRadius: 14,
                }}
              />
            </Card.Header>
            <Card.Body className="flex-1">
              <Card.Title>AI Builders</Card.Title>
              <Card.Description className="text-sm">
                362 members
              </Card.Description>
            </Card.Body>
            <Card.Footer className="flex-row items-center gap-2">
              <View className="size-3 rounded-full bg-success" />
              <AppText className="text-sm font-medium text-foreground">
                @aibuilders
              </AppText>
            </Card.Footer>
          </View>
        </Card>
        <PressableFeedback.Ripple
          animation={{
            backgroundColor: { value: '#67e8f9' },
          }}
        />
      </PressableFeedback>
    </View>
  );
};
