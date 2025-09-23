import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import * as Haptics from 'expo-haptics';
import { Chip, Dialog, Radio, RadioGroup, useTheme } from 'heroui-native';
import { useMemo, useState, type FC } from 'react';
import { Platform, useWindowDimensions, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import Animated, { FadeIn } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppText } from '../../../app-text';
import { DialogBlurBackdrop } from '../../../dialog-blur-backdrop';
import { DialogHeader } from '../dialog-header';
import { SearchBar } from '../search-bar';

type ProjectItem = {
  value: string;
  label: string;
  indicator: React.ReactNode;
};

export const Project: FC = () => {
  const [value, setValue] = useState('hero-ui-native');
  const [searchQuery, setSearchQuery] = useState('');

  const { colors } = useTheme();

  const { height } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const insetTop = insets.top + 12;
  const dialogContentHeight = (height - insetTop) / 2;

  const items: ProjectItem[] = useMemo(
    () => [
      {
        value: 'no-project',
        label: 'No Project',
        indicator: (
          <MaterialCommunityIcons
            name="cube-outline"
            size={14}
            color={colors.mutedForeground}
          />
        ),
      },
      {
        value: 'hero-ui-native',
        label: 'HeroUI Native',
        indicator: (
          <MaterialCommunityIcons
            name="arrow-right-drop-circle"
            size={14}
            color={colors.danger}
          />
        ),
      },
      {
        value: 'hero-ui-web',
        label: 'HeroUI Web',
        indicator: (
          <MaterialCommunityIcons name="web" size={14} color={colors.warning} />
        ),
      },
      {
        value: 'hero-ui-chat',
        label: 'HeroUI Chat',
        indicator: (
          <MaterialCommunityIcons
            name="adjust"
            size={14}
            color={colors.success}
          />
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const filteredItems = useMemo(() => {
    if (!searchQuery) return items;
    return items.filter((item) =>
      item.label.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, items]);

  return (
    <Dialog>
      <Dialog.Trigger>
        <Chip
          className="h-7 bg-surface-3 px-2"
          onPress={() => {
            if (Platform.OS === 'ios') {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }
          }}
        >
          <Chip.StartContent>
            {items.find((item) => item.value === value)?.indicator}
          </Chip.StartContent>
          <Chip.LabelContent
            classNames={{ text: 'text-foreground font-medium' }}
          >
            {items.find((item) => item.value === value)?.label}
          </Chip.LabelContent>
        </Chip>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay isAnimationDisabled>
          <DialogBlurBackdrop />
        </Dialog.Overlay>
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={24}>
          <Dialog.Content
            className="rounded-2xl border-0"
            style={{ marginTop: insetTop, height: dialogContentHeight }}
          >
            <DialogHeader>Project</DialogHeader>
            <SearchBar
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Move to project..."
            />
            {filteredItems.length === 0 && (
              <View className="flex-1 items-center justify-center">
                <AppText className="text-base font-medium text-muted-foreground">
                  No results
                </AppText>
              </View>
            )}
            {filteredItems.length > 0 && (
              <ScrollView
                contentContainerClassName="pt-3"
                showsVerticalScrollIndicator={false}
                bounces={false}
                keyboardShouldPersistTaps="handled"
              >
                <RadioGroup
                  value={value}
                  onValueChange={setValue}
                  className="gap-7"
                >
                  {filteredItems.map((item) => (
                    <Dialog.Close
                      key={item.value}
                      className="self-stretch"
                      asChild
                    >
                      <Radio
                        value={item.value}
                        onPress={() => {
                          if (Platform.OS === 'ios') {
                            Haptics.impactAsync(
                              Haptics.ImpactFeedbackStyle.Light
                            );
                          }
                        }}
                      >
                        <Radio.Content className="flex-row items-center gap-2">
                          <View className="w-7 pl-0.5 justify-center">
                            <View className="scale-105">{item.indicator}</View>
                          </View>
                          <Radio.Title>{item.label}</Radio.Title>
                        </Radio.Content>
                        <Radio.Indicator
                          colors={{
                            defaultBorder: 'transparent',
                            selectedBorder: 'transparent',
                          }}
                        >
                          <Radio.IndicatorBackground
                            colors={{
                              defaultBackground: 'transparent',
                              selectedBackground: 'transparent',
                            }}
                          />
                          <Radio.IndicatorThumb>
                            {value === item.value && (
                              <Animated.View
                                key={item.value}
                                entering={FadeIn.duration(200)}
                              >
                                <Feather
                                  name="check"
                                  size={18}
                                  color={colors.foreground}
                                />
                              </Animated.View>
                            )}
                          </Radio.IndicatorThumb>
                        </Radio.Indicator>
                      </Radio>
                    </Dialog.Close>
                  ))}
                </RadioGroup>
              </ScrollView>
            )}
          </Dialog.Content>
        </KeyboardAvoidingView>
      </Dialog.Portal>
    </Dialog>
  );
};
