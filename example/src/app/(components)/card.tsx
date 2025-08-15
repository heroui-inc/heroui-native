/* eslint-disable react-native/no-inline-styles */
import { Button, Card, useTheme } from 'heroui-native';
import {
  Check,
  ExternalLink,
  ShoppingBasket,
  Users,
} from 'lucide-react-native';
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { ScreenScrollView } from '../../components/screen-scroll-view';
import { SectionTitle } from '../../components/section-title';

export default function CardScreen() {
  const { colors } = useTheme();

  const { width } = useWindowDimensions();

  return (
    <ScreenScrollView contentContainerClassName="gap-10">
      <SectionTitle title="Basic Card" className="-mx-5" />
      <Card>
        <Card.Details>
          <Card.Body className="mb-4">
            <View className="gap-1 mb-2">
              <Card.Title className="text-pink-400">$450</Card.Title>
              <Card.Title>
                Living room Sofa <Text className="text-sm">✦</Text> Collection
                2025
              </Card.Title>
            </View>
            <Card.Description>
              This sofa is perfect for modern tropical spaces, baroque inspired
              spaces.
            </Card.Description>
          </Card.Body>
          <Card.Footer className="gap-3">
            <Button variant="primary">
              <Button.Label>Buy now</Button.Label>
            </Button>
            <Button variant="ghost">
              <Button.Label>Add to cart</Button.Label>
              <Button.EndContent>
                <ShoppingBasket size={16} color={colors.mutedForeground} />
              </Button.EndContent>
            </Button>
          </Card.Footer>
        </Card.Details>
      </Card>
      <Card>
        <Card.Details>
          <Card.Header>
            <View className="bg-accent rounded-full w-12 h-12 items-center justify-center">
              <Text className="text-accent-foreground font-bold text-xl">
                $
              </Text>
            </View>
          </Card.Header>
          <Card.Body>
            <Card.Title>Premium Plan</Card.Title>
            <Card.Description className="mb-4">
              Get access to all premium features and priority support.
            </Card.Description>
            <Text className="text-2xl font-bold text-foreground">
              $29.99/month
            </Text>
          </Card.Body>
          <Card.Footer>
            <Button>
              <Button.Label>Subscribe Now</Button.Label>
            </Button>
          </Card.Footer>
        </Card.Details>
      </Card>
      <SectionTitle title="Card with Image" className="-mx-5" />
      <Card className="p-0">
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
          }}
          style={{ height: 200 }}
          resizeMode="cover"
        />
        <Card.Details className="p-4">
          <Card.Body className="mb-2 pb-4">
            <View className="gap-1 mb-2">
              <Card.Title className="text-pink-400">$450</Card.Title>
              <Card.Title>
                Living room Sofa <Text className="text-sm">✦</Text> Collection
                2025
              </Card.Title>
            </View>
            <Card.Description>
              This sofa is perfect for modern tropical spaces, baroque inspired
              spaces.
            </Card.Description>
          </Card.Body>
          <Card.Footer className="gap-3">
            <Button variant="primary">
              <Button.Label>Buy now</Button.Label>
            </Button>
            <Button variant="ghost">
              <Button.Label>Add to cart</Button.Label>
              <Button.EndContent>
                <ShoppingBasket size={16} color={colors.mutedForeground} />
              </Button.EndContent>
            </Button>
          </Card.Footer>
        </Card.Details>
      </Card>
      <SectionTitle title="Horizontal Card With Image" className="-mx-5" />
      <Card className="flex-row gap-3 p-1.5" surfaceVariant="2">
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60',
          }}
          style={{
            height: 110,
            aspectRatio: 1,
            borderRadius: 8,
          }}
          resizeMode="cover"
        />
        <Card.Details>
          <Card.Body className="mb-2">
            <Card.Title className="mb-1">The perfect latte</Card.Title>
            <Card.Description numberOfLines={2}>
              Caffè latte is a coffee beverage of Italian origin made with
              espresso and steamed milk.
            </Card.Description>
          </Card.Body>
          <Card.Footer>
            <Pressable className="flex-row items-center gap-1">
              <Text className="text-sm font-medium text-foreground">
                View Details
              </Text>
              <ExternalLink size={12} color={colors.foreground} />
            </Pressable>
          </Card.Footer>
        </Card.Details>
      </Card>
      <SectionTitle title="Profile Onboarding Cards" className="-mx-5" />
      <ScrollView
        horizontal
        className="-mx-5"
        contentContainerClassName="gap-2 px-5"
        showsHorizontalScrollIndicator={false}
      >
        <Card
          surfaceVariant="2"
          style={{ width: width / 1.6 }}
          className="border-0"
        >
          <Card.Details>
            <Card.Body className="items-center mb-2">
              <View className="w-16 h-16 mb-3 rounded-full items-center justify-center bg-background border border-border">
                <Users size={20} color={colors.foreground} />
              </View>
              <Card.Title className="text-center">
                Follow 10 profiles
              </Card.Title>
              <Card.Description className="text-center">
                Fill your feed with threads that interest you.
              </Card.Description>
            </Card.Body>
            <Card.Footer>
              <Button size="sm">
                <Button.Label>See profiles</Button.Label>
              </Button>
            </Card.Footer>
          </Card.Details>
        </Card>

        <Card
          surfaceVariant="2"
          style={{ width: width / 1.5 }}
          className="border-0"
        >
          <Card.Details>
            <Card.Body className="items-center mb-2">
              <View className="w-16 h-16 mb-3 rounded-full items-center justify-center bg-background border border-border">
                <Check size={28} color={colors.foreground} />
              </View>
              <Card.Title className="text-center">Create thread</Card.Title>
              <Card.Description className="text-center">
                Say what's on your mind or share a recent highlight.
              </Card.Description>
            </Card.Body>
            <Card.Footer>
              <Button
                size="sm"
                variant="ghost"
                className="border border-muted-foreground/50"
              >
                <Button.Label>Done</Button.Label>
              </Button>
            </Card.Footer>
          </Card.Details>
        </Card>

        <Card
          surfaceVariant="2"
          style={{ width: width / 1.5 }}
          className="border-0"
        >
          <Card.Details>
            <Card.Body className="items-center mb-2">
              <View className="w-16 h-16 mb-3 rounded-full items-center justify-center bg-background border border-border">
                <Check size={28} color={colors.foreground} />
              </View>
              <Card.Title className="text-center">Add profile photo</Card.Title>
              <Card.Description className="text-center">
                Make it easier for people to recognize you.
              </Card.Description>
            </Card.Body>
            <Card.Footer>
              <Button
                size="sm"
                variant="ghost"
                className="border border-muted-foreground/50"
              >
                <Button.Label>Done</Button.Label>
              </Button>
            </Card.Footer>
          </Card.Details>
        </Card>
      </ScrollView>

      <SectionTitle title="Surface Variants" className="-mx-5" />

      <View className="gap-5">
        <Card surfaceVariant="none">
          <Card.Details>
            <Card.Body>
              <Card.Title>Transparent Card</Card.Title>
              <Card.Description>
                This card uses surfaceVariant="none" for a transparent
                background.
              </Card.Description>
            </Card.Body>
          </Card.Details>
        </Card>

        <Card surfaceVariant="1">
          <Card.Details>
            <Card.Body>
              <Card.Title>Surface 1 Card</Card.Title>
              <Card.Description>
                This is the default card appearance with surfaceVariant="1".
              </Card.Description>
            </Card.Body>
          </Card.Details>
        </Card>

        <Card surfaceVariant="2">
          <Card.Details>
            <Card.Body>
              <Card.Title>Surface 2 Card</Card.Title>
              <Card.Description>
                This card uses surfaceVariant="2" for a different surface color.
              </Card.Description>
            </Card.Body>
          </Card.Details>
        </Card>

        <Card surfaceVariant="3">
          <Card.Details>
            <Card.Body>
              <Card.Title>Surface 3 Card</Card.Title>
              <Card.Description>
                This card uses surfaceVariant="3" for the deepest surface color.
              </Card.Description>
            </Card.Body>
          </Card.Details>
        </Card>
      </View>
    </ScreenScrollView>
  );
}
