import { Ionicons } from '@expo/vector-icons';
import { Spinner, useTheme } from 'heroui-native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScreenScrollView } from '../../components/screen-scroll-view';
import { SectionTitle } from '../../components/section-title';
import { cn } from '../../helpers/utils/cn';

export default function SpinnerScreen() {
  const [isLoading, setIsLoading] = React.useState(true);
  const { theme, colors } = useTheme();

  const isDark = theme === 'dark';

  return (
    <ScreenScrollView contentContainerClassName="gap-16">
      <SectionTitle title="Sizes" />
      <View className="flex-row gap-4 self-center">
        <Spinner size="sm" color="default" />
        <Spinner size="md" color="default" />
        <Spinner size="lg" color="default" />
      </View>

      <SectionTitle title="Colors" />
      <View className="flex-row gap-4 self-center">
        <Spinner size="md" color="default" />
        <Spinner size="md" color="success" />
        <Spinner size="md" color="warning" />
        <Spinner size="md" color="danger" />
      </View>

      <SectionTitle title="Custom Colors" />
      <View className="flex-row gap-4 self-center">
        <Spinner size="md" color="#8B5CF6" />
        <Spinner size="md" color="#EC4899" />
        <Spinner size="md" color="#10B981" />
      </View>

      <SectionTitle title="Animation Speed" />
      <View className="flex-row gap-4 self-center">
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

      <SectionTitle title="Loading State Control" />
      <View className="items-center">
        <Spinner size="lg" color="success" isLoading={isLoading} />
        <TouchableOpacity onPress={() => setIsLoading(!isLoading)}>
          <Text className="text-primary mt-4 text-sm">
            {isLoading ? 'Tap to stop' : 'Tap to start'}
          </Text>
        </TouchableOpacity>
      </View>

      <SectionTitle title="With Custom Content" />
      <View className="flex-row gap-4 self-center">
        <Spinner size="md" color="default">
          <Spinner.Indicator speed={0.7}>
            <Ionicons name="reload" size={24} color={colors.foreground} />
          </Spinner.Indicator>
        </Spinner>
        <Spinner size="lg" color="default">
          <Spinner.Indicator speed={0.7}>
            <Text className="text-xl">⏳</Text>
          </Spinner.Indicator>
        </Spinner>
      </View>

      <SectionTitle title="Different Use Cases" />
      <View className="gap-8">
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
    </ScreenScrollView>
  );
}

const styles = StyleSheet.create({
  borderCurve: {
    borderCurve: 'continuous',
  },
});
