import { Ionicons } from '@expo/vector-icons';
import { cn, Spinner } from 'heroui-native';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { withUniwind } from 'uniwind';
import { AppText } from '../../../components/app-text';
import { ScreenScrollView } from '../../../components/screen-scroll-view';
import { SectionTitle } from '../../../components/section-title';
import { useAppTheme } from '../../../contexts/app-theme-context';

const StyledIonicons = withUniwind(Ionicons);

export default function SpinnerScreen() {
  const [isLoading, setIsLoading] = React.useState(true);

  const { isDark } = useAppTheme();

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
          <AppText className="text-xs text-muted mt-2">0.5x</AppText>
        </View>
        <View className="items-center">
          <Spinner size="md" color="default">
            <Spinner.Indicator speed={1} />
          </Spinner>
          <AppText className="text-xs text-muted mt-2">1x</AppText>
        </View>
        <View className="items-center">
          <Spinner size="md" color="default">
            <Spinner.Indicator speed={2} />
          </Spinner>
          <AppText className="text-xs text-muted mt-2">2x</AppText>
        </View>
      </View>

      <SectionTitle title="Loading State Control" />
      <View className="items-center">
        <Spinner size="lg" color="success" isLoading={isLoading} />
        <TouchableOpacity onPress={() => setIsLoading(!isLoading)}>
          <AppText className="text-primary mt-4 text-sm">
            {isLoading ? 'Tap to stop' : 'Tap to start'}
          </AppText>
        </TouchableOpacity>
      </View>

      <SectionTitle title="With Custom Content" />
      <View className="flex-row gap-4 self-center">
        <Spinner size="md" color="default">
          <Spinner.Indicator speed={0.7}>
            <StyledIonicons
              name="reload"
              size={24}
              className="text-foreground"
            />
          </Spinner.Indicator>
        </Spinner>
        <Spinner size="lg" color="default">
          <Spinner.Indicator speed={0.7}>
            <AppText className="text-xl">⏳</AppText>
          </Spinner.Indicator>
        </Spinner>
      </View>

      <SectionTitle title="Different Use Cases" />
      <View className="gap-8">
        <View
          className={cn(
            'flex-row items-center gap-2 p-4 rounded-lg bg-stone-200',
            isDark && 'bg-stone-800'
          )}
          style={styles.borderCurve}
        >
          <Spinner size="sm" color="default" />
          <AppText className="text-stone-500">Loading content...</AppText>
        </View>

        <View
          className={cn(
            'items-center p-8 rounded-2xl bg-stone-200',
            isDark && 'bg-stone-800'
          )}
          style={styles.borderCurve}
        >
          <Spinner size="lg" color="success" />
          <AppText className="text-stone-500 mt-4">Processing...</AppText>
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
