import type { MenuKey } from 'heroui-native';
import { Avatar, Button, cn, Menu, Separator } from 'heroui-native';
import { useState } from 'react';
import { View } from 'react-native';
import { AppText } from '../../../components/app-text';
import type { UsageVariant } from '../../../components/component-presentation/types';
import { UsageVariantFlatList } from '../../../components/component-presentation/usage-variant-flatlist';
import { BellIcon } from '../../../components/icons/bell';
import { ChevronRightIcon } from '../../../components/icons/chevron-right';
import { CopyIcon } from '../../../components/icons/copy';
import { GlobeIcon } from '../../../components/icons/globe';
import { LockIcon } from '../../../components/icons/lock';
import { PaletteIcon } from '../../../components/icons/palette';
import { PencilIcon } from '../../../components/icons/pencil';
import { PersonIcon } from '../../../components/icons/person';
import { PersonFillIcon } from '../../../components/icons/person-fill';
import { SquarePlusIcon } from '../../../components/icons/square-plus';
import { StarFillIcon } from '../../../components/icons/star-fill';
import { TrashIcon } from '../../../components/icons/trash';
import { WithStateToggle } from '../../../components/with-state-toggle';

const BasicUsageContent = () => {
  const [isBottomSheet, setIsBottomSheet] = useState(false);

  return (
    <WithStateToggle
      isSelected={isBottomSheet}
      onSelectedChange={setIsBottomSheet}
      label="Bottom Sheet"
      description="Toggle bottom sheet presentation"
    >
      <View className="flex-1 px-5">
        <View className="h-1/2 items-center justify-center">
          <Menu presentation={isBottomSheet ? 'bottom-sheet' : 'popover'}>
            <Menu.Trigger asChild>
              <Button variant="secondary">Actions</Button>
            </Menu.Trigger>
            <Menu.Portal>
              <Menu.Overlay />
              <Menu.Content
                presentation={isBottomSheet ? 'bottom-sheet' : 'popover'}
                width={isBottomSheet ? undefined : 260}
              >
                <Menu.Label className="mb-1">Actions</Menu.Label>
                <View className={cn('gap-1', isBottomSheet && 'gap-2')}>
                  <Menu.Item className="items-start">
                    <View className="mt-1">
                      <SquarePlusIcon size={16} colorClassName="accent-muted" />
                    </View>
                    <View className="flex-1">
                      <Menu.ItemTitle maxFontSizeMultiplier={1.4}>
                        New file
                      </Menu.ItemTitle>
                      <Menu.ItemDescription maxFontSizeMultiplier={1.4}>
                        Create a new file
                      </Menu.ItemDescription>
                    </View>
                  </Menu.Item>
                  <Menu.Item className="items-start">
                    <View className="mt-1">
                      <CopyIcon size={16} colorClassName="accent-muted" />
                    </View>
                    <View className="flex-1">
                      <Menu.ItemTitle maxFontSizeMultiplier={1.4}>
                        Copy link
                      </Menu.ItemTitle>
                      <Menu.ItemDescription maxFontSizeMultiplier={1.4}>
                        Copy the file link
                      </Menu.ItemDescription>
                    </View>
                  </Menu.Item>
                  <Menu.Item className="items-start">
                    <View className="mt-1">
                      <PencilIcon size={16} colorClassName="accent-muted" />
                    </View>
                    <View className="flex-1">
                      <Menu.ItemTitle maxFontSizeMultiplier={1.4}>
                        Edit file
                      </Menu.ItemTitle>
                      <Menu.ItemDescription maxFontSizeMultiplier={1.4}>
                        Make changes to the file
                      </Menu.ItemDescription>
                    </View>
                  </Menu.Item>
                </View>
                <Separator className="mx-2 mt-2 mb-3 opacity-75" />
                <Menu.Label className="mb-1">Danger zone</Menu.Label>
                <Menu.Item className="items-start" variant="danger">
                  <View className="mt-1">
                    <TrashIcon size={16} colorClassName="accent-danger" />
                  </View>
                  <View className="flex-1">
                    <Menu.ItemTitle maxFontSizeMultiplier={1.4}>
                      Delete file
                    </Menu.ItemTitle>
                    <Menu.ItemDescription maxFontSizeMultiplier={1.4}>
                      Move to trash
                    </Menu.ItemDescription>
                  </View>
                </Menu.Item>
              </Menu.Content>
            </Menu.Portal>
          </Menu>
        </View>
      </View>
    </WithStateToggle>
  );
};

