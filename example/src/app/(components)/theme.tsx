import { Button, Card } from 'heroui-native';
import { ShoppingBasket } from 'lucide-react-native';
import { ScrollView, View } from 'react-native';

export default function Theme() {
  return (
    <ScrollView
      className="flex-1 px-4 py-6 bg-background"
      contentContainerClassName="pb-20"
      contentInsetAdjustmentBehavior="automatic"
    >
      <Card>
        <Card.Details>
          <Card.Body className="mb-4">
            <View className="gap-1 mb-2">
              <Card.Title className="text-pink-500">$450</Card.Title>
              <Card.Title>Living room Sofa • Collection 2025</Card.Title>
            </View>
            <Card.Description>
              This sofa is perfect for modern tropical spaces, baroque inspired
              spaces.
            </Card.Description>
          </Card.Body>
          <Card.Footer className="gap-3">
            <Button variant="primary">Buy now</Button>
            <Button variant="ghost">
              <Button.Label>Add to cart</Button.Label>
              <Button.EndContent>
                <ShoppingBasket size={16} />
              </Button.EndContent>
            </Button>
          </Card.Footer>
        </Card.Details>
      </Card>
    </ScrollView>
  );
}
