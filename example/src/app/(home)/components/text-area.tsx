import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react/macro';
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
  const { t } = useLingui();

  return (
    <View className="flex-1 justify-center px-5">
      <KeyboardAvoidingContainer>
        <TextArea placeholder={t`Enter your message`} />
      </KeyboardAvoidingContainer>
    </View>
  );
};

const TextAreaWithLabelAndDescriptionContent = () => {
  const { t } = useLingui();

  return (
    <View className="flex-1 justify-center px-5">
      <KeyboardAvoidingContainer>
        <TextField>
          <Label>{t`Message`}</Label>
          <TextArea placeholder={t`Enter your message here...`} />
          <Description>
            {t`Please provide as much detail as possible.`}
          </Description>
        </TextField>
      </KeyboardAvoidingContainer>
    </View>
  );
};

const TextAreaVariantsContent = () => {
  const { t } = useLingui();

  return (
    <View className="flex-1 justify-center px-5 gap-8">
      <KeyboardAvoidingContainer>
        <View className="gap-8">
          <TextField>
            <Label>
              <Label.Text maxFontSizeMultiplier={1.4}>
                {t`Primary Variant`}
              </Label.Text>
            </Label>
            <TextArea
              placeholder={t`Primary style text area`}
              variant="primary"
              maxFontSizeMultiplier={1.4}
            />
            <Description maxFontSizeMultiplier={1.4}>
              {t`Default variant with primary styling`}
            </Description>
          </TextField>

          <TextField>
            <Label>
              <Label.Text maxFontSizeMultiplier={1.4}>
                {t`Secondary Variant`}
              </Label.Text>
            </Label>
            <TextArea
              placeholder={t`Secondary style text area`}
              variant="secondary"
              maxFontSizeMultiplier={1.4}
            />
            <Description maxFontSizeMultiplier={1.4}>
              {t`Secondary variant for surfaces`}
            </Description>
          </TextField>
        </View>
      </KeyboardAvoidingContainer>
    </View>
  );
};

const TextAreaStatesContent = () => {
  const { t } = useLingui();

  return (
    <View className="flex-1 justify-center px-5 gap-8">
      <KeyboardAvoidingContainer>
        <View className="gap-8">
          <TextField isDisabled>
            <Label>
              <Label.Text maxFontSizeMultiplier={1.4}>
                {t`Disabled State`}
              </Label.Text>
            </Label>
            <TextArea
              placeholder={t`Cannot edit`}
              value={t`Read only value`}
              maxFontSizeMultiplier={1.4}
            />
            <Description maxFontSizeMultiplier={1.4}>
              {t`Text area is disabled and cannot be edited`}
            </Description>
          </TextField>

          <TextField isInvalid>
            <Label>
              <Label.Text maxFontSizeMultiplier={1.4}>
                {t`Invalid State`}
              </Label.Text>
            </Label>
            <TextArea
              placeholder={t`Enter your message`}
              maxFontSizeMultiplier={1.4}
            />
            <FieldError textProps={{ maxFontSizeMultiplier: 1.4 }}>
              {t`Please enter a valid message`}
            </FieldError>
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
    label: msg`Basic TextArea`,
    content: <BasicTextAreaContent />,
  },
  {
    value: 'text-area-with-label-description',
    label: msg`With Label & Description`,
    content: <TextAreaWithLabelAndDescriptionContent />,
  },
  {
    value: 'text-area-variants',
    label: msg`Variants`,
    content: <TextAreaVariantsContent />,
  },
  {
    value: 'text-area-states',
    label: msg`States`,
    content: <TextAreaStatesContent />,
  },
];

export default function TextAreaScreen() {
  return <UsageVariantFlatList data={TEXT_AREA_VARIANTS} />;
}
