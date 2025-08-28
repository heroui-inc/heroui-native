import Feather from '@expo/vector-icons/Feather';
import { useRouter } from 'expo-router';
import { Button, cn, Divider, useTheme } from 'heroui-native';
import { View } from 'react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppText } from '../../../components/app-text';
import MarqueeCarousel, {
  type CardProps,
} from '../../../components/lesson-preview/marquee-carousel';

const AnimatedView = Animated.createAnimatedComponent(View);

const cards: CardProps[] = [
  {
    title: 'My First Show',
    image:
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=600&fit=crop',
    liveCount: 23,
    category: 'Sneakers',
    brands: 'Nike, Adidas',
  },
  {
    title: 'Fashion Week Special',
    image:
      'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=400&h=600&fit=crop',
    liveCount: 45,
    category: 'Fashion',
    brands: 'Gucci, Prada',
  },
  {
    title: 'Tech Gadgets',
    image:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=600&fit=crop',
    liveCount: 12,
    category: 'Electronics',
    brands: 'Apple, Samsung',
  },
  {
    title: 'Vintage Collection',
    image:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=600&fit=crop',
    liveCount: 8,
    category: 'Collectibles',
    brands: 'Rare Finds',
  },
];

const OnboardingScreen = () => {
  const { isDark } = useTheme();

  const router = useRouter();

  const insets = useSafeAreaInsets();

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
          className={cn('rounded-full bg-black/25', isDark && 'bg-white/25')}
          isIconOnly
          onPress={router.back}
        >
          <Button.LabelContent>
            <Feather
              name="chevron-left"
              size={24}
              color={isDark ? 'black' : 'white'}
            />
          </Button.LabelContent>
        </Button>
        <Button
          size="sm"
          className={cn('rounded-full bg-black/25', isDark && 'bg-white/25')}
          isIconOnly
          onPress={router.back}
        >
          <Button.LabelContent>
            <Feather name="x" size={24} color={isDark ? 'black' : 'white'} />
          </Button.LabelContent>
        </Button>
      </AnimatedView>

      <MarqueeCarousel cards={cards} />

      <AnimatedView
        className="items-center gap-2 px-8"
        entering={FadeInDown.delay(300).springify().damping(20).stiffness(180)}
      >
        <AppText className="text-muted-foreground text-sm font-semibold uppercase tracking-wider">
          Lesson 1
        </AppText>
        <AppText className="text-4xl font-semibold text-foreground">
          Creating a Show
        </AppText>
        <AppText className="text-lg leading-6 text-center text-foreground/75">
          It's quick and easy, and we have a few tips to share to set you up for
          success.
        </AppText>
      </AnimatedView>

      <AnimatedView entering={FadeIn.delay(500)}>
        <Divider variant="thick" className="my-8 opacity-20" />
      </AnimatedView>

      <AnimatedView
        entering={FadeInDown.delay(400).springify().damping(20).stiffness(180)}
      >
        <Button
          onPress={() => console.log('Next pressed')}
          className="mx-8 rounded-full bg-[#F8DD00]"
        >
          <Button.LabelContent
            classNames={{ text: 'text-lg font-semibold text-black' }}
          >
            Next
          </Button.LabelContent>
        </Button>
      </AnimatedView>
    </View>
  );
};

export default OnboardingScreen;
