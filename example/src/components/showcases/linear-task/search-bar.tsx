import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useTheme } from 'heroui-native';
import { type FC } from 'react';
import { TextInput, View } from 'react-native';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export const SearchBar: FC<SearchBarProps> = ({
  value,
  onChangeText,
  placeholder = 'Search...',
}) => {
  const { colors } = useTheme();

  return (
    <View className="flex-row items-center gap-2 rounded-md bg-surface-2 h-12 px-3 mb-2">
      <FontAwesome name="search" size={14} color={colors.mutedForeground} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.mutedForeground}
        selectionColor={colors.foreground}
        className="flex-1 font-medium text-foreground"
        autoFocus
      />
    </View>
  );
};
