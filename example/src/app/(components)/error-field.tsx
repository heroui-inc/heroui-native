import { Ionicons } from '@expo/vector-icons';
import { Button, ErrorField, TextField, useTheme } from 'heroui-native';
import { AlertTriangle, Info, XCircle } from 'lucide-react-native';
import { useState } from 'react';
import { Text, View } from 'react-native';
import {
  FadeInDown,
  SlideInLeft,
  SlideOutLeft,
  ZoomIn,
  ZoomOut,
} from 'react-native-reanimated';
import { ScreenScrollView } from '../../components/screen-scroll-view';
import { SectionTitle } from '../../components/section-title';

export default function ErrorFieldScreen() {
  const { colors } = useTheme();

  // Basic error states
  const [basicError, setBasicError] = useState(true);
  const [toggleError, setToggleError] = useState(false);

  // Form validation states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');

  // Multiple errors state
  const [showMultipleErrors, setShowMultipleErrors] = useState(false);

  // Custom animation states
  const [slideError, setSlideError] = useState(false);
  const [bounceError, setBounceError] = useState(false);
  const [zoomError, setZoomError] = useState(false);

  // Validation helpers
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isPasswordStrong =
    password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password);
  const passwordsMatch = password === confirmPassword && password !== '';
  const isUsernameValid =
    username.length >= 3 &&
    username.length <= 20 &&
    /^[a-zA-Z0-9_]+$/.test(username);

  return (
    <ScreenScrollView contentContainerClassName="gap-16">
      <SectionTitle title="Basic ErrorField" />
      <View className="flex-row items-center gap-4">
        <Button
          onPress={() => setBasicError(!basicError)}
          variant="tertiary"
          size="sm"
          className="self-start"
        >
          <Button.Label>Toggle Error</Button.Label>
        </Button>
        <ErrorField isInvalid={basicError}>
          This is a basic error message
        </ErrorField>
      </View>

      <SectionTitle title="Custom Content with Icons" />
      <View className="gap-4">
        <ErrorField isInvalid={true}>
          <View className="flex-row items-center gap-2">
            <XCircle size={16} color={colors.danger} />
            <Text className="text-danger text-sm">Critical error occurred</Text>
          </View>
        </ErrorField>

        <ErrorField isInvalid={true}>
          <View className="flex-row items-center gap-2">
            <AlertTriangle size={16} color={colors.warning} />
            <Text className="text-warning text-sm">
              Warning: Check your input
            </Text>
          </View>
        </ErrorField>

        <ErrorField isInvalid={true}>
          <View className="flex-row items-center gap-2">
            <Info size={16} color={colors.accent} />
            <Text className="text-accent text-sm">
              Information: Field requires attention
            </Text>
          </View>
        </ErrorField>
      </View>

      <SectionTitle title="Custom Animations - Slide" />
      <View className="gap-4">
        <TextField>
          <TextField.Label>Field with Slide Animation</TextField.Label>
          <TextField.Input placeholder="Toggle to see slide animation" />
        </TextField>
        <ErrorField
          isInvalid={slideError}
          entering={SlideInLeft.duration(300)}
          exiting={SlideOutLeft.duration(200)}
        >
          This error slides in from the left
        </ErrorField>
        <Button
          onPress={() => setSlideError(!slideError)}
          variant="tertiary"
          size="sm"
          className="self-start"
        >
          <Button.Label>Toggle Slide Error</Button.Label>
        </Button>
      </View>

      <SectionTitle title="Custom Animations - Zoom" />
      <View className="gap-4">
        <TextField>
          <TextField.Label>Field with Zoom Animation</TextField.Label>
          <TextField.Input placeholder="Toggle to see zoom animation" />
        </TextField>
        <ErrorField
          isInvalid={zoomError}
          entering={ZoomIn.duration(300)}
          exiting={ZoomOut.duration(200)}
        >
          This error zooms in and out
        </ErrorField>
        <Button
          onPress={() => setZoomError(!zoomError)}
          variant="tertiary"
          size="sm"
          className="self-start"
        >
          <Button.Label>Toggle Zoom Error</Button.Label>
        </Button>
      </View>

      <SectionTitle title="Custom Styling" />
      <View className="gap-4">
        <ErrorField
          isInvalid={true}
          className="bg-danger/10 p-3 rounded-lg border border-danger/20"
          classNames={{
            text: 'text-danger font-semibold text-sm',
          }}
        >
          Styled error with background and border
        </ErrorField>

        <ErrorField
          isInvalid={true}
          className="bg-warning/10 p-2 rounded"
          classNames={{
            text: 'text-warning text-xs italic',
          }}
        >
          Warning styled error message
        </ErrorField>

        <ErrorField
          isInvalid={true}
          className="border-l-4 border-danger pl-3"
          classNames={{
            text: 'text-danger text-sm',
          }}
        >
          Error with left border accent
        </ErrorField>
      </View>

      <SectionTitle title="Multiple Errors Example" />
      <View className="gap-4">
        <TextField>
          <TextField.Label>Form Field</TextField.Label>
          <TextField.Input
            placeholder="This field has multiple validation rules"
            editable={false}
          />
        </TextField>

        <View className="gap-2">
          <ErrorField isInvalid={showMultipleErrors}>
            • Field cannot be empty
          </ErrorField>
          <ErrorField
            isInvalid={showMultipleErrors}
            entering={FadeInDown.delay(100)}
          >
            • Must contain only alphanumeric characters
          </ErrorField>
          <ErrorField
            isInvalid={showMultipleErrors}
            entering={FadeInDown.delay(200)}
          >
            • Length must be between 5 and 50 characters
          </ErrorField>
          <ErrorField
            isInvalid={showMultipleErrors}
            entering={FadeInDown.delay(300)}
          >
            • Cannot contain special characters
          </ErrorField>
        </View>

        <Button
          onPress={() => setShowMultipleErrors(!showMultipleErrors)}
          variant={showMultipleErrors ? 'danger' : 'primary'}
          size="sm"
          className="self-start"
        >
          <Button.Label>
            {showMultipleErrors ? 'Hide All Errors' : 'Show All Errors'}
          </Button.Label>
        </Button>
      </View>

      <SectionTitle title="Inline Error Messages" />
      <View className="gap-4">
        <View className="flex-row items-center gap-4">
          <TextField className="flex-1">
            <TextField.Input
              placeholder="Inline error example"
              value="Invalid"
            />
          </TextField>
          <ErrorField isInvalid={true} className="flex-1">
            <Text className="text-danger text-xs">Invalid format</Text>
          </ErrorField>
        </View>

        <View className="flex-row items-center gap-4">
          <TextField className="flex-1">
            <TextField.Input
              placeholder="Another inline example"
              value="Error"
            />
          </TextField>
          <ErrorField isInvalid={true} className="flex-1">
            <View className="flex-row items-center gap-1">
              <Ionicons name="warning" size={14} color={colors.danger} />
              <Text className="text-danger text-xs">Required</Text>
            </View>
          </ErrorField>
        </View>
      </View>
    </ScreenScrollView>
  );
}
