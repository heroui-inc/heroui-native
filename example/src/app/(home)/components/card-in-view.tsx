import { Ionicons } from '@expo/vector-icons';
import { Button, Card, useTheme } from 'heroui-native';
import { View } from 'react-native';
import { AppText } from '../../../components/app-text';
import { SafeAreaView } from '../../../components/safe-area-view';

export default function CardInViewScreen() {
  const { colors } = useTheme();

  return (
    <SafeAreaView className="flex-1 p-4">
      <Card>
        <Card.Details>
          <Card.Body className="mb-4">
            <View className="gap-1 mb-2">
              <Card.Title className="text-pink-400">$450</Card.Title>
              <Card.Title>
                Living room Sofa <AppText className="text-sm">✦</AppText>{' '}
                Collection 2025
              </Card.Title>
            </View>
            <Card.Description>
              This sofa is perfect for modern tropical spaces, baroque inspired
              spaces.
            </Card.Description>
          </Card.Body>
          <Card.Footer className="gap-3">
            <Button variant="primary">Buy now</Button>
            <Button variant="ghost">
              <Button.LabelContent>Add to cart</Button.LabelContent>
              <Button.EndContent>
                <Ionicons
                  name="basket-outline"
                  size={16}
                  color={colors.mutedForeground}
                />
              </Button.EndContent>
            </Button>
          </Card.Footer>
        </Card.Details>
      </Card>
    </SafeAreaView>
  );
}
