import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import {
  Button,
  cn,
  Dialog,
  ScrollShadow,
  TextField,
  useDialog,
  useTheme,
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
import { DialogBlurBackdrop } from '../../../components/dialog-blur-backdrop';
import { ScreenScrollView } from '../../../components/screen-scroll-view';
import { simulatePress } from '../../../helpers/utils/simulate-press';

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
      className="rounded-xl"
      style={[
        { marginTop: insetTop, maxHeight: maxTextInputDialogHeight },
        rContainerStyle,
      ]}
      isAnimationDisabled
    >
      {children}
    </Dialog.Content>
  );
};

export default function DialogScreen() {
  const [basicDialogOpen, setBasicDialogOpen] = useState(false);
  const [blurBackdropDialogOpen, setBlurBackdropDialogOpen] = useState(false);
  const [scrollDialogOpen, setScrollDialogOpen] = useState(false);
  const [textInputDialogOpen, setTextInputDialogOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');

  const { height } = useWindowDimensions();

  const { isDark } = useTheme();

  const router = useRouter();

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
    <ScreenScrollView contentContainerClassName="gap-12">
      <View />
      {/* Basic Dialog */}
      <Dialog isOpen={basicDialogOpen} onOpenChange={setBasicDialogOpen}>
        <Dialog.Trigger>
          <Button variant="tertiary">Basic Dialog</Button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay />
          <Dialog.Content>
            <Dialog.Close />
            <View className="mb-5 gap-1.5">
              <Dialog.Title>Confirm Action</Dialog.Title>
              <Dialog.Description>
                Are you sure you want to proceed with this action? This cannot
                be undone.
              </Dialog.Description>
            </View>
            <View className="flex-row justify-end gap-3">
              <Dialog.Close asChild>
                <Button variant="ghost" size="sm">
                  Cancel
                </Button>
              </Dialog.Close>
              <Button size="sm">Confirm</Button>
            </View>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog>

      {/* Dialog with Blur Backdrop */}
      {Platform.OS === 'ios' && (
        <Dialog
          isOpen={blurBackdropDialogOpen}
          onOpenChange={setBlurBackdropDialogOpen}
        >
          <Dialog.Trigger>
            <Button variant="tertiary">Blur Backdrop Dialog</Button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay isAnimationDisabled>
              <DialogBlurBackdrop />
            </Dialog.Overlay>
            <Dialog.Content>
              <Dialog.Close />
              <View className="mb-5 gap-1.5">
                <Dialog.Title>Confirm Action</Dialog.Title>
                <Dialog.Description>
                  Are you sure you want to proceed with this action? This cannot
                  be undone.
                </Dialog.Description>
              </View>
              <View className="flex-row justify-end gap-3">
                <Dialog.Close asChild>
                  <Button variant="ghost" size="sm">
                    Cancel
                  </Button>
                </Dialog.Close>
                <Button size="sm">Confirm</Button>
              </View>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog>
      )}

      {/* Dialog with Custom Content */}
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
        <Dialog.Trigger>
          <Button variant="tertiary">Text Input Dialog</Button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay isAnimationDisabled>
            <DialogBlurBackdrop />
          </Dialog.Overlay>
          <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={24}>
            <CustomAnimatedContent>
              <Dialog.Close />
              <View className="mb-6 gap-1.5">
                <Dialog.Title>Update Profile</Dialog.Title>
                <Dialog.Description>
                  Update your profile information. All fields are required.
                </Dialog.Description>
              </View>

              <View className="h-[200px]">
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
                    />
                    <TextField.ErrorMessage>{nameError}</TextField.ErrorMessage>
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
                      keyboardType="email-address"
                      autoCapitalize="none"
                      isInvalid={false}
                    />
                    <TextField.ErrorMessage>
                      {emailError}
                    </TextField.ErrorMessage>
                  </TextField>
                </ScrollView>
              </View>

              <View className="flex-row justify-end gap-3">
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

      {/* Dialog with Long Content */}
      <Dialog isOpen={scrollDialogOpen} onOpenChange={setScrollDialogOpen}>
        <Dialog.Trigger>
          <Button variant="tertiary">Scroll Content Dialog</Button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay
            className={cn('bg-stone-100', isDark && 'bg-stone-950')}
          />
          <Dialog.Content className="rounded-2xl px-0 shadow-2xl shadow-black/10">
            <Dialog.Close className="mr-4" />
            <Dialog.Title className="text-center mb-5">
              Upload Audio
            </Dialog.Title>
            <ScrollShadow
              LinearGradientComponent={LinearGradient}
              style={{ height: height * 0.35 }}
            >
              <ScrollView contentContainerClassName="px-6">
                <Text className="text-foreground/80 text-center">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                  {'\n\n'}
                  Duis aute irure dolor in reprehenderit in voluptate velit esse
                  cillum dolore eu fugiat nulla pariatur. Excepteur sint
                  occaecat cupidatat non proident, sunt in culpa qui officia
                  deserunt mollit anim id est laborum.
                  {'\n\n'}
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium, totam rem aperiam, eaque
                  ipsa quae ab illo inventore veritatis et quasi architecto
                  beatae vitae dicta sunt explicabo.
                  {'\n\n'}
                  Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut
                  odit aut fugit, sed quia consequuntur magni dolores eos qui
                  ratione voluptatem sequi nesciunt.
                  {'\n\n'}
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                  {'\n\n'}
                  Duis aute irure dolor in reprehenderit in voluptate velit esse
                  cillum dolore eu fugiat nulla pariatur. Excepteur sint
                  occaecat cupidatat non proident, sunt in culpa qui officia
                  deserunt mollit anim id est laborum.
                  {'\n\n'}
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium, totam rem aperiam, eaque
                  ipsa quae ab illo inventore veritatis et quasi architecto
                  beatae vitae dicta sunt explicabo.
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
              <Button.LabelContent
                classNames={{ text: 'text-foreground font-semibold' }}
              >
                Agree to Terms
              </Button.LabelContent>
            </Button>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog>
      {Platform.OS === 'ios' && (
        <Button
          variant="tertiary"
          onPress={() => router.push('components/dialog-native-modal')}
        >
          Dialog from Native Modal
        </Button>
      )}
    </ScreenScrollView>
  );
}
