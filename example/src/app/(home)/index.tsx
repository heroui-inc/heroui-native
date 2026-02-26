import Feather from '@expo/vector-icons/Feather';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Card, Chip, cn } from 'heroui-native';
import type { FC } from 'react';
import { Image, Pressable, View, type ImageSourcePropType } from 'react-native';
import Animated, {
  Easing,
  FadeIn,
  FadeInDown,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { withUniwind } from 'uniwind';
import HomeComponentsDark from '../../../assets/images/home-components-dark.png';
import HomeComponentsLight from '../../../assets/images/home-components-light.png';
import HomeShowcasesDark from '../../../assets/images/home-showcases-dark.png';
import HomeShowcasesLight from '../../../assets/images/home-showcases-light.png';
import HomeThemesDark from '../../../assets/images/home-themes-dark.png';
import HomeThemesLight from '../../../assets/images/home-themes-light.png';
import { AppText } from '../../components/app-text';
import { ScreenScrollView } from '../../components/screen-scroll-view';
import { useAppTheme } from '../../contexts/app-theme-context';
import { COMPONENTS } from '../../helpers/data/components';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const AnimatedImage = Animated.createAnimatedComponent(Image);
const AnimatedView = Animated.createAnimatedComponent(View);

const StyledFeather = withUniwind(Feather);

type HomeCardProps = {
  title: string;
  imageLight: ImageSourcePropType;
  imageDark: ImageSourcePropType;
  count: number;
  footer: string;
  path: string;
};

const cards: HomeCardProps[] = [
  {
    title: 'Components',
    imageLight: HomeComponentsLight,
    imageDark: HomeComponentsDark,
    count: COMPONENTS.length,
    footer: 'Explore all components',
    path: 'components',
  },
  {
    title: 'Themes',
    imageLight: HomeThemesLight,
    imageDark: HomeThemesDark,
    count: 4,
    footer: 'Try different themes',
    path: 'themes',
  },
  {
    title: 'Showcases',
    imageLight: HomeShowcasesLight,
    imageDark: HomeShowcasesDark,
    count: 6,
    footer: 'View components in action',
    path: 'showcases',
  },
];

const HomeCard: FC<HomeCardProps & { index: number }> = ({
  title,
  imageLight,
  imageDark,
  count,
  footer,
  path,
  index,
}) => {
  const router = useRouter();

  const { isDark } = useAppTheme();

  const rLightImageStyle = useAnimatedStyle(() => {
    return {
      opacity: isDark ? 0 : withTiming(0.4),
    };
  });

  const rDarkImageStyle = useAnimatedStyle(() => {
    return {
      opacity: isDark ? withTiming(0.4) : 0,
    };
  });

  return (
    <AnimatedPressable
      entering={FadeInDown.duration(300)
        .delay(index * 100)
        .easing(Easing.out(Easing.ease))}
      onPress={() => router.push(path)}
    >
      <Card
        className={cn(
          'p-0 border border-zinc-200 shadow-none',
          isDark && 'border-zinc-900'
        )}
      >
        <AnimatedView
          entering={FadeIn}
          className="absolute inset-0 w-full h-full"
        >
          <AnimatedImage
            source={imageLight}
            className="absolute inset-0 w-full h-full"
            resizeMode="cover"
            style={rLightImageStyle}
          />
          <AnimatedImage
            source={imageDark}
            className="absolute inset-0 w-full h-full"
            resizeMode="cover"
            style={rDarkImageStyle}
          />
        </AnimatedView>
        <View className="gap-4">
          <Card.Header className="p-3">
            <Chip size="sm" className="bg-background/25">
              <Chip.Label className="text-foreground/85">
                {`${count} total`}
              </Chip.Label>
            </Chip>
          </Card.Header>
          <Card.Body className="h-16" />
          <Card.Footer className="px-3 pb-3 flex-row items-end gap-4">
            <View className="flex-1">
              <Card.Title className="text-2xl text-foreground/85">
                {title}
              </Card.Title>
              <Card.Description className="text-foreground/65 pl-0.5">
                {footer}
              </Card.Description>
            </View>
            <View className="size-9 rounded-3xl bg-background/25 items-center justify-center">
              <StyledFeather
                name="arrow-up-right"
                size={20}
                className="text-foreground"
              />
            </View>
          </Card.Footer>
        </View>
      </Card>
    </AnimatedPressable>
  );
};

export default function App() {
  const { isDark } = useAppTheme();

  return (
    <ScreenScrollView>
      <View className="items-center justify-center my-4">
        <AppText className="text-muted text-base">v1.0.0-rc.3</AppText>
      </View>
      <View className="gap-6">
        {cards.map((card, index) => (
          <HomeCard
            key={card.title}
            title={card.title}
            imageLight={card.imageLight}
            imageDark={card.imageDark}
            count={card.count}
            footer={card.footer}
            path={card.path}
            index={index}
          />
        ))}
      </View>
      <StatusBar style={isDark ? 'light' : 'dark'} />
    </ScreenScrollView>
  );
}