// ------------------------------------------------------------------------------

const SectionsContent = () => {
  const [shouldCloseOnSelect, setShouldCloseOnSelect] = useState(false);

  const [textStyles, setTextStyles] = useState<Set<MenuKey>>(
    () => new Set(['bold', 'italic'])
  );
  const [alignment, setAlignment] = useState<Set<MenuKey>>(
    () => new Set(['left'])
  );

  return (
    <WithStateToggle
      isSelected={shouldCloseOnSelect}
      onSelectedChange={setShouldCloseOnSelect}
      label="Should Close On Select"
      description="Toggle should close on select"
    >
      <View className="flex-1 px-5">
        <View className="h-1/2 items-center justify-center">
          <Menu>
            <Menu.Trigger asChild>
              <Button variant="secondary">
                <Button.Label maxFontSizeMultiplier={1.4}>Styles</Button.Label>
              </Button>
            </Menu.Trigger>
            <Menu.Portal>
              <Menu.Overlay />
              <Menu.Content presentation="popover" width={250}>
                <Menu.Label className="mb-1" maxFontSizeMultiplier={1.4}>
                  Text Style
                </Menu.Label>
                <Menu.Group
                  selectionMode="multiple"
                  selectedKeys={textStyles}
                  onSelectionChange={setTextStyles}
                  shouldCloseOnSelect={shouldCloseOnSelect}
                >
                  <Menu.Item id="bold">
                    <Menu.ItemIndicator />
                    <Menu.ItemTitle maxFontSizeMultiplier={1.4}>
                      Bold
                    </Menu.ItemTitle>
                    <AppText
                      className="text-sm text-muted"
                      maxFontSizeMultiplier={1.4}
                    >
                      ⌘ B
                    </AppText>
                  </Menu.Item>
                  <Menu.Item id="italic">
                    <Menu.ItemIndicator />
                    <Menu.ItemTitle maxFontSizeMultiplier={1.4}>
                      Italic
                    </Menu.ItemTitle>
                    <AppText
                      className="text-sm text-muted"
                      maxFontSizeMultiplier={1.4}
                    >
                      ⌘ I
                    </AppText>
                  </Menu.Item>
                  <Menu.Item id="underline">
                    <Menu.ItemIndicator />
                    <Menu.ItemTitle maxFontSizeMultiplier={1.4}>
                      Underline
                    </Menu.ItemTitle>
                    <AppText
                      className="text-sm text-muted"
                      maxFontSizeMultiplier={1.2}
                    >
                      ⌘ U
                    </AppText>
                  </Menu.Item>
                </Menu.Group>
                <Separator className="mx-2 my-2 opacity-75" />
                <Menu.Label className="mb-1" maxFontSizeMultiplier={1.4}>
                  Text Alignment
                </Menu.Label>
                <Menu.Group
                  selectionMode="single"
                  selectedKeys={alignment}
                  onSelectionChange={setAlignment}
                  shouldCloseOnSelect={shouldCloseOnSelect}
                >
                  <Menu.Item id="left">
                    <Menu.ItemIndicator variant="dot" />
                    <Menu.ItemTitle maxFontSizeMultiplier={1.4}>
                      Left
                    </Menu.ItemTitle>
                    <AppText
                      className="text-sm text-muted"
                      maxFontSizeMultiplier={1.2}
                    >
                      ⌥ A
                    </AppText>
                  </Menu.Item>
                  <Menu.Item id="center">
                    <Menu.ItemIndicator variant="dot" />
                    <Menu.ItemTitle maxFontSizeMultiplier={1.4}>
                      Center
                    </Menu.ItemTitle>
                    <AppText
                      className="text-sm text-muted"
                      maxFontSizeMultiplier={1.2}
                    >
                      ⌥ H
                    </AppText>
                  </Menu.Item>
                  <Menu.Item id="right">
                    <Menu.ItemIndicator variant="dot" />
                    <Menu.ItemTitle maxFontSizeMultiplier={1.4}>
                      Right
                    </Menu.ItemTitle>
                    <AppText
                      className="text-sm text-muted"
                      maxFontSizeMultiplier={1.2}
                    >
                      ⌥ D
                    </AppText>
                  </Menu.Item>
                </Menu.Group>
              </Menu.Content>
            </Menu.Portal>
          </Menu>
        </View>
      </View>
    </WithStateToggle>
  );
};

