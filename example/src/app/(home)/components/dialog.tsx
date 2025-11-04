import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import {
  Button,
  cn,
  Dialog,
  ScrollShadow,
  TextField,
  useDialog,
  useThemeColor,
} from 'heroui-native';
import { useState, type FC, type PropsWithChildren } from 'react';
import { Platform, Text, useWindowDimensions, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {
  KeyboardAvoidingView,
  KeyboardController,
} from 'react-native-keyboard-controller';
import {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { withUniwind } from 'uniwind';
import type { UsageVariant } from '../../../components/component-presentation/types';
import { UsageVariantFlatList } from '../../../components/component-presentation/usage-variant-flatlist';
import { DialogBlurBackdrop } from '../../../components/dialog-blur-backdrop';
import { useAppTheme } from '../../../contexts/app-theme-context';
import { simulatePress } from '../../../helpers/utils/simulate-press';

const StyledIonicons = withUniwind(Ionicons);

KeyboardController.preload();

const CustomAnimatedContent: FC<PropsWithChildren> = ({ children }) => {
  const { height } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const insetTop = insets.top + 12;
  const maxTextInputDialogHeight = (height - insetTop) / 2;

  const { progress, isDragging } = useDialog();

  const rContainerStyle = useAnimatedStyle(() => {
    if (isDragging.get()) {
      return {
        borderRadius: interpolate(
          progress.get(),
          [1, 1.25],
          [18, 42],
          Extrapolation.CLAMP
        ),
      };
    }

    return {
      opacity: interpolate(progress.get(), [0, 1, 2], [0, 1, 0]),
      transform: [
        {
          scaleX: interpolate(
            progress.get(),
            [0, 1, 2],
            [0.9, 1, 0.9],
            Extrapolation.CLAMP
          ),
        },
      ],
    };
  });

  return (
    <Dialog.Content
      className="bg-surface rounded-3xl"
      style={[
        { marginTop: insetTop, height: maxTextInputDialogHeight },
        rContainerStyle,
      ]}
      isDefaultAnimationDisabled
    >
      {children}
    </Dialog.Content>
  );
};

const BasicDialogContent = () => {
  const [basicDialogOpen, setBasicDialogOpen] = useState(false);

  return (
    <View className="flex-1">
      <View className="flex-1 items-center justify-center">
        <Dialog isOpen={basicDialogOpen} onOpenChange={setBasicDialogOpen}>
          <Dialog.Trigger asChild>
            <Button variant="secondary">Basic dialog</Button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay />
            <Dialog.Content>
              <Dialog.Close className="self-end -mb-2 z-50" />
              <View className="size-9 items-center justify-center rounded-full bg-overlay-foreground/5 mb-4">
                <StyledIonicons
                  name="albums-outline"
                  size={16}
                  className="text-warning"
                />
              </View>
              <View className="mb-8 gap-1.5">
                <Dialog.Title>Low Disk Space</Dialog.Title>
                <Dialog.Description>
                  You are running low on disk space. Delete unnecessary files to
                  free up space.
                </Dialog.Description>
              </View>
              <View className="flex-row justify-end gap-3">
                <Dialog.Close asChild>
                  <Button
                    variant="tertiary"
                    className="bg-overlay-foreground/5"
                  >
                    Confirm
                  </Button>
                </Dialog.Close>
              </View>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const BlurBackdropDialogContent = () => {
  const [blurBackdropDialogOpen, setBlurBackdropDialogOpen] = useState(false);

  if (Platform.OS !== 'ios') {
    return null;
  }

  return (
    <View className="flex-1">
      <View className="flex-1 items-center justify-center">
        <Dialog
          isOpen={blurBackdropDialogOpen}
          onOpenChange={setBlurBackdropDialogOpen}
        >
          <Dialog.Trigger asChild>
            <Button variant="secondary">Dialog with blur backdrop</Button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay isDefaultAnimationDisabled>
              <DialogBlurBackdrop />
            </Dialog.Overlay>
            <Dialog.Content className="max-w-sm mx-auto">
              <Dialog.Close className="self-end -mb-2 z-50" />
              <View className="size-10 items-center justify-center rounded-full bg-overlay-foreground/5 mb-4">
                <StyledIonicons
                  name="trash-outline"
                  size={16}
                  className="text-danger"
                />
              </View>
              <View className="mb-8 gap-1">
                <Dialog.Title>Delete product</Dialog.Title>
                <Dialog.Description>
                  Are you sure you want to delete this product? This action
                  cannot be undone.
                </Dialog.Description>
              </View>
              <View className="gap-3">
                <Button variant="destructive" onPress={simulatePress}>
                  Delete
                </Button>
                <Dialog.Close asChild>
                  <Button
                    variant="tertiary"
                    className="bg-overlay-foreground/5"
                  >
                    Cancel
                  </Button>
                </Dialog.Close>
              </View>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const TextInputDialogContent = () => {
  const [textInputDialogOpen, setTextInputDialogOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');

  const themeColorSurfaceSecondary = useThemeColor('surface-secondary');
  const themeColorMuted = useThemeColor('muted');

  const validateEmail = (emailValue: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailValue);
  };

  const handleSubmit = () => {
    let hasError = false;

    if (!name.trim()) {
      setNameError('Name is required');
      hasError = true;
    } else if (name.trim().length < 2) {
      setNameError('Name must be at least 2 characters');
      hasError = true;
    } else {
      setNameError('');
    }

    if (!email.trim()) {
      setEmailError('Email is required');
      hasError = true;
    } else if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      hasError = true;
    } else {
      setEmailError('');
    }

    if (!hasError) {
      simulatePress();
      setName('');
      setEmail('');
      setNameError('');
      setEmailError('');
      return true;
    }

    return false;
  };

  return (
    <View className="flex-1">
      <View className="flex-1 items-center justify-center">
        <Dialog
          isOpen={textInputDialogOpen}
          onOpenChange={(isOpen) => {
            setTextInputDialogOpen(isOpen);
            // Reset form and errors when dialog closes
            if (!isOpen) {
              setName('');
              setEmail('');
              setNameError('');
              setEmailError('');
            }
          }}
        >
          <Dialog.Trigger asChild>
            <Button variant="secondary">Dialog with text input</Button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay isDefaultAnimationDisabled>
              <DialogBlurBackdrop />
            </Dialog.Overlay>
            <KeyboardAvoidingView
              behavior="padding"
              keyboardVerticalOffset={24}
            >
              <CustomAnimatedContent>
                <Dialog.Close className="self-end" />
                <Dialog.Title className="mb-6">Update Profile</Dialog.Title>

                <View className="flex-1">
                  <ScrollView contentContainerClassName="gap-5">
                    <TextField isRequired isInvalid={!!nameError}>
                      <TextField.Label isInvalid={false}>
                        Full Name
                      </TextField.Label>
                      <TextField.Input
                        placeholder="Enter your name"
                        value={name}
                        onChangeText={(text) => {
                          setName(text);
                          if (nameError) setNameError('');
                        }}
                        autoCapitalize="words"
                        autoCorrect
                        autoFocus
                        isInvalid={false}
                        colors={{
                          blurBackground: themeColorSurfaceSecondary,
                          focusBackground: themeColorSurfaceSecondary,
                        }}
                        selectionColor={themeColorMuted}
                      />
                      <TextField.ErrorMessage>
                        {nameError}
                      </TextField.ErrorMessage>
                    </TextField>

                    <TextField isRequired isInvalid={!!emailError}>
                      <TextField.Label isInvalid={false}>
                        Email Address
                      </TextField.Label>
                      <TextField.Input
                        placeholder="email@example.com"
                        value={email}
                        onChangeText={(text) => {
                          setEmail(text);
                          if (emailError) setEmailError('');
                        }}
                        autoCapitalize="none"
                        isInvalid={false}
                        colors={{
                          blurBackground: themeColorSurfaceSecondary,
                          focusBackground: themeColorSurfaceSecondary,
                        }}
                        selectionColor={themeColorMuted}
                      />
                      <TextField.ErrorMessage>
                        {emailError}
                      </TextField.ErrorMessage>
                    </TextField>
                  </ScrollView>
                </View>

                <View className="flex-row justify-end gap-3 pt-3">
                  <Dialog.Close asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      onPress={() => {
                        setName('');
                        setEmail('');
                        setNameError('');
                        setEmailError('');
                      }}
                    >
                      Cancel
                    </Button>
                  </Dialog.Close>
                  <Button size="sm" onPress={handleSubmit}>
                    Update Profile
                  </Button>
                </View>
              </CustomAnimatedContent>
            </KeyboardAvoidingView>
          </Dialog.Portal>
        </Dialog>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const LongContentDialogContent = () => {
  const [scrollDialogOpen, setScrollDialogOpen] = useState(false);
  const { height } = useWindowDimensions();
  const { isDark } = useAppTheme();
  const themeColorOverlay = useThemeColor('overlay');

  return (
    <View className="flex-1">
      <View className="flex-1 items-center justify-center">
        <Dialog isOpen={scrollDialogOpen} onOpenChange={setScrollDialogOpen}>
          <Dialog.Trigger asChild>
            <Button variant="secondary">Dialog with long content</Button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay
              className={cn('bg-stone-100', isDark && 'bg-stone-950')}
            />
            <Dialog.Content className="rounded-2xl px-0 shadow-2xl shadow-black/10">
              <Dialog.Close className="self-end mr-4" />
              <Dialog.Title className="text-center mb-5">
                Upload Audio
              </Dialog.Title>
              <ScrollShadow
                LinearGradientComponent={LinearGradient}
                style={{ height: height * 0.35 }}
                color={themeColorOverlay}
              >
                <ScrollView contentContainerClassName="px-6">
                  <Text className="text-foreground/80 text-center">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    {'\n\n'}
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                    {'\n\n'}
                    Sed ut perspiciatis unde omnis iste natus error sit
                    voluptatem accusantium doloremque laudantium, totam rem
                    aperiam, eaque ipsa quae ab illo inventore veritatis et
                    quasi architecto beatae vitae dicta sunt explicabo.
                    {'\n\n'}
                    Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut
                    odit aut fugit, sed quia consequuntur magni dolores eos qui
                    ratione voluptatem sequi nesciunt.
                    {'\n\n'}
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    {'\n\n'}
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                    {'\n\n'}
                    Sed ut perspiciatis unde omnis iste natus error sit
                    voluptatem accusantium doloremque laudantium, totam rem
                    aperiam, eaque ipsa quae ab illo inventore veritatis et
                    quasi architecto beatae vitae dicta sunt explicabo.
                    {'\n\n'}
                    Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut
                    odit aut fugit, sed quia consequuntur magni dolores eos qui
                    ratione voluptatem sequi nesciunt.
                  </Text>
                </ScrollView>
              </ScrollShadow>
              <Button
                variant="ghost"
                className="self-center"
                onPress={simulatePress}
              >
                <Button.Label className="text-foreground font-semibold">
                  Agree to Terms
                </Button.Label>
              </Button>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const NativeModalDialogContent = () => {
  const router = useRouter();

  if (Platform.OS !== 'ios') {
    return null;
  }

  return (
    <View className="flex-1">
      <View className="flex-1 items-center justify-center">
        <Button
          variant="secondary"
          onPress={() => router.push('components/dialog-native-modal')}
        >
          Dialog from native modal
        </Button>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const DIALOG_VARIANTS: UsageVariant[] = [
  {
    value: 'basic-dialog',
    label: 'Basic dialog',
    content: <BasicDialogContent />,
  },
  {
    value: 'blur-backdrop-dialog',
    label: 'Dialog with blur backdrop',
    content: <BlurBackdropDialogContent />,
  },
  {
    value: 'text-input-dialog',
    label: 'Dialog with text input',
    content: <TextInputDialogContent />,
  },
  {
    value: 'long-content-dialog',
    label: 'Dialog with long content',
    content: <LongContentDialogContent />,
  },
  {
    value: 'native-modal-dialog',
    label: 'Dialog from native modal',
    content: <NativeModalDialogContent />,
  },
];

export default function DialogScreen() {
  return <UsageVariantFlatList data={DIALOG_VARIANTS} />;
}
