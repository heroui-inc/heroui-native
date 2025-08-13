import { Chip } from 'heroui-native';
import { Star, X } from 'lucide-react-native';
import { ScrollView, View } from 'react-native';

export default function Theme() {
  return (
    <ScrollView
      className="flex-1 px-4 py-6 bg-background"
      contentContainerClassName="pb-20"
      contentInsetAdjustmentBehavior="automatic"
    >
      <View className="flex-row gap-4">
        <Chip variant="secondary" color="success">
          <Chip.StartContent>
            <View className="w-1.5 h-1.5 mr-1.5 rounded-full bg-success" />
          </Chip.StartContent>
          <Chip.Label>Completed</Chip.Label>
        </Chip>

        <Chip variant="primary" color="warning">
          <Chip.StartContent className="pr-1">
            <Star size={12} color="#F59E0B" fill="#F59E0B" />
          </Chip.StartContent>
          <Chip.Label>Premium</Chip.Label>
        </Chip>

        <Chip variant="tertiary" color="danger">
          <Chip.Label>Remove</Chip.Label>
          <Chip.EndContent>
            <X size={16} color="#EF4444" />
          </Chip.EndContent>
        </Chip>
      </View>
    </ScrollView>
  );
}