// ------------------------------------------------------------------------------

const PlacementsContent = () => {
  const [channels, setChannels] = useState<Set<MenuKey>>(
    () => new Set(['email', 'push'])
  );
  const [theme, setTheme] = useState<Set<MenuKey>>(() => new Set(['system']));

  return (
    <View className="flex-1">
      <View className="flex-1 items-center justify-center gap-8">
        <Menu>
          <Menu.Trigger asChild>
            <Button isIconOnly variant="secondary">
              <PersonFillIcon size={18} colorClassName="accent-accent" />
            </Button>
          </Menu.Trigger>
          <Menu.Portal>
            <Menu.Overlay />
            <Menu.Content presentation="popover" placement="bottom" width={220}>
              <View className="flex-row items-center gap-3 px-3 py-2">
                <Avatar size="sm" alt="Emily Chen">
                  <Avatar.Image
                    source={{
                      uri: 'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue.jpg',
                    }}
                  />
                  <Avatar.Fallback>EC</Avatar.Fallback>
                </Avatar>
                <View className="flex-1">
                  <AppText
                    className="text-sm font-semibold text-foreground"
                    numberOfLines={1}
                  >
                    Emily Chen
                  </AppText>
                  <AppText className="text-xs text-muted" numberOfLines={1}>
                    emily@acme.co
                  </AppText>
                </View>
              </View>
              <Separator className="mx-2 my-1 opacity-75" />
              <Menu.Item>
                <PersonIcon size={16} colorClassName="accent-muted" />
                <Menu.ItemTitle>View Profile</Menu.ItemTitle>
              </Menu.Item>
              <Menu.Item>
                <LockIcon size={16} colorClassName="accent-muted" />
                <Menu.ItemTitle>Settings</Menu.ItemTitle>
              </Menu.Item>
              <Separator className="mx-2 my-1 opacity-75" />
              <Menu.Item variant="danger">
                <TrashIcon size={16} colorClassName="accent-danger" />
                <Menu.ItemTitle>Sign Out</Menu.ItemTitle>
              </Menu.Item>
            </Menu.Content>
          </Menu.Portal>
        </Menu>

        {/* Middle row */}
        <View className="w-full px-6 flex-row justify-between">
          <Menu>
            <Menu.Trigger asChild>
              <Button isIconOnly variant="secondary">
                <PaletteIcon size={18} colorClassName="accent-accent" />
              </Button>
            </Menu.Trigger>
            <Menu.Portal>
              <Menu.Overlay />
              <Menu.Content
                presentation="popover"
                placement="right"
                width={180}
              >
                <Menu.Label className="mb-1" maxFontSizeMultiplier={1.6}>
                  Appearance
                </Menu.Label>
                <Menu.Group
                  selectionMode="single"
                  selectedKeys={theme}
                  onSelectionChange={setTheme}
                >
                  <Menu.Item id="light">
                    <Menu.ItemIndicator>
                      <StarFillIcon size={14} colorClassName="accent-warning" />
                    </Menu.ItemIndicator>
                    <Menu.ItemTitle>Light</Menu.ItemTitle>
                  </Menu.Item>
                  <Menu.Item id="dark">
                    <Menu.ItemIndicator>
                      <StarFillIcon size={14} colorClassName="accent-warning" />
                    </Menu.ItemIndicator>
                    <Menu.ItemTitle>Dark</Menu.ItemTitle>
                  </Menu.Item>
                  <Menu.Item id="system">
                    <Menu.ItemIndicator>
                      <StarFillIcon size={14} colorClassName="accent-warning" />
                    </Menu.ItemIndicator>
                    <Menu.ItemTitle>System</Menu.ItemTitle>
                  </Menu.Item>
                </Menu.Group>
              </Menu.Content>
            </Menu.Portal>
          </Menu>

          <Menu>
            <Menu.Trigger asChild>
              <Button isIconOnly variant="secondary">
                <GlobeIcon size={18} colorClassName="accent-accent" />
              </Button>
            </Menu.Trigger>
            <Menu.Portal>
              <Menu.Overlay />
              <Menu.Content
                presentation="popover"
                placement="left"
                width={300}
                className="gap-2"
              >
                <Menu.Label>Browse</Menu.Label>
                <Menu.Item>
                  <AppText className="text-xl">🎵</AppText>
                  <View className="flex-1">
                    <Menu.ItemTitle maxFontSizeMultiplier={1.4}>
                      Music
                    </Menu.ItemTitle>
                    <Menu.ItemDescription maxFontSizeMultiplier={1.4}>
                      Songs, albums & playlists
                    </Menu.ItemDescription>
                  </View>
                  <ChevronRightIcon size={16} colorClassName="accent-muted" />
                </Menu.Item>
                <Menu.Item>
                  <AppText className="text-xl">🎬</AppText>
                  <View className="flex-1">
                    <Menu.ItemTitle maxFontSizeMultiplier={1.4}>
                      Movies
                    </Menu.ItemTitle>
                    <Menu.ItemDescription maxFontSizeMultiplier={1.4}>
                      Trending & new releases
                    </Menu.ItemDescription>
                  </View>
                  <ChevronRightIcon size={16} colorClassName="accent-muted" />
                </Menu.Item>
                <Menu.Item>
                  <AppText className="text-xl">📚</AppText>
                  <View className="flex-1">
                    <Menu.ItemTitle maxFontSizeMultiplier={1.4}>
                      Books
                    </Menu.ItemTitle>
                    <Menu.ItemDescription maxFontSizeMultiplier={1.4}>
                      Bestsellers & more
                    </Menu.ItemDescription>
                  </View>
                  <ChevronRightIcon size={16} colorClassName="accent-muted" />
                </Menu.Item>
                <Menu.Item>
                  <AppText className="text-xl">🎮</AppText>
                  <View className="flex-1">
                    <Menu.ItemTitle maxFontSizeMultiplier={1.4}>
                      Games
                    </Menu.ItemTitle>
                    <Menu.ItemDescription maxFontSizeMultiplier={1.4}>
                      Popular & top rated
                    </Menu.ItemDescription>
                  </View>
                  <ChevronRightIcon size={16} colorClassName="accent-muted" />
                </Menu.Item>
              </Menu.Content>
            </Menu.Portal>
          </Menu>
        </View>

        <Menu>
          <Menu.Trigger asChild>
            <Button isIconOnly variant="secondary">
              <BellIcon size={18} colorClassName="accent-accent" />
            </Button>
          </Menu.Trigger>
          <Menu.Portal>
            <Menu.Overlay />
            <Menu.Content presentation="popover" placement="top" width={220}>
              <Menu.Item
                animation={{
                  backgroundColor: {
                    value: 'transparent',
                  },
                }}
              >
                <Menu.ItemTitle>Mark all as read</Menu.ItemTitle>
              </Menu.Item>
              <Separator variant="thick" className="-mx-[5px] opacity-25" />
              <Menu.Item
                variant="danger"
                animation={{
                  backgroundColor: {
                    value: 'transparent',
                  },
                }}
              >
                <Menu.ItemTitle>Clear all</Menu.ItemTitle>
              </Menu.Item>
              <Separator
                variant="thick"
                className="-mx-[5px] mb-3 opacity-25"
              />
              <Menu.Label className="mb-1">Notify via</Menu.Label>
              <Menu.Group
                selectionMode="multiple"
                selectedKeys={channels}
                onSelectionChange={setChannels}
              >
                <Menu.Item id="email">
                  <Menu.ItemIndicator />
                  <Menu.ItemTitle>Email</Menu.ItemTitle>
                </Menu.Item>
                <Separator className="-mx-[5px] my-1 opacity-75" />
                <Menu.Item id="push">
                  <Menu.ItemIndicator />
                  <Menu.ItemTitle>Push</Menu.ItemTitle>
                </Menu.Item>
                <Separator className="-mx-[5px] my-1 opacity-75" />
                <Menu.Item id="sms">
                  <Menu.ItemIndicator />
                  <Menu.ItemTitle>SMS</Menu.ItemTitle>
                </Menu.Item>
              </Menu.Group>
            </Menu.Content>
          </Menu.Portal>
        </Menu>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const MENU_VARIANTS: UsageVariant[] = [
  {
    value: 'basic-usage',
    label: 'Basic usage',
    content: <BasicUsageContent />,
  },
  {
    value: 'sections',
    label: 'Sections',
    content: <SectionsContent />,
  },
  {
    value: 'placements',
    label: 'Placements',
    content: <PlacementsContent />,
  },
];

export default function MenuScreen() {
  return <UsageVariantFlatList data={MENU_VARIANTS} />;
}
