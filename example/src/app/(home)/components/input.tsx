import {
  Description,
  FieldError,
  Input,
  Label,
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

const BasicInputContent = () => {
  return (
    <View className="flex-1 justify-center px-5">
      <KeyboardAvoidingContainer>
        <Input placeholder="Enter your email" keyboardType="email-address" />
      </KeyboardAvoidingContainer>
    </View>
  );
};

const InputWithLabelAndDescriptionContent = () => {
  return (
    <View className="flex-1 justify-center px-5">
      <KeyboardAvoidingContainer>
        <TextField>
          <Label>Email</Label>
          <Input
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Description>
            We'll never share your email with anyone else.
          </Description>
        </TextField>
      </KeyboardAvoidingContainer>
    </View>
  );
};

const InputVariantsContent = () => {
  return (
    <View className="flex-1 justify-center px-5 gap-8">
      <KeyboardAvoidingContainer>
        <View className="gap-8">
          <TextField>
            <Label>Primary Variant</Label>
            <Input placeholder="Primary style input" variant="primary" />
            <Description>Default variant with primary styling</Description>
          </TextField>

          <TextField>
            <Label>Secondary Variant</Label>
            <Input placeholder="Secondary style input" variant="secondary" />
            <Description>Secondary variant for surfaces</Description>
          </TextField>
        </View>
      </KeyboardAvoidingContainer>
    </View>
  );
};

const InputStatesContent = () => {
  return (
    <View className="flex-1 justify-center px-5 gap-8">
      <KeyboardAvoidingContainer>
        <View className="gap-8">
          <TextField>
            <Label>Default State</Label>
            <Input
              placeholder="Enter your email"
              keyboardType="email-address"
            />
            <Description>Normal input state</Description>
          </TextField>

          <TextField isDisabled>
            <Label>Disabled State</Label>
            <Input placeholder="Cannot edit" value="Read only value" />
            <Description>Input is disabled and cannot be edited</Description>
          </TextField>

          <TextField isInvalid>
            <Label>Invalid State</Label>
            <Input
              placeholder="Enter your email"
              keyboardType="email-address"
            />
            <FieldError>Please enter a valid email address</FieldError>
          </TextField>
        </View>
      </KeyboardAvoidingContainer>
    </View>
  );
};

const INPUT_VARIANTS: UsageVariant[] = [
  {
    value: 'basic-input',
    label: 'Basic Input',
    content: <BasicInputContent />,
  },
  {
    value: 'input-with-label-description',
    label: 'With Label & Description',
    content: <InputWithLabelAndDescriptionContent />,
  },
  {
    value: 'input-variants',
    label: 'Variants',
    content: <InputVariantsContent />,
  },
  {
    value: 'input-states',
    label: 'States',
    content: <InputStatesContent />,
  },
];

export default function InputScreen() {
  return <UsageVariantFlatList data={INPUT_VARIANTS} />;
}
