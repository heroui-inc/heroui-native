import { Button, Menu, Separator } from 'heroui-native';
import { View } from 'react-native';
import { AppText } from '../../../components/app-text';
import type { UsageVariant } from '../../../components/component-presentation/types';
import { UsageVariantFlatList } from '../../../components/component-presentation/usage-variant-flatlist';
import { CopyIcon } from '../../../components/icons/copy';
import { PencilIcon } from '../../../components/icons/pencil';
import { SquarePlusIcon } from '../../../components/icons/square-plus';
import { TrashIcon } from '../../../components/icons/trash';

const BasicUsageContent = () => {
  return (
    <View className="flex-1 px-5">
      <View className="h-1/2 items-center justify-center">
        <Menu>
          <Menu.Trigger asChild>
            <Button variant="secondary">Actions</Button>
          </Menu.Trigger>
          <Menu.Portal>
            <Menu.Overlay />
            <Menu.Content presentation="popover" width={250}>
              <AppText className="text-sm font-medium text-muted ml-3 mb-1">
                Actions
              </AppText>
              <Menu.Item className="items-start">
                <View className="mt-1">
                  <SquarePlusIcon size={16} colorClassName="accent-muted" />
                </View>
                <View className="flex-1">
                  <Menu.ItemTitle>New file</Menu.ItemTitle>
                  <Menu.ItemDescription>Create a new file</Menu.ItemDescription>
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
              <Separator className="mx-2 mt-2 mb-3 opacity-75" />
              <AppText className="text-sm font-medium text-muted ml-3 mb-1">
                Danger zone
              </AppText>
              <Menu.Item className="items-start" variant="danger" isDisabled>
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
  );
};

// ------------------------------------------------------------------------------

const MENU_VARIANTS: UsageVariant[] = [
  {
    value: 'basic-usage',
    label: 'Basic usage',
    content: <BasicUsageContent />,
  },
];

export default function MenuScreen() {
  return <UsageVariantFlatList data={MENU_VARIANTS} />;
}
