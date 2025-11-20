import { Toast } from 'heroui-native';
import { View } from 'react-native';
import type { UsageVariant } from '../../../components/component-presentation/types';
import { UsageVariantFlatList } from '../../../components/component-presentation/usage-variant-flatlist';

const AllVariantsContent = () => {
  return (
    <View className="flex-1 px-5">
      <View className="flex-1 justify-center gap-4">
        {/* Default variant */}
        <Toast variant="default" className="flex-row items-center gap-3">
          <View className="flex-1">
            <Toast.Label>Default notification</Toast.Label>
            <Toast.Description>
              This is a default toast message
            </Toast.Description>
          </View>
          <Toast.Action>Action</Toast.Action>
        </Toast>

        {/* Accent variant */}
        <Toast variant="accent" className="flex-row items-center gap-3">
          <View className="flex-1">
            <Toast.Label>Accent notification</Toast.Label>
            <Toast.Description>
              This is an accent toast message
            </Toast.Description>
          </View>
          <Toast.Action>Action</Toast.Action>
        </Toast>

        {/* Success variant */}
        <Toast variant="success" className="flex-row items-center gap-3">
          <View className="flex-1">
            <Toast.Label>Success notification</Toast.Label>
            <Toast.Description>
              This is a success toast message
            </Toast.Description>
          </View>
          <Toast.Action>Action</Toast.Action>
        </Toast>

        {/* Warning variant */}
        <Toast variant="warning" className="flex-row items-center gap-3">
          <View className="flex-1">
            <Toast.Label>Warning notification</Toast.Label>
            <Toast.Description>
              This is a warning toast message
            </Toast.Description>
          </View>
          <Toast.Action>Action</Toast.Action>
        </Toast>

        {/* Danger variant */}
        <Toast variant="danger" className="flex-row items-center gap-3">
          <View className="flex-1">
            <Toast.Label>Danger notification</Toast.Label>
            <Toast.Description>
              This is a danger toast message
            </Toast.Description>
          </View>
          <Toast.Action>Action</Toast.Action>
        </Toast>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const TOAST_VARIANTS: UsageVariant[] = [
  {
    value: 'all-variants',
    label: 'All variants',
    content: <AllVariantsContent />,
  },
];

export default function ToastScreen() {
  return <UsageVariantFlatList data={TOAST_VARIANTS} />;
}
