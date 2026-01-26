import { ErrorView, Label, TextField } from 'heroui-native';
import { useState } from 'react';
import { View } from 'react-native';
import { FadeInDown } from 'react-native-reanimated';
import { AppText } from '../../../components/app-text';
import type { UsageVariant } from '../../../components/component-presentation/types';
import { UsageVariantFlatList } from '../../../components/component-presentation/usage-variant-flatlist';
import { CircleInfoFillIcon } from '../../../components/icons/circle-info-fill';
import { DiamondExclamationFillIcon } from '../../../components/icons/diamond-exclamation-fill';
import { XMarkFillIcon } from '../../../components/icons/x-mark-fill';
import { WithStateToggle } from '../../../components/with-state-toggle';

const BasicErrorViewContent = () => {
  const [slideError, setSlideError] = useState(false);

  return (
    <WithStateToggle
      isSelected={slideError}
      onSelectedChange={setSlideError}
      label="Show Error"
      description="Toggle error state for the username field"
    >
      <View className="flex-1 pt-[55%]">
        <TextField isInvalid={slideError} isRequired>
          <Label isInvalid={false}>Username</Label>
          <TextField.Input
            placeholder="Enter username"
            editable={false}
            isInvalid={false}
          />
          <ErrorView>Username is already taken</ErrorView>
        </TextField>
      </View>
    </WithStateToggle>
  );
};

const MultipleErrorsContent = () => {
  const [showMultipleErrors, setShowMultipleErrors] = useState(false);

  return (
    <WithStateToggle
      isSelected={showMultipleErrors}
      onSelectedChange={setShowMultipleErrors}
      label="Validate Password"
      description="Show password validation errors"
    >
      <View className="flex-1 pt-[55%]">
        <View className="gap-2">
          <TextField>
            <Label>Create Password</Label>
            <TextField.Input
              placeholder="Enter your password"
              secureTextEntry
              editable={false}
            />
          </TextField>

          <View className="gap-2 ml-1">
            <ErrorView isInvalid={showMultipleErrors}>
              • At least 8 characters long
            </ErrorView>
            <ErrorView
              isInvalid={showMultipleErrors}
              animation={{
                entering: {
                  value: FadeInDown.delay(100),
                },
              }}
            >
              • At least one uppercase letter
            </ErrorView>
            <ErrorView
              isInvalid={showMultipleErrors}
              animation={{
                entering: {
                  value: FadeInDown.delay(200),
                },
              }}
            >
              • At least one number
            </ErrorView>
            <ErrorView
              isInvalid={showMultipleErrors}
              animation={{
                entering: {
                  value: FadeInDown.delay(300),
                },
              }}
            >
              • At least one special character (!@#$%^&*)
            </ErrorView>
          </View>
        </View>
      </View>
    </WithStateToggle>
  );
};

const InlineErrorMessagesContent = () => {
  return (
    <View className="flex-1 items-center justify-center px-5">
      <View className="gap-4 w-full">
        <TextField>
          <Label>Email Address</Label>
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
          <Label>Phone Number</Label>
          <View className="flex-row items-center gap-2">
            <TextField.Input
              placeholder="+1 (555) 000-0000"
              value=""
              editable={false}
              className="flex-1"
            />
            <ErrorView isInvalid={true}>
              <View className="flex-row items-center gap-1">
                <CircleInfoFillIcon size={14} colorClassName="accent-danger" />
                <AppText className="text-danger text-xs">Required</AppText>
              </View>
            </ErrorView>
          </View>
        </TextField>
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

const CustomTextWithIconsContent = () => {
  return (
    <View className="flex-1 items-center justify-center px-5">
      <View className="gap-4">
        <ErrorView isInvalid={true}>
          <View className="flex-row items-center gap-2">
            <XMarkFillIcon size={16} colorClassName="accent-danger" />
            <AppText className="text-danger text-sm">
              Payment method declined
            </AppText>
          </View>
        </ErrorView>

        <ErrorView isInvalid={true}>
          <View className="flex-row items-center gap-2">
            <DiamondExclamationFillIcon
              size={16}
              colorClassName="accent-warning"
            />
            <AppText className="text-warning text-sm">
              Account verification pending
            </AppText>
          </View>
        </ErrorView>

        <ErrorView isInvalid={true}>
          <View className="flex-row items-center gap-2">
            <CircleInfoFillIcon size={16} colorClassName="accent-foreground" />
            <AppText className="text-foreground text-sm">
              Profile completion required
            </AppText>
          </View>
        </ErrorView>
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
    value: 'multiple-errors',
    label: 'Multiple errors',
    content: <MultipleErrorsContent />,
  },
  {
    value: 'inline-error-messages',
    label: 'Inline error messages',
    content: <InlineErrorMessagesContent />,
  },
  {
    value: 'custom-styling',
    label: 'Custom styling',
    content: <CustomStylingContent />,
  },
  {
    value: 'custom-text-with-icons',
    label: 'Custom text with icons',
    content: <CustomTextWithIconsContent />,
  },
];

export default function ErrorViewScreen() {
  return <UsageVariantFlatList data={ERROR_VIEW_VARIANTS} />;
}
