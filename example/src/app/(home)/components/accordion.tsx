import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import {
  Accordion,
  AccordionLayoutTransition,
  useAccordionItemContext,
  useTheme,
} from 'heroui-native';
import { View } from 'react-native';
import Animated, {
  Easing,
  FadeInLeft,
  FadeInRight,
  ZoomIn,
  ZoomOut,
} from 'react-native-reanimated';
import { AppText } from '../../../components/app-text';
import { ScreenScrollView } from '../../../components/screen-scroll-view';
import { SectionTitle } from '../../../components/section-title';

const AnimatedView = Animated.createAnimatedComponent(View);

const ICON_SIZE = 16;

const CUSTOM_INDICATOR_ENTERING = ZoomIn.duration(200).easing(
  Easing.inOut(Easing.ease)
);
const CUSTOM_INDICATOR_EXITING = ZoomOut.duration(200).easing(
  Easing.inOut(Easing.ease)
);

const CustomIndicator = () => {
  const { isExpanded } = useAccordionItemContext();
  const { colors } = useTheme();

  return (
    <View className="w-5 h-5 items-center justify-center">
      {isExpanded ? (
        <Animated.View
          key="minus"
          entering={CUSTOM_INDICATOR_ENTERING}
          exiting={CUSTOM_INDICATOR_EXITING}
        >
          <Ionicons name="remove" size={16} color={colors.mutedForeground} />
        </Animated.View>
      ) : (
        <Animated.View
          key="plus"
          entering={CUSTOM_INDICATOR_ENTERING}
          exiting={CUSTOM_INDICATOR_EXITING}
        >
          <Ionicons name="add" size={16} color={colors.mutedForeground} />
        </Animated.View>
      )}
    </View>
  );
};

const AccordionScreen = () => {
  const { colors } = useTheme();

  const accordionData = [
    {
      id: '1',
      title: 'How do I place an order?',
      icon: (
        <Ionicons
          name="bag-outline"
          size={ICON_SIZE}
          color={colors.mutedForeground}
        />
      ),
      content:
        'Lorem ipsum dolor sit amet consectetur. Netus nunc mauris risus consequat. Libero placerat dignissim consectetur nisl. Ornare imperdiet amet lorem adipiscing.',
    },
    {
      id: '2',
      title: 'Can I modify or cancel my order?',
      icon: (
        <Ionicons
          name="receipt-outline"
          size={ICON_SIZE}
          color={colors.mutedForeground}
        />
      ),
      content:
        'Lorem ipsum dolor sit amet consectetur. Netus nunc mauris risus consequat. Libero placerat dignissim consectetur nisl. Ornare imperdiet amet lorem adipiscing.',
    },
    {
      id: '3',
      title: 'What payment methods do you accept?',
      icon: (
        <Ionicons
          name="card-outline"
          size={ICON_SIZE}
          color={colors.mutedForeground}
        />
      ),
      content:
        'Lorem ipsum dolor sit amet consectetur. Netus nunc mauris risus consequat. Libero placerat dignissim consectetur nisl. Ornare imperdiet amet lorem adipiscing.',
    },
    {
      id: '4',
      title: 'How much does shipping cost?',
      icon: (
        <MaterialIcons
          name="inventory-2"
          size={ICON_SIZE}
          color={colors.mutedForeground}
        />
      ),
      content:
        'Lorem ipsum dolor sit amet consectetur. Netus nunc mauris risus consequat. Libero placerat dignissim consectetur nisl. Ornare imperdiet amet lorem adipiscing.',
    },
    {
      id: '5',
      title: 'Do you ship internationally?',
      icon: (
        <Ionicons
          name="globe-outline"
          size={ICON_SIZE}
          color={colors.mutedForeground}
        />
      ),
      content:
        'Lorem ipsum dolor sit amet consectetur. Netus nunc mauris risus consequat. Libero placerat dignissim consectetur nisl. Ornare imperdiet amet lorem adipiscing.',
    },
    {
      id: '6',
      title: 'How do I request a refund?',
      icon: (
        <Ionicons
          name="refresh"
          size={ICON_SIZE}
          color={colors.mutedForeground}
        />
      ),
      content:
        'Lorem ipsum dolor sit amet consectetur. Netus nunc mauris risus consequat. Libero placerat dignissim consectetur nisl. Ornare imperdiet amet lorem adipiscing.',
    },
  ];

  const classNames = {
    triggerContentContainer: 'flex-row items-center flex-1 gap-3',
    triggerTitle: 'text-foreground text-base flex-1',
    contentText: 'text-muted-foreground text-base/relaxed px-[25px]',
  };

  return (
    <ScreenScrollView
      layout={AccordionLayoutTransition}
      contentContainerClassName="gap-16"
    >
      <AnimatedView className="gap-12" layout={AccordionLayoutTransition}>
        <SectionTitle title="Default Variant" />
        <Accordion defaultValue="2">
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
      </AnimatedView>

      <AnimatedView className="gap-16" layout={AccordionLayoutTransition}>
        <SectionTitle title="Border Variant" />
        <Accordion variant="border">
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
      </AnimatedView>

      <AnimatedView className="gap-16" layout={AccordionLayoutTransition}>
        <SectionTitle title="Multiple Selection" />
        <Accordion
          selectionMode="multiple"
          variant="border"
          defaultValue={['1', '3']}
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
      </AnimatedView>

      <AnimatedView className="gap-16" layout={AccordionLayoutTransition}>
        <SectionTitle title="Without Dividers" />
        <Accordion isDividerVisible={false}>
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
      </AnimatedView>

      <AnimatedView className="gap-16" layout={AccordionLayoutTransition}>
        <SectionTitle title="Custom Indicator" />
        <Accordion variant="border">
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
      </AnimatedView>

      <AnimatedView className="gap-16" layout={AccordionLayoutTransition}>
        <SectionTitle title="Custom entering animation" />
        <Accordion variant="border">
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
                      ? { damping: 10, stiffness: 100 }
                      : index === 1
                        ? { damping: 50, stiffness: 500 }
                        : { damping: 15, stiffness: 150 }
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
      </AnimatedView>

      <AnimatedView className="gap-16" layout={AccordionLayoutTransition}>
        <SectionTitle title="Custom Styles" />
        <Accordion isDividerVisible={false}>
          {accordionData.slice(0, 4).map((item) => (
            <Accordion.Item key={item.id} value={item.id} className="mb-1">
              <Accordion.Trigger className="bg-surface-2 rounded-xl border border-border/50 shadow-sm">
                <View className="flex-1 flex-row items-center gap-4">
                  <View className="w-10 h-10 rounded-full bg-accent/5 items-center justify-center">
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
              <Accordion.Content className="mt-1 bg-surface-2 rounded-xl px-5 py-4 border border-border/50">
                <AppText className="text-muted-foreground text-base/relaxed">
                  {item.content}
                </AppText>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion>
      </AnimatedView>
    </ScreenScrollView>
  );
};

export default AccordionScreen;
