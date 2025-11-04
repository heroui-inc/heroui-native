import Feather from '@expo/vector-icons/Feather';
import { useRouter } from 'expo-router';
import { Button, cn, Divider } from 'heroui-native';
import { View } from 'react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { withUniwind } from 'uniwind';
import { AppText } from '../../../components/app-text';
import MarqueeCarousel, {
  type CardProps,
} from '../../../components/showcases/onboarding/marquee-carousel';
import { useAppTheme } from '../../../contexts/app-theme-context';

const AnimatedView = Animated.createAnimatedComponent(View);
const StyledFeather = withUniwind(Feather);

const cards: CardProps[] = [
  {
    title: 'My First Show',
    image:
      'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/images/heroui-native-example/showcase-onboarding-sneakers-1.png',
    liveCount: 23,
    category: 'Sneakers',
    brands: 'AetherStep',
  },
  {
    title: 'Fashion Week Special',
    image:
      'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/images/heroui-native-example/showcase-onboarding-fashion.png',
    liveCount: 45,
    category: 'Fashion',
    brands: 'Maison Orrix',
  },
  {
    title: 'Tech Gadgets',
    image:
      'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/images/heroui-native-example/showcase-onboarding-headphones.png',
    liveCount: 12,
    category: 'Electronics',
    brands: 'QuantaLabs',
  },
  {
    title: 'Air Collection',
    image:
      'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/images/heroui-native-example/showcase-onboarding-sneakers-2.png',
    liveCount: 8,
    category: 'Collectibles',
    brands: 'CurioVault',
  },
];

const OnboardingScreen = () => {
  const router = useRouter();

  const insets = useSafeAreaInsets();

  const { isDark } = useAppTheme();

  return (
    <View
      className="flex-1 bg-background"
      style={{
        paddingTop: insets.top + 12,
        paddingBottom: insets.bottom + 12,
      }}
    >
      <AnimatedView
        entering={FadeIn.duration(500)}
        className="px-4 flex-row items-center justify-between"
      >
        <Button
          size="sm"
          className={cn('rounded-full bg-black/10', isDark && 'bg-white/20')}
          isIconOnly
          onPress={router.back}
          animationConfig={{ highlight: { isDisabled: true } }}
        >
          <StyledFeather
            name="chevron-left"
            size={24}
            className={cn('text-black', isDark && 'text-white')}
          />
        </Button>
        <Button
          size="sm"
          className={cn('rounded-full bg-black/10', isDark && 'bg-white/20')}
          isIconOnly
          onPress={router.back}
          animationConfig={{ highlight: { isDisabled: true } }}
        >
          <StyledFeather
            name="x"
            size={24}
            className={cn('text-black', isDark && 'text-white')}
          />
        </Button>
      </AnimatedView>

      <MarqueeCarousel cards={cards} />

      <AnimatedView
        className="items-center gap-2 px-8"
        entering={FadeInDown.delay(300).springify()}
      >
        <AppText className="text-muted text-xs font-semibold uppercase tracking-wider">
          Lesson 1
        </AppText>
        <AppText className="text-3xl font-semibold text-foreground">
          Setting Up a Show
        </AppText>
        <AppText className="text-base text-center text-foreground/75">
          It's fast and simple, and we've got a few pointers to help you get
          started successfully.
        </AppText>
      </AnimatedView>

      <AnimatedView entering={FadeIn.delay(350)}>
        <Divider variant="thick" className="my-8 opacity-20" />
      </AnimatedView>

      <AnimatedView entering={FadeInDown.delay(400).springify()}>
        <Button
          onPress={() => console.log('Next pressed')}
          className="mx-8 rounded-full bg-[#F8DD00]"
        >
          <Button.Label className="text-lg font-semibold text-black">
            Next
          </Button.Label>
        </Button>
      </AnimatedView>
    </View>
  );
};

export default OnboardingScreen;
