import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Button,
  Divider,
  ScrollShadow,
  Select,
  useThemeColor,
  type MultiSelectOption,
} from 'heroui-native';
import React, { useState, type FC } from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { AppText } from '../app-text';

const CATEGORIES = [
  { value: 'tech', label: 'Technology' },
  { value: 'sports', label: 'Sports' },
  { value: 'music', label: 'Music' },
  { value: 'movies', label: 'Movies' },
  { value: 'travel', label: 'Travel' },
  { value: 'food', label: 'Food' },
];

export const SelectMultiple: FC = () => {
  const [popoverValue, setPopoverValue] = useState<MultiSelectOption>([]);
  const [dialogValue, setDialogValue] = useState<MultiSelectOption>([]);
  const [sheetValue, setSheetValue] = useState<MultiSelectOption>([]);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const themeColorOverlay = useThemeColor('overlay');

  return (
    <View className="flex-row items-center justify-center gap-4">
      {/* Popover Multi-Select */}
      <Select
        multi
        value={popoverValue}
        onValueChange={(newValue) =>
          setPopoverValue(newValue as MultiSelectOption)
        }
      >
        <Select.Trigger asChild>
          <Button variant="secondary">
            <Select.Value
              placeholder="Popover"
              renderMultiple={(selected) =>
                selected.length > 0 ? `${selected.length} items` : 'Popover'
              }
            />
          </Button>
        </Select.Trigger>
        <Select.Portal>
          <Select.Overlay />
          <Select.Content width={220} presentation="popover">
            <ScrollView>
              {CATEGORIES.map((category) => (
                <Select.Item
                  key={category.value}
                  value={category.value}
                  label={category.label}
                />
              ))}
            </ScrollView>
            <Select.Close className="mt-2 py-2">
              <AppText className="text-accent text-center font-medium">
                Done
              </AppText>
            </Select.Close>
          </Select.Content>
        </Select.Portal>
      </Select>

      {/* Dialog Multi-Select */}
      <Select
        multi
        value={dialogValue}
        onValueChange={(newValue) =>
          setDialogValue(newValue as MultiSelectOption)
        }
      >
        <Select.Trigger asChild>
          <Button variant="secondary">
            <Select.Value
              placeholder="Dialog"
              renderMultiple={(selected) =>
                selected.length > 0 ? `${selected.length} items` : 'Dialog'
              }
            />
          </Button>
        </Select.Trigger>
        <Select.Portal>
          <Select.Overlay className="bg-black/15" />
          <Select.Content presentation="dialog">
            <AppText className="text-lg font-semibold text-foreground mb-3">
              Select Categories
            </AppText>
            {CATEGORIES.map((category) => (
              <Select.Item
                key={category.value}
                value={category.value}
                label={category.label}
              />
            ))}
            <Select.Close className="mt-3 py-2 bg-accent rounded-xl">
              <AppText className="text-white text-center font-medium">
                Done
              </AppText>
            </Select.Close>
          </Select.Content>
        </Select.Portal>
      </Select>

      {/* Bottom Sheet Multi-Select */}
      <Select
        multi
        isOpen={isSheetOpen}
        onOpenChange={setIsSheetOpen}
        value={sheetValue}
        onValueChange={(newValue) =>
          setSheetValue(newValue as MultiSelectOption)
        }
      >
        <Select.Trigger asChild>
          <Button variant="secondary" isDisabled={isSheetOpen}>
            <Select.Value
              placeholder="Sheet"
              renderMultiple={(selected) =>
                selected.length > 0 ? `${selected.length} items` : 'Sheet'
              }
            />
          </Button>
        </Select.Trigger>
        <Select.Portal>
          <Select.Overlay className="bg-black/15" />
          <Select.Content
            presentation="bottom-sheet"
            snapPoints={['50%']}
            detached
            enableDynamicSizing={false}
            enableOverDrag={false}
            backgroundClassName="bg-transparent"
            handleClassName="h-1"
            handleIndicatorClassName="w-12 h-[3px]"
            contentContainerClassName="h-full pt-1 pb-1 mx-2.5 rounded-t-[36px] border border-divider/20 bg-overlay overflow-hidden"
            contentContainerProps={{
              style: {
                borderCurve: 'continuous',
              },
            }}
          >
            <ScrollShadow
              LinearGradientComponent={LinearGradient}
              color={themeColorOverlay}
            >
              <BottomSheetScrollView
                contentContainerClassName="p-4"
                showsVerticalScrollIndicator={false}
              >
                {CATEGORIES.map((category, index) => (
                  <React.Fragment key={category.value}>
                    <Select.Item
                      value={category.value}
                      label={category.label}
                      className="py-5 px-3"
                    />
                    {index < CATEGORIES.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
                <Select.Close className="mt-4 py-3 bg-accent rounded-xl">
                  <AppText className="text-white text-center font-medium">
                    Done ({sheetValue.length} selected)
                  </AppText>
                </Select.Close>
              </BottomSheetScrollView>
            </ScrollShadow>
          </Select.Content>
        </Select.Portal>
      </Select>
    </View>
  );
};
