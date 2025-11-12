import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import {
  Accordion,
  AccordionLayoutTransition,
  cn,
  useAccordion,
  useAccordionItem,
} from 'heroui-native';
import { type FC } from 'react';
import { View } from 'react-native';
import Animated from 'react-native-reanimated';
import { withUniwind } from 'uniwind';
import { AppText } from '../app-text';

const StyledIonicons = withUniwind(Ionicons);
const StyledMaterialIcons = withUniwind(MaterialIcons);

const ICON_SIZE = 16;

const accordionData = [
  {
    id: '1',
    title: 'What is design engineering?',
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
    title: 'What is the craft of UI?',
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
    title: 'Why does craft matter?',
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
    title: 'Who is this for?',
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

const classNames = {
  triggerContentContainer: 'flex-row items-center flex-1 gap-3',
  triggerTitle: 'text-foreground text-base flex-1',
  contentText: 'text-muted text-base/relaxed px-[28px]',
};

type AccordionItemProps = {
  item: (typeof accordionData)[number];
  index: number;
};

const AccordionItemContent: FC<AccordionItemProps> = ({ item, index }) => {
  const {} = useAccordion();
  const { isSelected } = useAccordionItem();

  //   const selectedItemIndex = value.indexOf(item.id);

  //   useEffect(() => {
  //     console.log(
  //       'itemIndex:',
  //       itemIndex,
  //       'selectedItemIndex:',
  //       selectedItemIndex
  //     );
  //   }, [itemIndex, selectedItemIndex]);

  return (
    <Animated.View
      layout={AccordionLayoutTransition}
      className={cn(
        'border-x border-b',
        index === 0 && 'border-t rounded-t-2xl',
        index === accordionData.length - 1 && 'rounded-b-2xl',
        isSelected && 'border rounded-2xl',
        isSelected && index === 0 && 'mb-8',
        isSelected && index > 0 && index < accordionData.length - 1 && 'my-8',
        isSelected && index === accordionData.length - 1 && 'mt-8'
      )}
    >
      <Accordion.Trigger>
        <View className={classNames.triggerContentContainer}>
          {item.icon}
          <AppText className={classNames.triggerTitle}>{item.title}</AppText>
        </View>
        <Accordion.Indicator />
      </Accordion.Trigger>
      <Accordion.Content>
        <AppText className={classNames.contentText}>{item.content}</AppText>
      </Accordion.Content>
    </Animated.View>
  );
};

export const FineTunedAccordion: FC = () => {
  return (
    <Accordion defaultValue="2" className="w-full" isDividerVisible={false}>
      {accordionData.map((item, index) => (
        <Accordion.Item key={item.id} value={item.id}>
          <AccordionItemContent item={item} index={index} />
        </Accordion.Item>
      ))}
    </Accordion>
  );
};
