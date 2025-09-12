import { Card, Chip, cn, DropShadowView, useTheme } from 'heroui-native';
import { type FC } from 'react';
import { Image, useWindowDimensions, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  type SharedValue,
} from 'react-native-reanimated';
import { AppText } from '../../app-text';

const AnimatedView = Animated.createAnimatedComponent(View);

export type PreviewCardProps = {
  index: number;
  title: string;
  image: string;
  liveCount: number;
  category: string;
  brands: string;
  itemWidth: number;
  allItemsWidth: number;
  scrollOffsetX: SharedValue<number>;
};

export const PreviewCard: FC<PreviewCardProps> = ({
  index,
  title,
  image,
  liveCount,
  category,
  brands,
  itemWidth,
  allItemsWidth,
  scrollOffsetX,
}) => {
  const { isDark } = useTheme();
  const { width: screenWidth } = useWindowDimensions();

  const shift = (allItemsWidth - screenWidth) / 2;
  const initialLeft = index * itemWidth - shift;

  const rContainerStyle = useAnimatedStyle(() => {
    const normalizedOffset =
      ((scrollOffsetX.value % allItemsWidth) + allItemsWidth) % allItemsWidth;
    const left = ((initialLeft - normalizedOffset) % allItemsWidth) + shift;

    return {
      left,
    };
  });

  return (
    <AnimatedView
      className="absolute"
      style={[
        { width: itemWidth, paddingHorizontal: itemWidth * 0.05 },
        rContainerStyle,
      ]}
    >
      <DropShadowView
        shadowSize="xl"
        className="aspect-[3/5] rounded-xl"
        shadowColor={isDark ? '#00000000' : 'black'}
      >
        <Card
          className={cn(
            'flex-1 border-0 rounded-xl',
            isDark && 'border border-border/70'
          )}
          surfaceVariant={isDark ? '2' : 'none'}
        >
          <Card.Body className="flex-1 p-2 mb-4">
            <Image
              source={{ uri: image }}
              className="absolute inset-0 rounded-lg"
            />
            <Chip className="bg-danger rounded-md">
              <Chip.LabelContent
                classNames={{ text: 'text-white font-semibold' }}
              >
                Live • {liveCount}
              </Chip.LabelContent>
            </Chip>
          </Card.Body>
          <Card.Footer>
            <Card.Title className="font-semibold">{title}</Card.Title>
            <Card.Description>
              <AppText className="text-blue-500 font-medium">
                {category}
              </AppText>{' '}
              • {brands}
            </Card.Description>
          </Card.Footer>
        </Card>
      </DropShadowView>
    </AnimatedView>
  );
};
