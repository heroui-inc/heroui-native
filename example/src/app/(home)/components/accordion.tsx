import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Accordion, useAccordionItemContext } from 'heroui-native';
import { StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  FadeInLeft,
  FadeInRight,
  ZoomIn,
  ZoomOut,
} from 'react-native-reanimated';
import { withUniwind } from 'uniwind';
import { AppText } from '../../../components/app-text';
import type { UsageVariant } from '../../../components/component-presentation/types';
import { UsageVariantFlatList } from '../../../components/component-presentation/usage-variant-flatlist';

const StyledIonicons = withUniwind(Ionicons);
const StyledMaterialIcons = withUniwind(MaterialIcons);

const ICON_SIZE = 16;

const CUSTOM_INDICATOR_ENTERING = ZoomIn.duration(200).easing(
  Easing.inOut(Easing.ease)
);
const CUSTOM_INDICATOR_EXITING = ZoomOut.duration(200).easing(
  Easing.inOut(Easing.ease)
);

const CustomIndicator = () => {
  const { isExpanded } = useAccordionItemContext();

  return (
    <View className="size-5 items-center justify-center">
      {isExpanded ? (
        <Animated.View
          key="minus"
          entering={CUSTOM_INDICATOR_ENTERING}
          exiting={CUSTOM_INDICATOR_EXITING}
        >
          <StyledIonicons name="remove" size={18} className="text-muted" />
        </Animated.View>
      ) : (
        <Animated.View
          key="plus"
          entering={CUSTOM_INDICATOR_ENTERING}
          exiting={CUSTOM_INDICATOR_EXITING}
        >
          <StyledIonicons name="add" size={18} className="text-muted" />
        </Animated.View>
      )}
    </View>
  );
};

// ------------------------------------------------------------------------------

const accordionData = [
  {
    id: '1',
    title: 'How do I place an order?',
    icon: (
      <StyledIonicons
        name="bag-outline"
        size={ICON_SIZE}
        className="text-muted"
      />
    ),
    content:
      'Lorem ipsum dolor sit amet consectetur. Netus nunc mauris risus consequat. Libero placerat dignissim consectetur nisl.',
  },
  {
    id: '2',
    title: 'Can I modify or cancel my order?',
    icon: (
      <StyledIonicons
        name="receipt-outline"
        size={ICON_SIZE}
        className="text-muted"
      />
    ),
    content:
      'Lorem ipsum dolor sit amet consectetur. Netus nunc mauris risus consequat. Libero placerat dignissim consectetur nisl. Ornare imperdiet amet lorem adipiscing.',
  },
  {
    id: '3',
    title: 'How much does shipping cost?',
    icon: (
      <StyledMaterialIcons
        name="inventory-2"
        size={ICON_SIZE}
        className="text-muted"
      />
    ),
    content:
      'Lorem ipsum dolor sit amet consectetur. Netus nunc mauris risus consequat.',
  },
  {
    id: '4',
    title: 'Do you ship internationally?',
    icon: (
      <StyledIonicons
        name="globe-outline"
        size={ICON_SIZE}
        className="text-muted"
      />
    ),
    content:
      'Lorem ipsum dolor sit amet consectetur. Netus nunc mauris risus consequat. Libero placerat dignissim consectetur nisl. Ornare imperdiet amet lorem adipiscing.',
  },
];

// ------------------------------------------------------------------------------

const classNames = {
  triggerContentContainer: 'flex-row items-center flex-1 gap-3',
  triggerTitle: 'text-foreground text-base flex-1',
  contentText: 'text-muted text-base/relaxed px-[28px]',
};

// ------------------------------------------------------------------------------

