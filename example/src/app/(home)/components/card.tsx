/* eslint-disable react-native/no-inline-styles */
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Button, Card, type CardRootProps } from 'heroui-native';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { withUniwind } from 'uniwind';
import { AppText } from '../../../components/app-text';
import type { UsageVariant } from '../../../components/component-presentation/types';
import { UsageVariantFlatList } from '../../../components/component-presentation/usage-variant-flatlist';

const StyledIonicons = withUniwind(Ionicons);

const BasicCardContent = () => {
  return (
    <View className="flex-1 items-center justify-center px-5">
      <Card>
        <View className="gap-4">
          <Card.Body className="mb-4">
            <View className="gap-1 mb-2">
              <Card.Title className="text-pink-400">$450</Card.Title>
              <Card.Title>Living room Sofa</Card.Title>
            </View>
            <Card.Description>
              This sofa is perfect for modern tropical spaces, baroque inspired
              spaces.
            </Card.Description>
          </Card.Body>
          <Card.Footer className="gap-3">
            <Button variant="primary">Buy now</Button>
            <Button variant="ghost">
              <Button.Label>Add to cart</Button.Label>
              <StyledIonicons
                name="basket-outline"
                size={16}
                className="text-muted"
              />
            </Button>
          </Card.Footer>
        </View>
      </Card>
    </View>
  );
};

// ------------------------------------------------------------------------------

