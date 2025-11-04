import { Image as ExpoImage } from 'expo-image';
import { useRouter } from 'expo-router';
import { Chip, cn, Surface } from 'heroui-native';
import { Platform, Pressable, StyleSheet, View } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  type SharedValue,
  useAnimatedStyle,
  useDerivedValue,
} from 'react-native-reanimated';
import { useAppTheme } from '../../contexts/app-theme-context';
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
};

export function ShowcaseItem({
  item,
  index,
  scrollY,
  itemSize,
}: ShowcaseItemProps) {
  const router = useRouter();

  const { isDark } = useAppTheme();

  const animatedIndex = useDerivedValue(() => {
    return scrollY.get() / itemSize;
  });

  const rContainerStyle = useAnimatedStyle(() => {
    const translateY =
      Platform.OS === 'ios'
        ? interpolate(
            scrollY.get(),
            [(index - 1) * itemSize, index * itemSize, index * itemSize + 1],
            [0, 0, 1]
          )
        : 0;

    return {
      opacity: interpolate(
        animatedIndex.get(),
        [index - 1, index, index + 1],
        [0, 1, 0]
      ),
      transform: [
        {
          translateY,
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
        <Pressable className="mb-5" onPress={() => router.push(item.href)}>
          <AppText className="text-2xl/7 text-foreground font-semibold">
            {item.title}
          </AppText>
        </Pressable>
        <AnimatedPressable onPress={() => router.push(item.href)}>
          <Surface
            className={cn(
              'w-[62%] aspect-[1/2] items-center justify-center rounded-3xl p-0 border border-neutral-100 shadow-2xl shadow-black/5',
              isDark && 'shadow-none border-neutral-900'
            )}
          >
            <ExpoImage
              source={{ uri: isDark ? item.imageDark : item.imageLight }}
              style={StyleSheet.absoluteFill}
              transition={200}
            />
          </Surface>
        </AnimatedPressable>
        <View className="pt-8 gap-5 w-[82%]">
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
          <AppText className="text-center text-foreground/60 font-medium text-base">
            {item.description}
          </AppText>
        </View>
      </AnimatedView>
    </View>
  );
}
