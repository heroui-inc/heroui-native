import { Spinner, useTheme } from 'heroui-native';
import { Loader } from 'lucide-react-native';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { cn } from '../../helpers/utils/cn';

export default function SpinnerScreen() {
  const [isLoading, setIsLoading] = React.useState(true);
  const { theme, colors } = useTheme();

  const isDark = theme === 'dark';

  return (
    <ScrollView
      className="bg-background"
      contentContainerClassName="items-center justify-center p-4"
      contentInsetAdjustmentBehavior="automatic"
    >
      <Text className="text-lg font-bold text-muted-foreground mb-4">
        Sizes
      </Text>

      <View className="flex-row gap-4 mb-6">
        <Spinner size="sm" color="default" />
        <Spinner size="md" color="default" />
        <Spinner size="lg" color="default" />
      </View>

      <Text className="text-lg font-bold text-muted-foreground mb-4">
        Colors
      </Text>

      <View className="flex-row gap-4 mb-6">
        <Spinner size="md" color="default" />
        <Spinner size="md" color="success" />
        <Spinner size="md" color="warning" />
        <Spinner size="md" color="danger" />
      </View>

      <Text className="text-lg font-bold text-muted-foreground mb-4">
        Custom Colors
      </Text>

      <View className="flex-row gap-4 mb-6">
        <Spinner size="md" color="#8B5CF6" />
        <Spinner size="md" color="#EC4899" />
        <Spinner size="md" color="#10B981" />
      </View>

      <Text className="text-lg font-bold text-muted-foreground mb-4">
        Animation Speed
      </Text>

      <View className="flex-row gap-4 mb-6">
        <View className="items-center">
          <Spinner size="md" color="default">
            <Spinner.Indicator speed={0.5} />
          </Spinner>
          <Text className="text-xs text-muted-foreground mt-2">0.5x</Text>
        </View>
        <View className="items-center">
          <Spinner size="md" color="default">
            <Spinner.Indicator speed={1} />
          </Spinner>
          <Text className="text-xs text-muted-foreground mt-2">1x</Text>
        </View>
        <View className="items-center">
          <Spinner size="md" color="default">
            <Spinner.Indicator speed={2} />
          </Spinner>
          <Text className="text-xs text-muted-foreground mt-2">2x</Text>
        </View>
      </View>

      <Text className="text-lg font-bold text-muted-foreground mb-4">
        Loading State Control
      </Text>

      <View className="items-center mb-6">
        <Spinner size="lg" color="success" isLoading={isLoading} />
        <TouchableOpacity onPress={() => setIsLoading(!isLoading)}>
          <Text className="text-primary mt-4 text-sm">
            {isLoading ? 'Tap to stop' : 'Tap to start'}
          </Text>
        </TouchableOpacity>
      </View>

      <Text className="text-lg font-bold text-muted-foreground mb-4">
        With Custom Content
      </Text>

      <View className="flex-row gap-4 mb-6">
        <Spinner size="md" color="default">
          <Spinner.Indicator speed={0.7}>
            <Loader size={24} color={colors.foreground} />
          </Spinner.Indicator>
        </Spinner>
        <Spinner size="lg" color="default">
          <Spinner.Indicator speed={0.7}>
            <Text className="text-xl">⏳</Text>
          </Spinner.Indicator>
        </Spinner>
      </View>

      <Text className="text-lg font-bold text-muted-foreground mb-4">
        Different Use Cases
      </Text>

      <View className="gap-4 mb-6">
        <View
          className={cn(
            'flex-row items-center gap-2 p-4 rounded-lg',
            isDark ? 'bg-stone-800' : 'bg-stone-200'
          )}
          style={styles.borderCurve}
        >
          <Spinner size="sm" color="default" />
          <Text className="text-stone-500">Loading content...</Text>
        </View>

        <View
          className={cn(
            'items-center p-8 rounded-2xl',
            isDark ? 'bg-stone-800' : 'bg-stone-200'
          )}
          style={styles.borderCurve}
        >
          <Spinner size="lg" color="success" />
          <Text className="text-stone-500 mt-4">Processing...</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  borderCurve: {
    borderCurve: 'continuous',
  },
});
