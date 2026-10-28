import { useLingui } from '@lingui/react/macro';
import { BottomSheet, Button, type BottomSheetRef } from 'heroui-native';
import { useRef } from 'react';
import { View } from 'react-native';

const SHEET_COUNT = 5;

/**
 * Smaller detents toward the top of the stack, so dismissing a sheet reveals
 * a taller one underneath. The first sheet sizes to its content.
 */
const DETENTS: Array<Array<number> | undefined> = [
  undefined,
  [0.78],
  [0.66],
  [0.54],
  [0.42],
];

/**
 * Five sheets presented on top of each other. Each one stays presented while
 * the next opens over it, and dismissing the top sheet reveals the one below.
 * Dismissing the first sheet dismisses the whole stack.
 */
export const StackedBottomSheetContent = () => {
  const { t } = useLingui();
  const sheetRefs = useRef<Array<BottomSheetRef | null>>([]);

  const titles = [
    t`First sheet`,
    t`Second sheet`,
    t`Third sheet`,
    t`Fourth sheet`,
    t`Fifth sheet`,
  ];

  return (
    <View className="flex-1">
      <View className="flex-1 items-center justify-center">
        <Button
          variant="secondary"
          onPress={() => sheetRefs.current[0]?.present()}
        >
          {t`Stacked bottom sheets`}
        </Button>
        {titles.map((title, index) => {
          const isFirst = index === 0;
          const isLast = index === titles.length - 1;

          return (
            <BottomSheet
              key={index}
              ref={(instance) => {
                sheetRefs.current[index] = instance;
              }}
              detents={DETENTS[index]}
            >
              <View className="mb-8 gap-2">
                <BottomSheet.Title>{title}</BottomSheet.Title>
                <BottomSheet.Description>
                  {isFirst
                    ? t`This sheet stays presented while another opens on top of it.`
                    : t`Sheet ${index + 1} of ${SHEET_COUNT}. Closing this one brings the sheet underneath back.`}
                </BottomSheet.Description>
              </View>
              <View className="gap-3">
                {isLast ? null : (
                  <Button
                    onPress={() => sheetRefs.current[index + 1]?.present()}
                  >
                    {t`Open the next sheet`}
                  </Button>
                )}
                <Button
                  variant="tertiary"
                  onPress={() =>
                    isFirst
                      ? sheetRefs.current[0]?.dismiss()
                      : sheetRefs.current[index]?.dismiss()
                  }
                >
                  {isFirst ? t`Close all` : t`Back`}
                </Button>
              </View>
            </BottomSheet>
          );
        })}
      </View>
    </View>
  );
};
