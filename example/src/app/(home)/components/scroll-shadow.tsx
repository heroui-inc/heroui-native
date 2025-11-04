import { FlashList } from '@shopify/flash-list';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollShadow, Surface } from 'heroui-native';
import {
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import type { UsageVariant } from '../../../components/component-presentation/types';
import { UsageVariantFlatList } from '../../../components/component-presentation/usage-variant-flatlist';

const VerticalContent = () => {
  const { height } = useWindowDimensions();

  return (
    <View className="flex-1 items-center justify-center px-8">
      <View className="w-full" style={{ height: height * 0.6 }}>
        <ScrollShadow
          size={height * 0.1}
          LinearGradientComponent={LinearGradient}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text className="mb-6 text-3xl font-bold text-foreground">
              Lorem Ipsum Dolor Sit Amet
            </Text>

            <Text className="mb-4 text-2xl font-semibold text-foreground">
              Consectetur Adipiscing Elit
            </Text>
            <Text className="mb-4 text-base leading-6 text-foreground">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </Text>

            <Text className="mb-3 text-xl font-semibold text-foreground">
              Sed Ut Perspiciatis
            </Text>
            <Text className="mb-4 text-base leading-6 text-foreground">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
              aspernatur aut odit aut fugit.
            </Text>

            <Text className="mb-3 text-lg font-medium text-foreground">
              At Vero Eos Et Accusamus
            </Text>
            <Text className="mb-4 text-base leading-6 text-foreground">
              At vero eos et accusamus et iusto odio dignissimos ducimus qui
              blanditiis praesentium voluptatum deleniti atque corrupti quos
              dolores et quas molestias excepturi sint occaecati cupiditate non
              provident, similique sunt in culpa qui officia deserunt mollitia
              animi, id est laborum et dolorum fuga.
            </Text>

            <Text className="mb-3 text-xl font-semibold text-foreground">
              Nam Libero Tempore
            </Text>
            <Text className="mb-4 text-base leading-6 text-foreground">
              Nam libero tempore, cum soluta nobis est eligendi optio cumque
              nihil impedit quo minus id quod maxime placeat facere possimus,
              omnis voluptas assumenda est, omnis dolor repellendus. Temporibus
              autem quibusdam et aut officiis debitis aut rerum necessitatibus
              saepe eveniet ut et voluptates repudiandae sint et molestiae non
              recusandae.
            </Text>

            <Text className="mb-3 text-lg font-medium text-foreground">
              Itaque Earum Rerum
            </Text>
            <Text className="mb-4 text-base leading-6 text-foreground">
              Itaque earum rerum hic tenetur a sapiente delectus, ut aut
              reiciendis voluptatibus maiores alias consequatur aut perferendis
              doloribus asperiores repellat. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
              labore et dolore magna aliqua.
            </Text>

            <Text className="mb-3 text-2xl font-semibold text-foreground">
              Ut Enim Ad Minima Veniam
            </Text>
            <Text className="mb-4 text-base leading-6 text-foreground">
              Ut enim ad minima veniam, quis nostrum exercitationem ullam
              corporis suscipit laboriosam, nisi ut aliquid ex ea commodi
              consequatur? Quis autem vel eum iure reprehenderit qui in ea
              voluptate velit esse quam nihil molestiae consequatur, vel illum
              qui dolorem eum fugiat quo voluptas nulla pariatur?
            </Text>

            <Text className="mb-3 text-lg font-medium text-foreground">
              Neque Porro Quisquam
            </Text>
            <Text className="mb-4 text-base leading-6 text-foreground">
              Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet,
              consectetur, adipisci velit, sed quia non numquam eius modi
              tempora incidunt ut labore et dolore magnam aliquam quaerat
              voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem
              ullam corporis suscipit laboriosam.
            </Text>

            <Text className="mb-3 text-xl font-semibold text-foreground">
              De Finibus Bonorum et Malorum
            </Text>
            <Text className="mb-4 text-base leading-6 text-foreground">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
              aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
              eos qui ratione voluptatem sequi nesciunt.
            </Text>

            <Text className="mb-3 text-lg font-medium text-foreground">
              Excepteur Sint Occaecat
            </Text>
            <Text className="mb-4 text-base leading-6 text-foreground">
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum. Et harum quidem rerum
              facilis est et expedita distinctio. Nam libero tempore, cum soluta
              nobis est eligendi optio cumque nihil impedit quo minus id quod
              maxime placeat facere possimus.
            </Text>

            <Text className="mb-3 text-2xl font-semibold text-foreground">
              Cicero's De Finibus
            </Text>
            <Text className="mb-4 text-base leading-6 text-foreground">
              But I must explain to you how all this mistaken idea of denouncing
              pleasure and praising pain was born and I will give you a complete
              account of the system, and expound the actual teachings of the
              great explorer of the truth, the master-builder of human
              happiness.
            </Text>

            <Text className="mb-3 text-lg font-medium text-foreground">
              The Standard Lorem Ipsum
            </Text>
            <Text className="mb-4 text-base leading-6 text-foreground">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </Text>

            <Text className="mb-3 text-xl font-semibold text-foreground">
              Final Section
            </Text>
            <Text className="text-base leading-6 text-foreground">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt explicabo.
            </Text>
          </ScrollView>
        </ScrollShadow>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const HORIZONTAL_ITEMS = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  title: `Card ${i + 1}`,
}));

const HorizontalSeparator = () => <View className="w-5" />;

const HorizontalContent = () => {
  return (
    <View className="flex-1 items-center justify-center">
      <View className="h-40 w-full">
        <ScrollShadow LinearGradientComponent={LinearGradient}>
          <FlashList
            horizontal
            data={HORIZONTAL_ITEMS}
            renderItem={({ item: _item }) => (
              <Surface variant="quaternary" className="size-32" />
            )}
            ItemSeparatorComponent={HorizontalSeparator}
            contentContainerStyle={styles.horizontalContent}
            showsHorizontalScrollIndicator={false}
          />
        </ScrollShadow>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const SCROLL_SHADOW_VARIANTS: UsageVariant[] = [
  {
    value: 'vertical',
    label: 'Vertical',
    content: <VerticalContent />,
  },
  {
    value: 'horizontal',
    label: 'Horizontal',
    content: <HorizontalContent />,
  },
];

const styles = StyleSheet.create({
  horizontalContent: {
    padding: 20,
  },
});

export default function ScrollShadowScreen() {
  return (
    <UsageVariantFlatList data={SCROLL_SHADOW_VARIANTS} scrollEnabled={false} />
  );
}
