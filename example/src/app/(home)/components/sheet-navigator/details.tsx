import { useLingui } from '@lingui/react/macro';
import { useRouter } from 'expo-router';
import { Button } from 'heroui-native';
import { View } from 'react-native';
import { AppText } from '../../../../components/app-text';

/**
 * Route presented as a sheet. It sizes to its content (`auto`) and can push
 * another sheet route on top of itself.
 */
export default function DetailsSheet() {
  const { t } = useLingui();
  const router = useRouter();

  return (
    <View className="gap-6 p-5 pt-8">
      <View className="gap-2">
        <AppText className="text-lg font-medium text-foreground">
          {t`Details`}
        </AppText>
        <AppText className="text-base text-muted">
          {t`This sheet is a route. Going back or dragging it down dismisses it and updates navigation.`}
        </AppText>
      </View>
      <View className="gap-3">
        <Button
          onPress={() => router.push('/components/sheet-navigator/filters')}
        >
          {t`Open filters on top`}
        </Button>
        <Button variant="tertiary" onPress={() => router.back()}>
          {t`Close`}
        </Button>
      </View>
    </View>
  );
}
