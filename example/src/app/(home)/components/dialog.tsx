import AntDesign from '@expo/vector-icons/AntDesign';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Button,
  cn,
  Dialog,
  DropShadowView,
  ScrollShadow,
  TextField,
  useDialog,
  useTheme,
} from 'heroui-native';
import { useState, type FC, type PropsWithChildren } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import {
  KeyboardAvoidingView,
  KeyboardController,
} from 'react-native-keyboard-controller';
import {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AnimatedBlurView } from '../../../components/animated-blur-view';
import { AppText } from '../../../components/app-text';
import { ScreenScrollView } from '../../../components/screen-scroll-view';
import { simulatePress } from '../../../helpers/utils/simulate-press';

KeyboardController.preload();

const DialogBlurBackdrop = () => {
  const { isDark } = useTheme();
  const { progress } = useDialog();

  const blurIntensity = useDerivedValue(() => {
    return interpolate(progress.get(), [0, 1, 2], [0, isDark ? 75 : 50, 0]);
  });

  return (
    <AnimatedBlurView
      blurIntensity={blurIntensity}
      tint={isDark ? 'dark' : 'systemUltraThinMaterialDark'}
      style={StyleSheet.absoluteFill}
    />
  );
};

const CustomAnimatedContent: FC<PropsWithChildren> = ({ children }) => {
  const { height } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const maxTextInputDialogHeight = (height - insets.top + 12) / 2;

  const { progress, isDragging, dialogState } = useDialog();

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
      transform: [
        {
          translateY: withSpring(dialogState === 'close' ? 100 : 0),
        },
        {
          scaleX: interpolate(
            progress.get(),
            [0, 1, 2],
            [0.95, 1, 0.9],
            Extrapolation.CLAMP
          ),
        },
      ],
    };
  });

  return (
    <Dialog.Content
      className="rounded-xl"
      style={[{ maxHeight: maxTextInputDialogHeight }, rContainerStyle]}
    >
      {children}
    </Dialog.Content>
  );
};

export default function DialogScreen() {
  const [basicDialogOpen, setBasicDialogOpen] = useState(false);
  const [customCloseDialogOpen, setCustomCloseDialogOpen] = useState(false);
  const [scrollDialogOpen, setScrollDialogOpen] = useState(false);
  const [textInputDialogOpen, setTextInputDialogOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');

  const { height } = useWindowDimensions();

  const { colors, isDark } = useTheme();

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
          <Dialog.Overlay>
            <DialogBlurBackdrop />
          </Dialog.Overlay>
          <Dialog.Content>
            <Dialog.Close />
            <View className="mb-5 gap-1.5">
              <Dialog.Title>Dialog Title</Dialog.Title>
              <Dialog.Description>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Totam
                laudantium voluptates suscipit magnam nemo nesciunt repellat,
                explicabo, beatae nobis maxime, obcaecati non dolorum?
              </Dialog.Description>
            </View>
            <Button
              size="sm"
              className="self-end"
              onPress={() => setBasicDialogOpen(false)}
            >
              Confirm
            </Button>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog>

      {/* Dialog with Custom Close Icon */}
      <Dialog
        isOpen={customCloseDialogOpen}
        onOpenChange={setCustomCloseDialogOpen}
      >
        <Dialog.Trigger>
          <Button variant="tertiary">Custom Close Dialog</Button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay />
          <Dialog.Content>
            <Dialog.Close className="flex-row items-center gap-1.5">
              <AppText className="mb-0.5 text-sm text-foreground">
                Close
              </AppText>
              <AntDesign name="close" size={11} color={colors.foreground} />
            </Dialog.Close>
            <View className="mb-5 gap-1.5">
              <Dialog.Title>Confirm Action</Dialog.Title>
              <Dialog.Description>
                This action cannot be undone. Please confirm to proceed.
              </Dialog.Description>
            </View>
            <View className="flex-row justify-end gap-3">
              <Button
                variant="ghost"
                size="sm"
                onPress={() => setCustomCloseDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                size="sm"
                onPress={() => setCustomCloseDialogOpen(false)}
              >
                Delete
              </Button>
            </View>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog>

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
          <Dialog.Overlay>
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

              <ScrollView contentContainerClassName="gap-5">
                <TextField isRequired isInvalid={!!nameError}>
                  <TextField.Label isInvalid={false}>Full Name</TextField.Label>
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
                  <TextField.ErrorMessage>{emailError}</TextField.ErrorMessage>
                </TextField>
              </ScrollView>

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
                <Button
                  size="sm"
                  onPress={() => {
                    const isValid = handleSubmit();
                    if (isValid) {
                      setTextInputDialogOpen(false);
                    }
                  }}
                >
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
          <DropShadowView shadowSize="xl" asChild>
            <Dialog.Content className="rounded-2xl px-0">
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
                onPress={() => setScrollDialogOpen(false)}
              >
                <Button.LabelContent
                  classNames={{ text: 'text-foreground font-semibold' }}
                >
                  Agree to Terms
                </Button.LabelContent>
              </Button>
            </Dialog.Content>
          </DropShadowView>
        </Dialog.Portal>
      </Dialog>
    </ScreenScrollView>
  );
}
