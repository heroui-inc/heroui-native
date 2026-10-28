import { useLingui } from '@lingui/react/macro';
import {
  useTrueSheet,
  type SheetDetent,
} from '@lodev09/react-native-true-sheet';
import { BottomSheet, Button } from 'heroui-native';
import { useState } from 'react';
import { View } from 'react-native';
import { AppText } from '../app-text';

const SHEET_NAME = 'controlled-by-name-example';

/** Fits the content first, then expands. */
// eslint-disable-next-line lingui/no-unlocalized-strings -- TrueSheet detent value, not copy.
const DETENTS: SheetDetent[] = ['auto', 0.75];

/**
 * Opens the sheet from a separate component by its `name` — no ref passed
 * around. `useTrueSheet()` also works on web.
 */
const OpenButton = () => {
  const { t } = useLingui();
  const { present } = useTrueSheet();

  return (
    <Button variant="secondary" onPress={() => present(SHEET_NAME)}>
      {t`Open sheet by name`}
    </Button>
  );
};

/**
 * Sheet controlled entirely by name: present, resize between detents, and
 * dismiss through the imperative TrueSheet API.
 */
export const ControlledByNameContent = () => {
  const { t } = useLingui();
  const { resize, dismiss } = useTrueSheet();
  const [detentIndex, setDetentIndex] = useState(0);

  return (
    <View className="flex-1">
      <View className="flex-1 items-center justify-center">
        <OpenButton />
        <BottomSheet
          name={SHEET_NAME}
          detents={DETENTS}
          onDetentChange={(event) => setDetentIndex(event.nativeEvent.index)}
          onDidPresent={(event) => setDetentIndex(event.nativeEvent.index)}
        >
          <View className="mb-6 gap-2">
            <BottomSheet.Title>{t`Controlled by name`}</BottomSheet.Title>
            <BottomSheet.Description>
              {t`These buttons call resize and dismiss with the sheet's name instead of a ref.`}
            </BottomSheet.Description>
            <AppText className="text-sm text-muted">
              {t`Current detent: ${detentIndex + 1} of 2`}
            </AppText>
          </View>
          <View className="gap-3">
            <Button
              onPress={() => resize(SHEET_NAME, detentIndex === 0 ? 1 : 0)}
            >
              {detentIndex === 0 ? t`Expand` : t`Collapse`}
            </Button>
            <Button variant="tertiary" onPress={() => dismiss(SHEET_NAME)}>
              {t`Close`}
            </Button>
          </View>
        </BottomSheet>
      </View>
    </View>
  );
};
