import {
  Avatar,
  Chip,
  cn,
  Description,
  FieldError,
  Label,
  TagGroup,
  useThemeColor,
} from 'heroui-native';
import React, { useMemo, useState } from 'react';
import { View } from 'react-native';
import Animated, { LinearTransition } from 'react-native-reanimated';
import { AppText } from '../../../components/app-text';
import type { UsageVariant } from '../../../components/component-presentation/types';
import { UsageVariantFlatList } from '../../../components/component-presentation/usage-variant-flatlist';
import { GlobeIcon } from '../../../components/icons/globe';
import { RocketIcon } from '../../../components/icons/rocket';
import { SquareArticleIcon } from '../../../components/icons/square-article';

const AnimatedTagGroupItem = Animated.createAnimatedComponent(TagGroup.Item);
const AnimatedChip = Animated.createAnimatedComponent(Chip);

// ------------------------------------------------------------------------------

type CategoriesTagGroupProps = {
  /** Selection mode: single or multiple */
  selectionMode: 'single' | 'multiple';
  /** Controlled selected keys (optional for uncontrolled mode) */
  selectedKeys?: Set<string | number>;
  /** Callback when selection changes (optional for uncontrolled mode) */
  onSelectionChange?: (keys: Set<string | number>) => void;
  /** Accessible label for the tag group */
  ariaLabel?: string;
};

/**
 * Reusable Categories TagGroup with News, Travel, and Gaming tags and icons.
 * Supports both single and multiple selection modes.
 */
const CategoriesTagGroup: React.FC<CategoriesTagGroupProps> = ({
  selectionMode,
  selectedKeys,
  onSelectionChange,
  ariaLabel = 'Categories',
}) => {
  const getColorClassName = (isSelected: boolean) => {
    return cn(
      isSelected ? 'accent-accent-soft-foreground' : 'accent-field-foreground'
    );
  };

  return (
    <TagGroup
      aria-label={ariaLabel}
      selectionMode={selectionMode}
      selectedKeys={selectedKeys}
      onSelectionChange={onSelectionChange}
    >
      <TagGroup.List className="justify-center">
        <TagGroup.Item id="news">
          {({ isSelected }) => (
            <>
              <SquareArticleIcon
                size={16}
                colorClassName={getColorClassName(isSelected)}
              />
              <TagGroup.ItemLabel>News</TagGroup.ItemLabel>
            </>
          )}
        </TagGroup.Item>
        <TagGroup.Item id="travel">
          {({ isSelected }) => (
            <>
              <GlobeIcon
                size={14}
                colorClassName={getColorClassName(isSelected)}
              />
              <TagGroup.ItemLabel>Travel</TagGroup.ItemLabel>
            </>
          )}
        </TagGroup.Item>
        <TagGroup.Item id="gaming">
          {({ isSelected }) => (
            <>
              <RocketIcon
                size={14}
                colorClassName={getColorClassName(isSelected)}
              />
              <TagGroup.ItemLabel>Gaming</TagGroup.ItemLabel>
            </>
          )}
        </TagGroup.Item>
      </TagGroup.List>
    </TagGroup>
  );
};

// ------------------------------------------------------------------------------

const BasicContent = () => {
  return (
    <View className="flex-1 px-5 items-center justify-center">
      <CategoriesTagGroup selectionMode="single" />
    </View>
  );
};

// ------------------------------------------------------------------------------