const CardWithImageContent = () => {
  return (
    <View className="flex-1 items-center justify-center px-5">
      <View className="flex-row gap-4">
        <Card variant="tertiary" className="flex-1 aspect-[1/1.3] rounded-2xl">
          <View className="flex-1 gap-4">
            <Card.Header>
              <Image
                source={{
                  uri: 'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/backgrounds/cards/robot1.jpg',
                }}
                style={{
                  height: 60,
                  aspectRatio: 1,
                  borderRadius: 12,
                }}
              />
            </Card.Header>
            <Card.Body className="flex-1">
              <Card.Title>Indie Hackers</Card.Title>
              <Card.Description className="text-sm">
                148 members
              </Card.Description>
            </Card.Body>
            <Card.Footer className="flex-row items-center gap-2">
              <View className="size-3 rounded-full bg-rose-400" />
              <AppText className="text-sm font-medium text-foreground">
                @indiehackers
              </AppText>
            </Card.Footer>
          </View>
        </Card>
        <Card variant="tertiary" className="flex-1 aspect-[1/1.3] rounded-2xl">
          <View className="flex-1 gap-4">
            <Card.Header>
              <Image
                source={{
                  uri: 'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/images/heroui-native-example/components-card-robot.png',
                }}
                style={{
                  height: 60,
                  aspectRatio: 1,
                  borderRadius: 12,
                }}
              />
            </Card.Header>
            <Card.Body className="flex-1">
              <Card.Title>AI Builders</Card.Title>
              <Card.Description className="text-sm">
                362 members
              </Card.Description>
            </Card.Body>
            <Card.Footer className="flex-row items-center gap-2">
              <View className="size-3 rounded-full bg-emerald-400" />
              <AppText className="text-sm font-medium text-foreground">
                @aibuilders
              </AppText>
            </Card.Footer>
          </View>
        </Card>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const HorizontalCardWithImageContent = () => {
  return (
    <View className="flex-1 items-center justify-center px-5">
      <View className="gap-4">
        <Card className="flex-row rounded-2xl gap-4 p-4" variant="tertiary">
          <Image
            source={{
              uri: 'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/backgrounds/cards/robot2.jpg',
            }}
            style={{
              height: 110,
              aspectRatio: 1,
              borderRadius: 12,
            }}
            resizeMode="cover"
          />
          <View className="gap-4">
            <Card.Body className="flex-1">
              <Card.Title>Bringing the future</Card.Title>
              <Card.Description numberOfLines={2} className="text-sm">
                Today, 6:30 PM
              </Card.Description>
            </Card.Body>
            <Card.Footer>
              <Pressable className="flex-row items-center gap-1">
                <AppText className="text-sm font-medium text-accent">
                  View Details
                </AppText>
                <StyledIonicons
                  name="open-outline"
                  size={12}
                  className="text-accent"
                />
              </Pressable>
            </Card.Footer>
          </View>
        </Card>
        <Card className="flex-row rounded-2xl gap-4 p-4" variant="tertiary">
          <Image
            source={{
              uri: 'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/backgrounds/cards/car1.jpg',
            }}
            style={{
              height: 110,
              aspectRatio: 1,
              borderRadius: 12,
            }}
            resizeMode="cover"
          />
          <View className="gap-4">
            <Card.Body className="flex-1">
              <Card.Title>Marketing Conf</Card.Title>
              <Card.Description numberOfLines={2} className="text-sm">
                Wed, 4:30 PM
              </Card.Description>
            </Card.Body>
            <Card.Footer>
              <Pressable className="flex-row items-center gap-1">
                <AppText className="text-sm font-medium text-accent">
                  View Details
                </AppText>
                <StyledIonicons
                  name="open-outline"
                  size={12}
                  className="text-accent"
                />
              </Pressable>
            </Card.Footer>
          </View>
        </Card>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const BackgroundImageCardContent = () => {
  return (
    <View className="flex-1 items-center justify-center px-5">
      <Card className="w-full aspect-square">
        <Image
          source={{
            uri: 'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/backgrounds/cards/dog1.jpg',
          }}
          className="absolute inset-0"
          resizeMode="cover"
        />
        <LinearGradient
          colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.8)']}
          style={StyleSheet.absoluteFill}
        />
        <View className="flex-1 gap-4">
          <Card.Body className="flex-1">
            <Card.Title className="text-base text-zinc-50 uppercase mb-0.5">
              Pet health
            </Card.Title>
            <Card.Description className="text-zinc-50 font-medium text-base">
              Your pet deserve the best
            </Card.Description>
          </Card.Body>
          <Card.Footer className="gap-3">
            <View className="flex-row items-center justify-between">
              <View>
                <AppText className="text-base text-white">
                  Available soon
                </AppText>
                <AppText className="text-base text-zinc-400">
                  Get notified
                </AppText>
              </View>
              <Button variant="secondary" size="sm" className="bg-white">
                <Button.Label className="text-black">Notify me</Button.Label>
              </Button>
            </View>
          </Card.Footer>
        </View>
      </Card>
    </View>
  );
};

// ------------------------------------------------------------------------------

type CardItemProps = {
  variant: CardRootProps['variant'];
  title: string;
  description: string;
};

const CardItem = ({ variant, title, description }: CardItemProps) => {
  return (
    <Card variant={variant} className="gap-2">
      <AppText className="text-foreground font-medium">{title}</AppText>
      <AppText className="text-muted">{description}</AppText>
    </Card>
  );
};

const VariantsContent = () => {
  return (
    <View className="flex-1 items-center justify-center">
      <View className="gap-2 w-full px-5">
        <CardItem
          variant="transparent"
          title="Transparent"
          description="Minimal prominence with transparent background. Use for less important content or nested cards."
        />
        <CardItem
          variant="default"
          title="Default"
          description="Standard card appearance (surface-secondary). The default card variant for most use cases"
        />
        <CardItem
          variant="secondary"
          title="Secondary"
          description="Medium prominence (surface-tertiary). Use to draw moderate attention."
        />
        <CardItem
          variant="tertiary"
          title="Tertiary"
          description="Higher prominence (surface-quaternary). Use for important content."
        />
        <CardItem
          variant="quaternary"
          title="Quaternary"
          description="Highest prominence (surface-quaternary). Use for critical content."
        />
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const CARD_VARIANTS: UsageVariant[] = [
  {
    value: 'basic-card',
    label: 'Basic card',
    content: <BasicCardContent />,
  },
  {
    value: 'card-with-image',
    label: 'Card with image',
    content: <CardWithImageContent />,
  },
  {
    value: 'horizontal-card-with-image',
    label: 'Horizontal card with image',
    content: <HorizontalCardWithImageContent />,
  },
  {
    value: 'background-image-card',
    label: 'Background image card',
    content: <BackgroundImageCardContent />,
  },
  {
    value: 'variants',
    label: 'Variants',
    content: <VariantsContent />,
  },
];

export default function CardScreen() {
  return <UsageVariantFlatList data={CARD_VARIANTS} />;
}
