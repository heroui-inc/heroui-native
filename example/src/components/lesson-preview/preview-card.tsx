import { Card, Chip, DropShadowView } from 'heroui-native';
import { type FC } from 'react';
import { Image, useWindowDimensions, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  type SharedValue,
} from 'react-native-reanimated';
import { AppText } from '../app-text';

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
  const { width: screenWidth } = useWindowDimensions();

  // Centers the carousel - ensures middle item appears in screen center at scroll position 0
  const shift = (allItemsWidth - screenWidth) / 2;
  // Calculate this item's base position in the infinite scroll sequence
  const initialLeft = index * itemWidth - shift;

  const rContainerStyle = useAnimatedStyle(() => {
    // Normalize scroll offset to prevent overflow and enable infinite scrolling
    const normalizedOffset =
      ((scrollOffsetX.value % allItemsWidth) + allItemsWidth) % allItemsWidth;
    // Calculate this item's current position relative to screen
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
      <DropShadowView shadowSize="xl" className="aspect-[3/5] rounded-xl">
        <Card className="flex-1 border-0 rounded-xl">
          <Card.Details>
            <Card.Body className="p-2">
              <Image
                source={{ uri: image }}
                className="absolute inset-0 rounded-lg"
              />
              <Chip className="bg-danger rounded-md">
                <Chip.LabelContent
                  classNames={{ text: 'text-white font-semibold' }}
                >{`Live • ${liveCount}`}</Chip.LabelContent>
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
          </Card.Details>
        </Card>
      </DropShadowView>
    </AnimatedView>
  );
};