const VariantsContent = () => {
  return (
    <View className="flex-1 px-5 items-center justify-center gap-6">
      <View className="gap-2">
        <AppText className="text-sm text-muted">Default</AppText>
        <TagGroup selectionMode="single" variant="default">
          <TagGroup.List>
            <TagGroup.Item id="news">News</TagGroup.Item>
            <TagGroup.Item id="travel">Travel</TagGroup.Item>
            <TagGroup.Item id="gaming">Gaming</TagGroup.Item>
          </TagGroup.List>
        </TagGroup>
      </View>
      <View className="gap-2">
        <AppText className="text-sm text-muted">Surface</AppText>
        <TagGroup selectionMode="single" variant="surface">
          <TagGroup.List>
            <TagGroup.Item id="news">News</TagGroup.Item>
            <TagGroup.Item id="travel">Travel</TagGroup.Item>
            <TagGroup.Item id="gaming">Gaming</TagGroup.Item>
          </TagGroup.List>
        </TagGroup>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const SizesContent = () => {
  return (
    <View className="flex-1 px-5 items-center justify-center gap-6">
      <View className="gap-2">
        <AppText className="text-sm text-muted text-center">sm</AppText>
        <TagGroup selectionMode="single" size="sm">
          <TagGroup.List>
            <TagGroup.Item id="news">News</TagGroup.Item>
            <TagGroup.Item id="travel">Travel</TagGroup.Item>
            <TagGroup.Item id="gaming">Gaming</TagGroup.Item>
          </TagGroup.List>
        </TagGroup>
      </View>
      <View className="gap-2">
        <AppText className="text-sm text-muted text-center">md</AppText>
        <TagGroup selectionMode="single" size="md">
          <TagGroup.List>
            <TagGroup.Item id="news">News</TagGroup.Item>
            <TagGroup.Item id="travel">Travel</TagGroup.Item>
            <TagGroup.Item id="gaming">Gaming</TagGroup.Item>
          </TagGroup.List>
        </TagGroup>
      </View>
      <View className="gap-2">
        <AppText className="text-sm text-muted text-center">lg</AppText>
        <TagGroup selectionMode="single" size="lg">
          <TagGroup.List>
            <TagGroup.Item id="news">News</TagGroup.Item>
            <TagGroup.Item id="travel">Travel</TagGroup.Item>
            <TagGroup.Item id="gaming">Gaming</TagGroup.Item>
          </TagGroup.List>
        </TagGroup>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const SingleSelectionContent = () => {
  const [selected, setSelected] = useState<Set<string | number>>(
    new Set(['news'])
  );

  return (
    <View className="flex-1 px-5 items-center justify-center gap-4">
      <CategoriesTagGroup
        selectionMode="single"
        selectedKeys={selected}
        onSelectionChange={setSelected}
      />
      <AppText className="text-sm text-muted">
        Selected: {Array.from(selected).join(', ') || 'None'}
      </AppText>
    </View>
  );
};

// ------------------------------------------------------------------------------

const MultipleSelectionContent = () => {
  const [selected, setSelected] = useState<Set<string | number>>(
    new Set(['news', 'travel'])
  );

  return (
    <View className="flex-1 px-5 items-center justify-center gap-4">
      <CategoriesTagGroup
        selectionMode="multiple"
        selectedKeys={selected}
        onSelectionChange={setSelected}
      />
      <AppText className="text-sm text-muted">
        Selected: {Array.from(selected).join(', ') || 'None'}
      </AppText>
    </View>
  );
};

// ------------------------------------------------------------------------------

const DisabledContent = () => {
  return (
    <View className="flex-1 px-5 items-center justify-center gap-6">
      <View className="gap-2">
        <AppText className="text-sm text-muted">Individual disabled</AppText>
        <TagGroup selectionMode="single">
          <TagGroup.List>
            <TagGroup.Item id="news">News</TagGroup.Item>
            <TagGroup.Item id="travel" isDisabled>
              Travel
            </TagGroup.Item>
            <TagGroup.Item id="gaming">Gaming</TagGroup.Item>
          </TagGroup.List>
        </TagGroup>
      </View>
      <View className="gap-2">
        <AppText className="text-sm text-muted">Disabled keys</AppText>
        <TagGroup
          selectionMode="single"
          disabledKeys={new Set(['travel', 'gaming'])}
        >
          <TagGroup.List>
            <TagGroup.Item id="news">News</TagGroup.Item>
            <TagGroup.Item id="travel">Travel</TagGroup.Item>
            <TagGroup.Item id="gaming">Gaming</TagGroup.Item>
          </TagGroup.List>
        </TagGroup>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const WithErrorMessageContent = () => {
  const [selected, setSelected] = useState<Set<string | number>>(new Set());

  const isInvalid = useMemo(
    () => Array.from(selected).length === 0,
    [selected]
  );

  return (
    <View className="flex-1 px-5 items-center justify-center">
      <TagGroup
        selectedKeys={selected}
        selectionMode="multiple"
        onSelectionChange={setSelected}
        isInvalid={isInvalid}
      >
        <Label isInvalid={false}>Amenities</Label>
        <TagGroup.List>
          <TagGroup.Item id="laundry">Laundry</TagGroup.Item>
          <TagGroup.Item id="fitness">Fitness center</TagGroup.Item>
          <TagGroup.Item id="parking">Parking</TagGroup.Item>
          <TagGroup.Item id="pool">Swimming pool</TagGroup.Item>
          <TagGroup.Item id="breakfast">Breakfast</TagGroup.Item>
        </TagGroup.List>
        <Description hideOnInvalid>
          {`Selected: ${Array.from(selected).join(', ')}`}
        </Description>
        <FieldError>Please select at least one category</FieldError>
      </TagGroup>
    </View>
  );
};

// ------------------------------------------------------------------------------

type TagItem = { id: string; name: string };

const WithRemoveButtonFullContent = () => {
  const [tags, setTags] = useState<TagItem[]>([
    { id: 'news', name: 'News' },
    { id: 'travel', name: 'Travel' },
    { id: 'gaming', name: 'Gaming' },
  ]);

  const [frameworks, setFrameworks] = useState<TagItem[]>([
    { id: 'react', name: 'React' },
    { id: 'vue', name: 'Vue' },
    { id: 'angular', name: 'Angular' },
    { id: 'svelte', name: 'Svelte' },
  ]);

  const themeColorBackground = useThemeColor('background');
  const themeColorAccentForeground = useThemeColor('accent-foreground');

  const onRemoveTags = (keys: Set<string | number>) => {
    setTags((prev) => prev.filter((tag) => !keys.has(tag.id)));
  };

  const onRemoveFrameworks = (keys: Set<string | number>) => {
    setFrameworks((prev) =>
      prev.filter((framework) => !keys.has(framework.id))
    );
  };

  return (
    <View className="flex-1 px-5 justify-center gap-8">
      <TagGroup selectionMode="single" onRemove={onRemoveTags}>
        <Label>Default Remove Button</Label>
        <TagGroup.List
          renderEmptyState={() => (
            <AppText className="text-sm text-muted p-1">
              No categories found
            </AppText>
          )}
        >
          {tags.map((tag) => (
            <AnimatedTagGroupItem
              key={tag.id}
              id={tag.id}
              layout={LinearTransition.springify()}
            >
              <TagGroup.ItemLabel>{tag.name}</TagGroup.ItemLabel>
              <TagGroup.ItemRemoveButton />
            </AnimatedTagGroupItem>
          ))}
        </TagGroup.List>
        <Description>Tap the X to remove tags</Description>
      </TagGroup>

      <TagGroup selectionMode="single" onRemove={onRemoveFrameworks}>
        <Label>Custom Remove Button</Label>
        <TagGroup.List
          renderEmptyState={() => (
            <AppText className="text-sm text-muted p-1">
              No frameworks found
            </AppText>
          )}
        >
          {frameworks.map((fw) => (
            <AnimatedTagGroupItem
              key={fw.id}
              id={fw.id}
              layout={LinearTransition.springify()}
            >
              {({ isSelected }) => (
                <>
                  <TagGroup.ItemLabel>{fw.name}</TagGroup.ItemLabel>
                  <TagGroup.ItemRemoveButton
                    className={cn(
                      'p-0.5 bg-muted',
                      isSelected && 'bg-accent-soft-foreground'
                    )}
                    iconProps={{
                      color: isSelected
                        ? themeColorAccentForeground
                        : themeColorBackground,
                    }}
                  />
                </>
              )}
            </AnimatedTagGroupItem>
          ))}
        </TagGroup.List>
        <Description>Custom remove button styles</Description>
      </TagGroup>
    </View>
  );
};

// ------------------------------------------------------------------------------

type User = {
  id: string;
  name: string;
  avatar: string;
  fallback: string;
};

const INITIAL_USERS: User[] = [
  {
    avatar:
      'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue.jpg',
    fallback: 'F',
    id: 'fred',
    name: 'Fred',
  },
  {
    avatar:
      'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/green.jpg',
    fallback: 'M',
    id: 'michael',
    name: 'Michael',
  },
  {
    avatar:
      'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/purple.jpg',
    fallback: 'J',
    id: 'jane',
    name: 'Jane',
  },
  {
    avatar:
      'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/red.jpg',
    fallback: 'A',
    id: 'alice',
    name: 'Alice',
  },
  {
    avatar:
      'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/orange.jpg',
    fallback: 'B',
    id: 'bob',
    name: 'Bob',
  },
];

const WithAvatarAndRemoveButtonContent = () => {
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);
  const [selectedKeys, setSelectedKeys] = useState<Set<string | number>>(
    new Set(['fred', 'michael'])
  );

  const onRemove = (keys: Set<string | number>) => {
    setUsers((prev) => prev.filter((user) => !keys.has(user.id)));
    setSelectedKeys((prev) => {
      const next = new Set(prev);
      keys.forEach((k) => next.delete(k));
      return next;
    });
  };

  return (
    <View className="flex-1 px-5 justify-center gap-8">
      <TagGroup
        selectedKeys={selectedKeys}
        selectionMode="multiple"
        onRemove={onRemove}
        onSelectionChange={setSelectedKeys}
      >
        <Label>Team Members</Label>
        <TagGroup.List
          renderEmptyState={() => (
            <AppText className="text-sm text-muted p-1">
              No team members
            </AppText>
          )}
        >
          {users.map((user) => (
            <AnimatedTagGroupItem
              key={user.id}
              id={user.id}
              className="pl-1.5 pr-2"
              layout={LinearTransition.springify()}
            >
              <Avatar size="sm" alt={user.name} className="size-4">
                <Avatar.Image source={{ uri: user.avatar }} />
                <Avatar.Fallback>
                  <AppText className="text-xs">{user.fallback}</AppText>
                </Avatar.Fallback>
              </Avatar>
              <TagGroup.ItemLabel>{user.name}</TagGroup.ItemLabel>
              <TagGroup.ItemRemoveButton />
            </AnimatedTagGroupItem>
          ))}
        </TagGroup.List>
        <Description>Select team members for your project</Description>
      </TagGroup>

      {Array.from(selectedKeys).length > 0 && (
        <View className="gap-2">
          <AppText className="text-sm font-medium text-muted">
            Selected:
          </AppText>
          <View className="flex-row flex-wrap gap-2">
            {Array.from(selectedKeys).map((key) => {
              const user = users.find((u) => u.id === key);

              if (!user) return null;

              return (
                <AnimatedChip
                  key={`${user.id}-selected`}
                  variant="secondary"
                  color="success"
                  className="pl-1.5 pr-2"
                  layout={LinearTransition.springify()}
                >
                  <Avatar size="sm" alt={user.name} className="size-4">
                    <Avatar.Image source={{ uri: user.avatar }} />
                    <Avatar.Fallback>
                      <AppText className="text-xs">{user.fallback}</AppText>
                    </Avatar.Fallback>
                  </Avatar>
                  <Chip.Label>{user.name}</Chip.Label>
                </AnimatedChip>
              );
            })}
          </View>
        </View>
      )}
    </View>
  );
};

// ------------------------------------------------------------------------------

const TAG_GROUP_VARIANTS: UsageVariant[] = [
  {
    value: 'basic',
    label: 'Basic',
    content: <BasicContent />,
  },
  {
    value: 'variants',
    label: 'Variants',
    content: <VariantsContent />,
  },
  {
    value: 'sizes',
    label: 'Sizes',
    content: <SizesContent />,
  },
  {
    value: 'single-selection',
    label: 'Single selection',
    content: <SingleSelectionContent />,
  },
  {
    value: 'multiple-selection',
    label: 'Multiple selection',
    content: <MultipleSelectionContent />,
  },
  {
    value: 'disabled',
    label: 'Disabled',
    content: <DisabledContent />,
  },
  {
    value: 'with-error-message',
    label: 'With error message',
    content: <WithErrorMessageContent />,
  },
  {
    value: 'with-remove-button-full',
    label: 'With remove button',
    content: <WithRemoveButtonFullContent />,
  },
  {
    value: 'with-avatar-and-remove-button',
    label: 'With avatar and remove button',
    content: <WithAvatarAndRemoveButtonContent />,
  },
];

export default function TagGroupScreen() {
  return <UsageVariantFlatList data={TAG_GROUP_VARIANTS} />;
}
