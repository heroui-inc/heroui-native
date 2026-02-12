import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import {
  Button,
  cn,
  Dialog,
  FieldError,
  Input,
  Label,
  ScrollShadow,
  TextField,
  useThemeColor,
} from 'heroui-native';
import { useState } from 'react';
import { Platform, Text, useWindowDimensions, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { KeyboardController } from 'react-native-keyboard-controller';

import { Easing, FadeInDown, FadeOutDown } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { withUniwind } from 'uniwind';
import type { UsageVariant } from '../../../components/component-presentation/types';
import { UsageVariantFlatList } from '../../../components/component-presentation/usage-variant-flatlist';
import { DialogBlurBackdrop } from '../../../components/dialog-blur-backdrop';
import { FloppyDiscIcon } from '../../../components/icons/floppy-disc';
import { TrashIcon } from '../../../components/icons/trash';
import { useAppTheme } from '../../../contexts/app-theme-context';
import { simulatePress } from '../../../helpers/utils/simulate-press';

const StyleScrollView = withUniwind(ScrollView);

KeyboardController.preload();

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
              <Dialog.Close
                variant="ghost"
                className="absolute top-3 right-2.5 z-50"
              />
              <View className="size-9 items-center justify-center rounded-full bg-overlay-foreground/5 mb-4">
                <FloppyDiscIcon size={16} colorClassName="accent-warning" />
              </View>
              <View className="mb-8 gap-1.5">
                <Dialog.Title>Low Disk Space</Dialog.Title>
                <Dialog.Description>
                  You are running low on disk space. Delete unnecessary files to
                  free up space.
                </Dialog.Description>
              </View>
              <View className="flex-row justify-end gap-3">
                <Button
                  variant="tertiary"
                  className="bg-overlay-foreground/5"
                  onPress={() => setBasicDialogOpen(false)}
                >
                  Confirm
                </Button>
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
            <DialogBlurBackdrop />
            <Dialog.Content className="max-w-sm mx-auto">
              <View className="size-10 items-center justify-center rounded-full bg-overlay-foreground/5 mb-4">
                <TrashIcon size={16} colorClassName="accent-danger" />
              </View>
              <View className="mb-8 gap-1">
                <Dialog.Title>Delete product</Dialog.Title>
                <Dialog.Description>
                  Are you sure you want to delete this product? This action
                  cannot be undone.
                </Dialog.Description>
              </View>
              <View className="gap-3">
                <Button variant="danger" onPress={simulatePress}>
                  Delete
                </Button>
                <Button
                  variant="tertiary"
                  className="bg-overlay-foreground/5"
                  onPress={() => setBlurBackdropDialogOpen(false)}
                >
                  Cancel
                </Button>
              </View>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

/**
 * Component containing the form content and state logic for the text input dialog.
 * Manages form state, validation, and UI rendering.
 */
const UpdateProfileDialogForm = ({ onClose }: { onClose: () => void }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');

  const { height } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const insetTop = insets.top + 12;
  const maxTextInputDialogHeight = (height - insetTop) / 2;

  const themeColorMuted = useThemeColor('muted');

  /**
   * Validates email format using regex pattern.
   * @param emailValue - The email string to validate
   * @returns True if email is valid, false otherwise
   */
  const validateEmail = (emailValue: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailValue);
  };

  /**
   * Handles form submission with validation.
   * Validates name and email fields, shows errors if invalid.
   * On success, simulates press action and resets form.
   * @returns True if validation passes, false otherwise
   */
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

  /**
   * Resets all form fields and errors, then closes the dialog.
   */
  const handleCancel = () => {
    setName('');
    setEmail('');
    setNameError('');
    setEmailError('');
    onClose();
  };

  return (
    <Dialog.Content
      className="bg-surface"
      animation={{
        entering: FadeInDown.duration(200).easing(Easing.out(Easing.ease)),
        exiting: FadeOutDown.duration(150).easing(Easing.in(Easing.ease)),
      }}
      style={{
        marginTop: insetTop,
        height: maxTextInputDialogHeight,
      }}
    >
      <View className="items-end">
        <Dialog.Close />
      </View>
      <Dialog.Title className="mb-6">Update Profile</Dialog.Title>

      <View className="flex-1">
        <StyleScrollView
          contentContainerClassName="gap-5"
          keyboardShouldPersistTaps="always"
        >
          <TextField isRequired isInvalid={!!nameError}>
            <Label isInvalid={false}>Full Name</Label>
            <Input
              variant="secondary"
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
              selectionColorClassName="accent-muted"
            />
            <FieldError>{nameError}</FieldError>
          </TextField>

          <TextField isRequired isInvalid={!!emailError}>
            <Label isInvalid={false}>Email Address</Label>
            <Input
              variant="secondary"
              placeholder="email@example.com"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                if (emailError) setEmailError('');
              }}
              autoCapitalize="none"
              isInvalid={false}
              selectionColor={themeColorMuted}
            />
            <FieldError>{emailError}</FieldError>
          </TextField>
        </StyleScrollView>
      </View>

      <View className="flex-row justify-end gap-3 pt-3">
        <Button variant="ghost" size="sm" onPress={handleCancel}>
          Cancel
        </Button>
        <Button size="sm" onPress={handleSubmit}>
          Update Profile
        </Button>
      </View>
    </Dialog.Content>
  );
};

const TextInputDialogContent = () => {
  const [textInputDialogOpen, setTextInputDialogOpen] = useState(false);

  return (
    <View className="flex-1">
      <View className="flex-1 items-center justify-center">
        <Dialog
          isOpen={textInputDialogOpen}
          onOpenChange={(isOpen) => {
            setTextInputDialogOpen(isOpen);
          }}
        >
          <Dialog.Trigger asChild>
            <Button variant="secondary">Dialog with text input</Button>
          </Dialog.Trigger>
          <Dialog.Portal className="justify-start">
            <DialogBlurBackdrop />
            <UpdateProfileDialogForm
              onClose={() => setTextInputDialogOpen(false)}
            />
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
            <Dialog.Content className="rounded-2xl px-0">
              <Dialog.Close variant="ghost" className="self-end mr-4" />
              <Dialog.Title className="text-center mb-5">
                Upload Audio
              </Dialog.Title>
              <ScrollShadow
                LinearGradientComponent={LinearGradient}
                style={{ height: height * 0.35 }}
                color={themeColorOverlay}
                className="mb-4"
              >
                <StyleScrollView contentContainerClassName="px-6">
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
                </StyleScrollView>
              </ScrollShadow>
              <Button
                variant="secondary"
                className="self-center"
                onPress={() => setScrollDialogOpen(false)}
              >
                Agree to Terms
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

const DIALOG_VARIANTS_IOS: UsageVariant[] = [
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

const DIALOG_VARIANTS_ANDROID: UsageVariant[] = [
  {
    value: 'basic-dialog',
    label: 'Basic dialog',
    content: <BasicDialogContent />,
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
];

export default function DialogScreen() {
  return (
    <UsageVariantFlatList
      data={
        Platform.OS === 'ios' ? DIALOG_VARIANTS_IOS : DIALOG_VARIANTS_ANDROID
      }
    />
  );
}