const DefaultVariantContent = () => {
  return (
    <View className="flex-1 items-center justify-center px-5">
      <Accordion defaultValue="2" className="w-full">
        {accordionData.map((item) => (
          <Accordion.Item key={item.id} value={item.id}>
            <Accordion.Trigger>
              <View className={classNames.triggerContentContainer}>
                {item.icon}
                <AppText className={classNames.triggerTitle}>
                  {item.title}
                </AppText>
              </View>
              <Accordion.Indicator />
            </Accordion.Trigger>
            <Accordion.Content>
              <AppText className={classNames.contentText}>
                {item.content}
              </AppText>
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
                <AppText className={classNames.triggerTitle}>
                  {item.title}
                </AppText>
              </View>
              <Accordion.Indicator />
            </Accordion.Trigger>
            <Accordion.Content>
              <AppText className={classNames.contentText}>
                {item.content}
              </AppText>
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
                <AppText className={classNames.triggerTitle}>
                  {item.title}
                </AppText>
              </View>
              <Accordion.Indicator />
            </Accordion.Trigger>
            <Accordion.Content>
              <AppText className={classNames.contentText}>
                {item.content}
              </AppText>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion>
    </View>
  );
};

// ------------------------------------------------------------------------------

const WithoutDividersContent = () => {
  return (
    <View className="flex-1 items-center justify-center px-5">
      <Accordion isDividerVisible={false} className="w-full">
        {accordionData.slice(0, 3).map((item) => (
          <Accordion.Item key={item.id} value={item.id}>
            <Accordion.Trigger className="rounded-lg">
              <View className={classNames.triggerContentContainer}>
                {item.icon}
                <AppText className={classNames.triggerTitle}>
                  {item.title}
                </AppText>
              </View>
              <Accordion.Indicator />
            </Accordion.Trigger>
            <Accordion.Content>
              <AppText className={classNames.contentText}>
                {item.content}
              </AppText>
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
                <AppText className={classNames.triggerTitle}>
                  {item.title}
                </AppText>
              </View>
              <Accordion.Indicator>
                <CustomIndicator />
              </Accordion.Indicator>
            </Accordion.Trigger>
            <Accordion.Content>
              <AppText className={classNames.contentText}>
                {item.content}
              </AppText>
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
            <Accordion.Trigger isHighlightVisible={false}>
              <View className={classNames.triggerContentContainer}>
                {item.icon}
                <AppText className={classNames.triggerTitle}>
                  {item.title}
                </AppText>
              </View>
              <Accordion.Indicator
                springConfig={
                  index === 0
                    ? { damping: 60, stiffness: 900, mass: 3 }
                    : index === 1
                      ? { damping: 50, stiffness: 900, mass: 3 }
                      : { damping: 40, stiffness: 900, mass: 3 }
                }
              />
            </Accordion.Trigger>
            <Accordion.Content
              entering={
                index === 0
                  ? FadeInRight.delay(50).easing(Easing.inOut(Easing.ease))
                  : index === 1
                    ? FadeInLeft.delay(50).easing(Easing.inOut(Easing.ease))
                    : ZoomIn.delay(50).easing(Easing.out(Easing.exp))
              }
            >
              <AppText className={classNames.contentText}>
                {item.content}
              </AppText>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion>
    </View>
  );
};

// ------------------------------------------------------------------------------

const CustomStylesContent = () => {
  return (
    <View className="flex-1 items-center justify-center px-5">
      <Accordion isDividerVisible={false} className="w-full">
        {accordionData.slice(0, 4).map((item) => (
          <Accordion.Item key={item.id} value={item.id} className="mb-1">
            <Accordion.Trigger
              className="bg-surface rounded-2xl"
              style={styles.borderCurve}
            >
              <View className="flex-1 flex-row items-center gap-4">
                <View className="size-8 rounded-full bg-surface-secondary/50 items-center justify-center">
                  {item.icon}
                </View>
                <AppText className="text-foreground text-base font-medium flex-1">
                  {item.title}
                </AppText>
              </View>
              <Accordion.Indicator>
                <CustomIndicator />
              </Accordion.Indicator>
            </Accordion.Trigger>
            <Accordion.Content
              className="mt-1 bg-surface rounded-2xl px-5 py-4"
              style={styles.borderCurve}
            >
              <AppText className="text-muted text-base/relaxed">
                {item.content}
              </AppText>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion>
    </View>
  );
};

// ------------------------------------------------------------------------------

const ACCORDION_VARIANTS: UsageVariant[] = [
  {
    value: 'default-variant',
    label: 'Default variant',
    content: <DefaultVariantContent />,
  },
  {
    value: 'surface-variant',
    label: 'Surface variant',
    content: <SurfaceVariantContent />,
  },
  {
    value: 'multiple-selection',
    label: 'Multiple selection',
    content: <MultipleSelectionContent />,
  },
  {
    value: 'without-dividers',
    label: 'Without dividers',
    content: <WithoutDividersContent />,
  },
  {
    value: 'custom-indicator',
    label: 'Custom indicator',
    content: <CustomIndicatorContent />,
  },
  {
    value: 'custom-entering-animation',
    label: 'Custom entering animation',
    content: <CustomEnteringAnimationContent />,
  },
  {
    value: 'custom-styles',
    label: 'Custom styles',
    content: <CustomStylesContent />,
  },
];

const styles = StyleSheet.create({
  borderCurve: {
    borderCurve: 'continuous',
  },
});

export default function AccordionScreen() {
  return <UsageVariantFlatList data={ACCORDION_VARIANTS} />;
}
