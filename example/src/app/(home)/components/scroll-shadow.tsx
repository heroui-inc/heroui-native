import { useHeaderHeight } from '@react-navigation/elements';
import { ScrollShadow, Surface } from 'heroui-native';
import { FlatList, Platform, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SectionTitle } from '../../../components/section-title';

const HORIZONTAL_ITEMS = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  title: `Card ${i + 1}`,
}));

export default function ScrollShadowScreen() {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();

  return (
    <View
      className="flex-1 bg-background"
      style={{
        paddingTop: Platform.select({
          ios: headerHeight,
          android: 0,
        }),
        paddingBottom: insets.bottom + 16,
      }}
    >
      <SectionTitle title="Horizontal" />
      <ScrollShadow>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerClassName="p-5 gap-5"
        >
          {HORIZONTAL_ITEMS.map((item) => (
            <Surface key={item.id} variant="2" className="w-32 h-16" />
          ))}
        </ScrollView>
      </ScrollShadow>
      <SectionTitle title="Vertical" />
      <ScrollShadow size={100} className="flex-1">
        <FlatList
          data={HORIZONTAL_ITEMS}
          keyExtractor={(item) => String(item.id)}
          contentContainerClassName="px-5 py-8 gap-5 items-center"
          renderItem={({ item: _item }) => (
            <Text className="text-foreground">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi
              odio rerum quos unde nisi delectus maxime optio cupiditate
              perferendis praesentium distinctio repudiandae ad a, provident
              mollitia quam? Aliquid, temporibus tenetur.
            </Text>
          )}
          showsVerticalScrollIndicator={false}
        />
      </ScrollShadow>
    </View>
  );
}
