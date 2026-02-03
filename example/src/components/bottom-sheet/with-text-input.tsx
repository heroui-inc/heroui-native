import Ionicons from '@expo/vector-icons/Ionicons';
import {
  BottomSheetScrollView,
  useBottomSheetInternal,
} from '@gorhom/bottom-sheet';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Avatar,
  BottomSheet,
  Button,
  Input,
  ScrollShadow,
  TextField,
  useThemeColor,
} from 'heroui-native';
import { useCallback, useMemo, useRef, useState } from 'react';
import {
  findNodeHandle,
  Pressable,
  TextInput,
  View,
  type BlurEvent,
  type FocusEvent,
} from 'react-native';
import { withUniwind } from 'uniwind';
import { AppText } from '../app-text';
import { MagnifierIcon } from '../icons/magnifier';

const StyledIonicons = withUniwind(Ionicons);

type User = {
  id: string;
  name: string;
  email: string;
};

const MOCK_USERS: User[] = [
  { id: '1', name: 'John Doe', email: 'john.doe@example.com' },
  { id: '2', name: 'Jane Smith', email: 'jane.smith@example.com' },
  { id: '3', name: 'Alice Johnson', email: 'alice.johnson@example.com' },
  { id: '4', name: 'Bob Williams', email: 'bob.williams@example.com' },
  { id: '5', name: 'Charlie Brown', email: 'charlie.brown@example.com' },
  { id: '6', name: 'Diana Prince', email: 'diana.prince@example.com' },
  { id: '7', name: 'Edward Norton', email: 'edward.norton@example.com' },
  { id: '8', name: 'Fiona Apple', email: 'fiona.apple@example.com' },
  { id: '9', name: 'George Lucas', email: 'george.lucas@example.com' },
  { id: '10', name: 'Helen Keller', email: 'helen.keller@example.com' },
];

const getInitials = (name: string): string => {
  const parts = name.trim().split(' ');
  if (parts.length >= 2) {
    const first = parts[0];
    const last = parts[parts.length - 1];
    if (first && last && first[0] && last[0]) {
      return `${first[0]}${last[0]}`.toUpperCase();
    }
  }
  return name.substring(0, 2).toUpperCase();
};

const UserSearchItem = ({ user }: { user: User }) => {
  const initials = getInitials(user.name);

  return (
    <View className="flex-row items-center mb-2 py-2.5">
      <Avatar size="md" className="mr-3" alt={user.name}>
        <Avatar.Fallback>{initials}</Avatar.Fallback>
      </Avatar>
      <View className="flex-1">
        <AppText className="text-base font-semibold text-foreground">
          {user.name}
        </AppText>
        <AppText className="text-sm text-muted">{user.email}</AppText>
      </View>
    </View>
  );
};

/**
 * BottomSheetTextInput component with custom keyboard handling
 *
 * This is a workaround to enable proper keyboard handling for Input
 * inside a bottom sheet. According to the @gorhom/bottom-sheet documentation:
 * https://gorhom.dev/react-native-bottom-sheet/keyboard-handling
 *
 * "To use custom TextInput, you will need to copy the handleOnFocus and handleOnBlur
 * from BottomSheetTextInput into your own component."
 *
 * The implementation is based on the official BottomSheetTextInput source code:
 * https://github.com/gorhom/react-native-bottom-sheet/blob/master/src/components/bottomSheetTextInput/BottomSheetTextInput.tsx
 *
 * This component extends Input with the necessary focus/blur handlers
 * that communicate with the bottom sheet's internal keyboard state management.
 */
