import { useLingui } from '@lingui/react/macro';
import { useTrueSheetNavigation } from '@lodev09/react-native-true-sheet/navigation/expo-router';
import { Button, Slider } from 'heroui-native';
import { StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AppText } from '../../../../components/app-text';

/**
 * Route presented as a sheet with two detents.
 * `useTrueSheetNavigation` adds `resize` to the navigation object.
 *
 * A navigator sheet is presented outside the app's root view, so on Android
 * gesture-handler components such as `Slider` need their own
 * `GestureHandlerRootView` inside it (`BottomSheet` adds one itself).
 */
export default function FiltersSheet() {
  const { t } = useLingui();
  const navigation = useTrueSheetNavigation();

  return (
    <GestureHandlerRootView style={styles.gestureRoot}>
      <View className="gap-6 p-5 pt-8">
        <View className="gap-2">
          <AppText className="text-lg font-medium text-foreground">
            {t`Filters`}
          </AppText>
          <AppText className="text-base text-muted">
            {t`A sheet route with two detents. The slider checks gestures inside a sheet screen.`}
          </AppText>
        </View>
        <Slider defaultValue={40}>
          <Slider.Track>
            <Slider.Fill />
            <Slider.Thumb />
          </Slider.Track>
        </Slider>
        <View className="gap-3">
          <Button variant="secondary" onPress={() => navigation.resize(1)}>
            {t`Expand`}
          </Button>
          <Button variant="tertiary" onPress={() => navigation.goBack()}>
            {t`Close`}
          </Button>
        </View>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  /** `flexGrow`, not GH's default `flex: 1`, so the sheet still sizes to the content */
  gestureRoot: {
    flexGrow: 1,
  },
});
