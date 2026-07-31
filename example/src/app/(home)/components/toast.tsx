import Feather from '@expo/vector-icons/Feather';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react/macro';
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
import { CircleInfoFillIcon } from '../../../components/icons/circle-info-fill';
import { ShieldCheckIcon } from '../../../components/icons/shield-check';
import { ShieldExclamationIcon } from '../../../components/icons/shield-exclamation';
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

// ------------------------------------------------------------------------------

const DefaultVariantsContent = () => {
  const { t } = useLingui();
  const { toast } = useToast();
  const themeColorForeground = useThemeColor('foreground');

  return (
    <View className="flex-1 items-center justify-center px-5 gap-5">
      <Button
        variant="secondary"
        onPress={() =>
          toast.show({
            variant: 'default',
            label: t`Join a team`,
            description: t`Junior Garcia sent you an invitation to join HeroUI team!`,
            icon: (
              <View className="mt-0.5">
                <Logo
                  themeColorForeground={themeColorForeground}
                  width={15}
                  height={20.77}
                />
              </View>
            ),
            actionLabel: t`Close`,
            onActionPress: ({ hide }) => hide(),
          })
        }
      >
        {t`Default toast`}
      </Button>
      <Button
        variant="secondary"
        onPress={() =>
          toast.show({
            variant: 'accent',
            label: t`You have 2 credits left`,
            description: t`Get a paid plan for more credits`,
            icon: (
              <View className="mt-0.5">
                <CircleInfoFillIcon
                  size={18}
                  colorClassName="accent-accent-soft-foreground"
                />
              </View>
            ),
            actionLabel: t`Close`,
            onActionPress: ({ hide }) => hide(),
          })
        }
      >
        {t`Accent toast`}
      </Button>
      <Button
        variant="secondary"
        onPress={() =>
          toast.show({
            variant: 'success',
            label: t`Plan upgraded`,
            description: t`You can continue using HeroUI Chat and more`,
            icon: (
              <View className="mt-0.5">
                <ShieldCheckIcon
                  size={20}
                  colorClassName="accent-success-soft-foreground"
                />
              </View>
            ),
            actionLabel: t`Close`,
            onActionPress: ({ hide }) => hide(),
          })
        }
      >
        {t`Success toast`}
      </Button>
      <Button
        variant="secondary"
        onPress={() =>
          toast.show({
            variant: 'warning',
            label: t`No credits left`,
            description: t`Upgrade to a paid plan to continue using HeroUI Chat`,
            icon: (
              <View className="mt-0.5">
                <ShieldExclamationIcon
                  size={20}
                  colorClassName="accent-warning-soft-foreground"
                />
              </View>
            ),
            actionLabel: t`Close`,
            onActionPress: ({ hide }) => hide(),
          })
        }
      >
        {t`Warning toast`}
      </Button>
      <Button
        variant="secondary"
        onPress={() =>
          toast.show({
            variant: 'danger',
            label: t`Storage is full`,
            description: t`Remove files to release space. I'm adding more text as usual but it's okay I guess I just want to see how it looks with a lot of information`,
            icon: (
              <StyledFeather
                name="hard-drive"
                size={16}
                className="text-danger-soft-foreground mt-[3px]"
              />
            ),
            actionLabel: t`Close`,
            onActionPress: ({ hide }) => hide(),
          })
        }
      >
        {t`Danger toast`}
      </Button>
      <Button onPress={() => toast.hide('all')} variant="danger-soft">
        {t`Hide all toasts`}
      </Button>
    </View>
  );
};

// ------------------------------------------------------------------------------

