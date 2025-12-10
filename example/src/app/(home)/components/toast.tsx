import Entypo from '@expo/vector-icons/Entypo';
import Feather from '@expo/vector-icons/Feather';
import Octicons from '@expo/vector-icons/Octicons';
import { useRouter } from 'expo-router';
import {
  Button,
  useThemeColor,
  useToast,
  type ToastComponentProps,
} from 'heroui-native';
import { useCallback, useRef, useState } from 'react';
import { Platform, TextInput, View } from 'react-native';
import { withUniwind } from 'uniwind';
import type { UsageVariant } from '../../../components/component-presentation/types';
import { UsageVariantFlatList } from '../../../components/component-presentation/usage-variant-flatlist';
import { Logo } from '../../../components/logo';
import { AchievementToast } from '../../../components/toast/achievement-toast';
import {
  LoadingToast,
  useLoadingState,
} from '../../../components/toast/loading-toast';
import {
  ProgressToast,
  useProgressState,
} from '../../../components/toast/progress-toast';

const StyledFeather = withUniwind(Feather);
const StyledOcticons = withUniwind(Octicons);
const StyledEntypo = withUniwind(Entypo);

// ------------------------------------------------------------------------------

const DefaultVariantsContent = () => {
  const { toast } = useToast();
  const themeColorForeground = useThemeColor('foreground');

  return (
    <View className="flex-1 items-center justify-center px-5 gap-5">
      <Button
        variant="secondary"
        onPress={() =>
          toast.show({
            variant: 'default',
            label: 'Join a team',
            description:
              'Junior Garcia sent you an invitation to join HeroUI team!',
            icon: (
              <View className="mt-0.5">
                <Logo
                  themeColorForeground={themeColorForeground}
                  width={15}
                  height={20.77}
                />
              </View>
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
              <StyledEntypo
                name="info-with-circle"
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
                size={16}
                className="text-success mt-[3px]"
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
                size={16}
                className="text-warning mt-[3px]"
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
      <Button onPress={() => toast.hide('all')} variant="danger-soft">
        Hide all toasts
      </Button>
    </View>
  );
};

// ------------------------------------------------------------------------------

const PlacementVariantsContent = () => {
  const [isTopToastVisible, setIsTopToastVisible] = useState(false);
  const [isBottomToastVisible, setIsBottomToastVisible] = useState(false);

  const { toast } = useToast();

  const showTopToast = () =>
    toast.show({
      variant: 'success',
      placement: 'top',
      label: 'You have upgraded your plan',
      description: 'You can continue using HeroUI Chat',
      icon: (
        <StyledOcticons
          name="shield-check"
          size={16}
          className="text-success mt-[3px]"
        />
      ),
      actionLabel: 'Close',
      onActionPress: ({ hide }) => hide(),
    });

  const showBottomToast = () =>
    toast.show({
      variant: 'warning',
      placement: 'bottom',
      label: 'You have no credits left',
      description: 'Upgrade to a paid plan to continue',
      icon: (
        <StyledOcticons
          name="shield"
          size={16}
          className="text-warning mt-[3px]"
        />
      ),
      actionLabel: 'Close',
      onActionPress: ({ hide }) => hide(),
    });

  return (
    <View className="flex-1 items-center justify-center px-5 gap-5">
      <Button
        variant="secondary"
        onPress={() => {
          setIsTopToastVisible(true);
          if (isBottomToastVisible) {
            toast.hide('all');
            setIsBottomToastVisible(false);
            setTimeout(() => {
              showTopToast();
            }, 300);
          }
          if (!isBottomToastVisible) {
            showTopToast();
          }
        }}
      >
        Top toast
      </Button>
      <Button
        variant="secondary"
        onPress={() => {
          setIsBottomToastVisible(true);
          if (isTopToastVisible) {
            toast.hide('all');
            setIsTopToastVisible(false);
            setTimeout(() => {
              showBottomToast();
            }, 300);
          }
          if (!isTopToastVisible) {
            showBottomToast();
          }
        }}
      >
        Bottom toast
      </Button>
      <Button onPress={() => toast.hide('all')} variant="danger-soft">
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
      <Button onPress={() => toast.hide('all')} variant="danger-soft">
        Hide all toasts
      </Button>
    </View>
  );
};

// ------------------------------------------------------------------------------

const KeyboardAvoidingContent = () => {
  const [isFocused, setIsFocused] = useState(false);

  const { toast } = useToast();

  const inputRef = useRef<TextInput>(null);

  const themeColorForeground = useThemeColor('foreground');

  return (
    <View className="flex-1 items-center justify-center px-5 gap-5">
      <Button
        variant="secondary"
        onPress={() => {
          toast.show({
            id: 'keyboard-avoiding-toast',
            variant: 'default',
            placement: 'bottom',
            duration: 'persistent',
            label: 'Join a team',
            description:
              'Junior Garcia sent you an invitation to join HeroUI team!',
            icon: (
              <View className="mt-0.5">
                <Logo
                  themeColorForeground={themeColorForeground}
                  width={15}
                  height={20.77}
                />
              </View>
            ),
            actionLabel: 'Close',
            onActionPress: ({ hide }) => hide(),
            onHide: () => {
              inputRef.current?.blur();
            },
          });
        }}
      >
        Show toast
      </Button>
      <Button
        onPress={() => {
          if (isFocused) {
            inputRef.current?.blur();
          } else {
            inputRef.current?.focus();
          }
        }}
        variant="secondary"
      >
        Toggle keyboard
      </Button>
      <Button onPress={() => toast.hide('all')} variant="danger-soft">
        Hide toast
      </Button>
      <TextInput
        ref={inputRef}
        className="opacity-0 pointer-events-none"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </View>
  );
};

// ------------------------------------------------------------------------------

const FromNativeModalContent = () => {
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center px-5 gap-5">
      <Button
        variant="secondary"
        onPress={() => router.push('components/toast-native-modal')}
      >
        Open modal
      </Button>
    </View>
  );
};

// ------------------------------------------------------------------------------

const CustomToastsContent = () => {
  const { toast, isToastVisible } = useToast();
  const LOADING_TOAST_ID = 'loading-toast';
  const PROGRESS_TOAST_ID = 'progress-toast';
  const { setIsLoading } = useLoadingState();
  const { setProgress, resetProgress } = useProgressState();

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

  /**
   * Simulates file upload with progress updates
   * In a real app, this would be an actual upload operation with progress callbacks
   */
  const simulateUpload = async (): Promise<void> => {
    resetProgress();
    const totalSteps = 100;
    const stepDuration = 30; // milliseconds per step

    for (let i = 0; i <= totalSteps; i++) {
      await new Promise((resolve) => setTimeout(resolve, stepDuration));
      setProgress(i);
    }
  };

  const renderLoadingToast = useCallback((props: ToastComponentProps) => {
    return <LoadingToast {...props} />;
  }, []);

  const renderProgressToast = useCallback((props: ToastComponentProps) => {
    return <ProgressToast {...props} />;
  }, []);

  const renderAchievementToast = useCallback((props: ToastComponentProps) => {
    return <AchievementToast {...props} />;
  }, []);

  const handleShowLoadingToast = async () => {
    /**
     * Set loading to true and show toast
     */
    setIsLoading(true);
    toast.show({
      id: LOADING_TOAST_ID,
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

  const handleShowProgressToast = async () => {
    /**
     * Reset progress and show toast
     */
    resetProgress();
    toast.show({
      id: PROGRESS_TOAST_ID,
      duration: 'persistent',
      component: renderProgressToast,
    });

    try {
      /**
       * Simulate the upload operation with progress updates
       */
      await simulateUpload();
    } catch (error) {
      /**
       * Handle errors if needed
       */
      console.error('Failed to upload:', error);
    }
  };

  return (
    <View className="flex-1 items-center justify-center px-5 gap-5">
      <Button
        variant="secondary"
        onPress={() => {
          toast.show({
            id: 'achievement-toast',
            duration: 'persistent',
            component: renderAchievementToast,
          });
        }}
        isDisabled={isToastVisible}
      >
        Achievement toast
      </Button>

      <Button
        variant="secondary"
        onPress={handleShowLoadingToast}
        isDisabled={isToastVisible}
      >
        Load data
      </Button>

      <Button
        variant="secondary"
        onPress={handleShowProgressToast}
        isDisabled={isToastVisible}
      >
        Start upload
      </Button>

      <Button onPress={() => toast.hide('all')} variant="danger-soft">
        Hide all toasts
      </Button>
    </View>
  );
};

// ------------------------------------------------------------------------------

const TOAST_VARIANTS_IOS: UsageVariant[] = [
  {
    value: 'default-variants',
    label: 'Default variants',
    content: <DefaultVariantsContent />,
  },
  {
    value: 'placement-variants',
    label: 'Placement variants',
    content: <PlacementVariantsContent />,
  },
  {
    value: 'different-content-sizes',
    label: 'Different content sizes',
    content: <DifferentContentSizesContent />,
  },
  {
    value: 'keyboard-avoiding',
    label: 'Keyboard avoiding',
    content: <KeyboardAvoidingContent />,
  },
  {
    value: 'from-native-modal',
    label: 'From native modal',
    content: <FromNativeModalContent />,
  },
  {
    value: 'custom-toasts',
    label: 'Custom toasts',
    content: <CustomToastsContent />,
  },
];

const TOAST_VARIANTS_ANDROID: UsageVariant[] = [
  {
    value: 'default-variants',
    label: 'Default variants',
    content: <DefaultVariantsContent />,
  },
  {
    value: 'placement-variants',
    label: 'Placement variants',
    content: <PlacementVariantsContent />,
  },
  {
    value: 'different-content-sizes',
    label: 'Different content sizes',
    content: <DifferentContentSizesContent />,
  },
  {
    value: 'keyboard-avoiding',
    label: 'Keyboard avoiding',
    content: <KeyboardAvoidingContent />,
  },
  {
    value: 'custom-toasts',
    label: 'Custom toasts',
    content: <CustomToastsContent />,
  },
];

export default function ToastScreen() {
  return (
    <UsageVariantFlatList
      data={Platform.OS === 'ios' ? TOAST_VARIANTS_IOS : TOAST_VARIANTS_ANDROID}
    />
  );
}
