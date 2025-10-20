import FontAwesome from '@expo/vector-icons/FontAwesome';
import { type FC } from 'react';
import { TextInput, View } from 'react-native';
import { withUniwind } from 'uniwind';

const StyledFontAwesome = withUniwind(FontAwesome);

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
  return (
    <View className="flex-row items-center gap-2 rounded-md bg-surface-2 h-12 px-3 mb-2">
      <StyledFontAwesome name="search" size={14} className="text-muted" />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColorClassName="text-muted"
        selectionColorClassName="text-muted"
        className="flex-1 font-medium text-foreground"
        autoFocus
      />
    </View>
  );
};
