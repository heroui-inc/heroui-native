import { Ionicons } from '@expo/vector-icons';
import { Button, ErrorView, TextField } from 'heroui-native';
import { useState } from 'react';
import { View } from 'react-native';
import { FadeInDown } from 'react-native-reanimated';
import { withUniwind } from 'uniwind';
import { AppText } from '../../../components/app-text';
import type { UsageVariant } from '../../../components/component-presentation/types';
import { UsageVariantFlatList } from '../../../components/component-presentation/usage-variant-flatlist';

const StyledIonicons = withUniwind(Ionicons);

const BasicErrorViewContent = () => {
  const [slideError, setSlideError] = useState(false);

  return (
    <View className="flex-1 items-center justify-center px-5">
      <View className="w-full h-[160px] justify-between">
        <TextField isInvalid={slideError} isRequired>
          <TextField.Label isInvalid={false}>Username</TextField.Label>
          <TextField.Input
            placeholder="Enter username"
            editable={false}
            isInvalid={false}
          />
          <TextField.ErrorMessage>
            Username is already taken
          </TextField.ErrorMessage>
        </TextField>
        <Button
          variant="secondary"
          onPress={() => setSlideError(!slideError)}
          size="sm"
          className="self-start"
        >
          Toggle Error
        </Button>
      </View>
    </View>
  );
};

const CustomTextWithIconsContent = () => {
  return (
    <View className="flex-1 items-center justify-center px-5">
      <View className="gap-4">
        <ErrorView isInvalid={true}>
          <View className="flex-row items-center gap-2">
            <StyledIonicons
              name="close-circle"
              size={16}
              className="text-danger"
            />
            <AppText className="text-danger text-sm">
              Payment method declined
            </AppText>
          </View>
        </ErrorView>

        <ErrorView isInvalid={true}>
          <View className="flex-row items-center gap-2">
            <StyledIonicons name="warning" size={16} className="text-warning" />
            <AppText className="text-warning text-sm">
              Account verification pending
            </AppText>
          </View>
        </ErrorView>

        <ErrorView isInvalid={true}>
          <View className="flex-row items-center gap-2">
            <StyledIonicons
              name="information-circle"
              size={16}
              className="text-foreground"
            />
            <AppText className="text-foreground text-sm">
              Profile completion required
            </AppText>
          </View>
        </ErrorView>
      </View>
    </View>
  );
};

const CustomStylingContent = () => {
  return (
    <View className="flex-1 items-center justify-center px-5">
      <View className="gap-4">
        <ErrorView
          isInvalid={true}
          className="bg-danger/10 p-3 rounded-xl border border-danger/20"
          classNames={{
            text: 'text-danger font-semibold text-sm',
          }}
        >
          Server connection failed. Please try again.
        </ErrorView>

        <ErrorView
          isInvalid={true}
          className="bg-amber-500/10 p-2 rounded"
          classNames={{
            text: 'text-amber-600 text-xs italic',
          }}
        >
          Session will expire in 5 minutes
        </ErrorView>

        <ErrorView
          isInvalid={true}
          className="border-l-4 border-danger pl-2"
          classNames={{
            text: 'text-danger text-sm',
          }}
        >
          Invalid credentials provided
        </ErrorView>
      </View>
    </View>
  );
};

const InlineErrorMessagesContent = () => {
  return (
    <View className="flex-1 items-center justify-center px-5">
      <View className="gap-4 w-full">
        <TextField>
          <TextField.Label>Email Address</TextField.Label>
          <View className="flex-row items-center gap-2">
            <TextField.Input
              placeholder="user@example"
              value="user@example"
              editable={false}
              className="flex-1"
            />
            <ErrorView isInvalid={true}>
              <AppText className="text-danger text-xs">Invalid email</AppText>
            </ErrorView>
          </View>
        </TextField>

        <TextField>
          <TextField.Label>Phone Number</TextField.Label>
          <View className="flex-row items-center gap-2">
            <TextField.Input
              placeholder="+1 (555) 000-0000"
              value=""
              editable={false}
              className="flex-1"
            />
            <ErrorView isInvalid={true}>
              <View className="flex-row items-center gap-1">
                <StyledIonicons
                  name="warning"
                  size={14}
                  className="text-danger"
                />
                <AppText className="text-danger text-xs">Required</AppText>
              </View>
            </ErrorView>
          </View>
        </TextField>
      </View>
    </View>
  );
};

const MultipleErrorsContent = () => {
  const [showMultipleErrors, setShowMultipleErrors] = useState(false);

  return (
    <View className="flex-1 items-center justify-center px-5">
      <View className="w-full h-[240px] justify-between">
        <View className="gap-2">
          <TextField>
            <TextField.Label>Create Password</TextField.Label>
            <TextField.Input
              placeholder="Enter your password"
              secureTextEntry
              editable={false}
            />
          </TextField>

          <View className="gap-2">
            <ErrorView isInvalid={showMultipleErrors}>
              • At least 8 characters long
            </ErrorView>
            <ErrorView
              isInvalid={showMultipleErrors}
              entering={FadeInDown.delay(100)}
            >
              • At least one uppercase letter
            </ErrorView>
            <ErrorView
              isInvalid={showMultipleErrors}
              entering={FadeInDown.delay(200)}
            >
              • At least one number
            </ErrorView>
            <ErrorView
              isInvalid={showMultipleErrors}
              entering={FadeInDown.delay(300)}
            >
              • At least one special character (!@#$%^&*)
            </ErrorView>
          </View>
        </View>
        <Button
          variant="secondary"
          onPress={() => setShowMultipleErrors(!showMultipleErrors)}
          size="sm"
          className="self-start"
        >
          {showMultipleErrors ? 'Hide Errors' : 'Validate Password'}
        </Button>
      </View>
    </View>
  );
};

const ERROR_VIEW_VARIANTS: UsageVariant[] = [
  {
    value: 'basic-error-view',
    label: 'Basic ErrorView',
    content: <BasicErrorViewContent />,
  },
  {
    value: 'custom-text-with-icons',
    label: 'Custom text with icons',
    content: <CustomTextWithIconsContent />,
  },
  {
    value: 'custom-styling',
    label: 'Custom styling',
    content: <CustomStylingContent />,
  },
  {
    value: 'inline-error-messages',
    label: 'Inline error messages',
    content: <InlineErrorMessagesContent />,
  },
  {
    value: 'multiple-errors',
    label: 'Multiple errors',
    content: <MultipleErrorsContent />,
  },
];

export default function ErrorViewScreen() {
  return <UsageVariantFlatList data={ERROR_VIEW_VARIANTS} />;
}
