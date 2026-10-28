import { LegendList, type LegendListRef } from '@legendapp/list/react-native';
import { useLingui } from '@lingui/react/macro';
import {
  Avatar,
  BottomSheet,
  Button,
  type BottomSheetRef,
} from 'heroui-native';
import { useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { AppText } from '../app-text';

type Person = {
  id: string;
  name: string;
  email: string;
};

const PEOPLE: Person[] = Array.from({ length: 30 }, (_, index) => {
  const number = index + 1;
  return {
    id: String(number),
    name: `Person ${number}`,
    email: `person${number}@example.com`,
  };
});

const getInitials = (name: string) =>
  name
    .split(' ')
    .map((part) => part[0])
    .join('');

/**
 * Rows hold no local state, so recycling reuses them safely.
 */
const PersonRow = ({ person }: { person: Person }) => (
  <View className="flex-row items-center px-5 py-2.5">
    <Avatar size="sm" className="me-3" alt={person.name}>
      <Avatar.Fallback>{getInitials(person.name)}</Avatar.Fallback>
    </Avatar>
    <View className="flex-1">
      <AppText className="text-base font-semibold text-foreground">
        {person.name}
      </AppText>
      <AppText className="text-sm text-muted">{person.email}</AppText>
    </View>
  </View>
);

const renderPerson = ({ item }: { item: Person }) => (
  <PersonRow person={item} />
);

/**
 * Virtualized list inside the sheet. `scrollableRef` hands the list's scroll
 * view to the sheet, so dragging the list expands the sheet and then scrolls
 * it.
 */
export const WithLegendListContent = () => {
  const { t } = useLingui();
  const sheetRef = useRef<BottomSheetRef>(null);
  const listRef = useRef<LegendListRef>(null);

  return (
    <View className="flex-1">
      <View className="flex-1 items-center justify-center">
        <Button variant="secondary" onPress={() => sheetRef.current?.present()}>
          <Button.Label maxFontSizeMultiplier={1.2}>{t`List`}</Button.Label>
        </Button>
        <BottomSheet
          ref={sheetRef}
          detents={[0.5, 1]}
          scrollableRef={listRef}
          style={styles.flex}
          contentContainerClassName="h-full px-0"
        >
          <View className="flex-row items-center justify-between px-5 pb-3 gap-4">
            <BottomSheet.Title
              className="flex-1 text-xl font-bold"
              numberOfLines={1}
            >
              {t`People`}
            </BottomSheet.Title>
            <BottomSheet.Close />
          </View>
          <LegendList
            ref={listRef}
            data={PEOPLE}
            keyExtractor={(person) => person.id}
            renderItem={renderPerson}
            recycleItems
            estimatedItemSize={56}
            style={styles.flex}
          />
        </BottomSheet>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
});
