import Feather from '@expo/vector-icons/Feather';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { Avatar, cn } from 'heroui-native';
import { useState, type FC } from 'react';
import { Alert, Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { withUniwind } from 'uniwind';
import { AppText } from '../../../components/app-text';
import { ModelSelect } from '../../../components/showcases/raycast/model-select';
import type { ModelOption } from '../../../components/showcases/raycast/model-select/types';
import { useAppTheme } from '../../../contexts/app-theme-context';
import { simulatePress } from '../../../helpers/utils/simulate-press';

const StyledFeather = withUniwind(Feather);
const StyledFontAwesome6 = withUniwind(FontAwesome6);
const StyledIonicons = withUniwind(Ionicons);

const MODELS: ModelOption[] = [
  { value: 'raycast', label: 'Raycast AI', emoji: '⚡' },
  { value: 'chatgpt', label: 'ChatGPT', emoji: '🤖' },
  { value: 'claude', label: 'Claude', emoji: '🎭' },
  { value: 'gemini', label: 'Gemini', emoji: '✨' },
  { value: 'perplexity', label: 'Perplexity', emoji: '🔍' },
  { value: 'deepseek', label: 'DeepSeek', emoji: '🌊' },
  { value: 'llama', label: 'Llama', emoji: '🦙' },
  { value: 'grok', label: 'Grok', emoji: '🚀' },
  { value: 'mistral', label: 'Mistral', emoji: '🌬️' },
  { value: 'moonshot', label: 'Moonshot AI', emoji: '🌙' },
  { value: 'qwen', label: 'Qwen', emoji: '🎯' },
];

type FavoriteItemProps = {
  iconClassName?: string;
  labelClassName?: string;
};

const FavoriteItem: FC<FavoriteItemProps> = ({
  iconClassName,
  labelClassName,
}) => {
  return (
    <View className="flex-1 gap-3 items-center justify-center">
      <View
        className={cn('size-14 rounded-2xl', iconClassName)}
        style={styles.borderCurve}
      />
      <View
        className={cn('h-2 w-8 rounded-full bg-muted/20', labelClassName)}
      />
    </View>
  );
};

export default function Raycast() {
  const [model, setModel] = useState<ModelOption>(MODELS[0]!);

  const insets = useSafeAreaInsets();

  const { isDark } = useAppTheme();

  const router = useRouter();

  return (
    <View
      className="flex-1 px-3"
      style={{ paddingTop: insets.top + 8, paddingBottom: insets.bottom + 8 }}
    >
      <View className="flex-row items-center">
        <Pressable
          className="w-20 items-center justify-center opacity-80"
          onPress={router.back}
        >
          <StyledFeather
            name="chevron-left"
            size={32}
            className="text-foreground"
          />
        </Pressable>
        <Pressable
          className="flex-1 flex-row items-center gap-2 px-3 py-2.5 rounded-[14px] bg-surface-quaternary/70"
          style={styles.borderCurve}
          onPress={simulatePress}
        >
          <StyledFeather name="search" size={18} className="text-muted" />
          <AppText className="text-lg text-muted">Search Raycast</AppText>
        </Pressable>
        <Pressable
          className="w-20 items-center justify-center"
          onPress={simulatePress}
        >
          <Avatar alt="junior" className="size-8">
            <Avatar.Image
              source={{
                uri: 'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/images/heroui-native-example/junior-avatar.jpg',
              }}
            />
            <Avatar.Fallback>
              <AppText className="text-[8px] font-bold text-white">JG</AppText>
            </Avatar.Fallback>
          </Avatar>
        </Pressable>
      </View>
      <View className="flex-1 pt-16 px-3">
        <View className="flex-row mb-10">
          <FavoriteItem iconClassName="bg-rose-950" />
          <FavoriteItem iconClassName="bg-orange-900" />
          <FavoriteItem iconClassName="bg-indigo-900" />
          <FavoriteItem iconClassName="bg-sky-800" />
        </View>
        <View className="h-8 w-full rounded-xl bg-muted/5 mb-1" />
        <View className="h-8 w-full rounded-xl bg-muted/5 mb-10" />
        <View className="items-center">
          <View className="h-3 w-3/4 rounded-full bg-muted/20 mb-2" />
          <View className="h-3 w-1/2 rounded-full bg-muted/20 mb-4" />
          <View className="h-8 w-32 rounded-xl bg-muted/20 mb-2" />
        </View>
      </View>
      <View
        className={cn(
          'p-2 bg-surface-quaternary/70 rounded-3xl border border-neutral-400/10 gap-7',
          isDark && 'border-neutral-600/10'
        )}
        style={styles.borderCurve}
      >
        <View className="flex-row items-center justify-between pr-1">
          <ModelSelect data={MODELS} model={model} setModel={setModel} />
          <Pressable
            className="flex-row items-center gap-1.5"
            onPress={() => Alert.alert('Coming soon!')}
          >
            <AppText
              className={cn(
                'text-lg text-neutral-800',
                isDark && 'text-neutral-300'
              )}
            >
              Auto
            </AppText>
            <StyledIonicons
              name="chevron-expand"
              size={16}
              className="text-muted"
            />
          </Pressable>
        </View>
        <View className="flex-row items-center gap-3">
          <Pressable className="p-2 opacity-80" onPress={simulatePress}>
            <StyledFontAwesome6
              name="paperclip"
              size={20}
              className="text-foreground"
            />
          </Pressable>
          <Pressable className="flex-1" onPress={simulatePress}>
            <AppText className="text-lg text-muted">
              Ask {model.label}...
            </AppText>
          </Pressable>
          <Pressable
            className={cn(
              'flex-row items-center justify-center gap-1 px-7 py-4 rounded-[16px] bg-neutral-300/50 border border-neutral-400/30',
              isDark && 'bg-neutral-700/50 border-neutral-600/30'
            )}
            style={styles.borderCurve}
            onPress={simulatePress}
          >
            <View className="h-1.5 w-0.5 rounded-full bg-foreground" />
            <View className="h-4 w-0.5 rounded-full bg-foreground" />
            <View className="h-3 w-0.5 rounded-full bg-foreground" />
            <View className="h-1 w-0.5 rounded-full bg-foreground" />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  borderCurve: {
    borderCurve: 'continuous',
  },
});
