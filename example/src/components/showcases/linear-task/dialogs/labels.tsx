import Feather from '@expo/vector-icons/Feather';
import * as Haptics from 'expo-haptics';
import { Checkbox, Chip, cn, ControlField, Dialog, Label } from 'heroui-native';
import { useMemo, useState, type FC } from 'react';
import { Platform, useWindowDimensions, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import Animated, { FadeIn } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { withUniwind } from 'uniwind';
import { useAppTheme } from '../../../../contexts/app-theme-context';
import { AppText } from '../../../app-text';
import { DialogBlurBackdrop } from '../../../dialog-blur-backdrop';
import { DialogHeader } from '../dialog-header';
import { SearchBar } from '../search-bar';

const StyledFeather = withUniwind(Feather);
const StyledScrollView = withUniwind(ScrollView);

type LabelItem = {
  value: string;
  label: string;
  indicator: React.ReactNode;
};

export const Labels: FC = () => {
  const [selectedValues, setSelectedValues] = useState<Set<string>>(
    new Set(['feature'])
  );
  const [searchQuery, setSearchQuery] = useState('');

  const { height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const { isDark } = useAppTheme();

  const insetTop = insets.top + 12;
  const dialogContentHeight = (height - insetTop) / 2;

  const items: LabelItem[] = useMemo(
    () => [
      {
        value: 'feature',
        label: 'Feature',
        indicator: <View className="size-2.5 rounded-full bg-purple-400" />,
      },
      {
        value: 'bug',
        label: 'Bug',
        indicator: <View className="size-2.5 rounded-full bg-red-400" />,
      },
      {
        value: 'chore',
        label: 'Chore',
        indicator: <View className="size-2.5 rounded-full bg-orange-200" />,
      },
      {
        value: 'improvement',
        label: 'Improvement',
        indicator: <View className="size-2.5 rounded-full bg-blue-400" />,
      },
      {
        value: 'refactor',
        label: 'Refactor',
        indicator: <View className="size-2.5 rounded-full bg-cyan-400" />,
      },
    ],
    []
  );

  const filteredItems = useMemo(() => {
    if (!searchQuery) return items;
    return items.filter((item) =>
      item.label.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, items]);

  const selectedItems = useMemo(() => {
    return items.filter((item) => selectedValues.has(item.value));
  }, [items, selectedValues]);

  const handleSelectionChange = (value: string, isSelected: boolean) => {
    setSelectedValues((prev) => {
      const newSet = new Set(prev);
      if (isSelected) {
        newSet.add(value);
      } else {
        newSet.delete(value);
      }
      return newSet;
    });

    if (Platform.OS === 'ios') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  const renderStackedIndicators = () => {
    if (selectedItems.length === 0) return null;

    const maxVisible = 3;
    const visibleItems = selectedItems.slice(0, maxVisible);

    return (
      <View className="flex-row items-center">
        {visibleItems.map((item, index) => {
          const marginLeft = index === 0 ? 0 : -6;
          const zIndex = maxVisible + index;
          return (
            <View
              key={item.value}
              className="rounded-full border border-surface-tertiary"
              style={{ marginLeft, zIndex }}
            >
              {item.indicator}
            </View>
          );
        })}
      </View>
    );
  };

  const getChipLabel = () => {
    if (selectedItems.length === 0) {
      return 'No labels';
    } else if (selectedItems.length === 1) {
      return selectedItems[0]?.label ?? 'No labels';
    } else {
      return `${selectedItems.length} labels`;
    }
  };

  return (
    <Dialog>
      <Dialog.Trigger asChild>
        <Chip
          className={cn(
            'h-7 px-2',
            isDark ? 'bg-neutral-900/50' : 'bg-neutral-300/50'
          )}
          onPress={() => {
            if (Platform.OS === 'ios') {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }
          }}
        >
          {renderStackedIndicators()}
          <Chip.Label className="text-foreground font-medium">
            {getChipLabel()}
          </Chip.Label>
        </Chip>
      </Dialog.Trigger>
      <Dialog.Portal>
        <DialogBlurBackdrop />
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={24}>
          <Dialog.Content
            style={{ marginTop: insetTop, height: dialogContentHeight }}
          >
            <DialogHeader>Labels</DialogHeader>
            <SearchBar
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Add labels..."
            />
            {filteredItems.length === 0 && (
              <View className="flex-1 items-center justify-center">
                <AppText className="text-base font-medium text-muted">
                  No results
                </AppText>
              </View>
            )}
            {filteredItems.length > 0 && (
              <StyledScrollView
                contentContainerClassName="pt-3"
                showsVerticalScrollIndicator={false}
                bounces={false}
                keyboardShouldPersistTaps="handled"
              >
                <View className="gap-7">
                  {filteredItems.map((item) => {
                    const isSelected = selectedValues.has(item.value);
                    return (
                      <ControlField
                        key={item.value}
                        isSelected={isSelected}
                        onSelectedChange={(selected) =>
                          handleSelectionChange(item.value, selected)
                        }
                      >
                        <View className="flex-row items-center gap-2 flex-1">
                          <View className="w-5 pl-0.5 justify-center">
                            <View className="scale-105">{item.indicator}</View>
                          </View>
                          <Label>{item.label}</Label>
                        </View>
                        <ControlField.Indicator>
                          <Checkbox
                            isSelected={isSelected}
                            className="bg-transparent border-none shadow-none"
                          >
                            <Checkbox.Indicator className="bg-transparent">
                              {isSelected && (
                                <Animated.View
                                  key={`${item.value}-check`}
                                  entering={FadeIn.duration(200)}
                                >
                                  <StyledFeather
                                    name="check"
                                    size={18}
                                    className="text-foreground"
                                  />
                                </Animated.View>
                              )}
                            </Checkbox.Indicator>
                          </Checkbox>
                        </ControlField.Indicator>
                      </ControlField>
                    );
                  })}
                </View>
              </StyledScrollView>
            )}
          </Dialog.Content>
        </KeyboardAvoidingView>
      </Dialog.Portal>
    </Dialog>
  );
};
