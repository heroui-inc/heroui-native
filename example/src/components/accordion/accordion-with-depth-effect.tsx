/* eslint-disable react-native/no-inline-styles */
import { Ionicons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useHeaderHeight } from '@react-navigation/elements';
import {
  Accordion,
  cn,
  Divider,
  FormField,
  Switch,
  useAccordion,
  useAccordionItem,
  useThemeColor,
} from 'heroui-native';
import { createContext, use, useState, type FC } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  FadeIn,
  Keyframe,
  LinearTransition,
  ZoomIn,
  ZoomOut,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { withUniwind } from 'uniwind';
import { AppText } from '../app-text';

const LAYOUT_TRANSITION = LinearTransition.springify()
  .damping(70)
  .stiffness(1000)
  .mass(2);

const StyledMaterialCommunityIcons = withUniwind(MaterialCommunityIcons);
const StyledAntDesign = withUniwind(AntDesign);
const StyledIonicons = withUniwind(Ionicons);
const StyledEntypo = withUniwind(Entypo);

const TRIGGER_ICON_SIZE = 16;

const accordionData = [
  {
    id: '1',
    title: 'What is design engineering?',
    icon: (
      <StyledAntDesign
        name="tool"
        size={TRIGGER_ICON_SIZE}
        className="text-muted"
      />
    ),
    content:
      'Where design intuition meets code execution - enabling you to see UI problems and build solutions from the ground up.',
  },
  {
    id: '2',
    title: 'What is the craft of UI?',
    icon: (
      <StyledMaterialCommunityIcons
        name="minecraft"
        size={TRIGGER_ICON_SIZE}
        className="text-muted"
      />
    ),
    content:
      "A course about building things *well* - mastering the platform so you're not limited by tools or libraries",
  },
  {
    id: '3',
    title: 'Why does craft matter?',
    icon: (
      <StyledIonicons
        name="sparkles-sharp"
        size={TRIGGER_ICON_SIZE}
        className="text-muted"
      />
    ),
    content:
      "Because it's more than making something work - it's making something feel right: inclusive, resilient and scalable.",
  },
  {
    id: '4',
    title: 'Who is this for?',
    icon: (
      <StyledEntypo
        name="users"
        size={TRIGGER_ICON_SIZE}
        className="text-muted"
      />
    ),
    content:
      'Designers who code, developers who design - anyone ready to stop chasing snippets and become the person who *can build anything*.',
  },
];

const classNames = {
  triggerContentContainer: 'flex-row items-center flex-1 gap-3',
  triggerTitle: 'text-foreground text-base flex-1',
  contentText: 'text-muted text-base/relaxed',
};

// ------------------------------------------------------------------------------

type SettingsContextType = {
  depth: boolean;
  setDepth: (depth: boolean) => void;
};

const SettingsContext = createContext<SettingsContextType>({
  depth: true,
  setDepth: () => {},
});

// ------------------------------------------------------------------------------

const CUSTOM_INDICATOR_ENTERING = ZoomIn.duration(200).easing(
  Easing.inOut(Easing.ease)
);

const CLOSE_INDICATOR_ENTERING = new Keyframe({
  0: {
    opacity: 0.5,
    transform: [{ rotate: '-210deg' }],
  },
  100: {
    opacity: 1,
    transform: [{ rotate: '0deg' }],
  },
});

const CUSTOM_INDICATOR_EXITING = ZoomOut.duration(200).easing(
  Easing.inOut(Easing.ease)
);

