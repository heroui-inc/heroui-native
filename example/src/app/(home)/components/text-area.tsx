import {
  Description,
  FieldError,
  Label,
  TextArea,
  TextField,
} from 'heroui-native';
import { useWindowDimensions, View } from 'react-native';
import { useReanimatedKeyboardAnimation } from 'react-native-keyboard-controller';
import Animated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import type { UsageVariant } from '../../../components/component-presentation/types';
import { UsageVariantFlatList } from '../../../components/component-presentation/usage-variant-flatlist';

const KeyboardAvoidingContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { height } = useWindowDimensions();

  const { progress } = useReanimatedKeyboardAnimation();

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withTiming(progress.get() === 1 ? -height * 0.15 : 0, {
            duration: 250,
          }),
        },
      ],
    };
  });

  return <Animated.View style={rStyle}>{children}</Animated.View>;
};

const BasicTextAreaContent = () => {
  return (
    <View className="flex-1 justify-center px-5">
      <KeyboardAvoidingContainer>
        <TextArea placeholder="Enter your message" />
      </KeyboardAvoidingContainer>
    </View>
  );
};

const TextAreaWithLabelAndDescriptionContent = () => {
  return (
    <View className="flex-1 justify-center px-5">
      <KeyboardAvoidingContainer>
        <TextField>
          <Label>Message</Label>
          <TextArea placeholder="Enter your message here..." />
          <Description>Please provide as much detail as possible.</Description>
        </TextField>
      </KeyboardAvoidingContainer>
    </View>
  );
};

const TextAreaVariantsContent = () => {
  return (
    <View className="flex-1 justify-center px-5 gap-8">
      <KeyboardAvoidingContainer>
        <View className="gap-8">
          <TextField>
            <Label>Primary Variant</Label>
            <TextArea placeholder="Primary style text area" variant="primary" />
            <Description>Default variant with primary styling</Description>
          </TextField>

          <TextField>
            <Label>Secondary Variant</Label>
            <TextArea
              placeholder="Secondary style text area"
              variant="secondary"
            />
            <Description>Secondary variant for surfaces</Description>
          </TextField>
        </View>
      </KeyboardAvoidingContainer>
    </View>
  );
};

const TextAreaStatesContent = () => {
  return (
    <View className="flex-1 justify-center px-5 gap-8">
      <KeyboardAvoidingContainer>
        <View className="gap-8">
          <TextField isDisabled>
            <Label>Disabled State</Label>
            <TextArea placeholder="Cannot edit" value="Read only value" />
            <Description>
              Text area is disabled and cannot be edited
            </Description>
          </TextField>

          <TextField isInvalid>
            <Label>Invalid State</Label>
            <TextArea placeholder="Enter your message" />
            <FieldError>Please enter a valid message</FieldError>
          </TextField>
        </View>
      </KeyboardAvoidingContainer>
    </View>
  );
};

// ------------------------------------------------------------------------------

const TEXT_AREA_VARIANTS: UsageVariant[] = [
  {
    value: 'basic-text-area',
    label: 'Basic TextArea',
    content: <BasicTextAreaContent />,
  },
  {
    value: 'text-area-with-label-description',
    label: 'With Label & Description',
    content: <TextAreaWithLabelAndDescriptionContent />,
  },
  {
    value: 'text-area-variants',
    label: 'Variants',
    content: <TextAreaVariantsContent />,
  },
  {
    value: 'text-area-states',
    label: 'States',
    content: <TextAreaStatesContent />,
  },
];

export default function TextAreaScreen() {
  return <UsageVariantFlatList data={TEXT_AREA_VARIANTS} />;
}
