/* eslint-disable react/no-unstable-nested-components */
import Feather from '@expo/vector-icons/Feather';
import Octicons from '@expo/vector-icons/Octicons';
import {
  Button,
  Toast,
  useToast,
  type ToastComponentProps,
} from 'heroui-native';
import { useCallback } from 'react';
import { View } from 'react-native';
import { toast as sonnerToast } from 'sonner-native';
import { withUniwind } from 'uniwind';
import type { UsageVariant } from '../../../components/component-presentation/types';
import { UsageVariantFlatList } from '../../../components/component-presentation/usage-variant-flatlist';

const StyledFeather = withUniwind(Feather);
const StyledOcticons = withUniwind(Octicons);

const DefaultVariantsContent = () => {
  const { toast } = useToast();

  return (
    <View className="flex-1 items-center justify-center px-5 gap-5">
      <Button
        variant="secondary"
        onPress={() =>
          toast.show({
            variant: 'default',
            label: 'Join a team',
            description: 'Junior sent you an invitation to join HeroUI team',
            icon: (
              <StyledFeather
                name="users"
                size={15}
                className="text-foreground mt-[3px]"
              />
            ),
            actionLabel: 'Close',
            onActionPress: ({ hide }) => hide(),
          })
        }
      >
        Default toast
      </Button>
      <Button
        variant="secondary"
        onPress={() =>
          toast.show({
            variant: 'accent',
            label: 'You have 2 credits left',
            description: 'Get a paid plan for more credits',
            icon: (
              <StyledFeather
                name="info"
                size={18}
                className="text-accent mt-0.5"
              />
            ),
            actionLabel: 'Close',
            onActionPress: ({ hide }) => hide(),
          })
        }
      >
        Accent toast
      </Button>
      <Button
        variant="secondary"
        onPress={() =>
          toast.show({
            variant: 'success',
            label: 'You have upgraded your plan',
            description: 'You can continue using HeroUI Chat',
            icon: (
              <StyledOcticons
                name="shield-check"
                size={18}
                className="text-success mt-0.5"
              />
            ),
            actionLabel: 'Close',
            onActionPress: ({ hide }) => hide(),
          })
        }
      >
        Success toast
      </Button>
      <Button
        variant="secondary"
        onPress={() =>
          toast.show({
            variant: 'warning',
            label: 'You have no credits left',
            description: 'Upgrade to a paid plan to continue',
            icon: (
              <StyledOcticons
                name="shield"
                size={18}
                className="text-warning mt-0.5"
              />
            ),
            actionLabel: 'Close',
            onActionPress: ({ hide }) => hide(),
          })
        }
      >
        Warning toast
      </Button>
      <Button
        variant="secondary"
        onPress={() =>
          toast.show({
            variant: 'danger',
            label: 'Storage is full',
            description:
              "Remove files to release space. I'm adding more text as usual but it's okay I guess I just want to see how it looks with a lot of information",
            icon: (
              <StyledFeather
                name="hard-drive"
                size={16}
                className="text-danger mt-[3px]"
              />
            ),
            actionLabel: 'Close',
            onActionPress: ({ hide }) => hide(),
          })
        }
      >
        Danger toast
      </Button>
    </View>
  );
};

// ------------------------------------------------------------------------------

const DifferentContentSizesContent = () => {
  const { toast } = useToast();

  return (
    <View className="flex-1 items-center justify-center px-5 gap-5">
      <Button
        variant="secondary"
        onPress={() =>
          toast.show({
            variant: 'default',
            label: 'New message',
            description: 'Sarah sent you a message',
            actionLabel: 'Close',
            onActionPress: ({ hide }) => hide(),
          })
        }
      >
        Small toast
      </Button>
      <Button
        variant="secondary"
        onPress={() =>
          toast.show({
            variant: 'success',
            label: 'Payment successful',
            description:
              'Your subscription has been renewed. You will be charged $9.99/month. Thank you for your continued support.',
            actionLabel: 'Close',
            onActionPress: ({ hide }) => hide(),
          })
        }
      >
        Medium toast
      </Button>
      <Button
        variant="secondary"
        onPress={() =>
          toast.show({
            variant: 'success',
            label: 'Backup completed successfully',
            description:
              'All your files have been backed up to the cloud. You can now access them from any device. The backup includes 1,234 files totaling 2.5 GB. Your data is safe and secure. The next backup will run automatically in 24 hours.',
            actionLabel: 'Close',
            onActionPress: ({ hide }) => hide(),
          })
        }
      >
        Large toast
      </Button>
    </View>
  );
};

// ------------------------------------------------------------------------------

const MyToast1 = (props: ToastComponentProps) => {
  const { id, hide } = props;

  return (
    <Toast
      variant="success"
      className="flex-row items-center gap-3"
      classNames={{
        overlay: 'bg-green-500',
      }}
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

const MyToast2 = (props: ToastComponentProps) => {
  const { id, hide } = props;

  return (
    <Toast variant="success" className="flex-row items-center gap-3" {...props}>
      <View className="flex-1">
        <Toast.Label>{id}</Toast.Label>
        <Toast.Description>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nam tenetur
          maxime ab laboriosam qui praesentium facere? Ad dolor fugiat,
          molestiae esse laudantium sed ut ullam.
        </Toast.Description>
      </View>
      <Toast.Action onPress={() => hide()}>Close</Toast.Action>
    </Toast>
  );
};

const MyToast3 = (props: ToastComponentProps) => {
  const { id, hide } = props;

  return (
    <Toast variant="warning" className="flex-row items-center gap-3" {...props}>
      <View className="flex-1">
        <Toast.Label>{id}</Toast.Label>
        <Toast.Description>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nam tenetur
          maxime ab laboriosam qui praesentium facere? Ad dolor fugiat,
          molestiae esse laudantium sed ut ullam. Lorem, ipsum dolor sit amet
          consectetur adipisicing elit. Nam tenetur maxime ab laboriosam qui
          praesentium facere?
        </Toast.Description>
      </View>
      <Toast.Action onPress={() => hide(id)}>Close</Toast.Action>
    </Toast>
  );
};
const InteractiveDemoContent = () => {
  const { toast } = useToast();

  const _renderToast1 = useCallback(
    (props: ToastComponentProps) => <MyToast1 {...props} />,
    []
  );
  const _renderToast2 = useCallback(
    (props: ToastComponentProps) => <MyToast2 {...props} />,
    []
  );
  const _renderToast3 = useCallback(
    (props: ToastComponentProps) => <MyToast3 {...props} />,
    []
  );

  return (
    <View className="flex-1 px-5">
      <View className="flex-1 justify-center gap-3">
        <Button
          onPress={() =>
            toast.show({
              duration: 'persistent',
              component: _renderToast1,
            })
          }
          variant="primary"
        >
          Show Toast 1
        </Button>

        <Button
          onPress={() => {
            toast.show({
              duration: 5000,
              component: _renderToast2,
            });
          }}
          variant="primary"
        >
          Show Toast 2
        </Button>

        <Button
          onPress={() => {
            toast.show({
              duration: 5000,
              component: _renderToast3,
            });
          }}
          variant="primary"
        >
          Show Toast 3
        </Button>

        <Button onPress={() => toast.hide()} variant="destructive">
          Hide Last Toast
        </Button>

        <Button onPress={() => toast.hide('all')} variant="destructive">
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
    value: 'default-variants',
    label: 'Default Variants',
    content: <DefaultVariantsContent />,
  },
  {
    value: 'different-content-sizes',
    label: 'Different Content Sizes',
    content: <DifferentContentSizesContent />,
  },
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
