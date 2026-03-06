import { Image } from 'expo-image';
import { Card, PressableFeedback } from 'heroui-native';
import { View } from 'react-native';
import { withUniwind } from 'uniwind';
import { AppText } from '../app-text';

const StyledImage = withUniwind(Image);

export const CardContent = () => {
  return (
    <View className="flex-row gap-4">
      <PressableFeedback
        className="flex-1 aspect-[1/1.3] overflow-auto"
        animation={{ scale: { value: 0.995 } }}
      >
        <Card className="flex-1">
          <View className="flex-1 gap-4">
            <Card.Header>
              <StyledImage
                source={{
                  uri: 'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/demo1.jpg',
                }}
                className="h-16 aspect-square rounded-xl"
              />
            </Card.Header>
            <Card.Body className="flex-1">
              <Card.Title maxFontSizeMultiplier={1.2} numberOfLines={1}>
                Indie Hackers
              </Card.Title>
              <Card.Description
                className="text-sm"
                maxFontSizeMultiplier={1.2}
                numberOfLines={1}
              >
                148 members
              </Card.Description>
            </Card.Body>
            <Card.Footer className="flex-row items-center gap-2">
              <View className="size-3 rounded-full bg-warning" />
              <AppText
                className="text-sm font-medium text-foreground"
                maxFontSizeMultiplier={1.2}
                numberOfLines={1}
              >
                @indiehackers
              </AppText>
            </Card.Footer>
          </View>
          <PressableFeedback.Ripple
            animation={{
              backgroundColor: { value: '#fecdd3' },
              opacity: { value: [0, 0.2, 0] },
            }}
          />
        </Card>
      </PressableFeedback>
      <PressableFeedback
        className="flex-1 aspect-[1/1.3] overflow-auto"
        animation={{ scale: { value: 0.995 } }}
      >
        <Card className="flex-1">
          <View className="flex-1 gap-4">
            <Card.Header>
              <StyledImage
                source={{
                  uri: 'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/demo2.jpg',
                }}
                className="h-16 aspect-square rounded-xl"
              />
            </Card.Header>
            <Card.Body className="flex-1">
              <Card.Title maxFontSizeMultiplier={1.2} numberOfLines={1}>
                AI Builders
              </Card.Title>
              <Card.Description
                className="text-sm"
                maxFontSizeMultiplier={1.2}
                numberOfLines={1}
              >
                362 members
              </Card.Description>
            </Card.Body>
            <Card.Footer className="flex-row items-center gap-2">
              <View className="size-3 rounded-full bg-success" />
              <AppText
                className="text-sm font-medium text-foreground"
                maxFontSizeMultiplier={1.2}
                numberOfLines={1}
              >
                @aibuilders
              </AppText>
            </Card.Footer>
          </View>
          <PressableFeedback.Ripple
            animation={{
              backgroundColor: { value: '#67e8f9' },
            }}
          />
        </Card>
      </PressableFeedback>
    </View>
  );
};