const PlacementVariantsContent = () => {
  const { t } = useLingui();
  const [isTopToastVisible, setIsTopToastVisible] = useState(false);
  const [isBottomToastVisible, setIsBottomToastVisible] = useState(false);

  const { toast } = useToast();

  const showTopToast = () =>
    toast.show({
      variant: 'success',
      placement: 'top',
      label: t`Plan upgraded`,
      description: t`You can continue using HeroUI Chat and more`,
      icon: (
        <View className="mt-0.5">
          <ShieldCheckIcon
            size={20}
            colorClassName="accent-success-soft-foreground"
          />
        </View>
      ),
      actionLabel: t`Close`,
      onActionPress: ({ hide }) => hide(),
    });

  const showBottomToast = () =>
    toast.show({
      variant: 'warning',
      placement: 'bottom',
      label: t`No credits left`,
      description: t`Upgrade to a paid plan to continue using HeroUI Chat`,
      icon: (
        <View className="mt-0.5">
          <ShieldExclamationIcon
            size={20}
            colorClassName="accent-warning-soft-foreground"
          />
        </View>
      ),
      actionLabel: t`Close`,
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
        {t`Top toast`}
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
        {t`Bottom toast`}
      </Button>
      <Button onPress={() => toast.hide('all')} variant="danger-soft">
        {t`Hide all toasts`}
      </Button>
    </View>
  );
};

// ------------------------------------------------------------------------------

const DifferentContentSizesContent = () => {
  const { t } = useLingui();
  const { toast } = useToast();

  return (
    <View className="flex-1 items-center justify-center px-5 gap-5">
      <Button
        variant="secondary"
        onPress={() =>
          toast.show({
            variant: 'default',
            label: t`New message`,
            description: t`Sarah sent you a message`,
            actionLabel: t`Close`,
            onActionPress: ({ hide }) => hide(),
          })
        }
      >
        {t`Small toast`}
      </Button>
      <Button
        variant="secondary"
        onPress={() =>
          toast.show({
            variant: 'success',
            label: t`Payment successful`,
            description: t`Your subscription has been renewed. You will be charged $9.99/month. Thank you for your continued support.`,
            actionLabel: t`Close`,
            onActionPress: ({ hide }) => hide(),
          })
        }
      >
        {t`Medium toast`}
      </Button>
      <Button
        variant="secondary"
        onPress={() =>
          toast.show({
            variant: 'success',
            label: t`Backup completed`,
            description: t`All your files have been backed up to the cloud. You can now access them from any device. The backup includes 1,234 files totaling 2.5 GB. Your data is safe and secure. The next backup will run automatically in 24 hours.`,
            actionLabel: t`Close`,
            onActionPress: ({ hide }) => hide(),
          })
        }
      >
        {t`Large toast`}
      </Button>
      <Button onPress={() => toast.hide('all')} variant="danger-soft">
        {t`Hide all toasts`}
      </Button>
    </View>
  );
};

// ------------------------------------------------------------------------------

const KeyboardAvoidingContent = () => {
  const { t } = useLingui();
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
            label: t`Join a team`,
            description: t`Junior Garcia sent you an invitation to join HeroUI team!`,
            icon: (
              <View className="mt-0.5">
                <Logo
                  themeColorForeground={themeColorForeground}
                  width={15}
                  height={20.77}
                />
              </View>
            ),
            actionLabel: t`Close`,
            onActionPress: ({ hide }) => hide(),
            onHide: () => {
              inputRef.current?.blur();
            },
          });
        }}
      >
        {t`Show toast`}
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
        {t`Toggle keyboard`}
      </Button>
      <Button onPress={() => toast.hide('all')} variant="danger-soft">
        {t`Hide toast`}
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
  const { t } = useLingui();
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center px-5 gap-5">
      <Button
        variant="secondary"
        onPress={() => router.push('/components/toast-native-modal')}
      >
        {t`Open modal`}
      </Button>
    </View>
  );
};

// ------------------------------------------------------------------------------

const CustomToastsContent = () => {
  const { t } = useLingui();
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
        {t`Achievement toast`}
      </Button>

      <Button
        variant="secondary"
        onPress={handleShowLoadingToast}
        isDisabled={isToastVisible}
      >
        {t`Load data`}
      </Button>

      <Button
        variant="secondary"
        onPress={handleShowProgressToast}
        isDisabled={isToastVisible}
      >
        {t`Start upload`}
      </Button>

      <Button onPress={() => toast.hide('all')} variant="danger-soft">
        {t`Hide all toasts`}
      </Button>
    </View>
  );
};

// ------------------------------------------------------------------------------

const TOAST_VARIANTS_IOS: UsageVariant[] = [
  {
    value: 'default-variants',
    label: msg`Default variants`,
    content: <DefaultVariantsContent />,
  },
  {
    value: 'placement-variants',
    label: msg`Placement variants`,
    content: <PlacementVariantsContent />,
  },
  {
    value: 'different-content-sizes',
    label: msg`Different content sizes`,
    content: <DifferentContentSizesContent />,
  },
  {
    value: 'keyboard-avoiding',
    label: msg`Keyboard avoiding`,
    content: <KeyboardAvoidingContent />,
  },
  {
    value: 'from-native-modal',
    label: msg`From native modal`,
    content: <FromNativeModalContent />,
  },
  {
    value: 'custom-toasts',
    label: msg`Custom toasts`,
    content: <CustomToastsContent />,
  },
];

const TOAST_VARIANTS_ANDROID: UsageVariant[] = [
  {
    value: 'default-variants',
    label: msg`Default variants`,
    content: <DefaultVariantsContent />,
  },
  {
    value: 'placement-variants',
    label: msg`Placement variants`,
    content: <PlacementVariantsContent />,
  },
  {
    value: 'different-content-sizes',
    label: msg`Different content sizes`,
    content: <DifferentContentSizesContent />,
  },
  {
    value: 'keyboard-avoiding',
    label: msg`Keyboard avoiding`,
    content: <KeyboardAvoidingContent />,
  },
  {
    value: 'custom-toasts',
    label: msg`Custom toasts`,
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
