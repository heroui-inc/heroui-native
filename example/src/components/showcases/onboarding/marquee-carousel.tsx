import { type FC, memo } from 'react';
import { useWindowDimensions, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  Easing,
  FadeInUp,
  useFrameCallback,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { PreviewCard, type PreviewCardProps } from './preview-card';

const AnimatedView = Animated.createAnimatedComponent(View);

export type CardProps = Pick<
  PreviewCardProps,
  'title' | 'image' | 'liveCount' | 'category' | 'brands'
>;

const _defaultScrollSpeed = 40;

type Props = {
  cards: CardProps[];
};

const MarqueeCarousel: FC<Props> = ({ cards }) => {
  const { width } = useWindowDimensions();

  const scrollOffsetX = useSharedValue(0);
  const scrollSpeed = useSharedValue(_defaultScrollSpeed);

  const itemWidth = width * 0.7;
  const allItemsWidth = cards.length * itemWidth;

  useFrameCallback((frameInfo) => {
    const deltaSeconds = (frameInfo?.timeSincePreviousFrame ?? 0) / 1000;
    scrollOffsetX.value += scrollSpeed.value * deltaSeconds;
  });

  const gesture = Gesture.Pan()
    .onBegin(() => {
      scrollSpeed.value = 0;
    })
    .onChange((event) => {
      scrollOffsetX.value -= event.changeX;
    })
    .onFinalize((event) => {
      scrollSpeed.value = -event.velocityX;
      scrollSpeed.value = withTiming(_defaultScrollSpeed, {
        duration: 1000,
        easing: Easing.out(Easing.quad),
      });
    });

  return (
    <GestureDetector gesture={gesture}>
      <AnimatedView
        entering={FadeInUp.delay(300).springify()}
        className="flex-1 flex-row items-center overflow-hidden"
      >
        {cards.map((card, index) => (
          <PreviewCard
            key={index}
            index={index}
            title={card.title}
            image={card.image}
            liveCount={card.liveCount}
            category={card.category}
            brands={card.brands}
            itemWidth={itemWidth}
            allItemsWidth={allItemsWidth}
            scrollOffsetX={scrollOffsetX}
          />
        ))}
      </AnimatedView>
    </GestureDetector>
  );
};

export default memo(MarqueeCarousel);
