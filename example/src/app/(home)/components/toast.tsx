import Feather from '@expo/vector-icons/Feather';
import Octicons from '@expo/vector-icons/Octicons';
import { Button, useToast, type ToastComponentProps } from 'heroui-native';
import { useCallback } from 'react';
import { View } from 'react-native';
import { withUniwind } from 'uniwind';
import type { UsageVariant } from '../../../components/component-presentation/types';
import { UsageVariantFlatList } from '../../../components/component-presentation/usage-variant-flatlist';
import {
  LoadingToast,
  useLoadingState,
} from '../../../components/toast/loading-toast';

const StyledFeather = withUniwind(Feather);
const StyledOcticons = withUniwind(Octicons);

// ------------------------------------------------------------------------------

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
      <Button onPress={() => toast.hide('all')} variant="destructive-soft">
        Hide all toasts
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
      <Button onPress={() => toast.hide('all')} variant="destructive-soft">
        Hide all toasts
      </Button>
    </View>
  );
};

// ------------------------------------------------------------------------------

const CustomToastsContent = () => {
  const { toast } = useToast();
  const TOAST_ID = 'loading-toast';
  const { isLoading, setIsLoading } = useLoadingState();

  /**
   * Simulates loading data (e.g., API call, file upload, etc.)
   * In a real app, this would be an actual async operation
   */
  const loadData = async (): Promise<void> => {
    /**
     * Simulate network delay or processing time
     */
    await new Promise((resolve) => setTimeout(resolve, 2000));
  };

  const renderLoadingToast = useCallback((props: ToastComponentProps) => {
    return <LoadingToast {...props} />;
  }, []);

  const handleShowLoadingToast = async () => {
    /**
     * Set loading to true and show toast
     */
    setIsLoading(true);
    toast.show({
      id: TOAST_ID,
      duration: 'persistent',
      component: renderLoadingToast,
    });

    try {
      /**
       * Perform the actual async operation
       */
      await loadData();
    } catch (error) {
      /**
       * Handle errors if needed
       */
      console.error('Failed to load data:', error);
    } finally {
      /**
       * Set loading to false when operation completes
       */
      setIsLoading(false);
    }
  };

  return (
    <View className="flex-1 items-center justify-center px-5 gap-5">
      <Button
        variant="secondary"
        onPress={handleShowLoadingToast}
        isDisabled={isLoading}
      >
        {isLoading ? 'Loading...' : 'Load data'}
      </Button>

      <Button onPress={() => toast.hide('all')} variant="destructive-soft">
        Hide all toasts
      </Button>
    </View>
  );
};

// ------------------------------------------------------------------------------

const TOAST_VARIANTS: UsageVariant[] = [
  {
    value: 'default-variants',
    label: 'Default variants',
    content: <DefaultVariantsContent />,
  },
  {
    value: 'different-content-sizes',
    label: 'Different content sizes',
    content: <DifferentContentSizesContent />,
  },
  {
    value: 'custom-toasts',
    label: 'Custom toasts',
    content: <CustomToastsContent />,
  },
];

export default function ToastScreen() {
  return <UsageVariantFlatList data={TOAST_VARIANTS} />;
}
