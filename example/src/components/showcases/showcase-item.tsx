import { Image as ExpoImage } from 'expo-image';
import { useRouter } from 'expo-router';
import { Chip, DropShadowView, Surface } from 'heroui-native';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, {
  Extrapolation,
  FadeInRight,
  interpolate,
  type SharedValue,
  useAnimatedStyle,
  useDerivedValue,
} from 'react-native-reanimated';
import { AppText } from '../app-text';

const AnimatedView = Animated.createAnimatedComponent(View);
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type ShowcaseComponent = {
  name: string;
  href: string;
};

export type ShowcaseItemData = {
  imageLight: string;
  imageDark: string;
  title: string;
  description: string;
  href: string;
  components: ShowcaseComponent[];
};

export type ShowcaseItemProps = {
  index: number;
  scrollY: SharedValue<number>;
  item: ShowcaseItemData;
  itemSize: number;
  isDark: boolean;
};

export function ShowcaseItem({
  item,
  index,
  scrollY,
  itemSize,
  isDark,
}: ShowcaseItemProps) {
  const router = useRouter();

  const animatedIndex = useDerivedValue(() => {
    return scrollY.get() / itemSize;
  });

  const rContainerStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        animatedIndex.get(),
        [index - 1, index, index + 1],
        [0, 1, 0]
      ),
      transform: [
        {
          translateY: interpolate(
            scrollY.get(),
            [(index - 1) * itemSize, index * itemSize, index * itemSize + 1],
            [0, 0, 1]
          ),
        },
        {
          scale: interpolate(
            scrollY.get(),
            [(index - 1) * itemSize, index * itemSize, (index + 1) * itemSize],
            [1.2, 1, 0.5],
            {
              extrapolateRight: Extrapolation.CLAMP,
            }
          ),
        },
      ],
    };
  });

  const rImageStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        animatedIndex.get(),
        [index - 1, index, index + 1],
        [0, isDark ? 0.15 : 0.3, 0]
      ),
      transform: [
        {
          translateY: interpolate(
            scrollY.get(),
            [(index - 1) * itemSize, index * itemSize, index * itemSize + 1],
            [0, 0, 1]
          ),
        },
        {
          scale: interpolate(
            scrollY.get(),
            [(index - 1) * itemSize, index * itemSize, (index + 1) * itemSize],
            [5, 1, 1],
            {
              extrapolateRight: Extrapolation.CLAMP,
            }
          ),
        },
      ],
    };
  });

  return (
    <View className="flex-1">
      <AnimatedView style={[StyleSheet.absoluteFill, rImageStyle]}>
        <ExpoImage
          source={{ uri: isDark ? item.imageDark : item.imageLight }}
          style={StyleSheet.absoluteFill}
          blurRadius={100}
        />
      </AnimatedView>
      <AnimatedView
        className="flex-1 items-center justify-center p-8"
        style={[rContainerStyle]}
      >
        <AppText className="text-2xl text-foreground font-semibold mb-5">
          {item.title}
        </AppText>
        <AnimatedPressable
          entering={
            index === 0
              ? FadeInRight.springify().damping(28).stiffness(400).delay(250)
              : undefined
          }
          onPress={() => router.push(item.href)}
        >
          <DropShadowView
            shadowSize={isDark ? 'none' : 'xl'}
            className="w-[62%] aspect-[1/2] rounded-2xl"
          >
            <Surface className="flex-1 rounded-2xl p-0">
              <ExpoImage
                source={{ uri: isDark ? item.imageDark : item.imageLight }}
                style={StyleSheet.absoluteFill}
                transition={200}
              />
            </Surface>
          </DropShadowView>
        </AnimatedPressable>
        <View className="pt-6 gap-5 w-[70%]">
          <AppText className="text-center text-muted-foreground font-medium text-base">
            {item.description}
          </AppText>
          <View className="flex-row flex-wrap justify-center gap-2">
            {item.components.map((component, componentIndex) => (
              <Chip
                key={componentIndex}
                variant="secondary"
                size="sm"
                onPress={() => router.push(component.href)}
              >
                {component.name}
              </Chip>
            ))}
          </View>
        </View>
      </AnimatedView>
    </View>
  );
}
