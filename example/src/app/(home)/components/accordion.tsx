import type { MessageDescriptor } from '@lingui/core';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react/macro';
import { Accordion, PressableFeedback, useAccordionItem } from 'heroui-native';
import { View } from 'react-native';
import Animated, {
  Easing,
  FadeInLeft,
  FadeInRight,
  ZoomIn,
  ZoomOut,
} from 'react-native-reanimated';
import { AccordionWithDepthEffect } from '../../../components/accordion/accordion-with-depth-effect';
import { AppText } from '../../../components/app-text';
import type { UsageVariant } from '../../../components/component-presentation/types';
import { UsageVariantFlatList } from '../../../components/component-presentation/usage-variant-flatlist';
import { BoxIcon } from '../../../components/icons/box';
import { MinusIcon } from '../../../components/icons/minus';
import { PlanetEarthIcon } from '../../../components/icons/planet-earth';
import { PlusIcon } from '../../../components/icons/plus';
import { ReceiptIcon } from '../../../components/icons/receipt';
import { ShoppingBagIcon } from '../../../components/icons/shopping-bag';

const TriggerTitle = ({ title }: { title: MessageDescriptor }) => {
  const { t } = useLingui();

  return (
    <AppText
      className="text-foreground text-base flex-1 text-left"
      maxFontSizeMultiplier={1}
    >
      {t(title)}
    </AppText>
  );
};

const ContentText = ({ text }: { text: MessageDescriptor }) => {
  const { t } = useLingui();

  return (
    <AppText
      className="text-muted text-base/relaxed px-7 text-left"
      maxFontSizeMultiplier={1}
    >
      {t(text)}
    </AppText>
  );
};

// ------------------------------------------------------------------------------

const ICON_SIZE = 16;

const CUSTOM_INDICATOR_ENTERING = ZoomIn.duration(200).easing(
  Easing.inOut(Easing.ease)
);
const CUSTOM_INDICATOR_EXITING = ZoomOut.duration(200).easing(
  Easing.inOut(Easing.ease)
);

const CustomIndicator = () => {
  const { isExpanded } = useAccordionItem();

  return (
    <View className="size-5 items-center justify-center">
      {isExpanded ? (
        <Animated.View
          key="minus"
          entering={CUSTOM_INDICATOR_ENTERING}
          exiting={CUSTOM_INDICATOR_EXITING}
        >
          <MinusIcon size={14} colorClassName="accent-muted" />
        </Animated.View>
      ) : (
        <Animated.View
          key="plus"
          entering={CUSTOM_INDICATOR_ENTERING}
          exiting={CUSTOM_INDICATOR_EXITING}
        >
          <PlusIcon size={14} colorClassName="accent-muted" />
        </Animated.View>
      )}
    </View>
  );
};

// ------------------------------------------------------------------------------

/**
 * Storefront FAQ entries driving every accordion demo on this screen.
 *
 * Answer lengths deliberately vary so the demos still show panels expanding to
 * different heights, which is what the previous lorem ipsum filler existed for.
 */
const accordionData = [
  {
    id: '1',
    title: msg`How do I place an order?`,
    icon: <ShoppingBagIcon size={ICON_SIZE} colorClassName="accent-muted" />,
    content: msg`Add items to your cart, then open checkout to pay by card or wallet. We'll email your confirmation within a few minutes.`,
  },
  {
    id: '2',
    title: msg`Can I modify or cancel my order?`,
    icon: <ReceiptIcon size={ICON_SIZE} colorClassName="accent-muted" />,
    content: msg`You can change or cancel an order free of charge within two hours of placing it. After that your parcel may already be packed, so contact support and we'll help where we can.`,
  },
  {
    id: '3',
    title: msg`How much does shipping cost?`,
    icon: <BoxIcon size={ICON_SIZE} colorClassName="accent-muted" />,
    content: msg`Standard delivery is free on orders over $50. Below that it's a flat $4.99.`,
  },
  {
    id: '4',
    title: msg`Do you ship internationally?`,
    icon: <PlanetEarthIcon size={ICON_SIZE} colorClassName="accent-muted" />,
    content: msg`We deliver to more than 60 countries, usually within 7 to 14 business days. Any customs duties are calculated and shown at checkout before you pay.`,
  },
];

// ------------------------------------------------------------------------------

const classNames = {
  triggerContentContainer: 'flex-row items-center flex-1 gap-3',
};

// ------------------------------------------------------------------------------

