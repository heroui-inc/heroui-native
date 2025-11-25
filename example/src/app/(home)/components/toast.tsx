/* eslint-disable react/no-unstable-nested-components */
import {
  Button,
  Toast,
  useToast,
  type ToastComponentProps,
} from 'heroui-native';
import { View } from 'react-native';
import { toast as sonnerToast } from 'sonner-native';
import type { UsageVariant } from '../../../components/component-presentation/types';
import { UsageVariantFlatList } from '../../../components/component-presentation/usage-variant-flatlist';

// const AllVariantsContent = () => {
//   return (
//     <View className="flex-1 px-5">
//       <View className="flex-1 justify-center gap-4">
//         {/* Default variant */}
//         <Toast variant="default" className="flex-row items-center gap-3">
//           <View className="flex-1">
//             <Toast.Label>Default notification</Toast.Label>
//             <Toast.Description>
//               This is a default toast message
//             </Toast.Description>
//           </View>
//           <Toast.Action>Action</Toast.Action>
//         </Toast>

//         {/* Accent variant */}
//         <Toast variant="accent" className="flex-row items-center gap-3">
//           <View className="flex-1">
//             <Toast.Label>Accent notification</Toast.Label>
//             <Toast.Description>
//               This is an accent toast message
//             </Toast.Description>
//           </View>
//           <Toast.Action>Action</Toast.Action>
//         </Toast>

//         {/* Success variant */}
//         <Toast variant="success" className="flex-row items-center gap-3">
//           <View className="flex-1">
//             <Toast.Label>Success notification</Toast.Label>
//             <Toast.Description>
//               This is a success toast message
//             </Toast.Description>
//           </View>
//           <Toast.Action>Action</Toast.Action>
//         </Toast>

//         {/* Warning variant */}
//         <Toast variant="warning" className="flex-row items-center gap-3">
//           <View className="flex-1">
//             <Toast.Label>Warning notification</Toast.Label>
//             <Toast.Description>
//               This is a warning toast message
//             </Toast.Description>
//           </View>
//           <Toast.Action>Action</Toast.Action>
//         </Toast>

//         {/* Danger variant */}
//         <Toast variant="danger" className="flex-row items-center gap-3">
//           <View className="flex-1">
//             <Toast.Label>Danger notification</Toast.Label>
//             <Toast.Description>
//               This is a danger toast message
//             </Toast.Description>
//           </View>
//           <Toast.Action>Action</Toast.Action>
//         </Toast>
//       </View>
//     </View>
//   );
// };

// ------------------------------------------------------------------------------

const MyToast = (props: ToastComponentProps) => {
  const { id, hide } = props;

  return (
    <Toast
      variant="accent"
      duration="persistent"
      className="flex-row items-center gap-3"
      isSwipable={false}
      {...props}
    >
      <View className="flex-1">
        <Toast.Label>{id}</Toast.Label>
        <Toast.Description>
          Use buttons below to control this toast
        </Toast.Description>
      </View>
      <Toast.Action onPress={() => hide(id)}>Close</Toast.Action>
    </Toast>
  );
};

const InteractiveDemoContent = () => {
  const { toast } = useToast();

  const _renderToast = (props: ToastComponentProps) => <MyToast {...props} />;

  return (
    <View className="flex-1 px-5">
      <View className="flex-1 justify-center gap-3">
        <Button
          onPress={() => {
            toast.show({
              // id: 'my-toast',
              component: _renderToast,
            });
          }}
          variant="primary"
        >
          Show Toast
        </Button>

        <Button onPress={() => toast.hide('my-toast')} variant="secondary">
          Hide Toast
        </Button>

        <Button onPress={() => toast.hide()} variant="destructive">
          Hide All Toasts
        </Button>

        <Button onPress={() => sonnerToast('Hello, World!')}>
          Sonner Toast
        </Button>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const MultipleToastsContent = () => {
  const { toast } = useToast();

  return (
    <View className="flex-1 px-5">
      <View className="flex-1 justify-center gap-3">
        <Button
          onPress={() => {
            // Show multiple toasts with custom IDs
            toast.show({
              id: 'toast-1',
              component: (props: ToastComponentProps) => (
                <Toast
                  variant="default"
                  placement="top"
                  className="flex-row items-center gap-3"
                  {...props}
                >
                  <View className="flex-1">
                    <Toast.Label>Toast 1</Toast.Label>
                    <Toast.Description>First toast at top</Toast.Description>
                  </View>
                  <Toast.Action onPress={() => props.hide(props.id)}>
                    Close
                  </Toast.Action>
                </Toast>
              ),
            });

            toast.show({
              id: 'toast-2',
              component: (props: ToastComponentProps) => (
                <Toast
                  variant="accent"
                  placement="top"
                  className="flex-row items-center gap-3"
                  {...props}
                >
                  <View className="flex-1">
                    <Toast.Label>Toast 2</Toast.Label>
                    <Toast.Description>Second toast at top</Toast.Description>
                  </View>
                  <Toast.Action onPress={() => props.hide(props.id)}>
                    Close
                  </Toast.Action>
                </Toast>
              ),
            });

            toast.show({
              id: 'toast-3',
              component: (props: ToastComponentProps) => (
                <Toast
                  variant="success"
                  placement="bottom"
                  className="flex-row items-center gap-3"
                  {...props}
                >
                  <View className="flex-1">
                    <Toast.Label>Toast 3</Toast.Label>
                    <Toast.Description>Third toast at bottom</Toast.Description>
                  </View>
                  <Toast.Action onPress={() => props.hide(props.id)}>
                    Close
                  </Toast.Action>
                </Toast>
              ),
            });
          }}
          variant="primary"
        >
          Show All Toasts
        </Button>

        <Button
          onPress={() => toast.hide(['toast-1', 'toast-2', 'toast-3'])}
          variant="secondary"
        >
          Hide Specific Toasts
        </Button>

        <Button onPress={() => toast.hide()} variant="destructive">
          Hide All Toasts
        </Button>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const TOAST_VARIANTS: UsageVariant[] = [
  {
    value: 'interactive-demo',
    label: 'Interactive Demo',
    content: <InteractiveDemoContent />,
  },
  {
    value: 'multiple-toasts',
    label: 'Multiple Toasts',
    content: <MultipleToastsContent />,
  },
];

export default function ToastScreen() {
  return <UsageVariantFlatList data={TOAST_VARIANTS} />;
}