const BottomSheetTextInput = ({
  searchQuery,
  setSearchQuery,
}: {
  searchQuery: string;
  setSearchQuery: (text: string) => void;
}) => {
  const { animatedKeyboardState, textInputNodesRef } = useBottomSheetInternal();
  const inputRef = useRef<TextInput>(null);

  const handleOnFocus = useCallback(
    (e: FocusEvent) => {
      animatedKeyboardState.set((state) => ({
        ...state,
        target: e.nativeEvent.target,
      }));
    },
    [animatedKeyboardState]
  );

  const handleOnBlur = useCallback(
    (e: BlurEvent) => {
      const keyboardState = animatedKeyboardState.get();
      const currentFocusedInput = findNodeHandle(
        TextInput.State.currentlyFocusedInput() as TextInput | null
      );
      const shouldRemoveCurrentTarget =
        keyboardState.target === e.nativeEvent.target;
      const shouldIgnoreBlurEvent =
        currentFocusedInput &&
        textInputNodesRef.current.has(currentFocusedInput);

      if (shouldRemoveCurrentTarget && !shouldIgnoreBlurEvent) {
        animatedKeyboardState.set((state) => ({
          ...state,
          target: undefined,
        }));
      }
    },
    [animatedKeyboardState, textInputNodesRef]
  );

  return (
    <TextField className="absolute top-0 left-0 right-0 px-5 pt-2">
      <View className="w-full flex-row items-center">
        <Input
          ref={inputRef}
          variant="secondary"
          placeholder="Search by name or email..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          className="flex-1 px-10"
          autoCapitalize="none"
          autoCorrect={false}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
        />
        <View className="absolute left-3.5" pointerEvents="none">
          <MagnifierIcon colorClassName="accent-field-placeholder" />
        </View>
        {searchQuery.length > 0 && (
          <Pressable
            className="absolute right-3 p-1"
            onPress={() => setSearchQuery('')}
            hitSlop={12}
          >
            <StyledIonicons
              name="close-circle"
              size={20}
              className="text-muted"
            />
          </Pressable>
        )}
      </View>
    </TextField>
  );
};

/**
 * Component containing the bottom sheet content with search functionality and state logic.
 * Manages search query state, filtering, and UI rendering.
 */
const UserSearchBottomSheetContent = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const themeColorOverlay = useThemeColor('overlay');

  const snapPoints = useMemo(() => ['50%', '90%'], []);

  /**
   * Filters users based on the search query.
   * Searches in both name and email fields, case-insensitive.
   */
  const filteredUsers = useMemo(() => {
    if (!searchQuery.trim()) {
      return MOCK_USERS;
    }
    const query = searchQuery.toLowerCase();
    return MOCK_USERS.filter(
      (user) =>
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  return (
    <BottomSheet.Content
      snapPoints={snapPoints}
      enableOverDrag={false}
      enableDynamicSizing={false}
      contentContainerClassName="h-full pt-16 pb-2"
      keyboardBehavior="extend"
    >
      <BottomSheetTextInput
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <ScrollShadow
        LinearGradientComponent={LinearGradient}
        color={themeColorOverlay}
      >
        <BottomSheetScrollView
          showsVerticalScrollIndicator={false}
          contentContainerClassName="pt-3"
          keyboardShouldPersistTaps="handled"
        >
          {filteredUsers.length > 0 ? (
            <View>
              {filteredUsers.map((user) => (
                <UserSearchItem key={user.id} user={user} />
              ))}
            </View>
          ) : (
            <View className="items-center justify-center py-8">
              <StyledIonicons
                name="search-outline"
                size={48}
                className="text-muted mb-3"
              />
              <AppText className="text-base text-muted">No users found</AppText>
              <AppText className="text-sm text-muted mt-1">
                Try a different search term
              </AppText>
            </View>
          )}
        </BottomSheetScrollView>
      </ScrollShadow>
    </BottomSheet.Content>
  );
};

export const WithTextInputContent = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View className="flex-1">
      <View className="flex-1 items-center justify-center">
        <BottomSheet isOpen={isOpen} onOpenChange={setIsOpen}>
          <BottomSheet.Trigger asChild>
            <Button variant="secondary" isDisabled={isOpen}>
              Bottom sheet with text input
            </Button>
          </BottomSheet.Trigger>
          <BottomSheet.Portal>
            <BottomSheet.Overlay />
            <UserSearchBottomSheetContent />
          </BottomSheet.Portal>
        </BottomSheet>
      </View>
    </View>
  );
};
