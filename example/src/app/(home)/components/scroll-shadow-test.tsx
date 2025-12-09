import { LinearGradient } from 'expo-linear-gradient';
import { ScrollShadow, TextField } from 'heroui-native';
import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

/**
 * Test screen for ScrollShadow component with controlled TextField.
 * Tests the scroll shadow behavior when TextField is inside a ScrollView.
 */
export default function ScrollShadowTestScreen() {
  const [textValue, setTextValue] = useState('');

  return (
    <View className="flex-1 bg-background px-4 py-6 pt-[100px]">
      <View className="flex-1">
        <ScrollShadow LinearGradientComponent={LinearGradient}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerClassName="px-4 py-6"
          >
            <View className="mb-6">
              <TextField>
                <TextField.Label>Controlled TextField</TextField.Label>
                <TextField.Input
                  placeholder="Type something here..."
                  value={textValue}
                  onChangeText={setTextValue}
                />
                <TextField.Description>
                  This is a controlled TextField inside a ScrollView wrapped
                  with ScrollShadow
                </TextField.Description>
              </TextField>
            </View>

            <Text className="mb-4 text-2xl font-semibold text-foreground">
              Lorem Ipsum Dolor Sit Amet
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
              Consectetur Adipiscing Elit
            </Text>
            <Text className="mb-4 text-base leading-6 text-foreground">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
              aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
              eos qui ratione voluptatem sequi nesciunt.
            </Text>

            <Text className="mb-3 text-xl font-semibold text-foreground">
              Sed Ut Perspiciatis
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

            <Text className="mb-3 text-xl font-semibold text-foreground">
              Itaque Earum Rerum
            </Text>
            <Text className="mb-4 text-base leading-6 text-foreground">
              Itaque earum rerum hic tenetur a sapiente delectus, ut aut
              reiciendis voluptatibus maiores alias consequatur aut perferendis
              doloribus asperiores repellat. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
              labore et dolore magna aliqua.
            </Text>

            <Text className="mb-3 text-xl font-semibold text-foreground">
              Ut Enim Ad Minima Veniam
            </Text>
            <Text className="mb-4 text-base leading-6 text-foreground">
              Ut enim ad minima veniam, quis nostrum exercitationem ullam
              corporis suscipit laboriosam, nisi ut aliquid ex ea commodi
              consequatur? Quis autem vel eum iure reprehenderit qui in ea
              voluptate velit esse quam nihil molestiae consequatur, vel illum
              qui dolorem eum fugiat quo voluptas nulla pariatur?
            </Text>

            <Text className="mb-3 text-xl font-semibold text-foreground">
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

            <Text className="mb-3 text-xl font-semibold text-foreground">
              Excepteur Sint Occaecat
            </Text>
            <Text className="mb-4 text-base leading-6 text-foreground">
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum. Et harum quidem rerum
              facilis est et expedita distinctio. Nam libero tempore, cum soluta
              nobis est eligendi optio cumque nihil impedit quo minus id quod
              maxime placeat facere possimus.
            </Text>

            <Text className="mb-3 text-xl font-semibold text-foreground">
              Final Section
            </Text>
            <Text className="text-base leading-6 text-foreground">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </Text>
          </ScrollView>
        </ScrollShadow>
      </View>
    </View>
  );
}
