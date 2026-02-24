import {
  Avatar,
  Description,
  FieldError,
  Label,
  Tag,
  TagGroup,
} from 'heroui-native';
import { useMemo, useState } from 'react';
import { View } from 'react-native';
import { AppText } from '../../../components/app-text';
import type { UsageVariant } from '../../../components/component-presentation/types';
import { UsageVariantFlatList } from '../../../components/component-presentation/usage-variant-flatlist';

// ------------------------------------------------------------------------------

const BasicContent = () => {
  return (
    <View className="flex-1 px-5 items-center justify-center">
      <TagGroup aria-label="Categories" selectionMode="single">
        <TagGroup.List>
          <Tag id="news">News</Tag>
          <Tag id="travel">Travel</Tag>
          <Tag id="gaming">Gaming</Tag>
          <Tag id="shopping">Shopping</Tag>
        </TagGroup.List>
      </TagGroup>
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
            <Tag id="news">News</Tag>
            <Tag id="travel">Travel</Tag>
            <Tag id="gaming">Gaming</Tag>
          </TagGroup.List>
        </TagGroup>
      </View>
      <View className="gap-2">
        <AppText className="text-sm text-muted">Surface</AppText>
        <TagGroup selectionMode="single" variant="surface">
          <TagGroup.List>
            <Tag id="news">News</Tag>
            <Tag id="travel">Travel</Tag>
            <Tag id="gaming">Gaming</Tag>
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
      <TagGroup
        selectionMode="single"
        selectedKeys={selected}
        onSelectionChange={setSelected}
      >
        <TagGroup.List>
          <Tag id="news">News</Tag>
          <Tag id="travel">Travel</Tag>
          <Tag id="gaming">Gaming</Tag>
          <Tag id="shopping">Shopping</Tag>
        </TagGroup.List>
      </TagGroup>
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
      <TagGroup
        selectionMode="multiple"
        selectedKeys={selected}
        onSelectionChange={setSelected}
      >
        <TagGroup.List>
          <Tag id="news">News</Tag>
          <Tag id="travel">Travel</Tag>
          <Tag id="gaming">Gaming</Tag>
          <Tag id="shopping">Shopping</Tag>
        </TagGroup.List>
      </TagGroup>
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
            <Tag id="news" isDisabled>
              News
            </Tag>
            <Tag id="travel">Travel</Tag>
            <Tag id="gaming" isDisabled>
              Gaming
            </Tag>
          </TagGroup.List>
        </TagGroup>
      </View>
      <View className="gap-2">
        <AppText className="text-sm text-muted">Disabled keys</AppText>
        <TagGroup selectionMode="single" disabledKeys={new Set(['travel'])}>
          <TagGroup.List>
            <Tag id="news">News</Tag>
            <Tag id="travel">Travel</Tag>
            <Tag id="gaming">Gaming</Tag>
          </TagGroup.List>
        </TagGroup>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const WithRemoveButtonContent = () => {
  const [tags, setTags] = useState([
    { id: 'news', name: 'News' },
    { id: 'travel', name: 'Travel' },
    { id: 'gaming', name: 'Gaming' },
    { id: 'shopping', name: 'Shopping' },
  ]);

  const handleRemove = (keys: Set<string | number>) => {
    setTags((prev) => prev.filter((tag) => !keys.has(tag.id)));
  };

  return (
    <View className="flex-1 px-5 items-center justify-center">
      <TagGroup selectionMode="single" onRemove={handleRemove}>
        <TagGroup.List
          renderEmptyState={() => (
            <AppText className="text-sm text-muted p-2">
              No tags remaining
            </AppText>
          )}
        >
          {tags.map((tag) => (
            <Tag key={tag.id} id={tag.id}>
              {tag.name}
            </Tag>
          ))}
        </TagGroup.List>
      </TagGroup>
    </View>
  );
};

// ------------------------------------------------------------------------------

const WithCustomLabelContent = () => {
  return (
    <View className="flex-1 px-5 items-center justify-center">
      <TagGroup selectionMode="single">
        <TagGroup.List>
          <Tag id="featured">
            <AppText className="text-xs">📌</AppText>
            <Tag.Label>Featured</Tag.Label>
          </Tag>
          <Tag id="new">
            <AppText className="text-xs">🆕</AppText>
            <Tag.Label>New</Tag.Label>
          </Tag>
          <Tag id="popular">
            <AppText className="text-xs">🔥</AppText>
            <Tag.Label>Popular</Tag.Label>
          </Tag>
        </TagGroup.List>
      </TagGroup>
    </View>
  );
};

// ------------------------------------------------------------------------------

const RenderFunctionContent = () => {
  return (
    <View className="flex-1 px-5 items-center justify-center">
      <TagGroup selectionMode="multiple" onRemove={() => {}}>
        <TagGroup.List>
          <Tag id="react">
            {({ isSelected, allowsRemoving }) => (
              <>
                <Tag.Label>{isSelected ? '✓ React' : 'React'}</Tag.Label>
                {allowsRemoving && <Tag.RemoveButton />}
              </>
            )}
          </Tag>
          <Tag id="vue">
            {({ isSelected, allowsRemoving }) => (
              <>
                <Tag.Label>{isSelected ? '✓ Vue' : 'Vue'}</Tag.Label>
                {allowsRemoving && <Tag.RemoveButton />}
              </>
            )}
          </Tag>
          <Tag id="angular">
            {({ isSelected, allowsRemoving }) => (
              <>
                <Tag.Label>{isSelected ? '✓ Angular' : 'Angular'}</Tag.Label>
                {allowsRemoving && <Tag.RemoveButton />}
              </>
            )}
          </Tag>
        </TagGroup.List>
      </TagGroup>
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
      >
        <Label>Amenities</Label>
        <TagGroup.List>
          <Tag id="laundry">Laundry</Tag>
          <Tag id="fitness">Fitness center</Tag>
          <Tag id="parking">Parking</Tag>
          <Tag id="pool">Swimming pool</Tag>
          <Tag id="breakfast">Breakfast</Tag>
        </TagGroup.List>
        <Description>
          {isInvalid
            ? 'Select at least one category'
            : `Selected: ${Array.from(selected).join(', ')}`}
        </Description>
        <FieldError isInvalid={isInvalid}>
          Please select at least one category
        </FieldError>
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
    { id: 'shopping', name: 'Shopping' },
  ]);

  const [frameworks, setFrameworks] = useState<TagItem[]>([
    { id: 'react', name: 'React' },
    { id: 'vue', name: 'Vue' },
    { id: 'angular', name: 'Angular' },
    { id: 'svelte', name: 'Svelte' },
  ]);

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
            <Tag key={tag.id} id={tag.id}>
              <Tag.Label>{tag.name}</Tag.Label>
              <Tag.RemoveButton />
            </Tag>
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
            <Tag key={fw.id} id={fw.id}>
              {(renderProps) => (
                <>
                  <Tag.Label>{fw.name}</Tag.Label>
                  {renderProps.allowsRemoving && <Tag.RemoveButton />}
                </>
              )}
            </Tag>
          ))}
        </TagGroup.List>
        <Description>Custom remove button with render props</Description>
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