const CustomIndicator = () => {
  const { isExpanded } = useAccordionItem();

  return (
    <View className="size-5 items-center justify-center">
      {isExpanded ? (
        <Animated.View
          key="close"
          entering={CLOSE_INDICATOR_ENTERING.duration(250)}
          exiting={CUSTOM_INDICATOR_EXITING}
        >
          <StyledIonicons name="close" size={18} className="text-muted" />
        </Animated.View>
      ) : (
        <Animated.View
          key="expand"
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

type AccordionItemProps = {
  item: (typeof accordionData)[number];
  index: number;
};

const AccordionItemContent: FC<AccordionItemProps> = ({ item, index }) => {
  const { depth } = use(SettingsContext);

  const { value } = useAccordion();
  const { isExpanded } = useAccordionItem();

  const themeColorSurfaceHover = useThemeColor('on-surface-hover');

  const selectedItemIndex = accordionData.findIndex(
    (accordionItem) => accordionItem.id === value
  );

  const isBeforeSelected =
    selectedItemIndex !== -1 && index === selectedItemIndex - 1;
  const isAfterSelected =
    selectedItemIndex !== -1 && index === selectedItemIndex + 1;

  // Show divider if:
  // 1. Not the last item
  // 2. Current item is NOT the item directly before selected
  // 3. Current item is NOT selected
  // 4. Next item is NOT selected
  const showDivider =
    index < accordionData.length - 1 &&
    !isBeforeSelected &&
    !isExpanded &&
    index + 1 !== selectedItemIndex;

  return (
    <Animated.View
      layout={LAYOUT_TRANSITION}
      style={[
        styles.borderCurve,
        {
          transitionProperty: 'transform',
          transitionDuration: '200ms',
          transitionTimingFunction: 'ease-out',
          transform: [
            depth
              ? {
                  scale: isExpanded ? 1 : 0.9,
                }
              : {
                  scale: 1,
                },
          ],
        },
      ]}
    >
      <Animated.View
        layout={LAYOUT_TRANSITION}
        className={cn(
          'bg-surface overflow-hidden',
          // First item gets rounded top corners
          index === 0 && !isExpanded && 'rounded-t-2xl',
          // Last item gets rounded bottom corners
          index === accordionData.length - 1 &&
            !isExpanded &&
            !isBeforeSelected &&
            'rounded-b-3xl',
          // Item before selected: rounded bottom corners
          isBeforeSelected && 'rounded-b-2xl',
          // Selected item: full border with all corners rounded
          isExpanded && 'rounded-2xl',
          // Item after selected: rounded top corners
          isAfterSelected && 'rounded-t-2xl',
          // Spacing for selected items
          isExpanded && index === 0 && cn('mb-6', depth && 'mb-4'),
          isExpanded &&
            index > 0 &&
            index < accordionData.length - 1 &&
            cn('my-6', depth && 'my-4'),
          isExpanded &&
            index === accordionData.length - 1 &&
            cn('mt-6', depth && 'mt-4')
        )}
      >
        <Accordion.Trigger
          className="px-5"
          highlightOpacity={depth ? 0 : 0.25}
          highlightColor={themeColorSurfaceHover}
        >
          <View className={classNames.triggerContentContainer}>
            {item.icon}
            <AppText className={classNames.triggerTitle}>{item.title}</AppText>
          </View>
          <Accordion.Indicator>
            <CustomIndicator />
          </Accordion.Indicator>
        </Accordion.Trigger>
        <Accordion.Content className="px-5">
          <AppText className={classNames.contentText}>{item.content}</AppText>
        </Accordion.Content>
      </Animated.View>
      {showDivider && (
        <Animated.View
          layout={LAYOUT_TRANSITION}
          entering={FadeIn.duration(200)}
          className={cn('px-3 bg-surface', depth && 'pb-3 -mb-3')}
        >
          <Divider />
        </Animated.View>
      )}
    </Animated.View>
  );
};

// ------------------------------------------------------------------------------

export const AccordionWithDepthEffect: FC = () => {
  const [depth, setDepth] = useState(true);

  const headerHeight = useHeaderHeight();
  const insets = useSafeAreaInsets();

  return (
    <SettingsContext value={{ depth, setDepth }}>
      <View
        className="flex-1 justify-between px-5"
        style={{
          paddingTop: headerHeight + 20,
          paddingBottom: insets.bottom + 110,
        }}
      >
        <Accordion
          layout={LAYOUT_TRANSITION}
          defaultValue="2"
          isDividerVisible={false}
          className="w-full overflow-visible"
        >
          {accordionData.map((item, index) => (
            <Accordion.Item
              key={item.id}
              value={item.id}
              className="overflow-visible"
            >
              <AccordionItemContent item={item} index={index} />
            </Accordion.Item>
          ))}
        </Accordion>
        <View>
          <FormField
            isSelected={depth}
            onSelectedChange={setDepth}
            className="pr-2"
          >
            <FormField.Content>
              <FormField.Title>Depth</FormField.Title>
              <FormField.Description>
                Enable depth effect for the accordion
              </FormField.Description>
            </FormField.Content>
            <FormField.Indicator>
              <Switch />
            </FormField.Indicator>
          </FormField>
          <Divider className="mt-6" />
        </View>
      </View>
    </SettingsContext>
  );
};

const styles = StyleSheet.create({
  borderCurve: {
    borderCurve: 'continuous',
  },
});
