/* eslint-disable lingui/no-unlocalized-strings -- What is left in English is the
   "Neo" product name and two social handles: brands and identifiers that stay
   verbatim in every locale. All copy uses the `t` macro. */
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react/macro';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Button, Card, PressableFeedback } from 'heroui-native';
import { StyleSheet, View } from 'react-native';
import { withUniwind } from 'uniwind';
import { AppText } from '../../../components/app-text';
import type { UsageVariant } from '../../../components/component-presentation/types';
import { UsageVariantFlatList } from '../../../components/component-presentation/usage-variant-flatlist';
import { simulatePress } from '../../../helpers/utils/simulate-press';

const StyledImage = withUniwind(Image);

const BackgroundImageCardContent = () => {
  const { t } = useLingui();

  return (
    <View className="flex-1 items-center justify-center px-5">
      <PressableFeedback
        className="w-full aspect-square overflow-auto"
        animation={{ scale: { value: 0.995 } }}
      >
        <Card className="flex-1">
          <Image
            source={{
              uri: 'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/neo2.jpeg',
            }}
            style={StyleSheet.absoluteFill}
            contentFit="cover"
          />
          <LinearGradient
            colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.4)']}
            style={StyleSheet.absoluteFill}
          />
          <PressableFeedback.Ripple
            animation={{
              backgroundColor: { value: 'white' },
              opacity: { value: [0, 0.3, 0] },
            }}
          />
          <View className="flex-1 gap-4" pointerEvents="box-none">
            <Card.Body className="flex-1" pointerEvents="none">
              <Card.Title
                maxFontSizeMultiplier={1.4}
                className="text-base text-zinc-50 uppercase mb-0.5"
              >
                Neo
              </Card.Title>
              <Card.Description
                maxFontSizeMultiplier={1.4}
                className="text-zinc-50 font-medium text-base"
              >
                {t`Home robot`}
              </Card.Description>
            </Card.Body>
            <Card.Footer className="gap-3">
              <View className="flex-row items-center justify-between">
                <View pointerEvents="none">
                  <AppText
                    maxFontSizeMultiplier={1.4}
                    className="text-base text-white text-left"
                  >
                    {t`Available soon`}
                  </AppText>
                  <AppText
                    maxFontSizeMultiplier={1.4}
                    className="text-base text-zinc-300 text-left"
                  >
                    {t`Get notified`}
                  </AppText>
                </View>

                <Button
                  size="sm"
                  className="bg-white"
                  feedbackVariant="scale"
                  onPress={simulatePress}
                >
                  <Button.Label
                    maxFontSizeMultiplier={1.4}
                    className="text-black"
                  >
                    {t`Notify me`}
                  </Button.Label>
                </Button>
              </View>
            </Card.Footer>
          </View>
        </Card>
      </PressableFeedback>
    </View>
  );
};

// ------------------------------------------------------------------------------

const CardWithImageContent = () => {
  const { t } = useLingui();

  return (
    <View className="flex-1 items-center justify-center px-5">
      <View className="flex-row gap-4">
        <PressableFeedback
          className="flex-1 aspect-[1/1.3] overflow-auto"
          animation={{ scale: { value: 0.995 } }}
        >
          <Card className="flex-1">
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
                  maxFontSizeMultiplier={1.2}
                  numberOfLines={1}
                  className="text-sm font-medium text-foreground"
                >
                  @indiehackers
                </AppText>
              </Card.Footer>
            </View>
            <PressableFeedback.Ripple
              animation={{
                backgroundColor: { value: '#fecdd3' },
                opacity: { value: [0, 0.2, 0] },
              }}
            />
          </Card>
        </PressableFeedback>
        <PressableFeedback
          className="flex-1 aspect-[1/1.3] overflow-auto"
          animation={{ scale: { value: 0.995 } }}
        >
          <Card className="flex-1">
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
                  maxFontSizeMultiplier={1.2}
                  numberOfLines={1}
                  className="text-sm font-medium text-foreground"
                >
                  @aibuilders
                </AppText>
              </Card.Footer>
            </View>
            <PressableFeedback.Ripple
              animation={{
                backgroundColor: { value: '#67e8f9' },
              }}
            />
          </Card>
        </PressableFeedback>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const ButtonHighlightContent = () => {
  const { t } = useLingui();

  return (
    <View className="flex-1">
      <View className="flex-1 items-center justify-center">
        <View className="gap-6 w-full px-8">
          <Button variant="primary">{t`Primary`}</Button>
          <Button variant="secondary">{t`Secondary`}</Button>
          <Button variant="tertiary">{t`Tertiary`}</Button>
        </View>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const PRESSABLE_FEEDBACK_VARIANTS: UsageVariant[] = [
  {
    value: 'background-image-card',
    label: msg`Background image card`,
    content: <BackgroundImageCardContent />,
  },
  {
    value: 'card-with-image',
    label: msg`Card with image`,
    content: <CardWithImageContent />,
  },
  {
    value: 'button-highlight',
    label: msg`Button highlight`,
    content: <ButtonHighlightContent />,
  },
];

export default function PressableFeedbackScreen() {
  return <UsageVariantFlatList data={PRESSABLE_FEEDBACK_VARIANTS} />;
}
