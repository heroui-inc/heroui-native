import { Accordion, useTheme } from 'heroui-native';
import { CreditCard, Package, ShoppingBag } from 'lucide-react-native';
import { ScrollView, Text, View } from 'react-native';

export default function Theme() {
  const { colors } = useTheme();

  const accordionData = [
    {
      id: '1',
      title: 'How do I place an order?',
      icon: <ShoppingBag size={16} color={colors.mutedForeground} />,
      content:
        'Lorem ipsum dolor sit amet consectetur. Netus nunc mauris risus consequat. Libero placerat dignissim consectetur nisl.',
    },
    {
      id: '2',
      title: 'What payment methods do you accept?',
      icon: <CreditCard size={16} color={colors.mutedForeground} />,
      content:
        'Lorem ipsum dolor sit amet consectetur. Netus nunc mauris risus consequat. Libero placerat dignissim consectetur nisl.',
    },
    {
      id: '3',
      title: 'How much does shipping cost?',
      icon: <Package size={16} color={colors.mutedForeground} />,
      content:
        'Lorem ipsum dolor sit amet consectetur. Netus nunc mauris risus consequat. Libero placerat dignissim consectetur nisl.',
    },
  ];

  return (
    <ScrollView
      className="flex-1 px-4 py-6 bg-background"
      contentContainerClassName="pb-20"
      contentInsetAdjustmentBehavior="automatic"
    >
      <Accordion selectionMode="single" variant="border" defaultValue="2">
        {accordionData.map((item) => (
          <Accordion.Item key={item.id} value={item.id}>
            <Accordion.Trigger>
              <View className="flex-row items-center flex-1 gap-3">
                {item.icon}
                <Text className="text-foreground text-base flex-1">
                  {item.title}
                </Text>
              </View>
              <Accordion.Indicator />
            </Accordion.Trigger>
            <Accordion.Content>
              <Text className="text-muted-foreground text-base/relaxed px-[25px]">
                {item.content}
              </Text>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion>
    </ScrollView>
  );
}