const WithListDataContent = () => {
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
    <View className="flex-1 px-5 justify-center gap-4">
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
            <Tag key={user.id} id={user.id}>
              <Avatar size="sm" alt={user.name} className="size-4">
                <Avatar.Image source={{ uri: user.avatar }} />
                <Avatar.Fallback>
                  <AppText className="text-xs">{user.fallback}</AppText>
                </Avatar.Fallback>
              </Avatar>
              <Tag.Label>{user.name}</Tag.Label>
              <Tag.RemoveButton />
            </Tag>
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
                <View
                  key={`${user.id}-selected`}
                  className="flex-row items-center gap-2 rounded-lg bg-surface px-2 py-1"
                >
                  <Avatar size="sm" alt={user.name} className="size-4">
                    <Avatar.Image source={{ uri: user.avatar }} />
                    <Avatar.Fallback>
                      <AppText className="text-xs">{user.fallback}</AppText>
                    </Avatar.Fallback>
                  </Avatar>
                  <AppText className="text-sm">{user.name}</AppText>
                </View>
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
    value: 'with-remove-button',
    label: 'With remove button',
    content: <WithRemoveButtonContent />,
  },
  {
    value: 'with-custom-label',
    label: 'With custom label',
    content: <WithCustomLabelContent />,
  },
  {
    value: 'render-function',
    label: 'Render function',
    content: <RenderFunctionContent />,
  },
  {
    value: 'with-error-message',
    label: 'With error message',
    content: <WithErrorMessageContent />,
  },
  {
    value: 'with-remove-button-full',
    label: 'With remove button (full)',
    content: <WithRemoveButtonFullContent />,
  },
  {
    value: 'with-list-data',
    label: 'With list data',
    content: <WithListDataContent />,
  },
];

export default function TagGroupScreen() {
  return <UsageVariantFlatList data={TAG_GROUP_VARIANTS} />;
}
