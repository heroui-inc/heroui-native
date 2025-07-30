/* eslint-disable react-native/no-inline-styles */
import { Button, Card, useTheme } from 'heroui-native';
import { ExternalLink, ShoppingBasket } from 'lucide-react-native';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';

export default function CardScreen() {
  const { colors } = useTheme();

  return (
    <ScrollView
      className="bg-background"
      contentContainerClassName="items-center justify-center p-4"
      contentInsetAdjustmentBehavior="automatic"
    >
      <Text className="text-lg font-bold text-muted-foreground mb-4">
        Basic Card
      </Text>

      <View className="w-full gap-4 mb-6">
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
                This sofa is perfect for modern tropical spaces, baroque
                inspired spaces.
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
      </View>

      <Text className="text-lg font-bold text-muted-foreground mb-4">
        Card with Image
      </Text>

      <View className="w-full gap-4 mb-6">
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
                This sofa is perfect for modern tropical spaces, baroque
                inspired spaces.
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
      </View>

      <Text className="text-lg font-bold text-muted-foreground mb-4">
        Horizontal Card
      </Text>

      <View className="w-full gap-4 mb-6">
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
      </View>

      <Text className="text-lg font-bold text-muted-foreground mb-4">
        Surface Variants
      </Text>

      <View className="w-full gap-4 mb-6">
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

      <Text className="text-lg font-bold text-muted-foreground mb-4">
        Card with Header
      </Text>

      <View className="w-full gap-4 mb-6">
        <Card>
          <Card.Details>
            <Card.Header>
              <View className="bg-accent rounded-full w-12 h-12 items-center justify-center">
                <Text className="text-accent-foreground font-bold">$</Text>
              </View>
            </Card.Header>
            <Card.Body>
              <Card.Title>Premium Plan</Card.Title>
              <Card.Description>
                Get access to all premium features and priority support.
              </Card.Description>
              <Text className="text-2xl font-bold">$29.99/month</Text>
            </Card.Body>
            <Card.Footer>
              <Button variant="primary" className="w-full">
                Subscribe Now
              </Button>
            </Card.Footer>
          </Card.Details>
        </Card>
      </View>

      <Text className="text-lg font-bold text-muted-foreground mb-4">
        Simple Cards
      </Text>

      <View className="w-full gap-4 mb-6">
        <Card>
          <Card.Details>
            <Card.Body>
              <Text>Simple card with just text content</Text>
            </Card.Body>
          </Card.Details>
        </Card>

        <Card>
          <Card.Details>
            <Card.Title>Title Only</Card.Title>
          </Card.Details>
        </Card>

        <Card>
          <Card.Details>
            <Card.Description>
              A card with only a description and no title.
            </Card.Description>
          </Card.Details>
        </Card>
      </View>
    </ScrollView>
  );
}
