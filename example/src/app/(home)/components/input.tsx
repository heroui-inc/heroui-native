import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react/macro';
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
  const { t } = useLingui();

  return (
    <View className="flex-1 justify-center px-5">
      <KeyboardAvoidingContainer>
        <Input placeholder={t`Enter your email`} keyboardType="email-address" />
      </KeyboardAvoidingContainer>
    </View>
  );
};

const InputWithLabelAndDescriptionContent = () => {
  const { t } = useLingui();

  return (
    <View className="flex-1 justify-center px-5">
      <KeyboardAvoidingContainer>
        <TextField>
          <Label>{t`Email`}</Label>
          <Input
            placeholder={t`Enter your email`}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Description>
            {t`We'll never share your email with anyone else.`}
          </Description>
        </TextField>
      </KeyboardAvoidingContainer>
    </View>
  );
};

const InputVariantsContent = () => {
  const { t } = useLingui();

  return (
    <View className="flex-1 justify-center px-5 gap-8">
      <KeyboardAvoidingContainer>
        <View className="gap-8">
          <TextField>
            <Label>{t`Primary Variant`}</Label>
            <Input placeholder={t`Primary style input`} variant="primary" />
            <Description>{t`Default variant with primary styling`}</Description>
          </TextField>

          <TextField>
            <Label>{t`Secondary Variant`}</Label>
            <Input placeholder={t`Secondary style input`} variant="secondary" />
            <Description>{t`Secondary variant for surfaces`}</Description>
          </TextField>
        </View>
      </KeyboardAvoidingContainer>
    </View>
  );
};

const InputStatesContent = () => {
  const { t } = useLingui();

  return (
    <View className="flex-1 justify-center px-5 gap-8">
      <KeyboardAvoidingContainer>
        <View className="gap-8">
          <TextField>
            <Label>
              <Label.Text maxFontSizeMultiplier={1.4}>
                {t`Default State`}
              </Label.Text>
            </Label>
            <Input
              placeholder={t`Enter your email`}
              keyboardType="email-address"
            />
            <Description maxFontSizeMultiplier={1.4}>
              {t`Normal input state`}
            </Description>
          </TextField>

          <TextField isDisabled>
            <Label>
              <Label.Text maxFontSizeMultiplier={1.4}>
                {t`Disabled State`}
              </Label.Text>
            </Label>
            <Input placeholder={t`Cannot edit`} value={t`Read only value`} />
            <Description maxFontSizeMultiplier={1.4}>
              {t`Input is disabled and cannot be edited`}
            </Description>
          </TextField>

          <TextField isInvalid>
            <Label>
              <Label.Text maxFontSizeMultiplier={1.4}>
                {t`Invalid State`}
              </Label.Text>
            </Label>
            <Input
              placeholder={t`Enter your email`}
              keyboardType="email-address"
            />
            <FieldError textProps={{ maxFontSizeMultiplier: 1.4 }}>
              {t`Please enter a valid email address`}
            </FieldError>
          </TextField>
        </View>
      </KeyboardAvoidingContainer>
    </View>
  );
};

const INPUT_VARIANTS: UsageVariant[] = [
  {
    value: 'basic-input',
    label: msg`Basic Input`,
    content: <BasicInputContent />,
  },
  {
    value: 'input-with-label-description',
    label: msg`With Label & Description`,
    content: <InputWithLabelAndDescriptionContent />,
  },
  {
    value: 'input-variants',
    label: msg`Variants`,
    content: <InputVariantsContent />,
  },
  {
    value: 'input-states',
    label: msg`States`,
    content: <InputStatesContent />,
  },
];

export default function InputScreen() {
  return <UsageVariantFlatList data={INPUT_VARIANTS} />;
}
