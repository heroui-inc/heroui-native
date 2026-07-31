/* eslint-disable lingui/no-unlocalized-strings -- What is left in English is a
   price, two social handles and the "Neo" product name: identifiers and brands
   that stay verbatim in every locale. All copy uses the `t` macro. */
import { Ionicons } from '@expo/vector-icons';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react/macro';
import { LinearGradient } from 'expo-linear-gradient';
import { Button, Card, cn, type CardRootProps } from 'heroui-native';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { withUniwind } from 'uniwind';
import { AppText } from '../../../components/app-text';
import type { UsageVariant } from '../../../components/component-presentation/types';
import { UsageVariantFlatList } from '../../../components/component-presentation/usage-variant-flatlist';

const StyledImage = withUniwind(Image);
const StyledIonicons = withUniwind(Ionicons);

const BasicCardContent = () => {
  const { t } = useLingui();

  return (
    <View className="flex-1 items-center justify-center px-5">
      <Card>
        <View className="gap-4">
          <Card.Body className="mb-4">
            <View className="gap-1 mb-2">
              <Card.Title className="text-pink-400">$450</Card.Title>
              <Card.Title>{t`Living room Sofa`}</Card.Title>
            </View>
            <Card.Description>
              {t`This sofa is perfect for modern tropical spaces, baroque inspired spaces.`}
            </Card.Description>
          </Card.Body>
          <Card.Footer className="gap-3">
            <Button variant="primary">{t`Buy now`}</Button>
            <Button variant="ghost">
              <Button.Label>{t`Add to cart`}</Button.Label>
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
  const { t } = useLingui();

  return (
    <View className="flex-1 items-center justify-center px-5">
      <View className="flex-row gap-4">
        <Card className="flex-1 aspect-[1/1.3]">
          <View className="flex-1 gap-4">
            <Card.Header>
              <StyledImage
                source={{
                  uri: 'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/demo1.jpg',
                }}
                className="h-16 aspect-square rounded-xl"
              />
            </Card.Header>
            <Card.Body className="flex-1">
              <Card.Title maxFontSizeMultiplier={1.2} numberOfLines={1}>
                {t`Indie Hackers`}
              </Card.Title>
              <Card.Description
                className="text-sm"
                maxFontSizeMultiplier={1.2}
                numberOfLines={1}
              >
                {t`148 members`}
              </Card.Description>
            </Card.Body>
            <Card.Footer className="flex-row items-center gap-2">
              <View className="size-3 rounded-full bg-rose-400" />
              <AppText
                className="text-sm font-medium text-foreground"
                maxFontSizeMultiplier={1.2}
                numberOfLines={1}
              >
                @indiehackers
              </AppText>
            </Card.Footer>
          </View>
        </Card>
        <Card className="flex-1 aspect-[1/1.3]">
          <View className="flex-1 gap-4">
            <Card.Header>
              <StyledImage
                source={{
                  uri: 'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/demo2.jpg',
                }}
                className="h-16 aspect-square rounded-xl"
              />
            </Card.Header>
            <Card.Body className="flex-1">
              <Card.Title maxFontSizeMultiplier={1.2} numberOfLines={1}>
                {t`AI Builders`}
              </Card.Title>
              <Card.Description
                className="text-sm"
                maxFontSizeMultiplier={1.2}
                numberOfLines={1}
              >
                {t`362 members`}
              </Card.Description>
            </Card.Body>
            <Card.Footer className="flex-row items-center gap-2">
              <View className="size-3 rounded-full bg-emerald-400" />
              <AppText
                className="text-sm font-medium text-foreground"
                maxFontSizeMultiplier={1.2}
                numberOfLines={1}
              >
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
  const { t } = useLingui();

  return (
    <View className="flex-1 items-center justify-center px-5">
      <View className="w-full gap-4">
        <Card className="flex-row gap-4 p-4" variant="tertiary">
          <StyledImage
            source={{
              uri: 'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/avocado.jpeg',
            }}
            className="h-28 aspect-square rounded-2xl"
            resizeMode="cover"
          />
          <View className="flex-1 gap-4">
            <Card.Body className="flex-1">
              <Card.Title maxFontSizeMultiplier={1.2} numberOfLines={1}>
                {t`Avocado Hackathon`}
              </Card.Title>
              <Card.Description
                numberOfLines={2}
                className="text-sm"
                maxFontSizeMultiplier={1.2}
              >
                {t`Today, 6:30 PM`}
              </Card.Description>
            </Card.Body>
            <Card.Footer>
              <Pressable className="flex-row items-center gap-1">
                <AppText
                  className="text-sm font-medium text-accent"
                  maxFontSizeMultiplier={1.2}
                  numberOfLines={1}
                >
                  {t`View Details`}
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
        <Card className="flex-row gap-4 p-4" variant="tertiary">
          <StyledImage
            source={{
              uri: 'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/oranges.jpeg',
            }}
            className="h-28 aspect-square rounded-2xl"
            resizeMode="cover"
          />
          <View className="flex-1 gap-4">
            <Card.Body className="flex-1">
              <Card.Title maxFontSizeMultiplier={1.2} numberOfLines={1}>
                {t`Sound Electro`}
              </Card.Title>
              <Card.Description
                numberOfLines={2}
                className="text-sm"
                maxFontSizeMultiplier={1.2}
              >
                {t`Wed, 4:30 PM`}
              </Card.Description>
            </Card.Body>
            <Card.Footer>
              <Pressable className="flex-row items-center gap-1">
                <AppText
                  className="text-sm font-medium text-accent"
                  maxFontSizeMultiplier={1.2}
                  numberOfLines={1}
                >
                  {t`View Details`}
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
  const { t } = useLingui();

  return (
    <View className="flex-1 items-center justify-center px-5">
      <Card className="w-full aspect-square">
        <Image
          source={{
            uri: 'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/neo2.jpeg',
          }}
          className="absolute inset-0"
          resizeMode="cover"
        />
        <LinearGradient
          colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.5)']}
          style={StyleSheet.absoluteFill}
        />
        <View className="flex-1 gap-4">
          <Card.Body className="flex-1">
            <Card.Title
              className="text-base text-zinc-50 uppercase mb-0.5"
              maxFontSizeMultiplier={1.2}
            >
              Neo
            </Card.Title>
            <Card.Description
              className="text-zinc-50 font-medium text-base"
              maxFontSizeMultiplier={1.2}
            >
              {t`Home robot`}
            </Card.Description>
          </Card.Body>
          <Card.Footer className="gap-3">
            <View className="flex-row items-center justify-between">
              <View>
                <AppText
                  className="text-base text-white"
                  maxFontSizeMultiplier={1.2}
                >
                  {t`Available soon`}
                </AppText>
                <AppText
                  className="text-base text-zinc-300"
                  maxFontSizeMultiplier={1.2}
                >
                  {t`Get notified`}
                </AppText>
              </View>
              <Button size="sm" className="bg-white" feedbackVariant="scale">
                <Button.Label
                  className="text-black"
                  maxFontSizeMultiplier={1.2}
                >
                  {t`Notify me`}
                </Button.Label>
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
  className?: string;
};

const CardItem = ({
  variant,
  title,
  description,
  className,
}: CardItemProps) => {
  return (
    <Card variant={variant} className={cn('gap-2', className)}>
      <AppText
        className="text-foreground font-medium"
        maxFontSizeMultiplier={1.3}
      >
        {title}
      </AppText>
      <AppText className="text-muted" maxFontSizeMultiplier={1.3}>
        {description}
      </AppText>
    </Card>
  );
};

const VariantsContent = () => {
  const { t } = useLingui();

  return (
    <View className="flex-1 items-center justify-center">
      <View className="gap-2 w-full px-5">
        <CardItem
          variant="default"
          title={t`Default`}
          description={t`Standard card appearance (surface-secondary). The default card variant for most use cases`}
        />
        <CardItem
          variant="secondary"
          title={t`Secondary`}
          description={t`Medium prominence (surface-tertiary). Use to draw moderate attention.`}
        />
        <CardItem
          variant="tertiary"
          title={t`Tertiary`}
          description={t`Higher prominence (surface-tertiary). Use for important content.`}
        />
        <CardItem
          variant="transparent"
          title={t`Transparent`}
          description={t`Minimal prominence with transparent background. Use for less important content or nested cards.`}
          className="border border-border shadow-none"
        />
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const CARD_VARIANTS: UsageVariant[] = [
  {
    value: 'basic-card',
    label: msg`Basic card`,
    content: <BasicCardContent />,
  },
  {
    value: 'card-with-image',
    label: msg`Card with image`,
    content: <CardWithImageContent />,
  },
  {
    value: 'horizontal-card-with-image',
    label: msg`Horizontal card with image`,
    content: <HorizontalCardWithImageContent />,
  },
  {
    value: 'background-image-card',
    label: msg`Background image card`,
    content: <BackgroundImageCardContent />,
  },
  {
    value: 'variants',
    label: msg`Variants`,
    content: <VariantsContent />,
  },
];

export default function CardScreen() {
  return <UsageVariantFlatList data={CARD_VARIANTS} />;
}
