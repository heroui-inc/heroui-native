import { Button, Menu, Separator } from 'heroui-native';
import { View } from 'react-native';
import type { UsageVariant } from '../../../components/component-presentation/types';
import { UsageVariantFlatList } from '../../../components/component-presentation/usage-variant-flatlist';
import { LinkIcon } from '../../../components/icons/link';
import { PencilIcon } from '../../../components/icons/pencil';
import { PlusIcon } from '../../../components/icons/plus';
import { TrashIcon } from '../../../components/icons/trash';

const BasicUsageContent = () => {
  return (
    <View className="flex-1 px-5 items-center justify-center">
      <Menu>
        <Menu.Trigger asChild>
          <Button variant="secondary">Actions</Button>
        </Menu.Trigger>
        <Menu.Portal>
          <Menu.Overlay />
          <Menu.Content presentation="popover" width={200} className="gap-1.5">
            <Menu.Item>
              <Menu.ItemTitle>New file</Menu.ItemTitle>
              <PlusIcon size={14} colorClassName="accent-muted" />
            </Menu.Item>
            <Menu.Item>
              <Menu.ItemTitle>Copy link</Menu.ItemTitle>
              <LinkIcon size={14} colorClassName="accent-muted" />
            </Menu.Item>
            <Menu.Item>
              <Menu.ItemTitle>Edit file</Menu.ItemTitle>
              <PencilIcon size={14} colorClassName="accent-muted" />
            </Menu.Item>
            <Separator className="mx-2 opacity-75" />
            <Menu.Item variant="danger">
              <Menu.ItemTitle>Delete file</Menu.ItemTitle>
              <TrashIcon size={14} colorClassName="accent-danger" />
            </Menu.Item>
          </Menu.Content>
        </Menu.Portal>
      </Menu>
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
