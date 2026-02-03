import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import * as Haptics from 'expo-haptics';
import { Chip, cn, Dialog, Label, RadioGroup, useDialog } from 'heroui-native';
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
const StyledMaterialCommunityIcons = withUniwind(MaterialCommunityIcons);
const StyledScrollView = withUniwind(ScrollView);

type ProjectItem = {
  value: string;
  label: string;
  indicator: React.ReactNode;
};

type ProjectRadioItemProps = {
  item: ProjectItem;
  value: string;
};

const ProjectRadioItem: FC<ProjectRadioItemProps> = ({ item, value }) => {
  const { onOpenChange } = useDialog();

  return (
    <RadioGroup.Item
      value={item.value}
      onPress={() => {
        if (Platform.OS === 'ios') {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
        onOpenChange(false);
      }}
    >
      <View className="flex-row items-center gap-2">
        <View className="w-7 pl-0.5 justify-center">
          <View className="scale-105">{item.indicator}</View>
        </View>
        <Label>{item.label}</Label>
      </View>
      <RadioGroup.Indicator className="border-none shadow-none bg-transparent">
        {value === item.value && (
          <Animated.View key={item.value} entering={FadeIn.duration(200)}>
            <StyledFeather name="check" size={18} className="text-foreground" />
          </Animated.View>
        )}
      </RadioGroup.Indicator>
    </RadioGroup.Item>
  );
};

export const Project: FC = () => {
  const [value, setValue] = useState('hero-ui-native');
  const [searchQuery, setSearchQuery] = useState('');

  const { height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const { isDark } = useAppTheme();

  const insetTop = insets.top + 12;
  const dialogContentHeight = (height - insetTop) / 2;

  const items: ProjectItem[] = useMemo(
    () => [
      {
        value: 'no-project',
        label: 'No Project',
        indicator: (
          <StyledMaterialCommunityIcons
            name="cube-outline"
            size={14}
            className="text-muted"
          />
        ),
      },
      {
        value: 'hero-ui-native',
        label: 'HeroUI Native',
        indicator: (
          <StyledMaterialCommunityIcons
            name="arrow-right-drop-circle"
            size={14}
            className="text-danger"
          />
        ),
      },
      {
        value: 'hero-ui-web',
        label: 'HeroUI Web',
        indicator: (
          <StyledMaterialCommunityIcons
            name="web"
            size={14}
            className="text-warning"
          />
        ),
      },
      {
        value: 'hero-ui-chat',
        label: 'HeroUI Chat',
        indicator: (
          <StyledMaterialCommunityIcons
            name="adjust"
            size={14}
            className="text-success"
          />
        ),
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
          {items.find((item) => item.value === value)?.indicator}
          <Chip.Label className="text-foreground font-medium">
            {items.find((item) => item.value === value)?.label}
          </Chip.Label>
        </Chip>
      </Dialog.Trigger>
      <Dialog.Portal>
        <DialogBlurBackdrop />
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={24}>
          <Dialog.Content
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
                <RadioGroup
                  value={value}
                  onValueChange={setValue}
                  className="gap-7"
                >
                  {filteredItems.map((item) => (
                    <ProjectRadioItem
                      key={item.value}
                      item={item}
                      value={value}
                    />
                  ))}
                </RadioGroup>
              </StyledScrollView>
            )}
          </Dialog.Content>
        </KeyboardAvoidingView>
      </Dialog.Portal>
    </Dialog>
  );
};
