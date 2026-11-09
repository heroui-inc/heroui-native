import { useLingui } from '@lingui/react/macro';
import { useRouter } from 'expo-router';
import { Button } from 'heroui-native';
import { View } from 'react-native';
import { AppText } from '../../../../components/app-text';

/**
 * Base screen of the sheet navigator. Pushing a sibling route presents it as
 * a sheet; going back dismisses it.
 */
export default function SheetNavigatorScreen() {
  const { t } = useLingui();
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center gap-4 px-5 bg-background">
      <AppText className="text-center text-muted">
        {t`Each button pushes a route that the TrueSheet navigator presents as a sheet.`}
      </AppText>
      <Button
        variant="secondary"
        onPress={() => router.push('/components/sheet-navigator/details')}
      >
        {t`Open details sheet`}
      </Button>
      <Button
        variant="secondary"
        onPress={() => router.push('/components/sheet-navigator/filters')}
      >
        {t`Open filters sheet`}
      </Button>
    </View>
  );
}
