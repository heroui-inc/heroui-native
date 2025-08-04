import {
  Accordion,
  AccordionLayoutTransition,
  useAccordionItemContext,
  useTheme,
} from 'heroui-native';
import {
  CreditCard,
  Earth,
  Minus,
  Package,
  Plus,
  ReceiptText,
  RefreshCcw,
  ShoppingBag,
} from 'lucide-react-native';
import { ScrollView, Text, View } from 'react-native';
import Animated, {
  Easing,
  FadeInLeft,
  FadeInRight,
  ZoomIn,
  ZoomOut,
} from 'react-native-reanimated';

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);
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
          <Minus size={16} color={colors.mutedForeground} />
        </Animated.View>
      ) : (
        <Animated.View
          key="plus"
          entering={CUSTOM_INDICATOR_ENTERING}
          exiting={CUSTOM_INDICATOR_EXITING}
        >
          <Plus size={16} color={colors.mutedForeground} />
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
      icon: <ShoppingBag size={ICON_SIZE} color={colors.mutedForeground} />,
      content:
        'Lorem ipsum dolor sit amet consectetur. Netus nunc mauris risus consequat. Libero placerat dignissim consectetur nisl. Ornare imperdiet amet lorem adipiscing.',
    },
    {
      id: '2',
      title: 'Can I modify or cancel my order?',
      icon: <ReceiptText size={ICON_SIZE} color={colors.mutedForeground} />,
      content:
        'Lorem ipsum dolor sit amet consectetur. Netus nunc mauris risus consequat. Libero placerat dignissim consectetur nisl. Ornare imperdiet amet lorem adipiscing.',
    },
    {
      id: '3',
      title: 'What payment methods do you accept?',
      icon: <CreditCard size={ICON_SIZE} color={colors.mutedForeground} />,
      content:
        'Lorem ipsum dolor sit amet consectetur. Netus nunc mauris risus consequat. Libero placerat dignissim consectetur nisl. Ornare imperdiet amet lorem adipiscing.',
    },
    {
      id: '4',
      title: 'How much does shipping cost?',
      icon: <Package size={ICON_SIZE} color={colors.mutedForeground} />,
      content:
        'Lorem ipsum dolor sit amet consectetur. Netus nunc mauris risus consequat. Libero placerat dignissim consectetur nisl. Ornare imperdiet amet lorem adipiscing.',
    },
    {
      id: '5',
      title: 'Do you ship internationally?',
      icon: <Earth size={ICON_SIZE} color={colors.mutedForeground} />,
      content:
        'Lorem ipsum dolor sit amet consectetur. Netus nunc mauris risus consequat. Libero placerat dignissim consectetur nisl. Ornare imperdiet amet lorem adipiscing.',
    },
    {
      id: '6',
      title: 'How do I request a refund?',
      icon: <RefreshCcw size={ICON_SIZE} color={colors.mutedForeground} />,
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
    <AnimatedScrollView
      className="bg-background"
      contentContainerClassName="p-4 pb-[150px]"
      contentInsetAdjustmentBehavior="automatic"
      layout={AccordionLayoutTransition}
    >
      <AnimatedView className="mb-8" layout={AccordionLayoutTransition}>
        <Text className="text-lg font-bold text-muted-foreground mb-4">
          Default Variant
        </Text>
        <Accordion selectionMode="single" defaultValue="2">
          {accordionData.map((item) => (
            <Accordion.Item key={item.id} value={item.id}>
              <Accordion.Trigger>
                <View className={classNames.triggerContentContainer}>
                  {item.icon}
                  <Text className={classNames.triggerTitle}>{item.title}</Text>
                </View>
                <Accordion.Indicator />
              </Accordion.Trigger>
              <Accordion.Content>
                <Text className={classNames.contentText}>{item.content}</Text>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion>
      </AnimatedView>

      <AnimatedView className="mb-8" layout={AccordionLayoutTransition}>
        <Text className="text-lg font-bold text-muted-foreground mb-4">
          Border Variant
        </Text>
        <Accordion selectionMode="single" variant="border">
          {accordionData.map((item) => (
            <Accordion.Item key={item.id} value={item.id}>
              <Accordion.Trigger>
                <View className={classNames.triggerContentContainer}>
                  {item.icon}
                  <Text className={classNames.triggerTitle}>{item.title}</Text>
                </View>
                <Accordion.Indicator />
              </Accordion.Trigger>
              <Accordion.Content>
                <Text className={classNames.contentText}>{item.content}</Text>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion>
      </AnimatedView>

      <AnimatedView className="mb-8" layout={AccordionLayoutTransition}>
        <Text className="text-lg font-bold text-muted-foreground mb-4">
          Multiple Selection
        </Text>
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
                  <Text className={classNames.triggerTitle}>{item.title}</Text>
                </View>
                <Accordion.Indicator />
              </Accordion.Trigger>
              <Accordion.Content>
                <Text className={classNames.contentText}>{item.content}</Text>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion>
      </AnimatedView>

      <AnimatedView className="mb-8" layout={AccordionLayoutTransition}>
        <Text className="text-lg font-bold text-muted-foreground mb-4">
          Custom Indicator
        </Text>
        <Accordion selectionMode="single" variant="border">
          {accordionData.slice(0, 2).map((item) => (
            <Accordion.Item key={item.id} value={item.id}>
              <Accordion.Trigger>
                <View className={classNames.triggerContentContainer}>
                  {item.icon}
                  <Text className={classNames.triggerTitle}>{item.title}</Text>
                </View>
                <Accordion.Indicator>
                  <CustomIndicator />
                </Accordion.Indicator>
              </Accordion.Trigger>
              <Accordion.Content>
                <Text className={classNames.contentText}>{item.content}</Text>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion>
      </AnimatedView>

      <AnimatedView className="mb-8" layout={AccordionLayoutTransition}>
        <Text className="text-lg font-bold text-muted-foreground mb-4">
          Custom entering animation
        </Text>
        <Accordion selectionMode="single" variant="border" showDivider={false}>
          {accordionData.slice(0, 3).map((item, index) => (
            <Accordion.Item key={item.id} value={item.id}>
              <Accordion.Trigger hideHighlight>
                <View className={classNames.triggerContentContainer}>
                  {item.icon}
                  <Text className={classNames.triggerTitle}>{item.title}</Text>
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
                <Text className={classNames.contentText}>{item.content}</Text>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion>
      </AnimatedView>

      <AnimatedView className="mb-8" layout={AccordionLayoutTransition}>
        <Text className="text-lg font-bold text-muted-foreground mb-4">
          Custom Styles
        </Text>
        <View className="gap-3">
          <Accordion selectionMode="single" showDivider={false}>
            {accordionData.slice(0, 4).map((item) => (
              <Accordion.Item key={item.id} value={item.id} className="mb-3">
                <Accordion.Trigger className="bg-surface-2 rounded-xl border border-border/50 shadow-sm">
                  <View className="flex-row items-center flex-1 gap-4">
                    <View className="w-10 h-10 rounded-full bg-accent/5 items-center justify-center">
                      {item.icon}
                    </View>
                    <Text className="text-foreground text-base font-medium flex-1">
                      {item.title}
                    </Text>
                    <Accordion.Indicator>
                      <CustomIndicator />
                    </Accordion.Indicator>
                  </View>
                </Accordion.Trigger>
                <Accordion.Content className="mt-2 bg-surface-2 rounded-xl px-5 py-4 border border-border/50">
                  <Text className="text-muted-foreground text-base/relaxed">
                    {item.content}
                  </Text>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion>
        </View>
      </AnimatedView>
    </AnimatedScrollView>
  );
};

export default AccordionScreen;
