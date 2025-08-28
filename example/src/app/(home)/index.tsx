import Feather from '@expo/vector-icons/Feather';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Card, Chip, colorKit, useTheme } from 'heroui-native';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { AppText } from '../../components/app-text';
import { ScreenScrollView } from '../../components/screen-scroll-view';

type HomeCard = {
  title: string;
  image: string;
  count: number;
  footer: string;
  path: string;
};

const cards: HomeCard[] = [
  {
    title: 'Components',
    image:
      'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/images/heroui-native-example/home-card-components.png',
    count: 15,
    footer: 'Explore all components',
    path: 'components',
  },
  {
    title: 'Themes',
    image:
      'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/images/heroui-native-example/home-card-themes.png',
    count: 4,
    footer: 'Try different themes',
    path: 'themes',
  },
  {
    title: 'Showcases',
    image:
      'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/images/heroui-native-example/home-card-showcases.png',
    count: 1,
    footer: 'View example apps',
    path: 'showcases',
  },
];

export default function App() {
  const router = useRouter();

  const { colors } = useTheme();

  return (
    <ScreenScrollView>
      <View className="items-center justify-center my-4">
        <AppText className="text-muted-foreground text-base">
          v1.0.0-alpha.8
        </AppText>
      </View>

      <View className="gap-6">
        {cards.map((card) => (
          <Pressable key={card.title} onPress={() => router.push(card.path)}>
            <Card className="p-0 rounded-xl">
              <Image
                source={{ uri: card.image }}
                className="absolute inset-0 w-full h-full"
                resizeMode="cover"
              />
              <LinearGradient
                colors={[
                  colorKit.setAlpha('#000', 0).hex(),
                  colorKit.setAlpha('#000', 0.4).hex(),
                ]}
                style={StyleSheet.absoluteFill}
              />
              <Card.Details>
                <Card.Header className="p-3">
                  <Chip size="sm" variant="secondary">
                    {`${card.count} total`}
                  </Chip>
                </Card.Header>
                <Card.Body className="h-16" />
                <Card.Footer className="px-3 pb-3 flex-row items-end gap-4">
                  <View className="flex-1">
                    <Card.Title className="text-3xl text-white">
                      {card.title}
                    </Card.Title>
                    <Card.Description className="text-white pl-0.5">
                      {card.footer}
                    </Card.Description>
                  </View>
                  <View className="w-9 h-9 rounded-full bg-background items-center justify-center">
                    <Feather
                      name="arrow-up-right"
                      size={20}
                      color={colors.foreground}
                    />
                  </View>
                </Card.Footer>
              </Card.Details>
            </Card>
          </Pressable>
        ))}
      </View>
    </ScreenScrollView>
  );
}
