import { Ionicons } from '@expo/vector-icons';
import { Button, ErrorView, TextField, useTheme } from 'heroui-native';
import { useState } from 'react';
import { View } from 'react-native';
import {
  FadeInDown,
  FadeInLeft,
  FadeOutLeft,
  ZoomIn,
  ZoomOut,
} from 'react-native-reanimated';
import { AppText } from '../../../components/app-text';
import { ScreenScrollView } from '../../../components/screen-scroll-view';
import { SectionTitle } from '../../../components/section-title';

export default function ErrorViewScreen() {
  const { colors } = useTheme();

  // Basic error states
  const [basicError, setBasicError] = useState(true);

  // Multiple errors state
  const [showMultipleErrors, setShowMultipleErrors] = useState(false);

  // Custom animation states
  const [slideError, setSlideError] = useState(false);
  const [zoomError, setZoomError] = useState(false);

  return (
    <ScreenScrollView contentContainerClassName="gap-16">
      <SectionTitle title="Basic ErrorView" />
      <View className="flex-row items-center gap-4">
        <Button
          onPress={() => setBasicError(!basicError)}
          variant="tertiary"
          size="sm"
          className="self-start"
        >
          Toggle Error
        </Button>
        <ErrorView isInvalid={basicError}>
          This is a basic error message
        </ErrorView>
      </View>

      <SectionTitle title="Custom Content with Icons" />
      <View className="gap-4">
        <ErrorView isInvalid={true}>
          <View className="flex-row items-center gap-2">
            <Ionicons name="close-circle" size={16} color={colors.danger} />
            <AppText className="text-danger text-sm">
              Critical error occurred
            </AppText>
          </View>
        </ErrorView>

        <ErrorView isInvalid={true}>
          <View className="flex-row items-center gap-2">
            <Ionicons name="warning" size={16} color={colors.warning} />
            <AppText className="text-warning text-sm">
              Warning: Check your input
            </AppText>
          </View>
        </ErrorView>

        <ErrorView isInvalid={true}>
          <View className="flex-row items-center gap-2">
            <Ionicons
              name="information-circle"
              size={16}
              color={colors.accent}
            />
            <AppText className="text-accent text-sm">
              Information: Field requires attention
            </AppText>
          </View>
        </ErrorView>
      </View>

      <SectionTitle title="Custom Animations - Slide" />
      <View className="gap-8">
        <Button
          onPress={() => setSlideError(!slideError)}
          variant="tertiary"
          size="sm"
          className="self-start"
        >
          Toggle Slide Error
        </Button>
        <TextField isInvalid={slideError}>
          <TextField.Label>Field with Slide Animation</TextField.Label>
          <TextField.Input
            placeholder="Toggle to see slide animation"
            editable={false}
          />
          <TextField.ErrorMessage
            entering={FadeInLeft.duration(200)}
            exiting={FadeOutLeft.duration(100)}
          >
            This error slides in from the left
          </TextField.ErrorMessage>
        </TextField>
      </View>

      <SectionTitle title="Custom Animations - Zoom" />
      <View className="gap-8">
        <Button
          onPress={() => setZoomError(!zoomError)}
          variant="tertiary"
          size="sm"
          className="self-start"
        >
          Toggle Zoom Error
        </Button>
        <TextField isInvalid={zoomError}>
          <TextField.Label>Field with Zoom Animation</TextField.Label>
          <TextField.Input
            placeholder="Toggle to see zoom animation"
            editable={false}
          />
          <TextField.ErrorMessage
            entering={ZoomIn.duration(300)}
            exiting={ZoomOut.duration(200)}
          >
            This error zooms in and out
          </TextField.ErrorMessage>
        </TextField>
      </View>

      <SectionTitle title="Custom Styling" />
      <View className="gap-4">
        <ErrorView
          isInvalid={true}
          className="bg-danger/10 p-3 rounded-lg border border-danger/20"
          classNames={{
            text: 'text-danger font-semibold text-sm',
          }}
        >
          Styled error with background and border
        </ErrorView>

        <ErrorView
          isInvalid={true}
          className="bg-warning/10 p-2 rounded"
          classNames={{
            text: 'text-warning text-xs italic',
          }}
        >
          Warning styled error message
        </ErrorView>

        <ErrorView
          isInvalid={true}
          className="border-l-4 border-danger pl-3"
          classNames={{
            text: 'text-danger text-sm',
          }}
        >
          Error with left border accent
        </ErrorView>
      </View>

      <SectionTitle title="Multiple Errors Example" />
      <View className="gap-8">
        <Button
          onPress={() => setShowMultipleErrors(!showMultipleErrors)}
          variant={showMultipleErrors ? 'danger' : 'primary'}
          size="sm"
          className="self-start"
        >
          <Button.LabelContent>
            {showMultipleErrors ? 'Hide All Errors' : 'Show All Errors'}
          </Button.LabelContent>
        </Button>
        <View className="gap-2">
          <TextField>
            <TextField.Label>Form Field</TextField.Label>
            <TextField.Input
              placeholder="This field has multiple validation rules"
              editable={false}
            />
          </TextField>

          <View className="gap-2">
            <ErrorView isInvalid={showMultipleErrors}>
              • Field cannot be empty
            </ErrorView>
            <ErrorView
              isInvalid={showMultipleErrors}
              entering={FadeInDown.delay(100)}
            >
              • Must contain only alphanumeric characters
            </ErrorView>
            <ErrorView
              isInvalid={showMultipleErrors}
              entering={FadeInDown.delay(200)}
            >
              • Length must be between 5 and 50 characters
            </ErrorView>
            <ErrorView
              isInvalid={showMultipleErrors}
              entering={FadeInDown.delay(300)}
            >
              • Cannot contain special characters
            </ErrorView>
          </View>
        </View>
      </View>

      <SectionTitle title="Inline Error Messages" />
      <View className="gap-4">
        <View className="flex-row items-center gap-4">
          <TextField className="flex-1">
            <TextField.Input
              placeholder="Inline error example"
              value="Invalid"
              editable={false}
            />
          </TextField>
          <ErrorView isInvalid={true}>
            <AppText className="text-danger text-xs">Invalid format</AppText>
          </ErrorView>
        </View>

        <View className="flex-row items-center gap-4">
          <TextField className="flex-1">
            <TextField.Input
              placeholder="Another inline example"
              value="Error"
              editable={false}
            />
          </TextField>
          <ErrorView isInvalid={true}>
            <View className="flex-row items-center gap-1">
              <Ionicons name="warning" size={14} color={colors.danger} />
              <AppText className="text-danger text-xs">Required</AppText>
            </View>
          </ErrorView>
        </View>
      </View>
    </ScreenScrollView>
  );
}