const DefaultVariantContent = () => {
  return (
    <View className="flex-1 items-center justify-center px-5">
      <Accordion defaultValue="2" className="w-full">
        {accordionData.map((item) => (
          <Accordion.Item key={item.id} value={item.id}>
            <Accordion.Trigger asChild>
              <PressableFeedback animation={{ scale: false }}>
                <PressableFeedback.Scale
                  className={classNames.triggerContentContainer}
                >
                  {item.icon}
                  <TriggerTitle title={item.title} />
                </PressableFeedback.Scale>
                <Accordion.Indicator />
                <PressableFeedback.Highlight
                  animation={{ opacity: { value: [0, 0.05] } }}
                />
              </PressableFeedback>
            </Accordion.Trigger>
            <Accordion.Content>
              <ContentText text={item.content} />
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion>
    </View>
  );
};

// ------------------------------------------------------------------------------

const SurfaceVariantContent = () => {
  return (
    <View className="flex-1 items-center justify-center px-5">
      <Accordion variant="surface" className="w-full">
        {accordionData.map((item) => (
          <Accordion.Item key={item.id} value={item.id}>
            <Accordion.Trigger>
              <View className={classNames.triggerContentContainer}>
                {item.icon}
                <TriggerTitle title={item.title} />
              </View>
              <Accordion.Indicator />
            </Accordion.Trigger>
            <Accordion.Content>
              <ContentText text={item.content} />
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion>
    </View>
  );
};

// ------------------------------------------------------------------------------

const MultipleSelectionContent = () => {
  return (
    <View className="flex-1 items-center justify-center px-5">
      <Accordion
        selectionMode="multiple"
        variant="surface"
        defaultValue={['1', '3']}
        className="w-full"
      >
        {accordionData.slice(0, 3).map((item) => (
          <Accordion.Item key={item.id} value={item.id}>
            <Accordion.Trigger>
              <View className={classNames.triggerContentContainer}>
                {item.icon}
                <TriggerTitle title={item.title} />
              </View>
              <Accordion.Indicator />
            </Accordion.Trigger>
            <Accordion.Content>
              <ContentText text={item.content} />
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion>
    </View>
  );
};

// ------------------------------------------------------------------------------

const WithoutSeparatorsContent = () => {
  return (
    <View className="flex-1 items-center justify-center px-5">
      <Accordion hideSeparator className="w-full">
        {accordionData.slice(0, 3).map((item) => (
          <Accordion.Item key={item.id} value={item.id}>
            <Accordion.Trigger className="rounded-lg">
              <View className={classNames.triggerContentContainer}>
                {item.icon}
                <TriggerTitle title={item.title} />
              </View>
              <Accordion.Indicator />
            </Accordion.Trigger>
            <Accordion.Content>
              <ContentText text={item.content} />
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion>
    </View>
  );
};

// ------------------------------------------------------------------------------

const CustomIndicatorContent = () => {
  return (
    <View className="flex-1 items-center justify-center px-5">
      <Accordion variant="surface" className="w-full">
        {accordionData.slice(0, 2).map((item) => (
          <Accordion.Item key={item.id} value={item.id}>
            <Accordion.Trigger>
              <View className={classNames.triggerContentContainer}>
                {item.icon}
                <TriggerTitle title={item.title} />
              </View>
              <Accordion.Indicator>
                <CustomIndicator />
              </Accordion.Indicator>
            </Accordion.Trigger>
            <Accordion.Content>
              <ContentText text={item.content} />
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion>
    </View>
  );
};

// ------------------------------------------------------------------------------

const CustomEnteringAnimationContent = () => {
  return (
    <View className="flex-1 items-center justify-center px-5">
      <Accordion variant="surface" className="w-full">
        {accordionData.slice(0, 3).map((item, index) => (
          <Accordion.Item key={item.id} value={item.id}>
            <Accordion.Trigger>
              <View className={classNames.triggerContentContainer}>
                {item.icon}
                <TriggerTitle title={item.title} />
              </View>
              <Accordion.Indicator
                animation={{
                  rotation: {
                    springConfig:
                      index === 0
                        ? { damping: 60, stiffness: 900, mass: 3 }
                        : index === 1
                          ? { damping: 50, stiffness: 900, mass: 3 }
                          : { damping: 40, stiffness: 900, mass: 3 },
                  },
                }}
              />
            </Accordion.Trigger>
            <Accordion.Content
              animation={{
                entering: {
                  value:
                    index === 0
                      ? FadeInRight.delay(50).easing(Easing.inOut(Easing.ease))
                      : index === 1
                        ? FadeInLeft.delay(50).easing(Easing.inOut(Easing.ease))
                        : ZoomIn.delay(50).easing(Easing.out(Easing.exp)),
                },
              }}
            >
              <ContentText text={item.content} />
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion>
    </View>
  );
};

// ------------------------------------------------------------------------------

const WithDepthEffectContent = () => {
  return <AccordionWithDepthEffect />;
};

const ACCORDION_VARIANTS: UsageVariant[] = [
  {
    value: 'default-variant',
    label: msg`Default variant`,
    content: <DefaultVariantContent />,
  },
  {
    value: 'surface-variant',
    label: msg`Surface variant`,
    content: <SurfaceVariantContent />,
  },
  {
    value: 'multiple-selection',
    label: msg`Multiple selection`,
    content: <MultipleSelectionContent />,
  },
  {
    value: 'without-separators',
    label: msg`Without separators`,
    content: <WithoutSeparatorsContent />,
  },
  {
    value: 'custom-indicator',
    label: msg`Custom indicator`,
    content: <CustomIndicatorContent />,
  },
  {
    value: 'custom-entering-animation',
    label: msg`Custom entering animation`,
    content: <CustomEnteringAnimationContent />,
  },
  {
    value: 'with-depth-effect',
    label: msg`With depth effect`,
    content: <WithDepthEffectContent />,
  },
];

export default function AccordionScreen() {
  return <UsageVariantFlatList data={ACCORDION_VARIANTS} />;
}
