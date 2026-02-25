import type { MenuKey } from 'heroui-native';
import { Button, cn, Menu, Separator } from 'heroui-native';
import { useState } from 'react';
import { View } from 'react-native';
import { AppText } from '../../../components/app-text';
import type { UsageVariant } from '../../../components/component-presentation/types';
import { UsageVariantFlatList } from '../../../components/component-presentation/usage-variant-flatlist';
import { CopyIcon } from '../../../components/icons/copy';
import { PencilIcon } from '../../../components/icons/pencil';
import { SquarePlusIcon } from '../../../components/icons/square-plus';
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
                <Menu.Label className="ml-3 mb-1">Actions</Menu.Label>
                <View className={cn('gap-1', isBottomSheet && 'gap-2')}>
                  <Menu.Item className="items-start">
                    <View className="mt-1">
                      <SquarePlusIcon size={16} colorClassName="accent-muted" />
                    </View>
                    <View className="flex-1">
                      <Menu.ItemTitle>New file</Menu.ItemTitle>
                      <Menu.ItemDescription>
                        Create a new file
                      </Menu.ItemDescription>
                    </View>
                  </Menu.Item>
                  <Menu.Item className="items-start">
                    <View className="mt-1">
                      <CopyIcon size={16} colorClassName="accent-muted" />
                    </View>
                    <View className="flex-1">
                      <Menu.ItemTitle>Copy link</Menu.ItemTitle>
                      <Menu.ItemDescription>
                        Copy the file link
                      </Menu.ItemDescription>
                    </View>
                  </Menu.Item>
                  <Menu.Item className="items-start">
                    <View className="mt-1">
                      <PencilIcon size={16} colorClassName="accent-muted" />
                    </View>
                    <View className="flex-1">
                      <Menu.ItemTitle>Edit file</Menu.ItemTitle>
                      <Menu.ItemDescription>
                        Make changes to the file
                      </Menu.ItemDescription>
                    </View>
                  </Menu.Item>
                </View>
                <Separator className="mx-2 mt-2 mb-3 opacity-75" />
                <Menu.Label className="ml-3 mb-1">Danger zone</Menu.Label>
                <Menu.Item className="items-start" variant="danger">
                  <View className="mt-1">
                    <TrashIcon size={16} colorClassName="accent-danger" />
                  </View>
                  <View className="flex-1">
                    <Menu.ItemTitle>Delete file</Menu.ItemTitle>
                    <Menu.ItemDescription>Move to trash</Menu.ItemDescription>
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
              <Button variant="secondary">Styles</Button>
            </Menu.Trigger>
            <Menu.Portal>
              <Menu.Overlay />
              <Menu.Content presentation="popover" width={250}>
                <Menu.Label className="ml-3 mb-1">Text Style</Menu.Label>
                <Menu.Group
                  selectionMode="multiple"
                  selectedKeys={textStyles}
                  onSelectionChange={setTextStyles}
                  shouldCloseOnSelect={shouldCloseOnSelect}
                >
                  <Menu.Item id="bold">
                    <Menu.ItemIndicator />
                    <Menu.ItemTitle>Bold</Menu.ItemTitle>
                    <AppText className="text-sm text-muted">⌘ B</AppText>
                  </Menu.Item>
                  <Menu.Item id="italic">
                    <Menu.ItemIndicator />
                    <Menu.ItemTitle>Italic</Menu.ItemTitle>
                    <AppText className="text-sm text-muted">⌘ I</AppText>
                  </Menu.Item>
                  <Menu.Item id="underline">
                    <Menu.ItemIndicator />
                    <Menu.ItemTitle>Underline</Menu.ItemTitle>
                    <AppText className="text-sm text-muted">⌘ U</AppText>
                  </Menu.Item>
                </Menu.Group>
                <Separator className="mx-2 my-2 opacity-75" />
                <Menu.Label className="ml-3 mb-1">Text Alignment</Menu.Label>
                <Menu.Group
                  selectionMode="single"
                  selectedKeys={alignment}
                  onSelectionChange={setAlignment}
                  shouldCloseOnSelect={shouldCloseOnSelect}
                >
                  <Menu.Item id="left">
                    <Menu.ItemIndicator variant="dot" />
                    <Menu.ItemTitle>Left</Menu.ItemTitle>
                    <AppText className="text-sm text-muted">⌥ A</AppText>
                  </Menu.Item>
                  <Menu.Item id="center">
                    <Menu.ItemIndicator variant="dot" />
                    <Menu.ItemTitle>Center</Menu.ItemTitle>
                    <AppText className="text-sm text-muted">⌥ H</AppText>
                  </Menu.Item>
                  <Menu.Item id="right">
                    <Menu.ItemIndicator variant="dot" />
                    <Menu.ItemTitle>Right</Menu.ItemTitle>
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
];

export default function MenuScreen() {
  return <UsageVariantFlatList data={MENU_VARIANTS} />;
}
