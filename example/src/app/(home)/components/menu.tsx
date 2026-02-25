import { Button, Menu } from 'heroui-native';
import { View } from 'react-native';
import type { UsageVariant } from '../../../components/component-presentation/types';
import { UsageVariantFlatList } from '../../../components/component-presentation/usage-variant-flatlist';

const BasicUsageContent = () => {
  return (
    <View className="flex-1 px-5 items-center justify-center">
      <Menu>
        <Menu.Trigger asChild>
          <Button variant="secondary">Actions</Button>
        </Menu.Trigger>
        <Menu.Portal>
          <Menu.Overlay />
          <Menu.Content presentation="popover" width={200}>
            <Menu.Item>
              <Menu.ItemTitle>New file</Menu.ItemTitle>
            </Menu.Item>
            <Menu.Item>
              <Menu.ItemTitle>Copy link</Menu.ItemTitle>
            </Menu.Item>
            <Menu.Item>
              <Menu.ItemTitle>Edit file</Menu.ItemTitle>
            </Menu.Item>
            <Menu.Item>
              <Menu.ItemTitle className="text-danger">
                Delete file
              </Menu.ItemTitle>
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
