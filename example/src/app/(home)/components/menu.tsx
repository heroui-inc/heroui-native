import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react/macro';
import type { MenuKey } from 'heroui-native';
import { Avatar, Button, cn, Menu, Separator, SubMenu } from 'heroui-native';
import { useState } from 'react';
import { View } from 'react-native';
import { withUniwind } from 'uniwind';
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

/**
 * Wraps ChevronRightIcon so `className` resolves to the SVG's forwarded `style`,
 * enabling `rtl:-scale-x-100` to mirror the trailing chevron in RTL layouts.
 */
const StyledChevronRightIcon = withUniwind(ChevronRightIcon);

const BasicUsageContent = () => {
  const { t } = useLingui();
  const [isBottomSheet, setIsBottomSheet] = useState(false);

  return (
    <WithStateToggle
      isSelected={isBottomSheet}
      onSelectedChange={setIsBottomSheet}
      label={t`BottomSheet`}
      description={t`Toggle bottom sheet presentation`}
    >
      <View className="flex-1 px-5">
        <View className="h-1/2 items-center justify-center">
          <Menu presentation={isBottomSheet ? 'bottom-sheet' : 'popover'}>
            <Menu.Trigger asChild>
              <Button variant="secondary">{t`Actions`}</Button>
            </Menu.Trigger>
            <Menu.Portal>
              <Menu.Overlay />
              <Menu.Content
                presentation={isBottomSheet ? 'bottom-sheet' : 'popover'}
                width={isBottomSheet ? undefined : 260}
              >
                <Menu.Label className="mb-1">{t`Actions`}</Menu.Label>
                <View className={cn('gap-1', isBottomSheet && 'gap-2')}>
                  <Menu.Item className="items-start">
                    <View className="mt-1">
                      <SquarePlusIcon size={16} colorClassName="accent-muted" />
                    </View>
                    <View className="flex-1">
                      <Menu.ItemTitle>{t`New file`}</Menu.ItemTitle>
                      <Menu.ItemDescription>
                        {t`Create a new file`}
                      </Menu.ItemDescription>
                    </View>
                  </Menu.Item>
                  <Menu.Item className="items-start">
                    <View className="mt-1">
                      <CopyIcon size={16} colorClassName="accent-muted" />
                    </View>
                    <View className="flex-1">
                      <Menu.ItemTitle>{t`Copy link`}</Menu.ItemTitle>
                      <Menu.ItemDescription>
                        {t`Copy the file link`}
                      </Menu.ItemDescription>
                    </View>
                  </Menu.Item>
                  <Menu.Item className="items-start">
                    <View className="mt-1">
                      <PencilIcon size={16} colorClassName="accent-muted" />
                    </View>
                    <View className="flex-1">
                      <Menu.ItemTitle>{t`Edit file`}</Menu.ItemTitle>
                      <Menu.ItemDescription>
                        {t`Make changes to the file`}
                      </Menu.ItemDescription>
                    </View>
                  </Menu.Item>
                </View>
                <Separator className="mx-2 mt-2 mb-3 opacity-75" />
                <Menu.Label className="mb-1">{t`Danger zone`}</Menu.Label>
                <Menu.Item className="items-start" variant="danger">
                  <View className="mt-1">
                    <TrashIcon size={16} colorClassName="accent-danger" />
                  </View>
                  <View className="flex-1">
                    <Menu.ItemTitle>{t`Delete file`}</Menu.ItemTitle>
                    <Menu.ItemDescription>
                      {t`Move to trash`}
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
  const { t } = useLingui();
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
      label={t`Should Close On Select`}
      description={t`Toggle should close on select`}
    >
      <View className="flex-1 px-5">
        <View className="h-1/2 items-center justify-center">
          <Menu>
            <Menu.Trigger asChild>
              <Button variant="secondary">{t`Styles`}</Button>
            </Menu.Trigger>
            <Menu.Portal>
              <Menu.Overlay />
              <Menu.Content presentation="popover" width={250}>
                <Menu.Label className="mb-1">{t`Text Style`}</Menu.Label>
                <Menu.Group
                  selectionMode="multiple"
                  selectedKeys={textStyles}
                  onSelectionChange={setTextStyles}
                  shouldCloseOnSelect={shouldCloseOnSelect}
                >
                  <Menu.Item id="bold">
                    <Menu.ItemIndicator />
                    <Menu.ItemTitle>{t`Bold`}</Menu.ItemTitle>
                    <AppText className="text-sm text-muted">⌘ B</AppText>
                  </Menu.Item>
                  <Menu.Item id="italic">
                    <Menu.ItemIndicator />
                    <Menu.ItemTitle>{t`Italic`}</Menu.ItemTitle>
                    <AppText className="text-sm text-muted">⌘ I</AppText>
                  </Menu.Item>
                  <Menu.Item id="underline">
                    <Menu.ItemIndicator />
                    <Menu.ItemTitle>{t`Underline`}</Menu.ItemTitle>
                    <AppText className="text-sm text-muted">⌘ U</AppText>
                  </Menu.Item>
                </Menu.Group>
                <Separator className="mx-2 my-2 opacity-75" />
                <Menu.Label className="mb-1">{t`Text Alignment`}</Menu.Label>
                <Menu.Group
                  selectionMode="single"
                  selectedKeys={alignment}
                  onSelectionChange={setAlignment}
                  shouldCloseOnSelect={shouldCloseOnSelect}
                  disallowEmptySelection
                >
                  <Menu.Item id="left">
                    <Menu.ItemIndicator variant="dot" />
                    <Menu.ItemTitle>{t`Left`}</Menu.ItemTitle>
                    <AppText className="text-sm text-muted">⌥ A</AppText>
                  </Menu.Item>
                  <Menu.Item id="center">
                    <Menu.ItemIndicator variant="dot" />
                    <Menu.ItemTitle>{t`Center`}</Menu.ItemTitle>
                    <AppText className="text-sm text-muted">⌥ H</AppText>
                  </Menu.Item>
                  <Menu.Item id="right">
                    <Menu.ItemIndicator variant="dot" />
                    <Menu.ItemTitle>{t`Right`}</Menu.ItemTitle>
                    <AppText className="text-sm text-muted">⌥ D</AppText>
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
  const { t } = useLingui();
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
                {/* eslint-disable-next-line lingui/no-unlocalized-strings -- Sample person name. */}
                <Avatar size="sm" alt="Emily Chen">
                  <Avatar.Image
                    source={{
                      uri: 'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue.jpg',
                    }}
                  />
                  <Avatar.Fallback>EC</Avatar.Fallback>
                </Avatar>
                <View>
                  {/* eslint-disable-next-line lingui/no-unlocalized-strings -- Sample person name. */}
                  <AppText className="text-sm font-semibold text-foreground">
                    Emily Chen
                  </AppText>
                  <AppText className="text-xs text-muted">
                    emily@acme.co
                  </AppText>
                </View>
              </View>
              <Separator className="mx-2 my-1 opacity-75" />
              <Menu.Item>
                <PersonIcon size={16} colorClassName="accent-muted" />
                <Menu.ItemTitle>{t`View Profile`}</Menu.ItemTitle>
              </Menu.Item>
              <Menu.Item>
                <LockIcon size={16} colorClassName="accent-muted" />
                <Menu.ItemTitle>{t`Settings`}</Menu.ItemTitle>
              </Menu.Item>
              <Separator className="mx-2 my-1 opacity-75" />
              <Menu.Item variant="danger">
                <TrashIcon size={16} colorClassName="accent-danger" />
                <Menu.ItemTitle>{t`Sign Out`}</Menu.ItemTitle>
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
                <Menu.Label className="mb-1">{t`Appearance`}</Menu.Label>
                <Menu.Group
                  selectionMode="single"
                  selectedKeys={theme}
                  onSelectionChange={setTheme}
                  disallowEmptySelection
                >
                  <Menu.Item id="light">
                    <Menu.ItemIndicator>
                      <StarFillIcon size={14} colorClassName="accent-warning" />
                    </Menu.ItemIndicator>
                    <Menu.ItemTitle>{t`Light`}</Menu.ItemTitle>
                  </Menu.Item>
                  <Menu.Item id="dark">
                    <Menu.ItemIndicator>
                      <StarFillIcon size={14} colorClassName="accent-warning" />
                    </Menu.ItemIndicator>
                    <Menu.ItemTitle>{t`Dark`}</Menu.ItemTitle>
                  </Menu.Item>
                  <Menu.Item id="system">
                    <Menu.ItemIndicator>
                      <StarFillIcon size={14} colorClassName="accent-warning" />
                    </Menu.ItemIndicator>
                    <Menu.ItemTitle>{t`System`}</Menu.ItemTitle>
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
                <Menu.Label>{t`Browse`}</Menu.Label>
                <Menu.Item>
                  <AppText className="text-xl">🎵</AppText>
                  <View className="flex-1">
                    <Menu.ItemTitle>{t`Music`}</Menu.ItemTitle>
                    <Menu.ItemDescription>
                      {t`Songs, albums & playlists`}
                    </Menu.ItemDescription>
                  </View>
                  <StyledChevronRightIcon
                    size={16}
                    colorClassName="accent-muted"
                    className="rtl:-scale-x-100"
                  />
                </Menu.Item>
                <Menu.Item>
                  <AppText className="text-xl">🎬</AppText>
                  <View className="flex-1">
                    <Menu.ItemTitle>{t`Movies`}</Menu.ItemTitle>
                    <Menu.ItemDescription>
                      {t`Trending & new releases`}
                    </Menu.ItemDescription>
                  </View>
                  <StyledChevronRightIcon
                    size={16}
                    colorClassName="accent-muted"
                    className="rtl:-scale-x-100"
                  />
                </Menu.Item>
                <Menu.Item>
                  <AppText className="text-xl">📚</AppText>
                  <View className="flex-1">
                    <Menu.ItemTitle>{t`Books`}</Menu.ItemTitle>
                    <Menu.ItemDescription>
                      {t`Bestsellers & more`}
                    </Menu.ItemDescription>
                  </View>
                  <StyledChevronRightIcon
                    size={16}
                    colorClassName="accent-muted"
                    className="rtl:-scale-x-100"
                  />
                </Menu.Item>
                <Menu.Item>
                  <AppText className="text-xl">🎮</AppText>
                  <View className="flex-1">
                    <Menu.ItemTitle>{t`Games`}</Menu.ItemTitle>
                    <Menu.ItemDescription>
                      {t`Popular & top rated`}
                    </Menu.ItemDescription>
                  </View>
                  <StyledChevronRightIcon
                    size={16}
                    colorClassName="accent-muted"
                    className="rtl:-scale-x-100"
                  />
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
                <Menu.ItemTitle>{t`Mark all as read`}</Menu.ItemTitle>
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
                <Menu.ItemTitle>{t`Clear all`}</Menu.ItemTitle>
              </Menu.Item>
              <Separator
                variant="thick"
                className="-mx-[5px] mb-3 opacity-25"
              />
              <Menu.Label className="mb-1">{t`Notify via`}</Menu.Label>
              <Menu.Group
                selectionMode="multiple"
                selectedKeys={channels}
                onSelectionChange={setChannels}
              >
                <Menu.Item id="email">
                  <Menu.ItemIndicator />
                  <Menu.ItemTitle>{t`Email`}</Menu.ItemTitle>
                </Menu.Item>
                <Separator className="-mx-[5px] my-1 opacity-75" />
                <Menu.Item id="push">
                  <Menu.ItemIndicator />
                  <Menu.ItemTitle>{t`Push`}</Menu.ItemTitle>
                </Menu.Item>
                <Separator className="-mx-[5px] my-1 opacity-75" />
                <Menu.Item id="sms">
                  <Menu.ItemIndicator />
                  <Menu.ItemTitle>{t`SMS`}</Menu.ItemTitle>
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

const SubMenuExampleContent = () => {
  const { t } = useLingui();

  return (
    <View className="flex-1 px-5">
      <View className="h-1/2 items-center justify-center ">
        <Menu>
          <Menu.Trigger asChild>
            <Button variant="secondary">{t`Editor Menu`}</Button>
          </Menu.Trigger>
          <Menu.Portal>
            <Menu.Overlay />
            <Menu.Content presentation="popover" width={240}>
              <Menu.Item>
                <SquarePlusIcon size={16} colorClassName="accent-muted" />
                <Menu.ItemTitle>{t`New Space`}</Menu.ItemTitle>
              </Menu.Item>
              <Separator
                variant="thick"
                className="-mx-[6px] mt-1 opacity-25"
              />
              <SubMenu>
                <SubMenu.Trigger textValue={t`Focus`}>
                  <SubMenu.TriggerIndicator />
                  <AppText className="flex-1 text-base font-medium text-foreground text-left">
                    {t`Focus`}
                  </AppText>
                </SubMenu.Trigger>
                <SubMenu.Content>
                  <Menu.Item>
                    <BellIcon size={16} colorClassName="accent-muted" />
                    <Menu.ItemTitle>{t`Zen Mode`}</Menu.ItemTitle>
                  </Menu.Item>
                  <Menu.Item>
                    <PersonIcon size={16} colorClassName="accent-muted" />
                    <Menu.ItemTitle>{t`Reader Mode`}</Menu.ItemTitle>
                  </Menu.Item>
                  <Menu.Item>
                    <LockIcon size={16} colorClassName="accent-muted" />
                    <Menu.ItemTitle>{t`Lock Tab`}</Menu.ItemTitle>
                  </Menu.Item>
                </SubMenu.Content>
              </SubMenu>
              <Separator
                variant="thick"
                className="-mx-[6px] mb-1 opacity-25"
              />
              <Menu.Item>
                <PencilIcon size={16} colorClassName="accent-muted" />
                <Menu.ItemTitle>{t`Heading 1`}</Menu.ItemTitle>
              </Menu.Item>
              <Menu.Item>
                <CopyIcon size={16} colorClassName="accent-muted" />
                <Menu.ItemTitle>{t`List`}</Menu.ItemTitle>
              </Menu.Item>
              <Menu.Item>
                <PersonIcon size={16} colorClassName="accent-muted" />
                <Menu.ItemTitle>{t`Task List`}</Menu.ItemTitle>
              </Menu.Item>
              <Separator className="mx-2 my-1 opacity-75" />
              <Menu.Item>
                <GlobeIcon size={16} colorClassName="accent-muted" />
                <Menu.ItemTitle>{t`Add Wikilink`}</Menu.ItemTitle>
              </Menu.Item>
              <Menu.Item>
                <PaletteIcon size={16} colorClassName="accent-muted" />
                <Menu.ItemTitle>{t`Configure Menu`}</Menu.ItemTitle>
              </Menu.Item>
            </Menu.Content>
          </Menu.Portal>
        </Menu>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const SubMenuGroupsContent = () => {
  const { t } = useLingui();
  const [notifyChannels, setNotifyChannels] = useState<Set<MenuKey>>(
    () => new Set(['email', 'push'])
  );
  const [privacy, setPrivacy] = useState<Set<MenuKey>>(
    () => new Set(['friends'])
  );

  return (
    <View className="flex-1 px-5">
      <View className="h-1/2 items-center justify-center">
        <Menu>
          <Menu.Trigger asChild>
            <Button variant="secondary">{t`Settings`}</Button>
          </Menu.Trigger>
          <Menu.Portal>
            <Menu.Overlay />
            <Menu.Content presentation="popover" width={260}>
              <Menu.Item>
                <PersonIcon size={16} colorClassName="accent-muted" />
                <Menu.ItemTitle>{t`Account`}</Menu.ItemTitle>
              </Menu.Item>
              <Menu.Item>
                <PaletteIcon size={16} colorClassName="accent-muted" />
                <Menu.ItemTitle>{t`Appearance`}</Menu.ItemTitle>
              </Menu.Item>
              <Separator
                variant="thick"
                className="-mx-[6px] mt-1 opacity-25"
              />
              <SubMenu>
                <SubMenu.Trigger textValue={t`Notifications`}>
                  <BellIcon size={16} colorClassName="accent-muted" />
                  <AppText className="flex-1 text-base font-medium text-foreground text-left">
                    {t`Notifications`}
                  </AppText>
                  <SubMenu.TriggerIndicator />
                </SubMenu.Trigger>
                <SubMenu.Content>
                  <Menu.Label className="mb-1">{t`Channels`}</Menu.Label>
                  <Menu.Group
                    selectionMode="multiple"
                    selectedKeys={notifyChannels}
                    onSelectionChange={setNotifyChannels}
                    shouldCloseOnSelect={false}
                  >
                    <Menu.Item id="email">
                      <Menu.ItemIndicator />
                      <Menu.ItemTitle>{t`Email`}</Menu.ItemTitle>
                    </Menu.Item>
                    <Menu.Item id="push">
                      <Menu.ItemIndicator />
                      <Menu.ItemTitle>{t`Push`}</Menu.ItemTitle>
                    </Menu.Item>
                    <Menu.Item id="sms">
                      <Menu.ItemIndicator />
                      <Menu.ItemTitle>{t`SMS`}</Menu.ItemTitle>
                    </Menu.Item>
                  </Menu.Group>
                  <Separator className="mx-2 my-2 opacity-75" />
                  <Menu.Label className="mb-1">{t`Visible to`}</Menu.Label>
                  <Menu.Group
                    selectionMode="single"
                    selectedKeys={privacy}
                    onSelectionChange={setPrivacy}
                    shouldCloseOnSelect={false}
                    disallowEmptySelection
                  >
                    <Menu.Item id="everyone">
                      <Menu.ItemIndicator variant="dot" />
                      <Menu.ItemTitle>{t`Everyone`}</Menu.ItemTitle>
                    </Menu.Item>
                    <Menu.Item id="friends">
                      <Menu.ItemIndicator variant="dot" />
                      <Menu.ItemTitle>{t`Friends Only`}</Menu.ItemTitle>
                    </Menu.Item>
                    <Menu.Item id="nobody">
                      <Menu.ItemIndicator variant="dot" />
                      <Menu.ItemTitle>{t`Nobody`}</Menu.ItemTitle>
                    </Menu.Item>
                  </Menu.Group>
                </SubMenu.Content>
              </SubMenu>
              <Separator
                variant="thick"
                className="-mx-[6px] mb-1 opacity-25"
              />
              <Menu.Item>
                <LockIcon size={16} colorClassName="accent-muted" />
                <Menu.ItemTitle>{t`Privacy`}</Menu.ItemTitle>
              </Menu.Item>
              <Menu.Item>
                <GlobeIcon size={16} colorClassName="accent-muted" />
                <Menu.ItemTitle>{t`Language`}</Menu.ItemTitle>
              </Menu.Item>
            </Menu.Content>
          </Menu.Portal>
        </Menu>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const TwoSubMenusContent = () => {
  const { t } = useLingui();

  return (
    <View className="flex-1 px-5">
      <View className="h-1/2 items-center justify-center">
        <Menu>
          <Menu.Trigger asChild>
            <Button variant="secondary">{t`Project`}</Button>
          </Menu.Trigger>
          <Menu.Portal>
            <Menu.Overlay />
            <Menu.Content presentation="popover" width={250}>
              <Menu.Item>
                <SquarePlusIcon size={16} colorClassName="accent-muted" />
                <Menu.ItemTitle>{t`New Project`}</Menu.ItemTitle>
              </Menu.Item>
              <Menu.Item>
                <PencilIcon size={16} colorClassName="accent-muted" />
                <Menu.ItemTitle>{t`Rename`}</Menu.ItemTitle>
              </Menu.Item>
              <Separator
                variant="thick"
                className="-mx-[6px] mt-1 opacity-25"
              />
              <SubMenu>
                <SubMenu.Trigger textValue={t`Share`}>
                  <PersonIcon size={16} colorClassName="accent-muted" />
                  <AppText className="flex-1 text-base font-medium text-foreground text-left">
                    {t`Share`}
                  </AppText>
                  <SubMenu.TriggerIndicator />
                </SubMenu.Trigger>
                <SubMenu.Content>
                  <Menu.Item>
                    <CopyIcon size={16} colorClassName="accent-muted" />
                    <Menu.ItemTitle>{t`Copy Link`}</Menu.ItemTitle>
                  </Menu.Item>
                  <Menu.Item>
                    <BellIcon size={16} colorClassName="accent-muted" />
                    <Menu.ItemTitle>{t`Email`}</Menu.ItemTitle>
                  </Menu.Item>
                  <Menu.Item>
                    <GlobeIcon size={16} colorClassName="accent-muted" />
                    <Menu.ItemTitle>{t`Social`}</Menu.ItemTitle>
                  </Menu.Item>
                </SubMenu.Content>
              </SubMenu>
              <SubMenu>
                <SubMenu.Trigger textValue={t`Export`}>
                  <GlobeIcon size={16} colorClassName="accent-muted" />
                  <AppText className="flex-1 text-base font-medium text-foreground text-left">
                    {t`Export`}
                  </AppText>
                  <SubMenu.TriggerIndicator />
                </SubMenu.Trigger>
                <SubMenu.Content>
                  <Menu.Item>
                    <LockIcon size={16} colorClassName="accent-muted" />
                    <Menu.ItemTitle>{t`PDF`}</Menu.ItemTitle>
                  </Menu.Item>
                  <Menu.Item>
                    <PaletteIcon size={16} colorClassName="accent-muted" />
                    <Menu.ItemTitle>{t`Image`}</Menu.ItemTitle>
                  </Menu.Item>
                  <Menu.Item>
                    <PencilIcon size={16} colorClassName="accent-muted" />
                    <Menu.ItemTitle>{t`Markdown`}</Menu.ItemTitle>
                  </Menu.Item>
                </SubMenu.Content>
              </SubMenu>
              <Separator
                variant="thick"
                className="-mx-[6px] mb-1 opacity-25"
              />
              <Menu.Item variant="danger">
                <TrashIcon size={16} colorClassName="accent-danger" />
                <Menu.ItemTitle>{t`Delete Project`}</Menu.ItemTitle>
              </Menu.Item>
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
    label: msg`Basic usage`,
    content: <BasicUsageContent />,
  },
  {
    value: 'sections',
    label: msg`Sections`,
    content: <SectionsContent />,
  },
  {
    value: 'sub-menu',
    label: msg`Sub Menu`,
    content: <SubMenuExampleContent />,
  },
  {
    value: 'two-sub-menus',
    label: msg`Two Sub Menus`,
    content: <TwoSubMenusContent />,
  },
  {
    value: 'sub-menu-groups',
    label: msg`Sub Menu Groups`,
    content: <SubMenuGroupsContent />,
  },
  {
    value: 'placements',
    label: msg`Placements`,
    content: <PlacementsContent />,
  },
];

export default function MenuScreen() {
  return <UsageVariantFlatList data={MENU_VARIANTS} />;
}
