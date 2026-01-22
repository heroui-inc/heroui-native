/* eslint-disable react-native/no-inline-styles */
import {
  Accordion,
  cn,
  Separator,
  useAccordion,
  useAccordionItem,
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
import { withUniwind } from 'uniwind';
import { AppText } from '../app-text';
import { CubesThreeIcon } from '../icons/cubes-three';
import { MagicWandIcon } from '../icons/magic-wand';
import { PersonsIcon } from '../icons/persons';
import { PlusIcon } from '../icons/plus';
import { ThreeDiagonalIcon } from '../icons/three-diagonal';
import { XMarkIcon } from '../icons/x-mark';
import { WithStateToggle } from '../with-state-toggle';

const LAYOUT_TRANSITION = LinearTransition.springify()
  .damping(70)
  .stiffness(1000)
  .mass(2);

const StyledAnimatedView = withUniwind(Animated.View);

const TRIGGER_ICON_SIZE = 16;

const accordionData = [
  {
    id: '1',
    title: 'What is design engineering?',
    icon: (
      <ThreeDiagonalIcon
        size={TRIGGER_ICON_SIZE}
        colorClassName="accent-muted"
      />
    ),
    content:
      'The intersection of creative vision and technical implementation - empowering you to identify interface challenges and craft solutions from scratch.',
  },
  {
    id: '2',
    title: 'What defines UI craftsmanship?',
    icon: (
      <CubesThreeIcon size={TRIGGER_ICON_SIZE} colorClassName="accent-muted" />
    ),
    content:
      "The art of building things with excellence - achieving platform mastery so you're never constrained by frameworks or tooling",
  },
  {
    id: '3',
    title: 'Why is craftsmanship important?',
    icon: (
      <MagicWandIcon size={TRIGGER_ICON_SIZE} colorClassName="accent-muted" />
    ),
    content:
      "Because it transcends mere functionality - it's about creating experiences that feel intuitive: accessible, robust and maintainable.",
  },
  {
    id: '4',
    title: 'Who should embrace this?',
    icon: (
      <PersonsIcon size={TRIGGER_ICON_SIZE} colorClassName="accent-muted" />
    ),
    content:
      'Creative coders and technical designers - individuals prepared to move beyond copy-paste solutions and evolve into builders who *can create anything*.',
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
          <XMarkIcon size={14} colorClassName="accent-muted" />
        </Animated.View>
      ) : (
        <Animated.View
          key="expand"
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

type AccordionItemProps = {
  item: (typeof accordionData)[number];
  index: number;
};

const AccordionItemContent: FC<AccordionItemProps> = ({ item, index }) => {
  const { depth } = use(SettingsContext);

  const { value } = useAccordion();
  const { isExpanded } = useAccordionItem();

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
      <StyledAnimatedView
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
        <Accordion.Trigger className="px-5">
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
      </StyledAnimatedView>
      {showDivider && (
        <StyledAnimatedView
          layout={LAYOUT_TRANSITION}
          entering={FadeIn.duration(200)}
          className={cn('px-3 bg-surface', depth && 'pb-3 -mb-3')}
        >
          <Separator />
        </StyledAnimatedView>
      )}
    </Animated.View>
  );
};

// ------------------------------------------------------------------------------

export const AccordionWithDepthEffect: FC = () => {
  const [depth, setDepth] = useState(true);

  return (
    <SettingsContext value={{ depth, setDepth }}>
      <WithStateToggle
        isSelected={depth}
        onSelectedChange={setDepth}
        label="Depth"
        description="Enable depth effect for the accordion"
      >
        <Accordion
          animation={{
            layout: {
              value: LAYOUT_TRANSITION as any,
            },
          }}
          defaultValue="2"
          hideSeparator
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
      </WithStateToggle>
    </SettingsContext>
  );
};

const styles = StyleSheet.create({
  borderCurve: {
    borderCurve: 'continuous',
  },
});
